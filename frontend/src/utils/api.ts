import axios from 'axios';

export const shop = axios.create({
	// TODO: Change this url to production url
	baseURL: 'http://localhost:5000',
	headers: {
		'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	},
});
