import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthContextProvider } from '@context/authContext';
import { routes } from '@routes/index';
import './index.css';

const router = createBrowserRouter(routes);

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<AuthContextProvider>
				<RouterProvider
					router={router}
					fallbackElement={<div>Loading...</div>}
				/>
			</AuthContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
