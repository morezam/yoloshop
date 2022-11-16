import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/userModel';

declare global {
	namespace Express {
		interface Request {
			user: IUser | null;
		}
	}
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
			throw new Error('No token found, user is not authorized');
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;

			const user = await User.findById(decoded.id);
			req.user = user;

			next();
		} catch (error) {
			throw new Error(`Auth error ${error.message}`);
		}
	} else {
		throw new Error('No Authorization Header was Found');
	}
};
