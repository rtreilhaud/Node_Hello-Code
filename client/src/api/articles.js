import axios from 'axios';
import { getCurrentUser } from '../services/authentication';
const url = process.env.REACT_APP_API_URL;

export const getArticles = (query = '') => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = getCurrentUser();
			const { data } = await axios.get(url + '/articles' + query, {
				headers: { Authorization: user.token }
			});
			resolve(data);
		} catch (error) {
			if (error.response) {
				const {
					data: { message }
				} = error.response;
				if (message) reject({ ...error, message: message });
			}
			// TODO: If the token is expired, ask for a new one
			reject(error);
		}
	});
};

export const getArticleByID = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = getCurrentUser();
			const { data } = await axios.get(`${url}/articles/${id}`, {
				headers: { Authorization: user.token }
			});
			resolve(data);
		} catch (error) {
			if (error.response) {
				const {
					data: { message }
				} = error.response;
				if (message) reject({ ...error, message: message });
			}
			// TODO: If the token is expired, ask for a new one
			reject(error);
		}
	});
};

export const getTags = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = getCurrentUser();
			const { data } = await axios.get(url + '/tags', {
				headers: { Authorization: user.token }
			});
			resolve(data);
		} catch (error) {
			if (error.response) {
				const {
					data: { message }
				} = error.response;
				if (message) reject({ ...error, message: message });
			}
			// TODO: If the token is expired, ask for a new one
			reject(error);
		}
	});
};
