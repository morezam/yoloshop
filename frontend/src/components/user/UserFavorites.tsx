import { Link } from 'react-router-dom';

interface FavProduct {
	_id: string;
	name: string;
}

const UserFavorites = ({ favs }: { favs: FavProduct[] }) => {
	return (
		<ul>
			{favs.map(fav => {
				return (
					<li key={fav._id}>
						<Link to={`/product/${fav._id}`}>{fav.name}</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default UserFavorites;
