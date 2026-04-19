function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default async function ProductDetailPage({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/product`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();
  const { category, name } = params;

  // Find the product by matching both category and name slugs
  const product = products.find(
    (p) =>
      slugify(p.category) === category &&
      slugify(p.name) === name
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-lg">
          <img
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Product details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>

          <div className="flex items-center gap-4 mb-6">
            <p className="text-2xl font-bold text-blue-600">
              ${product.offer_price}
            </p>
            {product.original_price && (
              <p className="text-lg text-gray-400 line-through">
                ${product.original_price}
              </p>
            )}
          </div>

          <p className="text-gray-700 mb-6">
            {product.description || "No description available."}
          </p>

          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
