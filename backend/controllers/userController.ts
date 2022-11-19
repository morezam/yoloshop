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
		isAdmin: user.isAdmin,
		name: user.name,
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

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isAdmin = req.user.isAdmin;

	if (!isAdmin) {
		res.status(401);
		res.send('User Must be admin to see all users');
	}

	try {
		const users = await User.find({});

		res.json(users);
	} catch (error) {
		res.status(500);
		next(error);
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isAdmin = req.user.isAdmin;
	const userId = req.params.id;

	if (!isAdmin) {
		res.status(401);
		res.send('User Must be admin to delete a user');
	}

	try {
		const users = await User.findByIdAndDelete(userId);

		res.send('User successfully deleted');
	} catch (error) {
		res.status(500);
		next(error);
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
		}

		const passwordMatch = user.comparePassword(prevPassword);

		if (!passwordMatch) {
			res.status(401);
			throw new Error('Password is not correct');
		}

		user.password = newPassword;

		user.save(function (err) {
			if (err) throw new Error(err.message);
			res.send('password successfully updated');
		});
	} catch (error) {
		res.status(500);
		next(error);
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
		let adminUserStatus = req.user.isAdmin ? isAdmin : user.isAdmin;

		user.isAdmin = adminUserStatus;
		user.name = name;

		user.save(function (err) {
			if (err) throw new Error(err.message);
			res.send('user successfully updated');
		});
	} catch (error) {
		res.status(500);
		next(error);
	}
};

export const getFavoriteProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (!user) {
			res.status(404);
			throw new Error('No User Found');
		}

		res.json(user.favorites);
	} catch (error) {
		res.status(500);
		next(error);
	}
};

export const setFavoriteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user._id;

	const { prodId, name } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user) {
			res.status(404);
			throw new Error('No User Found');
		}

		const favAlreadyExist = user.favorites.find(
			f => f._id.toString() === prodId
		);

		if (favAlreadyExist) {
			res.status(500);
			throw new Error('This product is already in your favorites list');
		} else {
			user.favorites.push({
				name,
				_id: prodId,
			});

			user.save(function (err) {
				if (err) throw new Error(err.message);
				res.send('Product added to favorites');
			});
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};

export const deleteFavoriteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user._id;

	const { prodId } = req.params;

	try {
		const user = await User.findById(userId);

		if (!user) {
			res.status(404);
			throw new Error('No User Found');
		}

		const favExist = user.favorites.find(f => f._id.toString() === prodId);

		if (!favExist) {
			res.status(500);
			throw new Error('No favorite product with this id found');
		}

		const filteredFav = user.favorites.filter(f => f._id.toString() !== prodId);

		user.favorites = filteredFav;

		user.save(function (err) {
			if (err) throw new Error(err.message);
			res.send('Product deleted from favorites');
		});
	} catch (error) {
		res.status(500);
		next(error);
	}
};
