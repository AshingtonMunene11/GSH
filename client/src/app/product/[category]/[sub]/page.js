"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SubCategoryPage() {
  const { category, sub } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Debug logs
    console.log("Params received:", { category, sub });

    async function fetchProducts() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/product?category=${category}&sub_category=${sub}`;
        console.log("Fetching URL:", url);

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("Fetched products:", data);

        // Client-side filter fallback if backend ignores sub_category
        const filtered = sub
          ? data.filter((p) => slugify(p.sub_category) === sub)
          : data;

        console.log("Filtered products:", filtered);
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, [category, sub]);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {category} / {sub}
      </h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded p-3">
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.description}</p>
              <Link href={`/product/${category}/${sub}/${slugify(p.name)}`}>
                View details
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// ****************************************************************************************

// import { useParams } from "next/navigation";
// import ProductList from "../../_components/ProductList";

// export default function SubCategoryPage() {
//   const { category, sub } = useParams();
//   return <ProductList category={category} sub={sub} />;
// }


// ******************************************************************************************




// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import Link from "next/link";

// // export default function SubCategoryPage() {
// //   const { category, sub } = useParams();
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     async function fetchProducts() {
// //       try {
// //         const res = await fetch(
// //           `${process.env.NEXT_PUBLIC_API_URL}/product?category=${category}&sub_category=${sub}`,
// //           { cache: "no-store" }
// //         );
// //         if (!res.ok) throw new Error("Failed to fetch products");
// //         const data = await res.json();
// //         setProducts(data);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     }
// //     fetchProducts();
// //   }, [category, sub]);

// //   return (
// //     <section className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">
// //         {category} / {sub}
// //       </h1>
// //       {products.length === 0 ? (
// //         <p>No products found.</p>
// //       ) : (
// //         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// //           {products.map((p) => (
// //             <div key={p.id} className="border rounded p-3">
// //               <h2 className="font-semibold">{p.name}</h2>
// //               <p className="text-sm text-gray-600">{p.description}</p>
// //               <Link href={`/product/${category}/${sub}/${slugify(p.name)}`}>
// //                 View details
// //               </Link>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </section>
// //   );
// // }

// // function slugify(text) {
// //   return text.toString().toLowerCase().trim()
// //     .replace(/&/g, "")
// //     .replace(/\s+/g, "-")
// //     .replace(/[^\w\-]+/g, "")
// //     .replace(/\-\-+/g, "-");
// // }
