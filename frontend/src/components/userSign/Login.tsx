import { SyntheticEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

const LoginComponent = ({ to }: { to: string }) => {
	const navigate = useNavigate();
	const { setUser } = useAuthContext();

	const mutation = useMutation({
		mutationFn: data => {
			return shop.post<LoginResponse>('/user/login', data);
		},
		onSuccess(data) {
			setUser(data.data);
			to === '' ? navigate('/') : navigate(`/${to.slice(1)}`);
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

export default LoginComponent;
