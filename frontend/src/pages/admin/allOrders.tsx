import { LoaderFunction, redirect } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { useAuthContext } from '@context/authContext';

const getAllOrders = (token: string) => ({
	queryKey: ['orders'],
	queryFn: async () => {
		return shop.get('/orders', {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	},
});

export const ordersLoader: LoaderFunction = async () => {
	const user = JSON.parse(window.localStorage.getItem('user') as string);
	const query = getAllOrders(user.token);

	if (!user.isAdmin) {
		redirect(`user/profile/${user.id}`);
	}

	return (
		queryClient.getQueryData(query.queryKey) ??
		(await queryClient.fetchQuery(query))
	);
};

const AllOrders = () => {
	const { user } = useAuthContext();
	const { data: orders } = useQuery(getAllOrders(user.token as string));

	console.log(orders);
	return <div>AllOrders</div>;
};

export default AllOrders;
