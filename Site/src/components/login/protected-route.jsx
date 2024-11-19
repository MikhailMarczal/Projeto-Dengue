import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
	const token = Cookies.get('token');

	if (!token) {
		return <Navigate to="/" replace />;
	}

	return element;
};

ProtectedRoute.propTypes = {
	element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
