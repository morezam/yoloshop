import mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema(
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
		text: {
			type: String,
			required: true,
		},
		like: {
			type: Number,
		},
		disLike: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
