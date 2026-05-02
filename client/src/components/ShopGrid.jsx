"use client";

import { useEffect, useRef } from "react";
import ShopCard from "./ShopCard";

export default function ShopGrid({ products }) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollInterval = setInterval(() => {
      el.scrollLeft += 1; // slow movement
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0; // loop back
      }
    }, 40);

    // Pause on hover
    el.addEventListener("mouseenter", () => clearInterval(scrollInterval));
    el.addEventListener("mouseleave", () => {
      scrollInterval = setInterval(() => {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }, 40);
    });

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="mt-8 w-full">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 snap-x snap-mandatory scroll-smooth custom-scrollbar"
      >
        {shuffled.map((p) => (
          <div
            key={p.id}
            className="min-w-[250px] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300 snap-center"
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
