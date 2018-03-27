const EXPRESS = require('express')
const APP = EXPRESS()
const PATH = require('path')
const bodyParser = require("body-parser")
const mysql = require('mysql')

APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());

APP.listen(3000, "0.0.0.0")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodemysql'
})

db.connect((err)=>{
  if (err){
    throw err;
  }
  console.log('Mysql connected...')
})

APP.get('/signup',(req,res)=> res.sendFile(PATH.join(__dirname+`/signup.html`)))

APP.get('/login',(req,res)=> res.sendFile(PATH.join(__dirname+`/login.html`)))

APP.post('/signup',(req,res)=>{
  let newUser = {username:req.body.username, email: req.body.email, password: req.body.password}
  let sql = 'INSERT INTO user SET ?';
  let query = db.query(sql, newUser,(err,result)=>{
    if(err) throw err;

    res.send('User added...')
  })
})

APP.post('/login',(req,res)=>{
  let sql = `SELECT * FROM user WHERE username = ?`;
  var username = req.body.username
  let query = db.query(sql, username,(err,result)=>{
    if(err) throw err;

    res.redirect('/loginAccepted?fetchedUsername=' + result[0].username)
  })
})

APP.get('/loginAccepted/:fetchedUsername',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/loginAccepted.html`, {fetchedUsername:fetchedUsername})))

APP.get('/:city',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/${req.params.city}.html`)))

APP.get('*', (req, res) => res.send('Lo siento, no hay nada que ver aqui :_(', 404))
