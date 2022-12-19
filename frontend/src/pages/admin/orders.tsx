import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Orders from '@components/Orders';
import Pagination from '@components/pagination';
import { useAuthContext } from '@context/authContext';
import { OrderType } from '@types';
import { shop } from '@utils/api';
import AdminNav from '@components/adminProfile/AdminNav';
import Spinner from '@components/spinner';

interface PaginatedOrders {
	pages: number;
	orders: OrderType<string>[];
}

export const setDeliveredMutation = (token: string) => ({
	mutationFn: (id: string) => {
		return shop.put(
			`/orders/${id}/deliverOrder`,
			{ isDelivered: true },
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);
	},
});

const AllOrders = () => {
	const [page, setPage] = useState(1);
	const { user } = useAuthContext();

	const config = {
		headers: {
			authorization: `Bearer ${user.token}`,
		},
	};

	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['orders', page],
		queryFn: () => {
			return shop.get<PaginatedOrders>(`/orders?page=${page}`, config);
		},
	});

	const { mutate } = useMutation({
		...setDeliveredMutation(user.token as string),
		onSuccess() {
			refetch();
		},
	});

	const setDelivered = (id: string) => {
		mutate(id);
	};

	return (
		<div>
			<AdminNav />
			{isLoading && <Spinner />}
			{data ? (
				<>
					<Orders orders={data.data.orders} setDelivered={setDelivered} />
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

export default AllOrders;
