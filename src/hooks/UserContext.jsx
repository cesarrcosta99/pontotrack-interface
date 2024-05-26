import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({});

	const putUserData = async (userInfo) => {
		setUserData(userInfo);

		await localStorage.setItem('pontotrack:userData', JSON.stringify(userInfo));
	};

	useEffect(() => {
		async function loadUserData() {
			const clienteInfo = localStorage.getItem('pontotrack:userData');

			if (clienteInfo) {
				const user = JSON.parse(clienteInfo);
				setUserData(user);
			}
		}

		loadUserData();
	}, []);

	return (
		<UserContext.Provider value={{ userData, putUserData }}>
			{children}
		</UserContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used with UserContext');
	}

	return context;
};

UserProvider.propTypes = {
	children: PropTypes.node,
};
