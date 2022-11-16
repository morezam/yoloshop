import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './dbConnect';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();

dbConnect();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	throw new Error('BROKEN');
});

app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/comments', commentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
	console.log('Server is listening...');
});
