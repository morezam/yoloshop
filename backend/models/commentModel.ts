import mongoose, { Document } from 'mongoose';

interface IComment extends Document {
	rating: number;
	user: mongoose.Schema.Types.ObjectId;
	text: string;
	like?: number;
	disLike?: number;
	userName: string;
}

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
