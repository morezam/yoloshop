import { RouteObject } from 'react-router-dom';
import Products, { productsLoader } from '@pages/admin/allProducts';
import CreateProduct from '@pages/admin/createProduct';
import AllUsers from '@pages/admin/allUsers';
import ProductDetails, { productLoader } from '@pages/admin/productDetails';
import AllComments from '@pages/admin/comments';
import AllOrders from '@pages/admin/orders';

export const adminRoutes: RouteObject[] = [
	{
		path: '/user/profile/products',
		element: <Products />,
		loader: productsLoader,
	},
	{
		path: '/user/profile/product/:id',
		element: <ProductDetails />,
		loader: productLoader,
	},
	{
		path: '/user/profile/createProduct',
		element: <CreateProduct />,
	},
	{
		path: '/user/profile/allUsers',
		element: <AllUsers />,
	},
	{
		path: '/user/profile/comments',
		element: <AllComments />,
	},
	{
		path: '/user/profile/orders',
		element: <AllOrders />,
	},
];
