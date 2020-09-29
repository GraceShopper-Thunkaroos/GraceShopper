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
    console.log(req.user)
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
    console.log('SESSION CART IN GET CART', cart)
    const cartArray = await Promise.all(
      Object.keys(cart).map(productId => Product.findByPk(productId))
    )
    console.log(cartArray)
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
      include: ['billing', 'address', 'product']
    })
    console.log('this is the order', order)
    if (order) {
      console.log('i am returning the json')

      if (!req.user) {
        const err = new Error('Guest has no privelege to access orders.')
        throw err
      }

      if (
        !(
          req.user.dataValues.privilege === 'Admin' ||
          req.user.id === order.dataValues.id
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
    const orderShippingAddress = await Address.create(req.body.shipAddress)
    const orderBillingAddress = await Address.create(req.body.billingAddress)
    const orderBilling = await Billing.create(req.body.billing)
    await newOrder.setAddress(orderShippingAddress)
    await newOrder.setBilling(orderBilling)
    await orderBilling.setAddress(orderBillingAddress)
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
    console.log('POST REQUEST TO ADD CART ITEM, productid:', productId, cart)
    if (cart) {
      console.log('cart', cart)
      if (cart[productId]) {
        cart[productId] += req.body.quantity
      } else {
        console.log('setting cart productid to quantity')
        cart[productId] = req.body.quantity
        console.log('right after setting', cart)
      }
    } else {
      req.session.cart = {[productId]: req.body.quantity}
      console.log(req.session.cart)
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
