const UserCtrl = require('../controllers/UserController');

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
			res.status(201).json(response);
		} catch (error) {
			res.status(500).json({ error });
		}
	}
};
