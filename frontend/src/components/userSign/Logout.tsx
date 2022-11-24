import { useEffect } from 'react';
import { initialState, useAuthContext } from '@context/authContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const { setUser } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		setUser(initialState);
		navigate('/');
	}, []);
	return <div>Logout</div>;
};

export default Logout;
