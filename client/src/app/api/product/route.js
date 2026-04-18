import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/data/products.json`, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }

    const products = await res.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
