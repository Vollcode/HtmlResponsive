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
   firstName: {
     type: Sequelize.STRING
   },
   lastName: {
     type: Sequelize.STRING
   }
 })

 User.sync({force: true}).then(() => {
   return User.create({
     firstName: 'John',
     lastName: 'Wick'
   })
 })

module.exports = sequelize
