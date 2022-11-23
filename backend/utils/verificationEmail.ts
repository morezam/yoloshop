import jwt from 'jsonwebtoken';
import { transporter } from './createTransporter';

export const verificationEmail = (userId: string, to: string, name: string) => {
	const token_mail_verification = jwt.sign(
		{ id: userId },
		process.env.JWT_SECRET_MAIL,
		{
			expiresIn: '1d',
		}
	);

	// TODO: Change this url to production url
	const url = `http://localhost:5000/user/verify?id=${token_mail_verification}`;

	const mailOptions = {
		from: process.env.NODEMAILER_FROM,
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

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});
};
