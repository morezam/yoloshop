import { useAuthContext } from '@context/authContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CommentType } from '@types';
import { shop } from '@utils/api';
import CreateComment from './CreateComment';
import VoteComponent from './VoteComponent';

const CommentsInProduct = ({ prodId }: { prodId: string }) => {
	const { user } = useAuthContext();
	const { data, refetch } = useQuery({
		queryKey: ['comments', prodId],
		queryFn: () => {
			return shop.get<CommentType<string>[]>(`products/${prodId}/comments`);
		},
	});

	const { mutate: deleteComment } = useMutation({
		mutationFn: ({ id, prodId }: { id: string; prodId: string }) => {
			return shop.delete(`/comments/${id}`, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
				data: { prodId },
			});
		},
		onSuccess() {
			refetch();
		},
	});

	return (
		<>
			<CreateComment prodId={prodId} />
			<ul>
				{data &&
					data.data.map(comment => {
						return (
							<li key={comment._id}>
								<hr />
								{user.isAdmin ? (
									<button
										onClick={() =>
											deleteComment({
												id: comment._id,
												prodId: comment.product,
											})
										}>
										delete
									</button>
								) : null}
								<p>
									{comment.userName} - {comment.rating}
								</p>
								<p>{comment.text}</p>
								<VoteComponent comment={comment} />
								<hr />
								<hr />
								<hr />
							</li>
						);
					})}
			</ul>
		</>
	);
};

export default CommentsInProduct;
