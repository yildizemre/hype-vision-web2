# Hype Vision — web (v2)

Scroll-driven site for hypevisionlab.com. Vite + React + TypeScript + Tailwind v4 + Framer Motion, TR/EN.

- `src/story/` — cinematic factory scroll story (scene photos in `public/scenes/*.webp`, overlays in image-% coordinates)
- `src/pages/` — home sections, modules, FAQ, contact (FormSubmit → info@hypevisionlab.com), privacy
- `src/i18n.tsx` — all copy (TR + EN) and routes
- `GORSEL-PROMPTLARI.md` — prompts used to generate the scene photos

```bash
npm install
npm run dev     # http://localhost:5215
npm run build   # → dist/
```

Deploy: Vercel (framework Vite, `vercel.json` handles SPA routes and caching).
