import mongoose from 'mongoose';

export const dbConnect = async () => {
	try {
		await mongoose.connect('mongodb://0.0.0.0:27017/shop');
		console.log(`mongodb is connected`);
	} catch (error) {
		console.log(`Mongodb connection failed, Error: ${error.message}`);
	}
};
