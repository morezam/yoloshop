import Nav from '@components/Nav';
import { useAuthContext } from '@context/authContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
	const { user } = useAuthContext();

	const className =
		'bg-slate-600 text-slate-100 rounded-md px-3 py-2 my-2 shadow-md transition-all duration-300 hover:bg-slate-300 hover:text-slate-600';
	return (
		<div>
			<Nav />
			<h2 className="text-center my-3 text-lg">
				Welcome To Admin Panel {user.name}
			</h2>
			<div className="flex flex-col justify-center mx-auto max-w-lg text-center px-2">
				<Link to={`/user/profile/${user.id}/favorites`} className={className}>
					Favorites
				</Link>
				<Link to={`/user/profile/${user.id}/comments`} className={className}>
					Comments
				</Link>
				<Link to={`/user/profile/${user.id}/orders`} className={className}>
					Orders
				</Link>
			</div>
		</div>
	);
};

export default UserProfile;
