import { createContext, useMemo, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';

export interface CartItem {
	name: string;
	product: string;
	qty: number;
	countInStock: number;
	price: number;
	image: string;
}

export interface Address {
	city: string;
	postalCode: string;
	address: string;
}

interface Order {
	address: Address | null;
	items: CartItem[] | [];
}

interface ContextOrder {
	order: Order;
	setOrder: (value: Order | ((val: Order) => Order)) => void;
}

interface OrderContextProviderProps {
	children: ReactNode;
}

const initialState = {
	address: null,
	items: [],
};

const OrderContext = createContext<ContextOrder>({
	order: initialState,
	setOrder: () => {},
});

export const OrderContextProvider = ({
	children,
}: OrderContextProviderProps) => {
	const [order, setOrder] = useLocalStorage<Order>('order', initialState);

	const contextValue = useMemo(() => {
		return { order, setOrder };
	}, [order, setOrder]);

	return (
		<OrderContext.Provider value={contextValue}>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrderContext = () => {
	const context = useContext(OrderContext);
	if (!context) {
		throw new Error(
			'useOrderContext must be used inside of a OrderContextProvider'
		);
	}
	return context;
};
