import express from 'express';
import { dbConnect } from './dbConnect';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dbConnect();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('hello');
});

app.use('/products', productRoutes);
app.use('/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
	console.log('Server is listening...');
});
