const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const productList = await Product.findAll()
    res.json(productList)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
