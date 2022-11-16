import mongoose from 'mongoose';

interface IComment {
	rating: number;
	user: mongoose.Schema.Types.ObjectId;
	product: mongoose.Schema.Types.ObjectId;
	text: string;
	like: number;
	disLike: number;
}

export const commentSchema = new mongoose.Schema<IComment>(
	{
		rating: {
			type: Number,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		product: {
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
			required: true,
			default: 0,
		},
		disLike: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

export const Comment = mongoose.model('Comment', commentSchema);
