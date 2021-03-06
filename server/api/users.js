const router = require('express').Router()
const {User, Address, Billing} = require('../db/models')
module.exports = router

// middleware to prevent guests from accessing user routes
router.use((req, res, next) => {
  try {
    if (!req.user) {
      const err = new Error(
        'Guests do not have privilege to access user details.'
      )
      throw err
    }
    next()
  } catch (error) {
    next(error)
  }
})

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const userList = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
      include: ['address', 'billing', 'order']
    })
    if (req.user.dataValues.privilege !== 'Admin') {
      const error = new Error(
        'User does not have privilege to access user details.'
      )
      throw error
    }
    res.json(userList)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
      include: ['address', 'billing', 'order']
    })
    if (user) {
      if (
        !(
          req.user.dataValues.id === user.dataValues.id ||
          req.user.dataValues.privilege === 'Admin'
        )
      ) {
        const error = new Error(
          'User does not have privilege to access user details.'
        )
        throw error
      }
      res.json(user)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// POST /api/users/address
router.post('/address', async (req, res, next) => {
  try {
    console.log('inside api/users/address', req.body)
    await Address.update(req.body, {where: {id: req.body.id}})
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
  }
})

// POST /api/users/billing
router.post('/billing', async (req, res, next) => {
  try {
    console.log('inside api/users/billing', req.body)
    await Billing.update(req.body, {where: {id: req.body.id}})
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
  }
})
