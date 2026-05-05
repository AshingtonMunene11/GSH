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

// API fetchers
async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, { cache: "no-store" });
  return res.json();
}
async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, { cache: "no-store" });
  const products = await res.json();
  return [...new Set(products.map((p) => p.category))];
}
async function fetchFeatured() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, { cache: "no-store" });
  const products = await res.json();
  return products.filter((p) => p.featured === true);
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
        <main className="flex-grow space-y-12 md:space-y-20">
          {/* Hero Section */}
          <HeroSection banners={banners} />

          {/* Featured Products */}
          <section
            id="featured"
            className="flex flex-col items-center justify-center px-4 py-10 md:py-16 bg-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#126936]">
              Featured Products
            </h2>
            <FeaturedProducts count={4} />
          </section>

          {/* Product Showcase Grid */}
          <section className="px-4 md:px-8 py-10 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#126936]">
              Shop by Category
            </h2>
            <ShopGrid />
          </section>

          {/* About Info */}
          <section className="px-4 md:px-8 py-10 md:py-16 bg-gradient-to-b from-[#126936] to-[#0f4d27] text-white">
            <AboutInfo />
          </section>

          {/* About Section */}
          <section className="px-4 md:px-8 py-10 md:py-16 bg-gray-100">
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

// // API fetchers
// async function fetchProducts() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, { cache: "no-store" });
//   return res.json();
// }
// async function fetchCategories() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, { cache: "no-store" });
//   const products = await res.json();
//   return [...new Set(products.map((p) => p.category))];
// }
// async function fetchFeatured() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, { cache: "no-store" });
//   const products = await res.json();
//   return products.filter((p) => p.featured === true);
// }

// export default async function Home() {
//   // Read banners from public/banners
//   const bannersDir = path.join(process.cwd(), "public", "banners");
//   const files = fs.readdirSync(bannersDir);
//   const banners = files.map((file) => `/banners/${file}`);

//   // Prefetch all datasets once
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery({ queryKey: ["products"], queryFn: fetchProducts });
//   await queryClient.prefetchQuery({ queryKey: ["categories"], queryFn: fetchCategories });
//   await queryClient.prefetchQuery({ queryKey: ["featured-products"], queryFn: fetchFeatured });

//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <ReactQueryProvider dehydratedState={dehydratedState}>
//       <div className="flex flex-col min-h-screen bg-gray-100">
//         <AnimatedBalls />
//         <main className="flex-grow">
//           <HeroSection banners={banners} />

//           {/* Featured Products */}
//           <section id="featured" className="flex items-center justify-center min-h-screen">
//             <FeaturedProducts count={4} />
//           </section>

//           {/* Product Showcase Grid */}
//           <section>
//             <ShopGrid />
//           </section>

//           {/* About Info */}
//           <section>
//             <AboutInfo />
//           </section>

//           {/* About Section */}
//           <section>
//             <AboutSection />
//           </section>
//         </main>
//       </div>
//     </ReactQueryProvider>
//   );
// }

// // import { dehydrate, QueryClient } from "@tanstack/react-query";
// // import ReactQueryProvider from "@/components/ReactQueryProvider";
// // import ShopGrid from "@/components/ShopGrid";
// // import FeaturedProducts from "@/components/FeaturedProducts";
// // import HeroSection from "@/components/HeroSection";
// // import AboutInfo from "@/components/AboutInfo";
// // import AboutSection from "@/components/AboutSection";
// // import AnimatedBalls from "@/components/AnimatedBalls";
// // import fs from "fs";
// // import path from "path";

// // async function fetchProducts() {
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: "no-store" });
// //   return res.json();
// // }
// // async function fetchCategories() {
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { cache: "no-store" });
// //   return res.json();
// // }
// // async function fetchFeatured() {
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`, { cache: "no-store" });
// //   return res.json();
// // }

// // export default async function Home() {
// //   // Read banners
// //   const bannersDir = path.join(process.cwd(), "public", "banners");
// //   const files = fs.readdirSync(bannersDir);
// //   const banners = files.map((file) => `/banners/${file}`);

// //   // Prefetch all datasets once
// //   const queryClient = new QueryClient();
// //   await queryClient.prefetchQuery({ queryKey: ["products"], queryFn: fetchProducts });
// //   await queryClient.prefetchQuery({ queryKey: ["categories"], queryFn: fetchCategories });
// //   await queryClient.prefetchQuery({ queryKey: ["featured"], queryFn: fetchFeatured });

// //   const dehydratedState = dehydrate(queryClient);

// //   return (
// //     <ReactQueryProvider dehydratedState={dehydratedState}>
// //       <div className="flex flex-col min-h-screen bg-gray-100">
// //         <AnimatedBalls />
// //         <main className="flex-grow">
// //           <HeroSection banners={banners} />
// //           <section id="about" className="flex items-center justify-center min-h-screen">
// //             <FeaturedProducts />
// //           </section>
// //           <section>
// //             <ShopGrid />
// //           </section>
// //           <section>
// //             <AboutInfo />
// //           </section>
// //           <section>
// //             <AboutSection />
// //           </section>
// //         </main>
// //       </div>
// //     </ReactQueryProvider>
// //   );
// // }
