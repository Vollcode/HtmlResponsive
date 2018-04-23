const Sequelize = require('sequelize')
var sequelize = require('../config/connector')

const Usuario = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hash: {
    type: Sequelize.TEXT
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: '0'
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: '0'
  }
})

module.exports = Usuario
