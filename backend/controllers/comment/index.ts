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

		if (product) {
			const alreadyCommented = product.comments.find(
				c => c.user.toString() === req.user._id
			);

			if (alreadyCommented) {
				res.status(400);
				throw new Error('User already commented this product');
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

			await product.save(function (err) {
				if (err) console.log(err.message);
				res.send('comment added');
			});
		}
	} catch (error) {
		next(error);
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

		if (product) {
			const comment = product.comments.find(
				c => c._id.toString() === commentId
			);

			if (comment) {
				product.comments = product.comments.filter(
					c => c._id.toString() !== commentId
				);
				product.numComments = product.comments.length;

				const avRating =
					product.comments.reduce((acc, item) => item.rating + acc, 0) /
					product.comments.length;

				product.rating = +avRating.toFixed(1);

				await product.save(function (err) {
					if (err) console.log(err.message);
					res.send('comment was removed');
				});
			} else {
				res.status(404);
				throw new Error('No comment was found');
			}
		}
	} catch (error) {
		next(error);
	}
};
