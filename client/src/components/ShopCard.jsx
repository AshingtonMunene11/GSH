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
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
        <h3 className="text-lg font-bold mb-2 text-center">{title}</h3>
        <p className="text-sm mb-4 text-center">{description}</p>
        <Link href={href}>
          <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}
