import { useNavigate, Link } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import CustomErrorBoundary from '@components/CustomErrorBoundary';
import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		criteriaMode: 'all',
	});
	const { setUser } = useAuthContext();
	const handleError = useErrorHandler();

	const mutation = useMutation({
		mutationFn: data => {
			return shop.post<LoginResponse>('/user/login', data);
		},
		onSuccess(data) {
			setUser(data.data);

			const query = to.split('=')[1];
			const redirect = query ? `/${query}` : '/';
			navigate(redirect);
		},
		onError(error: AxiosError<ErrorResponse>) {
			handleError(error.response?.data);
		},
	});

	const onFormSubmit = (data: any) => {
		mutation.mutate(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<input
					{...register('email', {
						// required: true,
						// pattern: {
						// 	value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
						// 	message: 'Email Is Not Valid',
						// },
					})}
				/>

				<input
					type="password"
					{...register('password', {
						// required: true,
						// pattern: {
						// 	value: /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/,
						// 	message:
						// 		'Password must be at least 8 characters long with at least one letter and one special character',
						// },
					})}
				/>
				<button type="submit">Submit</button>
			</form>
			<Link to={'/user/password-reset'}>Forgot Your Password?</Link>
		</>
	);
};

export default LoginComponent;
