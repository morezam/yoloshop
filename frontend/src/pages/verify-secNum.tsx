import { useState } from 'react';
import Nav from '@components/Nav';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import PasswordInput from '@components/PasswordInput';
import CustomErrorBoundary from '@components/CustomErrorBoundary';
import { AxiosError, AxiosResponse } from 'axios';
import FormLayout from '@layouts/FormLayout';
import Input from '@components/Input';
import Btn from '@components/Btn';

type ErrorRes = AxiosError<{
	message: string;
}>;
const VerifySecNum = () => {
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const email = location.search.slice(1);

	const { handleSubmit: handleSecNumSubmit, register: registerSecNum } =
		useForm({ defaultValues: { securityNum: '' } });

	const { handleSubmit, register } = useForm({
		defaultValues: { password: '' },
	});

	const {
		mutate: verifySecNum,
		isLoading,
		isError,
		error,
	} = useMutation<AxiosResponse<string>, ErrorRes, number>({
		mutationFn: (secNum: number) => {
			return shop.post('/user/verify-secNum', { email, secNum });
		},
		onSuccess() {
			setSuccess(true);
		},
	});

	const { mutate: mutatePassword, data: passwordData } = useMutation({
		mutationFn: (password: string) => {
			return shop.post('/user/change-password-login', { email, password });
		},
	});

	const onSubmitSecNum = ({ securityNum }: { securityNum: string }) => {
		verifySecNum(+securityNum);
	};

	const onSubmitPassword = ({ password }: { password: string }) => {
		mutatePassword(password);
	};

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (passwordData?.status === 200) {
			timer = setTimeout(() => {
				navigate('/login');
			}, 3000);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [passwordData]);

	return (
		<CustomErrorBoundary>
			<Nav />
			<FormLayout
				title="Please Enter Security Number Sent to Your Email"
				styling="max-w-md">
				<form
					className="flex flex-col"
					onSubmit={handleSecNumSubmit(onSubmitSecNum)}>
					<Input
						label="Security Number"
						disabled={success}
						type="number"
						{...registerSecNum('securityNum')}
					/>

					<Btn disabled={success} styling="my-4">
						Submit
					</Btn>
				</form>

				{isError ? (
					<p className="text-center text-red-500 font-semibold">
						{error.response?.data.message}
					</p>
				) : null}

				{isLoading ? (
					<div>Loading...</div>
				) : success ? (
					<>
						<h2 className="text-center text-xl mt-3 mb-5">
							Please Enter your new Password
						</h2>
						<form
							className="flex flex-col"
							onSubmit={handleSubmit(onSubmitPassword)}>
							<label htmlFor="newPassword">New Password: </label>
							<PasswordInput
								id="newPassword"
								{...register('password', {
									required: true,
									pattern: {
										value: /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/,
										message:
											'Password must be at least 8 characters long with at least one letter and one special character',
									},
								})}
							/>
							<Btn styling="my-4">Change Password</Btn>
						</form>
						{passwordData ? <div>{passwordData.data}</div> : null}
					</>
				) : null}
			</FormLayout>
		</CustomErrorBoundary>
	);
};

export default VerifySecNum;
