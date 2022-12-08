import { forwardRef, LegacyRef } from 'react';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
	label: string;
	type?: string;
	styling?: string;
	inner?: React.ReactNode;
}

const Input = forwardRef(
	(props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
		return (
			<div className={`flex flex-col ${props.styling}`}>
				<label htmlFor={props.label}>{props.label} :</label>
				<input
					type={props.type}
					id={props.label}
					className="my-2 text-slate-900 focus:ring-0 focus:outline-0 px-2 py-1 rounded-md"
					{...props}
					ref={ref}
				/>
				{props.inner}
			</div>
		);
	}
);

export default Input;
