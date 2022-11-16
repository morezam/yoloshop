import { Request, Response } from 'express';
import { Product } from '../models/productModel';

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find({});

		res.json(products);
	} catch (error) {
		throw new Error(`Error in get products ${error.message}`);
	}
};

export const getProductById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.status(404);
			throw new Error(`Product with id of ${id} was not found`);
		}

		res.json(product);
	} catch (error) {
		throw new Error(`Error in get products ${error.message}`);
	}
};
