"use client";

import { useEffect, useState } from "react";
import ShopCard from "./ShopCard";

export default function ShopGrid({ products }) {
  const [shuffled, setShuffled] = useState(products);

  useEffect(() => {
    // shuffle only after hydration
    setShuffled([...products].sort(() => 0.5 - Math.random()));
  }, [products]);

  return (
    <section className="mt-8 w-full overflow-hidden">
      <div className="animate-marquee gap-6 scrollbar-hide">
        {/* First set of products */}
        {shuffled.map((p) => (
          <div
            key={`first-${p.id}`}
            className="min-w-[250px] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300"
          >
            <ShopCard
              title={p.name}
              description={p.short_description}
              image={p.images[0]}
              href={`/product/${p.category}/${p.sub_category}/${p.id}`}
            />
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {shuffled.map((p) => (
          <div
            key={`second-${p.id}`}
            className="min-w-[250px] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300"
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
    </section>
  );
}
