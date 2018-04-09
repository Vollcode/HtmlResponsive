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

const db = require('./database/dbConnection')

// APP.get('/',(req,res, next)=> {
//   let sql = 'SELECT * FROM travel LIMIT 6;';
//   let query = db.query(sql,(err,result)=>{
//     if(err) throw err;
//
//     console.log(result)
//
//     res.render('travels', {title: 'travel list',
//                            layout: 'index.hbs',
//                            result
//     })
//   })
// })
//
//
// APP.get('/signup',(req,res)=> {res.render('signup')})
//
// APP.get('/login',(req,res)=> {res.render('login')})
//
// APP.post('/signup',(req,res)=>{
//   let newUser = {username:req.body.username, email: req.body.email, password: req.body.password, hash: req.body.hash}
//   let sql = 'INSERT INTO user SET ?';
//   let query = db.query(sql, newUser,(err,result)=>{
//     if(err) throw err;
//
//     res.redirect('login')
//   })
// })
//
// APP.post('/login',(req,res)=>{
//   let sql = `SELECT * FROM user WHERE username = ?`;
//   var username = req.body.username
//   let query = db.query(sql, username,(err,result)=>{
//     if(err) throw err;
//
//     res.render('index',{ user: result[0].username })
//   })
// })
//
// APP.get('/loginAccepted/:fetchedUsername',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/loginAccepted.html`, {fetchedUsername:fetchedUsername})))
//
// APP.get('/destinations/:city',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/${req.params.city}.html`)));
//
// APP.get('*', (req, res) => {res.render('error404')});
