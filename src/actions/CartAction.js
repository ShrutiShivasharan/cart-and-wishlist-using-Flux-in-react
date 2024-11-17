import AppDispatcher from '../dispatcher/AppDispatcher'

//functions
export const addToCart = (product) => {
    AppDispatcher.dispatch({
        actionType: 'ADD_TO_CART',
        product
    });
}

export const removeFromCart = (productId) => {
    AppDispatcher.dispatch({
        actionType: 'REMOVE_FROM_CART',
        productId
    })
}

export const clearCart = () => {
    AppDispatcher.dispatch({
        actionType: 'CLEAR_CART'
    })
}

export const incrementQuantity = (productId) => {
    AppDispatcher.dispatch({
        actionType: 'INCREMENT_QUANTITY',
        productId
    })
}

export const decrementQuantity = (productId) => {
    AppDispatcher.dispatch({
        actionType: 'DECREMENT_QUANTITY',
        productId
    })
}

export const applyCoupon = (couponCode) => {
    AppDispatcher.dispatch({
        actionType:'APPLY_COUPON',
        couponCode
    })
}