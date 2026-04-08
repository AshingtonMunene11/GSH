import { NextResponse } from "next/server";

// Temporary mock data (replace with Prisma/Postgres later)
let orders = [
  { id: 1, customer_name: "Alice", status: "Pending", total: 120.5 },
  { id: 2, customer_name: "Bob", status: "Shipped", total: 89.99 },
  { id: 3, customer_name: "Charlie", status: "Delivered", total: 45.0 },
];

// GET all orders
export async function GET() {
  return NextResponse.json(orders);
}

// POST new order
export async function POST(req) {
  const body = await req.json();
  const { customer_name, status, total } = body;

  const newOrder = {
    id: orders.length + 1,
    customer_name,
    status,
    total,
  };
  orders.push(newOrder);

  return NextResponse.json(newOrder);
}

// DELETE order by id
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id"), 10);

  orders = orders.filter((o) => o.id !== id);
  return NextResponse.json({ message: "Order deleted", deletedId: id });
}

// PUT update order
export async function PUT(req) {
  const body = await req.json();
  const { id, status, total, customer_name } = body;

  if (!id) {
    return NextResponse.json({ error: "Order id required" }, { status: 400 });
  }

  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Update fields if provided
  if (status) orders[index].status = status;
  if (typeof total !== "undefined") orders[index].total = total;
  if (customer_name) orders[index].customer_name = customer_name;

  return NextResponse.json(orders[index]);
}
