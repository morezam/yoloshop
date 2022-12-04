import { NextFunction, Request, Response } from 'express';
import { Comment } from '@models/commentModel';

export const getAllComments = async (
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

	if (!user.isAdmin) {
		res.status(401);
		next(new Error('You must be admin to see all comments'));
		return;
	}

	try {
		const comments = await Comment.find()
			.limit(perPage)
			.skip(perPage * page);

		const count = await Comment.count();

		const pages = Math.ceil(count / perPage);

		res.json({ comments, page: +pageFromReq, pages });
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
