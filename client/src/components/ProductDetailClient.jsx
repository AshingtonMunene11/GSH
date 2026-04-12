"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product images */}
        <div className="space-y-4">
          <img
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            className="rounded-lg w-full object-cover"
          />
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="rounded-md object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product details */}
        <div>
          <Badge variant="outline" className="mb-4">
            {product.category}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          {/* Pricing */}
          <div className="flex items-center gap-3 mb-6">
            <p className="text-3xl font-bold text-blue-600">
              ${product.offer_price}
            </p>
            {product.original_price && (
              <p className="text-xl text-gray-400 line-through">
                ${product.original_price}
              </p>
            )}
          </div>

          {/* Short description */}
          <p className="text-gray-700 mb-6">{product.short_description}</p>

          {/* Availability */}
          <p className="text-sm text-gray-600 mb-6">
            Availability:{" "}
            {product.stock_available > 0 ? (
              <span className="text-green-600">In stock</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>

          {/* Rating */}
          {product.rating && (
            <p className="text-sm text-yellow-500 mb-6">
              ⭐ {product.rating} ({product.reviews_count} reviews)
            </p>
          )}

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full md:w-auto gap-2"
            onClick={() => addToCart(product)}
            disabled={product.stock_available === 0}
          >
            <ShoppingCart className="h-5 w-5" /> Add to Cart
          </Button>

          {/* Long description */}
          {product.long_description && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.long_description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
