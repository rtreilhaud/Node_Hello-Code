require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const UserAPI = require('./api/UserAPI');
const ArticleAPI = require('./api/ArticleAPI');

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

// TODO: Secure the access to the API (with some admin-only endpoints)
// Users
app.get('/users', UserAPI.getAll);
app.post('/users', UserAPI.post);

// Articles
app.get('/articles', ArticleAPI.getAll);
app.post('/articles', ArticleAPI.post);

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
