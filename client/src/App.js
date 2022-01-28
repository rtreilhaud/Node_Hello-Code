import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import Login from './pages/Login';
import ArticleList from './pages/ArticleList';
import Article from './pages/Article';
import { getCurrentUser } from './services/authentication';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!user) {
			const currentUser = getCurrentUser();
			setUser(currentUser);
		}
	}, [user]);

	return (
		<>
			<Toaster />
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={ArticleList} />
					<Route exact path='/articles/:article_id' component={Article} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login'>
						<Login setUser={setUser} />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
