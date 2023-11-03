import { NextFunction, Request, Response } from 'express';
import { Product } from '@models/productModel';
import { Comment } from '@models/commentModel';

export const createComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { rating, text, prodId } = req.body;
	const user = req.user;
	try {
		const product = (await Product.findById(prodId).populate(
			'comments',
			'user'
		)) as any;

		if (!product) {
			res.status(404);
			next(new Error('No product found'));
			return;
		}

		if (!user) {
			res.status(404);
			next(new Error('No User found'));
			return;
		}

		const alreadyCommented = product.comments.find(
			c => c.user.toString() === req.user._id.toString()
		);

		if (alreadyCommented) {
			res.status(400);
			next(new Error('User already commented this product'));
			return;
		}

		const newComment = await Comment.create({
			userName: req.user.name,
			rating,
			text,
			user: req.user._id,
			product: prodId,
		});

		product.comments.push(newComment._id);

		user.comments.push(newComment._id);

		user.save();

		product.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('comment added successfully');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const deleteComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const user = req.user;
	const { prodId } = req.body;

	try {
		const product = await Product.findById(prodId);

		const comment = await Comment.findById(id);

		if (!comment) {
			res.status(404);
			next(new Error('No comment found'));
			return;
		}
		if (!product) {
			comment.delete();
			return;
		}

		if (!user.isAdmin) {
			res.status(401);
			next(new Error('You must be admin to delete a comment'));
			return;
		}

		product.comments = product.comments.filter(c => c.toString() !== id);

		user.comments = user.comments.filter(c => c.toString() !== id);
		user.save();

		comment.delete();

		product.save(function (err) {
			if (err) {
				res.status(500);
				next(err);
				return;
			}
			res.send('comment deleted successfully');
		});
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};

export const likeComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const user = req.user;
	const { like } = req.body;

	try {
		const comment = await Comment.findById(id);

		if (!comment) {
			res.status(404);
			next(new Error('No comment found'));
			return;
		}

		const saveComment = (msg: string) => {
			comment.save(function (err) {
				if (err) {
					res.status(500);
					next(err);
					return;
				}
				res.send(msg);
			});
		};

		const votedUser = comment.votedUsers.find(
			voteUser => voteUser._id === user._id
		);

		if (votedUser) {
			if ((votedUser.like && like) || (!votedUser.like && !like)) {
				comment.votedUsers = comment.votedUsers.filter(
					user => user._id !== votedUser._id
				);

				comment.like = like ? comment.like - 1 : comment.like;
				comment.disLike = like ? comment.disLike : comment.disLike - 1;

				saveComment('vote removed');
				return;
			}

			if ((votedUser.like && !like) || (!votedUser.like && like)) {
				votedUser.like = like;
				comment.like = like ? comment.like + 1 : comment.like - 1;
				comment.disLike = like ? comment.disLike - 1 : comment.disLike + 1;
				saveComment(
					`vote changed from ${like ? 'dislike to like' : 'like to dislike'}`
				);
				return;
			}
		} else {
			comment.votedUsers.push({
				_id: user._id,
				like,
			});

			comment.like = like ? comment.like + 1 : comment.like;
			comment.disLike = like ? comment.disLike : comment.disLike + 1;

			saveComment(`comment ${like ? 'Liked' : 'Disliked'}`);
		}
	} catch (error) {
		res.status(500);
		next(error);
		return;
	}
};
