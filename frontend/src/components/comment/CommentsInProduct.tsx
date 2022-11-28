import { useQuery } from '@tanstack/react-query';
import { CommentType } from '@types';
import { shop } from '@utils/api';
import VoteComponent from './VoteComponent';

const CommentsInProduct = ({ prodId }: { prodId: string }) => {
	const { data } = useQuery({
		queryKey: ['comment', prodId],
		queryFn: () => {
			return shop.get<CommentType<string>[]>(`/comments/${prodId}`);
		},
	});

	return (
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
	);
};

export default CommentsInProduct;
