import { ProductType } from '@types';
import { imageSrc } from '@utils/imageSrc';
import { Link } from 'react-router-dom';

interface ProductPrevProps {
	item: {
		name: string;
		qty: number;
		price: number;
		image: string;
		product: string | ProductType<string>;
	};
	index: number;
	children?: React.ReactNode;
}

const ProductPreview = ({ item, index, children }: ProductPrevProps) => {
	const src = imageSrc(item.image);

	return (
		<li
			key={item.product as string}
			className="relative pt-7 flex flex-col my-3 border-2 border-gray-200 items-center py-3 px-2 rounded-md mx-1 md:flex-row sm:p-10">
			<p className="absolute left-[-5px] text-xl top-[-10px] bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center ">
				{index + 1}
			</p>
			<Link to={`/product/${item.product}`} className="flex-1">
				<div className="flex sm:items-center sm:text-lg ">
					<div className="relative w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
						<img
							src={src}
							alt={item.name}
							className="max-w-full max-h-full absolute top-0 bottom-0 right-0 left-0"
						/>
					</div>
					<div className="pl-3">
						<h3 className="font-semibold">{item.name}</h3>
						<p>${item.price * item.qty}</p>
					</div>
				</div>
			</Link>
			{children}
		</li>
	);
};

export default ProductPreview;
