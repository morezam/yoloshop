import { LoaderFunction, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { useAuthContext } from '@context/authContext';
import UserFavorites from '@components/user/UserFavorites';

const getFavProducts = (id: string, token: string) => ({
	queryKey: ['userFaves', id],
	queryFn: async () => {
		return shop.get('/user/favorites', {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	},
});

export const favLoader: LoaderFunction = async ({ params }) => {
	const user = JSON.parse(window.localStorage.getItem('user') as string);
	const query = getFavProducts(params.id as string, user.token);

	return (
		queryClient.getQueryData(query.queryKey) ??
		(await queryClient.fetchQuery(query))
	);
};

const Favorites = () => {
	const params = useParams();
	const { user } = useAuthContext();
	const { data: favs } = useQuery(
		getFavProducts(params.id as string, user.token as string)
	);

	return <UserFavorites favs={favs?.data} />;
};

export default Favorites;
