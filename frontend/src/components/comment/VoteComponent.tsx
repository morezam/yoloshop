import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import {
	AiOutlineLike,
	AiOutlineDislike,
	AiFillLike,
	AiFillDislike,
} from 'react-icons/ai';
import { CommentType } from '@types';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { numFormatter } from '@utils/numberFormatter';
import { useNavigate } from 'react-router-dom';

const VoteComponent = ({
	comment,
	sort,
}: {
	comment: CommentType<string>;
	sort: string | null;
}) => {
	const { user } = useAuthContext();
	const key = ['comments', comment.product, sort];
	const navigate = useNavigate();

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
				queryKey: key,
			});

			const previousComment = queryClient.getQueryData(key) as any;

			queryClient.setQueryData(key, (oldComment: any) => {
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
						}
						return prevComment;
					}),
				};
			});

			return { previousComment };
		},
		onError: (err, data, context) => {
			queryClient.setQueryData(key, context?.previousComment);
		},
	});

	return (
		<div className="text-lg flex items-center sm:justify-end">
			<div
				onClick={() => {
					user.token
						? editLike(true)
						: navigate(`/login?redirect=product/${comment.product}`);
				}}
				className={`flex items-center mx-2 px-2  rounded-lg border-2 border-slate-300 cursor-pointer ${
					votedUser && votedUser.like ? 'bg-slate-300' : ''
				}`}>
				{votedUser && votedUser.like ? <AiFillLike /> : <AiOutlineLike />}{' '}
				<p className="pl-1">{numFormatter(comment.like ? comment.like : 0)}</p>
			</div>
			<div
				onClick={() => {
					user.token
						? editLike(false)
						: navigate(`/login?redirect=product/${comment.product}`);
				}}
				className={`flex items-center mx-2 px-2 rounded-lg border-2 border-slate-300 cursor-pointer ${
					votedUser ? (votedUser.like ? '' : 'bg-slate-300') : ''
				} `}>
				{votedUser ? (
					votedUser.like ? (
						<AiOutlineDislike />
					) : (
						<AiFillDislike />
					)
				) : (
					<AiOutlineDislike />
				)}{' '}
				<p className="pl-1">
					{numFormatter(comment.disLike ? comment.disLike : 0)}
				</p>
			</div>
		</div>
	);
};

export default VoteComponent;
