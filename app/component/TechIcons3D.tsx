"use client";

import Image from "next/image";
import { useMemo } from "react";

const icons = [
  "/icons/nextjs.svg",
  "/icons/react.svg",
  "/icons/flutter.svg",
  "/icons/typescript.svg",
  "/icons/rust.svg",
];

type Position = {
  top: number;
  left: number;
};

function generatePositions(): Position[] {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= 768;

  const margin = isMobile ? 12 : 15;

  return icons.map((_, i) => {
    let top: number;
    let left: number;

    switch (i % 5) {
      case 0:
        top = margin + Math.random() * 20;
        left = margin + Math.random() * 20;
        break;

      case 1:
        top = margin + Math.random() * 20;
        left = 100 - margin - Math.random() * 20;
        break;

      case 2:
        top = 100 - margin - Math.random() * 30;
        left = margin + Math.random() * 20;
        break;

      case 3:
        top = 100 - margin - Math.random() * 30;
        left = 100 - margin - Math.random() * 20;
        break;

      default:
        top = margin + Math.random() * 15;
        left =
          Math.random() > 0.5
            ? margin + Math.random() * 20
            : 100 - margin - Math.random() * 20;
    }

    return { top, left };
  });
}

export default function TechIcons3D() {
  const positions = useMemo(() => generatePositions(), []);

  return (
    <div
      className="tech-layer"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        transformStyle: "preserve-3d",
      }}
    >
      {icons.map((src, i) => {
        return (
          <div
            key={src}
            className="tech-icon-wrapper"
            style={{
              position: "absolute",
              top: `${positions[i].top}%`,
              left: `${positions[i].left}%`,
              transform: `translate(-50%, -50%) translateZ(${
                20 + i * 15
              }px)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="tech-icon-motion">
              <Image
                src={src}
                width={120}
                height={120}
                className="tech-icon"
                alt="Technology icon"
                priority={i < 2}
                draggable={false}
              />
            </div>
          </div>
        );
      })}

      {/* Purple SVG */}

      <div
        className="tech-icon-wrapper"
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          width: 100,
          height: 100,
          transform:
            "translate(-50%, -50%) translateZ(90px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="tech-icon-motion tech-icon-motion--svg">
          <svg
            viewBox="0 0 128 128"
            fill="none"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <path
              fill="#A78BFA"
              d="M64 8L16 40v48l48 32 48-32V40L64 8zm0 16l32 21.33v29.34L64 96 32 74.67V45.33L64 24z"
            />

            <path
              fill="#C4B5FD"
              d="M64 40L40 56v16l24 16 24-16V56L64 40z"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Rust SVG */}

      <div
        className="tech-icon-wrapper"
        style={{
          position: "absolute",
          top: "78%",
          left: "50%",
          width: 100,
          height: 100,
          transform:
            "translate(-50%, -50%) translateZ(110px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="tech-icon-motion tech-icon-motion--svg">
          <svg
            viewBox="0 0 128 128"
            fill="none"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <path
              fill="#CE422B"
              d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c10.6 0 20.6-2.6 29.4-7.1l-15-25.2c-4.3 2-9.1 3.1-14.1 3.1-17.7 0-32-14.3-32-32s14.3-32 32-32c5 0 9.8 1.1 14.1 3.1l15-25.2C84.6 2.6 74.6 0 64 0z"
            />

            <path
              fill="#CE422B"
              d="M93.4 56.9l15 25.2C116.9 70.6 122 58.2 122 45c0-6.5-1.3-12.7-3.6-18.4L89 43.5c2.4 4 3.8 8.7 3.8 13.7 0 5-1.4 9.7-3.8 13.7zM64 96c17.7 0 32-14.3 32-32S81.7 32 64 32 32 46.3 32 64s14.3 32 32 32z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}