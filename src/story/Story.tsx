import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { path, useLang, useT } from '../i18n'
import { C, FINAL, RATIO, SCENES, T, ZONES, at, sc, type Scene, type SceneId } from './scenes'

const P = createContext<MotionValue<number>>(null!)
const useP = () => useContext(P)
const CAM_SCENES = SCENES.filter((s) => s.cam)

export default function Story() {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 })
  useEffect(() => {
    if (import.meta.env.DEV) (window as unknown as { __p: MotionValue<number> }).__p = p
  }, [p])

  // final: the plant shrinks into the platform's live tile
  const k = useTransform(p, FINAL, [0, 1], { clamp: true })
  const stageScale = useTransform(k, [0, 1], [1, 0.58])
  const stageX = useTransform(k, [0, 1], ['0vw', '19vw'])
  const stageY = useTransform(k, [0, 1], ['0vh', '3vh'])
  const radius = useTransform(k, [0, 1], [0, 14])
  const chromeOpacity = useTransform(k, [0.3, 1], [0, 1])
  const chromeEvents = useTransform(k, (v) => (v > 0.6 ? 'auto' : 'none'))

  return (
    <P.Provider value={p}>
      <section ref={track} style={{ height: '1100vh', background: C.bg }}>
        <div className="sticky top-0 h-svh overflow-hidden" style={{ background: C.bg }}>
          <motion.div style={{ opacity: chromeOpacity, pointerEvents: chromeEvents }} className="absolute inset-0 z-10">
            <PlatformChrome />
          </motion.div>
          <motion.div
            style={{ scale: stageScale, x: stageX, y: stageY, borderRadius: radius }}
            className="absolute inset-0 origin-center overflow-hidden bg-black outline outline-1 outline-white/10"
          >
            {SCENES.map((s) => (
              <SceneLayer key={s.id} s={s} />
            ))}
            {CAM_SCENES.map((s) => (
              <SwitchFx key={s.id} s={s} />
            ))}
            <Grain />
          </motion.div>
          <Copy />
          <Rail />
        </div>
      </section>
    </P.Provider>
  )
}

/* ───────────── Scene layer: fly-in / dwell / fly-out ───────────── */

function SceneLayer({ s }: { s: Scene }) {
  const p = useP()
  const [a, b] = s.range
  const first = s.id === 'hero'
  const last = s.id === 'intel'
  // incoming fades in over the outgoing frame while it is still diving → no black gap
  const opacity = useTransform(p, [a - T * 1.5, a - T * 0.4, b + T * 1.6, b + T * 1.9], [first ? 1 : 0, 1, 1, last ? 1 : 0])
  // enter zoomed-in (arriving through the previous camera), settle, slow push, dive out
  const scale = useTransform(p, [a - T * 1.5, a, b, b + T * 1.9], [first ? 1 : 1.5, 1.02, 1.1, last ? 1.1 : 2.6])
  const blur = useTransform(p, [a - T * 1.5, a - T * 0.3, b + T * 0.4, b + T * 1.9], [first ? 0 : 12, 0, 0, last ? 0 : 18])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)
  // slow lateral drift while dwelling feels like a live, slightly moving camera
  const drift = useTransform(p, [a, b], ['0.6%', '-0.6%'])
  const afterOpacity = useTransform(p, [at(s.id, 0.3), at(s.id, 0.42)], [0, 1])
  const visibility = useTransform(p, (v) => ((v > a - T * 1.6 && v < b + T * 2) || (first && v < b) || (last && v > a - T) ? 'visible' : 'hidden'))
  const cctv = !!s.cam
  const imgFilter = cctv ? 'saturate(.82) contrast(1.06)' : undefined

  return (
    <motion.div style={{ opacity, visibility }} className="absolute inset-0">
      <motion.div style={{ scale, filter, x: drift, transformOrigin: `${s.focus[0]}% ${s.focus[1]}%` }} className="absolute inset-0">
        <Cover>
          <img src={s.img} alt="" className="absolute inset-0 h-full w-full" style={{ filter: imgFilter }} fetchPriority={first ? 'high' : 'auto'} />
          {s.after && <motion.img src={s.after} alt="" style={{ opacity: afterOpacity, filter: imgFilter }} className="absolute inset-0 h-full w-full" />}
          <SceneOverlays id={s.id} />
        </Cover>
      </motion.div>
      {cctv && <CctvHud s={s} />}
    </motion.div>
  )
}

