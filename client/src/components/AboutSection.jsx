"use client";

import { useEffect, useState } from "react";

export default function AboutSection() {
  const cards = [
    {
      title: "Premium Gear & Apparel",
      text: "Top‑quality sportswear and equipment for every athlete, designed to elevate your game."
    },
    {
      title: "Community & Passion",
      text: "Connecting enthusiasts through events, training, and shared love for sports."
    },
    {
      title: "Innovation & Style",
      text: "Blending performance with modern design, inspiring athletes on and off the field."
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextCard();
    }, 7000); // auto shuffle every 7s
    return () => clearInterval(interval);
  }, []);

  const nextCard = () => {
    setCurrent((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section
      id="about"
      className="flex justify-center items-center min-h-screen bg-gray-100 py-16 px-6"
    >
      <div className="relative w-[400px] h-[250px] flex justify-center items-center">
        {cards.map((card, index) => {
          const position = (index - current + cards.length) % cards.length;

          let classes =
            "absolute w-96 h-56 rounded-xl shadow-2xl flex flex-col justify-center items-center transition-all duration-1000 ease-in-out";

          if (position === 0) {
            classes +=
              " bg-white text-green-700 z-20 scale-105 animate-zoom-tilt animate-fade";
          } else if (position === 1) {
            classes +=
              " bg-[#126936] text-white blur-[1px] opacity-80 translate-x-12 rotate-6 z-10 scale-95 animate-fade";
          } else {
            classes +=
              " bg-[#f4821f] text-white blur-[1px] opacity-80 -translate-x-12 -rotate-6 z-10 scale-95 animate-fade";
          }

          return (
            <div key={index} className={classes}>
              <h2 className="text-2xl font-bold mb-3">{card.title}</h2>
              <p className="text-center px-6">{card.text}</p>
            </div>
          );
        })}

        {/* Floating navigation buttons with glow pulse */}
        <button
          onClick={prevCard}
          className="absolute -left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white text-green-700 shadow-lg animate-float animate-glow hover:bg-green-600 hover:text-white transition"
        >
          ‹
        </button>
        <button
          onClick={nextCard}
          className="absolute -right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white text-green-700 shadow-lg animate-float animate-glow hover:bg-green-600 hover:text-white transition"
        >
          ›
        </button>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(-50%) translateY(0);
          }
          50% {
            transform: translateY(-50%) translateY(-6px);
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(18, 105, 54, 0.6);
          }
          50% {
            box-shadow: 0 0 20px rgba(18, 105, 54, 0.9);
          }
        }
        @keyframes zoomTilt {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.08) rotate(2deg);
          }
          100% {
            transform: scale(1.05) rotate(0deg);
          }
        }
        @keyframes fade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-zoom-tilt {
          animation: zoomTilt 0.7s ease forwards;
        }
        .animate-fade {
          animation: fade 0.7s ease forwards;
        }
      `}</style>
    </section>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function AboutSection() {
//   const aboutImages = [
//     "/about/fluorescent-glow-sports-gear_1170794-152556.jpg",
//     "/about/fmany-different-sports-equipment-isolated-white_495423-78696.jpg",
//     "/about/still-life-perfectly-ordered-fitness-gym-accessories_52683-100712.jpg",
//     "/about/sport-equipment-black-background_1016675-2219.jpg",
//     "/about/many-different-sports-equipment-isolated-white_495423-78696.jpg",
//   ];

//   const [current, setCurrent] = useState(0);

//   // auto-advance every 8s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % aboutImages.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, [aboutImages.length]);

//   // helper to skip immediately
//   const skipToNext = () => {
//     setCurrent((prev) => (prev + 1) % aboutImages.length);
//   };

//   return (
//     <section
//       id="about"
//       className="flex flex-col md:flex-row w-full py-16 px-6 mt-10 bg-gray-100 rounded-lg"
//     >
//       {/* Left side: text */}
//       <div className="md:w-1/2 w-full flex flex-col justify-center px-6 bg-gradient-to-br from-[#126936] to-[#0f4d28] text-white py-20 rounded-lg shadow-md">
//         <h2 className="text-3xl justify-center font-bold text-[#f4821f] mb-4">
//           About Giddy Sports Hub
//         </h2>
//         <p className="text-white leading-relaxed">
//           At Giddy Sports Hub, we are passionate about providing the best sporting
//           equipment and accessories to athletes, fitness enthusiasts, and fans alike.
//           Our mission is to make quality gear accessible, affordable, and inspiring
//           for everyone who loves sports.
//         </p>
//         <p className="text-white leading-relaxed mt-4">
//           Whether you’re training, competing, or cheering from the sidelines, we’ve
//           got you covered with a wide range of products designed to elevate your game
//           and lifestyle.
//         </p>
//       </div>

//       {/* Right side: carousel */}
//       <div className="md:w-1/2 w-full relative h-[300px] md:h-[400px] mt-6 md:mt-0 rounded-lg overflow-hidden">
//         <div
//           className="flex w-full h-full transition-transform duration-1000 ease-in-out"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {aboutImages.map((src, index) => (
//             <div
//               key={index}
//               className="w-full flex-shrink-0 h-full relative rounded-lg overflow-hidden"
//             >
//               <Image
//                 src={src}
//                 alt={`About Banner ${index}`}
//                 fill
//                 className="object-cover rounded-lg"
//                 onError={skipToNext} 
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
