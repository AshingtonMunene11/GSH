"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductList({ category, sub }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("Fetched products:", data);

        let filtered = data;
        if (category) {
          filtered = filtered.filter((p) => slugify(p.category) === category);
        }
        if (sub) {
          filtered = filtered.filter((p) => slugify(p.sub_category) === sub);
        }

        console.log("Filtered products:", filtered);
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, [category, sub]);

  return (
    <section>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded p-3">
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.description}</p>
              <Link href={`/product/${slugify(p.category)}/${sub ? slugify(sub) + "/" : ""}${slugify(p.name)}`}>
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
