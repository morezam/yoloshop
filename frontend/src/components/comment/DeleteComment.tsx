import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';

interface DeleteCommentProps {
	children: React.ReactNode;
	id: string;
	prodId: string;
	refetch?: () => void;
}

const DeleteComment = ({
	id,
	prodId,
	refetch,
	children,
}: DeleteCommentProps) => {
	const { user } = useAuthContext();

	const { mutate } = useMutation({
		mutationFn: () => {
			return shop.delete(`/comments/${id}`, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
				data: { prodId },
			});
		},
		onSuccess() {
			refetch ? refetch() : queryClient.cancelQueries(['comments']);
		},
	});

	return <div onClick={() => mutate()}>{children}</div>;
};

export default DeleteComment;
