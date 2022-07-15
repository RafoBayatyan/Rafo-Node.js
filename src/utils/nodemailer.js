import nodemailer from 'nodemailer';
import { ServerError } from './custom-errors.js';

export const messageMail = (email, subject, token) => ({
     from: 'Amazon company <claude.zboncak85@ethereal.email>',
     to: email,
     subject,
     html: ` Click here to sign up =======> ${token}`,
});

const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     secure: false,
     auth: {
          user: 'mygameshopproject@gmail.com',
          pass: 'dpkqdqyhtytchcjx',

     },
});
const mailer = async (message) => {
     try {
          await transporter.sendMail(message);
     } catch (err) {
          throw new ServerError(400, 'Email', 'Email address error');
     }
};

export default mailer;
