const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
