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
var adminController = require('../controllers/adminController')

//Lista de destinos con paginación
router.get('/destinos', function(req, res, next) {
  adminController.getDestinations(req,res,next)
});

//abre el formulario para crear un destino nuevo
router.get('/crear-destino', (req, res, next)=>{
    res.render('creacionDestino', {
        layout: 'adminMenu',
    });
});

//guarda un destino
router.post('/guardar-destino', upload.single('file'), (req, res, next)=>{
  adminController.postSaveDestination(req,res,next)
});

//edita un destino
router.post('/editar-destino',upload.single('file'), (req, res, next)=>{
  adminController.postEditDestination(req,res,next)
});

//elimina un destino
router.get('/eliminar-destino/:id', (req, res, next)=>{
  adminController.getDeleteDestination(req,res,next)
});

//abre un formulario de edicion con datos
router.get('/abrir-destino/:id', (req, res, next)=>{
  adminController.getOpenDestination(req,res,next)
});

//User endpoints

router.get('/users', function(req, res, next) {
  adminController.getUsers(req,res,next)
})

//abre el formulario para crear un destino nuevo
router.get('/crear-usuario', (req, res, next)=>{
    res.render('creacionUsuario', {
        layout: 'adminMenu',
    });
});

//guarda un destino
router.post('/guardar-usuario', (req, res, next)=>{
  adminController.postSaveUser(req,res,next)
});

//edita un destino
router.post('/editar-usuario', (req, res, next)=>{
  adminController.postEditUser(req,res,next)
});

//elimina un destino
router.get('/eliminar-usuario/:id', (req, res, next)=>{
  adminController.getDeleteUser(req,res,next)
});

//abre un formulario de edicion con datos
router.get('/abrir-usuario/:id', (req, res, next)=>{
  adminController.getOpenUser(req,res,next)
});



module.exports = router;
