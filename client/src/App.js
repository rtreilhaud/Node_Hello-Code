import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import jwt_decode from 'jwt-decode';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
	const [user, setUser] = useState({});

	useEffect(() => {
		if (Object.keys(user).length === 0) {
			const token = localStorage.getItem('token');
			if (token) setUser(jwt_decode(token));
		}
	}, [user]);

	return (
		<>
			<Toaster />
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Register} />
					<Route exact path='/login'>
						<Login setUser={setUser} />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
