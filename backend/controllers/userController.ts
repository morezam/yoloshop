import { Request, Response } from 'express';
import { User } from '../models/userModel';

export const userRegister = async (req: Request, res: Response) => {
	const { name, email, password, isAdmin } = req.params;

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
		throw new Error('could not create the user');
	}
};

export const userLogin = async (req: Request, res: Response) => {
	const { email, password } = req.params;

	const user = (await User.findOne({ email })) as any;

	if (!user) {
		throw new Error(`User Not Found with this email: ${email}`);
	}

	const passwordIsMatch = user.comparePassword(password, (err, isMatch) => {
		if (err) {
			throw new Error(err.message);
		}
		return isMatch;
	});

	if (!passwordIsMatch) {
		throw new Error('Password is not correct');
	}

	// TODO : Add JWT
};
