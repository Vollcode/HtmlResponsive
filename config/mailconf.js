const NMAILER = require('nodemailer');

let email= {} ;
email.transporter = NMAILER.createTransport({
    service: 'Gmail',
    auth: {
        user: 'daniel.ortiz.olivares@gmail.com',
        pass: 'elemshardish'
    }
    },
    {
        from:'irememberwhat8@gmail.com',
        headers:{
        }

    });

module.exports = email;
