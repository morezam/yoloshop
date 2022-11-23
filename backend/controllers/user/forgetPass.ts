import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import { User } from '@models/userModel';
import { forgetPassEmail } from '@utils/forgetPassEmail';

export const forgetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404);
			next(new Error('No User Found'));
			return;
		}

		const secNum = crypto.randomInt(100000, 1000000);

		user.securityNumber = secNum;

		const sent = await forgetPassEmail(user.email, secNum);
		if (!sent) {
			res.status(400);
			next(new Error('could not send the email'));
			return;
		}

		user.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}

			res.json({
				msg: 'Security Number successfully added to user',
				email: user.email,
			});
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const verifySecurityNumber = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, secNum } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404);
			next(new Error('No User Found'));
			return;
		}

		if (!user.securityNumber) {
			res.status(404);
			next(new Error('No Security number Found'));
			return;
		}

		if (user.securityNumber !== secNum) {
			res.status(401);
			next(new Error('Security number you provided did not match'));
			return;
		}

		user.securityNumber = null;

		user.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('Deleted Security number from user');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
export const changePasswordFromLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404);
			next(new Error('No User Found'));
			return;
		}

		user.password = password;

		user.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('Your password changed successfully');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
