"use client"

import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import { useSelector } from "react-redux";
import { showCartItems } from "@/lib/store/cart";

export default function Navbar() {
    const TotalCart = useSelector(showCartItems)
    
    
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">ShopEase</span>
                        </Link>
                    </div>
                    <div className="flex items-center justify-end flex-1 lg:w-0">
                        <Link href="/cart" className="ml-6 p-1 text-gray-400 hover:text-gray-500">
                            <div className="relative">
                                <TiShoppingCart className="h-8 w-8 text-gray-600" />
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {TotalCart.length}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}