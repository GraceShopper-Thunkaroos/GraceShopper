const {green, red} = require('chalk')
const db = require('../db')
const {
  User,
  Address,
  Billing,
  Product,
  Order,
  OrderDetail
} = require('./models')
const randomName = require('./name')
const axios = require('axios')

const users = [
  {
    firstName: 'Asim',
    lastName: 'Samuel',
    email: 'asim@email.com',
    phoneNumber: '123-456-7890',
    password: '12345',
    privilege: 'Buyer'
  },
  {
    firstName: 'Samuel',
    lastName: 'Asim',
    email: 'samuel@email.com',
    phoneNumber: '123-456-7890',
    password: '12345',
    privilege: 'Buyer'
  },
  {
    firstName: 'Ed',
    lastName: 'Helms',
    email: 'eddie@email.com',
    phoneNumber: '123-456-7890',
    password: 'popcorn',
    privilege: 'Buyer'
  }
]

const addresses = [
  {
    street1: '12345 Asim Street',
    street2: 'Apt 102',
    city: 'Brooklyn',
    state: 'New York',
    country: 'USA',
    zipcode: '11234'
  }
]

const billings = [
  {
    cardNumber: '123123123123',
    securityCode: '123',
    name: 'Asim Samuel',
    expirationDate: '09/01/2021'
  }
]

const products = []
const seed = async () => {
  try {
    // sync database
    await db.sync({force: true})

    // seed users
    const userList = await Promise.all(users.map(user => User.create(user)))
    // seed address
    const addressList = await Promise.all(
      addresses.map(address => Address.create(address))
    )
    // seed billing
    const billingList = await Promise.all(
      billings.map(billing => Billing.create(billing))
    )

    // axios request for dog images
    const {data: {message: dogs}} = await axios.get(
      'https://dog.ceo/api/breed/eskimo/images'
    )
    // create and seed products (dogs)
    for (let i = 0; i < 100; i++) {
      products.push({
        name: randomName(),
        breed: 'Eskimo',
        description: 'A fiercely loyal companion.',
        quantity: 1,
        price: 300,
        picture: dogs[i]
      })
    }
    const productList = await Promise.all(
      products.map(product => Product.create(product))
    )

    // create and seed orders
    const order = await Order.create({
      instruction: 'Please ring the doorbell when you are in front.',
      purchaseDate: '09/22/2020',
      expectedDeliveryDate: '09/30/2020',
      totalPrice: 1500
    })
    const closedOrder = await Order.create({
      status: 'Delivered',
      instruction: 'Please ring the doorbell when you are in front.',
      purchaseDate: '09/20/2020',
      expectedDeliveryDate: '09/22/2020',
      totalPrice: 1500
    })
    // link orders, addresses, and billings
    await closedOrder.setAddress(addressList[0])
    await closedOrder.setBilling(billingList[0])
    await userList[0].addOrder(order)
    await userList[1].addOrder(closedOrder)
    await Promise.all(
      productList.slice(5).map(product =>
        OrderDetail.create({
          orderId: 1,
          productId: product.id,
          quantity: 5
        })
      )
    )
    await Promise.all(
      productList.slice(0, 5).map(product =>
        OrderDetail.create({
          orderId: 2,
          productId: product.id,
          quantity: 2
        })
      )
    )

    // Associating users with address and billing
    await userList[0].addAddress(addressList[0])
    await userList[1].addAddress(addressList[0])
    await userList[0].addBilling(billingList[0])
    await userList[1].addBilling(billingList[0])
    await billingList[0].setAddress(addressList[0])
  } catch (error) {
    console.error(error)
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
