import { useAuthContext } from '@context/authContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
	const { user } = useAuthContext();
	return (
		<div>
			UserProfile
			<Link to={`/user/profile/${user.id}/favorites`}>Favorites</Link>
			<Link to={`/user/profile/${user.id}/comments`}>Comments</Link>
		</div>
	);
};

export default UserProfile;