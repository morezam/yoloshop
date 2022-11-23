import { SyntheticEvent } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { AxiosError } from 'axios';

interface LoginResponse {
	id: string;
	token: string;
	isAdmin: boolean;
	name: string;
}

interface ErrorResponse {
	message: string;
}

const Login = () => {
	let location = useLocation();
	const navigate = useNavigate();
	const { setToken } = useAuthContext();

	const mutation = useMutation({
		mutationFn: data => {
			return shop.post<LoginResponse>('/user/login', data);
		},
		onSuccess(data) {
			setToken(data.data.token);
			location.search === ''
				? navigate('/')
				: navigate(`/${location.search.slice(1)}`);
		},
		onError(error: AxiosError<ErrorResponse>) {
			console.log(error.response?.data.message);
		},
	});

	const onFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const data = Object.fromEntries(
			new FormData(e.target as HTMLFormElement)
		) as any;
		mutation.mutate(data);
	};

	if (mutation.data) {
		console.log(mutation.data);
	}

	return (
		<>
			<form onSubmit={onFormSubmit}>
				<input type="email" name="email" />
				<input type="password" name="password" />
				<button type="submit">Submit</button>
			</form>
			<Link to={'/user/password-reset'}>Forgot Your Password?</Link>
		</>
	);
};

export default Login;
