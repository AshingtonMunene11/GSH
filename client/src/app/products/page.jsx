import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function ProductsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {(!products || products.length === 0) && (
        <p className="text-gray-600">No products available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group block border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {/* Product image */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              <img
                src={product.image_url1}
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform"
              />
              {product.featured && (
                <Badge className="absolute top-2 right-2 bg-blue-600">
                  Featured
                </Badge>
              )}
            </div>

            {/* Product info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>

              {/* Pricing with discount */}
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
                {product.original_price && (
                  <p className="text-sm text-gray-400 line-through">
                    ${product.original_price.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Rating */}
              {product.rating && (
                <p className="text-sm text-yellow-500">
                  ⭐ {product.rating} ({product.reviews_count} reviews)
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Debug: show raw JSON */}
      <pre className="mt-8 text-left bg-gray-100 p-4 rounded">
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  );
}
