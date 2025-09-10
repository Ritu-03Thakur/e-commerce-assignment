import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
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
                        src={product?.image || "/placeholder.webp"}
                        alt={product?.title || "Product image"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <Link href={`/products/${product?.id}`} className="hover:underline">
                        <h3 className="font-medium text-gray-900 line-clamp-1">
                            {product?.title}
                        </h3>
                    </Link>
                </div>
                <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                    {product?.category}
                </span>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">
                    {product?.description}
                </p>
                <div className="flex items-center mb-2">
                    <div className="flex">
                        {product?.rating?.rate ? renderRating(product.rating.rate) : null}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                        ({product?.rating?.count || 0})
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 text-indigo-800">
                        ${product?.price?.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}