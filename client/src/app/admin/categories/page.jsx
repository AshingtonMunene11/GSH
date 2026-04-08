"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubCategory, setEditingSubCategory] = useState({ catId: null, sub: "" });
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    });
    const saved = await res.json();
    setCategories((prev) => [...prev, saved]);
    setNewCategory("");
  };

  // Add sub-category
  const handleAddSubCategory = async () => {
    if (!selectedCategory || !newSubCategory) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selectedCategory.name, subCategory: newSubCategory }),
    });
    const updated = await res.json();
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setNewSubCategory("");
    setSelectedCategory(null);
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Delete sub-category
  const handleDeleteSubCategory = async (catId, sub) => {
    await fetch(`/api/categories?id=${catId}&subCategory=${encodeURIComponent(sub)}`, {
      method: "DELETE",
    });
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, subCategories: c.subCategories.filter((s) => s !== sub) }
          : c
      )
    );
  };

  // Rename category
  const handleRenameCategory = async () => {
    if (!editingCategory || !editValue) return;
    const res = await fetch("/api/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingCategory.id, newName: editValue }),
    });
    const updated = await res.json();
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setEditingCategory(null);
    setEditValue("");
  };

  // Rename sub-category
  const handleRenameSubCategory = async () => {
    if (!editingSubCategory.catId || !editingSubCategory.sub || !editValue) return;
    const res = await fetch("/api/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingSubCategory.catId,
        oldSubCategory: editingSubCategory.sub,
        newSubCategory: editValue,
      }),
    });
    const updated = await res.json();
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setEditingSubCategory({ catId: null, sub: "" });
    setEditValue("");
  };

  if (loading) return <p className="p-8">Loading categories...</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

      {/* Add Category */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button onClick={handleAddCategory}>Add</Button>
        </CardContent>
      </Card>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.id} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  {editingCategory?.id === cat.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="New category name"
                      />
                      <Button size="sm" onClick={handleRenameCategory}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingCategory(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="font-semibold">{cat.name}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingCategory(cat);
                            setEditValue(cat.name);
                          }}
                        >
                          Rename
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCategory(cat.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {/* Sub-categories */}
                <ul className="ml-6 mt-2 space-y-1 text-sm text-gray-600">
                  {cat.subCategories.map((sub, i) => (
                    <li key={i} className="flex justify-between items-center">
                      {editingSubCategory.catId === cat.id &&
                      editingSubCategory.sub === sub ? (
                        <div className="flex gap-2">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            placeholder="New sub-category name"
                          />
                          <Button size="sm" onClick={handleRenameSubCategory}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setEditingSubCategory({ catId: null, sub: "" })
                            }
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span>- {sub}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingSubCategory({ catId: cat.id, sub });
                                setEditValue(sub);
                              }}
                            >
                              Rename
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteSubCategory(cat.id, sub)}
                            >
                              Delete
                            </Button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Add Sub-category */}
                {selectedCategory?.id === cat.id ? (
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="New sub-category"
                      value={newSubCategory}
                      onChange={(e) => setNewSubCategory(e.target.value)}
                    />
                    <Button size="sm" onClick={handleAddSubCategory}>
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    + Add Sub-category
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
