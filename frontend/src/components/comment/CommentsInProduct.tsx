import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { shop } from '@utils/api';
import { useAuthContext } from '@context/authContext';
import Stars from '@components/Stars';
import { CommentType } from '@types';
import CreateComment from './CreateComment';
import VoteComponent from './VoteComponent';
import { FaTrash } from 'react-icons/fa';
import DeleteComment from './DeleteComment';
import { MutableRefObject, useState } from 'react';

dayjs.extend(relativeTime);

interface CommentsIPProps {
	commentRef: MutableRefObject<HTMLDivElement | null>;
	prodId: string;
}

const CommentsInProduct = ({ commentRef, prodId }: CommentsIPProps) => {
	const { user } = useAuthContext();
	const [sort, setSort] = useState<string | null>('');

	const { data, refetch } = useQuery({
		queryKey: ['comments', prodId, sort],
		queryFn: () => {
			return shop.get<CommentType<string>[]>(
				`products/${prodId}/comments?sort=${sort}`
			);
		},
	});

	const sorts = [
		{ sort: 'most-recent', title: 'Most Recent' },
		{ sort: 'most-favorites', title: 'Most Favorites' },
	];

	return (
		<div ref={commentRef} className="mt-10 sm:max-w-2xl sm:mx-auto">
			<CreateComment prodId={prodId} sort={sort} />
			<select
				className="my-4"
				value={sort as string}
				onChange={e => {
					setSort(e.target.value);
				}}>
				{sorts.map(sortObj => (
					<option
						value={sortObj.sort}
						key={sortObj.sort}
						className={`cursor-pointer`}>
						{sortObj.title}
					</option>
				))}
			</select>
			<ul>
				{data &&
					data.data.map(comment => {
						return (
							<li
								key={comment._id}
								className="rounded-md my-2 shadow-xl pl-4 bg-gray-100 py-3">
								<div className="flex items-center py-2 justify-around border-b-2 border-b-gray-200 sm:justify-between sm:px-3">
									<div className="sm:flex sm:items-center">
										<p className="pr-5">{comment.userName}</p>
										<Stars rating={comment.rating} />
									</div>
									{user.isAdmin ? (
										<div className="cursor-pointer" title="Delete This Comment">
											<DeleteComment
												id={comment._id}
												prodId={comment.product}
												refetch={refetch}>
												<FaTrash className="text-red-500" />
											</DeleteComment>
										</div>
									) : null}
								</div>
								<p className="py-10 px-2">{comment.text}</p>
								<div className="flex justify-between items-center">
									<VoteComponent comment={comment} sort={sort} />
									<p className=" text-sm px-5">
										{dayjs(comment.createdAt).fromNow()}
									</p>
								</div>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default CommentsInProduct;
