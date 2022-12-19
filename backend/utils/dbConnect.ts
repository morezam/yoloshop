import mongoose from 'mongoose';

export const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log(`mongodb is connected`);
	} catch (error) {
		console.log(`Mongodb connection failed, Error: ${error.message}`);
	}
};
