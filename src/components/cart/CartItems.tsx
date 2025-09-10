"use client";
import { useSelector, useDispatch } from "react-redux";
import { showCartItems, removeFromCart, updateQuantity } from "@/lib/store/cart";
import Image from "next/image";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CartItems() {
    const dispatch = useDispatch();
    const cartItems = useSelector(showCartItems);

    const handleRemoveItem = (productId: number) => {
        dispatch(removeFromCart(productId));
        toast.error("Product removed from cart")
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    };

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
                                        src={item.image || '/placeholder.webp'}
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