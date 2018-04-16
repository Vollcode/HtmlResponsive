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
        from:'geekshubtravel@gmail.com',
        headers:{
        }

    });

module.exports = email;
