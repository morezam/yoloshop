import AdminNav from '@components/adminProfile/AdminNav';
import Comments from '@components/comment/CommentsInProfile';
import Pagination from '@components/pagination';
import { useAuthContext } from '@context/authContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CommentType } from '@types';
import { shop } from '@utils/api';
import { useState } from 'react';

interface PaginatedComments {
	pages: number;
	comments: CommentType<string>[];
}

const AllComments = () => {
	const [page, setPage] = useState(1);
	const { user } = useAuthContext();

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

	const { mutate } = useMutation({
		mutationFn: ({ id, prodId }: { id: string; prodId: string }) => {
			return shop.delete(`/comments/${id}`, { ...config, data: { prodId } });
		},
		onSuccess() {
			refetch();
		},
	});

	const deleteComment = (id: string, prodId: string) => {
		mutate({ id, prodId });
	};

	return (
		<div>
			{data ? (
				<>
					<AdminNav />
					<Comments comments={data.data.comments} admin />
					<Pagination
						currentPage={page}
						pageSize={10}
						totalPageCount={data.data.pages}
						onPageChange={page => setPage(page)}
					/>
				</>
			) : null}
		</div>
	);
};

export default AllComments;
