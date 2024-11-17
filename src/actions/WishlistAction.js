import  AppDispatcher from "../dispatcher/AppDispatcher";

//functions
export const addToWishlist = (product) => {
    AppDispatcher.dispatch({
        actionType : 'ADD_TO_WISHLIST',
        product
    })
}

export const removeFromWishlist = (productId) => {
    AppDispatcher.dispatch({
        actionType:'REMOVE_FROM_WISHLIST',
        productId
    })
}