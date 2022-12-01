import { createContext, useMemo, useContext, ReactNode } from 'react';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

interface User {
	token: string | null;
	id: string | null;
	name: string | null;
	isAdmin: boolean | null;
}

interface ContextAuth {
	user: User;
	setUser: (user: any) => void;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

export const initialState = {
	token: null,
	id: null,
	isAdmin: null,
	name: null,
};

const AuthContext = createContext<ContextAuth>({
	user: initialState,
	setUser: () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [user, setUser] = useLocalStorage('user', initialState);

	const contextValue = useMemo(() => {
		return { user, setUser };
	}, [user, setUser]);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			'useAuthContext must be used inside of a AuthContextProvider'
		);
	}
	return context;
};
