import ShopCard from "@/components/ShopCard";

export default async function FeaturedPage() {
  // Fetch products directly from your API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: "no-store" });
  const products = await res.json();

  // Filter only featured products
  const featuredOnly = products.filter(p => p.featured === true);

  return (
    <main className="mt-8 w-full px-6">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredOnly.map((p) => (
          <div
            key={p.id}
            className="shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300"
          >
            <ShopCard
              title={p.name}
              description={p.short_description}
              image={p.images[0]}
              href={`/product/${p.category}/${p.sub_category}/${p.id}`}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
