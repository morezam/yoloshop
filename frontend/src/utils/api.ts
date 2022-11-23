import axios from 'axios';

export const shop = axios.create({
	// TODO: Change this url to production url
	baseURL: 'http://localhost:5000',
});
