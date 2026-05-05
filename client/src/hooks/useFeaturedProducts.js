"use client";
import { useQuery } from "@tanstack/react-query";

async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const products = await fetchProducts();
      return products.filter((p) => p.featured === true);
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    refetchOnWindowFocus: false,
  });
}
