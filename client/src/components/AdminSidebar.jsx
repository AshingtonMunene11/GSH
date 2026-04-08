"use client";

import Link from "next/link";
import { Package, ShoppingBag, Users, BarChart3 } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#126936] text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-4">
        <Link href="/admin/dashboard" className="flex items-center gap-3 hover:text-[#f4821f]">
          <BarChart3 className="h-5 w-5" />
          Dashboard
        </Link>
        <Link href="/admin/products" className="flex items-center gap-3 hover:text-[#f4821f]">
          <Package className="h-5 w-5" />
          Products
        </Link>
        <Link href="/admin/orders" className="flex items-center gap-3 hover:text-[#f4821f]">
          <ShoppingBag className="h-5 w-5" />
          Orders
        </Link>
        <Link href="/admin/users" className="flex items-center gap-3 hover:text-[#f4821f]">
          <Users className="h-5 w-5" />
          Users
        </Link>
        <Link href="/admin/analytics" className="flex items-center gap-3 hover:text-[#f4821f]">
          <BarChart3 className="h-5 w-5" />
          Analytics
        </Link>
      </nav>
    </aside>
  );
}
