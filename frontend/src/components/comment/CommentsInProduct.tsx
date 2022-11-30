import { useQuery } from '@tanstack/react-query';
import { CommentType } from '@types';
import { shop } from '@utils/api';
import CreateComment from './CreateComment';
import VoteComponent from './VoteComponent';

const CommentsInProduct = ({ prodId }: { prodId: string }) => {
	const { data } = useQuery({
		queryKey: ['comments', prodId],
		queryFn: () => {
			return shop.get<CommentType<string>[]>(`/comments/${prodId}`);
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
								<p>
									{comment.userName} - {comment.rating}
								</p>
								<p>{comment.text}</p>
								<VoteComponent comment={comment} />
							</li>
						);
					})}
			</ul>
		</>
	);
};

export default CommentsInProduct;
