require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const UserAPI = require('./api/UserAPI');

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

// TODO: Secure the access to the API (with some admin-only endpoints)
app.get('/users', UserAPI.getUsers);
app.post('/users', UserAPI.postUser);

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
