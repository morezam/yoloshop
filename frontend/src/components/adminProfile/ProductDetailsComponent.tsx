import { ProductType } from '@types';
import ProductForm from '@components/product/ProductForm';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useAuthContext } from '@context/authContext';

const ProductDetailsComponent = ({
	product,
}: {
	product: ProductType<string>;
}) => {
	const { user } = useAuthContext();

	const { mutate } = useMutation({
		mutationFn: (data: ProductType<string>) => {
			return shop.put(`/products/${product._id}`, data, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			});
		},
		onSuccess(data) {
			console.log(data);
		},
	});

	const onEditProduct = (data: ProductType<string>) => {
		console.log(data);
		mutate(data);
	};

	return <ProductForm onSubmit={onEditProduct} initial={product} />;
};

export default ProductDetailsComponent;
