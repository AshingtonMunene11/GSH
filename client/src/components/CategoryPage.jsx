"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import ProductList from "@/components/ProductList";

function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, "-");
}

export default function CategoryPage() {
  const { category } = useParams();
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load products</p>;
  if (!products) return null;

  const filtered = products.filter(
    (p) => slugify(p.category) === category
  );

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">{category}</h1>
      <ProductList products={filtered} />
    </section>
  );
}
