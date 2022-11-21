import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@models/userModel';
import { verificationEmail } from '@utils/verificationEmail';

export const userRegister = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, email, password, isAdmin } = req.body;

	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(400);
			next(new Error('User already exists'));
			return;
		}

		const newUser = await User.create({
			name,
			email,
			password,
			isAdmin: isAdmin ? isAdmin : false,
		});

		verificationEmail(newUser._id, newUser.email, newUser.name);

		res.send(
			`Verification Email was sent to ${newUser.email} please check your inbox and verify your email`
		);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const userLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404);
			next(new Error(`User Not Found with this email: ${email}`));
			return;
		}

		const passwordIsMatch = user.comparePassword(password);

		if (!passwordIsMatch) {
			res.status(401);
			next(new Error('Password is not correct'));
			return;
		}

		if (!user.isVerified) {
			res.status(401);
			next(
				new Error('Your Email has not been verified. Please click on resend')
			);
			return;
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});

		res.json({
			id: user._id,
			token,
			isAdmin: user.isAdmin,
			name: user.name,
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
