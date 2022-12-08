import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { CommentType } from '@types';
import { useErrorHandler } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import TableLayout, { Td, Th } from '@layouts/TableLayout';
import { FaTrash } from 'react-icons/fa';

interface CommentsProps {
	comments: CommentType<string>[];
	onDelete?: (id: string, prodId: string) => void;
}

const Comments = ({ comments, onDelete }: CommentsProps) => {
	const [copiedText, copy] = useCopyToClipboard();

	// if (copiedText) {
	// 	alert('Text Copied');
	// }

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
						onDelete ? 'Delete' : '',
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
								<Td
									onClick={() => copy(comment.user)}
									styling="cursor-pointer font-mono hover:text-gray-500">
									{comment.user}
								</Td>
								{onDelete ? (
									<Td
										onClick={() => {
											onDelete(comment._id, comment.product);
										}}
										btn>
										<FaTrash className="text-rose-600 inline-block" />
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
