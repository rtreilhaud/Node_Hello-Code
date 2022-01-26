const User = require('../models/User');

module.exports = class UserController {
	static getAllUsers() {
		return new Promise(async (resolve, reject) => {
			try {
				resolve(await User.find());
			} catch (error) {
				reject(error);
			}
		});
	}

	static createUser({ username, email, psw, admin }) {
		return new Promise(async (resolve, reject) => {
			try {
				const newUser = {
					username,
					email,
					password: psw,
					admin: admin ?? false
				};
				resolve(await new User(newUser).save());
			} catch (error) {
				reject(error);
			}
		});
	}
};
