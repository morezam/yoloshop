import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, User } from '@models/userModel';

declare global {
	namespace Express {
		interface Request {
			user: IUser | null;
		}
	}
}

interface UserPayload {
	id: string;
}

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			res.status(401);
			next(new Error('No token found, user is not authorized'));
			return;
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET) as UserPayload;

			const user = await User.findById(decoded.id);
			req.user = user;

			next();
		} catch (error) {
			res.status(500);
			next(new Error(`${error.message} Please Login Again!`));
			return;
		}
	} else {
		res.status(404);
		next(new Error('No Authorization Header was Found'));
	}
};
