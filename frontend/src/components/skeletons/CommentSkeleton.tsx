import Skeleton from 'react-loading-skeleton';

const CommentSkeleton = () => {
	return (
		<li className="rounded-md my-2 shadow-xl pl-4 bg-gray-100 py-3">
			<div className="flex items-center py-2  border-b-2 border-b-gray-200 sm:justify-between sm:px-3">
				<div className="sm:flex sm:items-center">
					<p className="pr-5">
						<Skeleton className="w-24" />
					</p>
					<Skeleton className="w-20" />
				</div>
			</div>
			<p className="py-10 px-2">
				<Skeleton className="w-11/12" />
			</p>
			<div className="flex justify-between items-center">
				<div className="flex items-center sm:justify-end">
					<div className="mx-2">
						<Skeleton className="py-1 px-6 rounded-lg " />
					</div>
					<div className="mx-2">
						<Skeleton className="py-1 px-6 rounded-lg " />
					</div>
				</div>
				<p className=" text-sm px-5">
					<Skeleton className="w-24" />
				</p>
			</div>
		</li>
	);
};

export default CommentSkeleton;
