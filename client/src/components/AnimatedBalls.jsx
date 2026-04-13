"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function FallingBalls() {
  const baseBalls = [
    { src: "/football.png" },
    { src: "/basketball.png" },
    { src: "/tennis.png" },
  ];

  const balls = Array.from({ length: 20 }).map((_, i) => {
    const ball = baseBalls[Math.floor(Math.random() * baseBalls.length)];
    return {
      id: i,
      src: ball.src,
      left: `${Math.random() * 100}%`,
      size: 40 + Math.random() * 50,
      fallDistance: typeof window !== "undefined" ? window.innerHeight + 100 : 800,
      duration: 1.5 + Math.random() * 2,
    };
  });

  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
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
      // Initial drop for all balls
      await controls.start({
        y: [-100, ball.fallDistance],
        transition: { duration: ball.duration, ease: "easeIn" },
      });

      // Loop: drop again every ~3 minutes
      while (true) {
        await new Promise((res) => setTimeout(res, 180000)); // 180,000 ms = 3 minutes

        // Random chance: only some balls drop again
        if (Math.random() < 0.3) { // 30% chance
          await controls.set({ y: -100 }); // reset to top instantly
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
