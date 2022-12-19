import Btn from '@components/Btn';
import Input from '@components/Input';
import { useAuthContext } from '@context/authContext';
import FormLayout from '@layouts/FormLayout';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { useForm } from 'react-hook-form';

interface CreateCommentData {
	rating: number;
	text: string;
}

const CreateComment = ({
	prodId,
	sort,
}: {
	prodId: string;
	sort: string | null;
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isValid },
	} = useForm<CreateCommentData>();
	const key = ['comments', prodId, sort];

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
		mutate({ rating: +data.rating, text: data.text });
		reset();
	};

	return (
		<FormLayout
			title="Leave a Comment"
			styling="sm:max-w-3xl sm:mx-auto mt-4 mb-8">
			<form onSubmit={handleSubmit(onCreateComment)} className="flex flex-col">
				<Input
					{...register('rating', {
						required: {
							value: true,
							message: 'This Field is required',
						},
					})}
					label="Rating"
					error={errors.rating?.message}
					type="number"
					min={0}
					max={5}
				/>
				<label htmlFor="text">Text: </label>
				<textarea
					className="mt-2 text-slate-900 focus:ring-0 focus:outline-0 px-2 py-1 rounded-md"
					{...register('text', {
						required: {
							value: true,
							message: 'This Field is required',
						},
					})}
					id="text"
					cols={10}
					rows={4}></textarea>
				<p className="text-rose-500">{errors.text?.message}</p>
				<Btn disabled={!isDirty} styling="my-4">
					Submit
				</Btn>
			</form>
		</FormLayout>
	);
};

export default CreateComment;
