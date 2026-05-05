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
  const [overlayTop, setOverlayTop] = useState(0);

  const extendedBanners = [
    banners[banners.length - 1],
    ...banners,
    banners[0],
  ];

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, { cache: "no-store" });
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
    <section className="flex flex-col md:flex-row w-full mt-5 gap-4 px-4 h-auto md:h-[400px] relative">
      
      {/* Categories Sidebar (Desktop) */}
      <aside className="hidden md:flex md:w-1/4 bg-gradient-to-br from-[#126936] to-[#0f4d28] rounded-lg p-4 flex-col h-full relative">
        <h2 className="font-bold text-white pb-2 border-b border-white/40">
          Product Categories
        </h2>
        <div className="flex flex-col gap-2 overflow-y-auto mt-2 custom-scrollbar">
          {Object.keys(categories).map((cat, i) => (
            <div
              key={i}
              className="relative group"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setOverlayCategory(cat);
                setOverlayTop(rect.top + window.scrollY);
              }}
              onMouseLeave={() => setOverlayCategory(null)}
            >
              <Link href={`/product/${slugify(cat)}`}>
                <button className="w-full text-left px-3 py-2 rounded text-white hover:bg-[#f4821f] transition-colors">
                  {cat}
                </button>
              </Link>

              {overlayCategory === cat && (
                <div
                  className="fixed left-[25%] bg-[#f4821f]/40 backdrop-blur-sm rounded-lg shadow-lg p-3 w-64 z-50"
                  style={{ top: overlayTop }}
                  onMouseEnter={() => setOverlayCategory(cat)}
                  onMouseLeave={() => setOverlayCategory(null)}
                >
                  <div className={`flex flex-col gap-2 ${
                    categories[overlayCategory].length > 4 ? "max-h-40 overflow-y-auto custom-scrollbar" : ""
                  }`}>
                    {categories[overlayCategory].map((sub, j) => (
                      <Link
                        key={j}
                        href={`/product/${slugify(cat)}/${slugify(sub)}`}
                        className="px-3 py-2 rounded text-black hover:bg-white/20 transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Categories Accordion (Mobile) */}
      <div className="md:hidden flex flex-col gap-2 bg-gradient-to-br from-[#126936] to-[#0f4d28] rounded-lg p-4">
        <h2 className="font-bold text-white pb-2 border-b border-white/40">
          Product Categories
        </h2>
        {Object.keys(categories).map((cat, i) => (
          <details key={i} className="bg-[#126936]/60 rounded-lg">
            <summary className="px-3 py-2 text-white cursor-pointer">
              {cat}
            </summary>
            <div className="flex flex-col gap-1 px-3 pb-2">
              {categories[cat].map((sub, j) => (
                <Link
                  key={j}
                  href={`/product/${slugify(cat)}/${slugify(sub)}`}
                  className="text-white/80 hover:text-white"
                >
                  {sub}
                </Link>
              ))}
            </div>
          </details>
        ))}
      </div>

      {/* Banner Section */}
      <div className="md:w-3/4 w-full relative bg-gray-100 rounded-lg h-[200px] md:h-full overflow-hidden">
        <div
          className={`flex w-full h-full ${
            transitioning ? "transition-transform duration-1000 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {extendedBanners.map((banner, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 h-full relative rounded-lg overflow-hidden"
            >
              <Link href={`/product/${slugify(banner.category || "team-sports")}`}>
                <Image
                  src={banner.src || banner}
                  alt={`Banner ${index}`}
                  fill
                  className="object-cover rounded-lg transform transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 75vw"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
