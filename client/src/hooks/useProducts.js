"use client";
import { useQuery } from "@tanstack/react-query";

async function fetchProducts() {
  const res = await fetch("/api/product"); // calls your new API route
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
