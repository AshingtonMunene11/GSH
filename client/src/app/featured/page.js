"use client";

import Link from "next/link";

export default async function FeaturedPage() {
  // Fetch products directly from your API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: "no-store" });
  const products = await res.json();

  // Filter only featured products
  const featuredOnly = products.filter(p => p.featured === true);

  return (
    <main className="w-full min-h-screen bg-gray-100">
      {/* Banner Section */}
      <section className="bg-[#126936] text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Featured Products</h1>
        <p className="text-lg">
          Discover our hand‑picked selection of top items, chosen just for you.
        </p>
      </section>

      {/* Breadcrumb */}
      <div className="px-6 py-4 text-sm text-gray-600">
        <nav className="flex items-center space-x-2">
          <Link href="/" className="hover:underline text-[#126936] font-medium">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-700">Featured</span>
        </nav>
      </div>

      {/* Product Grid */}
      <div className="px-6 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredOnly.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition-transform duration-300 flex flex-col"
              style={{ height: "400px" }}
            >
              {/* Image area */}
              <div className="h-48 w-full">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text + button area */}
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-1">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {p.short_description}
                </p>
                <p className="text-base font-semibold text-gray-900 mb-3">
                  ${p.price}
                </p>

                {/* Action buttons */}
                <div className="mt-auto flex gap-2">
                  <Link
                    href={`/product/${p.category}/${p.sub_category}/${p.id}`}
                    className="flex-1 text-center bg-[#126936] text-white py-2 rounded hover:bg-[#f4821f] hover:text-black transition-colors duration-300 font-semibold"
                  >
                    Shop Now
                  </Link>
                  <button
                    className="flex-1 text-center bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition-colors duration-300 font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <section className="mt-12 py-8 bg-white border-t border-gray-200 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Didn’t find what you’re looking for?
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            href="/product"
            className="bg-[#126936] text-white px-6 py-2 rounded hover:bg-[#f4821f] hover:text-black transition-colors duration-300 font-semibold"
          >
            Back to Shop
          </Link>
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors duration-300 font-semibold"
          >
            Explore Categories
          </Link>
        </div>
      </section>
    </main>
  );
}
