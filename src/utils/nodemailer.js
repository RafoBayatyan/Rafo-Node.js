import nodemailer from 'nodemailer';

const username = 'marvel.node@gmail.com';
const password = 'bpadbjuxbdhllpou';

export const sendEmail = async (to, subject, message) => {
     // create reusable transporter object using the default SMTP transport
     console.log('aaaa');
     const transporter = nodemailer.createTransport({
          service: 'gmail',
          //   host: 'smtp.ethereal.email',
          //   port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
               user: username, // generated ethereal user
               pass: password, // generated ethereal password
          },
     });
     console.log({
          from: 'marvel node', // sender address
          to, // list of receivers
          subject, // Subject line
          html: `<b>${message}</b>`, // html body
     });
     // send mail with defined transport object
     const info = await transporter.sendMail({
          from: 'marvel node', // sender address
          to, // list of receivers
          subject, // Subject line
          html: `<b>${message}</b>`, // html body
     });

     console.log('Message sent: %s', info.messageId);
     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

     // Preview only available when sending through an Ethereal account
     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
