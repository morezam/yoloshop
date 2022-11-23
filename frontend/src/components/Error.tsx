import { AxiosError } from 'axios';
import { useRouteError } from 'react-router-dom';

interface ErrorResponse {
	message: string;
}

const ErrorComponent = () => {
	const error = useRouteError() as AxiosError<ErrorResponse>;

	console.log(error.response?.data.message);
	return <div>error</div>;
};

export default ErrorComponent;
