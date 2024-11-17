import React, { useState, useEffect } from "react"
import productApiData from '../api'

import cartStore from '../stores/CartStore'
import {addToCart} from '../actions/CartAction'
import { addToWishlist } from '../actions/WishlistAction'

export default function ProductComponent() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(cartStore.getCart());

    useEffect(() => {
        setProducts(productApiData)
    }, []);

    useEffect(()=>{
        cartStore.on('change', () => {
           setCart(cartStore.getCart()); 
        })
    },[cart]);

    //addToCart function
    const handleAddToCart = (product) => {
        addToCart(product);
    }

    //addToWishlist Functiom
    const handleAddToWishlist = (product) => {
        addToWishlist(product);
    }


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative bg-gray-200 p-2">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    alt="pic"
                                    src={product.thumbnail}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-black">
                                        {product.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                </div>
                                <h3 className="font-medium text-balck"><i class="fa-solid fa-rupee-sign"></i>. {product.price}</h3>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button onClick={() => handleAddToCart(product)} className="text-white bg-blue-500 p-1 rounded ">Add To Cart</button>
                                <button onClick={() => handleAddToWishlist(product)} className="text-white bg-pink-500 p-1 rounded ">Add To Wishlist</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
