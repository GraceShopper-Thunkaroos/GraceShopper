export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCT = 'GET_PRODUCT'
export const GET_ADDITIONAL_PRODUCTS = 'GET_ADDITIONAL_PRODUCTS'
export const SET_PRODUCT = 'SET_PRODUCT'

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

export const getAdditionalProducts = sideProducts => {
  return {
    type: GET_ADDITIONAL_PRODUCTS,
    sideProducts
  }
}

export const setProduct = product => {
  return {
    type: SET_PRODUCT,
    product
  }
}
