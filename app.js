'use strict'
const EXPRESS = require('express')
const APP = EXPRESS()
const PATH = require('path')
const bodyParser = require("body-parser")
const mysql = require('mysql')
const hbs = require('hbs')

APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());

APP.set( 'view engine', 'hbs' );

APP.use('/',EXPRESS.static(__dirname + '/'));

hbs.registerPartials(`${__dirname}/partials`);

APP.listen(3000, () =>{ console.log("Puerto 3000 levantado")});

const db = require('./database/dbConnection')

db.connect((err)=>{
  if (err){
    throw err;
  }
  console.log('Mysql connected...')
})

APP.get('/',(req,res)=> {res.render('index')});

APP.get('/signup',(req,res)=> {res.render('signup')})

APP.get('/login',(req,res)=> {res.render('login')})

APP.post('/signup',(req,res)=>{
  let newUser = {username:req.body.username, email: req.body.email, password: req.body.password, hash: req.body.hash}
  let sql = 'INSERT INTO user SET ?';
  let query = db.query(sql, newUser,(err,result)=>{
    if(err) throw err;

    res.redirect('login')
  })
})

APP.post('/login',(req,res)=>{
  let sql = `SELECT * FROM user WHERE username = ?`;
  var username = req.body.username
  let query = db.query(sql, username,(err,result)=>{
    if(err) throw err;

    res.render('index',{ user: result[0].username })
  })
})

APP.get('/loginAccepted/:fetchedUsername',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/loginAccepted.html`, {fetchedUsername:fetchedUsername})))

APP.get('/destinations/:city',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/${req.params.city}.html`)));

APP.get('*', (req, res) => {res.render('error404')});
