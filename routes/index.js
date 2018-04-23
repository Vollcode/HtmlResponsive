var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var travelModel = require('../models/travelModel');
var travelSequelize = require('../models/sequelizeTravel');
var userSequelize = require('../models/sequelizeUser');
var atob = require('atob');
let email = require('../config/mailconf');
let db = require('../database/dbConnection');
const path = require('path');
const Hbs = require('nodemailer-express-handlebars');
const hashcrypt = require('bcrypt-nodejs');
const PASSPORT = require('passport');
const LOCALSTRATEGY = require('passport-local').Strategy;
var userController = require('../controllers/userController');
var cartController = require('../controllers/cartController');



// PASSPORT.serializeUser(function(user, done) {
//   console.log("llegamos")
//     done(null, user.id);
// });
//
// PASSPORT.deserializeUser(function(id, done) {
//   console.log("llegamos hasta aqui")
//   userSequelize.findById(id).then(user=>{
//     return (null, user);
//   })
// });
//
// PASSPORT.use(new LOCALSTRATEGY({usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true,
//     session: false},
//   (username, password, done)=>{
//     console.log('Datos recibidos ->' + username);
//     userSequelize.findOne({where:{username: username, password: password},attributes:['username','password']})
//     .then(user=>{
//       console.log(JSON.stringify(user));
//       if(!user) return done(null, false, {message: 'El usuario no ha sido identificado'});
//       return done(null, user);
//     }).error(err=>{
//       return done(err);
//     })
//
//   }
// ))


// router.post('/login', PASSPORT.authenticate('local',{
//   failureRedirect: '/login', failureFlash:true
// }), (req,res,next)=> {
//   console.log("primera prueba")
//   userController.postLogin(req,res,next);
// })
router.post('/login',function (req,res,next) {
 userController.postLogin(req,res,next)
})

router.get('/', (req,res,next)=>{
  userController.getHomePage(req,res,next)
});

router.get('/destination/:city', (req,res,next)=>{
  userController.getDestination(req,res,next)
});

router.get('/login', function(req, res, next) {
    res.render('login',
        {
            title: 'User Login',
        })
})

router.get('/signup', function(req, res, next) {
    res.render('registro',
        {
            title: 'User SignUp',
        })
})

router.post('/signup', function (req, res) {
  userController.postSignUp(req,res)
});

router.get('/active/:id', function(req,res){
  userController.activateUser(req,res,next)
});

router.get('/destroy',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/');
})

router.get('/recuperarPassword/:id', (req,res,next)=>{
  let id = atob(req.params.id);
  userModel.fetchSingleById(id,(error, result)=>{
      if(result){
          res.render('recuperarPassword', {
              result: result[0]
          });
      }else {
          return res.status(500).json(err);
      }
  })
});

router.post('/recuperarPassword', (req,res,next)=>{
  userController.postRememberPassword(req,res,next)
});

router.get('/passwordCambiado', function(req, res, next) {
    res.render('passwordCambiado',
        {
            title: 'Cambio de Password',
        })
})

router.get('/checkout', function(req, res, next) {
  cartController.getCheckout(req,res,next)
})

router.post('/addToCart', function(req,res,next){
  cartController.postAddToCart(req,res,next)
})

router.post('/deleteCartItem',function(req,res,next){
  cartController.postDeleteCartItem(req,res,next)
})

router.get('*', function(req, res) {
    res.render('error404');
})

module.exports = router;
