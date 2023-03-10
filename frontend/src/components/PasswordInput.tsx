import { forwardRef, useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const PasswordInput = forwardRef((props: any, ref) => {
	const [show, setShow] = useState(false);
	return (
		<>
			<div className="relative">
				<label htmlFor={props.label}>{props.label} :</label>
				<input
					id={props.label}
					ref={ref}
					type={`${show ? 'text' : 'password'}`}
					className="my-2 w-full text-slate-900 focus:ring-0 focus:outline-0 px-2 py-1 rounded-md"
					{...props}
				/>
				<span
					onClick={() => setShow(!show)}
					className={`absolute right-1 text-lg bottom-4 text-slate-600`}>
					{show ? <FaEyeSlash /> : <FaEye />}
				</span>
			</div>
			<p className="text-rose-500">{props.error ? props.error : ''}</p>
		</>
	);
});

export default PasswordInput;
