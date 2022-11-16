import mongoose from 'mongoose';
import { commentSchema } from './commentModel';

interface IProduct extends Document {
	name: string;
	price: number;
	quantity: number;
	description: string;
	image: string;
	brand: string;
	rating: number;
	category: string;
	numComments: number;
	comments: typeof commentSchema[];
}

const productSchema = new mongoose.Schema<IProduct>(
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

export const Product = mongoose.model('Product', productSchema);
