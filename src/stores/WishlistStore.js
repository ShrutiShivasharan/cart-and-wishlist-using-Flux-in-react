import  AppDispatcher  from "../dispatcher/AppDispatcher";
import { EventEmitter } from 'events'

let wishlistItems = [];

class WishlistStore extends EventEmitter{
    getWishlist(){
        return wishlistItems;
    }

    addToWishlist(product){
        const existingProduct = wishlistItems.find((items)=> items.id === product.id);
        if(!existingProduct){
            wishlistItems.push(product);
            this.emit('change');
        }
    }

    removeFromWishlist(productId){
        wishlistItems = wishlistItems.filter((items)=> items.id !== productId);
        this.emit('change');
    }


    handleActions(actions){
        switch(actions.actionType){
            case 'ADD_TO_WISHLIST':
                this.addToWishlist(actions.product);
                break;

            case 'REMOVE_FROM_WISHLIST':
                this.removeFromWishlist(actions.productId);
                break;

            default : break;
        }
    }
}

const wishlistStore = new WishlistStore();
AppDispatcher.register(wishlistStore.handleActions.bind(wishlistStore));
export default wishlistStore;