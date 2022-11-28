import { ProductType } from '@types';

const ProductComponent = ({ product }: { product: ProductType<string> }) => {
	return <div>ProductComponent</div>;
};

export default ProductComponent;
