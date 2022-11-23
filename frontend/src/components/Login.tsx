import { SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';

interface LoginResponse {
	id: string;
	token: string;
	isAdmin: boolean;
	name: string;
}

const Login = () => {
	let location = useLocation();
	const navigate = useNavigate();
	const { setToken } = useAuthContext();

	console.log(location);

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
		<form onSubmit={onFormSubmit}>
			<input type="email" name="email" />
			<input type="password" name="password" />
			<button type="submit">Submit</button>
		</form>
	);
};

export default Login;
