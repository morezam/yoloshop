import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';

const ProfileNav = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);

	return (
		<nav className="flex mb-2 text-lg relative shadow-sm justify-between transition-all duration-300 items-center px-5 py-3 bg-slate-800 text-slate-100">
			<Link to="/">LOGO</Link>
			<div
				onClick={() => setOpen(!open)}
				className="z-20 text-2xl -rotate-90 md:hidden">
				{open ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
			</div>
			<div
				className={`${
					open ? 'flex' : 'hidden'
				} flex-col items-center w-full pb-4 bg-slate-800 z-10 absolute right-0 top-12 transition-all duration-300 md:pb-0 md:flex md:flex-row-reverse md:top-3 md:bg-inherit md:right-10 md:w-[600px] `}>
				{children}
			</div>
		</nav>
	);
};

export default ProfileNav;
