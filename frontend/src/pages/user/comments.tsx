import Comments from '@components/comment/CommentsInProfile';
import Pagination from '@components/pagination';
import Spinner from '@components/spinner';
import UserNav from '@components/user/UserNav';
import { useAuthContext } from '@context/authContext';
import { useQuery } from '@tanstack/react-query';
import { CommentType } from '@types';
import { shop } from '@utils/api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface PaginatedComments {
	pages: number;
	comments: CommentType<string>[];
}

const UserComments = () => {
	const [page, setPage] = useState(1);
	const { user } = useAuthContext();
	const params = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ['userComments', page],
		queryFn: () => {
			return shop.get<PaginatedComments>(
				`/user/${params.id}/comments?page=${page}`,
				{
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			);
		},
	});

	return (
		<div>
			<UserNav />
			{isLoading && <Spinner />}
			{data ? (
				<>
					<Comments comments={data.data.comments} />
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

export default UserComments;
