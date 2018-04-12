const NMAILER = require('nodemailer');

let email= {} ;
email.transporter = NMAILER.createTransport({
    service: 'gmail',
    auth: {
        user: 'USUARIO',
        pass: 'PASSWORD'
    }
    },
    {
        from:'',
        headers:{
        }

    });

module.exports = email;