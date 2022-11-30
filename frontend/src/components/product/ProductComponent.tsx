import AddToFavorites from '@components/favorites/AddToFavorites';
import DeleteFavorite from '@components/favorites/DeleteFavorite';
import { useAuthContext } from '@context/authContext';
import { getFavProducts } from '@pages/user/favorites';
import { useQuery } from '@tanstack/react-query';
import { ProductType } from '@types';
import { useMemo } from 'react';

const ProductComponent = ({ product }: { product: ProductType<string> }) => {
	const { user } = useAuthContext();
	const { data } = useQuery(getFavProducts(user.token as string));

	const isInFav = useMemo(
		() => data?.data.find(fav => fav._id === product._id),
		[data?.data]
	);

	return (
		<div>
			<p>
				{product.name} {product.price}
			</p>
			{data && isInFav ? (
				<DeleteFavorite prodId={product._id} />
			) : (
				<AddToFavorites prodId={product._id} />
			)}
		</div>
	);
};

export default ProductComponent;
