const UserCtrl = require('../controllers/UserController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = class UserAPI {
	static async getUsers(req, res) {
		try {
			const users = await UserCtrl.getAllUsers();
			if (!users || users.length === 0) {
				return res.status(404).json('There is no user in the database');
			}
			// Remove password and version from the document
			const cleanUsers = users.map(({ _doc }) => {
				for (const key of ['password', '__v']) {
					delete _doc[key];
				}
				return _doc;
			});
			return res.status(200).json(cleanUsers);
		} catch (error) {
			res.status(500).json({ error });
		}
	}

	static async postUser(req, res) {
		try {
			const response = await UserCtrl.createUser(req.body);
			return res.status(201).json(response);
		} catch (error) {
			if (error.code === 11000) {
				return res.status(400).json({
					code: error.code,
					message: `L'adresse email ${error.keyValue.email} est déjà utilisée par un autre utilisateur`
				});
			}
			res.status(500).json(error);
		}
	}

	static async authenticate(req, res) {
		const { email, psw } = req.body;
		console.log(req);
		try {
			const user = await UserCtrl.findUser({ email: email });
			// User not found
			if (!user) {
				return res.status(404).json({ message: 'Utilisateur non trouvé' });
			}
			// User found but wrong password
			if (!bcrypt.compareSync(psw, user.password)) {
				return res.status(403).json({ message: 'Mot de passe incorrect' });
			}
			// User found and right password
			const { _id, username, admin } = user;
			const expiration = 24 * 60 * 60; // 24 hours
			const token = jwt.sign({ _id, username, email, admin }, SECRET_KEY, {
				expiresIn: expiration
			});
			res.header('Authorization', 'Bearer ' + token);
			return res.status(200).json({ message: 'Connexion acceptée', token });
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
};
