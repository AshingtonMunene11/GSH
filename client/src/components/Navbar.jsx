"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import AdminLoginModal from "@/components/AdminLoginModal";

export default function Navbar() {
  const { count } = useCart(); // total number of items picked
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: "#126936" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/GiddySportsLogoWithoutBg.png"
              alt="Giddy Sports Hub Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="font-bold text-xl hover:text-[#f4821f]">
              Giddy Sports Hub
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm hover:text-[#f4821f] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm hover:text-[#f4821f] transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-[#f4821f] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <div className="hidden md:flex items-center relative hover:text-white">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 pr-4 w-64 text-white hover:text-[#f4821f]"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLogin(true)}
              className="hover:text-[#f4821f]"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart" className="relative hover:text-[#f4821f]">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {showLogin && <AdminLoginModal onClose={() => setShowLogin(false)} />}
    </header>
  );
}
