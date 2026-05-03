import fs from "fs";
import path from "path";
import ShopGrid from "@/components/ShopGrid";
import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";
import AboutInfo from "@/components/AboutInfo"; 
import AboutSection from "@/components/AboutSection";
import AnimatedBalls from "@/components/AnimatedBalls";
import FeaturedProducts from "@/components/FeaturedProducts";

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

        {/* Featured Products */}
        <section id="about" className="flex items-center justify-center min-h-screen">
          {/* <FeaturedProducts products={products} /> */}
          <FeaturedProducts products={products} count={4} />
        </section> 

        {/* Product Showcase Grid */}
        <section>
          <ShopGrid products={products} />
        </section>

        {/* About Info */}
        <section>
          <AboutInfo />
        </section> 
 
        {/* About Section */}
        <section>
          <AboutSection />
        </section>  

      </main>
    </div>
  );
}
