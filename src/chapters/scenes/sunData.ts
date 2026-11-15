/**
 * Generated from "Wide Sunset Doodle Between Trees": the hand-drawn sun,
 * split into its scribbled core and eight rays, each with a feathered rim
 * of the real photo. Values are % of the photo (1672 x 941). ax/ay is the
 * point of each piece nearest the sun's centre, in % of the piece's box.
 */
export interface SunPart {
  id: string
  x: number
  y: number
  w: number
  h: number
  ax: number
  ay: number
  angle: number
}

export const SUNSET = {
  width: 1672,
  height: 941,
  avif: '/world/sunset-base.avif',
  webp: '/world/sunset-base.webp',
  /** centre of the drawn sun */
  sun: { x: 46.95, y: 49.95 },
}

export const sunParts: SunPart[] = [
  { id: 'core', x: 34.51, y: 28.055, w: 23.804, h: 45.271, ax: 52.3, ay: 42.7, angle: 114.5 },
  { id: 'ray0', x: 59.33, y: 46.546, w: 14.115, h: 10.627, ax: 7.6, ay: 53.0, angle: 3.1 },
  { id: 'ray1', x: 52.811, y: 62.593, w: 15.789, h: 22.21, ax: 6.8, ay: 28.2, angle: 43.2 },
  { id: 'ray2', x: 45.634, y: 70.563, w: 6.818, h: 26.78, ax: 35.1, ay: 7.1, angle: 84.8 },
  { id: 'ray3', x: 28.05, y: 70.138, w: 11.663, h: 21.254, ax: 89.2, ay: 11.0, angle: 127.8 },
  { id: 'ray4', x: 22.189, y: 48.672, w: 13.517, h: 10.521, ax: 91.6, ay: 21.2, angle: 173.4 },
  { id: 'ray5', x: 25.0, y: 18.385, w: 11.483, h: 20.404, ax: 89.6, ay: 81.2, angle: -142.9 },
  { id: 'ray6', x: 46.531, y: 0.531, w: 7.895, h: 25.505, ax: 34.8, ay: 92.1, angle: -80.9 },
  { id: 'ray7', x: 57.835, y: 17.641, w: 12.56, h: 17.003, ax: 11.9, ay: 88.1, angle: -38.5 },
]

export const sunSrc = (id: string) => `/world/sun/${id}.webp`
