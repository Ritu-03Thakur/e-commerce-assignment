"use client";

import { useSelector } from "react-redux";
import { showTotalAmount, showTotalQuantity } from "@/lib/store/cart";
import Button from "../common/Button";

export default function OrderSummary() {
    const totalAmount = useSelector(showTotalAmount);
    const totalQuantity = useSelector(showTotalQuantity); 
    const shippingFee = totalAmount > 0 ? 5.99 : 0;
    const estimatedTax = totalAmount * 0.1; 
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
            
            <div className="flex flex-col space-y-4">
                <Button 
                    href="/checkout"
                    text="Proceed to Checkout"
                    disabled={totalQuantity === 0}
                    variant="primary"
                />
                <Button
                    href="/"
                    text="Continue Shopping"
                    disabled={totalQuantity === 0}
                    variant="secondary"
                   
                />
            </div>
        </div>
    );
}