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
            src={product.image_url1}
            alt={product.name}
            className="rounded-lg w-full object-cover"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.image_url2 && (
              <img src={product.image_url2} alt="" className="rounded-md object-cover" />
            )}
            {product.image_url3 && (
              <img src={product.image_url3} alt="" className="rounded-md object-cover" />
            )}
            {product.image_url4 && (
              <img src={product.image_url4} alt="" className="rounded-md object-cover" />
            )}
          </div>
        </div>

        {/* Product details */}
        <div>
          <Badge variant="outline" className="mb-4">
            {product.category}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.short_description}</p>

          {/* Availability */}
          <p className="text-sm text-gray-600 mb-6">
            Availability:{" "}
            {product.stock_available > 0 ? (
              <span className="text-green-600">In stock</span>
            ) : (
              <span className="text-red-600 flex items-center gap-2">
                Out of stock
                <Link
                  href="/support"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  Contact Support
                </Link>
              </span>
            )}
          </p>

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
              <p className="text-gray-700 leading-relaxed">{product.long_description}</p>
            </div>
          )}

          {/* Cross-sell */}
          {product.cross_up_sell1 && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">You may also like</h2>
              <Link
                href={`/products/${product.cross_up_sell1}`}
                className="text-blue-600 underline"
              >
                View related product
              </Link>
            </div>
          )}

          {/* Related Products */}
          {product.relatedProducts && product.relatedProducts.length > 0 && (
            <div className="mt-12 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Explore Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {product.relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/products/${related.id}`}
                    className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={related.image_url1}
                        alt={related.name}
                        className="object-cover w-full h-full hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold mb-1">{related.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-blue-600 font-bold">${related.price}</p>
                        {related.original_price && (
                          <p className="text-xs text-gray-400 line-through">
                            ${related.original_price}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* <pre className="mt-8 text-left bg-gray-100 p-4 rounded">
                {JSON.stringify(product, null, 2)}
            </pre> */}
        </div>
      </div>
    </div>
  );
}
