import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import { ProductCard } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";

export default function Card({ product }: { product: ProductCard }) {
    const renderRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }
        return stars;
    };

    return (
        <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 w-full bg-gray-100">
                <Link href={`/products/${product?.id}`}>
                    <Image
                        src={product?.image || "/placeholder-product.png"}
                        alt={product?.title || "Product image"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <FaHeart className="text-gray-400 hover:text-red-500" />
                </button>
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <Link href={`/products/${product?.id}`} className="hover:underline">
                        <h3 className="font-medium text-gray-900 line-clamp-1">
                            {product?.title}
                        </h3>
                    </Link>
                    <span className="text-sm font-medium text-indigo-600">
                        ${product?.price?.toFixed(2)}
                    </span>
                </div>
                
                <div className="flex items-center mb-2">
                    <div className="flex">
                        {product?.rating?.rate ? renderRating(product.rating.rate) : null}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                        ({product?.rating?.count || 0})
                    </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">
                    {product?.description}
                </p>
                
                <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                        {product?.category}
                    </span>
                    <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                        <FaShoppingCart />
                    </button>
                </div>
            </div>
        </div>
    );
}