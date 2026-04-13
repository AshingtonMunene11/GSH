"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function FallingBalls() {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const baseBalls = [
      { src: "/football.png" },
      { src: "/basketball.png" },
      { src: "/tennis.png" },
    ];

    const generated = Array.from({ length: 20 }).map((_, i) => {
      const ball = baseBalls[Math.floor(Math.random() * baseBalls.length)];
      return {
        id: i,
        src: ball.src,
        left: `${Math.random() * 100}%`,
        size: 40 + Math.random() * 50,
        fallDistance: window.innerHeight + 100,
        duration: 1.5 + Math.random() * 2,
      };
    });

    setBalls(generated);
  }, []);

  return (
    <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, left: 0, pointerEvents: "none", overflow: "hidden" }}>
      {balls.map((ball) => (
        <Ball key={ball.id} ball={ball} />
      ))}
    </div>
  );
}

function Ball({ ball }) {
  const controls = useAnimation();

  useEffect(() => {
    async function animateBall() {
      // Initial drop
      await controls.start({
        y: [-100, ball.fallDistance],
        transition: { duration: ball.duration, ease: "easeIn" },
      });

      // Random drops loop
      while (true) {
        await new Promise((res) => setTimeout(res, 4000 + Math.random() * 8000));
        if (Math.random() < 0.3) {
          await controls.set({ y: -100 });
          await controls.start({
            y: [-100, ball.fallDistance],
            transition: { duration: ball.duration, ease: "easeIn" },
          });
        }
      }
    }
    animateBall();
  }, []);

  return (
    <motion.img
      src={ball.src}
      alt="ball"
      animate={controls}
      style={{
        position: "absolute",
        left: ball.left,
        width: ball.size,
        zIndex: 2,
        opacity: 0.8,
      }}
    />
  );
}
