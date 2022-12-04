import { OrderType } from '@types';
import { useErrorHandler } from 'react-error-boundary';

interface OrderProps {
	orders: OrderType<string>[];
	setDelivered?: (id: string) => void;
}

const Orders = ({ orders, setDelivered }: OrderProps) => {
	const handleError = useErrorHandler();

	return (
		<>
			{orders.length === 0 ? (
				<p>No Orders Found</p>
			) : (
				<ul>
					{orders.map(order => {
						return (
							<li key={order._id}>
								{order.orderItems.map(item => (
									<p key={item.product}>
										{item.name} - {item.price} * {item.qty}
									</p>
								))}
								<div>
									<p>Paid Status: {order.isPaid ? 'paid' : 'not paid'} </p>
									<p>
										Delivered Status:{' '}
										{order.isDelivered ? 'delivered' : 'not delivered'}
									</p>
									{setDelivered ? (
										<button onClick={() => setDelivered(order._id)}>
											Deliver This Order
										</button>
									) : null}
									<p>{order.shippingAddress.address}</p>
									<p>Total Price : {order.totalPrice} $</p>
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default Orders;
