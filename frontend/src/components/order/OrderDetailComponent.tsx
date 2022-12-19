import dayjs from 'dayjs';
import AdminNav from '@components/adminProfile/AdminNav';
import ProductPreview from '@components/product/ProductPreview';
import { useMutation, useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useParams } from 'react-router-dom';
import { OrderType } from '@types';
import { useAuthContext } from '@context/authContext';
import Back from '@components/Back';
import Btn from '@components/Btn';
import PayOrders from '@components/PayOrder';
import Spinner from '@components/spinner';
import { setDeliveredMutation } from '@pages/admin/orders';

const OrderDetailComponent = ({ admin }: { admin: boolean }) => {
	const params = useParams();
	const { user } = useAuthContext();

	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['order', params.orderId],
		queryFn: () => {
			return shop.get<OrderType<string>>(`/orders/${params.orderId}`, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			});
		},
	});

	const { mutate } = useMutation({
		...setDeliveredMutation(user.token as string),
		onSuccess() {
			refetch();
		},
	});

	return (
		<>
			<AdminNav />
			{isLoading && <Spinner />}
			<Back
				to={admin ? '/user/profile/orders' : `/user/profile/${user.id}/orders`}>
				All Orders
			</Back>
			{data && data.data ? (
				<div className="sm:flex sm:items-center sm:justify-center sm:gap-x-3">
					<ul className="sm:w-1/2 sm:flex flex-col">
						{data.data.orderItems.map((item, i) => (
							<ProductPreview
								key={item.product as string}
								item={item}
								index={i}>
								<p className="p-[-10px]">qty: {item.qty}</p>
							</ProductPreview>
						))}
					</ul>

					<div className="text-center border-2 text-lg border-gray-200 rounded-md mt-3 px-2 pt-2 sm:px-5 sm:py-7 ">
						<div>
							Address:
							<p>
								{data.data.shippingAddress.address} -{' '}
								{data.data.shippingAddress.city} -{' '}
								{data.data.shippingAddress.postalCode}
							</p>
						</div>

						<p>
							Shipping Price : <span className="text-sm">$</span>
							{data.data.shippingPrice}
						</p>
						<p>
							Tax Price : <span className="text-sm">$</span>
							{data.data.taxPrice}
						</p>
						<p className="text-yellow-800 font-semibold text-center mt-3">
							Total Price : <span className="text-sm">$</span>
							{data.data.totalPrice}
						</p>
						{data.data.isPaid ? (
							<>
								<p>Paid</p>
								<>
									Paid At:{' '}
									{dayjs(data.data.paidAt).format('MMM D, YYYY, HH:mm')}
								</>
							</>
						) : (
							<>
								<p>Not Paid</p>
								<PayOrders orderId={data.data._id} onSuccess={refetch}>
									<Btn>Pay For This Order</Btn>
								</PayOrders>
							</>
						)}

						{data.data.isDelivered ? (
							<>
								<p>Delivered</p>
								<p>
									Delivered At:{' '}
									{dayjs(data.data.deliveredAt).format('MMM D, YYYY, HH:mm')}
								</p>
							</>
						) : (
							<>
								<p>Not Delivered</p>
								{admin && (
									<Btn
										onClick={() => mutate(data.data._id)}
										styling="mt-4 bg-green-400"
										title="Click To set Delivery status to Delivered">
										Deliver This Order
									</Btn>
								)}
							</>
						)}
					</div>
				</div>
			) : null}
		</>
	);
};

export default OrderDetailComponent;
