"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const aboutImages = [
    "/about/fluorescent-glow-sports-gear_1170794-152556.jpg",
    "/about/fmany-different-sports-equipment-isolated-white_495423-78696.jpg",
    "/about/still-life-perfectly-ordered-fitness-gym-accessories_52683-100712.jpg",
    "/about/sport-equipment-black-background_1016675-2219.jpg",
    "/about/many-different-sports-equipment-isolated-white_495423-78696.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // auto-advance every 8s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % aboutImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [aboutImages.length]);

  // helper to skip immediately
  const skipToNext = () => {
    setCurrent((prev) => (prev + 1) % aboutImages.length);
  };

  return (
    <section
      id="about"
      className="flex flex-col md:flex-row w-full py-16 px-6 mt-10 bg-gray-100 rounded-lg"
    >
      {/* Left side: text */}
      <div className="md:w-1/2 w-full flex flex-col justify-center px-6 bg-gradient-to-br from-[#126936] to-[#0f4d28] text-white py-20 rounded-lg shadow-md">
        <h2 className="text-3xl justify-center font-bold text-[#f4821f] mb-4">
          About Giddy Sports Hub
        </h2>
        <p className="text-white leading-relaxed">
          At Giddy Sports Hub, we are passionate about providing the best sporting
          equipment and accessories to athletes, fitness enthusiasts, and fans alike.
          Our mission is to make quality gear accessible, affordable, and inspiring
          for everyone who loves sports.
        </p>
        <p className="text-white leading-relaxed mt-4">
          Whether you’re training, competing, or cheering from the sidelines, we’ve
          got you covered with a wide range of products designed to elevate your game
          and lifestyle.
        </p>
      </div>

      {/* Right side: carousel */}
      <div className="md:w-1/2 w-full relative h-[300px] md:h-[400px] mt-6 md:mt-0 rounded-lg overflow-hidden">
        <div
          className="flex w-full h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {aboutImages.map((src, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 h-full relative rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`About Banner ${index}`}
                fill
                className="object-cover rounded-lg"
                onError={skipToNext} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
