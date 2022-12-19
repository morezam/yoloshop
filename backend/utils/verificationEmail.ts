import jwt from 'jsonwebtoken';
import { transporter } from './createTransporter';

export const verificationEmail = async (to: string, name: string) => {
	const token_mail_verification = jwt.sign(
		{ email: to },
		process.env.JWT_SECRET_MAIL,
		{
			expiresIn: '1d',
		}
	);

	const url = `https://yoloshop.onrender.com/user/verify?id=${token_mail_verification}`;
	console.log(
		`from : ${process.env.NODEMAILER_AUTH_USER} to : ${to} url: ${url}`
	);

	const mailOptions = {
		from: process.env.NODEMAILER_AUTH_USER,
		to,
		subject: 'Yolo Shop Account Verification',
		html: `
    <div style="display: flex; flex-direction: column; align-items: center">
    <h1 style="font-size: 45px">
      Welcome To <span style="color: cadetblue">Yolo</span> Shop, ${name}.
    </h1>

    <p style="font-size: 25px">
      Please Click on the link below to verify your account
    </p>

    <p style="font-size: 25px; text-decoration: none">
      <a
        href=${url}
        style="
          text-decoration: none;
          background-color: cadetblue;
          color: aliceblue;
          padding: 15px 25px;
          border-radius: 5px;
        "
        >Verify</a
      >
    </p>
  </div>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
