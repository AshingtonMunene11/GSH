"use client";

import { useState } from "react";

export default function Aboutinfo() {
  const [open, setOpen] = useState(null);

  const toggle = (idx) => {
    setOpen(open === idx ? null : idx);
  };

  const highlights = [
    {
      title: "Our Mission",
      text: "We provide durable, high-quality sports equipment at affordable prices, empowering communities through sports."
    },
    {
      title: "What We Offer",
      text: "From footballs and sportswear to training gear, we deliver a wide range of carefully selected products with wholesale pricing and convenient ordering."
    },
    {
      title: "Connect With Us",
      text: "Located along Accra Road, Nairobi. Reach us via info@giddysporthub.co.ke, WhatsApp Business, or visit our website for quick orders."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#126936] via-[#126936] to-[#0f4d27] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch min-h-[450px]">
        
        {/* Left: Image */}
        <div className="flex justify-center items-center h-full">
          <img
            src="/about-image.jpg" // replace with your actual image path in /public
            alt="About Giddy Sports Hub"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>

        {/* Right: Info + Dropdowns */}
        <div className="flex flex-col justify-center space-y-6 h-full">
          <h2 className="text-3xl font-bold text-center md:text-left">
            Giddy Sports Hub
          </h2>
          <p className="text-lg leading-relaxed text-center md:text-left">
            Giddy Sports Hub is your trusted destination for high-quality sports equipment at affordable wholesale prices. Based in Nairobi, Kenya, we serve athletes, teams, schools, and sports enthusiasts with reliable gear that enhances performance and passion for the game.
          </p>

          {/* Dropdowns */}
          <div className="space-y-3">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-[#126936] transition duration-300 hover:bg-[#f4821f] hover:text-[#126936] shadow-md"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-3 font-semibold text-lg focus:outline-none"
                >
                  {item.title}
                </button>
                {open === idx && (
                  <div className="px-6 pb-3 text-sm leading-relaxed">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
