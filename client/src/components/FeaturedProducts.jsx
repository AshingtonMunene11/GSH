"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeaturedProducts({ products, count = 4 }) {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const featuredOnly = products.filter((p) => p.featured === true);
    const shuffled = [...featuredOnly].sort(() => 0.5 - Math.random());
    setFeatured(shuffled.slice(0, count));
  }, [products, count]);

  return (
    <section className="mt-10 px-4">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-700">
          Featured Products
        </h2>
        <Link href="/featured">
          <button
            className="px-5 py-2 rounded-full font-semibold text-white 
              bg-gradient-to-r from-[#126936] to-black 
              shadow-lg hover:shadow-xl 
              transition-all duration-300 
              hover:from-[#0f4d28] hover:to-[#f4821f] 
              text-sm sm:text-base"
          >
            View More
          </button>
        </Link>
      </div>

      {/* Product grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${count} gap-6`}
      >
        {featured.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300 flex flex-col"
            style={{ height: "380px" }}
          >
            {/* Image area */}
            <div className="h-48 w-full">
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text + button area */}
            <div className="flex flex-col flex-grow p-4">
              <h3 className="text-lg font-bold mb-2 text-gray-700 line-clamp-1">
                {p.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {p.short_description}
              </p>
              <p className="text-base font-semibold text-gray-900 mb-3">
                ${p.price}
              </p>

              {/* Shop Now button pinned bottom */}
              <div className="mt-auto">
                <Link
                  href={`/product/${p.category}/${p.sub_category}/${p.id}`}
                  className="block text-center bg-[#126936] text-white py-2 rounded-full hover:bg-[#f4821f] hover:text-black transition-colors duration-300 font-semibold"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
