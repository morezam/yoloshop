import { Link } from 'react-router-dom';
import DeleteFavorite from './DeleteFavorite';

export interface Favorite {
	_id: string;
	name: string;
	image: string;
}

const ShowFavorites = ({ favorites }: { favorites: Favorite[] }) => {
	return (
		<ul>
			{favorites.map(favorite => {
				return (
					<li key={favorite._id}>
						<Link to={`/product/${favorite._id}`}>{favorite.name}</Link>
						<DeleteFavorite prodId={favorite._id} />
					</li>
				);
			})}
		</ul>
	);
};

export default ShowFavorites;
