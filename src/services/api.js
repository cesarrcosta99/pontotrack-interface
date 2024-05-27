import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://projetopontotrack-api.onrender.com',
});

api.interceptors.request.use(async (config) => {
	const userData = localStorage.getItem('pontotrack:userData');
	const token = userData && JSON.parse(userData).token;

	config.headers.Authorization = `Bearer ${token}`;

	return config;
});
