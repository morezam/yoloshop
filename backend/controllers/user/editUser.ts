import { NextFunction, Request, Response } from 'express';
import { User } from '@models/userModel';

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isAdmin = req.user.isAdmin;
	const userId = req.params.id;

	if (!isAdmin) {
		res.status(401);
		res.send('You Must be admin to delete a user');
		return;
	}

	try {
		await User.findByIdAndDelete(userId);

		res.send('User successfully deleted');
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const changePassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user._id;

	const { prevPassword, newPassword } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user) {
			res.status(404);
			res.send('No User Found');
			return;
		}

		const passwordMatch = user.comparePassword(prevPassword);

		if (!passwordMatch) {
			res.status(401);
			next(new Error('Password is not correct'));
			return;
		}
		user.password = newPassword;

		user.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('password successfully updated');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.id;

	const { name, isAdmin } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user) {
			res.status(404);
			res.send('No User Found');
			return;
		}

		let adminUserStatus = req.user.isAdmin ? isAdmin : user.isAdmin;

		user.isAdmin = adminUserStatus;
		user.name = name;

		user.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('User successfully updated');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
