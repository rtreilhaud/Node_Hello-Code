const mongoose = require('mongoose');

const Article = mongoose.Schema(
	{
		title: { type: String, required: true },
		abstract: { type: String, required: true },
		tags: { type: [String], required: true },
		textContent: { type: String, required: true },
		imgContent: { type: Array },
		evaluated: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Article', Article);
