import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ACCENT, Eyebrow, Head, Reveal } from '../components/Layout'
import { path, useLang, useT } from '../i18n'
import Story from '../story/Story'

const W = 'mx-auto max-w-[1600px] px-5 sm:px-12'

export default function Home() {
  return (
    <>
      <Story />
      <Intro />
      <Domains />
      <Camera />
      <Integrations />
      <Roles />
      <Compare />
      <Pilot />
      <Results />
      <Privacy />
      <FaqPreview />
      <Cta />
    </>
  )
}

function Intro() {
  const t = useT().home
  return (
    <section className="border-t border-white/10 py-24 sm:py-36">
      <div className={W}>
        <Reveal>
          <Eyebrow>{t.intro.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-5xl text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white sm:text-7xl">{t.intro.h}</h2>
        </Reveal>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal delay={0.1}><p className="max-w-2xl text-lg leading-relaxed text-white/65">{t.intro.p}</p></Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
            {t.stats.map(([v, l], i) => (
              <Reveal key={l} delay={0.1 + i * 0.06} className="bg-[#050607] p-6">
                <div className="text-4xl font-medium tracking-tight text-white sm:text-5xl">{v}</div>
                <div className="mt-2 text-sm text-white/50">{l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Domains() {
  const t = useT().home.domains
  const lang = useLang()
  return (
    <section id="cozumler" className="scroll-mt-16 border-t border-white/10 py-24 sm:py-32">
      <div className={W}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Head eyebrow={t.eyebrow} h={t.h} p={t.p} />
          <Reveal><Link to={path('modules', lang)} className="inline-flex border border-white/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black">{t.more} →</Link></Reveal>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.items.map((d, i) => (
            <Reveal key={d.code} delay={(i % 3) * 0.06}>
              <Link to={path('modules', lang)} className="group relative block h-[420px] overflow-hidden border border-white/10">
                <img src={`/scenes/${d.img}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-[1.2s] group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
                <div className="absolute left-6 top-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">
                  <span className="flex h-7 w-7 items-center justify-center border border-white/30">{d.code}</span>
                  {d.n} {lang === 'tr' ? 'modül' : 'modules'}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-medium tracking-tight text-white">{d.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{d.d}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {d.tags.map((g) => (
                      <span key={g} className="border border-white/15 bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/75">{g}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Camera() {
  const t = useT().home.camera
  const brands = ['Hikvision', 'Dahua', 'Axis', 'Bosch', 'Hanwha', 'Uniview', 'Milestone', 'Genetec']
  return (
    <section id="nasil" className="scroll-mt-16 border-t border-white/10 py-24 sm:py-32">
      <div className={`${W} grid gap-16 lg:grid-cols-2`}>
        <div>
          <Head eyebrow={t.eyebrow} h={t.h} p={t.p} />
          <ul className="mt-10 space-y-4">
            {t.points.map((x, i) => (
              <Reveal key={x} delay={i * 0.05}>
                <li className="flex gap-4 border-b border-white/10 pb-4 text-white/80">
                  <span className="font-mono text-xs" style={{ color: ACCENT }}>0{i + 1}</span>
                  {x}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Reveal className="relative overflow-hidden border border-white/10">
            <img src="/scenes/00-genel.webp" alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
              {t.flow.map((f, i) => (
                <div key={f} className="bg-black/75 p-4 backdrop-blur">
                  <div className="font-mono text-[10px]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, '0')}</div>
                  <div className="mt-1 text-sm text-white">{f}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{t.brands}</div>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-lg font-medium tracking-tight text-white/55">
              {brands.map((b) => <span key={b}>{b}</span>)}
            </div>
            <p className="mt-4 text-sm text-white/45">{t.other}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Integrations() {
  const t = useT().home.integr
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <div className={W}>
        <Head eyebrow={t.eyebrow} h={t.h} />
        <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {t.items.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.06} className="bg-[#050607] p-7">
              <div className="font-mono text-[11px]" style={{ color: ACCENT }}>0{i + 1}</div>
              <h3 className="mt-6 text-xl font-medium text-white">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{x.d}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {x.tags.map((g) => <span key={g} className="border border-white/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">{g}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Roles() {
  const t = useT().home.roles
  const [i, setI] = useState(0)
  const r = t.items[i]
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <div className={W}>
        <Head eyebrow={t.eyebrow} h={t.h} />
        <div className="mt-12 flex flex-wrap gap-2">
          {t.items.map((x, k) => (
            <button key={x.r} onClick={() => setI(k)} className={`border px-4 py-2.5 text-sm transition-colors ${k === i ? 'border-white bg-white text-black' : 'border-white/20 text-white/70 hover:border-white/50 hover:text-white'}`}>
              {x.r}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
            <div className="bg-[#050607] p-8 sm:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF4141]">{t.problem}</div>
              <p className="mt-4 text-xl leading-relaxed text-white/80 sm:text-2xl">{r.p}</p>
            </div>
            <div className="bg-[#07161a] p-8 sm:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: ACCENT }}>{t.solution}</div>
              <p className="mt-4 text-xl leading-relaxed text-white sm:text-2xl">{r.s}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {r.tags.map((g) => <span key={g} className="border border-white/20 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80">{g}</span>)}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Compare() {
  const t = useT().home.compare
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <div className={W}>
        <Head eyebrow={t.eyebrow} h={t.h} />
        <Reveal className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/15 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                {t.cols.map((c, i) => <th key={i} className={`py-4 pr-6 font-normal ${i === 2 ? 'text-[#16C7D6]' : ''}`}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {t.rows.map(([k, a, b]) => (
                <tr key={k} className="border-b border-white/10">
                  <td className="py-5 pr-6 text-sm text-white/50">{k}</td>
                  <td className="py-5 pr-6 text-white/60">{a}</td>
                  <td className="py-5 pr-6 text-white">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}

function Pilot() {
  const t = useT().home.pilot
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <div className={W}>
        <Head eyebrow={t.eyebrow} h={t.h} p={t.p} />
        <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {t.steps.map(([h, d, p], i) => (
            <Reveal key={h} delay={i * 0.07} className="relative bg-[#050607] p-7">
              <div className="flex items-baseline justify-between">
                <span className="text-5xl font-medium tracking-tight text-white/15">0{i + 1}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: ACCENT }}>{d}</span>
              </div>
              <h3 className="mt-8 text-xl font-medium text-white">{h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Results() {
  const t = useT().home.results
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <div className={W}>
        <Head eyebrow={t.eyebrow} h={t.h} p={t.p} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {t.items.map(([v, l, d], i) => (
            <Reveal key={l} delay={i * 0.06} className="border border-white/10 p-7">
              <div className="text-5xl font-medium tracking-[-0.04em] text-white sm:text-6xl">{v}</div>
              <div className="mt-3 text-lg text-white/85">{l}</div>
              <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-wider text-white/45">{d}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Privacy() {
  const t = useT().home.kvkk
  const colors = ['#38D996', '#FFB020', '#FF4141']
  return (
    <section className="border-t border-white/10 bg-[#07161a] py-24 sm:py-32">
      <div className={`${W} grid gap-14 lg:grid-cols-2`}>
        <Head eyebrow={t.eyebrow} h={t.h} p={t.p} />
        <div className="space-y-3">
          {t.lv.map(([a, b, c], i) => (
            <Reveal key={a} delay={i * 0.07} className="flex gap-5 border border-white/10 bg-black/30 p-6">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: colors[i], boxShadow: `0 0 14px ${colors[i]}` }} />
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-lg font-medium text-white">{a}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">{b}</span>
                </div>
                <p className="mt-1.5 text-sm text-white/65">{c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FaqList({ items }: { items: string[][] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map(([q, a], i) => (
        <div key={q}>
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
            <span className="text-base font-medium text-white sm:text-lg">{q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0 text-2xl font-light" style={{ color: ACCENT }}>+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                <p className="max-w-3xl pb-6 leading-relaxed text-white/65">{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function FaqPreview() {
  const t = useT()
  const lang = useLang()
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <div className={`${W} grid gap-12 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <Head eyebrow={t.home.faq.eyebrow} h={t.home.faq.h} />
          <Reveal className="mt-8"><Link to={path('faq', lang)} className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white">{t.home.faq.all} →</Link></Reveal>
        </div>
        <FaqList items={t.faqs.slice(0, 5)} />
      </div>
    </section>
  )
}

export function Cta() {
  const t = useT().home.cta
  const lang = useLang()
  return (
    <section className="px-5 pb-24 sm:px-12">
      <Reveal className="relative mx-auto max-w-[1600px] overflow-hidden border border-white/10">
        <img src="/scenes/01-kusbakisi.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050607] via-[#050607]/85 to-[#050607]/40" />
        <div className="relative px-6 py-20 sm:px-14 sm:py-28">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl">{t.h}</h2>
          <p className="mt-6 max-w-xl text-white/70">{t.p}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={path('contact', lang)} className="bg-white px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#16C7D6]">{t.b1}</Link>
            <Link to={path('modules', lang)} className="border border-white/30 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10">{t.b2}</Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
