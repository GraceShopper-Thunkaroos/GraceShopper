const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  delivered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  instruction: {
    type: Sequelize.TEXT
  },
  purchaseDate: {
    type: Sequelize.DATE
  },
  expectedDeliveryDate: {
    type: Sequelize.DATE
  }
})

/*
2 apples
2 dogs
1 cat
1 banana
*/

module.exports = Order
