import Stars from '@components/Stars';
import { ProductType } from '@types';

const ProductCard = ({ product }: { product: ProductType<string> }) => {
	return (
		<div className="w-[135px] xs:w-36 sm:w-48 lg:w-48 xl:w-52 mx-auto h-72 border-2 border-gray-300 rounded-md py-3 px-4 flex flex-col items-center justify-between">
			<div className="relative w-32 h-32">
				<img
					src={product.image}
					alt={product.name}
					className="absolute top-0 bottom-0 right-0 left-0 m-auto max-w-full max-h-full"
				/>
			</div>
			<div className="flex flex-col justify-between mt-4 self-start">
				<div className="flex items-center">
					<span className="font-normal text-xs mb-1">$ </span>
					<p className="text-lg font-semibold">{product.price}</p>
				</div>
				<p className="text-xs">{product.name}</p>
			</div>
			<div className="justify-self-end self-start">
				<Stars rating={product.rating} />
			</div>
		</div>
	);
};

export default ProductCard;
