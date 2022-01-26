import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';

const App = () => {
	return (
		<>
			<Toaster />
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Register} />
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
