import { CommentType } from '@types';
import { useErrorHandler } from 'react-error-boundary';
import { Link } from 'react-router-dom';

interface CommentsProps {
	comments: CommentType<string>[];
	onDelete?: (id: string, prodId: string) => void;
}

const Comments = ({ comments, onDelete }: CommentsProps) => {
	const handleError = useErrorHandler();

	return (
		<div>
			{comments.length === 0 ? (
				<p>No Comments Found</p>
			) : (
				<ul>
					{comments.map(comment => {
						return (
							<li key={comment._id}>
								{comment.text} - {comment.userName} -{' '}
								<Link to={`/products/${comment.product}`}>Product</Link>
								{onDelete ? (
									<button
										onClick={() => {
											onDelete(comment._id, comment.product);
										}}>
										delete
									</button>
								) : null}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Comments;
