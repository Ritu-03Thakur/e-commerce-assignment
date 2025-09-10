import Button from "@/components/common/Button";



export default function Home() {


  return (
    <div className="min-h-screen bg-gray-50">  
      <section className="relative bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Shop the latest collection of premium electronics and accessories</p>
          <Button
            href="/products"
            text="Shop Now"
            variant="secondary"
            className="!w-48"
          />
        </div>
      </section>

    </div>
  );
}
