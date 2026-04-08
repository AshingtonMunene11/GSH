import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetailPage({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
    { cache: "no-store" }
  );
  const product = await res.json();

  console.log("Fetched product:", product);

  if (!product || product.error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <a href="/products" className="inline-block">Back to Products</a>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
