import { NextFunction, Request, Response } from 'express';
import { Product } from '@models/productModel';

export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const pageFromReq = req.query.page;
	const perPage = req.query.limit ? +req.query.limit : 10;
	const page = pageFromReq ? +pageFromReq - 1 : 0;

	const key = req.query.key
		? {
				name: {
					$regex: req.query.key,
					$options: 'i',
				},
		  }
		: {};

	try {
		const products = await Product.find(key)
			.limit(perPage)
			.skip(perPage * page);

		const count = await Product.count(key);

		const pages = Math.ceil(count / perPage);

		res.json({ products, page: pageFromReq, pages });
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const getProductById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.status(404);
			next(new Error(`Product with id of ${id} was not found`));
			return;
		}

		product.viewedNum = product.viewedNum + 1;

		product.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.json(product);
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const getCommentsByProductId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	try {
		const product = await Product.findById(id).populate('comments');

		res.json(product.comments);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
