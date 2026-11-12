

"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Stream = {
  id: number;
  left: number;
  top: number;
  length: number;
  duration: number;
  delay: number;
  fontSize: number;
  opacity: number;
  depth: number;
  direction: "down" | "up";
  characters: string[];
};

const CHARACTERS =
  "RUST FLUTTER TYPESCRIPT REACT NEXTJS ONYX TECH AI ENGINEERING WEB DEVELOPMENT".split(" ");

function createRandom(seed: number) {
  let state = seed;

  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function randomCharacter(random: () => number) {
  return CHARACTERS[
    Math.floor(random() * CHARACTERS.length)
  ];
}

function createCharacters(length: number, random: () => number) {
  return Array.from(
    { length },
    () => randomCharacter(random)
  );
}

export default function MatrixRain({
  className = "",
}: {
  className?: string;
}) {
  const streams = useMemo<Stream[]>(() => {
    /*
     * Keep the effect deliberately sparse.
     */
    const streamsPerSide = 4;
    const random = createRandom(0x4d415452);

    const result: Stream[] = [];

    /*
     * ----------------------------------------------------
     * TOP LEFT
     * ----------------------------------------------------
     */
    for (let i = 0; i < streamsPerSide; i++) {
      result.push({
        id: result.length,

        left:
          3 +
          i * 7 +
          random() * 4,

        top:
          -10 +
          random() * 22,

        length:
          4 +
          Math.floor(random() * 5),

        duration:
          3.8 +
          random() * 2.5,

        delay:
          -(random() * 5),

        fontSize: 13 + random() * 5,

        opacity:
          0.22 + random() * 0.25,

        depth:
          0.7 + random() * 0.3,

        direction: "down",

        characters: createCharacters(
          4 + Math.floor(random() * 5),
          random
        ),
      });
    }

    /*
     * ----------------------------------------------------
     * TOP RIGHT
     * ----------------------------------------------------
     */
    for (let i = 0; i < streamsPerSide; i++) {
      result.push({
        id: result.length,

        left:
          72 +
          i * 6 +
          random() * 4,

        top:
          -15 +
          random() * 25,

        length:
          4 +
          Math.floor(random() * 6),

        duration:
          3.5 +
          random() * 3,

        delay:
          -(random() * 6),

        fontSize: 13 + random() * 5,

        opacity:
          0.20 + random() * 0.28,

        depth:
          0.65 + random() * 0.35,

        direction: "down",

        characters: createCharacters(
          4 + Math.floor(random() * 6),
          random
        ),
      });
    }

    /*
     * ----------------------------------------------------
     * BOTTOM LEFT
     * ----------------------------------------------------
     */
    for (let i = 0; i < streamsPerSide; i++) {
      result.push({
        id: result.length,

        left:
          7 +
          i * 7 +
          random() * 4,

        top:
          55 +
          random() * 35,

        length:
          4 +
          Math.floor(random() * 6),

        duration:
          4 +
          random() * 3,

        delay:
          -(random() * 6),

        fontSize: 13 + random() * 5,

        opacity:
          0.18 + random() * 0.26,

        depth:
          0.7 + random() * 0.3,

        direction: "down",

        characters: createCharacters(
          4 + Math.floor(random() * 6),
          random
        ),
      });
    }

    /*
     * ----------------------------------------------------
     * BOTTOM RIGHT
     * ----------------------------------------------------
     */
    for (let i = 0; i < streamsPerSide; i++) {
      result.push({
        id: result.length,

        left:
          72 +
          i * 6 +
          random() * 4,

        top:
          58 +
          random() * 35,

        length:
          4 +
          Math.floor(random() * 6),

        duration:
          3.8 +
          random() * 3,

        delay:
          -(random() * 6),

        fontSize: 13 + random() * 5,

        opacity:
          0.20 + random() * 0.27,

        depth:
          0.65 + random() * 0.35,

        direction: "down",

        characters: createCharacters(
          4 + Math.floor(random() * 6),
          random
        ),
      });
    }

    return result;
  }, []);

  return (
    <div
      className={`matrix-hacking-layer ${className}`.trim()}
      aria-hidden="true"
    >
      {streams.map((stream) => {
        const isUp =
          stream.direction === "up";

        /*
         * Simulated depth:
         *
         * foreground = brighter/larger
         * background = dimmer/smaller
         */
        const scale =
          0.88 + stream.depth * 0.12;

        return (
          <motion.div
            key={stream.id}
            className="matrix-stream"
            style={{
              left: `${stream.left}%`,
              top: `${stream.top}%`,

              opacity: stream.opacity,

              fontSize: `clamp(12px, ${stream.fontSize / 100}vw, ${stream.fontSize}px)`,

              transform: `scale(${scale})`,

              willChange: "transform",
            }}
            initial={{
              y: isUp
                ? "20vh"
                : "-20vh",
            }}
            animate={{
              y: isUp
                ? "-75vh"
                : "120vh",
            }}
            transition={{
              duration: stream.duration,

              delay: stream.delay,

              repeat: Infinity,

              ease: "linear",
            }}
          >
            {stream.characters.map(
              (character, index) => {
                /*
                 * Strong leading character.
                 *
                 * Characters become progressively
                 * weaker behind it.
                 */
                const position =
                  index /
                  Math.max(
                    stream.characters.length - 1,
                    1
                  );

                const characterOpacity =
                  1 - position * 0.82;

                return (
                  <span
                    key={`${stream.id}-${index}`}
                    className="matrix-character"
                    style={{
                      opacity:
                        characterOpacity,
                    }}
                  >
                    {character}
                  </span>
                );
              }
            )}
          </motion.div>
        );
      })}
    </div>
  );
}