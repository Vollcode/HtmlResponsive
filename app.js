'use strict'
const EXPRESS = require('express')
const PATH = require('path')
const bodyParser = require("body-parser")
const hbs = require('hbs')
const session = require('express-session')
var cookieParser = require('cookie-parser');
var logger = require('morgan')


var winston = require('./config/winston')

var admin = require('./routes/admin')
var index = require('./routes/index');

const APP = EXPRESS()

APP.use('/',EXPRESS.static(__dirname + '/'));
APP.use(EXPRESS.static(PATH.join(__dirname, 'public')));
APP.set( 'view engine', 'hbs' );

hbs.registerPartials(`${__dirname}/partials`);

APP.use(session({
  secret:'abcde',
  name: 'mySession',
  resave:true,
  saveUninitialized:true
}));

APP.use(logger('combined', {stream: winston.stream}))

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));

APP.use(cookieParser());

APP.use('/admin', admin)
APP.use('/', index)

APP.listen(3000, () =>{ console.log("Puerto 3000 levantado")});

