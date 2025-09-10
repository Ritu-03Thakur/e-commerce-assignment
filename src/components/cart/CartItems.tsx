"use client";
import { useSelector, useDispatch } from "react-redux";
import { showCartItems, removeFromCart, updateQuantity } from "@/lib/store/cart";
import Image from "next/image";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

export default function CartItems() {
    const dispatch = useDispatch();
    const cartItems = useSelector(showCartItems);

    const handleRemoveItem = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    };
    
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-1 text-gray-500">Looks like you haven&apos;t added anything to your cart yet.</p>
                <div className="mt-6">
                    <a
                        href="/products"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Continue Shopping
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-8">
                    Shopping Cart ({cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} items)
                </h1>

                <div className="border-t border-gray-200 py-6">
                    <div className="hidden md:grid grid-cols-12 gap-4 mb-4 px-2">
                        <div className="col-span-6">
                            <span className="text-sm font-medium text-gray-500">PRODUCT</span>
                        </div>
                        <div className="col-span-2 text-center">
                            <span className="text-sm font-medium text-gray-500">PRICE</span>
                        </div>
                        <div className="col-span-2 text-center">
                            <span className="text-sm font-medium text-gray-500">QUANTITY</span>
                        </div>
                        <div className="col-span-2 text-right">
                            <span className="text-sm font-medium text-gray-500">TOTAL</span>
                        </div>
                    </div>

                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 gap-4 py-6 border-b border-gray-200">
                            <div className="col-span-6 flex">
                                <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden">
                                    <Image
                                        src={item.image || '/placeholder-product.png'}
                                        alt={item.title}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                    </div>
                                    <div className="flex-1 flex items-end">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                                        >
                                            <FaTrash className="mr-1" size={12} />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 flex items-center justify-center">
                                <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                            </div>

                            <div className="col-span-2 flex items-center justify-center">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                        <FaMinus size={12} />
                                    </button>
                                    <span className="w-8 text-center text-gray-800">
                                        {item.quantity || 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                        <FaPlus size={12} />
                                    </button>
                                </div>
                            </div>

                            <div className="col-span-2 flex items-center justify-end">
                                <p className="text-sm font-medium text-gray-900">
                                    ${((item.price) * (item.quantity || 1)).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}