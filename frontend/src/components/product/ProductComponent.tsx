import AddToFavorites from '@components/favorites/AddToFavorites';
import DeleteFavorite from '@components/favorites/DeleteFavorite';
import { useAuthContext } from '@context/authContext';
import { getFavProducts } from '@pages/user/favorites';
import { useQuery } from '@tanstack/react-query';
import { ProductType } from '@types';
import { useMemo, useState } from 'react';
import { useOrderContext } from '@context/orderContext';

const ProductComponent = ({ product }: { product: ProductType<string> }) => {
	const { user } = useAuthContext();
	const { data } = useQuery(getFavProducts(user.token as string));
	const [qty, setQty] = useState(1);

	// TODO : Change this to production URL
	const src = product.image.startsWith('/')
		? `http://localhost:5000${product.image}`
		: product.image;

	const { order, setOrder } = useOrderContext();

	const isInFav = useMemo(
		() => data?.data.find(fav => fav._id === product._id),
		[data?.data]
	);

	const onAddToCart = () => {
		const cartItem = {
			name: product.name,
			product: product._id,
			countInStock: product.countInStock,
			price: product.price,
			image: product.image,
			qty,
		};

		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items ? [...oldOrder.items, cartItem] : [cartItem],
		}));
	};

	const onDeleteFromCart = () => {
		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items.filter(c => c.product !== product._id),
		}));
	};

	const isInCart = order.items?.find(c => c.product === product._id);

	return (
		<div>
			<div>
				<p>
					{product.name} {product.price}
				</p>
				<img src={src} alt={product.name} />
				<label htmlFor="qty">Change quantity : </label>
				<input
					id="qty"
					type="number"
					value={qty}
					min={1}
					max={product.countInStock}
					onChange={e => setQty(+e.target.value)}
				/>
				{isInCart ? (
					<button onClick={() => onDeleteFromCart()}>Delete From cart</button>
				) : (
					<button onClick={() => onAddToCart()}>Add To Cart</button>
				)}
			</div>
			{data && isInFav ? (
				<DeleteFavorite prodId={product._id} />
			) : (
				<AddToFavorites prodId={product._id} />
			)}
		</div>
	);
};

export default ProductComponent;
