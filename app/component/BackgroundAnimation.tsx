"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// ---- Seeded Random (Deterministic) ----
const seededRandom = (seed: number) => {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// ---- AI Core: The Neural Brain ----
// Dual-layer icosahedron. Solid inner core + wireframe outer shell.
// Represents AI/ML intelligence — organic yet geometrically precise.
function AICore() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    coreRef.current.rotation.y = t * 0.08;
    coreRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    wireRef.current.rotation.y = t * 0.08;
    wireRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <group position={[0, 0.2, -1]}>
      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.15}>
        {/* Inner Core — Solid, glowing */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.1, 2]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.6}
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={0.95}
          />
        </mesh>
        {/* Outer Shell — Wireframe neural connections */}
        <mesh ref={wireRef} scale={[1.2, 1.2, 1.2]}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      </Float>
    </group>
  );
}

// ---- Orbital Infrastructure Rings ----
// Three precision rings at different axes and speeds.
// Represents the layered discipline of full-stack engineering.
function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.025;
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.08;
    groupRef.current.rotation.z = Math.cos(t * 0.02) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, -1]}>
      {/* Ring 1 — Frontend Layer */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.0, 0.01, 16, 120]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </mesh>
      {/* Ring 2 — Backend Layer */}
      <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[2.5, 0.008, 16, 120]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.22} />
      </mesh>
      {/* Ring 3 — Data / DevOps Layer */}
      <mesh rotation={[Math.PI / 2.5, Math.PI / 8, 0]}>
        <torusGeometry args={[3.0, 0.006, 16, 120]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

// ---- Neural Constellation ----
// Distributed nodes with synaptic connections.
// Represents the networked intelligence of modern AI systems.
function NeuralConstellation() {
  const groupRef = useRef<THREE.Group>(null!);

  const { nodes, connections } = useMemo(() => {
    const rand = seededRandom(42);
    const count = 18;
    const positions: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 3.5 + rand() * 2.5;
      positions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi) - 3
        )
      );
    }

    const conn: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (positions[i].distanceTo(positions[j]) < 3.2) {
          conn.push([i, j]);
        }
      }
    }
    return { nodes: positions, connections: conn };
  }, []);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.004;
  });

  return (
    <group ref={groupRef}>
      {connections.map(([i, j], idx) => (
        <Line
          key={`synapse-${idx}`}
          points={[nodes[i], nodes[j]]}
          color="#06b6d4"
          lineWidth={0.5}
          transparent
          opacity={0.07}
        />
      ))}
      {nodes.map((pos, i) => (
        <Float
          key={`node-${i}`}
          speed={0.8 + (i % 4) * 0.3}
          rotationIntensity={0}
          floatIntensity={0.2}
        >
          <mesh position={pos}>
            <sphereGeometry args={[0.035 + (i % 3) * 0.015, 8, 8]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#3b82f6" : "#818cf8"}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ---- Infrastructure Grid ----
// A fading floor grid representing the solid foundation of engineering.
function InfrastructureGrid() {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (gridRef.current) {
      gridRef.current.position.z = -10 + Math.sin(t * 0.15) * 0.8;
    }
  });

  return (
    <group position={[0, -3.5, -6]} rotation={[0.15, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[50, 50, "#1e293b", "#0f172a"]}
      />
    </group>
  );
}

// ---- Data Dust ----
// Sparse ambient particles drifting through the void.
function DataDust() {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const rand = seededRandom(77);
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (rand() - 0.5) * 35;
      arr[i * 3 + 1] = (rand() - 0.5) * 35;
      arr[i * 3 + 2] = (rand() - 0.5) * 25 - 5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.003;
      pointsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.002) * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#38bdf8"
        size={0.03}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

// ---- Responsive Camera ----
// Automatically adjusts FOV and distance for mobile, tablet, and desktop.
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const w = size.width;
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    if (w < 768) {
      camera.position.z = 9;
      camera.fov = 70;
    } else if (w < 1024) {
      camera.position.z = 7.5;
      camera.fov = 62;
    } else {
      camera.position.z = 6.5;
      camera.fov = 55;
    }
    camera.updateProjectionMatrix();
  }, [size, camera]);

  return null;
}

function PauseCanvasOffscreen() {
  const { gl, setFrameloop } = useThree();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setFrameloop(entry.isIntersecting ? "always" : "never");
    }, { threshold: 0.1 });

    observer.observe(gl.domElement);
    return () => observer.disconnect();
  }, [gl, setFrameloop]);

  return null;
}

// ---- Main Background Component ----
export default function BackgroundAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        isolation: "isolate",
        background: "#020617",
      }}
    >
      {/* Sticky 3D Canvas — The 4K Viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas
          frameloop="never"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.5], fov: 55 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%" }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.3;
          }}
        >
          <color attach="background" args={["#020617"]} />
          <fog attach="fog" args={["#020617", 12, 28]} />

          {/* Cinematic Lighting */}
          <ambientLight intensity={0.15} />
          <pointLight position={[6, 6, 6]} intensity={0.6} color="#06b6d4" />
          <pointLight position={[-6, -4, 6]} intensity={0.35} color="#3b82f6" />
          <pointLight position={[0, 6, -6]} intensity={0.25} color="#6366f1" />
          <directionalLight position={[0, 4, 2]} intensity={0.2} color="#e2e8f0" />

          <ResponsiveCamera />
          <PauseCanvasOffscreen />

          <AICore />
          <OrbitalRings />
          <NeuralConstellation />
          <InfrastructureGrid />
          <DataDust />

          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.45}
              kernelSize={2}
              luminanceThreshold={0.8}
              luminanceSmoothing={0.15}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.4} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 
        MINIMAL OVERLAY — Crystal Clear Center
        Radial gradient: fully transparent in the center where the AI Core lives,
        only a whisper of darkening at the edges for text safety.
        This ensures your 4K 3D scene remains the hero on all devices.
      */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "-100vh",
          minHeight: "100vh",
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 55%, rgba(2, 6, 23, 0.25) 100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
