const express = require('express');
const router = express.Router();
const path = require('path');
const Hbs = require('nodemailer-express-handlebars');
const email = require('../config/mailconf');
const user = require('../models/userModel');

router.get ('/send',(req,res,send)=>{
    email.transporter.use('compile', Hbs  ({
        viewEngine: 'hbs',
        extName: '.hbs',
        viewPath: path.join(__dirname + '/../views/email-templates')
    }));
    let message = {
        to: 'lcornag@gmail.com',
        subject : 'Geekshubs Travels - Activa tu cuenta!',
        template:'email',
    };
    email.transporter.sendMail(message,(error,info) =>{
        if(error){
            res.status(500).send(error);
            return
        }
        email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    });
});

module.exports = router;