import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetailPage({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/${params.id}`, { cache: "no-store" });

  if (!res.ok) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <a href="/products" className="inline-block">Back to Products</a>
      </div>
    );
  }

  const product = await res.json();

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
