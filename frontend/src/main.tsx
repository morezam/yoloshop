import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from '@context/authContext';
import { routes } from '@routes/index';
import { queryClient } from '@utils/queryClient';
import './index.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<RouterProvider
					router={router}
					fallbackElement={<div>Loading...</div>}
				/>
			</AuthContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
