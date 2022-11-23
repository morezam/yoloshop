import { shop } from '@utils/api';
import { LoaderFunction } from 'react-router-dom';

export const productLoader: LoaderFunction = async ({ params }) => {
	const productId = params.id;

	const res = await shop.get(`/products/${productId}`);

	console.log(res.data);
};

const Product = () => {
	return <div>Product</div>;
};

export default Product;
