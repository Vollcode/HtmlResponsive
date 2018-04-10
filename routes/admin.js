'use strict'
var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var travelModel = require('../models/travelModel');
let db = require('../database/dbConnection');

//Destination endpoints

router.get('/destinos', function(req, res, next) {
    travelModel.fetchAll((error,travels)=>{
        if(error) return res.status(500).json(error);
        else{
            let isAdmin=req.session.isAdmin;
            if(req.session.isAdmin==1){
                res.render('listaDestinos',{
                    layout: 'admin',
                    title:"Travel Panel",
                    user : req.session.username,
                    isAdmin : req.session.isAdmin,
                    isUserLogged : req.session.isUserLogged,
                    travels
                })
            }
            else{
                res.redirect('/')
            }
        }
    })
})

//abre el formulario para crear un destino nuevo
router.get('/crear-destino', (req, res, next)=>{
    res.render('creacionDestino', {
        layout: 'admin',
    });
});

//guarda un destino
router.post('/guardar-destino', (req, res, next)=>{
    var active;
    req.body.active === 'on' ? active = 1 : active = 0;

    let destino = {};
    destino.city = req.body.travel;
    destino.description = req.body.description;
    destino.type = req.body.type;
    destino.active = active;
    destino.price = req.body.price;
    destino.image = req.body.path;

    travelModel.insertTravel(destino, (error, insertID)=>{
       if(insertID){
           res.redirect('/admin/destinos');
       } else {
           res.status(500).json('Error al guardar'+ error);
       }
    });
});

//edita un destino
router.post('/editar-destino', (req, res, next)=>{
    var active;
    req.body.active === 'on' ? active = 1 : active = 0;

    let destino = {};
    destino.id = req.body.id;
    destino.city = req.body.travel;
    destino.description = req.body.description;
    destino.type = req.body.type;
    destino.active = active;
    destino.price = req.body.price;
    destino.image = req.body.path;

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
    userModel.fetchAll((error,users)=>{
        if(error) return res.status(500).json(error);
        else{
            let isAdmin=req.session.isAdmin;
            if(req.session.isAdmin==1){
                res.render('listaUsers',{
                    layout: 'admin',
                    title:"Users Panel",
                    user : req.session.username,
                    isAdmin : req.session.isAdmin,
                    isUserLogged : req.session.isUserLogged,
                    users
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
    usuario.username = req.body.username;
    usuario.email = req.body.email;
    usuario.password = req.body.password;
    usuario.hash = req.body.hash;
    usuario.active = active;

    userModel.update(usuario, (error, result)=>{
        if(result){
            res.redirect('/admin/users');
        } else {
            res.status(500).json('Error al editar usuario'+ error);
        }
    });
});

//elimina un destino
router.get('/eliminar-usuario/:id', (req, res, next)=>{
    let id = req.params.id;

    userModel.deleteUser(id, (error, result)=>{
        if(result){
            res.redirect('/admin/users');
        }else{
            res.status(500).json('Error al eliminar usuario'+ error);
        }
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
