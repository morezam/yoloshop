import { useAuthContext } from '@context/authContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CommentType } from '@types';
import { shop } from '@utils/api';
import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Link } from 'react-router-dom';

interface PaginatedComments {
	page: number;
	pages: number;
	comments: CommentType<string>[];
}

const Comments = () => {
	const [page, setPage] = useState(1);
	const { user } = useAuthContext();
	const handleError = useErrorHandler();

	const config = {
		headers: {
			authorization: `Bearer ${user.token}`,
		},
	};

	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['comments', page],
		queryFn: () => {
			return shop.get<PaginatedComments>(`/comments?page=${page}`, config);
		},
	});

	const { mutate: deleteComment } = useMutation({
		mutationFn: ({ id, prodId }: { id: string; prodId: string }) => {
			return shop.delete(`/comments/${id}`, { ...config, data: { prodId } });
		},
		onSuccess() {
			refetch();
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		handleError(error);
	}

	return (
		<>
			{data ? (
				data.data.comments.length === 0 ? (
					<p>No Comments Found</p>
				) : (
					<>
						<ul>
							{data.data.comments.map(comment => {
								return (
									<li key={comment._id}>
										{comment.text} - {comment.userName} -{' '}
										<Link to={`/products/${comment.product}`}>Product</Link>
										{user.isAdmin ? (
											<button
												onClick={() => {
													deleteComment({
														id: comment._id,
														prodId: comment.product,
													});
												}}>
												delete
											</button>
										) : null}
									</li>
								);
							})}
						</ul>
						{[...Array(data?.data.pages).keys()].map(num => (
							<button
								disabled={num + 1 === page}
								key={num}
								onClick={() => setPage(num + 1)}>
								{num + 1}
							</button>
						))}
					</>
				)
			) : null}
		</>
	);
};

export default Comments;
