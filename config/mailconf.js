const NMAILER = require('nodemailer');

let email= {} ;
email.transporter = NMAILER.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USUARIO,
        pass: process.env.PASSWORD
    }
    },
    {
        from:'geekshubtravel@gmail.com',
        headers:{
        }

    });

module.exports = email;
