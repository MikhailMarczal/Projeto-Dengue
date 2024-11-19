import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const api = axios.create({
	baseURL: import.meta.env.VITE_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = Cookies.get('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			Cookies.remove('token');

			const navigate = useNavigate();
			navigate('/', { replace: true });
		}
		return Promise.reject(error);
	}
);

export default api;
