import { NextFunction, Request, Response } from 'express';
import { User } from '@models/userModel';

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
