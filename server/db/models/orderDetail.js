const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('order_detail', {
  orderId: Sequelize.INTEGER,
  productId: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER
})

module.exports = OrderDetail
