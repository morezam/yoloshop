import { NextFunction, Request, Response } from 'express';
import { Product } from '@models/productModel';

export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products = await Product.find({});

		res.json(products);
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

		res.json(product);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
