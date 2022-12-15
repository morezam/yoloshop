import { ErrorRes, ProductType } from '@types';
import ProductForm from '@components/product/ProductForm';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useAuthContext } from '@context/authContext';
import DeleteProduct from '@components/product/DeleteProduct';
import { useErrorHandler } from 'react-error-boundary';
import { AxiosResponse } from 'axios';
import Btn from '@components/Btn';
import { useNavigate } from 'react-router-dom';

const ProductDetailsComponent = ({
	product,
}: {
	product: ProductType<string>;
}) => {
	const { user } = useAuthContext();
	const errorHandler = useErrorHandler();
	const navigate = useNavigate();

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
			navigate('/user/profile/products');
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
				<Btn styling="inline col-start-1 col-end-3 mt-4">Delete Product</Btn>
			</DeleteProduct>
		</ProductForm>
	);
};

export default ProductDetailsComponent;
