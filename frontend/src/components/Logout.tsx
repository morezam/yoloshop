import { useEffect } from 'react';
import { useAuthContext } from '@context/authContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const { setToken } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		setToken(null);
		navigate('/');
	}, []);
	return <div>Logout</div>;
};

export default Logout;
