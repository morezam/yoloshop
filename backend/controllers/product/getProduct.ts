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
		next(error);
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
			throw new Error(`Product with id of ${id} was not found`);
		}

		res.json(product);
	} catch (error) {
		next(error);
	}
};
