import { LoaderFunction } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { useAuthContext } from '@context/authContext';
import ShowFavorites, { Favorite } from '@components/favorites/ShowFavorites';
import { useMemo, useState } from 'react';
import Pagination from '@components/pagination';
import UserNav from '@components/user/UserNav';

export const getFavProducts = (token: string) => ({
	queryKey: ['favorites'],
	queryFn: async () => {
		return shop.get<Favorite[]>(`/user/favorites`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	},
});

export const favLoader: LoaderFunction = async () => {
	const user = JSON.parse(window.localStorage.getItem('user') as string);
	const query = getFavProducts(user.token);

	return (
		queryClient.getQueryData(query.queryKey) ??
		(await queryClient.fetchQuery(query))
	);
};

const Favorites = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { user } = useAuthContext();
	const { data: favs } = useQuery(getFavProducts(user.token as string));

	const count = favs?.data.length;
	const pages = Math.ceil((count as number) / limit);

	const currentFavData = useMemo(() => {
		const firstPageIndex = (page - 1) * limit;
		const lastPageIndex = firstPageIndex + limit;
		return favs?.data.slice(firstPageIndex, lastPageIndex);
	}, [page, favs?.data]);

	return (
		<>
			<UserNav />
			{currentFavData ? (
				currentFavData.length !== 0 ? (
					<>
						<ShowFavorites favorites={currentFavData} />
						<Pagination
							currentPage={page}
							totalPageCount={pages}
							pageSize={limit}
							onPageChange={page => setPage(page as number)}
						/>
					</>
				) : (
					<div>You have no Favorite products</div>
				)
			) : null}
		</>
	);
};

export default Favorites;
