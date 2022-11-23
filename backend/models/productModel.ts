import mongoose from 'mongoose';
import { commentSchema } from './commentModel';
import { ProductType } from '@types';

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

export const Product = mongoose.model('Product', productSchema);
