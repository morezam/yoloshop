import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { UserType } from '@types';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';

interface ChangeAdminArgs {
	name: string;
	adminStatus: boolean;
	id: string;
}

const UserComponent = ({ user }: { user: UserType }) => {
	const { user: authUser } = useAuthContext();

	const { mutate: deleteUser } = useMutation({
		mutationFn: (id: string) => {
			return shop.delete(`/user/${id}`, {
				headers: {
					authorization: `Bearer ${authUser.token}`,
				},
			});
		},
		onSuccess() {
			queryClient.invalidateQueries(['users']);
		},
	});

	const { mutate: changeAdminStatus } = useMutation({
		mutationFn: ({ id, adminStatus, name }: ChangeAdminArgs) => {
			return shop.put(
				`/user/${id}`,
				{ isAdmin: adminStatus, name },
				{
					headers: {
						authorization: `Bearer ${authUser.token}`,
					},
				}
			);
		},
		onSuccess() {
			queryClient.invalidateQueries(['users']);
		},
	});

	return (
		<li key={user._id}>
			{user.name} - {user.email}-{' '}
			{user.isVerified ? 'verified' : 'not verified'}{' '}
			<button
				onClick={() =>
					changeAdminStatus({
						id: user._id,
						adminStatus: !user.isAdmin,
						name: user.name,
					})
				}>
				{user.isAdmin ? 'admin' : 'normalUser'}
			</button>
			<button onClick={() => deleteUser(user._id)}>delete</button>
		</li>
	);
};

export default UserComponent;
