import Btn from '@components/Btn';
import { useAuthContext } from '@context/authContext';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { Td } from '@layouts/TableLayout';
import { useMutation } from '@tanstack/react-query';
import { UserType } from '@types';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { FaTrash } from 'react-icons/fa';

interface ChangeAdminArgs {
	name: string;
	adminStatus: boolean;
	id: string;
}

const UserComponent = ({
	user,
	index,
}: {
	user: UserType<string>;
	index: number;
}) => {
	const { user: authUser } = useAuthContext();
	const [copiedText, copy] = useCopyToClipboard();

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
		<tr>
			<Td>{index + 1}</Td>
			<Td>{user.name}</Td>
			<Td>{user.email}</Td>
			<Td
				onClick={() => copy(user._id)}
				styling="cursor-pointer font-mono hover:text-gray-500">
				{user._id}
			</Td>
			<Td>{user.isVerified ? 'Verified' : 'Not Verified'}</Td>
			<Td
				onClick={() =>
					changeAdminStatus({
						id: user._id,
						adminStatus: !user.isAdmin,
						name: user.name,
					})
				}
				btn
				styling="whitespace-nowrap">
				{user.isAdmin ? 'Admin' : 'Normal User'}
			</Td>
			<Td onClick={() => deleteUser(user._id)} btn>
				<FaTrash className="inline-block text-rose-600" />
			</Td>
		</tr>
	);
};

export default UserComponent;
