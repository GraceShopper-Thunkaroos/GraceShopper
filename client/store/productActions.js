export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCT = 'GET_PRODUCT'

export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}
