// "use client";

// import { useEffect, useState } from "react";
// import ShopCard from "./ShopCard";

// export default function ShopGrid({ products }) {
//   const [shuffled, setShuffled] = useState(products);

//   useEffect(() => {
//     // shuffle only after hydration
//     setShuffled([...products].sort(() => 0.5 - Math.random()));
//   }, [products]);

//   return (
//     <section className="mt-8 mb-16 w-full overflow-hidden">
//       <div className="animate-marquee gap-6 scrollbar-hide">
//         {/* First set of products */}
//         {shuffled.map((p) => (
//           <div
//             key={`first-${p.id}`}
//             className="min-w-[250px] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300"
//           >
//             <ShopCard
//               title={p.name}
//               description={p.short_description}
//               image={p.images[0]}
//               href={`/product/${p.category}/${p.sub_category}/${p.id}`}
//             />
//           </div>
//         ))}

//         {/* Duplicate set for seamless loop */}
//         {/* {shuffled.map((p) => (
//           <div
//             key={`second-${p.id}`}
//             className="min-w-[250px] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300"
//           >
//             <ShopCard
//               title={p.name}
//               description={p.short_description}
//               image={p.images[0]}
//               href={`/product/${p.category}/${p.sub_category}/${p.id}`}
//             />
//           </div>
//         ))} */}
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import ShopCard from "./ShopCard";

export default function ShopGrid({ products }) {
  const [shuffled, setShuffled] = useState(products);

  useEffect(() => {
    // shuffle only on client to avoid hydration mismatch
    setShuffled([...products].sort(() => 0.5 - Math.random()));
  }, [products]);

  return (
    <section className="mt-8 w-full mb-16 overflow-hidden">
         {/* <section className="mt-8 mb-16 w-full overflow-hidden"></section> */}
      <div className="animate-marquee gap-6">
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

// "use client";

// import { useEffect, useRef } from "react";
// import ShopCard from "./ShopCard";

// export default function ShopGrid({ products }) {
//   const shuffled = [...products].sort(() => 0.5 - Math.random());
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     let scrollInterval = setInterval(() => {
//       el.scrollLeft += 1; // slow movement
//       if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
//         el.scrollLeft = 0; // loop back
//       }
//     }, 40);

//     // Pause on hover
//     el.addEventListener("mouseenter", () => clearInterval(scrollInterval));
//     el.addEventListener("mouseleave", () => {
//       scrollInterval = setInterval(() => {
//         el.scrollLeft += 1;
//         if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
//           el.scrollLeft = 0;
//         }
//       }, 40);
//     });

//     return () => clearInterval(scrollInterval);
//   }, []);

//   return (
//     <section className="mt-8 w-full">
//       <div
//         ref={scrollRef}
//         className="flex gap-6 overflow-x-auto px-4 snap-x snap-mandatory scroll-smooth custom-scrollbar"
//       >
//         {shuffled.map((p) => (
//           <div
//             key={p.id}
//             className="min-w-[250px] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300 snap-center"
//           >
//             <ShopCard
//               title={p.name}
//               description={p.short_description}
//               image={p.images[0]}
//               href={`/product/${p.category}/${p.sub_category}/${p.id}`}
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
