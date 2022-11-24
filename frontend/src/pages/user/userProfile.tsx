import AdminProfile from '@components/profile/AdminProfile';
import UserProfile from '@components/profile/UserProfile';
import { useAuthContext } from '@context/authContext';
import { shop } from '@utils/api';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';

interface User {
	id: string;
	token: string;
	isAdmin: boolean;
	name: string;
}

export const userLoader: LoaderFunction = async () => {
	const user = JSON.parse(localStorage.getItem('user') as string);

	if (!user.token) {
		return redirect('/login');
	}
};

const UserPage = () => {
	const { user } = useAuthContext();

	return <>{user.isAdmin ? <AdminProfile /> : <UserProfile />}</>;
};

export default UserPage;
