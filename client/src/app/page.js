import fs from "fs";
import path from "path";
import HeroSection from "@/components/HeroSection";
import ShopGrid from "@/components/ShopGrid";
import ProductList from "@/components/ProductList";
import AboutSection from "@/components/AboutSection";
import AnimatedBalls from "@/components/AnimatedBalls";

export default async function Home() {
  // Read banners
  const bannersDir = path.join(process.cwd(), "public", "banners");
  const files = fs.readdirSync(bannersDir);
  const banners = files.map((file) => `/banners/${file}`);

  // Fetch products from API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: "no-store" });
  const products = await res.json();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AnimatedBalls />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection banners={banners} />

        {/* Product Showcase Grid */}
        <ShopGrid products={products} />

        {/* Featured Products List */}
        <section className="mt-10 px-4">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <ProductList category={null} />
        </section>

        {/* About Section */}
        <section id="about" className="flex items-center justify-center min-h-screen">
          <AboutSection />
        </section>
      </main>
    </div>
  );
}
