import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { CommentType } from '@types';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { useForm } from 'react-hook-form';

interface CreateCommentData {
	rating: number;
	text: string;
}

const CreateComment = ({ prodId }: { prodId: string }) => {
	const { register, handleSubmit } = useForm<CreateCommentData>({
		defaultValues: {
			rating: 0,
			text: '',
		},
	});
	const key = ['comments', prodId];

	const { user } = useAuthContext();

	const { mutate } = useMutation({
		mutationFn: (data: CreateCommentData) => {
			return shop.post(
				'comments',
				{ ...data, prodId },
				{
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			);
		},
		onMutate: async data => {
			await queryClient.cancelQueries(key);

			const comment = {
				_id: `${Date.now()}${data.text}`,
				userName: user.name,
				rating: data.rating,
				text: data.text,
				user: user.id,
				product: prodId,
				like: 0,
				disLike: 0,
				votedUsers: [],
			};

			const previousComments = queryClient.getQueryData(key);

			queryClient.setQueryData(key, (oldComments: any) => {
				return {
					data: [...oldComments.data, comment],
				};
			});

			console.log(queryClient.getQueryData(key));

			return { previousComments };
		},
		onError(error, variables, context) {
			queryClient.setQueryData(key, context?.previousComments);
		},
		onSettled: () => {
			queryClient.invalidateQueries(key);
		},
	});

	const onCreateComment = (data: CreateCommentData) => {
		console.log(data);
		mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onCreateComment)}>
			<label htmlFor="rating">Rating: </label>
			<input
				{...register('rating')}
				type="number"
				id="rating"
				min={0}
				max={5}
			/>
			<label htmlFor="text">Text: </label>
			<textarea {...register('text')} id="text" cols={30} rows={10}></textarea>
		</form>
	);
};

export default CreateComment;
