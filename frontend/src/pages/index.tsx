import { useAuthContext } from '@context/authContext';
import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import { shop } from '@utils/api';
import { ProductType } from '@types';

export const productsLoader: LoaderFunction = async () => {
	const res = await shop.get('/products');

	return res.data;
};

const Home = () => {
	const products = useLoaderData() as ProductType<string>[];
	const { user } = useAuthContext();

	return (
		<div>
			Home
			<div>
				{user.token ? (
					<>
						<Link to="/logout">Logout</Link>
						<Link to={`/user/profile/${user.id}`}>User Profile</Link>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
					</>
				)}

				<ul>
					{products.map(product => {
						return (
							<li key={product._id}>
								<Link to={`/product/${product._id}`}>
									{product.name} - {product.price}$
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Home;
