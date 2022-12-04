import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import { Product } from '@models/productModel';
import path from 'path';

export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, price, countInStock, description, image, brand, category } =
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
			countInStock,
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
	const { name, price, countInStock, description, image, brand, category } =
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
			countInStock,
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
	const { image } = req.query;

	if (!req.user.isAdmin) {
		res.status(401);
		next(new Error('To delete a product you must be admin.'));
		return;
	}
	const __customDirName = path.resolve();

	fs.unlink(path.join(__customDirName, `/${image}`), function (err) {
		if (err) {
			res.status(500);
			next(err);
			return;
		} else {
			console.log('Successfully deleted the file.');
		}
	});

	try {
		await Product.findByIdAndDelete(id);
		res.send('product successfully deleted');
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
