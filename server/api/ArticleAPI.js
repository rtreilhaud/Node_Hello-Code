const ArticleCtrl = require('../controllers/ArticleController');

module.exports = class ArticleAPI {
	static async getAll(req, res) {
		try {
			const articles = await ArticleCtrl.getAllArticles();
			if (!articles || articles.length === 0) {
				return res.status(404).json('There is no article in the database');
			}
			return res.status(200).json(articles);
		} catch (error) {
			res.status(500).json({ error });
		}
	}

	static async post(req, res) {
		try {
			const response = await ArticleCtrl.addArticle(req.body);
			return res.status(201).json(response);
		} catch (error) {
			res.status(500).json(error);
		}
	}
};
