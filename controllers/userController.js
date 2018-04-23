var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var travelModel = require('../models/travelModel');
var travelSequelize = require('../models/sequelizeTravel')
var userSequelize = require('../models/sequelizeUser')
var atob = require('atob')
let email = require('../config/mailconf');
let db = require('../database/dbConnection');
const path = require('path');
const Hbs = require('nodemailer-express-handlebars');
const hashcrypt = require('bcrypt-nodejs');
const PASSPORT = require('passport');
const LOCALSTRATEGY = require('passport-local').Strategy;
let userController = {}

userController.postLogin = function (req, res, next) {
  let user = { username:req.body.username, password:req.body.password }
      userModel.login(user,function (error,result) {
          if(error) res.status(500).json(error);

          switch (result) {
              case 1:
                  res.render('login', {
                      title: "Login incorrecto",
                  });
                  break;
              case 2:
                  if(user.username=='admin'){
                      req.session.username="admin";
                      req.session.isUserLogged=1;
                      req.session.isAdmin=1;
                  }
                  else{
                      req.session.isAdmin=0;
                      req.session.username=user.username;
                      req.session.isUserLogged=1;
                  }
                  res.redirect('/');
                  break;
              case 3:
                  res.render('index',{
                      title:'no active'
                  })
          }
      })
    };

userController.postSignUp = function(req,res){
  let user = {
      username:req.body.username,
      email:req.body.email,
      password:req.body.password,
      hash:hashcrypt.hashSync(req.body.hash)
  };
  let usuario = user;
  userModel.signUp(user,function (error,result,user) {
      if(error) res.status(500).json(error);
      switch (result){
          case 1:
          res.render('registro',{
              title:"El nombre de usuario ya existe",
          })
              break;
          case 2:
          res.render('registro',{
              title:"El email  ya existe",
          })
              break;
          case 3:
              email.transporter.use('compile', Hbs  ({
                  viewEngine: 'hbs',
                  extName: '.hbs',
                  viewPath: path.join(__dirname + '/../views/email-templates')
              }));
              let encodedhash = encodeURIComponent(usuario.hash);
              let message = {
                  from: 'GHTravels <no-reply@geekshubtravels.com>',
                  to: usuario.email,
                  subject : 'Activa tu cuenta de Geekshubs Travels',
                  template:'emailActivate',
                  context: {
                      encodedhash: encodedhash
                  }
              };
              email.transporter.sendMail(message,(error,info) =>{
                  if(error){
                      res.status(500).send(error);
                      return
                  }
                  email.transporter.close();
                  res.status(200).send('Respuesta "%s"' + info.response);
              });
              res.render('login', {
                  title: 'Bienvenido!'
              });
              break;
      }
  })

}

  userController.getHomePage = function(req,res,next){
    travelModel.fetchActive((error,travels)=>{
      if(error) return res.status(500).json(error);
        res.render('index',{
          title:"Travels",
          isUserLogged : req.session.isUserLogged,
          isAdmin : req.session.isAdmin,
          user: req.session.username,
          travels
        })
    })
  }

  userController.getDestination=function(req,res,next){
    travelModel.fetchSingle(req.params.city,(error,travels)=>{
      if(error) return res.status(500).json(error);
        if (req.session.isUserLogged == 1) {

          if (req.session.checkSuccess == 1) {
            req.session.checkSuccess = 0;
          }else if (req.session.cart) {
            req.flash('success', 'add to cart');
            res.locals.message = req.flash();
            req.session.checkSuccess = 1;
          }
          res.render('destination',{
            title:"City",
            isUserLogged : req.session.isUserLogged,
            user: req.session.username,
            message: res.locals.message,
            travels
          })
        }
        else {
          res.redirect('/')
        }
    })
  }

  userController.postRememberPassword = function(req,res,next){
    let user = {}
    user.id = req.body.id
    user.password = req.body.password
    userModel.updatePassword(user, (error, result)=>{
      if(result){
        res.redirect('/passwordCambiado');
      } else {
        res.status(500).json('Error al editar usuario '+ error);
      }
    });
  }

  userController.activateUser=function(req,res,next){
    userModel.activateUser(req.params.id, (error,cb)=>{
        if(error) res.status(500).json(error);
        else res.redirect('/login');
    })
  }



module.exports = userController;
