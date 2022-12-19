import { MutableRefObject, useMemo } from 'react';
import { FaRegHeart, FaHeart, FaRegCopy, FaRegComment } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { ProductType } from '@types';
import AddToFavorites from '@components/favorites/AddToFavorites';
import DeleteFavorite from '@components/favorites/DeleteFavorite';
import { useAuthContext } from '@context/authContext';
import { getFavProducts } from '@pages/user/favorites';
import { imageSrc } from '@utils/imageSrc';
import Stars from '@components/Stars';
import { numFormatter } from '@utils/numberFormatter';
import Copy from '@components/Copy';
import FavInProduct from '@components/favorites/FavInProduct';

interface ProductProps {
	linkCommentRef: MutableRefObject<HTMLDivElement | null>;
	product: ProductType<string>;
}

const ProductComponent = ({ linkCommentRef, product }: ProductProps) => {
	const { user } = useAuthContext();
	const src = imageSrc(product.image);

	return (
		<>
			<div className="flex flex-col sm:flex-row items-center mt-20 mb-10 sm:justify-center">
				<div className="flex justify-center items-center w-60 h-60 relative lg:w-64 lg:h-w-64">
					<img
						src={src}
						alt={product.name}
						className="top-0 right-0 left-0 bottom-0"
					/>
				</div>
				<div className="pt-10 sm:pt-0 md:pl-10">
					<h2 className="text-2xl font-semibold text-center mt-5 mb-2 md:text-3xl">
						{product.name}
					</h2>
					<div className="flex items-start justify-center my-1 font-semibold text-xl md:text-2xl">
						<span className="text-sm">$</span>
						<p>{product.price}</p>
					</div>
					<div className="flex items-center justify-center md:text-xl md:my-5">
						<Stars rating={product.rating} />
						<p className="pl-2 text-sm">
							{' '}
							({numFormatter(product.numComments)})
						</p>
					</div>
					<div className="flex items-center text-xl justify-center my-3 md:text-2xl">
						{user.token ? (
							<FavInProduct prodId={product._id} />
						) : (
							<AddToFavorites prodId={product._id}>
								<FaRegHeart
									title="Add To Favorites"
									className="fill-red-500 cursor-pointer"
								/>
							</AddToFavorites>
						)}

						<Copy text={window.location.href} styling="mx-4">
							<FaRegCopy title="Copy The Product Link" />
						</Copy>

						<div className="relative cursor-pointer" ref={linkCommentRef}>
							<FaRegComment title="See All Comments" />
							<span className="absolute h-4 w-4 rounded-full bg-slate-600 text-slate-100 flex justify-center items-center text-[0.5rem] top-2 left-3">
								{numFormatter(product.numComments)}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="px-2 py-5">
				<h3 className="text-xl py-2 font-semibold">Descriptions</h3>
				<p className="text-lg">{product.description}</p>
			</div>
		</>
	);
};

export default ProductComponent;
