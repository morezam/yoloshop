import TableLayout, { Td } from '@layouts/TableLayout';
import { Link } from 'react-router-dom';
import DeleteFavorite from './DeleteFavorite';

export interface Favorite {
	_id: string;
	name: string;
	image: string;
}

const ShowFavorites = ({ favorites }: { favorites: Favorite[] }) => {
	return (
		<TableLayout
			headers={['R', 'Image', 'Product Name', 'Product Page', 'Delete']}>
			{favorites.map((favorite, i) => {
				return (
					<tr key={favorite._id}>
						<Td>{i + 1}</Td>
						<Td>
							<div className="w-16">
								<img src={favorite.image} alt={favorite.name} />
							</div>
						</Td>
						<Td>{favorite.name}</Td>
						<Td btn>
							<Link to={`/product/${favorite._id}`}>page</Link>
						</Td>
						<Td btn>
							<DeleteFavorite prodId={favorite._id}>Delete</DeleteFavorite>
						</Td>
					</tr>
				);
			})}
		</TableLayout>
	);
};

export default ShowFavorites;
