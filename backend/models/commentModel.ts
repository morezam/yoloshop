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
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
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
		edited: {
			type: Boolean,
			required: true,
			default: false,
		},
		votedUsers: [
			{
				_id: String,
				like: Boolean,
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Comment = mongoose.model('Comment', commentSchema);
