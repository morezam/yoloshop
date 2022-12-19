import TableLayout, { Td } from '@layouts/TableLayout';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DeleteFavorite from './DeleteFavorite';

export interface Favorite {
	_id: string;
	name: string;
	image: string;
}

const ShowFavorites = ({ favorites }: { favorites: Favorite[] }) => {
	return (
		<TableLayout headers={['R', 'Product Name', 'Product Page', 'Delete']}>
			{favorites.map((favorite, i) => {
				return (
					<tr key={favorite._id}>
						<Td>{i + 1}</Td>
						<Td>{favorite.name}</Td>
						<Td btn>
							<Link to={`/product/${favorite._id}`}>page</Link>
						</Td>
						<Td btn>
							<DeleteFavorite prodId={favorite._id}>
								<FaTrash className="fill-red-500 inline-block" />
							</DeleteFavorite>
						</Td>
					</tr>
				);
			})}
		</TableLayout>
	);
};

export default ShowFavorites;
