var mysql = require('mysql')
require('dotenv').load();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'geekshubstravel'
})

db.connect((err)=>{
  if (err){
    throw err;
  }
  console.log('Mysql connected...')
})

module.exports = db;
