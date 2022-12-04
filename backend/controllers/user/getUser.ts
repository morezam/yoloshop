import { NextFunction, Request, Response } from 'express';
import { User } from '@models/userModel';
import { createPaginatedRes } from '@utils/createPaginatedRes';

export const getUserProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (!user) {
			res.status(404);
			next(new Error('User not found'));
			return;
		}

		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isAdmin = req.user.isAdmin;
	const pageFromReq = req.query.page;
	const perPage = req.query.limit ? +req.query.limit : 10;

	if (!isAdmin) {
		res.status(401);
		next(new Error('User Must be admin to see all users'));
		return;
	}

	const page = pageFromReq ? +pageFromReq - 1 : 0;

	try {
		const users = await User.find()
			.select('-password')
			.limit(perPage)
			.skip(perPage * page);

		const count = await User.count();

		const pages = Math.ceil(count / perPage);

		res.json({ users, page: pageFromReq, pages });
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const getUserComments = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user._id;
	const pageFromReq = req.query.page;
	const perPage = 10;
	const page = pageFromReq ? +pageFromReq - 1 : 0;

	try {
		const user = await User.findById(userId).populate('comments');

		if (!user) {
			res.status(404);
			next(new Error('User not found'));
			return;
		}

		const comments = user.comments;

		const { sliced, pages } = createPaginatedRes(comments, page, perPage);

		res.json({ comments: sliced, pages });
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const getUserOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user._id;
	const pageFromReq = req.query.page;
	const perPage = 10;
	const page = pageFromReq ? +pageFromReq - 1 : 0;

	try {
		const user = await User.findById(userId).populate('orders');

		if (!user) {
			res.status(404);
			next(new Error('User not found'));
			return;
		}

		const orders = user.orders;

		const { sliced, pages } = createPaginatedRes(orders, page, perPage);

		res.json({ orders: sliced, pages });
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
