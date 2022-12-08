import ProfileNav from '@components/nav/ProfileNav';
import { useAuthContext } from '@context/authContext';
import { Link } from 'react-router-dom';

const UserNav = () => {
	const { user } = useAuthContext();
	const className =
		'text-slate-900 px-3 py-2 border-2 w-full text-center border-slate-200 md:text-inherit md:border-0 md:p-0';
	return (
		<ProfileNav>
			<Link to={`/user/profile/${user.id}/favorites`} className={className}>
				Favorites
			</Link>
			<Link to={`/user/profile/${user.id}/comments`} className={className}>
				Comments
			</Link>
			<Link to={`/user/profile/${user.id}/orders`} className={className}>
				Orders
			</Link>
		</ProfileNav>
	);
};

export default UserNav;
