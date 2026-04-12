"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function BouncingBalls() {
  const baseBalls = [
    { src: "/football.png" },
    { src: "/basketball.png" },
    { src: "/tennis.png" },
  ];

  // Create 20 random balls
  const balls = Array.from({ length: 20 }).map(() => {
    const ball = baseBalls[Math.floor(Math.random() * baseBalls.length)];

    const isForeground = Math.random() < 0.4;

    return {
      src: ball.src,
      left: isForeground
        ? `${70 + Math.random() * 30}%`
        : `${Math.random() * 100}%`,
      size: 40 + Math.random() * 50,
      layer: isForeground ? 3 : [-3, -1, 2][Math.floor(Math.random() * 3)],
      bounceHeight: 250 + Math.random() * 450,
      drift: Math.random() * 100 - 50,
      duration: 2 + Math.random() * 3,
      idleTime: 2000 + Math.random() * 6000, // 2–8 seconds idle
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
      {balls.map((ball, index) => (
        <Ball key={index} ball={ball} />
      ))}
    </div>
  );
}

function Ball({ ball }) {
  const controls = useAnimation();

  // Drop once, then idle, then random throws forever
  useEffect(() => {
    async function animateBall() {
      // Initial drop
      await controls.start({
        y: [ -100, ball.bounceHeight, 0 ],
        x: [0, ball.drift, 0],
        transition: {
          duration: ball.duration,
          ease: "easeInOut",
        },
      });

      // Idle
      await new Promise((res) => setTimeout(res, ball.idleTime));

      // Loop random throws
      while (true) {
        await controls.start({
          y: [0, ball.bounceHeight, 0],
          x: [0, ball.drift, 0],
          transition: {
            duration: ball.duration,
            ease: "easeInOut",
          },
        });

        // Random idle between throws
        await new Promise((res) =>
          setTimeout(res, 1500 + Math.random() * 5000)
        );
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
