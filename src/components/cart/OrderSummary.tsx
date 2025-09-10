"use client";

import { useSelector } from "react-redux";
import { showTotalAmount, showTotalQuantity, showCartItems } from "@/lib/store/cart";
import { FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
import Link from "next/link";

export default function OrderSummary() {
    const totalAmount = useSelector(showTotalAmount);
    const totalQuantity = useSelector(showTotalQuantity);
    const cartItems = useSelector(showCartItems);
    
    const shippingFee = totalAmount > 0 ? 5.99 : 0;
    const estimatedTax = totalAmount * 0.1; // 10% tax
    const orderTotal = totalAmount + shippingFee + estimatedTax;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'}</span>
                    <span className="font-medium text-gray-800">${totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-800">
                        {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : 'Free'}
                    </span>
                </div>
                
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium text-gray-800">${estimatedTax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="flex justify-between font-bold text-gray-900">
                        <span>Order Total</span>
                        <span className="text-gray-800">${orderTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <Link 
                    href="/checkout"
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        totalQuantity === 0 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    aria-disabled={totalQuantity === 0}
                >
                    Proceed to Checkout
                </Link>
                
                <p className="text-xs text-center text-gray-500">
                    or{' '}
                    <Link href="/products" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Continue Shopping
                    </Link>
                </p>
                
                <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                        <FaTruck className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">Free delivery</h4>
                            <p className="text-xs text-gray-500">On orders over $50</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <FaUndo className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">Easy returns</h4>
                            <p className="text-xs text-gray-500">30-day return policy</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <FaShieldAlt className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">Secure checkout</h4>
                            <p className="text-xs text-gray-500">Your data is always safe</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}