import { forwardRef, LegacyRef } from 'react';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
	label: string;
	type?: string;
	styling?: string;
	error?: string;
	inner?: React.ReactNode;
}

const Input = forwardRef(
	(props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
		return (
			<div>
				<div className={`flex flex-col my-1 ${props.styling}`}>
					<label htmlFor={props.label}>{props.label} :</label>
					<input
						type={props.type}
						id={props.label}
						className={`mt-2 text-slate-900 focus:ring-0 focus:outline-0 px-2 py-1 rounded-md ${
							props.error ? 'ring-2 ring-red-500' : null
						}`}
						{...props}
						ref={ref}
					/>
					{props.inner}
				</div>
				<p className="text-rose-500">{props.error}</p>
			</div>
		);
	}
);

export default Input;
