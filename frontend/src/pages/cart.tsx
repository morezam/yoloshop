import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';
import Nav from '@components/Nav';
import { useAuthContext } from '@context/authContext';
import { useOrderContext } from '@context/orderContext';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getTotalPrice } from '@utils/getTotalPrice';
import ProductPreview from '@components/product/ProductPreview';

const Cart = () => {
	const { order, setOrder } = useOrderContext();
	const { user } = useAuthContext();

	const deleteFromCard = (id: string) => {
		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items?.filter(c => c.product !== id),
		}));
	};

	const minusItem = (id: string) => {
		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items.map(item => {
				if (item.product === id) {
					const newQty = item.qty - 1 <= 1 ? 1 : item.qty - 1;
					return { ...item, qty: newQty };
				}
				return item;
			}),
		}));
	};

	const plusItem = (id: string) => {
		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items.map(item => {
				if (item.product === id) {
					const newQty = item.qty >= item.quantity ? item.qty : item.qty + 1;
					return { ...item, qty: newQty };
				}
				return item;
			}),
		}));
	};

	const totalPrice = getTotalPrice(order.items);

	return (
		<div className="relative">
			<Nav />
			{order.items?.length === 0 ? (
				<p>There is no product in your cart</p>
			) : (
				<div className="sm:flex sm:justify-center sm:gap-x-4">
					<ul className="pb-20 sm:w-1/2">
						{order.items?.map((item, i) => (
							<ProductPreview item={item} index={i} key={item.product}>
								<div className="flex items-center pt-6 md:pt-0 md:pl-10">
									<div className="flex items-center border-2 border-gray-200 rounded-md px-3 py-2">
										<HiOutlineMinusSm
											onClick={() => minusItem(item.product)}
											className="cursor-pointer"
										/>
										<p className="px-2">{item.qty}</p>
										<HiOutlinePlusSm
											onClick={() => plusItem(item.product)}
											className="cursor-pointer"
										/>
									</div>

									<div
										className="pl-4 cursor-pointer"
										title="Remove This From Cart"
										onClick={() => deleteFromCard(item.product)}>
										<FaTrash className="fill-red-500" />
									</div>
								</div>
							</ProductPreview>
						))}
					</ul>
					{user.token ? (
						<div className="fixed bottom-0 bg-pink-500 py-2 w-full rounded-lg text-rose-100 text-center sm:text-slate-900 sm:relative sm:bg-transparent sm:w-72 sm:border-2 sm:border-gray-200 sm:rounded-md sm:h-40 sm:my-3 sm:flex sm:flex-col sm:justify-center  ">
							<p className="text-xl">Total Price: ${totalPrice}</p>
							<Link
								to={'/checkout/shipping-address'}
								className="text-lg sm:bg-pink-500 sm:mx-3 sm:rounded-md sm:py-3 sm:my-4 sm:text-rose-100">
								Proceed to Checkout
							</Link>
						</div>
					) : (
						<Link
							to={'/login?redirect=checkout/shipping-address'}
							className="fixed">
							Login and Checkout
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export default Cart;
