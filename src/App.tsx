import { useEffect, type ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Header } from './components/Layout'
import { DICT, LangProvider, ROUTES, type Lang } from './i18n'
import Home from './pages/Home'
import { Contact, Faq, Modules, Privacy } from './pages/Pages'

/** Scroll to top on page change, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Shell({ lang, children }: { lang: Lang; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = DICT[lang].meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', DICT[lang].meta.desc)
  }, [lang])
  return (
    <LangProvider lang={lang}>
      <Header />
      <main>{children}</main>
      <Footer />
    </LangProvider>
  )
}

const PAGES = { home: Home, modules: Modules, faq: Faq, contact: Contact, privacy: Privacy }

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        {(['tr', 'en'] as Lang[]).flatMap((lang) =>
          Object.entries(PAGES).map(([key, Page]) => (
            <Route key={`${lang}-${key}`} path={ROUTES[key as keyof typeof ROUTES][lang]} element={<Shell lang={lang}><Page /></Shell>} />
          )),
        )}
        <Route path="/en/*" element={<Navigate to="/en" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
