import axios from 'axios';
import { getCurrentUser } from '../services/authentication';
const url = process.env.REACT_APP_API_URL;

export const getUsers = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = getCurrentUser();
			if (!user.admin) reject({ message: "Vous n'êtes pas administrateur" });
			const { data } = await axios.get(url + '/users', {
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
