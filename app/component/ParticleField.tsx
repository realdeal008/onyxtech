"use client";

import { useEffect, useRef } from "react";

export default function ParticleField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!field || !canvas || !context) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];
    let animationId: number | null = null;
    let isVisible = false;

    const resizeCanvas = () => {
      canvas.width = field.offsetWidth;
      canvas.height = field.offsetHeight;

      const count = Math.min(
        50,
        Math.floor((canvas.width * canvas.height) / 15000)
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
      }));
    };

    const animate = () => {
      if (!isVisible) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(125, 211, 252, 0.4)";
        context.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.strokeStyle = `rgba(34, 211, 238, ${0.15 * (1 - distance / 120)})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && animationId === null) {
          animationId = requestAnimationFrame(animate);
        } else if (!isVisible && animationId !== null) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(field);

    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animationId !== null) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flow-particle-field" ref={fieldRef} aria-hidden="true">
      <canvas className="flow-particle-field-canvas" ref={canvasRef} />
    </div>
  );
}
