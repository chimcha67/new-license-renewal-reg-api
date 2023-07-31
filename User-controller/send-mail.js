const nodemailer = require("nodemailer");
//const SMTPConnection = require("nodemailer/lib/smtp-connection");

 
const sendEmail = async (email, subject, text) => {
    try {
        

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            // host: process.env.HOST,
            // port:   process.env.PORT,
            //  secure: true,
            // // logger: true,
            // // debug: true,
            // // ignoreTLS: true,
            // tls:{
            //     rejectUnauthorized:false
            // },
            auth: {
                // user: process.env.USER,
                // pass:  process.env.PASS,
                   user: 'comfortenock73@gmail.com',
                   pass: 'cfgdgtfbdoctvfvo',
            },
            // user: 'comfortenock73@gmail.com',
            // pass: 'cfgdgtfbdoctvfvo',
        });

        await transporter.sendMail({
            from: 'stanumy licence renewal corporation<comfortenock73@gmail.com>',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;