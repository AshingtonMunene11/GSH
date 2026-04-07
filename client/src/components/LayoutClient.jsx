"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export default function LayoutClient({ children }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </CartProvider>
  );
}
