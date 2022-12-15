import { useState } from 'react';
import { useOrderContext } from '@context/orderContext';
import { FaTrash, FaCartPlus } from 'react-icons/fa';
import { HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { ProductType } from '@types';

const CartActions = ({ product }: { product: ProductType<string> }) => {
	const { order, setOrder } = useOrderContext();
	const [qty, setQty] = useState(1);

	const onAddToCart = () => {
		const cartItem = {
			name: product.name,
			product: product._id,
			countInStock: product.countInStock,
			price: product.price,
			quantity: product.quantity,
			image: product.image,
			qty,
		};

		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items ? [...oldOrder.items, cartItem] : [cartItem],
		}));
	};

	const onDeleteFromCart = () => {
		setOrder(oldOrder => ({
			address: oldOrder.address,
			items: oldOrder.items.filter(c => c.product !== product._id),
		}));
	};

	const isInCart = order.items?.find(c => c.product === product._id);
	return (
		<div className="fixed w-full bg-gray-100 shadow-xl flex justify-center py-3 bottom-0">
			{isInCart ? (
				<div className="flex items-center">
					<div className="flex items-center border-2 w-20 rounded-md border-gray-100 px-2 py-1">
						<HiOutlineMinusSm
							onClick={() =>
								setQty(old => {
									if (old <= 1) {
										return 1;
									}
									return old - 1;
								})
							}
						/>
						<p className="mx-2">{qty}</p>
						<HiOutlinePlusSm
							onClick={() =>
								setQty(old => {
									if (old >= product.quantity) {
										return old;
									}
									return old + 1;
								})
							}
						/>
					</div>
					<button
						onClick={() => onDeleteFromCart()}
						className="flex items-center pl-2">
						<FaTrash className="text-xl pr-1 fill-red-500" />
						<p className="text-sm">Delete From Cart</p>
					</button>
				</div>
			) : (
				<button onClick={() => onAddToCart()} className="flex items-center">
					<FaCartPlus className="text-3xl pr-2 fill-gray-700" />
					Add To Cart
				</button>
			)}
		</div>
	);
};

export default CartActions;
