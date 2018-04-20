const Sequelize = require('sequelize')
var sequelize = require('../config/connector')

const Destino = sequelize.define('travel', {
  city: {
    type: Sequelize.STRING,
    allowNull: false
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
    type: Sequelize.BOOLEAN,
    defaultValue: '0'
  },
  id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true,
     allowNull: false
 }
})

module.exports = Destino
