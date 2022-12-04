import { CartItem } from '@context/orderContext';

export const getTotalPrice = (arr: CartItem[]) => {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		const tp = arr[i].price * arr[i].qty;
		sum += tp;
	}
	return sum;
};
