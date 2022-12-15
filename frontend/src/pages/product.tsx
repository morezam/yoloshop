import { lazy, Suspense, useEffect, useRef, MutableRefObject } from 'react';
import { LoaderFunction, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductComponent from '@components/product/ProductComponent';
import { ProductType } from '@types';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import CartActions from '@components/product/CartActions';
import Nav from '@components/Nav';

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
	const linkCommentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
	const commentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

	useEffect(() => {
		if (linkCommentRef.current) {
			linkCommentRef.current.addEventListener('click', () => {
				commentRef.current?.scrollIntoView({ behavior: 'smooth' });
			});
		}
	}, [linkCommentRef.current, commentRef.current]);

	return (
		<>
			<Nav />
			<div className="relative mb-20 sm:max-w-4xl xl:max-w-6xl sm:px-10 sm:mx-auto">
				{data && (
					<ProductComponent
						linkCommentRef={linkCommentRef}
						product={data.data}
					/>
				)}
				<Suspense fallback={<p>Loading...</p>}>
					<Comments commentRef={commentRef} prodId={params.id as string} />
				</Suspense>
			</div>
			{data && <CartActions product={data.data} />}
		</>
	);
};

export default Product;
