"use client";

import { useEffect, useState } from "react";
import ShopCard from "./ShopCard";

export default function ShopGrid({ products }) {
  const [shuffled, setShuffled] = useState(products);
  const [direction, setDirection] = useState("reverse"); // default: left→right

  useEffect(() => {
    setShuffled([...products].sort(() => 0.5 - Math.random()));
  }, [products]);

  return (
    <section className="mt-8 w-full mb-16 overflow-hidden relative">
      {/* Header row */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-bold text-gray-700">Products</h2>
        <div className="flex gap-3">
          {/* Left button */}
          <button
            onClick={() => setDirection("normal")}
            className="w-10 h-10 flex items-center justify-center rounded-full 
              bg-gradient-to-r from-[#126936] to-black 
              shadow-lg hover:shadow-xl hover:scale-110 
              transition-all duration-300 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right button */}
          <button
            onClick={() => setDirection("reverse")}
            className="w-10 h-10 flex items-center justify-center rounded-full 
              bg-gradient-to-r from-[#126936] to-black 
              shadow-lg hover:shadow-xl hover:scale-110 
              transition-all duration-300 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="gap-6 shopgrid-marquee no-scrollbar"
        style={{
          "--marquee-speed": "100s",
          "--marquee-direction": direction,
          "--marquee-play": "running",
        }}
      >
        {shuffled.map((p) => (
          <div key={`first-${p.id}`} className="min-w-[250px] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300">
            <ShopCard
              title={p.name}
              description={p.short_description}
              image={p.images[0]}
              href={`/product/${p.category}/${p.sub_category}/${p.id}`}
            />
          </div>
        ))}
        {shuffled.map((p) => (
          <div key={`second-${p.id}`} className="min-w-[250px] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300">
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

// import { useEffect, useState } from "react";
// import ShopCard from "./ShopCard";

// export default function ShopGrid({ products }) {
//   const [shuffled, setShuffled] = useState(products);

//   useEffect(() => {
//     setShuffled([...products].sort(() => 0.5 - Math.random()));
//   }, [products]);

//   return (
//     <section className="mt-8 w-full mb-16 overflow-hidden">
//          {/* <section className="mt-8 mb-16 w-full overflow-hidden"></section> */}
//       <div className="animate-marquee gap-6">
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
//         {shuffled.map((p) => (
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
//         ))}
//       </div>
//     </section>
//   );
// }
