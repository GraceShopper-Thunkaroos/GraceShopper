export const GET_PRODUCTS = 'GET_PRODUCTS'

export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}
