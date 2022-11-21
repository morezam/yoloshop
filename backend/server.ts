import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnect } from './utils/dbConnect';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();

dbConnect();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
	console.log('Server is listening...');
});
