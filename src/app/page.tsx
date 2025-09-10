import Link from "next/link";


export default function Home() {


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Shop the latest collection of premium electronics and accessories</p>
          <Link href="/products" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full text-lg transition duration-300 inline-block">
            Shop Now
          </Link>
        </div>
      </section>

    </div>
  );
}