/** Brief "switching camera" interference between scenes. */
function SwitchFx({ s }: { s: Scene }) {
  const p = useP()
  const t = useT()
  const a = s.range[0]
  const o = useTransform(p, [a - T * 1.4, a - T * 0.9, a - T * 0.35, a - T * 0.05], [0, 1, 1, 0])
  const vis = useTransform(o, (v) => (v < 0.01 ? 'hidden' : 'visible'))
  const bar = useTransform(p, [a - T * 1.4, a - T * 0.05], ['-10%', '110%'])
  const idx = CAM_SCENES.indexOf(s)
  return (
    <motion.div style={{ opacity: o, visibility: vis }} className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 4px)' }} />
      <motion.div style={{ top: bar }} className="absolute inset-x-0 h-[14%] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/30 bg-black/60 px-5 py-3 text-center font-mono uppercase backdrop-blur-sm">
        <div className="text-[10px] tracking-[0.3em] text-white/60">{t.story.connecting}</div>
        <div className="mt-1 flex items-center justify-center gap-2 text-sm tracking-[0.2em] text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: C.ai }} />
          {s.cam!.id} · {t.story.cams[idx]}
        </div>
      </div>
    </motion.div>
  )
}

/** Box with the image's aspect ratio that always covers the viewport. */
function Cover({ children }: { children: ReactNode }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ aspectRatio: RATIO, width: `max(100vw, ${RATIO * 100}svh)` }}>
      {children}
    </div>
  )
}

/* ───────────── Overlay primitives (image % coordinates) ───────────── */

function useAppear(from: number, dur = 0.012, to?: number) {
  const p = useP()
  const o = useTransform(p, to ? [from, from + dur, to - 0.006, to] : [from, from + dur], to ? [0, 1, 1, 0] : [0, 1])
  const s = useTransform(p, [from, from + dur * 1.5], [1.25, 1])
  return { opacity: o, scale: s }
}

