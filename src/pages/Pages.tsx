import { useState, type FormEvent } from 'react'
import { ACCENT, Eyebrow, PageHero, Reveal } from '../components/Layout'
import { useLang, useT } from '../i18n'
import { Cta, FaqList } from './Home'

const W = 'mx-auto max-w-[1600px] px-5 sm:px-12'

export function Modules() {
  const t = useT().modules
  const lang = useLang()
  return (
    <>
      <PageHero eyebrow={t.eyebrow} h={t.h} p={t.p} img="00-genel" />
      <section className={`${W} pb-10`}>
        <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />{t.ready}</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full border border-white/50" />{t.custom}</span>
        </div>
      </section>
      <section className={`${W} space-y-4 pb-24`}>
        {t.groups.map((g) => (
          <Reveal key={g.code} className="grid overflow-hidden border border-white/10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[280px]">
              <img src={`/scenes/${g.img}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">{g.code} · {g.n} {lang === 'tr' ? 'modül' : 'modules'}</div>
                <h2 className="mt-2 text-3xl font-medium tracking-tight text-white">{g.t}</h2>
              </div>
            </div>
            <ul className="grid content-start gap-px bg-white/10 sm:grid-cols-2">
              {g.items.map(([name, ready]) => (
                <li key={name as string} className="flex items-center gap-3 bg-[#050607] px-5 py-4 text-sm text-white/80">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${ready ? '' : 'border border-white/50'}`} style={ready ? { background: ACCENT } : undefined} />
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>
      <section className="border-t border-white/10 py-24">
        <div className={`${W} grid gap-12 lg:grid-cols-[0.8fr_1.2fr]`}>
          <Reveal>
            <Eyebrow>{t.acc}</Eyebrow>
            <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-white sm:text-5xl">{t.accTitle}</h2>
            <p className="mt-5 text-white/60">{t.accNote}</p>
          </Reveal>
          <Reveal className="divide-y divide-white/10 border-y border-white/10">
            {t.accRows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-4">
                <span className="text-white/75">{k}</span>
                <span className="font-mono text-white">{v}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <Cta />
    </>
  )
}

export function Faq() {
  const t = useT()
  return (
    <>
      <PageHero eyebrow={t.faqPage.eyebrow} h={t.faqPage.h} img="06-cnc-istasyon" />
      <section className={`${W} pb-24`}>
        <FaqList items={t.faqs} />
        <p className="mt-10 text-white/60">
          {t.faqPage.more} <a href="mailto:info@hypevisionlab.com" style={{ color: ACCENT }}>info@hypevisionlab.com</a>
        </p>
      </section>
      <Cta />
    </>
  )
}

export function Contact() {
  const t = useT().contact
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [focus, setFocus] = useState<string[]>([])

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setState('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@hypevisionlab.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Hype Vision web · ${fd.get('company') || fd.get('name')}`,
          _captcha: 'false',
          _template: 'table',
          Ad_Soyad: fd.get('name'),
          Firma: fd.get('company'),
          Telefon: fd.get('phone'),
          'E-posta': fd.get('email') || '—',
          'İlgi alanı': focus.join(', ') || '—',
          Not: fd.get('msg') || '—',
          Kaynak: 'hypevisionlab.com (new site)',
        }),
      })
      const data = (await res.json()) as { success?: string | boolean }
      setState(res.ok && data.success ? 'ok' : 'err')
    } catch {
      setState('err')
    }
  }

  const input = 'w-full border border-white/15 bg-white/[0.03] px-4 py-3.5 text-white placeholder-white/35 outline-none transition-colors focus:border-[#16C7D6]'
  return (
    <>
      <PageHero eyebrow={t.eyebrow} h={t.h} p={t.p} img="04-forklift" />
      <section className={`${W} grid gap-14 pb-28 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div className="space-y-10">
          <ol className="space-y-6">
            {t.steps.map(([h, p], i) => (
              <li key={h} className="flex gap-5">
                <span className="font-mono text-xs" style={{ color: ACCENT }}>0{i + 1}</span>
                <div>
                  <div className="text-lg text-white">{h}</div>
                  <div className="text-sm text-white/55">{p}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="border-t border-white/10 pt-8 text-white/70">
            <a href="mailto:info@hypevisionlab.com" className="text-xl" style={{ color: ACCENT }}>info@hypevisionlab.com</a>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">{t.addr}</p>
          </div>
        </div>
        <Reveal>
          {state === 'ok' ? (
            <div className="border border-white/10 p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl text-black" style={{ background: ACCENT }}>✓</div>
              <p className="mt-6 text-lg text-white">{t.f.ok}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4 border border-white/10 p-6 sm:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder={`${t.f.name} *`} className={input} />
                <input name="company" required placeholder={`${t.f.company} *`} className={input} />
                <input name="phone" required type="tel" placeholder={`${t.f.phone} *`} className={input} />
                <input name="email" type="email" placeholder={t.f.email} className={input} />
              </div>
              <div>
                <div className="mb-3 mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{t.f.focus}</div>
                <div className="flex flex-wrap gap-2">
                  {t.focus.map((f) => {
                    const on = focus.includes(f)
                    return (
                      <button type="button" key={f} onClick={() => setFocus(on ? focus.filter((x) => x !== f) : [...focus, f])} className={`border px-3 py-2 text-sm transition-colors ${on ? 'border-[#16C7D6] bg-[#16C7D6]/15 text-white' : 'border-white/15 text-white/65 hover:border-white/40'}`}>
                        {f}
                      </button>
                    )
                  })}
                </div>
              </div>
              <textarea name="msg" rows={4} placeholder={t.f.msg} className={input} />
              {state === 'err' && <p className="text-sm text-[#FF4141]">{t.f.err}</p>}
              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/45">{t.f.consent}</p>
                <button disabled={state === 'sending'} className="bg-white px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#16C7D6] disabled:opacity-60">
                  {state === 'sending' ? t.f.sending : t.f.send}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </section>
    </>
  )
}

export function Privacy() {
  const t = useT().privacy
  return (
    <>
      <PageHero eyebrow="KVKK · GDPR" h={t.h} />
      <section className={`${W} max-w-4xl pb-28`}>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {t.body.map(([h, p]) => (
            <div key={h} className="grid gap-3 py-7 sm:grid-cols-[14rem_1fr]">
              <div className="font-medium text-white">{h}</div>
              <p className="leading-relaxed text-white/65">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
