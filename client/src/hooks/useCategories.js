"use client";
import { useQuery } from "@tanstack/react-query";

async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // cache for 10 minutes
    refetchOnWindowFocus: false,
  });
}
