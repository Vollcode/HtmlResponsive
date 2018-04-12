'use strict'
require('dotenv').config()
const EXPRESS = require('express');
const PATH = require('path');
const bodyParser = require("body-parser");
const hbs = require('hbs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// var sequelize = require('./config/connector')
//
// sequelize.authenticate()
//     .then(()=> {
//       console.log('Connection has been established successfully')
//     })
//     .catch(error => {
//       console.error('Error in connecting to the database: ', error)
//     })
//
// const Usuario = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// })
//
// User.sync({force: true}).then(() => {
//   return User.create({
//     firstName: 'John',
//     lastName: 'Wick'
//   })
// })

var winston = require('./config/winston');
var admin = require('./routes/admin');
var index = require('./routes/index');
let emailer = require('./routes/emailer');

const APP = EXPRESS();

APP.use('/',EXPRESS.static(__dirname + '/'));
APP.use(EXPRESS.static(PATH.join(__dirname, 'public')));
APP.set( 'view engine', 'hbs' );

hbs.registerPartials(`${__dirname}/views/partials`);

APP.use(session({
  secret:'abcde',
  name: 'mySession',
  resave:true,
  saveUninitialized:true
}));

APP.use(logger('combined', {stream: winston.stream}));

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));

APP.use(cookieParser());

APP.use('/emailer',emailer);
APP.use('/admin', admin);
APP.use('/', index);



APP.listen(3000, () =>{ console.log("Puerto 3000 levantado")});