function Box({ x, y, w, h, color = C.ai, label, sub, from, to, thin }: { x: number; y: number; w: number; h: number; color?: string; label?: string; sub?: string; from: number; to?: number; thin?: boolean }) {
  const st = useAppear(from, 0.012, to)
  return (
    <motion.div style={{ ...st, left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} className="absolute">
      <div className="absolute inset-0" style={{ border: `${thin ? 1 : 1.5}px solid ${color}`, boxShadow: `0 0 16px ${color}66, inset 0 0 14px ${color}22` }} />
      {['-left-px -top-px border-l-2 border-t-2', '-right-px -top-px border-r-2 border-t-2', '-left-px -bottom-px border-l-2 border-b-2', '-right-px -bottom-px border-r-2 border-b-2'].map((k) => (
        <span key={k} className={`absolute h-2.5 w-2.5 ${k}`} style={{ borderColor: color }} />
      ))}
      {label && (
        <div className="absolute -top-[21px] left-[-1.5px] flex whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-wider">
          <span className="px-1.5 py-[3px] text-black" style={{ background: color }}>{label}</span>
          {sub && <span className="bg-black/75 px-1.5 py-[3px] text-white/85">{sub}</span>}
        </div>
      )}
    </motion.div>
  )
}

function Poly({ pts, color, from, fill = 0.12, dashed }: { pts: string; color: string; from: number; fill?: number; dashed?: boolean }) {
  const p = useP()
  const o = useTransform(p, [from, from + 0.012], [0, 1])
  return (
    <motion.svg style={{ opacity: o }} viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
      <polygon points={pts} fill={color} fillOpacity={fill} stroke={color} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeDasharray={dashed ? '6 4' : undefined} />
    </motion.svg>
  )
}

function Tag({ x, y, children, from, color = C.ai }: { x: number; y: number; children: ReactNode; from: number; color?: string }) {
  const st = useAppear(from)
  return (
    <motion.div style={{ ...st, left: `${x}%`, top: `${y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-wider">
      <span className="px-1.5 py-[3px] text-black" style={{ background: color }}>{children}</span>
    </motion.div>
  )
}

function Lines({ from, children }: { from: number; children: ReactNode }) {
  const st = useAppear(from)
  return (
    <motion.svg style={st} viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      {children}
    </motion.svg>
  )
}

/** Counter driven by scroll. */
function Num({ from, to, a, b, dec = 0, pad = 0, fmt }: { from: number; to: number; a: number; b: number; dec?: number; pad?: number; fmt?: (v: number) => string }) {
  const p = useP()
  const lang = useLang()
  const v = useTransform(p, [a, b], [from, to], { clamp: true })
  const loc = lang === 'tr' ? 'tr-TR' : 'en-US'
  const text = useTransform(v, (n) => (fmt ? fmt(n) : n.toLocaleString(loc, { minimumFractionDigits: dec, maximumFractionDigits: dec }).padStart(pad, '0')))
  return <motion.span className="tabular-nums">{text}</motion.span>
}
const mmss = (n: number) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(Math.floor(n % 60)).padStart(2, '0')}`

/* ───────────── Per-scene overlays ───────────── */

function SceneOverlays({ id }: { id: SceneId }) {
  const t = useT()
  switch (id) {
    case 'hero':
      return (
        <>
          <Box x={39.3} y={39.5} w={3} h={12.5} from={0.012} thin label="person" sub="0.94" />
          <Box x={23} y={59} w={4.4} h={16} from={0.018} thin label="person" sub="0.92" />
          <Box x={73.5} y={77} w={5.2} h={16} from={0.024} thin label="person" sub="0.95" />
          <Box x={85} y={37} w={3.2} h={11.5} from={0.03} thin label="person" sub="0.91" />
          <Box x={66} y={33} w={2.4} h={9} from={0.034} thin label="person" sub="0.90" />
          <Box x={80.5} y={28} w={4.5} h={9} from={0.038} thin color={C.warn} label="forklift" sub="0.93" />
        </>
      )
    case 'fall':
      return (
        <>
          <Box x={35.5} y={36.5} w={8} h={30} from={at('fall', 0.05)} to={at('fall', 0.36)} label="person" sub="walking" />
          <Box x={36.5} y={46} w={14} h={22} color={C.crit} from={at('fall', 0.5)} label={t.story.fall.k} sub="91%" />
          <Pulse x={43} y={57} from={at('fall', 0.5)} />
        </>
      )
    case 'fire':
      return (
        <>
          <Box x={31} y={26} w={39} h={38} thin from={at('fire', 0.08)} label={`zone · ${t.story.fire.zone}`} color={C.ok} />
          <FireFx />
          <Box x={47} y={14} w={22} h={32} color={C.crit} from={at('fire', 0.48)} label="Flame" sub="94%" />
          <Box x={39} y={0.5} w={32} h={24} color={C.warn} from={at('fire', 0.56)} label="Smoke" sub="91%" />
        </>
      )
    case 'fork':
      return (
        <>
          <Poly pts="40,56 56,52 63,66 44,74" color={C.crit} from={at('fork', 0.35)} fill={0.18} />
          <Box x={29.5} y={24} w={21.5} h={34} color={C.warn} from={at('fork', 0.08)} label="Forklift" sub="7.8 km/h" />
          <Box x={50} y={43.5} w={8.5} h={26} color={C.ai} from={at('fork', 0.16)} label="Person" />
          <Lines from={at('fork', 0.25)}>
            <line x1="50.5" y1="55" x2="53" y2="62" stroke={C.crit} strokeWidth={2} vectorEffect="non-scaling-stroke" strokeDasharray="5 4" />
          </Lines>
        </>
      )
    case 'prod':
      return (
        <>
          <ScanBeam />
          {(
            [
              [34.5, 22.5, 5.5, 8.5, '#0141'],
              [38.8, 31, 6, 9.5, '#0142'],
              [42.8, 38, 6.5, 9.5, '#0143'],
              [46.5, 46.5, 8.5, 13, '#0144'],
              [58, 69, 11, 18.5, '#0146'],
              [67, 85, 11.5, 15, '#0147'],
            ] as const
          ).map(([x, y, w, h, l], i) => (
            <Box key={l} x={x} y={y} w={w} h={h} thin from={at('prod', 0.08 + i * 0.07)} label={l} sub="tracked" />
          ))}
          <Box x={53} y={55.5} w={8} h={14} color={C.crit} from={at('prod', 0.55)} label="#0145 · defect" sub="porosity" />
          <Box x={60} y={43} w={9.5} h={26} color={C.ok} thin from={at('prod', 0.12)} label="operator" />
        </>
      )
    case 'work':
      return (
        <>
          <Poly pts="40,58 70,52 76,98 44,100" color={C.ai} from={at('work', 0.06)} fill={0.1} dashed />
          <Tag x={47} y={62} from={at('work', 0.1)}>ROI · Station 05</Tag>
          <Box x={53} y={37} w={12.5} h={44} from={at('work', 0.2)} label="Station 05" sub="active" />
          <Box x={60.5} y={42.5} w={6} h={8} color={C.ok} thin from={at('work', 0.35)} label="part" sub="cycle 01:28" />
        </>
      )
    case 'exit':
      return (
        <>
          <Poly pts="34,60 67,56 67,73 39,74" color={C.ok} from={at('exit', 0.08)} fill={0.14} dashed />
          <Tag x={52} y={70} from={at('exit', 0.12)} color={C.ok}>Keep clear · exit zone</Tag>
          <Box x={33.5} y={33.5} w={15} h={31} color={C.crit} from={at('exit', 0.3)} label="Pallet" sub="06:12" />
          <Box x={48.5} y={33} w={14.5} h={30} color={C.crit} from={at('exit', 0.38)} label="Pallet" sub="05:48" />
        </>
      )
    case 'ppe':
      return (
        <>
          <Box x={39} y={23} w={22.5} h={50} color={C.ok} thin from={at('ppe', 0.06)} label="person" sub="zone: QC" />
          <Box x={47} y={23.5} w={9} h={16} color={C.ok} from={at('ppe', 0.22)} label="Helmet ✓" />
          <Box x={42} y={41} w={16.5} h={30} color={C.ok} from={at('ppe', 0.34)} label="Vest ✓" />
          <Box x={45} y={58} w={15} h={12} color={C.crit} from={at('ppe', 0.48)} label="Gloves ✕" sub="96%" />
        </>
      )
    case 'intel':
      return (
        <>
          {ZONES.map((z, i) => (
            <Poly key={z.id} pts={z.pts} color={z.color} from={at('intel', 0) + i * 0.004} fill={0.14} />
          ))}
          <Lines from={at('intel', 0.15)}>
            {ZONES.filter((z) => z.id !== 'PRODUCTION').map((z) => (
              <line key={z.id} x1={53} y1={30} x2={z.lx} y2={z.ly} stroke={C.ai} strokeOpacity={0.7} strokeWidth={1} vectorEffect="non-scaling-stroke" strokeDasharray="5 5" className="animate-[dash_1.2s_linear_infinite]" />
            ))}
          </Lines>
          {ZONES.map((z, i) => (
            <ZoneLabel key={z.id} i={i} from={at('intel', 0.02) + i * 0.004} />
          ))}
        </>
      )
  }
}

function ZoneLabel({ i, from }: { i: number; from: number }) {
  const t = useT()
  const z = ZONES[i]
  const st = useAppear(from)
  return (
    <motion.div style={{ ...st, left: `${z.lx}%`, top: `${z.ly}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-black/70 px-2 py-1 text-center font-mono uppercase backdrop-blur-sm">
      <div className="text-[10px] tracking-[0.2em]" style={{ color: z.color }}>{t.story.zones[i]}</div>
      <div className="text-[11px] text-white">{t.story.zoneM[i]}</div>
    </motion.div>
  )
}

function Pulse({ x, y, from }: { x: number; y: number; from: number }) {
  const st = useAppear(from)
  return (
    <motion.div style={{ ...st, left: `${x}%`, top: `${y}%` }} className="absolute">
      <span className="absolute -left-16 -top-16 h-32 w-32 animate-ping rounded-full border-2" style={{ borderColor: C.crit }} />
      <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full" style={{ background: C.crit, boxShadow: `0 0 16px ${C.crit}` }} />
    </motion.div>
  )
}

/** Flicker glow + drifting smoke over the burning drums. */
function FireFx() {
  const p = useP()
  const o = useTransform(p, [at('fire', 0.3), at('fire', 0.45)], [0, 1])
  return (
    <motion.div style={{ opacity: o }} className="pointer-events-none absolute inset-0">
      <div className="absolute left-[40%] top-[5%] h-[55%] w-[38%] animate-[flicker_0.18s_steps(2)_infinite_alternate] rounded-full mix-blend-screen" style={{ background: 'radial-gradient(closest-side, rgba(255,140,40,.55), rgba(255,80,20,.15) 60%, transparent)' }} />
      <div className="absolute left-[20%] top-[25%] h-[70%] w-[75%] animate-[flicker_0.3s_steps(3)_infinite_alternate] mix-blend-soft-light" style={{ background: 'radial-gradient(closest-side, rgba(255,120,40,.5), transparent)' }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{ left: `${44 + i * 5}%`, top: '18%', width: '12%', height: '18%', background: 'rgba(30,30,32,.75)', animation: `smoke ${5 + i}s ${i * -1.3}s linear infinite` }}
        />
      ))}
    </motion.div>
  )
}

function ScanBeam() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 h-[2px] animate-[beam_3s_ease-in-out_infinite_alternate] shadow-[0_0_18px_4px_rgba(22,199,214,.6)]" style={{ background: C.ai }} />
    </div>
  )
}

/* ───────────── CCTV HUD (screen space) ───────────── */

function Clock() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(i)
  }, [])
  return <span className="tabular-nums">{t.toISOString().slice(0, 10)} {t.toTimeString().slice(0, 8)}</span>
}

function CctvHud({ s }: { s: Scene }) {
  const t = useT()
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 3px)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.55))' }} />
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/75 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="absolute inset-3 sm:inset-5">
        {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-l border-b', 'right-0 bottom-0 border-r border-b'].map((k) => (
          <span key={k} className={`absolute h-7 w-7 border-white/70 ${k}`} />
        ))}
        <div className="absolute left-4 top-16 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white drop-shadow sm:top-[4.5rem]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF4141]" /> REC · {s.cam!.id} · {t.story.cams[CAM_SCENES.indexOf(s)]}
        </div>
        <div className="absolute right-4 top-16 hidden font-mono text-[11px] text-white/85 drop-shadow sm:top-[4.5rem] sm:block"><Clock /></div>
        <div className="absolute bottom-3 right-4 hidden font-mono text-[10px] uppercase tracking-[0.15em] text-white/60 sm:block">RTSP · 2560×1440 · 25 fps · Edge 23 ms</div>
      </div>
    </div>
  )
}

/* ───────────── Screen-space copy ───────────── */

function Fade({ range, children, className = '' }: { range: [number, number]; children: ReactNode; className?: string }) {
  const p = useP()
  const [a, b] = range
  const o = useTransform(p, [a - 0.012, a + 0.004, b - 0.004, b + 0.012], [0, 1, 1, 0])
  const y = useTransform(p, [a - 0.012, a + 0.004], [24, 0])
  const vis = useTransform(o, (v) => (v < 0.01 ? 'hidden' : 'visible'))
  return <motion.div style={{ opacity: o, y, visibility: vis }} className={className}>{children}</motion.div>
}

function Badge({ children, color = C.crit }: { children: ReactNode; color?: string }) {
  return (
    <div className="inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em]" style={{ borderColor: color, color, background: `${color}1f` }}>
      <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: color }} />
      {children}
    </div>
  )
}

function Metrics({ title, color = C.ai, rows }: { title: string; color?: string; rows: [string, ReactNode][] }) {
  return (
    <div className="border-l bg-black/55 py-3 pl-4 pr-5 font-mono backdrop-blur-md" style={{ borderColor: color }}>
      <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color }}>{title}</div>
      <div className="mt-2.5 grid grid-cols-[auto_auto] gap-x-8 gap-y-1.5">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <span className="text-[11px] uppercase tracking-wider text-[#A9B2BC]">{k}</span>
            <span className="text-right text-[13px] text-white">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SceneCopy({ id, n, k, title, side = 'left', children, metrics }: { id: SceneId; n: string; k: string; title: string; side?: 'left' | 'right'; children?: ReactNode; metrics?: ReactNode }) {
  const left = side === 'left'
  return (
    <>
      <Fade range={sc(id).range} className={`absolute bottom-10 max-w-[21rem] sm:bottom-14 ${left ? 'left-5 sm:left-12' : 'right-5 text-right sm:right-12'}`}>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">{n} — {k}</div>
        <h2 className="mt-3 text-3xl font-medium uppercase leading-[0.95] tracking-[-0.02em] text-white drop-shadow-lg sm:text-[2.7rem]">{title}</h2>
        {children && <div className="mt-4 text-sm leading-relaxed text-white/80 drop-shadow">{children}</div>}
      </Fade>
      {metrics && (
        <Fade range={[at(id, 0.45), sc(id).range[1]]} className={`absolute top-[8.5rem] hidden md:block ${left ? 'right-12' : 'left-12'}`}>
          {metrics}
        </Fade>
      )}
    </>
  )
}

function Copy() {
  const t = useT().story
  const ok = <span style={{ color: C.ok }}>✓</span>
  const no = <span style={{ color: C.crit }}>✕</span>
  const fa = sc('fall').range, fi = sc('fire').range, pr = sc('prod').range, wo = sc('work').range, ex = sc('exit').range, pp = sc('ppe').range
  return (
    <div className="pointer-events-none absolute inset-0">
      <Fade range={[0, sc('hero').range[1]]} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
        <div className="absolute inset-x-5 bottom-[11vh] sm:inset-x-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: C.ai }}>{t.eyebrow}</div>
          <h1 className="mt-5 text-[12vw] font-medium uppercase leading-[0.88] tracking-[-0.045em] text-white sm:text-[6.4vw]">
            {t.h1a}<br />{t.h1b}<br /><span className="text-white/55">{t.h1c}</span>
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <p className="max-w-md text-[15px] text-white/80">{t.sub}</p>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              {t.scroll}
              <span className="relative h-10 w-px overflow-hidden bg-white/25"><span className="absolute inset-x-0 top-0 h-1/2 animate-[drop_1.8s_ease-in-out_infinite] bg-white" /></span>
            </div>
          </div>
        </div>
      </Fade>

      <SceneCopy id="fall" n="A.4" k={t.fall.k} title={t.fall.t}
        metrics={<Metrics title={t.fall.m} color={C.crit} rows={[[t.fall.rows[0], <Num from={0} to={12} a={at('fall', 0.5)} b={fa[1]} fmt={(v) => `00:${String(Math.floor(v)).padStart(2, '0')}`} />], [t.fall.rows[1], '1.4 s'], [t.fall.rows[2], t.fall.ch], [t.fall.rows[3], '±30 s']]} />}>
        <div className="mb-4"><Badge>{t.fall.badge}</Badge></div>
        {t.fall.body}
      </SceneCopy>

      <SceneCopy id="fire" n="A.5" k={t.fire.k} title={t.fire.t} side="right"
        metrics={<Metrics title={t.fire.m} color={C.crit} rows={[[t.fire.rows[0], '2.1 s'], [t.fire.rows[1], t.fire.zone], [t.fire.rows[2], t.fire.act], [t.fire.rows[3], <><Num from={6} to={0} a={at('fire', 0.5)} b={fi[1]} /> / 14</>]]} />}>
        <div className="mb-4 flex justify-end"><Badge>{t.fire.badge}</Badge></div>
        {t.fire.body}
      </SceneCopy>

      <SceneCopy id="fork" n="A.3" k={t.fork.k} title={t.fork.t}
        metrics={<Metrics title={t.fork.m} color={C.warn} rows={[[t.fork.rows[0], <span style={{ color: C.crit }}><Num from={4.6} to={1.2} a={at('fork', 0.2)} b={at('fork', 0.7)} dec={1} /> m</span>], [t.fork.rows[1], '3.0 m'], [t.fork.rows[2], '7.8 km/h'], [t.fork.rows[3], t.fork.act]]} />}>
        <div className="mb-4"><Badge color={C.warn}>{t.fork.badge}</Badge></div>
        {t.fork.body}
      </SceneCopy>

      <SceneCopy id="prod" n="C" k={t.prod.k} title={t.prod.t} side="right"
        metrics={<Metrics title={t.prod.m} rows={[[t.prod.rows[0], <Num from={1238} to={1284} a={pr[0]} b={pr[1]} />], [t.prod.rows[1], <><Num from={91} to={94.2} a={pr[0]} b={pr[1]} dec={1} />%</>], [t.prod.rows[2], <span style={{ color: C.crit }}><Num from={2} to={3} a={at('prod', 0.54)} b={at('prod', 0.56)} pad={2} /></span>], [t.prod.rows[3], '00:42']]} />}>
        {t.prod.body}
      </SceneCopy>

      <SceneCopy id="work" n="B" k={t.work.k} title={t.work.t}
        metrics={<Metrics title={t.work.m} rows={[[t.work.rows[0], <><Num from={80} to={87} a={wo[0]} b={wo[1]} />%</>], [t.work.rows[1], <Num from={500} to={522} a={wo[0]} b={wo[1]} fmt={mmss} />], [t.work.rows[2], '01:28'], [t.work.rows[3], '91%']]} />}>
        {t.work.body}
      </SceneCopy>

      <SceneCopy id="exit" n="A.2" k={t.exit.k} title={t.exit.t} side="right"
        metrics={<Metrics title={t.exit.m} color={C.crit} rows={[[t.exit.rows[0], <span style={{ color: C.crit }}><Num from={340} to={372} a={ex[0]} b={ex[1]} fmt={mmss} /></span>], [t.exit.rows[1], '02:00'], [t.exit.rows[2], t.exit.obj], [t.exit.rows[3], t.exit.who]]} />}>
        <div className="mb-4 flex justify-end"><Badge>{t.exit.badge}</Badge></div>
        {t.exit.body}
      </SceneCopy>

      <SceneCopy id="ppe" n="A.1" k={t.ppe.k} title={t.ppe.t}
        metrics={<Metrics title={t.ppe.m} color={C.ok} rows={[[t.ppe.rows[0], ok], [t.ppe.rows[1], ok], [t.ppe.rows[2], no], [t.ppe.rows[3], <><Num from={97.1} to={96.4} a={pp[0]} b={pp[1]} dec={1} />%</>]]} />}>
        {t.ppe.body}
      </SceneCopy>

      <Fade range={[at('intel', 0), FINAL[0] - 0.005]} className="absolute bottom-10 left-5 max-w-[22rem] sm:bottom-14 sm:left-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">{t.intel.k}</div>
        <h2 className="mt-3 text-3xl font-medium uppercase leading-[0.95] tracking-[-0.02em] text-white drop-shadow-lg sm:text-[2.7rem]">{t.intel.t}</h2>
      </Fade>
      <Fade range={[at('intel', 0), FINAL[0] - 0.005]} className="absolute right-5 top-24 hidden w-64 sm:right-12 md:block">
        <Metrics title={t.intel.m} rows={[[t.intel.rows[0], '32/32'], [t.intel.rows[1], '11'], [t.intel.rows[2], '96%'], [t.intel.rows[3], '94%'], [t.intel.rows[4], <span style={{ color: C.crit }}>04</span>]]} />
      </Fade>
    </div>
  )
}

/** Right-edge scene index, like the motorcycle reference. */
function Rail() {
  const p = useP()
  const [cur, setCur] = useState(0)
  useMotionValueEvent(p, 'change', (v) => {
    let i = 0
    SCENES.forEach((s, k) => {
      if (v >= s.range[0] - T) i = k
    })
    setCur(i)
  })
  const fill = useTransform(p, [0, 1], ['0%', '100%'])
  const o = useTransform(p, [FINAL[0], FINAL[1]], [1, 0])
  return (
    <motion.div style={{ opacity: o }} className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 sm:block">
      <div className="relative h-56 w-px bg-white/25">
        <motion.div style={{ height: fill }} className="absolute left-0 top-0 w-px bg-white" />
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-right font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
        {String(cur + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
      </div>
    </motion.div>
  )
}

/* ───────────── Final: platform UI ───────────── */

function PlatformChrome() {
  const t = useT().story.final
  const lang = useLang()
  const tiles = [
    ['02a-dusme-once', 'CAM-07', t.tiles[0], C.crit],
    ['03b-yangin-sonra', 'CAM-02', t.tiles[1], C.crit],
    ['04-forklift', 'CAM-04', t.tiles[2], C.warn],
    ['07-acil-cikis', 'CAM-11', t.tiles[3], C.warn],
  ]
  return (
    <>
      <div className="absolute inset-x-5 top-24 sm:left-12 sm:right-auto sm:top-28 sm:w-[30vw]">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: C.ai }}>{t.eyebrow}</div>
        <h2 className="mt-5 text-[10vw] font-medium uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-[3.4vw]">
          {t.h[0]}<br />{t.h[1]}<br /><span className="text-[#8D96A0]">{t.h[2]}</span>
        </h2>
        <p className="mt-6 max-w-sm text-[15px] text-[#8D96A0]">{t.sub}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={path('contact', lang)} className="bg-white px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#16C7D6]">{t.cta}</Link>
          <Link to={path('modules', lang)} className="border border-white/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10">{t.cta2}</Link>
        </div>
      </div>
      <div className="absolute hidden items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#8D96A0] md:flex" style={{ left: '40vw', width: '58vw', top: 'calc(23vh - 22px)' }}>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF4141]" />{t.live}</span>
        <span>{t.alerts}</span>
      </div>
      <div className="absolute hidden gap-3 md:flex" style={{ left: '40vw', width: '58vw', top: '84vh' }}>
        {tiles.map(([im, cam, ev, col]) => (
          <div key={cam} className="flex flex-1 items-center gap-2 border border-white/10 bg-white/[0.03] p-1.5 font-mono text-[10px] uppercase">
            <img src={`/scenes/${im}-sm.webp`} alt="" className="h-10 w-16 object-cover" />
            <div>
              <div className="text-[#8D96A0]">{cam}</div>
              <div style={{ color: col }}>{ev}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Grain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")' }}
    />
  )
}
