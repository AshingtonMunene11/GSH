"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function CreateProductModal({ onClose, onSave, categories = [] }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    stock_available: "",
    rating: "",
    featured: false,
    image_url1: "",
  });

  const [newCategory, setNewCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory = newCategory ? newCategory : formData.category;
    const finalSubCategory = newSubCategory ? newSubCategory : formData.subCategory;

    await onSave({
      ...formData,
      category: finalCategory,
      subCategory: finalSubCategory,
      price: parseFloat(formData.price),
      stock_available: parseInt(formData.stock_available, 10),
      rating: parseFloat(formData.rating),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Category Selection */}
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Select Category"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>

            {/* Option to create new category */}
            <Input
              name="newCategory"
              placeholder="Or create new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            {/* Sub-category */}
            <Input
              name="subCategory"
              placeholder="Sub-category"
              value={formData.subCategory}
              onChange={handleChange}
            />

            {/* Option to create new sub-category */}
            <Input
              name="newSubCategory"
              placeholder="Or create new sub-category"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
            />

            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <Input
              name="stock_available"
              type="number"
              placeholder="Stock Available"
              value={formData.stock_available}
              onChange={handleChange}
              required
            />
            <Input
              name="rating"
              type="number"
              step="0.1"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
            />
            <Input
              name="image_url1"
              placeholder="Image URL"
              value={formData.image_url1}
              onChange={handleChange}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Product
            </label>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
