import express from 'express';
import { dbConnect } from './dbConnect';

dbConnect();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('hello');
});

app.listen(5000, () => {
	console.log('Server is listening...');
});
