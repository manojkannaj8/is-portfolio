/**
 * Generated from "Festive Stars Among Sunlit Leaves": the hanging star
 * stickers, cut out of the photograph with a feathered rim of the real
 * leaves around them. Values are % of the photo (1671 x 941).
 * depth: 0.35 (far, small) to 1 (near, large).
 */
export interface CanopyStar {
  id: string
  kind: 'red' | 'gold' | 'blue' | 'pale'
  x: number
  y: number
  w: number
  h: number
  cx: number
  cy: number
  depth: number
  period: number
  phase: number
}

export const CANOPY = {
  width: 1671,
  height: 941,
  avif: '/world/canopy-base.avif',
  webp: '/world/canopy-base.webp',
}

export const canopyStars: CanopyStar[] = [
  { id: 's0', kind: 'gold', x: 26.032, y: 34.219, w: 8.378, h: 13.39, cx: 30.12, cy: 40.58, depth: 1.0, period: 4.51, phase: 0.95 },
  { id: 's1', kind: 'gold', x: 40.993, y: 75.452, w: 7.72, h: 11.265, cx: 45.12, cy: 80.77, depth: 0.92, period: 5.42, phase: 0.45 },
  { id: 's2', kind: 'gold', x: 16.637, y: 79.277, w: 6.224, h: 10.202, cx: 20.07, cy: 84.0, depth: 0.8, period: 5.1, phase: 2.3 },
  { id: 's3', kind: 'gold', x: 64.333, y: 59.192, w: 5.745, h: 10.202, cx: 66.91, cy: 64.53, depth: 0.8, period: 3.76, phase: 3.19 },
  { id: 's4', kind: 'blue', x: 47.457, y: 8.714, w: 5.865, h: 10.096, cx: 50.58, cy: 13.21, depth: 0.8, period: 3.7, phase: 2.72 },
  { id: 's5', kind: 'red', x: 31.059, y: 90.223, w: 6.224, h: 9.777, cx: 34.12, cy: 94.83, depth: 0.79, period: 3.8, phase: 0.57 },
  { id: 's6', kind: 'red', x: 54.758, y: 72.157, w: 6.044, h: 9.458, cx: 57.71, cy: 76.56, depth: 0.77, period: 4.79, phase: 5.19 },
  { id: 's7', kind: 'gold', x: 72.412, y: 42.402, w: 5.506, h: 9.777, cx: 74.88, cy: 47.57, depth: 0.76, period: 3.95, phase: 1.4 },
  { id: 's8', kind: 'gold', x: 36.864, y: 0.0, w: 5.805, h: 9.564, cx: 39.85, cy: 4.57, depth: 0.76, period: 5.36, phase: 5.95 },
  { id: 's9', kind: 'blue', x: 18.073, y: 0.319, w: 5.147, h: 8.927, cx: 20.54, cy: 4.82, depth: 0.72, period: 5.22, phase: 2.49 },
  { id: 's10', kind: 'red', x: 61.819, y: 36.982, w: 5.087, h: 8.502, cx: 64.29, cy: 41.04, depth: 0.69, period: 6.33, phase: 0.29 },
  { id: 's11', kind: 'red', x: 40.036, y: 46.971, w: 5.087, h: 7.97, cx: 42.51, cy: 50.7, depth: 0.68, period: 6.0, phase: 1.82 },
  { id: 's12', kind: 'pale', x: 53.202, y: 6.376, w: 5.386, h: 7.97, cx: 56.19, cy: 10.32, depth: 0.68, period: 4.0, phase: 0.74 },
  { id: 's13', kind: 'gold', x: 58.887, y: 84.485, w: 4.967, h: 8.183, cx: 61.22, cy: 88.65, depth: 0.68, period: 4.46, phase: 5.13 },
  { id: 's14', kind: 'red', x: 81.329, y: 84.272, w: 5.147, h: 8.502, cx: 83.95, cy: 88.52, depth: 0.67, period: 4.11, phase: 3.65 },
  { id: 's15', kind: 'gold', x: 63.196, y: 61.318, w: 4.548, h: 8.077, cx: 65.83, cy: 64.93, depth: 0.66, period: 5.39, phase: 2.34 },
  { id: 's16', kind: 'blue', x: 47.935, y: 50.266, w: 4.907, h: 7.97, cx: 50.41, cy: 54.19, depth: 0.65, period: 5.13, phase: 0.39 },
  { id: 's17', kind: 'gold', x: 50.269, y: 61.318, w: 4.668, h: 8.183, cx: 52.53, cy: 65.31, depth: 0.65, period: 3.77, phase: 1.29 },
  { id: 's18', kind: 'red', x: 33.992, y: 63.656, w: 4.967, h: 7.651, cx: 36.57, cy: 67.28, depth: 0.65, period: 5.51, phase: 2.69 },
  { id: 's19', kind: 'blue', x: 43.686, y: 24.336, w: 4.728, h: 7.758, cx: 45.97, cy: 28.12, depth: 0.64, period: 4.48, phase: 3.68 },
  { id: 's20', kind: 'gold', x: 26.152, y: 61.955, w: 4.548, h: 6.908, cx: 28.34, cy: 65.43, depth: 0.64, period: 4.87, phase: 1.88 },
  { id: 's21', kind: 'gold', x: 51.107, y: 37.938, w: 4.728, h: 7.651, cx: 53.32, cy: 41.81, depth: 0.64, period: 5.82, phase: 4.39 },
  { id: 's22', kind: 'gold', x: 90.066, y: 20.616, w: 4.249, h: 7.014, cx: 92.19, cy: 23.97, depth: 0.64, period: 4.28, phase: 3.61 },
  { id: 's23', kind: 'gold', x: 81.927, y: 70.351, w: 4.369, h: 7.333, cx: 84.04, cy: 74.09, depth: 0.63, period: 5.07, phase: 5.5 },
  { id: 's24', kind: 'red', x: 27.469, y: 16.047, w: 4.309, h: 6.801, cx: 29.65, cy: 19.63, depth: 0.6, period: 5.64, phase: 1.81 },
  { id: 's25', kind: 'blue', x: 57.75, y: 68.013, w: 4.428, h: 7.333, cx: 60.08, cy: 71.58, depth: 0.59, period: 6.34, phase: 0.74 },
  { id: 's26', kind: 'red', x: 14.004, y: 6.589, w: 4.189, h: 7.226, cx: 16.1, cy: 10.15, depth: 0.59, period: 4.77, phase: 4.75 },
  { id: 's27', kind: 'gold', x: 67.504, y: 91.392, w: 4.129, h: 6.801, cx: 69.54, cy: 94.86, depth: 0.57, period: 4.03, phase: 3.07 },
  { id: 's28', kind: 'red', x: 57.63, y: 14.878, w: 4.01, h: 6.589, cx: 59.64, cy: 18.26, depth: 0.56, period: 3.71, phase: 4.2 },
  { id: 's29', kind: 'blue', x: 16.756, y: 48.672, w: 3.83, h: 6.589, cx: 18.66, cy: 51.96, depth: 0.55, period: 5.74, phase: 3.6 },
  { id: 's30', kind: 'gold', x: 81.688, y: 17.641, w: 3.83, h: 6.376, cx: 83.53, cy: 20.64, depth: 0.55, period: 6.05, phase: 1.97 },
  { id: 's31', kind: 'gold', x: 13.645, y: 90.329, w: 3.471, h: 6.376, cx: 15.43, cy: 93.51, depth: 0.52, period: 5.55, phase: 3.73 },
  { id: 's32', kind: 'gold', x: 84.081, y: 23.592, w: 3.411, h: 5.739, cx: 85.84, cy: 26.43, depth: 0.5, period: 5.22, phase: 2.86 },
  { id: 's33', kind: 'gold', x: 53.86, y: 5.313, w: 3.531, h: 6.057, cx: 55.66, cy: 8.32, depth: 0.48, period: 5.95, phase: 5.93 },
]

export const starSrc = (id: string) => `/world/canopy/${id}.webp`
