interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	children?: React.ReactNode;
	styling?: string;
}

const Btn = (props: ButtonProps) => {
	return (
		<button
			className={`w-full text-gray-900 bg-slate-200 px-2 py-1 rounded-md hover:bg-teal-500 disabled:bg-gray-500 ${props.styling}`}
			type="submit"
			{...props}>
			{props.children}
		</button>
	);
};

export default Btn;
