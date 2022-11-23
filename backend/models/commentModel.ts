import mongoose, { Document } from 'mongoose';
import { CommentType } from '@types';

type IComment = Document & CommentType<mongoose.Schema.Types.ObjectId>;

export const commentSchema = new mongoose.Schema<IComment>(
	{
		rating: {
			type: Number,
			required: true,
		},
		userName: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		like: {
			type: Number,
			default: 0,
		},
		disLike: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);
