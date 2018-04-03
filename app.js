const EXPRESS = require('express')
const APP = EXPRESS()
const PATH = require('path')
const bodyParser = require("body-parser")
const mysql = require('mysql')
const hbs = require('express-handlebars')

APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());

APP.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/public/layouts/',
  partialsDir: __dirname + '/public/partials/'
} ) );
APP.set( 'view engine', 'hbs' );

APP.use('/bower_components', EXPRESS.static('bower_components'));
APP.use('/node_modules', EXPRESS.static('node_modules'));

APP.use('/',EXPRESS.static(__dirname + '/'));

APP.listen(3000, () =>{ console.log("Puerto 3000 levantado")});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'geekshubstravel'
})

function keepalive() {
    db.query('select 1', [], function(err, result) {
        if(err) return console.log(err);
        console.log('Successful keepalive.');
    });
}

keepalive();

APP.get('/',(req,res)=> res.sendFile(PATH.join(__dirname+'/index.html')));

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
