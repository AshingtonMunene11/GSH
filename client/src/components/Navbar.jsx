"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import AdminLoginModal from "@/components/AdminLoginModal";
import TopLine from "@/components/ui/TopLine";

export default function Navbar() {
  const { count } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: "#126936" }}
    >
      <TopLine />

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/GiddySportsLogoWithoutBg.png"
              alt="Giddy Sports Hub Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-lg md:text-xl text-white hover:text-[#f4821f] transition-transform duration-200 hover:scale-105">
              Giddy Sports Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm text-white hover:text-[#f4821f] transition-transform hover:scale-105">Home</Link>
            <Link href="/product" className="text-sm text-white hover:text-[#f4821f] transition-transform hover:scale-105">Shop</Link>
            <Link href="/#about" scroll={false} className="text-sm text-white hover:text-[#f4821f] transition-transform hover:scale-105">About</Link>
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 pr-4 w-64 text-white bg-[#0f4d28] border-none"
              />
            </div>

            {/* User login */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLogin(true)}
              className="text-white hover:text-[#f4821f] transition-transform hover:scale-105"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:text-[#f4821f]">
                <ShoppingCart className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f4d28] px-4 pb-4 space-y-3">
          <Link href="/" className="block text-white hover:text-[#f4821f]">Home</Link>
          <Link href="/product" className="block text-white hover:text-[#f4821f]">Shop</Link>
          <Link href="/#about" scroll={false} className="block text-white hover:text-[#f4821f]">About</Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 pr-4 w-full text-white bg-[#126936] border-none"
            />
          </div>
        </div>
      )}

      {showLogin && <AdminLoginModal onClose={() => setShowLogin(false)} />}
    </header>
  );
}


// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { ShoppingCart, Search, User } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { useState } from "react";
// import AdminLoginModal from "@/components/AdminLoginModal";
// import TopLine from "@/components/ui/TopLine";

// export default function Navbar() {
//   const { count } = useCart();
//   const [showLogin, setShowLogin] = useState(false);

//   return (
//     <header
//       className="sticky top-0 z-50 w-full border-b"
//       style={{ backgroundColor: "#126936" }}
//     >
//       {/* TopLine sits at the very top of the navbar */}
//       <TopLine />

//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <Image
//               src="/GiddySportsLogoWithoutBg.png"
//               alt="Giddy Sports Hub Logo"
//               width={50}
//               height={50}
//               className="rounded-lg"
//             />
//             <span className="font-bold text-xl transition-transform duration-200 hover:text-[#f4821f] hover:scale-110">
//               Giddy Sports Hub
//             </span>
//           </Link>

//           {/* Navigation links */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link
//               href="/"
//               className="text-sm transition-transform duration-200 hover:text-[#f4821f] hover:scale-110"
//             >
//               Home
//             </Link>
//             <Link
//               href="/product"
//               className="text-sm transition-transform duration-200 hover:text-[#f4821f] hover:scale-110"
//             >
//               Shop
//             </Link>
//             <Link
//               href="/#about"
//               scroll={false}
//               className="text-sm transition-transform duration-200 hover:text-[#f4821f] hover:scale-110"
//             >
//               About
//             </Link>
//           </nav>

//           {/* Right-side actions */}
//           <div className="flex items-center space-x-4">
//             {/* Search bar */}
//             <div className="hidden md:flex items-center relative hover:text-white">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 type="search"
//                 placeholder="Search products..."
//                 className="pl-9 pr-4 w-64 text-white transition-transform duration-200 hover:text-[#f4821f] hover:scale-105"
//               />
//             </div>

//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setShowLogin(true)}
//               className="transition-transform duration-200 hover:text-[#f4821f] hover:scale-110"
//             >
//               <User className="h-5 w-5" />
//             </Button>

//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="relative transition-transform duration-200 hover:text-[#f4821f] hover:scale-110"
//             >
//               <Button variant="ghost" size="icon">
//                 <ShoppingCart className="h-5 w-5" />
//                 {count > 0 && (
//                   <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
//                     {count}
//                   </span>
//                 )}
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {showLogin && <AdminLoginModal onClose={() => setShowLogin(false)} />}
//     </header>
//   );
// }
