import Btn from '@components/Btn';
import ErrorMessage from '@components/ErrorMessage';
import Input from '@components/Input';
import Nav from '@components/Nav';
import PasswordInput from '@components/PasswordInput';
import Spinner from '@components/spinner';
import FormLayout from '@layouts/FormLayout';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { AxiosError } from 'axios';
import { useErrorHandler } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface ErrorResponse {
	message: string;
}

interface SignUpArgs {
	name: string;
	email: string;
	password: string;
	passwordAgain: string;
}

const SignupComponent = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordAgain: '',
		},
		criteriaMode: 'all',
	});
	const handleError = useErrorHandler();

	const mutation = useMutation({
		mutationFn: (data: SignUpArgs) => {
			return shop.post('/user', data);
		},
		onSuccess(data, vars) {
			navigate(`/email-sent?email=${vars.email}`);
		},
		onError(error: AxiosError<ErrorResponse>) {
			handleError(error.response?.data);
		},
	});

	const onFormSubmit = (data: SignUpArgs) => {
		if (data.password !== data.passwordAgain) {
			setError('passwordAgain', {
				type: 'custom',
				message: 'Your password did not match',
			});
			return;
		}
		mutation.mutate(data);
	};

	const required = { value: true, message: 'This Field is Required' };

	return (
		<>
			<Nav />
			<FormLayout title="Create A New Account :" styling="max-w-md">
				<form className="flex flex-col" onSubmit={handleSubmit(onFormSubmit)}>
					<Input
						label="Name"
						{...register('name', {
							required,
						})}
						error={errors.name?.message}
					/>
					<Input
						label="Email"
						type="email"
						{...register('email', {
							required,
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
								message: 'Email Is Not Valid',
							},
						})}
						error={errors.email?.message}
					/>

					<PasswordInput
						label="Password"
						error={errors.password?.message}
						{...register('password', {
							required,
							pattern: {
								value: /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/,
								message:
									'Password must be at least 8 characters long with at least one letter and one special character',
							},
						})}
					/>

					<PasswordInput
						error={errors.passwordAgain?.message}
						label="Password Again"
						{...register('passwordAgain', {
							required,
						})}
					/>
					<Btn styling="my-4" disabled={mutation.isLoading}>
						{mutation.isLoading ? <Spinner /> : 'Signup'}
					</Btn>
				</form>
				{mutation.isError ? <ErrorMessage error={mutation.error} /> : null}
			</FormLayout>
		</>
	);
};

export default SignupComponent;
