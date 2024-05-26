import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home, Login, Register, VehicleRegistration } from '../containers';
import MapComponent from '../containers/MapComponent';
import PrivateRoute from './private-route';
import PrivateVehicleRoute from './private-vehicle-route';

function MyRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/vehicle-registration"
					element={
						<PrivateRoute>
							<VehicleRegistration />
						</PrivateRoute>
					}
				/>
				<Route
					path="/map"
					element={
						<PrivateVehicleRoute>
							<MapComponent />
						</PrivateVehicleRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default MyRoutes;
