import { ProductType } from '@types';
import { Link } from 'react-router-dom';

const ProductPreview = ({ product }: { product: ProductType<string> }) => {
	// TODO : change this to production URL
	const src = product.image.startsWith('/')
		? `http://localhost:5000${product.image}`
		: product.image;

	return (
		<div>
			<div className="flex flex-row-reverse border-2 border-slate-500">
				<div className="relative w-14 h-14 bg-gray-100">
					<img
						src={src}
						alt={product.name}
						className="absolute top-0 right-0 left-0 bottom-0 max-h-full max-w-full"
					/>
				</div>
				<p>{product.name}</p>
				<p>${product.price}</p>
			</div>
		</div>
	);
};

export default ProductPreview;
