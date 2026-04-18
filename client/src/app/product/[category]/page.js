import Link from "next/link";

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default async function CategoryPage({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/product`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();
  const { category } = params;

  const categoryProducts = products.filter(
    (p) => slugify(p.category) === category
  );

  if (categoryProducts.length === 0) {
    return <div>No products found in {category}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {category.replace("-", " ")} Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categoryProducts.map((p) => (
          <Link
            key={p.id}
            href={`/product/${slugify(p.category)}/${slugify(p.name)}`}
            className="group block border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              <img
                src={p.images?.[0] || "/placeholder.png"}
                alt={p.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                {p.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{p.category}</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-blue-600">
                  ${p.offer_price}
                </p>
                {p.original_price && (
                  <p className="text-sm text-gray-400 line-through">
                    ${p.original_price}
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
