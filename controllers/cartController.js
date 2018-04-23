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
let cartController = {};

cartController.postDeleteCartItem=function(req,res,next){
  var index = req.session.cart.indexOf(req.body.itemId);    // <-- Not supported in <IE9
  if (index !== -1) {
      req.session.cart.splice(index, 1);
  }
  res.redirect('/checkout')
}

cartController.postAddToCart=function(req,res,next){
  req.session.cart = req.session.cart || []
  req.session.cart.push(req.body.destination)

  res.redirect('/destination/' + req.body.city)
}

cartController.getCheckout=function(req,res,next){
  if (req.session.cart){
    let cartIds = [];
    for(let i = 0;i < req.session.cart.length; i++){
      cartIds.push(req.session.cart[i])
    }
      travelSequelize.findAll({where: {id:cartIds}})
        .then(function(travels){
          let totalPrice=0;
          travels.forEach(function(item) {
            totalPrice+= item.dataValues.price;
          });
          let priceIva = ((totalPrice *8)/100) + totalPrice
          res.render('checkout',
          {
            title: 'checkout',
            layout: 'adminMenu',
            precioSinIva: totalPrice,
            precioConIva: priceIva,
            travels
          })
        })
  } else {
    res.redirect('/')
  }
}


module.exports = cartController
