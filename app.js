'use strict'
require('dotenv').config()
const EXPRESS = require('express');
const PATH = require('path');
const bodyParser = require("body-parser");
const hbs = require('hbs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Passport = require('passport');
var paginate = require('express-paginate');
var flash = require('connect-flash')


var winston = require('./config/winston');
var admin = require('./routes/admin');
var index = require('./routes/index');
let emailer = require('./routes/emailer');

const APP = EXPRESS();
APP.use(paginate.middleware(2,20));

APP.use('/',EXPRESS.static(__dirname + '/'));
APP.use(EXPRESS.static(PATH.join(__dirname, 'public')));
APP.set( 'view engine', 'hbs' );

hbs.registerPartials(`${__dirname}/views/partials`);
require('./helpers/hbs')(hbs);
APP.use(cookieParser());

APP.use(session({
  secret:'abcde',
  name: 'mySession',
  resave:true,
  saveUninitialized:true
}));

APP.use(flash())

APP.use(Passport.initialize());
APP.use(Passport.session());
APP.use((req,res,next)=>{
  res.locals.user= req.user;
  next();
})

APP.use(logger('combined', {stream: winston.stream}));

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));


APP.use('/emailer',emailer);
APP.use('/admin', admin);
APP.use('/', index);



APP.listen(3000, () =>{ console.log("Puerto 3000 levantado")});
