import ErrorComponent from '@components/Error';
import Login from '@components/Login';
import Logout from '@components/Logout';
import Signup, { signupAction } from '@components/Signup';
import EmailSent from '@pages/email-sent';
import UserProfile, { userLoader } from '@pages/userProfile';
import { RouteObject } from 'react-router-dom';

export const userSignRoutes: RouteObject[] = [
	{
		path: '/login',
		element: <Login />,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/signup',
		element: <Signup />,
		action: signupAction,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/logout',
		element: <Logout />,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/email-sent',
		element: <EmailSent />,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/user/profile',
		element: <UserProfile />,
		loader: userLoader,
		errorElement: <ErrorComponent />,
	},
];
