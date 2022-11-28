import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { dbConnect } from './utils/dbConnect';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import commentRoutes from './routes/commentRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();

dbConnect();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/orders', orderRoutes);
app.use('/comments', commentRoutes);
app.use('/upload', uploadRoutes);

const __customDirName = path.resolve();
app.use('/uploads', express.static(path.join(__customDirName, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
	console.log('Server is listening...');
});
