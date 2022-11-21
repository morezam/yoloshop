import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@models/userModel';

interface UserPayload {
	id: string;
}

export const userVerify = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.query.id as string;

	if (!token) {
		res.status(403);
		next(new Error('No Token found'));
		return;
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET_MAIL
		) as UserPayload;

		const user = await User.findById(decoded.id);

		if (!user) {
			res.status(404);
			next(new Error('No user was found'));
			return;
		}

		user.isVerified = true;

		user.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('User verified');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
