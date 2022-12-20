import axios from 'axios';

export const shop = axios.create({
	baseURL: `/`,
	headers: {
		'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	},
});
