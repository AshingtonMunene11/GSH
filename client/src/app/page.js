import { dehydrate, QueryClient } from "@tanstack/react-query";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import ShopGrid from "@/components/ShopGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import AboutInfo from "@/components/AboutInfo";
import AboutSection from "@/components/AboutSection";
import AnimatedBalls from "@/components/AnimatedBalls";
import fs from "fs";
import path from "path";

// Fetch functions
async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: "no-store" });
  return res.json();
}
async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { cache: "no-store" });
  return res.json();
}
async function fetchFeatured() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`, { cache: "no-store" });
  return res.json();
}

export default async function Home() {
  // Read banners from public/banners
  const bannersDir = path.join(process.cwd(), "public", "banners");
  const files = fs.readdirSync(bannersDir);
  const banners = files.map((file) => `/banners/${file}`);

  // Prefetch all datasets once
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["products"], queryFn: fetchProducts });
  await queryClient.prefetchQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  await queryClient.prefetchQuery({ queryKey: ["featured-products"], queryFn: fetchFeatured });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryProvider dehydratedState={dehydratedState}>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <AnimatedBalls />
        <main className="flex-grow">
          <HeroSection banners={banners} />

          {/* Featured Products */}
          <section id="featured" className="flex items-center justify-center min-h-screen">
            <FeaturedProducts count={4} />
          </section>

          {/* Product Showcase Grid */}
          <section>
            <ShopGrid />
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
    </ReactQueryProvider>
  );
}

// import { dehydrate, QueryClient } from "@tanstack/react-query";
// import ReactQueryProvider from "@/components/ReactQueryProvider";
// import ShopGrid from "@/components/ShopGrid";
// import FeaturedProducts from "@/components/FeaturedProducts";
// import HeroSection from "@/components/HeroSection";
// import AboutInfo from "@/components/AboutInfo";
// import AboutSection from "@/components/AboutSection";
// import AnimatedBalls from "@/components/AnimatedBalls";
// import fs from "fs";
// import path from "path";

// async function fetchProducts() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: "no-store" });
//   return res.json();
// }
// async function fetchCategories() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { cache: "no-store" });
//   return res.json();
// }
// async function fetchFeatured() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`, { cache: "no-store" });
//   return res.json();
// }

// export default async function Home() {
//   // Read banners
//   const bannersDir = path.join(process.cwd(), "public", "banners");
//   const files = fs.readdirSync(bannersDir);
//   const banners = files.map((file) => `/banners/${file}`);

//   // Prefetch all datasets once
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery({ queryKey: ["products"], queryFn: fetchProducts });
//   await queryClient.prefetchQuery({ queryKey: ["categories"], queryFn: fetchCategories });
//   await queryClient.prefetchQuery({ queryKey: ["featured"], queryFn: fetchFeatured });

//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <ReactQueryProvider dehydratedState={dehydratedState}>
//       <div className="flex flex-col min-h-screen bg-gray-100">
//         <AnimatedBalls />
//         <main className="flex-grow">
//           <HeroSection banners={banners} />
//           <section id="about" className="flex items-center justify-center min-h-screen">
//             <FeaturedProducts />
//           </section>
//           <section>
//             <ShopGrid />
//           </section>
//           <section>
//             <AboutInfo />
//           </section>
//           <section>
//             <AboutSection />
//           </section>
//         </main>
//       </div>
//     </ReactQueryProvider>
//   );
// }
