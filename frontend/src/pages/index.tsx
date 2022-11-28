import { useAuthContext } from '@context/authContext';
import { Link, LoaderFunction } from 'react-router-dom';
import { shop } from '@utils/api';
import { ProductType } from '@types';
import { queryClient } from '@utils/queryClient';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CustomErrorBoundary from '@components/CustomErrorBoundary';

interface PaginatedProducts {
	page: number;
	pages: number;
	products: ProductType<string>[];
}

const getProducts = (page: number) => ({
	queryKey: ['products', page],
	queryFn: async () => {
		return shop.get<PaginatedProducts>(`/products?page=${page}`);
	},
});

export const productsLoader: LoaderFunction = async () => {
	const query = getProducts(1);

	return (
		queryClient.getQueryData(query.queryKey) ??
		(await queryClient.fetchQuery(query))
	);
};

const Home = () => {
	const [page, setPage] = useState(1);
	const { data } = useQuery(getProducts(page));
	const { user } = useAuthContext();

	return (
		<div>
			Home
			<CustomErrorBoundary>
				<div>
					{user.token ? (
						<>
							<Link to="/logout">Logout</Link>
							<Link to={`/user/profile/${user.id}`}>
								{user.isAdmin ? 'Admin Page' : 'User Profile'}
							</Link>
						</>
					) : (
						<>
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</>
					)}

					<ul>
						{data?.data.products.map(product => {
							return (
								<li key={product._id}>
									<Link to={`/product/${product._id}`}>
										{product.name} - {product.price}$
									</Link>
								</li>
							);
						})}
					</ul>
					{data?.data.pages === 1 ? null : (
						<>
							{[...Array(data?.data.pages).keys()].map(num => (
								<button
									disabled={num + 1 === page}
									key={num}
									onClick={() => setPage(num + 1)}>
									{num + 1}
								</button>
							))}
						</>
					)}
				</div>
			</CustomErrorBoundary>
		</div>
	);
};

export default Home;
