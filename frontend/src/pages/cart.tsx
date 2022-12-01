import { useAuthContext } from '@context/authContext';
import { useOrderContext } from '@context/orderContext';
import { Link } from 'react-router-dom';

const Cart = () => {
	const { order, setOrder } = useOrderContext();
	const { user } = useAuthContext();

	const deleteFromCard = (id: string) => {
		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items?.filter(c => c._id !== id),
		}));
	};

	return (
		<>
			{order.items?.length === 0 ? (
				<p>There is no product in your cart</p>
			) : (
				<>
					<ul>
						{order.items?.map(item => (
							<li key={item._id}>
								<Link to={`/product/${item._id}`}>{item.name}</Link>
								<button onClick={() => deleteFromCard(item._id)}>
									Delete From Cart
								</button>
							</li>
						))}
					</ul>
					{user.token ? (
						<Link to={'/checkout/shipping-address'}>Proceed to Checkout</Link>
					) : (
						<Link to={'/login?redirect=checkout/shipping-address'}>
							Login and Checkout
						</Link>
					)}
				</>
			)}
		</>
	);
};

export default Cart;
