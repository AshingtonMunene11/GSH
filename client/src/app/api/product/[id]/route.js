import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/products.json`);
  const products = await res.json();

  // Find product by id (ensure type match)
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return NextResponse.json({ error: `Product with id ${id} not found` }, { status: 404 });
  }

  // Related products: same category or sub_category, exclude itself
  const relatedProducts = products.filter(
    (p) =>
      p.id !== product.id &&
      (p.category === product.category || p.sub_category === product.sub_category)
  );

  return NextResponse.json({ ...product, relatedProducts });
}


// import { NextResponse } from "next/server";
// import products from "@/data/products.json";

// export async function GET(request, { params }) {
//   const { id } = params;
//   const product = products.find((p) => p.id === Number(id));

//   if (!product) {
//     return NextResponse.json({ error: `Product with id ${id} not found` }, { status: 404 });
//   }

//   const relatedProducts = products.filter(
//     (p) =>
//       p.id !== product.id &&
//       (p.category === product.category || p.sub_category === product.sub_category)
//   );

//   return NextResponse.json({ ...product, relatedProducts });
// }
