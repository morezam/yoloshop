import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';

const ProfileNav = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);

	return (
		<nav className="flex mb-5 text-lg relative shadow-sm justify-between transition-all duration-300 items-center px-5 py-3 bg-slate-800 text-slate-100">
			<Link to="/">LOGO</Link>
			<div onClick={() => setOpen(!open)} className="z-20 text-lg md:hidden">
				{open ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
			</div>
			<div
				className={`${
					open ? 'flex' : 'hidden'
				} flex-col items-center  bg-slate-300 z-10 absolute right-0 top-10 transition-all duration-300 md:flex md:flex-row-reverse md:top-3 md:bg-inherit md:right-10 md:w-[600px] `}>
				{children}
			</div>
		</nav>
	);
};

export default ProfileNav;
