import { NextFunction, Request, Response } from 'express';
import { Comment } from '@models/commentModel';

export const createComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { rating, user, product, text } = req.body;

	try {
		const newComment = await Comment.create({
			rating,
			user,
			product,
			text,
		});

		res.json(newComment);
	} catch (error) {
		next(error);
	}
};

export const updateComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const { text, rating, like, dislike } = req.body;

	try {
		const updatedComment = await Comment.findByIdAndUpdate(id, {
			text,
			rating,
			like,
			dislike,
		});

		res.json(updatedComment);
	} catch (error) {
		next(error);
	}
};
