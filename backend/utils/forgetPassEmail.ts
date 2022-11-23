import { transporter } from './createTransporter';

export const forgetPassEmail = async (to: string, secNum: number) => {
	const mailOptions = {
		from: process.env.NODEMAILER_FROM,
		to,
		subject: 'Yolo Shop Account Change Password Security Code',
		html: `
    <div style="display: flex; flex-direction: column; align-items: center">
    <h1 style="font-size: 35px">
      Your Security Code is:
    </h1>

    <p style="font-size: 30px">
      ${secNum}
    </p>
  </div>
    `,
	};

	try {
		const res = await transporter.sendMail(mailOptions);
		console.log(res);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
