import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
	return (
		<>
			<Toaster />
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Register} />
					<Route exact path='/login' component={Login} />
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
