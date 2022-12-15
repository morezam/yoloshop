import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@context/authContext';
import { Address, CartItem, useOrderContext } from '@context/orderContext';
import { getTotalPrice } from '@utils/getTotalPrice';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { OrderType } from '@types';
import Nav from '@components/Nav';
import ProductPreview from '@components/product/ProductPreview';

interface CreateOrder {
	orderItems: CartItem[];
	shippingAddress: Address;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
}

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
		<div className="pb-20">
			<Nav />
			<div className="sm:flex sm:justify-center	sm:items-center sm:gap-x-3">
				<ul className="sm:w-1/2">
					<h2>Products :</h2>
					{order.items.map((item, i) => {
						return (
							<ProductPreview item={item} index={i}>
								<p className="p-[-10px]">qty: {item.qty}</p>
							</ProductPreview>
						);
					})}
				</ul>

				<div className="text-center border-2 text-lg border-gray-200 rounded-md mt-9 px-2 pt-2 sm:px-5 sm:py-7 ">
					<div>
						Address:
						<p>
							{order.address?.address} - {order.address?.city} -{' '}
							{order.address?.postalCode}
						</p>
					</div>

					<div>
						<p>
							Shipping Price : <span className="text-sm">$</span>
							{shippingPrice}
						</p>
						<p>
							Tax Price : <span className="text-sm">$</span>
							{taxPrice}
						</p>
						<p className="text-yellow-800 font-semibold text-center mt-3">
							Total Price : <span className="text-sm">$</span>
							{totalPrice}
						</p>
					</div>
					<button
						className="fixed bottom-0 left-0 bg-pink-500 m-0 text-rose-100 py-2 rounded-lg w-full text-center sm:relative sm:mt-5"
						onClick={() => onCreateOrder()}>
						Place Order{order.items.length === 1 ? null : 's'}{' '}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrdersPage;
