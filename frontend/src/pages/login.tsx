import CustomErrorBoundary from '@components/CustomErrorBoundary';
import LoginComponent from '@components/userSign/Login';
import { useLocation } from 'react-router-dom';

const Login = () => {
	const location = useLocation();

	return <LoginComponent to={location.search} />;
};

export default Login;
