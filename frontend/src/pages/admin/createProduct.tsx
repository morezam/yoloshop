import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useAuthContext } from '@context/authContext';
import { ProductType } from '@types';
import ProductForm from '@components/product/ProductForm';
import AdminNav from '@components/adminProfile/AdminNav';

const CreateProduct = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();

	if (user && !user.isAdmin) {
		navigate(`/user/profile/${user.id}`);
	}

	const { mutate } = useMutation({
		mutationFn: (newProduct: ProductType<string>) => {
			return shop.post('/products', newProduct, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			});
		},
		onSuccess() {
			navigate(`/user/profile/products`);
		},
	});

	const onCreateProduct = (data: ProductType<string>) => {
		mutate({ ...data });
	};

	return (
		<>
			<AdminNav />
			<ProductForm onSubmit={onCreateProduct} />
		</>
	);
};

export default CreateProduct;
