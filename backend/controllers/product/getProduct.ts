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
	const reqFilter = req.query.sort;

	let sort;

	if (reqFilter === 'most-viewed') {
		sort = { viewedNum: -1 };
	} else if (reqFilter === 'most-purchased') {
		sort = { purchasedNum: -1 };
	} else if (reqFilter === 'most-recent') {
		sort = { createdAt: -1 };
	} else if (reqFilter === 'most-favorites') {
		sort = { addedToFavs: -1 };
	} else if (reqFilter === 'most-comments') {
		sort = { numComments: -1 };
	} else if (reqFilter === 'top-rating') {
		sort = { rating: -1 };
	} else {
		sort = {};
	}

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
			.skip(perPage * page)
			.sort(sort);

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
	const reqFilter = req.query.sort;

	try {
		const product = await Product.findById(id).populate('comments');

		let comments;

		if (reqFilter === 'most-recent') {
			comments = product.comments.sort((a, b) => +b.createdAt - +a.createdAt);
		} else if (reqFilter === 'most-favorites') {
			comments = product.comments.sort((a, b) => +a.like + +b.like);
		} else {
			comments = product.comments;
		}

		res.json(comments);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
