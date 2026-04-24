"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function HeroSection({ banners }) {
  const [categories, setCategories] = useState({});
  const [current, setCurrent] = useState(1);
  const [transitioning, setTransitioning] = useState(true);
  const [overlayCategory, setOverlayCategory] = useState(null);

  const extendedBanners = [
    banners[banners.length - 1],
    ...banners,
    banners[0],
  ];

  // Fetch categories + subcategories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");

        const products = await res.json();

        const grouped = {};
        products.forEach(p => {
          if (!grouped[p.category]) grouped[p.category] = new Set();
          grouped[p.category].add(p.sub_category);
        });

        const sorted = {};
        Object.keys(grouped)
          .sort((a, b) => a.localeCompare(b))
          .forEach(cat => {
            sorted[cat] = Array.from(grouped[cat]).sort((a, b) => a.localeCompare(b));
          });

        setCategories(sorted);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Auto‑advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Reset position instantly when reaching clones
  useEffect(() => {
    if (current === extendedBanners.length - 1) {
      setTimeout(() => {
        setTransitioning(false);
        setCurrent(1);
      }, 1000);
    }
    if (current === 0) {
      setTimeout(() => {
        setTransitioning(false);
        setCurrent(extendedBanners.length - 2);
      }, 1000);
    } else {
      setTransitioning(true);
    }
  }, [current, extendedBanners.length]);

  return (
    <section className="flex w-full mt-5 gap-4 px-4 flex-col md:flex-row h-[400px] relative">
      {/* Categories Sidebar */}
      <aside className="md:w-1/4 w-full bg-gradient-to-br from-[#126936] to-[#0f4d28] rounded-lg p-4 flex flex-col h-full relative">
        <h2 className="font-bold text-white flex-shrink-0 pb-2 border-b border-white/40">
          Product Categories
        </h2>
        <div className="flex flex-col gap-2 overflow-y-auto mt-2 custom-scrollbar">
          {Object.keys(categories).length === 0 ? (
            <p className="text-white/70">Loading categories...</p>
          ) : (
            Object.keys(categories).map((cat, i) => (
              <button
                key={i}
                onMouseEnter={() => setOverlayCategory(cat)}
                onMouseLeave={() => setOverlayCategory(null)}
                className="w-full text-left px-3 py-2 rounded text-white hover:bg-[#f4821f] transition-colors cursor-pointer"
              >
                {cat}
              </button>
            ))
          )}
        </div>

        {/* Floating Sub‑Category Panel */}
        {overlayCategory && (
          <div
            className="absolute top-16 left-full ml-2 
                       bg-[#f4821f]/50 backdrop-blur-sm 
                       rounded-lg shadow-lg p-4 
                       w-64 max-h-80 overflow-y-auto z-50"
            onMouseEnter={() => setOverlayCategory(overlayCategory)} // keep open
            onMouseLeave={() => setOverlayCategory(null)} // close when leaving
          >
            <h3 className="text-lg font-bold text-white mb-3">
              {overlayCategory} Subcategories
            </h3>
            <div className="flex flex-col gap-2">
              {categories[overlayCategory].map((sub, j) => (
                <Link
                  key={j}
                  href={`/product/${slugify(overlayCategory)}/${slugify(sub)}`}
                  className="px-3 py-2 rounded text-white hover:bg-white/20 transition-colors"
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Banner Section */}
      <div className="md:w-3/4 w-full relative bg-gray-100 rounded-lg h-full overflow-hidden">
        <div
          className={`flex w-full h-full ${
            transitioning ? "transition-transform duration-1000 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {extendedBanners.map((src, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 h-full relative rounded-lg overflow-hidden"
            >
              <Link href="/products">
                <Image
                  src={src}
                  alt={`Banner ${index}`}
                  fill
                  className="object-cover rounded-lg transform transition-transform duration-500 hover:scale-105"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
