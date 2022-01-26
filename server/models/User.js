const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
	username: { type: String, trim: true, required: true },
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		lowercase: true
	},
	password: { type: String, trim: true, required: true },
	admin: { type: Boolean, default: false },
	evaluations: { type: Array }
});

// Hash password before saving the user
User.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

module.exports = mongoose.model('User', User);
