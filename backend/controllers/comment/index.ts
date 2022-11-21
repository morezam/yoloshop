import { NextFunction, Request, Response } from 'express';
import { Product } from '@models/productModel';

export const createProductComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { rating, text } = req.body;
	const { id } = req.params;
	try {
		const product = (await Product.findById(id)) as any;

		if (!product) {
			res.status(400);
			next(new Error('No product found'));
			return;
		}

		const alreadyCommented = product.comments.find(
			c => c.user.toString() === req.user._id
		);

		if (alreadyCommented) {
			res.status(400);
			next(new Error('User already commented this product'));
			return;
		}

		product.comments.push({
			userName: req.user.name,
			rating,
			text,
			user: req.user._id,
		});

		product.numComments = product.comments.length;

		const avRating =
			product.comments.reduce((acc, item) => item.rating + acc, 0) /
			product.comments.length;

		product.rating = +avRating.toFixed(1);

		product.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('comment added');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const deleteProductComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, commentId } = req.params;

	try {
		const product = (await Product.findById(id)) as any;

		if (!product) {
			res.status(404);
			next(new Error('No product was found'));
			return;
		}

		const comment = product.comments.find(c => c._id.toString() === commentId);

		if (!comment) {
			res.status(404);
			next(new Error('No comment was found'));
			return;
		}

		product.comments = product.comments.filter(
			c => c._id.toString() !== commentId
		);
		product.numComments = product.comments.length;

		const avRating =
			product.comments.reduce((acc, item) => item.rating + acc, 0) /
			product.comments.length;

		product.rating = +avRating.toFixed(1);

		product.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('comment was removed');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
