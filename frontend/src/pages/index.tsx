import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { ProductType } from '@types';
import CustomErrorBoundary from '@components/CustomErrorBoundary';
import Pagination from '@components/pagination';
import ProductCard from '@components/product/ProductCard';
import Nav from '@components/Nav';

interface PaginatedProducts {
	page: number;
	pages: number;
	products: ProductType<string>[];
}

const Home = () => {
	const [page, setPage] = useState(1);
	const [key, setKey] = useState('');
	const { data } = useQuery({
		queryKey: ['products', page, key],
		queryFn: async () => {
			return shop.get<PaginatedProducts>(
				`/products?page=${page}&key=${key}&limit=12`
			);
		},
	});

	const onProductSearch = ({ key }: { key: string }) => {
		setKey(key);
	};

	return (
		<div>
			<CustomErrorBoundary>
				<Nav onProductSearch={onProductSearch} />
				{data ? (
					<div className="lg:px-5 xl:px-16">
						<ul className="grid  grid-cols-2 xs:grid-cols-3  gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
							{data.data.products.map(product => {
								return (
									<li key={product._id}>
										<Link to={`/product/${product._id}`}>
											<ProductCard product={product} />
										</Link>
									</li>
								);
							})}
						</ul>
						<Pagination
							currentPage={page}
							onPageChange={page => setPage(page)}
							pageSize={15}
							totalPageCount={data.data.pages}
						/>
					</div>
				) : null}
			</CustomErrorBoundary>
		</div>
	);
};

export default Home;
