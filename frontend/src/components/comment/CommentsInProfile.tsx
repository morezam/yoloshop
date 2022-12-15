import { CommentType } from '@types';
import { Link } from 'react-router-dom';
import TableLayout, { Td } from '@layouts/TableLayout';
import { FaTrash } from 'react-icons/fa';
import Copy from '@components/Copy';
import DeleteComment from './DeleteComment';

interface CommentsProps {
	comments: CommentType<string>[];
	admin?: boolean;
}

const Comments = ({ comments, admin }: CommentsProps) => {
	return (
		<div>
			{comments.length === 0 ? (
				<p>No Comments Found</p>
			) : (
				<TableLayout
					headers={[
						'R',
						'Text',
						'Product',
						'User Id',
						'User Name',
						admin ? 'Delete' : '',
					]}>
					{comments.map((comment, i) => {
						return (
							<tr key={comment._id}>
								<Td>{i + 1}</Td>
								<Td>
									<p className="w-40 sm:w-48 md:w-72 lg:w-[450px]">
										{comment.text}
									</p>
								</Td>
								<Td btn>
									<Link to={`/product/${comment.product}`}>Product</Link>
								</Td>
								<Td>{comment.userName}</Td>
								<Td>
									<Copy
										styling="font-mono hover:text-gray-500"
										text={comment.user}>
										{comment.user}
									</Copy>
								</Td>
								{admin ? (
									<Td btn>
										<DeleteComment id={comment._id} prodId={comment.product}>
											<FaTrash className="text-rose-600 inline-block" />
										</DeleteComment>
									</Td>
								) : null}
							</tr>
						);
					})}
				</TableLayout>
			)}
		</div>
	);
};

export default Comments;
