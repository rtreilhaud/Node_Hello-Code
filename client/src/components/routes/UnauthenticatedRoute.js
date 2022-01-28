import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCurrentUser } from '../../services/authentication';

const UnauthenticatedRoute = ({ path, Component, exact, props }) => {
	const user = getCurrentUser();

	// Component if unauthenticated or main page
	return (
		<>
			{user ? (
				<Redirect to='/' />
			) : (
				<Route
					path={path}
					exact={exact}
					render={(routeProps) => <Component {...routeProps} {...props} />}
				/>
			)}
		</>
	);
};

export default UnauthenticatedRoute;
