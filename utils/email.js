const nodemailer = require('nodemailer');

const pug = require('pug');

//require this package, its use to convert html to text
const htmlToText = require('html-to-text');



//create a class template for a standard email
module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Idris <${process.env.EMAIL_FROM}>`;
    };

    newTransport(){
        if(process.env.NODE_ENV === 'production'){
            //sendGrid
            return 1
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    //Then lets send
    async send(template, subject){

        //send actual mail
        //1) Render html for email base on pug template
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
            firstName: this.firstName,
            url: this.url, 
            subject
        })


        //2) Define the mail options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };

        //3) create a transport and send mail
        await this.newTransport().sendMail(mailOptions)

    };


    //function that handles the sending of welcome message
    async sendWelcome(){
        await this.send('Welcome', 'Welcome to Tour Padi family!')
    }
};




//old approach
// const sendMail = async options => {
//     //1) Create a transporter
//     // const transporter = nodemailer.createTransport({
//     //     host: process.env.EMAIL_HOST,
//     //     port: process.env.EMAIL_PORT,
//     //     auth: {
//     //         user: process.env.EMAIL_USERNAME,
//     //         pass: process.env.EMAIL_PASSWORD
//     //     }
//     // });

//     //2) Define the email options
//     const mailOptions = {
//         from: 'Tourism app <idris@mail.com>',
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//         //html: 
//     };

//     //3) Then send mail
//     await transporter.sendMail(mailOptions)
// };

// // module.exports = sendMail;