import { NextResponse } from "next/server";

// Temporary in-memory store (replace with DB later)
let categories = [
  { id: 1, name: "Electronics", subCategories: ["Phones", "Laptops"] },
  { id: 2, name: "Clothing", subCategories: ["Men", "Women"] },
];

// GET all categories
export async function GET() {
  return NextResponse.json(categories);
}

// POST new category or sub-category
export async function POST(req) {
  const body = await req.json();
  const { name, subCategory } = body;

  if (!name) {
    return NextResponse.json({ error: "Category name required" }, { status: 400 });
  }

  let existing = categories.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (existing) {
    if (subCategory && !existing.subCategories.includes(subCategory)) {
      existing.subCategories.push(subCategory);
    }
    return NextResponse.json(existing);
  }

  const newCategory = {
    id: categories.length + 1,
    name,
    subCategories: subCategory ? [subCategory] : [],
  };
  categories.push(newCategory);

  return NextResponse.json(newCategory);
}

// DELETE category or sub-category
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const subCategory = searchParams.get("subCategory");

  if (!id) {
    return NextResponse.json({ error: "Category id required" }, { status: 400 });
  }

  const categoryId = parseInt(id, 10);
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  if (subCategory) {
    category.subCategories = category.subCategories.filter((s) => s !== subCategory);
    return NextResponse.json({
      message: `Sub-category '${subCategory}' deleted`,
      category,
    });
  } else {
    categories = categories.filter((c) => c.id !== categoryId);
    return NextResponse.json({ message: "Category deleted", deletedId: categoryId });
  }
}

// PUT rename category or sub-category
export async function PUT(req) {
  const body = await req.json();
  const { id, newName, oldSubCategory, newSubCategory } = body;

  if (!id) {
    return NextResponse.json({ error: "Category id required" }, { status: 400 });
  }

  const categoryId = parseInt(id, 10);
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  if (newName) {
    // Rename category
    category.name = newName;
    return NextResponse.json(category);
  }

  if (oldSubCategory && newSubCategory) {
    // Rename sub-category
    const index = category.subCategories.findIndex((s) => s === oldSubCategory);
    if (index === -1) {
      return NextResponse.json({ error: "Sub-category not found" }, { status: 404 });
    }
    category.subCategories[index] = newSubCategory;
    return NextResponse.json(category);
  }

  return NextResponse.json({ error: "Invalid PUT request" }, { status: 400 });
}
