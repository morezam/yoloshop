import { AxiosError } from 'axios';
interface ErrorResponse {
	message: string;
}

interface ErrorMessageProps {
	error: AxiosError<ErrorResponse>;
	styling?: string;
	children?: React.ReactNode;
}

const ErrorMessage = ({ error, styling, children }: ErrorMessageProps) => {
	return (
		<div className={`text-red-500 ${styling}`}>
			{error.response?.data.message}
			{children}
		</div>
	);
};

export default ErrorMessage;
