"use client";

import { useState } from "react";
import ShopCard from "./ShopCard";

export default function ShopGrid({ products }) {
  // Shuffle products randomly
  const shuffled = [...products].sort(() => 0.5 - Math.random());

  // Show only first 6 initially
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6); // load 6 more each click
  };

  return (
    <section className="mt-8 w-full">
      {/* Responsive grid: full width, adjusts by screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {shuffled.slice(0, visibleCount).map((p) => (
          <div key={p.id} className="shadow-lg rounded-lg overflow-hidden">
            <ShopCard
              title={p.name}
              description={p.short_description}
              image={p.images[0]}
              href={`/product/${p.category}/${p.sub_category}/${p.id}`}
            />
          </div>
        ))}
      </div>

      {/* Show More button */}
      {visibleCount < shuffled.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            View More Products
          </button>
        </div>
      )}
    </section>
  );
}
