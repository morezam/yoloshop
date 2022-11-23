import {
	createContext,
	useMemo,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from 'react';

interface ContextAuth {
	token: string | null;
	setToken: (token: string | null) => void;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<ContextAuth>({
	token: null,
	setToken: () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [token, setState] = useState(() => {
		return localStorage.getItem('token') ? localStorage.getItem('token') : null;
	});

	const setToken = useCallback(
		(token: string | null) => {
			setState(token);

			if (token === null) {
				window.localStorage.removeItem('token');
			} else {
				window.localStorage.setItem('token', String(token));
			}
		},
		[token]
	);

	const contextValue = useMemo(() => {
		return { token, setToken };
	}, [token, setToken]);

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
