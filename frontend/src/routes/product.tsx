import { RouteObject } from 'react-router-dom';
import Home from '@pages/index';
import Product, { productLoader } from '@pages/product';

export const productRoutes: RouteObject[] = [
	{
		path: '/',
		element: <Home />,
		// loader: productsLoader,
	},
	{
		path: '/product/:id',
		element: <Product />,
		loader: productLoader,
	},
];
