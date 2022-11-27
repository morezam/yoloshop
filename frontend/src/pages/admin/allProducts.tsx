import { LoaderFunction } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import ProductComponent from '@components/profile/admin/ProductComponent';
import { ProductType } from '@types';
import { useState } from 'react';

interface ResponseData {
	products: ProductType<string>[];
	pages: number;
	page: number;
}

// const getAllProducts = () => ({
// 	queryKey: ['allProducts'],
// 	queryFn: async () => {
// 		return shop.get('/products');
// 	},
// });

// export const productsLoader: LoaderFunction = async () => {
// 	const query = getAllProducts();

// 	return (
// 		queryClient.getQueryData(query.queryKey) ??
// 		(await queryClient.fetchQuery(query))
// 	);
// };

const Products = () => {
	const [page, setPage] = useState(1);

	const { data } = useQuery({
		queryKey: ['allProducts', page],
		queryFn: async () => {
			return shop.get<ResponseData>(`/products?page=${page}`);
		},
		keepPreviousData: true,
	});
	return (
		<>
			{data ? (
				<>
					<ul>
						{data.data.products.map(product => {
							return <ProductComponent key={product._id} product={product} />;
						})}
					</ul>{' '}
					{[...Array(data.data.pages).keys()].map(num => (
						<button
							disabled={num + 1 === page}
							key={num}
							onClick={() => setPage(num + 1)}>
							{num + 1}
						</button>
					))}
				</>
			) : null}
		</>
	);
};

export default Products;
