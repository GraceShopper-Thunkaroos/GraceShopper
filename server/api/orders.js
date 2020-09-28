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
  // console.log("i made it here", req.params.id)
  try {
    const order = await Order.findByPk(req.params.id, {
      include: ['billing', 'address', 'product']
    })
    console.log('this is the order', order)
    if (order) {
      console.log('i am returning the json')
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// GET /api/orders/user/:userId
router.get('/user/:userId', async (req, res, next) => {
  try {
    const allUserOrders = await Order.findAll({
      include: [{model: User, as: 'user'}],
      where: {
        [Op.and]: [{userId: req.params.userId}, {status: 'Open'}]
      }
    })
    if (allUserOrders) {
      res.json(allUserOrders)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/:lineId', async (req, res, next) => {
  try {
    const {userId, lineId} = req.params
    console.log('userid, lineId, ', userId, lineId)
    if (Number.isNaN(userId) || Number.isNaN(lineId)) return res.sendStatus(400)
    const orderId = await Order.findAll({
      where: {
        [Op.and]: [{userId: req.params.userId}, {status: 'Open'}]
      }
    })
    if (orderId.length !== 0) {
      const orderLine = await OrderDetail.findOne({
        where: {
          orderId: orderId[0].dataValues.id,
          productId: lineId
        }
      })
      if (orderLine) {
        await orderLine.destroy()
        res.sendStatus(204)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// router.put('/:id', async (req, res, next) => {
//   try {
//     const orderStatus = await Order.findByPk({
//       where: {
//       [Op.and]: [{userId: req.params.userId}, {status: 'Open'}]
//        }
//     })
//     if (orderStatus) {

//     }
//   } catch (error) {
//     next (error)
// })
