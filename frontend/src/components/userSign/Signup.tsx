import { Form } from 'react-router-dom';

const SignupComponent = () => {
	return (
		<Form method="post" action="/signup">
			<input type="text" name="name" />
			<input type="email" name="email" />
			<input type="password" name="password" />
			<button type="submit">Submit</button>
		</Form>
	);
};

export default SignupComponent;
