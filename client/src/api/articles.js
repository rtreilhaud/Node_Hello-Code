import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const getArticles = (query = '') => {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get(url + '/articles' + query);
			resolve(data);
		} catch (error) {
			if (error.response) {
				const {
					data: { message }
				} = error.response;
				reject({ ...error, message: message });
			}
			reject(error);
		}
	});
};

export const getArticleByID = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get(`${url}/articles/${id}`);
			resolve(data);
		} catch (error) {
			if (error.response) {
				const {
					data: { message }
				} = error.response;
				reject({ ...error, message: message });
			}
			reject(error);
		}
	});
};
