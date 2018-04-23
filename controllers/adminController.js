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
  // let usuario = {};
  // usuario.username = req.body.username;
  // usuario.email = req.body.email;
  // usuario.password = req.body.password;
  // usuario.hash = req.body.hash;
  userSequelize.create({username: req.body.username, email: req.body.email,password: req.body.password,hash:req.body.hash,active:active})
  .then((result)=>{
    if(result){
       res.redirect('/admin/users');
    }
  })
  .error((err)=>{ return done(null,err)})
  // userModel.insertUser(usuario, (error, insertID)=>{
  //    if(insertID){
  //        res.redirect('/admin/users');
  //    } else {
  //        res.status(500).json('Error al guardar'+ error);
  //    }
  // });
}

adminController.postEditUser=function(req,res,next){
  var active;
  req.body.active === 'on' ? active = 1 : active = 0;

  let usuario = {};
  usuario.id = req.body.id;
  usuario.username = req.body.username;
  usuario.email = req.body.email;
  usuario.password = req.body.password;
  usuario.hash = req.body.hash;
  usuario.active = active;

  userModel.update(usuario, (error, result)=>{
      if(result){
          res.redirect('/admin/users');
      } else {
          res.status(500).json('Error al editar usuario '+ error);
      }
  });
}

adminController.postSaveDestination=function(req,res,next){
  var active;
  req.body.active === 'on' ? active = 1 : active = 0;

  let destino = {};
  destino.city = req.body.travel;
  destino.description = req.body.description;
  destino.type = req.body.type;
  destino.active = active;
  destino.price = req.body.price;
  destino.image = "/" + req.file.path;

  travelModel.insertTravel(destino, (error, insertID)=>{
     if(insertID){
         res.redirect('/admin/destinos');
     } else {
         res.status(500).json('Error al guardar'+ error);
     }
  });
}

adminController.postEditDestination=function(req,res,next){
  var active;
  req.body.active === 'on' ? active = 1 : active = 0;

  let destino = {};
  destino.id = req.body.id;
  destino.city = req.body.travel;
  destino.description = req.body.description;
  destino.type = req.body.type;
  destino.active = active;
  destino.price = req.body.price;
  destino.image = "/" + req.file.path;

  travelModel.update(destino, (error, result)=>{
      if(result){
          res.redirect('/admin/destinos');
      } else {
          res.status(500).json('Error al editar'+ error);
      }
  });
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





module.exports = adminController
