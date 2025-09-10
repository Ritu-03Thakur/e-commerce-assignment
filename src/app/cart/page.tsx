"use client";

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { showCartItems } from '@/lib/store/cart';
import { FaArrowLeft } from 'react-icons/fa';


const CartItems = dynamic(() => import('@/components/cart/CartItems'));
const OrderSummary = dynamic(() => import('@/components/cart/OrderSummary'));

export default function CartPage() {
    const router = useRouter();
    const cartItems = useSelector(showCartItems);
    const hasItems = cartItems && cartItems.length > 0;

    // Add a smooth scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center">
                        <button
                            onClick={() => router.back()}
                            className="mr-4 p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Go back"
                        >
                            <FaArrowLeft className="h-5 w-5 text-gray-600" />
                        </button>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Your Shopping Cart
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {hasItems ? (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                        <div className="lg:col-span-7 xl:col-span-8">
                            <CartItems />
                            
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => router.push('/products')}
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                            
                            <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:hidden">
                                <OrderSummary />
                            </div>
                        </div>
                        
                        <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
                            <OrderSummary />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                        <p className="mt-1 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                        <div className="mt-6">
                            <button
                                onClick={() => router.push('/products')}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
}