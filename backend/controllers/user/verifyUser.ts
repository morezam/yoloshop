import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@models/userModel';
import { verificationEmail } from '@utils/verificationEmail';

interface UserPayload {
	email: string;
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

		const user = await User.findOne({ email: decoded.email });

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

			const LOGIN_URL = 'https://yoloshop.onrender.com/login';
			res.send(`
			<div style="display: flex; flex-direction: column; align-items: center">
			<h1 style="font-size: 45px">
				Your email has been successfully verified
			</h1>
	
			<p style="font-size: 25px">
				You can now login with to your account
			</p>
	
			<p style="font-size: 25px; text-decoration: none">
				<a
					href=${LOGIN_URL}
					style="
						text-decoration: none;
						background-color: cadetblue;
						color: aliceblue;
						padding: 15px 25px;
						border-radius: 5px;
					"
					>Login</a
				>
			</p>
		</div>
			`);
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const resendVerificationEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const email = req.query.email;

	if (!email) {
		res.status(404);
		next(new Error('No Email Entered'));
		return;
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404);
			next(new Error('No User Found'));
			return;
		}

		const sent = await verificationEmail(user.email, user.name);

		if (!sent) {
			res.status(400);
			res.send('could not send the email');
			return;
		}

		res.send(
			`Verification Email was sent to ${user.email} please check your inbox and verify your email`
		);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
