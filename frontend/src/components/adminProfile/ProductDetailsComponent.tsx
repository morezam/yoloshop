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
import Spinner from '@components/spinner';
import DeleteModal from '@components/modals/DeleteModal';
import { useState } from 'react';

const ProductDetailsComponent = ({
	product,
}: {
	product: ProductType<string>;
}) => {
	const { user } = useAuthContext();
	const errorHandler = useErrorHandler();
	const navigate = useNavigate();
	const [isOpen, setOpen] = useState(false);

	const { mutate, isLoading } = useMutation<
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
		onError(error, variables, context) {
			errorHandler(error.response?.data);
		},
	});

	const onEditProduct = (data: ProductType<string>) => {
		mutate(data, {
			onSuccess(data) {
				data.statusText === 'OK' && navigate('/user/profile/products');
			},
		});
	};

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<ProductForm onSubmit={onEditProduct} initial={product}>
					<div
						className="px-2 py-1 rounded-md text-center cursor-pointer inline col-start-2 bg-red-500 text-slate-50 col-end-3 mt-4"
						onClick={() => setOpen(true)}>
						Delete Product
					</div>
					<DeleteModal isOpen={isOpen} setOpen={setOpen}>
						<DeleteProduct id={product._id} image={product.image}>
							<Btn styling="bg-transparent text-red-500 hover:bg-transparent">
								Delete
							</Btn>
						</DeleteProduct>
					</DeleteModal>
				</ProductForm>
			)}
		</>
	);
};

export default ProductDetailsComponent;
