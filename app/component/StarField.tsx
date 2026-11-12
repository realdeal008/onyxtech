"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const STAR_COUNT = 3000;

function createRandom(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const drawStars = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const random = createRandom(42);

      for (let i = 0; i < STAR_COUNT; i++) {
        const depth = random();
        const radius =
          depth > 0.96
            ? 1.1 + random() * 0.9
            : depth > 0.72
              ? 0.65 + random() * 0.55
              : 0.3 + random() * 0.5;
        const opacity =
          depth > 0.96
            ? 0.72 + random() * 0.28
            : depth > 0.72
              ? 0.42 + random() * 0.35
              : 0.2 + random() * 0.32;

        context.beginPath();
        context.arc(random() * width, random() * height, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(165, 225, 255, ${opacity})`;

        if (depth > 0.985) {
          context.shadowColor = "rgba(110, 220, 255, 0.8)";
          context.shadowBlur = radius * 3;
        } else {
          context.shadowBlur = 0;
        }

        context.fill();
      }

      context.shadowBlur = 0;
    };

    drawStars();
    window.addEventListener("resize", drawStars);
    return () => window.removeEventListener("resize", drawStars);
  }, []);

  return (
    <motion.div
      className="static-starfield"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="static-starfield-canvas" />
    </motion.div>
  );
}
