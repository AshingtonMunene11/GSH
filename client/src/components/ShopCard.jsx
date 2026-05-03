"use client";

import Link from "next/link";

export default function ShopCard({ title, description, image, href }) {
  return (
    <div className="relative group w-full h-64">
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-full"
      />

      {/* Info overlay with fade-in stagger */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white p-4">
        <h3 className="text-lg font-bold mb-2 text-center transition-opacity duration-700 delay-200 opacity-0 group-hover:opacity-100">
          {title}
        </h3>
        <p className="text-sm mb-4 text-center transition-opacity duration-700 delay-400 opacity-0 group-hover:opacity-100">
          {description}
        </p>
      </div>

      {/* Shop button bottom-left, rounded-full, fade-in + upward slide */}
      <Link href={href}>
        <button className="absolute bottom-3 left-3 bg-[#f4821f] text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-700 delay-600 transform group-hover:-translate-y-1">
          Shop Now
        </button>
      </Link>
    </div>
  );
}
