require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const mongoose = require('mongoose');
const UserAPI = require('./api/UserAPI');
const ArticleAPI = require('./api/ArticleAPI');
const checkJWT = require('./middlewares/checkJWT');

app.use(express.json()); // Body parser
app.use(cors()); // CORS policy

// Connection to the Mongo database
mongoose
	.connect(process.env.MONGODB_URI)
	.then((res) =>
		console.log(`Connected to the database ${res.connections[0].name}`)
	)
	.catch((err) => console.error(err));

app.get('/', (req, res) => {
	res.send('Hello from server!');
});

// Authentication
app.post('/auth', UserAPI.authenticate);

// TODO: Add some admin-only endpoints)
// Users
app.get('/users', checkJWT, UserAPI.getAll);
app.post('/users', UserAPI.post);

// Articles
app.get('/articles', checkJWT, ArticleAPI.get);
app.get('/articles/:id', checkJWT, ArticleAPI.getByID);
app.get('/tags', checkJWT, ArticleAPI.getTags);
app.post('/articles', checkJWT, ArticleAPI.post);

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
