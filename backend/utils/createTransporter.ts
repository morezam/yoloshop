import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
	host: 'smtp-mail.outlook.com',
	secure: false,
	port: 587,
	tls: {
		rejectUnauthorized: false,
	},
	auth: {
		user: process.env.NODEMAILER_AUTH_USER,
		pass: process.env.NODEMAILER_AUTH_PASS,
	},
});
