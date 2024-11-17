import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events'

let cartItems = [];
let appliedCoupon = null;

class CartStore extends EventEmitter {
    //functions
    getCart() {
        return cartItems;
    }

    getDiscount() {
        return appliedCoupon ? appliedCoupon.discount : 0;
    }

    addToCart(product) {
        const existingProduct = cartItems.find((items) => items.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }
        this.emit('change');
    }

    removeFromCart(productId) {
        cartItems = cartItems.filter(items => items.id !== productId);
        this.emit('change');
    }

    clearCart() {
        cartItems = [];
        this.emit('change');
    }

    incrementQuantity(productId) {
        const product = cartItems.find((items) => items.id === productId);
        if (product) {
            product.quantity += 1;
            this.emit('change');
        }
    }

    decrementQuantity(productId) {
        const product = cartItems.find((items) => items.id === productId);
        if (product && product.quantity > 1) {
            product.quantity -= 1;
            this.emit('change');
        }
    }

    applyCoupon(couponCode) {
        if (couponCode === '100Off') {
            appliedCoupon = { code: couponCode, discount: 100 }
        }else if(couponCode === '200Off') {
            appliedCoupon = { code: couponCode, discount: 200 }
        }else {
            appliedCoupon = null;
            alert("Invalid Coupon Code! Enter 100Off");
        }
        this.emit('change');
    }


    //actions handle
    handleActions(actions) {
        switch (actions.actionType) {
            case 'ADD_TO_CART':
                this.addToCart(actions.product);
                break;

            case 'REMOVE_FROM_CART':
                this.removeFromCart(actions.productId);
                break;

            case 'CLEAR_CART':
                this.clearCart();
                break

            case 'INCREMENT_QUANTITY':
                this.incrementQuantity(actions.productId);
                break;

            case 'DECREMENT_QUANTITY':
                this.decrementQuantity(actions.productId);
                break;

            case 'APPLY_COUPON':
                this.applyCoupon(actions.couponCode);
                break;

            default:
                console.log('unknown action type:', actions.actionType);
        }
    }
}

const cartStore = new CartStore();
AppDispatcher.register(cartStore.handleActions.bind(cartStore));
export default cartStore;