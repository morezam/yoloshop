import { NextFunction, Request, Response } from 'express';
import { User } from '@models/userModel';
import { Product } from '@models/productModel';

export const getFavoriteProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user._id;

	try {
		const user = await User.findById(userId).populate(
			'favorites',
			'name image'
		);

		if (!user) {
			res.status(404);
			next(new Error('No User Found'));
			return;
		}

		res.json(user.favorites);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const setFavoriteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user._id;

	const { prodId } = req.body;

	try {
		const user = await User.findById(userId);

		const product = await Product.findById(prodId);

		if (!user) {
			res.status(404);
			next(new Error('No User Found'));
			return;
		}

		if (user.favorites) {
			const favAlreadyExist = user.favorites.find(
				f => f._id.toString() === prodId
			);

			if (favAlreadyExist) {
				res.status(500);
				next(new Error('This product is already in your favorites list'));
				return;
			}
		}

		user.favorites.push(prodId);
		product.addedToFavs = product.addedToFavs + 1;

		user.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('Product added to favorites');
		});

		product.save();
	} catch (error) {
		res.status(500);
		next(error);
		return;
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
		const user = await User.findById(userId).populate('favorites');
		const product = await Product.findById(prodId);

		if (!user) {
			res.status(404);
			next(new Error('No User Found'));
			return;
		}

		const favExist = user.favorites.find(f => f._id.toString() === prodId);

		if (!favExist) {
			res.status(500);
			next(new Error('No favorite product with this id found'));
			return;
		}
		const filteredFav = user.favorites.filter(f => f._id.toString() !== prodId);

		user.favorites = filteredFav;
		product.addedToFavs = product.addedToFavs - 1;

		user.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('Product deleted from favorites');
		});
		product.save();
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
