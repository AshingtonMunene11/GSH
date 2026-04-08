"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditProductModal from "@/components/EditProductModal";
import CreateProductModal from "@/components/CreateProductModal"; // new modal

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [creatingProduct, setCreatingProduct] = useState(false);

  // Search + sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Filtering + sorting
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === "string") {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading) return <p className="p-8">Loading inventory...</p>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button onClick={() => setCreatingProduct(true)}>+ Add Product</Button>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>

      {/* Product Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 cursor-pointer" onClick={() => handleSort("name")}>
                  Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("category")}>
                  Category {sortField === "category" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("price")}>
                  Price {sortField === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("stock_available")}>
                  Stock {sortField === "stock_available" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("rating")}>
                  Rating {sortField === "rating" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">${p.price}</td>
                  <td className="p-2">{p.stock_available}</td>
                  <td className="p-2">{p.rating} ⭐</td>
                  <td className="p-2 flex gap-2">
                    <Button variant="outline" onClick={() => setEditingProduct(p)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setProducts((prev) => prev.filter((prod) => prod.id !== p.id))
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={async (updatedProduct) => {
            await fetch(`/api/products/${updatedProduct.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedProduct),
            });
            setProducts((prev) =>
              prev.map((prod) =>
                prod.id === updatedProduct.id ? { ...prod, ...updatedProduct } : prod
              )
            );
          }}
        />
      )}

      {/* Create Modal */}
      {creatingProduct && (
        <CreateProductModal
          onClose={() => setCreatingProduct(false)}
          onSave={async (newProduct) => {
            const res = await fetch("/api/products", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newProduct),
            });
            const saved = await res.json();
            setProducts((prev) => [...prev, saved]);
          }}
        />
      )}
    </div>
  );
}
