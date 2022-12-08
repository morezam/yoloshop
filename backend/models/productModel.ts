import mongoose from 'mongoose';
import { ProductType } from '@types';
import { formatRating } from '@utils/formatRating';

type IProduct = Document & ProductType<mongoose.Schema.Types.ObjectId>;

export const productSchema = new mongoose.Schema<IProduct>(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		quantity: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		category: {
			type: String,
			required: true,
		},
		numComments: {
			type: Number,
			required: true,
			default: 0,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
				required: true,
			},
		],
		addedToFavs: {
			type: Number,
			required: true,
			default: 0,
		},
		purchasedNum: {
			type: Number,
			required: true,
			default: 0,
		},
		viewedNum: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

productSchema.pre('save', async function (next) {
	const product = await this.populate('comments', 'rating');

	if (!product.comments) {
		next();
	}

	product.numComments = product.comments.length;
	const avRating =
		product.comments.reduce((acc, item) => item.rating + acc, 0) /
		product.comments.length;

	product.rating = formatRating(+avRating);

	next();
});

export const Product = mongoose.model('Product', productSchema);
