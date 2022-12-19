import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { useNavigate } from 'react-router-dom';

const AddToFavorites = ({
	prodId,
	children,
}: {
	prodId: string;
	children: React.ReactNode;
}) => {
	const { user } = useAuthContext();

	const key = ['favorites'];
	const navigate = useNavigate();

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

			return { previousFavs };
		},
		onError(error, variables, context) {
			queryClient.setQueryData(key, context?.previousFavs);
		},
	});

	const onAddToFavs = () => {
		mutate();
	};

	return (
		<div
			onClick={() => {
				if (!user.token) {
					navigate(`/login?redirect=product/${prodId}`);
				} else {
					onAddToFavs();
				}
			}}>
			{children}
		</div>
	);
};

export default AddToFavorites;
