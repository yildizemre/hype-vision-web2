/**
 * Photo-based scroll story. All coordinates are % of the source image
 * (1672×941, 16:9) so overlays stay glued to people/objects at any zoom.
 */
export const C = {
  bg: '#050607',
  text: '#F5F7FA',
  muted: '#8D96A0',
  ai: '#16C7D6',
  ok: '#38D996',
  warn: '#FFB020',
  crit: '#FF4141',
}

export const RATIO = 1672 / 941
export const img = (n: string) => `/scenes/${n}.webp`

/** Transition half-width in scroll progress. */
export const T = 0.025

export type SceneId = 'hero' | 'fall' | 'fire' | 'fork' | 'prod' | 'work' | 'exit' | 'ppe' | 'intel'

export type Scene = {
  id: SceneId
  range: [number, number]
  img: string
  after?: string // second frame crossfaded in mid-scene (event happens)
  focus: [number, number] // zoom origin, % of image
  cam?: { id: string; label: string }
}

export const SCENES: Scene[] = [
  { id: 'hero', range: [0, 0.05], img: img('00-genel'), focus: [41, 47] },
  { id: 'fall', range: [0.1, 0.18], img: img('02a-dusme-once'), after: img('02b-dusme-sonra'), focus: [42, 55], cam: { id: 'CAM-07', label: 'Assembly aisle · Zone B' } },
  { id: 'fire', range: [0.23, 0.31], img: img('03a-yangin-once'), after: img('03b-yangin-sonra'), focus: [56, 32], cam: { id: 'CAM-02', label: 'Chemical storage' } },
  { id: 'fork', range: [0.36, 0.43], img: img('04-forklift'), focus: [48, 50], cam: { id: 'CAM-04', label: 'Loading dock · Lane 2' } },
  { id: 'prod', range: [0.48, 0.55], img: img('05-uretim-hatti'), focus: [52, 55], cam: { id: 'CAM-03', label: 'Line 1 · Conveyor' } },
  { id: 'work', range: [0.6, 0.66], img: img('06-cnc-istasyon'), focus: [59, 55], cam: { id: 'CAM-12', label: 'CNC cell 05' } },
  { id: 'exit', range: [0.71, 0.77], img: img('07-acil-cikis'), focus: [48, 45], cam: { id: 'CAM-11', label: 'North emergency exit' } },
  { id: 'ppe', range: [0.82, 0.87], img: img('08-kkd'), focus: [50, 48], cam: { id: 'CAM-09', label: 'Quality control · Gate 3' } },
  { id: 'intel', range: [0.91, 1.2], img: img('01-kusbakisi'), focus: [50, 50] },
]

export const sc = (id: SceneId) => SCENES.find((s) => s.id === id)!
/** Point inside a scene's dwell window: 0 = start, 1 = end. */
export const at = (id: SceneId, k: number) => {
  const [a, b] = sc(id).range
  return a + (b - a) * k
}

export const FINAL: [number, number] = [0.94, 0.985]

/** Top-down plan zones (image %), polygons for the intelligence layer. */
export const ZONES = [
  { id: 'CHEMICAL STORAGE', pts: '17,1 31,1 31,18 17,18', color: C.crit, metric: 'Fire alert · CAM-02', lx: 24, ly: 9 },
  { id: 'PRODUCTION', pts: '30,9 77,9 77,50 30,50', color: C.ai, metric: 'Efficiency 94%', lx: 53, ly: 30 },
  { id: 'LINE 1', pts: '25,51 75,51 75,61 25,61', color: C.ai, metric: '1,284 products', lx: 50, ly: 56 },
  { id: 'WAREHOUSE', pts: '79,5 99,5 99,74 79,74', color: C.ai, metric: 'Racks 82%', lx: 89, ly: 40 },
  { id: 'LOADING DOCK', pts: '5,22 23,22 23,72 5,72', color: C.warn, metric: 'Near miss · CAM-04', lx: 14, ly: 47 },
  { id: 'QUALITY CONTROL', pts: '53,79 81,79 81,98 53,98', color: C.ok, metric: 'PPE 96%', lx: 67, ly: 88 },
] as const
