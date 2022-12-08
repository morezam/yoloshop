import { ErrorRes, ProductType } from '@types';
import ProductForm from '@components/product/ProductForm';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useAuthContext } from '@context/authContext';
import DeleteProduct from '@components/product/DeleteProduct';
import { useErrorHandler } from 'react-error-boundary';
import { AxiosResponse } from 'axios';
import Btn from '@components/Btn';

const ProductDetailsComponent = ({
	product,
}: {
	product: ProductType<string>;
}) => {
	const { user } = useAuthContext();
	const errorHandler = useErrorHandler();

	const { mutate } = useMutation<
		AxiosResponse<string>,
		ErrorRes,
		ProductType<string>
	>({
		mutationFn: data => {
			return shop.put(`/products/${product._id}`, data, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			});
		},
		onSuccess(data) {
			console.log(data);
		},
		onError(error, variables, context) {
			errorHandler(error.response?.data);
		},
	});

	const onEditProduct = (data: ProductType<string>) => {
		mutate(data);
	};

	return (
		<ProductForm onSubmit={onEditProduct} initial={product}>
			<DeleteProduct
				id={product._id}
				to="/user/profile/products"
				image={product.image}>
				<Btn styling="col-start-1 col-end-3 mt-4">Delete</Btn>
			</DeleteProduct>
		</ProductForm>
	);
};

export default ProductDetailsComponent;
