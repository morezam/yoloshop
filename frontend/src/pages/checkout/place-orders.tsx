import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@context/authContext';
import { Address, CartItem, useOrderContext } from '@context/orderContext';
import { getTotalPrice } from '@utils/getTotalPrice';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { OrderType } from '@types';

interface CreateOrder {
	orderItems: CartItem[];
	shippingAddress: Address;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
}

// orderItems, shippingAddress, taxPrice, shippingPrice, totalPrice

const PlaceOrdersPage = () => {
	const { order, setOrder } = useOrderContext();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: (orderDetails: CreateOrder) => {
			return shop.post<OrderType<string>>('/orders', orderDetails, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			});
		},
		onSuccess(data) {
			setOrder(oldOrder => ({ ...oldOrder, items: [] }));
			navigate(`/checkout/pay-orders/${data.data._id}`);
		},
	});

	if (!order.address || !order.items || !user.token) {
		navigate('/');
	}

	const shippingPrice = 10.0;
	const taxPrice = 10.0;
	const totalPrice = getTotalPrice(order.items) + taxPrice + shippingPrice;

	const onCreateOrder = () => {
		mutate({
			orderItems: order.items as CartItem[],
			shippingAddress: order.address as Address,
			taxPrice,
			shippingPrice,
			totalPrice,
		});
	};

	return (
		<div>
			<h2>Products :</h2>
			<ul>
				{order.items.map(item => {
					return (
						<li key={item.product}>
							{item.name} - {item.price} * {item.qty}
						</li>
					);
				})}
			</ul>

			<h2>Address :</h2>
			<div>
				{order.address?.address} - {order.address?.city}
			</div>

			<div>
				<p>Shipping Price : {shippingPrice} $</p>
				<p>Tax Price : {taxPrice} $</p>
				<p>Total Price : {totalPrice} $</p>
				<button onClick={() => onCreateOrder()}>
					Place Order{order.items.length === 1 ? null : 's'}{' '}
				</button>
			</div>
		</div>
	);
};

export default PlaceOrdersPage;
