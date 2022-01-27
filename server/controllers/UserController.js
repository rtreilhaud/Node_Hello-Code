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

	static findUser(query) {
		return new Promise(async (resolve, reject) => {
			try {
				resolve(await User.findOne(query));
			} catch (error) {
				reject(error);
			}
		});
	}

	static addUser({ username, email, psw, admin }) {
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
