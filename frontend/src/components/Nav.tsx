import { SlBasket, SlMagnifier, SlClose } from 'react-icons/sl';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@context/authContext';
import { useOrderContext } from '@context/orderContext';
import { useState } from 'react';

const Nav = ({
	onProductSearch,
}: {
	onProductSearch?: ({ key }: { key: string }) => void;
}) => {
	const { user } = useAuthContext();
	const { order } = useOrderContext();
	const [showSearch, setShowSearch] = useState(false);

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
				<Link className="pl-2" to={'/'}>
					LOGO
				</Link>
			)}

			{onProductSearch ? (
				<>
					<form
						className="flex items-center"
						onSubmit={handleSubmit(onProductSearch)}>
						<div className="relative">
							<input
								className={` ${
									showSearch ? 'inline' : 'hidden'
								} sm:inline sm:w-72 md:w-96 p-1 text-slate-900`}
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
						} p-2 mr-6 cursor-pointer sm:hidden bg-orange-500 rounded-full`}>
						<SlMagnifier className="font-semibold " />
					</div>
				</>
			) : null}

			{!showSearch ? (
				<div className="flex justify-between items-center w-72 pr-3">
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
					<div className="relative">
						<Link to={`/cart`}>
							<span className="absolute bottom-4 text-sm left-3 sm:bottom-6">
								{len}
							</span>
							<SlBasket className="text-2xl sm:text-3xl" />
						</Link>
					</div>
				</div>
			) : null}
		</nav>
	);
};

export default Nav;
