const EXPRESS = require('express')
const APP = EXPRESS()
const PATH = require('path')
const bodyParser = require("body-parser")
const mysql = require('mysql-')

var DATA = []

APP.listen(3000, ()=>{console.log('Server started on port 3000')})

//Middleware
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());

//Abrir conexiones con base de datos
// const db = mysql.createConnections({
//     host: 'localhost',
//     user: 'me',
//     password: '123456',
//     database: 'nodemysql'
// })
//
// db.connect((err)=>{
//   if (err){
//     throw err;
//   }
//   console.log('Mysql connected...')
// })

// APP.get('/createdb', (req,res) =>{
//   let sql = 'CREATE DATABASE nodemysql'
//   db.query(sql,(err,result) =>{
//     if(err) throw err;
//     console.log(result)
//     res.send('Database created...')
//   })
// })

// APP.get('/createuserstable',(req,res)=>{
//   let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, username VARCHAR(45), email VARCHAR(45), password VARCHAR(80),hash VARCHAR(80))';
//   db.query(sql,(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     res.send('Users table created');
//   })
// })

APP.get('/signup',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/signup.html`)))

APP.get('/login',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/login.html`)))

APP.post('/signup',(req,res)=>{
  let newUser = {username:req.body.username, email: req.body.email, password: req.body.password, hash: req.body.hash}
  console.log(req.body.username)
  console.log(req.body.email)
  console.log(req.body.password)
  DATA.push(newUser)

  // let user = {username:'Pepelu', email:'pepe@mail.com'}
  // let sql = 'INSERT INTO users SET ?';
  // let query = db.query(sql, newUser,(err,result)=>{
  //   if(err) throw err;
  //   console.log(result);
  //   res.send('User 1 added...')
  // })
})

// APP.get('/login/:username',(req,res)=>{
//   let sql = `SELECT * FROM users WHERE id = ${req.params.username}`;
//   let query = db.query(sql,(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     res.send('User fetched...')
//   })
// })



APP.get('/:city',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/${req.params.city}.html`)))

APP.get('*', function(req, res){res.send('Lo siento, no hay nada que ver aqui :_(', 404);});
