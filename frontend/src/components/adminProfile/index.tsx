import { Link } from 'react-router-dom';

const AdminProfile = () => {
	return (
		<div>
			<Link to={`/user/profile/products`}>All Products</Link>
			<Link to={`/user/profile/createProduct`}>Create Product</Link>
			<Link to={`/user/profile/allUsers`}>All Users</Link>
			<Link to={`/user/profile/orders`}>All Orders</Link>
			<Link to={'/user/profile/comments'}>Comments</Link>
		</div>
	);
};

export default AdminProfile;
