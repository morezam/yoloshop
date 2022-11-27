import { ProductType } from '@types';
import { Link } from 'react-router-dom';

const ProductComponent = ({ product }: { product: ProductType<string> }) => {
	return (
		<li key={product._id}>
			<Link to={`/user/profile/product/${product._id}`}>
				<p>{product.name}</p>
				<img src={`http://localhost:5000${product.image}`} alt={product.name} />
				<p>{product.price}</p>
			</Link>
		</li>
	);
};

export default ProductComponent;
