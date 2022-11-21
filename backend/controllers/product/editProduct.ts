import { NextFunction, Request, Response } from 'express';
import { Product } from '@models/productModel';

export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, price, quantity, description, image, brand, category } =
		req.body;

	if (!req.user.isAdmin) {
		res.status(401);
		next(new Error('To create a product you must be admin.'));
		return;
	}

	try {
		const newProduct = await Product.create({
			name,
			price,
			quantity,
			description,
			image,
			brand,
			category,
			user: req.user._id,
		});

		res.json(newProduct);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const updateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const { name, price, quantity, description, image, brand, category } =
		req.body;

	if (!req.user.isAdmin) {
		res.status(401);
		next(new Error('To delete a product you must be admin.'));
		return;
	}

	try {
		await Product.findByIdAndUpdate(id, {
			name,
			price,
			quantity,
			description,
			image,
			brand,
			category,
		});

		res.send('Product successfully updated');
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	if (!req.user.isAdmin) {
		res.status(401);
		next(new Error('To delete a product you must be admin.'));
		return;
	}

	try {
		await Product.findByIdAndDelete(id);
		res.send('product successfully deleted');
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
