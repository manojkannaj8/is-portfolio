/**
 * Geometry of the hero photograph ("Golden Hour Chalk Garden").
 * Doodle sprites were cut from the photo itself (public/world/doodles),
 * so at rest they sit pixel-for-pixel on top of the original chalk.
 * All values are percentages of the photo's width / height.
 */
import type { DoodleId } from '../content/types'

export const PHOTO = {
  width: 1672,
  height: 941,
  avif: '/world/garden.avif',
  webp: '/world/garden.webp',
  /** Where the shoes are, used to centre narrow screens and anchor "you are here". */
  shoes: { x: 51.2, y: 45 },
}

type Kind = 'flower' | 'spiral' | 'star' | 'spark' | 'dot'

export interface Sprite {
  id: string
  kind: Kind
  x: number
  y: number
  w: number
  h: number
  cx: number
  cy: number
}

/** The six large doodles, which open chapters. */
export interface DoorSprite extends Sprite {
  id: DoodleId
  /** Chalk colour of the doodle, for its glow and label. */
  ink: string
  /** Which side of the doodle its label is written on. */
  side: 'right' | 'left' | 'below' | 'above'
  /** Order the doodle lights up during the entrance. */
  order: number
}

export const doors: DoorSprite[] = [
  { id: 'flower-centre', kind: 'flower', x: 51.79, y: 18.28, w: 10.83, h: 12.96, cx: 55.71, cy: 24.69, ink: 'var(--coral)', side: 'right', order: 0 },
  { id: 'spiral-teal', kind: 'spiral', x: 26.56, y: 12.96, w: 14.89, h: 21.15, cx: 32.49, cy: 23.88, ink: 'var(--teal)', side: 'right', order: 2 },
  { id: 'flower-left', kind: 'flower', x: 13.76, y: 60.89, w: 9.27, h: 15.73, cx: 18.56, cy: 68.59, ink: 'var(--coral)', side: 'right', order: 4 },
  { id: 'star-big', kind: 'star', x: 15.55, y: 33.69, w: 16.93, h: 25.5, cx: 24.05, cy: 46.88, ink: 'var(--sun)', side: 'right', order: 1 },
  { id: 'flower-green', kind: 'flower', x: 68.36, y: 43.15, w: 14.35, h: 14.13, cx: 74.12, cy: 50.3, ink: 'var(--lime)', side: 'below', order: 3 },
  { id: 'spiral-sun', kind: 'spiral', x: 66.93, y: 2.02, w: 17.64, h: 30.82, cx: 75.48, cy: 15.93, ink: 'var(--sun)', side: 'left', order: 5 },
]

/** Small marks: sparkles, dots and the little pink star. They twinkle toward the light. */
export const marks: Sprite[] = [
  { id: 'flower-top', kind: 'flower', x: 35.35, y: 2.44, w: 5.62, h: 9.46, cx: 38.16, cy: 7.37 },
  { id: 'star-pink', kind: 'star', x: 75.48, y: 34.01, w: 6.1, h: 9.35, cx: 78.61, cy: 38.68 },
  { id: 'sp1', kind: 'spark', x: 19.98, y: 3.19, w: 3.23, h: 6.16, cx: 21.62, cy: 6.19 },
  { id: 'sp2', kind: 'spark', x: 19.8, y: 13.07, w: 3.71, h: 7.86, cx: 21.7, cy: 17.1 },
  { id: 'sp3', kind: 'spark', x: 19.74, y: 24.12, w: 2.87, h: 5.53, cx: 21.16, cy: 26.93 },
  { id: 'sp4', kind: 'spark', x: 0.84, y: 24.65, w: 3.17, h: 5.1, cx: 2.5, cy: 27.29 },
  { id: 'sp5', kind: 'spark', x: 45.87, y: 29.01, w: 3.29, h: 6.8, cx: 47.52, cy: 32.41 },
  { id: 'sp6', kind: 'spark', x: 47.73, y: 9.88, w: 3.29, h: 5.63, cx: 49.36, cy: 12.64 },
  { id: 'sp7', kind: 'spark', x: 58.01, y: 2.76, w: 3.41, h: 6.59, cx: 59.68, cy: 6.04 },
  { id: 'sp8', kind: 'spark', x: 62.38, y: 8.82, w: 3.29, h: 7.44, cx: 63.99, cy: 12.57 },
  { id: 'sp9', kind: 'spark', x: 64.47, y: 35.92, w: 3.35, h: 5.63, cx: 66.15, cy: 38.72 },
  { id: 'sp10', kind: 'spark', x: 71.83, y: 66.31, w: 2.93, h: 5.84, cx: 73.28, cy: 69.23 },
  { id: 'sp11', kind: 'spark', x: 79.37, y: 70.78, w: 3.35, h: 7.23, cx: 81.02, cy: 74.45 },
  { id: 'sp12', kind: 'spark', x: 11.24, y: 78.32, w: 3.23, h: 6.06, cx: 12.84, cy: 81.39 },
  { id: 'dot1', kind: 'dot', x: 16.33, y: 34.22, w: 2.39, h: 3.93, cx: 17.51, cy: 36.16 },
  { id: 'dot2', kind: 'dot', x: 26.97, y: 67.8, w: 2.51, h: 4.14, cx: 28.2, cy: 69.86 },
  { id: 'dot3', kind: 'dot', x: 61.48, y: 30.18, w: 2.45, h: 3.93, cx: 62.69, cy: 32.11 },
  { id: 'dot4', kind: 'dot', x: 76.79, y: 58.66, w: 2.57, h: 4.68, cx: 78.01, cy: 60.87 },
  { id: 'dot5', kind: 'dot', x: 84.57, y: 21.57, w: 2.45, h: 3.93, cx: 85.78, cy: 23.45 },
]

export const spriteSrc = (id: string) => `/world/doodles/${id}.webp`

/** The chalk colours that already exist in the photograph. */
export const CHALKS = [
  { id: 'sun', label: 'yellow', value: '#f4c430' },
  { id: 'coral', label: 'coral', value: '#f06a3c' },
  { id: 'teal', label: 'teal', value: '#6cc3b5' },
  { id: 'pink', label: 'pink', value: '#f39ab0' },
  { id: 'lime', label: 'lime', value: '#a6d13d' },
  { id: 'chalk', label: 'white', value: '#f7f1e1' },
] as const
