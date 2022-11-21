import { NextFunction, Request, Response } from 'express';
import { User } from '@models/userModel';

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

	if (!isAdmin) {
		res.status(401);
		next(new Error('User Must be admin to see all users'));
		return;
	}

	try {
		const users = await User.find({});

		res.json(users);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
