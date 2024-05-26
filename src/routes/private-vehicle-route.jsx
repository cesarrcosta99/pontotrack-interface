import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function PrivateVehicleRoute({ children }) {
	const user = localStorage.getItem('pontotrack:userData');
	const vehicle = localStorage.getItem('pontotrack:vehicleData');

	if (!user) {
		return <Navigate to="/login" replace={true} />;
	}

	if (!vehicle) {
		return <Navigate to="/vehicle-registration" replace={true} />;
	}

	return <>{children}</>;
}

export default PrivateVehicleRoute;

PrivateVehicleRoute.propTypes = {
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};
