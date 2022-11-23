import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Response {
	msg: string;
	email: string;
}

const ForgetPassword = () => {
	const navigate = useNavigate();
	const { mutate, isLoading } = useMutation({
		mutationFn: (userEmail: { email: string }) => {
			return shop.post<Response>('/user/forget-password', userEmail);
		},
		onSuccess(data) {
			if (data.status === 200) {
				navigate(`/user/verify-secNum?${data.data.email}`);
			}
		},
		onError(error, variables, context) {
			console.log(error);
		},
	});

	const onSubmitEmail = (e: SyntheticEvent) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
		mutate(data as { email: string });
	};

	if (isLoading) {
		return <div>Loading....</div>;
	}

	return (
		<>
			<h2>Please Enter your Email</h2>
			<form onSubmit={onSubmitEmail}>
				<input type="email" name="email" />
			</form>
		</>
	);
};

export default ForgetPassword;
