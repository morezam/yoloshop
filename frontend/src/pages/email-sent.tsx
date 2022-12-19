import Btn from '@components/Btn';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EmailSent = () => {
	const location = useLocation();

	const navigate = useNavigate();

	const email = location.search.split('=')[1];

	useEffect(() => {
		if (!email) {
			navigate('/', {
				replace: true,
			});
		}
	}, [email]);

	const mutation = useMutation({
		mutationFn: () => {
			return shop.get<string>(`/resend-verification-email?email=${email}`);
		},
	});

	return (
		<div className="flex text-center flex-col items-center max-w-lg p-5 mx-auto  mt-6 text-lg border-2 border-slate-600 rounded-md">
			<p>
				Email was sent to <span className="font-semibold">{email}</span> please
				check your inbox and click on verify button
			</p>
			<p className="mt-3">
				If The provided Email is not correct please{' '}
				<Link className="text-cyan-500" to={'/signup'}>
					Signup
				</Link>{' '}
				again
			</p>
			<p className="mt-3">
				If you didn't receive any email:
				<Btn onClick={() => mutation.mutate()}>Resend Verification Email</Btn>
			</p>
			<p>{mutation.data && mutation.data.data}</p>
		</div>
	);
};

export default EmailSent;
