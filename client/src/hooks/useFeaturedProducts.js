"use client";
import { useQuery } from "@tanstack/react-query";

async function fetchFeaturedProducts() {
  const res = await fetch("/api/product"); // fetch all products
  if (!res.ok) throw new Error("Failed to fetch products");
  const products = await res.json();
  return products.filter((p) => p.featured === true);
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeaturedProducts,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
