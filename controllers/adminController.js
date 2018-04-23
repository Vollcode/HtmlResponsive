'use strict'
var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var travelModel = require('../models/travelModel');
var userSequelize = require('../models/sequelizeUser')
var travelSequelize = require('../models/sequelizeTravel')
let db = require('../database/dbConnection');
const Multer = require('multer');
const upload = require('../config/multer');
const paginate = require('express-paginate');
let adminController = {}

adminController.getDestinations= function(req,res,next) {
  let page=(parseInt(req.query.page) || 1) -1;
  let limit = 2;
  let offset = page * limit ;

  travelModel.paginate(offset, limit, (error, travels)=>{
    if(error){
      return res.status(500).send(error);
    } else {
      let isAdmin=req.session.isAdmin;
      if(req.session.isAdmin==1){
        const currentPage = offset ===0 ? 1:(offset/limit)+1;
        const totalCount = travels.count[0].total;
        const pageCount = Math.ceil(totalCount /limit);
        const pagination = paginate.getArrayPages(req)(10,pageCount, currentPage);
        res.render('listaDestinos',{
          layout: 'admin',
          title:"Travel Panel",
          user : req.session.username,
          isAdmin : req.session.isAdmin,
          isUserLogged : req.session.isUserLogged,
          travels: travels.rows,
          currentPage,
          links: pagination,
          hasNext: paginate.hasNextPages(pageCount),
          pageCount
        });
      } else {
        res.redirect('/')
      }
    }
  })
}

adminController.getUsers=function(req,res,next){
  let page=(parseInt(req.query.page) || 1) -1;
  let limit = 2;
  let offset = page * limit ;
    userModel.paginate(offset,limit,(error,users)=>{
        if(error) return res.status(500).json(error);
        else{
            let isAdmin=req.session.isAdmin;
            if(req.session.isAdmin==1){
              const currentPage = offset ===0 ? 1:(offset/limit)+1;
              const totalCount = users.count[0].total;
              const pageCount = Math.ceil(totalCount /limit);
              const pagination = paginate.getArrayPages(req)(10,pageCount, currentPage);
                res.render('listaUsers',{
                    layout: 'admin',
                    title:"Users Panel",
                    user : req.session.username,
                    isAdmin : req.session.isAdmin,
                    isUserLogged : req.session.isUserLogged,
                    users: users.rows,
                    currentPage,
                    links: pagination,
                    hasNext: paginate.hasNextPages(pageCount),
                    pageCount
                })
            }
            else{
                res.redirect('/')
            }
        }
    })
}

adminController.getOpenDestination=function(req,res,next){
  let id = req.params.id;
  travelSequelize.findById(id).then((destination)=>{
    if(destination){
      res.render('edicionDestino', {
          layout: 'adminMenu',
          result: destination.dataValues
      });
    }
  })
  .error(err => {
    return done(null,err)
  })
}

adminController.postSaveUser=function(req,res,next){
  var active;
  req.body.active === 'on' ? active = 1 : active = 0;
  userSequelize.create({username: req.body.username, email: req.body.email,password: req.body.password,hash:req.body.hash,active:active})
  .then((result)=>{
    if(result){
       res.redirect('/admin/users');
    }
  })
  .error((err)=>{ return done(null,err)})
}

adminController.postEditUser=function(req,res,next){
  var active;
  req.body.active === 'on' ? active = 1 : active = 0;
  userSequelize.update({username: req.body.username, email: req.body.email,password: req.body.password,hash:req.body.hash,active:active},{where: {id: req.body.id}})
  .then((result)=>{
    res.redirect('/admin/users');
  })
  .error((err)=>{
      return done(null,err)
  })
}

adminController.postSaveDestination=function(req,res,next){
  var active;
  req.body.active === 'on' ? active = 1 : active = 0;
  var imagePath = "/" + req.file.path;

  travelSequelize.create({city: req.body.travel, description: req.body.description,type: req.body.type,price:req.body.price,image:imagePath,active:active})
  .then((result)=>{
    if(result){
       res.redirect('/admin/destinos');
    }
  })
  .error((err)=>{ return done(null,err)})
}

adminController.postEditDestination=function(req,res,next){
  var active;
  req.body.active === 'on' ? active = 1 : active = 0;
  var imagePath = "/" + req.file.path;

  travelSequelize.update({city: req.body.travel, description: req.body.description,type: req.body.type,price:req.body.price,image:imagePath,active:active},{where: {id: req.body.id}})
  .then((result)=>{
    res.redirect('/admin/destinos');
  })
  .error((err)=>{
      return done(null,err)
  })
}

adminController.getDeleteUser=function(req,res,next){
  let idToDestroy = req.params.id;
  userSequelize.destroy({ where: { id: idToDestroy } })
  .then(function(){
    res.redirect('/admin/users');
  })
}

adminController.getDeleteDestination=function(req,res,next){
  let idToDestroy = req.params.id;
  travelSequelize.destroy({ where: { id: idToDestroy } })
  .then(function(){
    res.redirect('/admin/destinos');
  })
}

adminController.getOpenUser=function(req,res,next){
  let id = req.params.id;
  userModel.fetchSingleById(id,(error, result)=>{
      if(result){
          res.render('edicionUsuario', {
              layout: 'adminMenu',
              result: result[0]
          });
      }else {
          return res.status(500).json(err);
      }
  })
}






module.exports = adminController
