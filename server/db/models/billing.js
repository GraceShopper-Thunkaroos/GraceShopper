const Sequelize = require('sequelize')
const db = require('../db')

const Billing = db.define('billing', {
  cardNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  securityCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expirationDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Billing
