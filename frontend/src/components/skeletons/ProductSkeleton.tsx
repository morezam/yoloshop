import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = () => {
	return (
		<div className="w-[135px] xs:w-36 sm:w-48 lg:w-48 xl:w-64 mx-auto h-96 rounded-md py-3 px-4 flex flex-col items-center justify-between">
			<div className="relative w-32 h-32 lg:w-48 lg:h-48">
				<Skeleton className="absolute top-0 bottom-0 right-0 left-0 m-auto max-w-full max-h-full" />
			</div>
			<div className="flex flex-col justify-between mt-4 self-start">
				<div className="flex items-center">
					<Skeleton className="w-12" />
				</div>
				<Skeleton className="w-28" />
			</div>
			<div className="flex items-center justify-self-end self-start">
				<Skeleton className="w-28" /> <Skeleton className="w-5 ml-3" />
			</div>
		</div>
	);
};

export default ProductSkeleton;
