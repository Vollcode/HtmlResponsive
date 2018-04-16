const express = require('express');
const router = express.Router();
const path = require('path');
const Hbs = require('nodemailer-express-handlebars');
const email = require('../config/mailconf');
var userModel = require('../models/userModel');
var btoa = require('btoa')

router.post('/forgotPassword',(req,res,send)=>{


  userModel.fetchActiveByEmail(req.body.email,(error, result)=>{
      if(result){
        email.transporter.use('compile', Hbs  ({
          viewEngine: 'hbs',
          extName: '.hbs',
          viewPath: path.join(__dirname + '/../views/email-templates')
        }));
        let idUser = result[0].id
        let idString = idUser.toString()
        let hashId = btoa(idString)
        let username = result[0].username
        let message = {
          to:req.body.email,
          subject:'Email para cambiar el password',
          template: 'email',
          context: {
            user:
            username,
            userId:
            hashId
          },
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
    res.status(200).send('Respuesta ' + info.response);
    });
    console.log("LLEGA HASTA AQUI")
    console.log(req.body.email)
      }else {
          return res.status(500).json(err);
      }
  })
});

module.exports = router;
