import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';

export const deleteFavorite = (token: string, prodId: string) => ({
	mutationFn: () => {
		return shop.delete(`/user/favorites/${prodId}`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	},
});

const DeleteFavorite = ({
	prodId,
	children,
}: {
	prodId: string;
	children: React.ReactNode;
}) => {
	const { user } = useAuthContext();

	const key = ['favorites'];

	const { mutate } = useMutation({
		...deleteFavorite(user.token as string, prodId),
		onMutate: async () => {
			await queryClient.cancelQueries(key);

			const previousFavs = queryClient.getQueryData(key);

			queryClient.setQueryData(key, (oldFavs: any) => {
				return {
					data: oldFavs.data.filter((fav: any) => fav._id !== prodId),
				};
			});

			return { previousFavs };
		},
		onError(error, variables, context) {
			queryClient.setQueryData(key, context?.previousFavs);
		},
		onSettled: () => {
			queryClient.invalidateQueries(key);
		},
	});

	const onFavDelete = () => {
		mutate();
	};

	return <div onClick={() => onFavDelete()}>{children}</div>;
};

export default DeleteFavorite;
