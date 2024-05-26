import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
	const user = localStorage.getItem('pontotrack:userData');

	if (!user) {
		return <Navigate to="/login" replace={true} />;
	}

	return <>{children}</>;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};
