import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCurrentUser } from '../../services/authentication';

const AuthenticatedRoute = ({ path, Component, exact, props }) => {
	const user = getCurrentUser();

	// Component if authenticated or register
	return (
		<>
			{user ? (
				<Route
					path={path}
					exact={exact}
					render={(routeProps) => <Component {...routeProps} {...props} />}
				/>
			) : (
				<Redirect to='/register' />
			)}
		</>
	);
};

export default AuthenticatedRoute;
