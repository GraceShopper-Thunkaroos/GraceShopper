const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  street1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM(['Personal', 'Business', 'Billing']),
    defaultValue: 'Personal'
  }
})

module.exports = Address
