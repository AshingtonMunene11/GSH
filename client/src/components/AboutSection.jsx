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
    const interval = setInterval(() => nextCard(), 7000);
    return () => clearInterval(interval);
  }, []);

  const nextCard = () => setCurrent((prev) => (prev + 1) % cards.length);
  const prevCard = () => setCurrent((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section
      id="about"
      className="flex justify-center items-center min-h-[400px] md:min-h-[500px] bg-gray-100 py-6 px-4 mb-12"
    >
      <div className="relative w-full max-w-sm sm:max-w-md h-[220px] sm:h-[250px] flex justify-center items-center">
        {cards.map((card, index) => {
          const position = (index - current + cards.length) % cards.length;

          let classes =
            "absolute w-full sm:w-96 h-full sm:h-56 rounded-xl shadow-2xl flex flex-col justify-center items-center transition-all duration-1000 ease-in-out px-4";

          if (position === 0) {
            classes += " bg-white text-green-700 z-20 scale-105 animate-zoom-tilt animate-fade";
          } else if (position === 1) {
            classes += " bg-[#126936] text-white blur-[1px] opacity-80 translate-x-4 sm:translate-x-12 rotate-3 sm:rotate-6 z-10 scale-95 animate-fade";
          } else {
            classes += " bg-[#f4821f] text-white blur-[1px] opacity-80 -translate-x-4 sm:-translate-x-12 -rotate-3 sm:-rotate-6 z-10 scale-95 animate-fade";
          }

          return (
            <div key={index} className={classes}>
              <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-center">
                {card.title}
              </h2>
              <p className="text-sm sm:text-base text-center px-2 sm:px-6">{card.text}</p>
            </div>
          );
        })}

        {/* Navigation buttons */}
        <button
          onClick={prevCard}
          className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white text-green-700 shadow-lg animate-float animate-glow hover:bg-green-600 hover:text-white transition"
        >
          ‹
        </button>
        <button
          onClick={nextCard}
          className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white text-green-700 shadow-lg animate-float animate-glow hover:bg-green-600 hover:text-white transition"
        >
          ›
        </button>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(-50%) translateY(0); }
          50% { transform: translateY(-50%) translateY(-6px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(18, 105, 54, 0.6); }
          50% { box-shadow: 0 0 20px rgba(18, 105, 54, 0.9); }
        }
        @keyframes zoomTilt {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.08) rotate(2deg); }
          100% { transform: scale(1.05) rotate(0deg); }
        }
        @keyframes fade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-float { animation: float 2s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-zoom-tilt { animation: zoomTilt 0.7s ease forwards; }
        .animate-fade { animation: fade 0.7s ease forwards; }
      `}</style>
    </section>
  );
}


// "use client";

// import { useEffect, useState } from "react";

// export default function AboutSection() {
//   const cards = [
//     {
//       title: "Premium Gear & Apparel",
//       text: "Top‑quality sportswear and equipment for every athlete, designed to elevate your game."
//     },
//     {
//       title: "Community & Passion",
//       text: "Connecting enthusiasts through events, training, and shared love for sports."
//     },
//     {
//       title: "Innovation & Style",
//       text: "Blending performance with modern design, inspiring athletes on and off the field."
//     }
//   ];

//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextCard();
//     }, 7000); // auto shuffle every 7s
//     return () => clearInterval(interval);
//   }, []);

//   const nextCard = () => {
//     setCurrent((prev) => (prev + 1) % cards.length);
//   };

//   const prevCard = () => {
//     setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
//   };

//   return (
//     <section
//       id="about"
//       className="flex justify-center items-center min-h-[500px] bg-gray-100 py-4 px-6 mb-12"
//     >
//       <div className="relative w-[400px] h-[250px] flex justify-center items-center">
//         {cards.map((card, index) => {
//           const position = (index - current + cards.length) % cards.length;

//           let classes =
//             "absolute w-96 h-56 rounded-xl shadow-2xl flex flex-col justify-center items-center transition-all duration-1000 ease-in-out";

//           if (position === 0) {
//             classes +=
//               " bg-white text-green-700 z-20 scale-105 animate-zoom-tilt animate-fade";
//           } else if (position === 1) {
//             classes +=
//               " bg-[#126936] text-white blur-[1px] opacity-80 translate-x-12 rotate-6 z-10 scale-95 animate-fade";
//           } else {
//             classes +=
//               " bg-[#f4821f] text-white blur-[1px] opacity-80 -translate-x-12 -rotate-6 z-10 scale-95 animate-fade";
//           }

//           return (
//             <div key={index} className={classes}>
//               <h2 className="text-2xl font-bold mb-3">{card.title}</h2>
//               <p className="text-center px-6">{card.text}</p>
//             </div>
//           );
//         })}

//         {/* Floating navigation buttons */}
//         <button
//           onClick={prevCard}
//           className="absolute -left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white text-green-700 shadow-lg animate-float animate-glow hover:bg-green-600 hover:text-white transition"
//         >
//           ‹
//         </button>
//         <button
//           onClick={nextCard}
//           className="absolute -right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white text-green-700 shadow-lg animate-float animate-glow hover:bg-green-600 hover:text-white transition"
//         >
//           ›
//         </button>
//       </div>

//       {/* Custom animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(-50%) translateY(0);
//           }
//           50% {
//             transform: translateY(-50%) translateY(-6px);
//           }
//         }
//         @keyframes glow {
//           0%, 100% {
//             box-shadow: 0 0 10px rgba(18, 105, 54, 0.6);
//           }
//           50% {
//             box-shadow: 0 0 20px rgba(18, 105, 54, 0.9);
//           }
//         }
//         @keyframes zoomTilt {
//           0% {
//             transform: scale(1) rotate(0deg);
//           }
//           50% {
//             transform: scale(1.08) rotate(2deg);
//           }
//           100% {
//             transform: scale(1.05) rotate(0deg);
//           }
//         }
//         @keyframes fade {
//           0% {
//             opacity: 0;
//           }
//           100% {
//             opacity: 1;
//           }
//         }
//         .animate-float {
//           animation: float 2s ease-in-out infinite;
//         }
//         .animate-glow {
//           animation: glow 2s ease-in-out infinite;
//         }
//         .animate-zoom-tilt {
//           animation: zoomTilt 0.7s ease forwards;
//         }
//         .animate-fade {
//           animation: fade 0.7s ease forwards;
//         }
//       `}</style>
//     </section>
//   );
// }
