"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function FallingBalls() {
  const baseBalls = [
    { src: "/football.png" },
    { src: "/basketball.png" },
    { src: "/tennis.png" },
  ];

  // Generate 20 balls
  const balls = Array.from({ length: 20 }).map((_, i) => {
    const ball = baseBalls[Math.floor(Math.random() * baseBalls.length)];
    const isForeground = Math.random() < 0.4;

    return {
      id: i,
      src: ball.src,
      left: isForeground
        ? `${70 + Math.random() * 30}%` // more on right side
        : `${Math.random() * 100}%`,
      size: 40 + Math.random() * 50,
      layer: isForeground ? 3 : [-3, -1, 2][Math.floor(Math.random() * 3)],
      fallDistance: window.innerHeight + 100, // drop beyond viewport
      duration: 1.5 + Math.random() * 2, // fall speed
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
        y: [ -100, ball.fallDistance ],
        transition: {
          duration: ball.duration,
          ease: "easeIn",
        },
      });

      // Loop: occasionally drop one or two balls again
      while (true) {
        // Random wait before next fall
        await new Promise((res) =>
          setTimeout(res, 4000 + Math.random() * 8000) // 4–12s idle
        );

        // Random chance: only some balls fall again
        if (Math.random() < 0.3) { // 30% chance
          await controls.set({ y: -100 }); // reset to top instantly
          await controls.start({
            y: [ -100, ball.fallDistance ],
            transition: {
              duration: ball.duration,
              ease: "easeIn",
            },
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
        zIndex: ball.layer,
        opacity:
          ball.layer === -3 ? 0.25 :
          ball.layer === -1 ? 0.45 :
          ball.layer === 2 ? 0.7 :
          0.9,
        filter: ball.layer === -3 ? "blur(2px)" : "none",
      }}
    />
  );
}
