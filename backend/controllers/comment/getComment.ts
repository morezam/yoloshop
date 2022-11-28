import { NextFunction, Request, Response } from 'express';
import { Comment } from '@models/commentModel';

export const getComments = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user;

	if (!user) {
		res.status(401);
		next(new Error('User is not authorized'));
		return;
	}

	const pageFromReq = req.query.page;
	const perPage = 10;
	const page = pageFromReq ? +pageFromReq - 1 : 0;

	const commentObject = async (id?: string) => {
		try {
			const comments = await Comment.find(id ? { user: id } : {})
				.limit(perPage)
				.skip(perPage * page);

			const count = await Comment.count(id ? { user: id } : {});

			const pages = Math.ceil(count / perPage);

			return { comments, page: +pageFromReq, pages };
		} catch (error) {
			res.status(500);
			next(error);
			return;
		}
	};

	if (user.isAdmin) {
		const comments = await commentObject();
		res.json(comments);
	} else {
		const comments = await commentObject(user._id);
		res.json(comments);
	}
};

export const getCommentsByProductId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { prodId } = req.params;
	try {
		const comments = await Comment.find({ product: prodId });

		res.json(comments);
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
