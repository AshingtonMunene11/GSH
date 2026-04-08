"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]:
        typeof formData[field] === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {Object.keys(formData).map((field) => (
            <Input
              key={field}
              placeholder={field}
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
