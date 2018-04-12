const express = require('express');
const router = express.Router();
const path = require('path');
const Hbs = require('nodemailer-express-handlebars');
const email = require('../config/mailconf');

router.get ('/send',(req,res,send)=>{
    let message = {
        to:'',
        subject:'Email de prueba',
        template: 'email',
        attachments: [/*
            {
                filename: 'mountain.jpg',
                path: __dirname + '/../public/images/mountain.jpg',
                cid: 'mountain'
            },
            {
                filename: 'mountain.jpg',
                path: __dirname + '/../public/images/mountain.jpg',
            }*/
        ]
    };
    email.transporter.sendMail(message,(error, info)=>{
        if(error){
            res.status(500).send(error);
            return
        }
        email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    });
    email.transporter.use('compile', Hbs  ({
        viewEngine: 'hbs',
        extName: '.hbs',
        viewPath: path.join(__dirname + '/../views/email-templates')
    }));
});

module.exports = router;