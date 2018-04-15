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
        from:process.env.USUARIO,
        headers:{
        }

    });

module.exports = email;
