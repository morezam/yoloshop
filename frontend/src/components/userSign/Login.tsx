import { useNavigate, Link } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { FaAngleRight } from 'react-icons/fa';
import CustomErrorBoundary from '@components/CustomErrorBoundary';
import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import Nav from '@components/Nav';
import PasswordInput from '@components/PasswordInput';
import FormLayout from '@layouts/FormLayout';
import Input from '@components/Input';
import Btn from '@components/Btn';

interface LoginResponse {
	id: string;
	token: string;
	isAdmin: boolean;
	name: string;
}

interface ErrorResponse {
	message: string;
}

interface LoginArgs {
	email: string;
	password: string;
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
		mutationFn: (data: LoginArgs) => {
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

	const onFormSubmit = (data: LoginArgs) => {
		mutation.mutate(data);
	};

	return (
		<>
			<Nav />
			<FormLayout title="Login To Your Account" styling="max-w-md">
				<form className="flex flex-col" onSubmit={handleSubmit(onFormSubmit)}>
					<Input label="Email" type="email" {...register('email')} />

					<label htmlFor="password">Password : </label>
					<PasswordInput
						id="password"
						{...register('password', { required: true })}
					/>
					<Btn styling="my-4">Login</Btn>
					<Link
						to={'/password-reset'}
						className="w-full flex items-center justify-center px-2 pb-1 pt-5 hover:text-slate-300 rounded-md">
						Forgot Your Password?{' '}
						<FaAngleRight className="fill-slate-600 hover:fill-slate-900" />
					</Link>
				</form>
			</FormLayout>
		</>
	);
};

export default LoginComponent;
