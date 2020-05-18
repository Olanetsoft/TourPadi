const nodemailer= require('nodemailer');

const sendMail = async options => {
    //1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //2) Define the email options
    const mailOptions = {
        from: 'Tourism app <idris@mail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        //html: 
    };

    //3) Then send mail
    await transporter.sendMail(mailOptions)
};

module.exports = sendMail;