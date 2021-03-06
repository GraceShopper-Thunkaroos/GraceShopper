const router = require('express').Router()
const {
  Order,
  OrderDetail,
  Product,
  User,
  Address,
  Billing
} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

// GET /api/orders
// returns a list of all order details excluding pending open orders
router.get('/', async (req, res, next) => {
  try {
    if (!req.user || req.user.dataValues.privilege !== 'Admin') {
      const err = new Error(
        'Non-admins do not have privilege to access order details.'
      )
      throw err
    }
    const orderList = await Order.findAll({
      include: ['billing', 'address', 'product']
    })
    res.json(orderList)
  } catch (err) {
    next(err)
  }
})

// GET /api/orders/cart
// sends open cart detail from session in the form [[product, quantity], ...]
router.get('/cart', async (req, res, next) => {
  try {
    // {productId: quantity, ... }
    const cart = req.session.cart
    const cartArray = await Promise.all(
      Object.keys(cart).map(productId => Product.findByPk(productId))
    )
    res.json(cartArray.map(product => ({product, quantity: cart[product.id]})))
  } catch (err) {
    next(err)
  }
})

// GET /api/orders/:id
// sends details of a previously made order
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: ['billing', 'address', 'product', 'user']
    })
    if (order) {
      if (!req.user) {
        const err = new Error('Guest has no privelege to access orders.')
        throw err
      }
      if (
        !(
          req.user.dataValues.privilege === 'Admin' ||
          req.user.id === order.dataValues.userId
        )
      ) {
        const err = new Error('User does not have privelege to access orders.')
        throw err
      }

      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// POST /api/orders/purchase
// convert session cart to a purchased order in the database
router.post('/purchase', async (req, res, next) => {
  try {
    if (!req.user) {
      const err = new Error('Cannot make a purchase as a non-logged in user')
      throw err
    }
    const cart = req.session.cart
    const newOrder = await Order.create({
      instruction: req.body.instruction,
      purchaseDate: new Date()
    })
    await newOrder.setUser(req.user.id)
    await Promise.all(
      Object.keys(req.session.cart).map(productId =>
        OrderDetail.create({
          orderId: newOrder.dataValues.id,
          productId,
          quantity: cart[productId]
        })
      )
    )
    const orderShippingAddress = await Address.findOrCreate({
      where: req.body.shipAddress,
      defaults: req.body.shipAddress
    })
    const orderBillingAddress = await Address.findOrCreate({
      where: req.body.billingAddress,
      defaults: req.body.billingAddress
    })
    const orderBilling = await Billing.findOrCreate({
      where: req.body.billing,
      defaults: req.body.billing
    })
    console.log(
      orderShippingAddress[0].dataValues,
      orderBillingAddress[0].dataValues,
      orderBilling[0].dataValues
    )
    // set address and billing to the order
    await newOrder.setAddress(orderShippingAddress[0])
    await newOrder.setBilling(orderBilling[0])
    // set billing address to billing
    await orderBilling[0].setAddress(orderBillingAddress[0])
    req.session.cart = {}
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// POST /api/orders/:userId
// add quantity to a product on session cart
router.post('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const cart = req.session.cart
    if (cart) {
      if (cart[productId]) {
        cart[productId] += req.body.quantity
      } else {
        cart[productId] = req.body.quantity
      }
    } else {
      req.session.cart = {[productId]: req.body.quantity}
    }
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// PUT /api/orders/edit/:productId
// set quantity to a product on session cart
router.put('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const cart = req.session.cart
    if (cart) {
      cart[productId] = req.body.quantity
    } else {
      req.session.cart = {[productId]: req.body.quantity}
    }
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/orders/:productId
// delete product from a session cart
router.delete('/:productId', async (req, res, next) => {
  try {
    const cart = req.session.cart
    const productId = req.params.productId
    if (cart) {
      delete cart[productId]
    }
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
