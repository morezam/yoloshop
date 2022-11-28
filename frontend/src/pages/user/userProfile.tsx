import { LoaderFunction, redirect } from 'react-router-dom';
import { useAuthContext } from '@context/authContext';
import AdminProfile from '@components/adminProfile';
import UserProfile from '@components/userProfile';

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
