import AddToFavorites from '@components/favorites/AddToFavorites';
import DeleteFavorite from '@components/favorites/DeleteFavorite';
import { useAuthContext } from '@context/authContext';
import { getFavProducts } from '@pages/user/favorites';
import { useQuery } from '@tanstack/react-query';
import { ProductType } from '@types';
import { useMemo } from 'react';
import { useOrderContext } from '@context/orderContext';

const ProductComponent = ({ product }: { product: ProductType<string> }) => {
	const { user } = useAuthContext();
	const { data } = useQuery(getFavProducts(user.token as string));

	const { order, setOrder } = useOrderContext();

	const isInFav = useMemo(
		() => data?.data.find(fav => fav._id === product._id),
		[data?.data]
	);

	const onAddToCart = () => {
		const cartItem = {
			name: product.name,
			_id: product._id,
			quantity: product.quantity,
			price: product.price,
			image: product.image,
		};

		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items ? [...oldOrder.items, cartItem] : [cartItem],
		}));
	};

	const onDeleteFromCart = () => {
		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items.filter(c => c._id !== product._id),
		}));
	};

	const isInCart = order.items?.find(c => c._id === product._id);

	return (
		<div>
			<div>
				<p>
					{product.name} {product.price}
				</p>
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
