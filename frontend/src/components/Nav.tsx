import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { SlBasket, SlMagnifier, SlClose } from 'react-icons/sl';
import { useForm } from 'react-hook-form';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useAuthContext } from '@context/authContext';
import { useOrderContext } from '@context/orderContext';
import Logo from './Logo';

const Nav = memo(
	({
		onProductSearch,
	}: {
		onProductSearch?: ({ key }: { key: string }) => void;
	}) => {
		const { user } = useAuthContext();
		const { order } = useOrderContext();
		const [showSearch, setShowSearch] = useState(false);
		const [open, setOpen] = useState(false);

		const len = order.items?.length;

		const { handleSubmit, register } = useForm({
			defaultValues: {
				key: '',
			},
		});
		return (
			<nav
				className={`flex items-center sm:text-lg lg:text-xl bg-slate-800 mb-4 text-slate-200 py-4 justify-between px-5`}>
				{showSearch ? null : (
					<Link className="mr-1 ml-2" to={'/'}>
						<Logo />
					</Link>
				)}

				{onProductSearch ? (
					<>
						<form
							className={`flex items-center ${
								showSearch ? 'inline' : 'hidden'
							} sm:inline`}
							onSubmit={handleSubmit(onProductSearch)}>
							<div className="relative">
								<input
									className={`sm:inline sm:w-72 md:w-96 p-1 text-slate-900`}
									type="text"
									{...register('key')}
								/>
								<SlClose
									onClick={() => setShowSearch(false)}
									className={`${
										showSearch ? 'block' : 'hidden'
									} sm:hidden absolute z-10 fill-slate-600 right-1 top-2`}
								/>
							</div>
							<button
								className={`${
									showSearch ? 'block' : 'hidden'
								} sm:block p-2 cursor-pointer bg-orange-500`}>
								<SlMagnifier className="font-semibold " />
							</button>
						</form>
						<div
							onClick={() => setShowSearch(true)}
							className={`${
								showSearch ? 'hidden' : 'block'
							} p-2 mx-3 cursor-pointer bg-orange-500 rounded-full sm:hidden`}>
							<SlMagnifier className="font-semibold " />
						</div>
					</>
				) : null}

				{!showSearch ? (
					<div className="flex relative justify-between pr-3 ml-2">
						<IoMdArrowDropdown
							className="text-3xl cursor-pointer sm:hidden"
							onClick={() => setOpen(!open)}
						/>
						<div
							className={`${
								open ? 'flex' : 'hidden'
							} absolute top-10 bg-slate-800 py-3 h-24 justify-between right-5 px-4 z-40 text-lg flex-col sm:flex sm:flex-row sm:relative sm:h-0 sm:p-0 sm:top-0 sm:right-0 sm:w-52 sm:justify-around`}>
							{user.token ? (
								<>
									<Link to="/logout">Logout</Link>
									<Link to={`/user/profile/${user.id}`}>
										{user.isAdmin ? 'Admin' : 'User'}
									</Link>
								</>
							) : (
								<>
									<Link to="/login">Login</Link>
									<Link to="/signup">Signup</Link>
								</>
							)}
						</div>
						<div className="relative">
							<Link to={`/cart`}>
								<span className="absolute w-6 h-6 bg-rose-600 rounded-full flex justify-center items-center bottom-4 text-xs left-4 sm:bottom-5">
									{len}
								</span>
								<SlBasket className="text-2xl sm:text-3xl" />
							</Link>
						</div>
					</div>
				) : null}
			</nav>
		);
	}
);

export default Nav;
