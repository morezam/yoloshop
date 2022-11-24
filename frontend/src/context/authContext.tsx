import {
	createContext,
	useMemo,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from 'react';

interface User {
	token: string | null;
	id: string | null;
	name: string | null;
	isAdmin: boolean | null;
}

interface ContextAuth {
	user: User;
	setUser: (user: User) => void;
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
	const [user, setState] = useState(() => {
		const initialStateFromLS = JSON.parse(
			localStorage.getItem('user') as string
		);

		if (!initialStateFromLS) {
			const stringifiedUser = JSON.stringify(initialState);
			window.localStorage.setItem('user', stringifiedUser);
			return initialState;
		} else {
			return initialStateFromLS;
		}
	});

	const setUser = useCallback(
		(user: User) => {
			setState(user);

			if (user.token === null) {
				const stringifiedUser = JSON.stringify(initialState);
				window.localStorage.setItem('user', stringifiedUser);
			} else {
				const stringifiedUser = JSON.stringify(user);
				window.localStorage.setItem('user', stringifiedUser);
			}
		},
		[user]
	);

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
