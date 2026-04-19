/**
 * Egyptian solar barque — the constellation of stars that forms the ship.
 *
 * Coordinate system: x horizontal, y vertical, z depth (unused for 2D shape).
 * Normalized roughly to fit in [-2.2, 2.2] × [-1.2, 1.5]. The Canvas scales
 * the viewport to match.
 *
 * The shape has four parts:
 *   1. Hull      — the shallow curved bowl along the bottom
 *   2. Prow      — Hathor-head curl at the left
 *   3. Stern     — papyrus-reed curl at the right, rising taller
 *   4. Sun disc  — the disc of Ra above the center
 *
 * Each point is a star. When bound to forecast data, the first N points
 * (in order: hull → prow → stern → sun) receive resolution colors.
 */

export type Vec3 = [number, number, number];

const HULL_POINTS = 24;
const PROW_POINTS = 9;
const STERN_POINTS = 11;
const SUN_POINTS = 16;

function hull(): Vec3[] {
  const pts: Vec3[] = [];
  // Cosine-curve bowl dipping in the middle.
  // x from -1.9 to 1.9; y = -0.35 - 0.45 * (1 - cos(πt/2))
  for (let i = 0; i < HULL_POINTS; i++) {
    const t = -1 + (2 * i) / (HULL_POINTS - 1); // -1..1
    const x = t * 1.9;
    const y = -0.35 - 0.45 * (1 - Math.cos((Math.PI * t) / 2));
    pts.push([x, y, 0]);
  }
  return pts;
}

function prow(): Vec3[] {
  // Left curl — tip of the barque rises and curls inward (Hathor head).
  return [
    [-1.9, -0.35, 0],
    [-2.05, -0.12, 0],
    [-2.15, 0.13, 0],
    [-2.12, 0.36, 0],
    [-1.96, 0.5, 0],
    [-1.74, 0.5, 0],
    [-1.58, 0.38, 0],
    [-1.54, 0.2, 0],
    [-1.6, 0.04, 0],
  ];
}

function stern(): Vec3[] {
  // Right papyrus-reed column, rising taller.
  return [
    [1.9, -0.35, 0],
    [2.05, -0.1, 0],
    [2.15, 0.18, 0],
    [2.2, 0.48, 0],
    [2.18, 0.78, 0],
    [2.1, 1.05, 0],
    [1.98, 1.28, 0],
    [1.82, 1.43, 0],
    [1.66, 1.45, 0],
    [1.56, 1.32, 0],
    [1.58, 1.12, 0],
  ];
}

function sunDisc(): Vec3[] {
  // Ra — circle centered at (0, 0.62), radius 0.3
  const pts: Vec3[] = [];
  const cx = 0;
  const cy = 0.62;
  const r = 0.3;
  for (let i = 0; i < SUN_POINTS; i++) {
    const a = (i / SUN_POINTS) * Math.PI * 2;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a), 0]);
  }
  return pts;
}

/**
 * Full barque geometry, in assembly order:
 *   hull (0..23) → prow (24..32) → stern (33..43) → sun (44..59)
 * Total 60 points.
 */
export function barquePoints(): Vec3[] {
  return [...hull(), ...prow(), ...stern(), ...sunDisc()];
}

export const BARQUE_POINT_COUNT =
  HULL_POINTS + PROW_POINTS + STERN_POINTS + SUN_POINTS;

/**
 * Ambient background starfield — uniformly distributed in a rectangle
 * that sits behind the barque, with randomized z-depth for parallax.
 */
export function ambientStars(count: number, seed = 1): Vec3[] {
  // Simple deterministic PRNG so SSR and CSR agree on positions.
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const pts: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * 10; // -5..5
    const y = (rand() - 0.5) * 6; // -3..3
    const z = (rand() - 0.5) * 2; // -1..1 (parallax depth)
    pts.push([x, y, z]);
  }
  return pts;
}
