import { useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useAuthContext } from '@context/authContext';
import UserComponent from '@components/user/UserComponent';
import { UserType } from '@types';
import { useState } from 'react';
import Pagination from '@components/pagination';
import AdminNav from '@components/adminProfile/AdminNav';
import TableLayout from '@layouts/TableLayout';
import DeleteModal from '@components/modals/DeleteModal';
import Btn from '@components/Btn';
import NotFound from '@components/NotFound';

interface ResponseData {
	users: UserType<string>[];
	pages: number;
}

const AllUsers = () => {
	const { user } = useAuthContext();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(15);

	const { data } = useQuery({
		queryKey: ['users', page],
		queryFn: async () => {
			return shop.get<ResponseData>(`/user/all?page=${page}&limit=${limit}`, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			});
		},
		keepPreviousData: true,
	});

	const users = data?.data.users;

	return (
		<>
			<AdminNav />

			{data && data.data.users.length !== 0 ? (
				<>
					<TableLayout
						headers={[
							'R',
							'Name',
							'Email',
							'User Id',
							'Verified',
							'Admin',
							'Delete',
						]}>
						{data.data.users.map((user, i) => {
							return <UserComponent key={user._id} user={user} index={i} />;
						})}
					</TableLayout>
					<Pagination
						currentPage={page}
						totalPageCount={data.data.pages}
						pageSize={20}
						onPageChange={page => setPage(page as number)}
					/>
				</>
			) : (
				<NotFound>No Users Found</NotFound>
			)}
		</>
	);
};

export default AllUsers;
