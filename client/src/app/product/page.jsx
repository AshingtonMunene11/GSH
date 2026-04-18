import Link from "next/link";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default async function ProductsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/product`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Category filter bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/product/${slugify(cat)}`}
            className="px-4 py-2 border rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            {cat}
          </Link>
        ))}
      </div>

      {(!products || products.length === 0) && (
        <p className="text-gray-600">No products available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${slugify(product.category)}/${slugify(product.name)}`}
            className="group block border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-blue-600">
                  ${product.offer_price}
                </p>
                {product.original_price && (
                  <p className="text-sm text-gray-400 line-through">
                    ${product.original_price}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
