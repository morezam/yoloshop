import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { SyntheticEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifySecNum = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const {
		mutate: mutateSecNum,
		data,
		isLoading,
	} = useMutation({
		mutationFn: (secNum: number) => {
			return shop.post('/user/verify-secNum', {
				email,
				secNum,
			});
		},
	});

	const {
		mutate: mutatePassword,
		data: passwordData,
		isLoading: isLoadingPassword,
	} = useMutation({
		mutationFn: (password: string) => {
			return shop.post('/user/change-password-login', {
				email,
				password,
			});
		},
	});

	const email = location.search.slice(1);
	const onSubmitSecNum = (e: SyntheticEvent) => {
		e.preventDefault();
		const { secNum } = Object.fromEntries(
			new FormData(e.target as HTMLFormElement)
		);
		mutateSecNum(+secNum);
	};

	const onSubmitPassword = (e: SyntheticEvent) => {
		e.preventDefault();
		const { password } = Object.fromEntries(
			new FormData(e.target as HTMLFormElement)
		);
		mutatePassword(password as string);
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
		<>
			<h2>Please Enter Security Number Sent to your email</h2>
			<form onSubmit={onSubmitSecNum}>
				<input type="number" name="secNum" />
			</form>

			{isLoading ? (
				<div>Loading...</div>
			) : data?.status === 200 ? (
				<>
					<h2>Please Enter your new Password</h2>
					<form onSubmit={onSubmitPassword}>
						<input type="password" name="password" />
					</form>
					{passwordData ? <div>{passwordData.data}</div> : null}
				</>
			) : null}
		</>
	);
};

export default VerifySecNum;
