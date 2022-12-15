import ProfileNav from '@components/nav/ProfileNav';
import { Link } from 'react-router-dom';

const AdminNav = () => {
	const className = 'text-slate-100 px-3 py-2 text-center md:py-0';
	return (
		<ProfileNav>
			<Link to={`/user/profile/products`} className={className}>
				All Products
			</Link>
			<Link to={`/user/profile/createProduct`} className={className}>
				Create Product
			</Link>
			<Link to={`/user/profile/allUsers`} className={className}>
				All Users
			</Link>
			<Link to={`/user/profile/orders`} className={className}>
				All Orders
			</Link>
			<Link to={'/user/profile/comments'} className={className}>
				Comments
			</Link>
		</ProfileNav>
	);
};

export default AdminNav;
