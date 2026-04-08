"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminLoginModal from "@/components/AdminLoginModal";
import { CartProvider } from "@/context/CartContext";

export default function LayoutClient({ children }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar onLoginClick={() => setShowLogin(true)} />

        <main className="flex-grow">{children}</main>

        <Footer />

        {showLogin && <AdminLoginModal onClose={() => setShowLogin(false)} />}
      </div>
    </CartProvider>
  );
}
