const Article = require('../models/Article');

module.exports = class ArticleController {
	static getAllArticles() {
		return new Promise(async (resolve, reject) => {
			try {
				resolve(await Article.find());
			} catch (error) {
				reject(error);
			}
		});
	}

	static getArticleByID(id) {
		return new Promise(async (resolve, reject) => {
			try {
				resolve(await Article.findById(id));
			} catch (error) {
				reject(error);
			}
		});
	}

	static addArticle({ title, abstract, tags, textContent, imgContent }) {
		return new Promise(async (resolve, reject) => {
			try {
				const newArticle = {
					title,
					abstract,
					tags,
					textContent
				};
				if (imgContent) {
					newArticle.imgContent = imgContent;
				}
				console.log(JSON.stringify(newArticle));
				resolve(await new Article(newArticle).save());
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
};
