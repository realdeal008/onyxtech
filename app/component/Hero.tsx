"use client";

import { useEffect, useRef } from "react";
import MatrixRain from "./MatrixRain";
import TechIcons3D from "./TechIcons3D";
import Onyx3D from "./Onyx3D";
import Programmingcomputer from "./Programmingcomputer";
import ParticleField from "./ParticleField";
import StarField from "./StarField";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const svg = svgRef.current;
    if (!hero || !svg) return;

    let isHeroVisible = false;
    let isScrolling = false;
    let resumeTimer: number | undefined;

    const resumeIfReady = () => {
      if (isHeroVisible && !isScrolling && !document.hidden) {
        svg.unpauseAnimations();
      }
    };

    const handleScroll = () => {
      isScrolling = true;
      svg.pauseAnimations();
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        isScrolling = false;
        resumeIfReady();
      }, 180);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible) {
        resumeIfReady();
      } else {
        svg.pauseAnimations();
      }
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        svg.pauseAnimations();
      } else {
        resumeIfReady();
      }
    };

    observer.observe(hero);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearTimeout(resumeTimer);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <StarField />
        <MatrixRain className="matrix-hacking-layer--hero" />
        <ParticleField />
        
        <div className="hero-visual-content">
          <Programmingcomputer className="matrix-svg" ref={svgRef} />
          <Onyx3D />
        </div>
        
        <TechIcons3D />
      </div>
    </section>
  );
}