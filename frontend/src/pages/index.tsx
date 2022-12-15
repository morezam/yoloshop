import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [page, setPage] = useState(() =>
		searchParams.get('page') ? Number(searchParams.get('page')) : 1
	);
	const [sort, setSort] = useState<string | null>('');
	const [key, setKey] = useState<string | null>('');
	const { data } = useQuery({
		queryKey: ['products', page, key, sort],
		queryFn: async () => {
			return shop.get<PaginatedProducts>(
				`/products?page=${page}&key=${key}&limit=5&sort=${sort}`
			);
		},
	});

	const navigate = useNavigate();

	useEffect(() => {
		const key = location.search;
		if (searchParams.get('key')) {
			setKey(searchParams.get('key'));
		} else {
			setKey('');
		}
	}, [searchParams.get('key')]);

	useEffect(() => {
		if (searchParams.get('sort')) {
			setSort(searchParams.get('sort'));
		} else {
			setSort('');
		}
	}, [searchParams.get('sort')]);

	const onProductSearch = ({ key }: { key: string }) => {
		key === '' ? navigate('/') : navigate(`?key=${key}`);
		setKey(key);
	};

	const sorts = [
		{ sort: 'most-recent', title: 'Most Recent' },
		{ sort: 'most-viewed', title: 'Most Viewed' },
		{ sort: 'most-purchased', title: 'Most Purchased' },
		{ sort: 'most-favorites', title: 'Most Favorites' },
		{ sort: 'most-comments', title: 'Most Comments' },
		{ sort: 'top-rating', title: 'Top Rating' },
	];

	return (
		<div>
			<CustomErrorBoundary>
				<Nav onProductSearch={onProductSearch} term={key} />
				{data ? (
					<div className="lg:px-5 mb-10 xl:px-16">
						<select
							className="md:hidden my-4"
							value={sort as string}
							onChange={e => {
								navigate(`?sort=${e.target.value}`);
								setSort(e.target.value);
							}}>
							{sorts.map(sortObj => (
								<option
									value={sortObj.sort}
									key={sortObj.sort}
									className={`cursor-pointer ${
										searchParams.get('sort') === sortObj.sort
											? 'text-red-500'
											: 'text-gray-600'
									}`}>
									{sortObj.title}
								</option>
							))}
						</select>
						<div className="my-3 hidden md:flex ">
							{sorts.map(sort => (
								<NavLink
									to={`?sort=${sort.sort}`}
									onClick={() => {
										setSort(sort.sort);
									}}
									className={`md:px-2 lg:px-4  ${
										searchParams.get('sort') === sort.sort
											? 'text-red-500'
											: 'text-gray-600'
									}`}
									key={sort.sort}>
									{sort.title}
								</NavLink>
							))}
						</div>
						<ul className="grid  grid-cols-2 xs:grid-cols-3  gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
							{data.data.products.map(product => {
								return (
									<li
										key={product._id}
										className="hover:shadow-lg border-2 border-gray-200">
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
