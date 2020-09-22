const User = require('./user')
const Address = require('./address')
const Billing = require('./billing')
const Product = require('./product')
const Order = require('./order')
const OrderDetail = require('./orderDetail')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// associations

// User-Address: many-to-many
User.belongsToMany(Address, {through: 'user_address', as: 'address'})
Address.belongsToMany(User, {through: 'user_address', as: 'user'})

// User-Billing: many-to-many
User.belongsToMany(Billing, {through: 'user_billing', as: 'billing'})
Billing.belongsToMany(User, {through: 'user_billing', as: 'user'})

// Billing-Address: many-to-one
Billing.belongsTo(Address)
Address.hasMany(Billing)

// User-Order: one-to-many
User.hasMany(Order, {as: 'order'})
Order.belongsTo(User, {as: 'user'})

// Order-Product: many-to-many
Order.belongsToMany(Product, {through: 'order_detail', as: 'product'})
Product.belongsToMany(Order, {through: 'order_detail', as: 'order'})

// Order-Billing: one-to-many
Order.belongsTo(Billing)
Billing.hasMany(Order)

// Order-Address: one-to-many
Order.belongsTo(Address)
Address.hasMany(Order)

module.exports = {
  User,
  Address,
  Billing,
  Product,
  Order,
  OrderDetail
}

// To create a One-To-Many relationship, the hasMany and belongsTo associations are used together;
