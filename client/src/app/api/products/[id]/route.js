import { db } from "@/lib/db";

export async function GET(req, context) {
  const { id } = context.params;

  console.log("Incoming params:", context.params);

  const product = await db.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    console.log("No product found for id:", id);
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}
