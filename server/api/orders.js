const router = require('express').Router()
const {Order, OrderDetail, Product, User, Address} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

// GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orderList = await Order.findAll({
      include: ['billing', 'address', 'product']
    })
    res.json(orderList)
  } catch (err) {
    next(err)
  }
})

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: ['billing', 'address', 'product']
    })
    if (order) {
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// POST /api/orders/:userId
router.post('/:userId', async (req, res, next) => {
  try {
    const currentOpenOrder = await Order.findOrCreate({
      where: {
        [Op.and]: [{userId: req.params.userId}, {status: 'Open'}]
      }
    })
    const updatedOrder = await OrderDetail.findOrCreate({
      where: {
        orderId: currentOpenOrder[0].dataValues.id,
        productId: req.body.productId
      }
    })
    await updatedOrder[0].update({
      quantity: req.body.quantity + updatedOrder[0].dataValues.quantity
    })
    await currentOpenOrder[0].setUser(req.params.userId)
    console.log(updatedOrder)
    console.log(currentOpenOrder)
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
