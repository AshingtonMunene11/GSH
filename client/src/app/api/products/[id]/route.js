import { db } from "@/lib/db";

export async function GET(req, { params }) {
  console.log("Params object:", params);
  console.log("Type of id:", typeof params.id, "Value:", params.id);

  const product = await db.product.findUnique({
    where: { id: Number(params.id) },
  });

  if (!product) {
    console.log("No product found for id:", params.id);
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}
