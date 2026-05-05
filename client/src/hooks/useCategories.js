"use client";
import { useQuery } from "@tanstack/react-query";

async function fetchCategories() {
  const res = await fetch("/api/product"); // fetch all products
  if (!res.ok) throw new Error("Failed to fetch products");
  const products = await res.json();

  // Extract unique categories
  const categories = [...new Set(products.map((p) => p.category))];
  return categories;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
