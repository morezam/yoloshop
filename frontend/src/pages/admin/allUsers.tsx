import { LoaderFunction, redirect } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { useAuthContext } from '@context/authContext';
import UserComponent from '@components/user/UserComponent';
import { UserType } from '@types';
import { useState } from 'react';

const getAllUsers = (token: string) => ({
	queryKey: ['users'],
	queryFn: async () => {
		return shop.get<UserType[]>(`/user/all`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	},
});

// export const usersLoader: LoaderFunction = async () => {
// 	const user = JSON.parse(window.localStorage.getItem('user') as string);
// 	const query = getAllUsers(user.token);

// 	if (!user.isAdmin) {
// 		redirect(`user/profile/${user.id}`);
// 	}

// 	return (
// 		queryClient.getQueryData(query.queryKey) ??
// 		(await queryClient.fetchQuery(query))
// 	);
// };

interface ResponseData {
	users: UserType[];
	pages: number;
	page: number;
}

const AllUsers = () => {
	const { user } = useAuthContext();
	const [page, setPage] = useState(1);
	// const { data } = useQuery(getAllUsers(user.token as string), {
	// 	keepPreviousData: true
	// });

	const { data } = useQuery({
		queryKey: ['users', page],
		queryFn: async () => {
			return shop.get<ResponseData>(`/user/all?page=${page}`, {
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
			<ul>
				{users
					? users.map(user => {
							return <UserComponent key={user._id} user={user} />;
					  })
					: null}
			</ul>
			{[...Array(data?.data.pages).keys()].map(num => (
				<button
					disabled={num + 1 === page}
					key={num}
					onClick={() => setPage(num + 1)}>
					{num + 1}
				</button>
			))}
		</>
	);
};

export default AllUsers;
