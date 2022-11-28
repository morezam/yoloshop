import CustomErrorBoundary from '@components/CustomErrorBoundary';
import LoginComponent from '@components/userSign/Login';
import { useLocation } from 'react-router-dom';

const Login = () => {
	const location = useLocation();

	return (
		<CustomErrorBoundary>
			<LoginComponent to={location.search} />
		</CustomErrorBoundary>
	);
};

export default Login;
