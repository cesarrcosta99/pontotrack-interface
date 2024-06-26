import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './hooks/UserContext';
import MyRoutes from './routes/routes';
import GlobalStyles from './styles/globalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserProvider>
			<MyRoutes />
		</UserProvider>
		<ToastContainer autoClose={2000} theme="colored" />
		<GlobalStyles />
	</React.StrictMode>,
);
