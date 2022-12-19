import { useAuthContext } from '@context/authContext';
import TableLayout, { Td } from '@layouts/TableLayout';
import { OrderType } from '@types';
import { useErrorHandler } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import AdminNav from './adminProfile/AdminNav';
import Copy from './Copy';
import NotFound from './NotFound';

interface OrderProps {
	orders: OrderType<string>[];
	setDelivered?: (id: string) => void;
}

const Orders = ({ orders, setDelivered }: OrderProps) => {
	const handleError = useErrorHandler();
	const { user } = useAuthContext();

	return (
		<>
			{orders.length === 0 ? (
				<NotFound>No Orders Found</NotFound>
			) : (
				<TableLayout
					headers={[
						'R',
						'Order Details',
						'Order Id',
						'Total Price',
						'User Id',
						'Paid Status',
						'Delivery Status',
					]}>
					{orders.map((order, i) => {
						return (
							<tr key={order._id}>
								<Td>{i + 1}</Td>
								<Td btn>
									<Link
										to={
											setDelivered
												? `/user/profile/order/${order._id}`
												: `/user/profile/${user.id}/order/${order._id}`
										}>
										Order Detail
									</Link>
								</Td>
								<Td>
									<Copy
										styling="font-mono hover:text-gray-500"
										text={order._id}>
										{order._id}
									</Copy>
								</Td>
								<Td styling="whitespace-nowrap">${order.totalPrice}</Td>

								<Td>
									<Copy
										styling="font-mono hover:text-gray-500"
										text={order.user}>
										{order.user}
									</Copy>
								</Td>
								<Td styling="whitespace-nowrap">
									{order.isPaid ? 'Paid' : 'Not Paid'}
								</Td>
								{setDelivered ? (
									<Td onClick={() => setDelivered(order._id)} btn>
										{order.isDelivered ? 'Delivered' : 'Not Delivered'}
									</Td>
								) : (
									<Td>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</Td>
								)}
							</tr>
						);
					})}
				</TableLayout>
			)}
		</>
	);
};

export default Orders;
