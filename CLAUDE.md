# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (hot reload)
npm run build     # Production build → dist/
npm run preview   # Serve the production build locally
npm run lint      # ESLint (zero warnings threshold)
```

## Architecture

This is a single-page React app — a luxury Airbnb-style listing page called **Stayscape GR** (Athens, Greece). There is no routing, no backend, and no state management library.

**Entry points:**
- `index.html` → loads `main.jsx`
- `main.jsx` → mounts `clone.jsx` as `<App />`
- `clone.jsx` — the entire app lives in this one file

**`clone.jsx` structure:**
- Top-level constants (`EASE`, `AMENITY_TAGS`, `AMENITIES`, `PHOTOS`, `FAQS`) are the only "data layer"
- Presentational components (`CustomCursor`, `Navbar`, `TagMarquee`, `AmenityCard`, `Lightbox`, `FAQItem`, `SectionReveal`) are defined before the default export
- `SectionReveal` is a scroll-triggered wrapper used around every major section
- `App` (default export) owns the only piece of shared state: `lightbox` (`{ isOpen, index }`)

**Styling:**
- Tailwind CSS v3 with a custom theme in `tailwind.config.js` — use `bg-background`, `text-foreground`, `text-muted`, `bg-dark` (not raw hex values)
- Global CSS in `index.css`: CSS custom properties for the palette, a `marquee` animation utility, and `cursor: none` globally (custom cursor replaces it on desktop; restored to `auto` below `1024px`)
- Font: Plus Jakarta Sans (Google Fonts, loaded in `index.html`)

**Animation:** Framer Motion throughout — all entrance animations use the shared `EASE = [0.23, 1, 0.32, 1]` cubic-bezier. `SectionReveal` handles scroll-triggered reveals via `whileInView`.

**Assets:** Property photos live in `public/assets/` and are referenced as `/assets/<filename>` in `PHOTOS`.
