const Sequelize = require('sequelize')
const sequelize = new Sequelize('geekshubstravel','root','mysql',{
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

module.exports = sequelize
