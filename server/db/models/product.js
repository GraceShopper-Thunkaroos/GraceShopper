const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  breed: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  picture: {
    type: Sequelize.STRING
  }
})

// Dogs, dog accessories (leashes, food, dog house, beds, etc)

module.exports = Product
