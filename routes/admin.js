'use strict'
var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var travelModel = require('../models/travelModel');
var userSequelize = require('../models/sequelizeUser')
let db = require('../database/dbConnection');
const Multer = require('multer');
const upload = require('../config/multer');
const paginate = require('express-paginate');



//Lista de destinos con paginación
router.get('/destinos', function(req, res, next) {
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
});

//abre el formulario para crear un destino nuevo
router.get('/crear-destino', (req, res, next)=>{
    res.render('creacionDestino', {
        layout: 'admin',
    });
});

//guarda un destino
router.post('/guardar-destino', upload.single('file'), (req, res, next)=>{
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
});

//edita un destino
router.post('/editar-destino',upload.single('file'), (req, res, next)=>{
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
});

//elimina un destino
router.get('/eliminar-destino/:id', (req, res, next)=>{
    let id = req.params.id;

    travelModel.deleteTravel(id, (error, result)=>{
        if(result){
            res.redirect('/admin/destinos');
        }else{
            res.status(500).json('Error al eliminar destino'+ error);
        }
    })
});

//abre un formulario de edicion con datos
router.get('/abrir-destino/:id', (req, res, next)=>{
    let id = req.params.id;
    travelModel.fetchSingleById(id,(error, result)=>{
        if(result){
            res.render('edicionDestino', {
                layout: 'admin',
                result: result[0]
            });
        }else {
            return res.status(500).json(err);
        }
    })
});

//User endpoints

router.get('/users', function(req, res, next) {
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
})

//abre el formulario para crear un destino nuevo
router.get('/crear-usuario', (req, res, next)=>{
    res.render('creacionUsuario', {
        layout: 'admin',
    });
});

//guarda un destino
router.post('/guardar-usuario', (req, res, next)=>{
    var active;
    req.body.active === 'on' ? active = 1 : active = 0;

    let usuario = {};
    usuario.username = req.body.username;
    usuario.email = req.body.email;
    usuario.password = req.body.password;
    usuario.hash = req.body.hash;

    userModel.insertUser(usuario, (error, insertID)=>{
       if(insertID){
           res.redirect('/admin/users');
       } else {
           res.status(500).json('Error al guardar'+ error);
       }
    });
});

//edita un destino
router.post('/editar-usuario', (req, res, next)=>{
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
});

//elimina un destino
router.get('/eliminar-usuario/:id', (req, res, next)=>{
    let idToDestroy = req.params.id;

    // userModel.deleteUser(id, (error, result)=>{
    //     if(result){
    //         res.redirect('/admin/users');
    //     }else{
    //         res.status(500).json('Error al eliminar usuario'+ error);
    //     }
    // })


    userSequelize.destroy({ where: { id: idToDestroy } })
      .then(function(){
        res.redirect('/admin/users');
      })
});

//abre un formulario de edicion con datos
router.get('/abrir-usuario/:id', (req, res, next)=>{
    let id = req.params.id;
    userModel.fetchSingleById(id,(error, result)=>{
        if(result){
            res.render('edicionUsuario', {
                layout: 'admin',
                result: result[0]
            });
        }else {
            return res.status(500).json(err);
        }
    })
});



module.exports = router;
