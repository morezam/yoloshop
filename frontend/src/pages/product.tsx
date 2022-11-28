import ProductComponent from '@components/product/ProductComponent';
import { useQuery } from '@tanstack/react-query';
import { CommentType, ProductType } from '@types';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { lazy, Suspense } from 'react';
import { LoaderFunction, useParams } from 'react-router-dom';

const Comments = lazy(() => import('@components/comment/CommentsInProduct'));

const getProduct = (id: string) => ({
	queryKey: ['product', id],
	queryFn: () => {
		return shop.get<ProductType<string>>(`/products/${id}`);
	},
});

export const productLoader: LoaderFunction = async ({ params }) => {
	const id = params.id as string;

	const query = getProduct(id);

	return (
		queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
	);
};

const Product = () => {
	const params = useParams();
	const { data } = useQuery(getProduct(params.id as string));

	return (
		<>
			{data && <ProductComponent product={data.data} />}
			<Suspense fallback={<p>Loading...</p>}>
				<Comments prodId={params.id as string} />
			</Suspense>
		</>
	);
};

export default Product;
