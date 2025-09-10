"use client";
import Card from "@/components/common/Card";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/fetchData";
import { ProductCard } from "@/types/Product";
import NotFound from "../not-found";
import { IoFilter } from "react-icons/io5";

export default function Products() {
    const [products, setProducts] = useState<ProductCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []);

   const [sortBy, setSortBy] = useState<string>('price-low');
   
   const filteredProducts = React.useMemo(() => {
     const productsToSort = [...products];
     switch (sortBy) {
      case "price-low":
        return productsToSort.sort((a, b) => a.price - b.price);
      case "price-high":
        return productsToSort.sort((a, b) => b.price - a.price);
      case "highly-rated":
        return productsToSort.sort((a, b) => b.rating.rate - a.rating.rate);
      case "atoz":
        return productsToSort.sort((a, b) => a.title.localeCompare(b.title));
      case "ztoa":
        return productsToSort.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return productsToSort;
     }
   }, [products, sortBy]);


    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                                    <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (<NotFound/>);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <select
                                className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="highly-rated">Highly Rated</option>
                                <option value="atoz">Name A to Z</option>
                                <option value="ztoa">Name Z to A</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <IoFilter />
                            </div>
                        </div>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                        <p className="mt-1 text-sm text-gray-500">We couldn&apos;t find any products matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product: ProductCard) => (
                            <Card key={product?.id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}