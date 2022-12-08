interface FormLayoutProps {
	title: string;
	styling?: string;
	children: React.ReactNode;
}

const FormLayout = ({ title, styling, children }: FormLayoutProps) => {
	return (
		<div
			className={`border-2 bg-slate-700 text-slate-100 border-slate-700 px-4 py-2 mx-auto rounded-md ${styling}`}>
			<h2 className="text-center text-xl mt-3 mb-5">{title}</h2>
			{children}
		</div>
	);
};

export default FormLayout;
