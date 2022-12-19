import axios from 'axios';

export const shop = axios.create({
	baseURL: 'https://yoloshop.onrender.com',
	headers: {
		'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	},
});
