"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ShopCard from "./ShopCard";

export default function FeaturedProducts({ products }) {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Filter only featured products
    const featuredOnly = products.filter(p => p.featured === true);

    // Shuffle once per refresh
    const shuffled = [...featuredOnly].sort(() => 0.5 - Math.random());
    setFeatured(shuffled);
  }, [products]);

  return (
    <section className="mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

      {/* Horizontal strip */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {featured.map((p) => (
          <div
            key={p.id}
            className="min-w-[300px] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300 snap-center"
          >
            <ShopCard
              title={p.name}
              description={p.short_description}
              image={p.images[0]}
              href={`/product/${p.category}/${p.sub_category}/${p.id}`}
            />
          </div>
        ))}
      </div>

      {/* View More button */}
      <div className="flex justify-center mt-6">
        <Link href="/featured">
          <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition">
            View More Featured
          </button>
        </Link>
      </div>
    </section>
  );
}
