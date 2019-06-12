import axios from 'axios'

// define const action type
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REORDER_PRICE = 'REORDER_PRIORITY'
const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

// define action creator
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}

export const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

export const reorderByPrice = () => {
  return {
    type: REORDER_PRICE
  }
}

// example of filterCriterion: { fuleLevel: 70, fuelType: gas}
export const filterProducts = filterCriterion => {
  return {
    type: FILTER_PRODUCTS,
    filterCriterion
  }
}

//define thunk method
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (error) {
      console.log('Error inside thunk method fetchPoducts: ', error)
    }
  }
}

export const createProduct = product => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/products', product)
      dispatch(addProduct(res.data))
    } catch (error) {
      console.log('Error inside thunk method createProducts: ', error)
    }
  }
}

export const removePorduct = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deleteProduct(id))
    } catch (error) {
      console.log('Error inside thunk method removeProduct: ', error)
    }
  }
}

export const putProduct = product => {
  return async dispatch => {
    try {
      await axios.put(`/api/products/${product.id}`, product)
      const {productWithAssociation} = await axios.get(
        `/api/products/${product.id}`
      )
      dispatch(updateProduct(productWithAssociation))
    } catch (error) {
      console.log('Error inside thunk method putProduct: ', error)
    }
  }
}

export const createProCatAssociation = (productId, categoryId) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `/api/products/association/${productId}/${categoryId}`
      )
      dispatch(updateProduct(res.data))
    } catch (error) {
      console.log('Error inside thunk method createProCatAssociation: ', error)
    }
  }
}

export const removeProCatAssociation = (productId, categoryId) => {
  return async dispatch => {
    try {
      const res = await axios.delete(
        `/api/products/association/${productId}/${categoryId}`
      )
      dispatch(updateProduct(res.data))
    } catch (error) {
      console.log('Error inside thunk method removeProCatAssociation: ', error)
    }
  }
}

export const createProOrderAssociation = (productId, orderId) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `/api/products/association/${productId}/${orderId}`
      )
      dispatch(updateProduct(res.data))
    } catch (error) {
      console.log(
        'Error inside thunk method createProOrderAssociation: ',
        error
      )
    }
  }
}

// define initial state
const initialState = []

// define reducer
const productReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter(elem => elem.id !== action.id)
    case UPDATE_PRODUCT:
      return state.map(elem => {
        if (elem.id === action.product.id) return action.product
        else return elem
      })
    case REORDER_PRICE:
      return (() => {
        let newState = state.slice()
        newState.sort((a, b) => b.price - a.price)
        return newState
      })()
    case FILTER_PRODUCTS:
      return state.filter(elem =>
        Object.keys(action.filterCriterion).every(
          key => elem[key] === action.filterCriterion[key]
        )
      )
    default:
      return state
  }
}

export default productReducer
