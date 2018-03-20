const EXPRESS = require('express')
const APP = EXPRESS()
const PATH = require('path')
const mysql = require('mysql')

//Abrir conexiones con base de datos
const db = mysql.createConnections({
    host: 'localhost',
    user: 'me',
    password: '123456',
    database: 'nodemysql'
})

db.connect((err)=>{
  if (err){
    throw err;
  }
  console.log('Mysql connected...')
})

APP.get('/createdb', (req,res) =>{
  let sql = 'CREATE DATABASE nodemysql'
  db.query(sql,(err,result) =>{
    if(err) throw err;
    console.log(result)
    res.send('Database created...')
  })
})

APP.get('/createuserstable',(req,res)=>{
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, username VARCHAR(45), email VARCHAR(45), password VARCHAR(80),hash VARCHAR(80))';
  db.query(sql,(err.result)=>{
    if(err) throw err;
    console.log(result);
    res.send('Users table created');
  })
})

APP.get('/signup',(req,res)=>{
  let user = {username:'Pepelu', email:'pepe@mail.com'}
  let sql = 'INSERT INTO users SET ?';
  let query = db.query(sql, user,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send('User 1 added...')
  })
})

APP.get('/user/:id',(req,res)=>{
  let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
  let query = db.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send('User fetched...')
  })
})


APP.listen(3000, ()=>{console.log('Server started on port 3000')})

APP.get('/:city',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/${req.params.city}.html`)))
