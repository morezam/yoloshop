import { CommentType } from '@types';
import { Link } from 'react-router-dom';
import TableLayout, { Td } from '@layouts/TableLayout';
import { FaTrash } from 'react-icons/fa';
import Copy from '@components/Copy';
import DeleteComment from './DeleteComment';
import DeleteModal from '@components/modals/DeleteModal';
import React, { useState } from 'react';
import Btn from '@components/Btn';
import NotFound from '@components/NotFound';

interface CommentsProps {
	comments: CommentType<string>[];
	admin?: boolean;
	refetch?: any;
}

const Comments = ({ comments, admin, refetch }: CommentsProps) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div>
			{comments.length === 0 ? (
				<NotFound>No Comments Found</NotFound>
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
							<React.Fragment key={comment._id}>
								<tr>
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
										<Td onClick={() => setOpen(true)} btn>
											<FaTrash className="text-rose-600 inline-block" />
										</Td>
									) : null}
								</tr>
								<DeleteModal isOpen={isOpen} setOpen={setOpen}>
									<DeleteComment
										refetch={refetch}
										id={comment._id}
										prodId={comment.product}>
										<Btn
											onClick={() => setOpen(false)}
											styling="text-red-500 hover:bg-transparent bg-transparent">
											Delete
										</Btn>
									</DeleteComment>
								</DeleteModal>
							</React.Fragment>
						);
					})}
				</TableLayout>
			)}
		</div>
	);
};

export default Comments;
