import { RouteObject } from 'react-router-dom';
import Products from '@pages/admin/allProducts';
import CreateProduct from '@pages/admin/createProduct';
import AllUsers from '@pages/admin/allUsers';
import AllOrders from '@pages/admin/allOrders';
import ProductDetails, { productLoader } from '@pages/admin/productDetails';
import Comments from '@components/comment/CommentsInProfile';

export const adminRoutes: RouteObject[] = [
	{
		path: '/user/profile/products',
		element: <Products />,
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
		path: '/user/profile/allOrders',
		element: <AllOrders />,
	},
	{
		path: '/user/profile/comments',
		element: <Comments />,
	},
];
