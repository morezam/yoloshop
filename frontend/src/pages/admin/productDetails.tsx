import { LoaderFunction, redirect, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { ProductType } from '@types';
import ProductDetailsComponent from '@components/profile/admin/ProductDetailsComponent';
import DeleteProduct from '@components/product/DeleteProduct';

const getProductDetails = (id: string) => ({
	queryKey: ['product', { id }],
	queryFn: async () => {
		return shop.get<ProductType<string>>(`/products/${id}`);
	},
});

export const productLoader: LoaderFunction = async ({ params }) => {
	const user = JSON.parse(window.localStorage.getItem('user') as string);
	const query = getProductDetails(params.id as string);

	if (!user.isAdmin) {
		redirect(`user/profile/${user.id}`);
	}

	return (
		queryClient.getQueryData(query.queryKey) ??
		(await queryClient.fetchQuery(query))
	);
};

const ProductDetails = () => {
	const params = useParams();
	const { data } = useQuery(getProductDetails(params.id as string));

	const product = data?.data as ProductType<string>;

	return (
		<div>
			<ProductDetailsComponent product={product} />
			<DeleteProduct
				id={product._id}
				to="/user/profile/products"
				image={product.image}
			/>
		</div>
	);
};

export default ProductDetails;
