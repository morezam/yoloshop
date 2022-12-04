import ErrorComponent from '@components/Error';
import Cart from '@pages/cart';
import PayOrders from '@pages/checkout/pay-orders';
import PlaceOrdersPage from '@pages/checkout/place-orders';
import ShippingAddressPage from '@pages/checkout/shipping-address';
import { RouteObject } from 'react-router-dom';

export const orderRoutes: RouteObject[] = [
	{
		path: '/cart',
		element: <Cart />,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/checkout/shipping-address',
		element: <ShippingAddressPage />,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/checkout/place-orders',
		element: <PlaceOrdersPage />,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/checkout/pay-orders/:orderId',
		element: <PayOrders />,
		errorElement: <ErrorComponent />,
	},
];
