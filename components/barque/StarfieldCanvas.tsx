"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  barquePoints,
  BARQUE_POINT_COUNT,
  ambientStars,
} from "./barque-geometry";
import { forecasts, backtests, type Resolution } from "@/lib/barque-data";

/**
 * Colors, tuned against The Compound palette (cream #F4F1EB, sage #3B5D4F).
 * These are Three.js Color instances so we construct them once.
 */
const COLOR_AMBIENT = new THREE.Color("#C9B98A"); // warm brass
const COLOR_AMBIENT_DIM = new THREE.Color("#7A6B55");
const COLOR_PENDING = new THREE.Color("#8FB4A4"); // sage-soft, breathing
const COLOR_TRUE = new THREE.Color("#F4F1EB"); // cream white — resolved true
const COLOR_FALSE = new THREE.Color("#8B4A3A"); // muted rust — resolved false
const COLOR_UNBOUND = new THREE.Color("#B8A680"); // boat stars with no data yet

/**
 * Map a forecast/backtest status to a star color.
 */
function colorForResolution(res: Resolution | "true" | "false"): THREE.Color {
  if (res === "pending") return COLOR_PENDING;
  if (res === "true") return COLOR_TRUE;
  return COLOR_FALSE;
}

/**
 * Build the boat-stars array, one star per point in the barque silhouette.
 * The first (forecasts + backtests).length stars are data-bound; the rest
 * are "unbound" constellation filler.
 */
function buildBoatStars() {
  const points = barquePoints();
  const bound = [...forecasts, ...backtests];
  return points.map((position, i) => {
    if (i < bound.length) {
      const record = bound[i];
      const res =
        "resolution" in record
          ? (record.resolution as Resolution)
          : (record.outcome as "true" | "false");
      return {
        position,
        color: colorForResolution(res),
        size: 0.08,
        bound: true,
        pulsing: res === "pending",
      };
    }
    return {
      position,
      color: COLOR_UNBOUND,
      size: 0.055,
      bound: false,
      pulsing: false,
    };
  });
}

function Ambient() {
  const count = 340;
  const positions = useMemo(() => {
    const arr = ambientStars(count, 7);
    const flat = new Float32Array(count * 3);
    arr.forEach((p, i) => {
      flat[i * 3] = p[0];
      flat[i * 3 + 1] = p[1];
      flat[i * 3 + 2] = p[2];
    });
    return flat;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Mix between ambient and dim for depth variation
      const mix = Math.random();
      const c = COLOR_AMBIENT.clone().lerp(COLOR_AMBIENT_DIM, mix * 0.7);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = 0.012 + Math.random() * 0.03;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.z += dt * 0.004; // very slow drift
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function BoatConstellation() {
  const stars = useMemo(buildBoatStars, []);
  const group = useRef<THREE.Group>(null);

  // Per-star pulse phases so pending stars breathe out of sync
  const phases = useMemo(
    () => stars.map(() => Math.random() * Math.PI * 2),
    [stars]
  );

  // Base offset — the barque sails in the upper portion of the viewport
  // so it doesn't collide with headline/body text that anchors lower.
  const BASE_Y = 0.9;

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    // Very subtle vertical bob, as if riding waves — around BASE_Y
    group.current.position.y = BASE_Y + Math.sin(t * 0.25) * 0.04;
    group.current.rotation.z = Math.sin(t * 0.12) * 0.015;

    // Pulse the pending stars
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (stars[i]?.pulsing) {
        const pulse = 0.75 + 0.25 * Math.sin(t * 1.2 + phases[i]);
        mat.opacity = pulse;
        mesh.scale.setScalar(0.9 + 0.2 * pulse);
      }
    });
  });

  return (
    <group ref={group}>
      {stars.map((star, i) => (
        <mesh key={i} position={star.position}>
          <sphereGeometry args={[star.size, 12, 12]} />
          <meshBasicMaterial
            color={star.color}
            transparent
            opacity={star.bound ? 1.0 : 0.85}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function ConstellationLines() {
  // Connect adjacent hull points to suggest the outline of the ship.
  // Uses a faint sage line that will bloom softly. Shares BASE_Y offset
  // with BoatConstellation so lines and stars move together.
  const BASE_Y = 0.9;
  const lineGeometry = useMemo(() => {
    const points = barquePoints();
    const segments: THREE.Vector3[] = [];
    // Hull (0..23) — connect sequentially
    for (let i = 0; i < 23; i++) {
      segments.push(new THREE.Vector3(...points[i]));
      segments.push(new THREE.Vector3(...points[i + 1]));
    }
    // Sun disc (44..59) — connect as a ring
    const sunStart = 44;
    for (let i = 0; i < 16; i++) {
      segments.push(new THREE.Vector3(...points[sunStart + i]));
      segments.push(
        new THREE.Vector3(...points[sunStart + ((i + 1) % 16)])
      );
    }
    const geo = new THREE.BufferGeometry().setFromPoints(segments);
    return geo;
  }, []);

  return (
    <lineSegments geometry={lineGeometry} position={[0, BASE_Y, 0]}>
      <lineBasicMaterial
        color="#3B5D4F"
        transparent
        opacity={0.24}
        toneMapped={false}
      />
    </lineSegments>
  );
}

export function StarfieldCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <Ambient />
      <ConstellationLines />
      <BoatConstellation />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.7}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
