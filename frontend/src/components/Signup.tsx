import axios from 'axios';
import { ActionFunction, Form, redirect } from 'react-router-dom';

interface SignupResponse {
	_id: string;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	favorites: [];
	createdAt: string;
	updatedAt: string;
}

export const signupAction: ActionFunction = async ({ request }) => {
	const data = Object.fromEntries(await request.formData());

	const res = await axios.post<SignupResponse>(
		'http://localhost:5000/user',
		data
	);

	console.log(res);

	if (res.statusText === 'OK') {
		return redirect('/email-sent');
	}
};

const Signup = () => {
	return (
		<Form method="post" action="/signup">
			<input type="text" name="name" />
			<input type="email" name="email" />
			<input type="password" name="password" />
			<button type="submit">Submit</button>
		</Form>
	);
};

export default Signup;
