import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { getCurrentUser, signOut } from './services/authentication';
import NavBar from './components/NavBar';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import UnauthenticatedRoute from './components/routes/UnauthenticatedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import ArticleList from './pages/ArticleList';
import Article from './pages/Article';
import TagList from './pages/TagList';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!user) {
			const currentUser = getCurrentUser();
			setUser(currentUser);
		}
	}, [user]);

	const handleLogout = () => {
		signOut();
		setUser(null);
	};

	return (
		<>
			<Toaster />
			<BrowserRouter>
				{user && <NavBar onLogout={handleLogout} />}
				<Switch>
					<AuthenticatedRoute exact path='/' Component={ArticleList} />
					<AuthenticatedRoute
						exact
						path='/articles/:article_id'
						Component={Article}
					/>
					<AuthenticatedRoute exact path='/tags/' Component={TagList} />
					<UnauthenticatedRoute exact path='/register' Component={Register} />
					<UnauthenticatedRoute
						exact
						path='/login'
						Component={Login}
						props={{ onLogin: setUser }}
					/>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
