import Orders from '@components/Orders';
import Pagination from '@components/pagination';
import Spinner from '@components/spinner';
import UserNav from '@components/user/UserNav';
import { useAuthContext } from '@context/authContext';
import { useQuery } from '@tanstack/react-query';
import { OrderType } from '@types';
import { shop } from '@utils/api';
import React, { useState } from 'react';

interface PaginatedOrders {
	pages: number;
	orders: OrderType<string>[];
}

const UserOrders = () => {
	const [page, setPage] = useState(1);
	const { user } = useAuthContext();

	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['orders', page],
		queryFn: () => {
			return shop.get<PaginatedOrders>(`/user/${user.id}/orders?page=${page}`, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			});
		},
	});

	return (
		<div>
			<UserNav />
			{isLoading ? (
				<Spinner />
			) : data ? (
				<>
					<Orders orders={data.data.orders} />
					<Pagination
						currentPage={page}
						pageSize={10}
						totalPageCount={data.data.pages}
						onPageChange={page => setPage(page)}
					/>
				</>
			) : null}
		</div>
	);
};

export default UserOrders;
