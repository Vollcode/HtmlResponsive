'use strict'
var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var travelModel = require('../models/travelModel');

router.get('/', function(req, res, next) {
    travelModel.fetchAll((error,travels)=>{
        if(error) return res.status(500).json(error);
        else{
            let isAdmin=req.session.isAdmin;
            if(req.session.isAdmin==1){
                res.render('adminPanel',{
                    title:"Travel Panel",
                    isLogged : req.session.isLogged,
                    isAdmin : req.session.isAdmin,
                    user : req.session.username,
                    travels
                })
            }
            else{
                res.redirect('/')
            }
        }
    })
})

//Ejemplos de clase, no es codigo de producción

router.get('/create', (req,res,next)=>{
  req.session.username="xrodriguez";
  req.session.isAdmin = 1;
  res.redirect('/admins');
})


router.get('/remove',(req,res,next)=>{
  req.session.username = null;
})

router.get('/destroy',(req,res,next)=>{
  req.session.destroy();
  res.redirect('/admins');
})

router.get('/privada',(req,res,next)=>{
  if(req.session.isAdmin == 1)
    res.status(200).send("enhorabuena")
  else
    res.redirect('/admins');
})

module.exports = router;
