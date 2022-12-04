import { useAuthContext } from '@context/authContext';
import { useOrderContext } from '@context/orderContext';
import { Link } from 'react-router-dom';

const Cart = () => {
	const { order, setOrder } = useOrderContext();
	const { user } = useAuthContext();

	const deleteFromCard = (id: string) => {
		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items?.filter(c => c.product !== id),
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
							<li key={item.product}>
								<Link to={`/product/${item.product}`}>
									{item.name} qty: {item.qty}
								</Link>

								<button onClick={() => deleteFromCard(item.product)}>
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
