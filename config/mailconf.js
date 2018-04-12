const NMAILER = require('nodemailer');



let email= {} ;
email.transporter = NMAILER.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USUARIO,
        pass: process.env.PASSWORD
    }
    },
    {
        from:'',
        headers:{
        }

    });

module.exports = email;
