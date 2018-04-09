'use strict'
var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var travelModel = require('../models/travelModel');
let db = require('../database/dbConnection');

router.get('/', function(req, res, next) {
    travelModel.fetchAll((error,travels)=>{console.log(travels)
        if(error) return res.status(500).json(error);
        else{
            let isAdmin=req.session.isAdmin;
            if(req.session.isAdmin==1){
                res.render('listaDestinos',{
                    layout: 'admin',
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
           res.redirect('/admin');
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
            res.redirect('/admin');
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
            res.redirect('/admin');
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
