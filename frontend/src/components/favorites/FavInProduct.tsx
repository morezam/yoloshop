import { useAuthContext } from '@context/authContext';
import { getFavProducts } from '@pages/user/favorites';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import AddToFavorites from './AddToFavorites';
import DeleteFavorite from './DeleteFavorite';

const FavInProduct = ({ prodId }: { prodId: string }) => {
	const { user } = useAuthContext();

	const { data } = useQuery(getFavProducts(user.token as string));
	const isInFav = useMemo(
		() => data?.data.find(fav => fav._id === prodId),
		[data?.data]
	);

	return (
		<>
			{isInFav ? (
				<DeleteFavorite prodId={prodId}>
					<FaHeart
						title="Delete From Favorites"
						className="fill-red-500 cursor-pointer"
					/>
				</DeleteFavorite>
			) : (
				<AddToFavorites prodId={prodId}>
					<FaRegHeart
						title="Add To Favorites"
						className="fill-red-500 cursor-pointer"
					/>
				</AddToFavorites>
			)}
		</>
	);
};

export default FavInProduct;
