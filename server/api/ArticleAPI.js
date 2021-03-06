const ArticleCtrl = require('../controllers/ArticleController');

module.exports = class ArticleAPI {
	static async get(req, res) {
		try {
			const { query } = req;
			const articles = query
				? await ArticleCtrl.findArticles(query)
				: await ArticleCtrl.getAllArticles();
			if (!articles || articles.length === 0) {
				return res.status(404).json('Aucun article répertorié');
			}
			return res.status(200).json(articles);
		} catch (error) {
			res.status(500).json({ error });
		}
	}

	static async getByID(req, res) {
		const { id } = req.params;

		try {
			const article = await ArticleCtrl.getArticleByID(id);
			if (!article) {
				return res.status(404).json('Article non trouvé');
			}
			return res.status(200).json(article);
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

	static async getTags(req, res) {
		try {
			const articles = await ArticleCtrl.getAllArticles();
			if (!articles || articles.length === 0) {
				return res.status(404).json('Aucun article répertorié');
			}
			// Get the tags from the articles
			const tags = articles.reduce((arr, article) => {
				const { tags } = article;
				for (const tag of tags) {
					if (!arr.includes(tag)) {
						arr.push(tag);
					}
				}
				return arr;
			}, []);
			return res.status(200).json(tags);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error });
		}
	}
};
