const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    if (req.body.guest) {
      req.session.guestUser = req.body
      res.sendStatus(200)
    } else {

      const user = await User.findOne({
        where: {email: req.body.email},
        include: ['address', 'billing', 'order']
      })
      if (!user) {
        res.status(401).send('Wrong username and/or password.')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Wrong username and/or password.')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  if (req.user) {
    const foundUser = await User.findByPk(req.user.id, {
      include: ['address', 'billing', 'order']
    })
    res.json(foundUser)
  } else if (req.session.guestUser) {
    res.json(req.session.guestUser)
  }
})

router.use('/google', require('./google'))
