import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ROUTES, path, useLang, useT, type Lang, type RouteKey } from '../i18n'

export const ACCENT = '#16C7D6'

/** Finds which route key the current pathname belongs to, to swap language in place. */
function currentKey(pathname: string): RouteKey {
  const clean = pathname.replace(/\/+$/, '') || '/'
  for (const [k, v] of Object.entries(ROUTES)) if (v.tr === clean || v.en === clean) return k as RouteKey
  return 'home'
}

function LangSwitch() {
  const lang = useLang()
  const { pathname, hash } = useLocation()
  const key = currentKey(pathname)
  return (
    <div className="flex items-center font-mono text-[11px] uppercase tracking-[0.15em]">
      {(['tr', 'en'] as Lang[]).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1.5 text-white/30">/</span>}
          <Link to={path(key, l) + hash} className={l === lang ? 'text-white' : 'text-white/45 hover:text-white'}>{l}</Link>
        </span>
      ))}
    </div>
  )
}

export function Header() {
  const t = useT()
  const lang = useLang()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const { pathname } = useLocation()
  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 40))
  useEffect(() => setOpen(false), [pathname])
  const home = path('home', lang)
  const links = [
    { to: `${home === '/' ? '' : home}/#cozumler`.replace('//', '/'), label: t.nav.solutions },
    { to: path('modules', lang), label: t.nav.modules },
    { to: `${home === '/' ? '' : home}/#nasil`.replace('//', '/'), label: t.nav.how },
    { to: path('faq', lang), label: t.nav.faq },
    { to: path('contact', lang), label: t.nav.contact },
  ]
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? 'border-b border-white/10 bg-[#050607]/80 backdrop-blur-xl' : 'bg-gradient-to-b from-black/60 to-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-12">
        <Link to={home} aria-label="Hype Vision" className="shrink-0">
          <img src="/hypefoooterlogo.webp" alt="Hype Vision" className="h-6 w-auto sm:h-7" />
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] text-white/75 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `transition-colors hover:text-white ${isActive && !l.to.includes('#') ? 'text-white' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <LangSwitch />
          <a href="https://panel.hypevisionlab.com/" className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/70 hover:text-white">{t.nav.panel}</a>
          <Link to={path('contact', lang)} className="bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-black transition-colors hover:bg-[#16C7D6]">{t.nav.demo}</Link>
        </div>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden">
          <span className={`h-px w-6 bg-white transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-white transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden lg:hidden">
            <div className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2.5 text-lg text-white/85">{l.label}</Link>
              ))}
              <div className="mt-4 flex items-center justify-between">
                <LangSwitch />
                <a href="https://panel.hypevisionlab.com/" className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/70">{t.nav.panel}</a>
              </div>
              <Link to={path('contact', lang)} className="mt-4 bg-white py-3 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-black">{t.nav.demo}</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export function Footer() {
  const t = useT()
  const lang = useLang()
  const home = path('home', lang) === '/' ? '' : path('home', lang)
  return (
    <footer className="border-t border-white/10 bg-[#050607]">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 sm:px-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <img src="/hypefoooterlogo.webp" alt="Hype Vision" className="h-7 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{t.footer.tag}</p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{t.footer.product}</div>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link to={`${home}/#cozumler`} className="hover:text-white">{t.nav.solutions}</Link></li>
            <li><Link to={path('modules', lang)} className="hover:text-white">{t.nav.modules}</Link></li>
            <li><Link to={`${home}/#nasil`} className="hover:text-white">{t.nav.how}</Link></li>
            <li><a href="https://panel.hypevisionlab.com/" className="hover:text-white">{t.nav.panel}</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{t.footer.company}</div>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link to={path('faq', lang)} className="hover:text-white">{t.nav.faq}</Link></li>
            <li><Link to={path('contact', lang)} className="hover:text-white">{t.nav.contact}</Link></li>
            <li><Link to={path('privacy', lang)} className="hover:text-white">{t.privacy.h}</Link></li>
          </ul>
        </div>
        <div className="text-sm text-white/70">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{t.nav.contact}</div>
          <p className="mt-4 whitespace-pre-line leading-relaxed">{t.contact.addr}</p>
          <a href="mailto:info@hypevisionlab.com" className="mt-3 inline-block hover:text-white" style={{ color: ACCENT }}>info@hypevisionlab.com</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 sm:px-12">
          <span>© {new Date().getFullYear()} Hype Vision. {t.footer.rights}</span>
          <span>GTÜ Teknopark · Gebze</span>
        </div>
      </div>
    </footer>
  )
}

/* ───────────── shared section primitives ───────────── */

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
      <span className="h-px w-6" style={{ background: ACCENT }} />
      {children}
    </div>
  )
}

export function Head({ eyebrow, h, p, center }: { eyebrow: string; h: string; p?: string; center?: boolean }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center [&>div:first-child]:justify-center' : 'max-w-3xl'}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">{h}</h2>
      {p && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{p}</p>}
    </Reveal>
  )
}

export function PageHero({ eyebrow, h, p, img }: { eyebrow: string; h: string; p?: string; img?: string }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44">
      {img && (
        <>
          <img src={`/scenes/${img}.webp`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050607]/70 via-[#050607]/80 to-[#050607]" />
        </>
      )}
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-12">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white sm:text-7xl">{h}</h1>
          {p && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">{p}</p>}
        </Reveal>
      </div>
    </section>
  )
}
