import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
	console.log(error);
	return (
		<div role="alert">
			<p>something went wrong</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
};

const CustomErrorBoundary = ({ ...props }) => {
	return <ErrorBoundary FallbackComponent={FallbackComponent} {...props} />;
};

export default CustomErrorBoundary;
