import Btn from '@components/Btn';
import Input from '@components/Input';
import Nav from '@components/Nav';
import FormLayout from '@layouts/FormLayout';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface Response {
	msg: string;
	email: string;
}

const ForgetPassword = () => {
	const navigate = useNavigate();
	const { handleSubmit, register } = useForm({
		defaultValues: {
			email: '',
		},
	});
	const { mutate, isLoading } = useMutation({
		mutationFn: (userEmail: { email: string }) => {
			return shop.post<Response>('/user/forget-password', userEmail);
		},
		onSuccess(data) {
			if (data.status === 200) {
				navigate(`/verify-secNum?${data.data.email}`);
			}
		},
		onError(error, variables, context) {
			console.log(error);
		},
	});

	const onSubmitEmail = ({ email }: { email: string }) => {
		mutate({ email });
	};

	return (
		<>
			<Nav />
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<FormLayout title="Please Enter your Email" styling="max-w-md">
					<form
						className="flex flex-col"
						onSubmit={handleSubmit(onSubmitEmail)}>
						<Input
							label="Email"
							type="email"
							{...register('email', {
								required: true,
							})}
						/>
						<Btn styling="my-4">Send Security Number</Btn>
					</form>
				</FormLayout>
			)}
		</>
	);
};

export default ForgetPassword;
