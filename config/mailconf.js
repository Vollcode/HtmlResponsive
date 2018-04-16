const NMAILER = require('nodemailer');



let email= {} ;
email.transporter = NMAILER.createTransport({
    service: 'gmail',
    auth: {
        user: 'geekshubtravels@gmail.com',
        pass: 'ghtravels123'
    }
    },
    {
        from:'no-reply@ghtravels.com',
        headers:{
        }

    });

module.exports = email;
