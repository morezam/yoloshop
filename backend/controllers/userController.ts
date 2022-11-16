import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@models/userModel';

export const userRegister = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, email, password, isAdmin } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	try {
		const newUser = await User.create({
			name,
			email,
			password,
			isAdmin: isAdmin ? isAdmin : false,
		});

		res.json(newUser);
	} catch (error) {
		res.status(500);
		next(error);
	}
};

export const userLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		res.status(404);
		throw new Error(`User Not Found with this email: ${email}`);
	}

	const passwordIsMatch = user.comparePassword(password);

	if (!passwordIsMatch) {
		res.status(401);
		throw new Error('Password is not correct');
	}

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});

	res.json({
		id: user._id,
		token,
	});
};

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
			throw new Error('User not found');
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
	}
};
