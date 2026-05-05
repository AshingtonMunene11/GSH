"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function CategorySlugPage() {
  const { category, slug } = useParams();
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6">Failed to load products</p>;
  if (!products) return null;

  // First try sub-category
  let filtered = products.filter(
    (p) => slugify(p.category) === category && slugify(p.sub_category) === slug
  );

  let mode = "sub";
  if (filtered.length === 0) {
    // Otherwise treat as product name
    filtered = products.filter(
      (p) => slugify(p.category) === category && slugify(p.name) === slug
    );
    mode = "item";
  }

  if (filtered.length === 0) {
    return <p className="p-6">No products found.</p>;
  }

  return (
    <section className="p-6">
      {mode === "sub" ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{category} / {slug}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="border rounded p-3">
                <h2 className="font-semibold">{p.name}</h2>
                <p className="text-sm text-gray-600">{p.short_description}</p>
                <p className="text-blue-600 font-bold">Ksh {p.offer_price}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{filtered[0].name}</h1>
          <p className="text-gray-700 mb-2">{filtered[0].long_description}</p>
          <p className="text-blue-600 font-bold mb-4">Ksh {filtered[0].offer_price}</p>
          <img src={filtered[0].images[0]} alt={filtered[0].name} className="w-64 rounded" />
        </>
      )}
    </section>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// function slugify(text) {
//   return text.toString().toLowerCase().trim()
//     .replace(/&/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "")
//     .replace(/\-\-+/g, "-");
// }

// export default function CategorySlugPage() {
//   const { category, slug } = useParams();
//   const [products, setProducts] = useState([]);
//   const [mode, setMode] = useState("sub"); // "sub" or "item"

//   useEffect(() => {
//     async function fetchProducts() {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: "no-store" });
//       const data = await res.json();

//       // First try sub‑category
//       let filtered = data.filter(
//         (p) => slugify(p.category) === category && slugify(p.sub_category) === slug
//       );

//       if (filtered.length > 0) {
//         setMode("sub");
//         setProducts(filtered);
//         return;
//       }

//       // Otherwise treat as product name
//       filtered = data.filter(
//         (p) => slugify(p.category) === category && slugify(p.name) === slug
//       );

//       if (filtered.length > 0) {
//         setMode("item");
//         setProducts(filtered);
//       } else {
//         setProducts([]);
//       }
//     }
//     fetchProducts();
//   }, [category, slug]);

//   if (products.length === 0) {
//     return <p className="p-6">No products found.</p>;
//   }

//   return (
//     <section className="p-6">
//       {mode === "sub" ? (
//         <>
//           <h1 className="text-2xl font-bold mb-4">{category} / {slug}</h1>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {products.map((p) => (
//               <div key={p.id} className="border rounded p-3">
//                 <h2 className="font-semibold">{p.name}</h2>
//                 <p className="text-sm text-gray-600">{p.short_description}</p>
//                 <p className="text-blue-600 font-bold">Ksh {p.offer_price}</p>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <>
//           <h1 className="text-2xl font-bold mb-4">{products[0].name}</h1>
//           <p className="text-gray-700 mb-2">{products[0].long_description}</p>
//           <p className="text-blue-600 font-bold mb-4">Ksh {products[0].offer_price}</p>
//           <img src={products[0].images[0]} alt={products[0].name} className="w-64 rounded" />
//         </>
//       )}
//     </section>
//   );
// }
