import { NextFunction, Request, Response } from 'express';
import { Order } from '@models/orderModel';
import { Schema } from 'mongoose';
import { ProductType } from '@types';

export const getOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user;
	const pageFromReq = req.query.page;
	const perPage = 10;
	const page = pageFromReq ? +pageFromReq - 1 : 0;

	if (!user) {
		res.status(401);
		next(new Error('You are not authorized'));
		return;
	}

	if (!user.isAdmin) {
		res.status(401);
		next(new Error('You must be an admin to see all orders'));
		return;
	}

	try {
		const orders = await Order.find()
			.limit(perPage)
			.skip(perPage * page);

		const count = await Order.count();

		const pages = Math.ceil(count / perPage);

		res.json({ orders, page: +pageFromReq, pages });
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const getOrderById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	try {
		const order = await Order.findById(id);

		if (!order) {
			res.status(404);
			next(new Error(`order with id of ${id} was not found`));
			return;
		}

		res.json(order);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const createOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user;
	const { orderItems, shippingAddress, taxPrice, shippingPrice, totalPrice } =
		req.body;

	try {
		const newOrder = await Order.create({
			orderItems,
			shippingAddress,
			taxPrice,
			shippingPrice,
			totalPrice,
			user: user._id,
		});

		const orderId = newOrder._id as unknown as Schema.Types.ObjectId;

		user.orders.push(orderId);

		user.save();

		res.json(newOrder);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const updateOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;
	const { orderItems, shippingAddress, totalPrice } = req.body;

	try {
		const updatedOrder = await Order.findByIdAndUpdate(id, {
			orderItems,
			shippingAddress,
			totalPrice,
		});

		res.json(updatedOrder);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const payOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;

	try {
		const order = await Order.findById(id).populate({
			path: 'orderItems',
			populate: {
				path: 'product',
				model: 'Product',
			},
		});

		order.isPaid = true;
		order.paidAt = new Date();
		order.orderItems.forEach(item => {
			const product = item.product as unknown as ProductType<string>;
			product.purchasedNum = product.purchasedNum + 1;
		});

		order.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			// res.send('paid order successfully');
			res.json(order);
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const deliverOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;

	const { isDelivered } = req.body;

	try {
		const order = await Order.findById(id);

		order.isDelivered = isDelivered;
		order.deliveredAt = new Date();

		order.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('Deliver order successfully');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
