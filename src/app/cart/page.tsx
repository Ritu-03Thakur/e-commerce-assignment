"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { showCartItems } from '@/lib/store/cart';


const CartItems = dynamic(() => import('@/components/cart/CartItems'));
const OrderSummary = dynamic(() => import('@/components/cart/OrderSummary'));
const EmptyCart = dynamic(() => import('@/components/cart/EmptyCart'));


export default function CartPage() {
    const cartItems = useSelector(showCartItems);
    const hasItems = cartItems && cartItems.length > 0;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {hasItems ? (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                        <div className="lg:col-span-7 xl:col-span-8">
                            <CartItems />
                        </div>
                        
                        <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
                            <OrderSummary />
                        </div>
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </div>
            
        </div>
    );
}