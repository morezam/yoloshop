import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import Btn from './Btn';

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
	console.log(error);
	// const errorMsg = error.
	return (
		<div
			role="alert"
			className="flex flex-col justify-center h-screen items-center px-2 text-lg text-rose-500">
			<p>Oops! Something Went Wrong</p>
			<p className="text-xl mt-3 font-mono">{error.message}</p>
			<div className="w-40">
				<Btn onClick={resetErrorBoundary}>Try Again</Btn>
			</div>
		</div>
	);
};

const CustomErrorBoundary = ({ ...props }) => {
	return <ErrorBoundary FallbackComponent={FallbackComponent} {...props} />;
};

export default CustomErrorBoundary;
