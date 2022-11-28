import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { CommentType } from '@types';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';

const VoteComponent = ({ comment }: { comment: CommentType<string> }) => {
	const { user } = useAuthContext();

	const votedUser = comment.votedUsers.find(
		votedUser => votedUser._id === user.id
	);

	const { mutate: editLike } = useMutation({
		mutationFn: (like: boolean) => {
			return shop.put(
				`/comments/${comment._id}/like`,
				{
					userId: user.id,
					like,
				},
				{
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			);
		},
		onMutate: async like => {
			await queryClient.cancelQueries({
				queryKey: ['comment', comment.product],
			});

			const previousComment = queryClient.getQueryData([
				'comment',
				comment.product,
			]) as any;

			queryClient.setQueryData(
				['comment', comment.product],
				(oldComment: any) => {
					return {
						data: oldComment.data.map((prevComment: any) => {
							if (prevComment._id === comment._id) {
								if (votedUser) {
									if ((votedUser.like && like) || (!votedUser.like && !like)) {
										prevComment.votedUsers = prevComment.votedUsers.filter(
											(user: any) => user._id !== votedUser._id
										);

										prevComment.like = like
											? prevComment.like - 1
											: prevComment.like;
										prevComment.disLike = like
											? prevComment.disLike
											: prevComment.disLike - 1;
									}

									if ((votedUser.like && !like) || (!votedUser.like && like)) {
										votedUser.like = like;
										prevComment.like = like
											? prevComment.like + 1
											: prevComment.like - 1;
										prevComment.disLike = like
											? prevComment.disLike - 1
											: prevComment.disLike + 1;
									}
								} else {
									comment.votedUsers.push({
										_id: user.id as string,
										like,
									});

									prevComment.like = like
										? prevComment.like + 1
										: prevComment.like;
									prevComment.disLike = like
										? prevComment.disLike
										: prevComment.disLike + 1;
								}
								return prevComment;
							}
						}),
					};
				}
			);

			return { previousComment };
		},
		onError: (err, newTodo, context) => {
			queryClient.setQueryData(
				['comment', comment.product],
				context?.previousComment
			);
		},
		// onSettled: () => {
		// 	queryClient.invalidateQueries({ queryKey: ['comment', comment.product] });
		// },
	});

	return (
		<>
			<button
				onClick={() => editLike(true)}
				style={{ color: votedUser && votedUser.like ? 'red' : 'black' }}>
				like : {comment.like}
			</button>
			<p></p>
			<button
				onClick={() => editLike(false)}
				style={{
					color: votedUser ? (votedUser.like ? 'black' : 'red') : 'black',
				}}>
				disLike: {comment.disLike}
			</button>
		</>
	);
};

export default VoteComponent;
