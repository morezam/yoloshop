import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';

const AddToFavorites = ({ prodId }: { prodId: string }) => {
	const { user } = useAuthContext();

	const key = ['favorites'];

	const { mutate } = useMutation({
		mutationFn: () => {
			return shop.post(
				'/user/favorites',
				{ prodId },
				{
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			);
		},
		onMutate: async () => {
			await queryClient.cancelQueries(key);

			const previousFavs = queryClient.getQueryData(key);

			queryClient.setQueryData(key, (oldFavs: any) => {
				return {
					data: [...oldFavs.data, { _id: prodId }],
				};
			});

			console.log(queryClient.getQueryData(key));

			return { previousFavs };
		},
		onError(error, variables, context) {
			queryClient.setQueryData(key, context?.previousFavs);
		},
		// onSettled: () => {
		// 	queryClient.invalidateQueries(key);
		// },
	});

	const onAddToFavs = () => {
		mutate();
	};

	return <button onClick={() => onAddToFavs()}>Add To Favs</button>;
};

export default AddToFavorites;
