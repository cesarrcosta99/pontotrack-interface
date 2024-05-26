import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3001',
});

api.interceptors.request.use(async (config) => {
	const userData = localStorage.getItem('pontotrack:userData');
	const token = userData && JSON.parse(userData).token;

	config.headers.Authorization = `Bearer ${token}`;

	return config;
});
