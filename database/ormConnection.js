const Sequelize = require('sequelize')
const sequelize = new Sequelize('geekshubstravel',process.env.USUARIO,process.env.USUARIO,{
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,
  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle:10000
  }
})


var sequelize = require('./config/connector')

 sequelize.authenticate()
     .then(()=> {
       console.log('Connection has been established successfully')
     })
     .catch(error => {
       console.error('Error in connecting to the database: ', error)
     })

 const Usuario = sequelize.define('user', {
   username: {
     type: Sequelize.STRING
   },
   email: {
     type: Sequelize.STRING
   },
   password: {
     type: Sequelize.STRING
   },
   hash: {
     type: Sequelize.TEXT
   },
   isAdmin: {
     type: Sequelize.BOOLEAN
   },
   active: {
     type: Sequelize.BOOLEAN
   },
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  }
 })

 const Destino = sequelize.define('travel', {
   city: {
     type: Sequelize.STRING
   },
   price: {
     type: Sequelize.FLOAT
   },
   image: {
     type: Sequelize.STRING
   },
   type: {
     type: Sequelize.STRING
   },
   description: {
     type: Sequelize.TEXT
   },
   active: {
     type: Sequelize.BOOLEAN
   },
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  }
 })

 CREATE TABLE travel (id INT AUTO_INCREMENT NOT NULL, city VARCHAR(45) NOT NULL, price FLOAT(8) NOT NULL, image VARCHAR(45) NOT NULL, type VARCHAR(20) NOT NULL, description VARCHAR(80) NOT NULL, active INT(1) NOT NULL DEFAULT 1, PRIMARY KEY(id));


 User.sync({force: true}).then(() => {
   return User.create({
     firstName: 'John',
     lastName: 'Wick'
   })
 })

module.exports = sequelize
