"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ banners }) {
  const categories = [
    "Team Sports",
    "Fitness & Training",
    "Footwear",
    "Apparel (Clothing)",
    "Accessories",
    "Individual Sports",
    "Combat Sports",
    "Outdoor & Recreation",
    "Fan Merchandise",
    "Sports Equipment (General)",
  ];

  const [current, setCurrent] = useState(1); 
  const [transitioning, setTransitioning] = useState(true);

  const extendedBanners = [
    banners[banners.length - 1],
    ...banners,
    banners[0],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
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
    <section className="flex w-full mt-5 gap-4 px-4 flex-col md:flex-row h-[400px]">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full bg-gradient-to-br from-[#126936] to-[#0f4d28] rounded-lg p-4 flex flex-col h-full">
        <h2 className="font-bold text-white flex-shrink-0 pb-2 border-b border-white/40">
          Product Categories
        </h2>
        <div className="flex flex-col gap-2 overflow-y-auto mt-2 custom-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="w-full text-left px-3 py-2 rounded text-white hover:bg-[#f4821f] transition-colors cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* Banner Section */}
      <div className="md:w-3/4 w-full relative bg-gray-100 rounded-lg h-full overflow-hidden">
        {/* Carousel */}
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
