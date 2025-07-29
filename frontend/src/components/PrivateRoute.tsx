import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../reducer';
import type { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const user = useSelector((state: RootState) => state.user.user);

	return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;