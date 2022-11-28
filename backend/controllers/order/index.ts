import { NextFunction, Request, Response } from 'express';
import { Order } from '@models/orderModel';

export const getOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user;
	if (!user) {
		res.status(401);
		next(new Error('You are not authorized'));
		return;
	}

	if (user.isAdmin) {
		try {
			const orders = await Order.find({});

			res.json(orders);
		} catch (error) {
			res.status(500);
			next(error);
			return;
		}
	} else {
		try {
			const orders = await Order.find({ user: user._id });

			res.json(orders);
		} catch (error) {
			res.status(500);
			next(error);
			return;
		}
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
	const { orderItems, shippingAddress, taxPrice, shippingPrice, totalPrice } =
		req.body;

	try {
		const newOrder = await Order.create({
			orderItems,
			shippingAddress,
			taxPrice,
			shippingPrice,
			totalPrice,
			user: req.user._id,
		});

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
		const order = (await Order.findById(id).populate(
			'orderItems',
			'product'
		)) as any;

		order.isPaid = true;
		order.orderItems.forEach(item => item.product.purchasedNum + 1);

		order.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('paid order successfully');
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
		const order = (await Order.findById(id).populate(
			'orderItems',
			'product'
		)) as any;

		order.isDelivered = isDelivered;

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
