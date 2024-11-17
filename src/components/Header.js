'use client'
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Link } from 'react-router-dom'
import cartStore from '../stores/CartStore'

const navigation = [
    { name: 'Product', href: '/' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [cartLength, setCartLength] = useState(cartStore.getCart().length);

    useEffect(()=> {
        const updateCartLength = () => setCartLength(cartStore.getCart().length);
        cartStore.on('change', updateCartLength);
        return () => cartStore.off('change', updateCartLength);
    },[]);

    return (
        <>
            <div className="bg-white">
                <header className="absolute inset-x-0 top-0 z-50 bg-gray-200">
                    {/* Desktop View */}
                    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                        <div className="flex lg:flex-1">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <h1>ShopNow</h1>
                            </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Open main menu</span>
                                <i class="fa-solid fa-bars"></i>
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            {navigation.map((item) => (
                                <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-gray-900">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Link to="/cart" className="text-sm/6 font-semibold text-gray-900">
                                Cart <span aria-hidden="true">&rarr;</span> <span>{cartLength}</span>
                            </Link>
                        </div>
                    </nav>
                    {/* Mobile view */}
                    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden bg-gray-200">
                        <div className="fixed inset-0 z-50" />
                        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-200 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <Link to="/" className="-m-1.5 p-1.5">
                                    <h1>ShopNow</h1>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <Link
                                            to="/"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Cart <span aria-hidden="true">&rarr;</span> <span>{cartLength}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </Dialog>
                </header>
            </div>
        </>
    )
}
