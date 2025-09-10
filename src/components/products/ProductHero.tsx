"use client"
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

export default function ProductHero() {
    const [search, setSearch] = useState("");
    
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">ShopEase</span>
                        </Link>
                    </div>
                    
                    <div className="flex-1 max-w-xl px-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end flex-1 lg:w-0">
                        <Link href="/cart" className="ml-6 p-1 text-gray-400 hover:text-gray-500">
                            <div className="relative">
                                <TiShoppingCart className="h-8 w-8 text-gray-600" />
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    0
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}