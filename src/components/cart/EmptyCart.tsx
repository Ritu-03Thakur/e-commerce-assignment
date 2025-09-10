import Link from "next/link";

export default function EmptyCart() {
    return (
        <div className="text-center py-12">
            <h1 className="text-2xl font-semibold mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Start adding items to your cart to get started.</p>
            <Link 
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
                Continue Shopping
            </Link>
        </div>
    );
}