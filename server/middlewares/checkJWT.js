const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = checkJWT = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];

	// Ask for a token if it was not provided
	if (!token) {
		return res.status(401).json({ message: "Jeton d'authentification requis" });
	}

	if (token.startsWith('Bearer ')) {
		token = token.replace('Bearer ', '');
	}

	try {
		// Check and decode the JWT
		jwt.verify(token, SECRET_KEY);
		// TODO: Send a new token to refresh it
		next();
	} catch (error) {
		return res
			.status(403)
			.json({ message: "Jeton d'authentification non valide" });
	}
};
