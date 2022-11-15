import mongoose from 'mongoose';
import { commentSchema } from './commentModel';

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			default: 0,
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
		comments: [commentSchema],
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);

export { Product };
