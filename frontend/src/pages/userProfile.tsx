import AdminProfile from '@components/profile/AdminProfile';
import UserProfile from '@components/profile/UserProfile';
import { shop } from '@utils/api';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';

interface User {
	id: string;
	token: string;
	isAdmin: boolean;
	name: string;
}

export const userLoader: LoaderFunction = async () => {
	const token = localStorage.getItem('token');

	if (!token) {
		return redirect('/login');
	}
	const res = await shop.get('/user/profile', {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	return res.data;
};

const UserPage = () => {
	const user = useLoaderData() as User;

	return <>{user.isAdmin ? <AdminProfile /> : <UserProfile />}</>;
};

export default UserPage;
