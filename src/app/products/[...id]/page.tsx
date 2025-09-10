"use client"
import React from "react";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/fetchData";
import { ProductCard } from "@/types/Product";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/store/cart";
import Image from "next/image";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import NotFound from "@/app/not-found";
import { HiHeart } from "react-icons/hi";
import Button from "@/components/common/Button";


export default function ProductDetails() {
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {id} = useParams() ; 
  console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  const productId = Array.isArray(id) ? id[0] : id || '';
  const currentProduct = productId 
    ? products.find((product: ProductCard) => product.id === Number(productId))
    : undefined;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!currentProduct) {
    return (<NotFound />);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/products" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2 lg:w-1/3 bg-gray-100 p-8 flex items-center justify-center">
              <div className="relative w-full h-80 md:h-96">
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            <div className="p-8 md:w-1/2 lg:w-2/3">
              <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                {currentProduct.category}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                {currentProduct.title}
              </h1>
              
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(currentProduct.rating?.rate || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">
                    {currentProduct.rating?.rate} ({currentProduct.rating?.count} reviews)
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${currentProduct.price.toFixed(2)}
                </span>
                <p className="mt-4 text-gray-600">
                  {currentProduct.description}
                </p>
              </div>

              <div className="mt-8 flex flex-col  sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    if (currentProduct) {
                      dispatch(addToCart({ ...currentProduct, quantity: 1 }));
                      toast.success(currentProduct.title + " added to cart");
                    }
                  }}
                  text="Add to Cart"
                  variant="primary"
                />
                <Button
                  href="/cart"
                  text="Buy Now"
                  variant="primary"
                  
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <HiHeart className="text-2xl text-red-600"/>
                <span className="text-gray-600">Wishlist</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}