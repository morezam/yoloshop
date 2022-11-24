import { ActionFunction, redirect } from 'react-router-dom';
import { shop } from '@utils/api';
import { UserType } from '@types';
import SignupComponent from '@components/userSign/Signup';

export const signupAction: ActionFunction = async ({ request }) => {
	const data = Object.fromEntries(await request.formData());

	const res = await shop.post<UserType>('/user', data);

	if (res.statusText === 'OK') {
		return redirect('/email-sent');
	}
};

const Signup = () => {
	return <SignupComponent />;
};

export default Signup;
