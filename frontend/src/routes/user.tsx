import ErrorComponent from '@components/Error';
import Login from '@pages/login';
import Logout from '@components/userSign/Logout';
import Signup, { signupAction } from '@pages/signup';
import EmailSent from '@pages/email-sent';
import ForgetPassword from '@pages/forgetPassword';
import UserProfile, { userLoader } from '@pages/user/userProfile';
import VerifySecNum from '@pages/verify-secNum';
import { RouteObject } from 'react-router-dom';
import Favorites, { favLoader } from '@pages/user/favorites';
import Comments from '@components/comment/CommentsInProfile';

export const userSignRoutes: RouteObject[] = [
	{
		path: '/login',
		element: <Login />,
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
		path: '/user/profile/:id',
		element: <UserProfile />,
		loader: userLoader,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/password-reset',
		element: <ForgetPassword />,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/verify-secNum',
		element: <VerifySecNum />,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/user/profile/:id/favorites',
		element: <Favorites />,
		loader: favLoader,
		errorElement: <ErrorComponent />,
	},
	{
		path: '/user/profile/:id/comments',
		element: <Comments />,
		errorElement: <ErrorComponent />,
	},
];
