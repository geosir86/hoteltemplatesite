# Stayfolio Wow Homepage Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Stayfolio homepage into a cinematic, proof-led experience with a split film hero, before/after transformation, capability bento, and more immersive examples.

**Architecture:** Extract the new high-impact sections into focused components under `src/components/landing/`, then simplify `src/pages/Landing.jsx` into an orchestrator that owns shared copy, data, nav, examples, and final section order. The hero and proof sections receive `lang`, `brand`, and copy/config props so they stay isolated and testable without touching destination demo pages.

**Tech Stack:** React 18, React Router, Framer Motion, Tailwind CSS utilities, Lucide React icons, Vite.

---

## File Structure

- Create: `src/components/landing/CinematicHero.jsx`
  - Owns the split cinematic hero, rotating fallback frames, optional video-ready config, film overlays, kinetic word, CTAs, and proof stats.

- Create: `src/components/landing/BeforeAfterTransformation.jsx`
  - Owns the main before/after conversion proof section.

- Create: `src/components/landing/CapabilityBento.jsx`
  - Owns the “What your property can get online” visual capability tiles.

- Modify: `src/pages/Landing.jsx`
  - Imports the three new components.
  - Updates `BRAND`, `COPY`, and example labels.
  - Reorders sections to hero, before/after, capability bento, examples, one specialist, pricing, process, final CTA.
  - Keeps nav, examples grid, pricing orchestration, process, final CTA, and footer.

- Do not modify: destination demo pages or `src/data/destinations.js`.

## Shared Design Rules

- Use `brand` colors passed from `Landing.jsx`.
- Use `useReducedMotion()` inside motion-heavy components.
- Use only transform/opacity for frame and word animation.
- Stop frame cycling when reduced motion is active.
- Use restrained Liquid Glass only for small overlays, never behind body paragraphs.
- Touch targets must be at least 44px high.
- No fake social proof.
- Do not add real video until `/assets/stayfolio-hero-loop.mp4` exists. Implement the configuration so adding it later is one local change.

---

### Task 1: Cinematic Hero Component

**Files:**
- Create: `src/components/landing/CinematicHero.jsx`
- Modify: `src/pages/Landing.jsx`

- [ ] **Step 1: Create the component file**

Create `src/components/landing/CinematicHero.jsx` with:

```jsx
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1];

const HERO_FRAMES = [
  {
    image: '/assets/santorini_hero_day.png',
    caption: 'Oia · Santorini',
    timecode: '06:42',
  },
  {
    image: '/assets/cyclades_pool.png',
    caption: 'Caldera · Cyclades',
    timecode: '07:18',
  },
  {
    image: '/assets/greek_luxury_terrace_sunset_view_1776942676038.png',
    caption: 'Terrace · Athens',
    timecode: '19:54',
  },
  {
    image: '/assets/nisi_hero.png',
    caption: 'Cave Suite · Milos',
    timecode: '08:03',
  },
];

const KINETIC_WORDS = {
  en: ['listing', 'story', 'atmosphere', 'experience', 'brand'],
  gr: ['listing', 'ιστορία', 'ατμόσφαιρα', 'εμπειρία', 'brand'],
};

export default function CinematicHero({ lang = 'en', brand, copy }) {
  const reduced = useReducedMotion();
  const safeLang = KINETIC_WORDS[lang] ? lang : 'en';
  const [frameIndex, setFrameIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const frame = HERO_FRAMES[frameIndex];
  const words = KINETIC_WORDS[safeLang];

  const stats = useMemo(
    () => copy.heroStats || [],
    [copy.heroStats],
  );

  useEffect(() => {
    if (reduced) return undefined;
    const timer = window.setInterval(() => {
      setFrameIndex((index) => (index + 1) % HERO_FRAMES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return undefined;
    const timer = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % words.length);
    }, 2900);
    return () => window.clearInterval(timer);
  }, [reduced, words.length]);

  return (
    <section className="px-4 pb-14 pt-24 md:px-6 md:pb-16 md:pt-24" style={{ backgroundColor: brand.warmMarble }}>
      <div
        className="mx-auto grid min-h-[calc(100dvh-7rem)] max-w-[1440px] overflow-hidden rounded-lg border lg:grid-cols-[58fr_42fr]"
        style={{ borderColor: 'rgba(26,22,18,0.12)', backgroundColor: brand.warmMarble }}
      >
        <div className="relative min-h-[420px] overflow-hidden bg-black md:min-h-[560px] lg:min-h-0">
          {HERO_FRAMES.map((item, index) => (
            <motion.img
              key={item.image}
              src={item.image}
              alt={item.caption}
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{
                opacity: index === frameIndex ? 1 : 0,
                scale: index === frameIndex && !reduced ? 1.06 : 1.12,
              }}
              transition={{ duration: reduced ? 0 : 1.2, ease: EASE }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-black/35" />
          <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4 md:inset-x-8 md:top-8">
            <div className="flex flex-col gap-2">
              {HERO_FRAMES.map((item, index) => (
                <span
                  key={item.image}
                  className="h-0.5 w-8 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: index === frameIndex ? brand.bronzeLight : 'rgba(255,255,255,0.35)' }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 backdrop-blur-md" style={{ borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(0,0,0,0.34)' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              REC · {frame.timecode}
            </div>
          </div>

          <div className="absolute bottom-6 left-5 right-5 flex flex-col gap-4 text-white md:bottom-8 md:left-8 md:right-8">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.28em] text-white/82">
              <span className="h-px w-8" style={{ backgroundColor: brand.bronzeLight }} />
              {frame.caption}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] backdrop-blur-md" style={{ borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(20,17,14,0.54)' }}>
                Listing → Stayfolio
              </span>
              <span className="rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] backdrop-blur-md" style={{ borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(20,17,14,0.38)', color: brand.bronzeLight }}>
                Cinematic property presence
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-12 px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-14">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm font-black uppercase tracking-[0.22em]">STAYFOLIO</div>
            <div className="text-[10px] font-black uppercase tracking-[0.26em]" style={{ color: brand.aegeanBlue }}>
              {copy.brandLine}
            </div>
          </div>

          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-8" style={{ backgroundColor: brand.aegeanBlue }} />
              <span className="text-[10px] font-black uppercase tracking-[0.36em]" style={{ color: brand.aegeanBlue }}>
                {copy.heroEyebrow}
              </span>
            </div>
            <h1 className="text-[clamp(3rem,7vw,7.1rem)] font-light leading-[0.9]" style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.deepInk }}>
              {copy.heroTitle}
            </h1>
            <div className="mt-5 h-12 overflow-hidden text-[clamp(2rem,4vw,4.5rem)] font-light italic leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.aegeanBlue }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  initial={reduced ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduced ? undefined : { opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="inline-block"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div>
            <p className="max-w-xl text-base leading-8 md:text-lg" style={{ color: brand.taupe }}>
              {copy.heroSub}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#examples" className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-3 rounded-full px-7 py-4 text-xs font-black uppercase tracking-[0.18em]" style={{ backgroundColor: brand.deepInk, color: brand.warmMarble }}>
                {copy.primaryCta}
                <ArrowRight size={15} />
              </a>
              <a href="#contact" className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-3 rounded-full border px-7 py-4 text-xs font-black uppercase tracking-[0.18em]" style={{ borderColor: 'rgba(26,22,18,0.18)', color: brand.deepInk }}>
                <Send size={15} />
                {copy.secondaryCta}
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 border-y" style={{ borderColor: 'rgba(26,22,18,0.12)' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="border-r py-5 last:border-r-0" style={{ borderColor: 'rgba(26,22,18,0.1)' }}>
                  <div className="text-3xl font-light italic leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.aegeanBlue }}>
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: brand.taupe }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Extend `BRAND` in `src/pages/Landing.jsx`**

In `src/pages/Landing.jsx`, update `BRAND` to include the new names while preserving existing keys:

```jsx
const BRAND = {
  warmMarble: '#F5EFE6',
  stone: '#F7F3EA',
  deepInk: '#1A1612',
  ink: '#171512',
  taupe: '#6F685F',
  bronze: '#B8894A',
  bronzeLight: '#EBC777',
  aegeanBlue: '#0E5FA8',
  luxuryNavy: '#1E3A8A',
  espresso: '#14110E',
  linen: '#E9DFCF',
  olive: '#566B5A',
};
```

- [ ] **Step 3: Update hero copy in `COPY`**

In `src/pages/Landing.jsx`, replace the hero-related keys inside `COPY.en` with:

```jsx
brandLine: 'Premium websites for Greek stays',
heroEyebrow: 'Luxury hotel film · direct inquiry site',
heroTitle: 'Your stay deserves more than a listing.',
heroSub:
  'I build cinematic, bilingual websites for Greek villas, Airbnb hosts, and boutique stays, so their online presence feels as considered as the real stay.',
primaryCta: 'See the experiences',
secondaryCta: 'Send your listing',
heroStats: [
  { value: '2', label: 'languages' },
  { value: '14d', label: 'build cycle' },
  { value: '1', label: 'specialist' },
],
```

Replace the matching keys inside `COPY.gr` with:

```jsx
brandLine: 'Premium websites για καταλύματα στην Ελλάδα',
heroEyebrow: 'Luxury hotel film · direct inquiry site',
heroTitle: 'Το κατάλυμά σου αξίζει κάτι περισσότερο από ένα listing.',
heroSub:
  'Φτιάχνω cinematic, δίγλωσσα websites για villas, Airbnb και boutique stays στην Ελλάδα, ώστε η online παρουσία τους να δείχνει όσο προσεγμένη είναι και η πραγματική εμπειρία.',
primaryCta: 'Δες εμπειρίες',
secondaryCta: 'Στείλε μου το listing',
heroStats: [
  { value: '2', label: 'γλώσσες' },
  { value: '14', label: 'ημέρες build' },
  { value: '1', label: 'specialist' },
],
```

- [ ] **Step 4: Import and use `CinematicHero`**

Add this import in `src/pages/Landing.jsx`:

```jsx
import CinematicHero from '../components/landing/CinematicHero';
```

Replace the current first hero `<section className="px-5 pb-20...">...</section>` in `Landing` with:

```jsx
<CinematicHero lang={lang} brand={BRAND} copy={c} />
```

- [ ] **Step 5: Remove now-unused hero variables/imports**

In `Landing`, remove these variables if they become unused:

```jsx
const reduced = useReducedMotion();
const featuredProject = PROJECTS[0];
const featuredContent = featuredProject?.content?.[lang] || featuredProject?.content?.en;
```

If `useReducedMotion` is no longer used in `Landing.jsx`, remove it from the Framer Motion import:

```jsx
import { motion, AnimatePresence } from 'framer-motion';
```

- [ ] **Step 6: Run build**

Run:

```bash
npm.cmd run build
```

Expected: Vite build exits 0.

- [ ] **Step 7: Commit Task 1**

```bash
git add src/pages/Landing.jsx src/components/landing/CinematicHero.jsx
git commit -m "feat: add stayfolio cinematic hero"
```

---

### Task 2: Before/After Transformation Component

**Files:**
- Create: `src/components/landing/BeforeAfterTransformation.jsx`
- Modify: `src/pages/Landing.jsx`

- [ ] **Step 1: Create `BeforeAfterTransformation.jsx`**

Create `src/components/landing/BeforeAfterTransformation.jsx`:

```jsx
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarCheck, ImageIcon, MapPin, MessageCircle, Star } from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1];

export default function BeforeAfterTransformation({ lang = 'en', brand, copy }) {
  const reduced = useReducedMotion();
  const beforeFeatures = copy.beforeAfter.before.features;
  const afterFeatures = copy.beforeAfter.after.features;

  return (
    <section className="px-5 py-24 md:px-10" style={{ backgroundColor: brand.stone }}>
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: brand.aegeanBlue }}>
              {copy.beforeAfter.label}
            </p>
            <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.deepInk }}>
              {copy.beforeAfter.title}
            </h2>
          </div>
          <p className="text-base leading-8" style={{ color: brand.taupe }}>
            {copy.beforeAfter.body}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.article
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="rounded-lg border p-5 md:p-7"
            style={{ backgroundColor: '#ECE6DA', borderColor: 'rgba(26,22,18,0.12)' }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: brand.taupe }}>
                {copy.beforeAfter.before.label}
              </span>
              <span className="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]" style={{ borderColor: 'rgba(26,22,18,0.16)', color: brand.taupe }}>
                Platform template
              </span>
            </div>
            <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: 'rgba(26,22,18,0.1)' }}>
              <img src="/assets/cyclades_pool.png" alt="Generic listing preview" className="h-48 w-full object-cover grayscale md:h-64" />
              <div className="space-y-4 p-5">
                <div>
                  <div className="h-4 w-3/4 rounded bg-neutral-300" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-neutral-200" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {beforeFeatures.map((feature) => (
                    <div key={feature} className="rounded border px-3 py-2 text-center text-[10px] uppercase tracking-[0.12em]" style={{ borderColor: 'rgba(26,22,18,0.1)', color: brand.taupe }}>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="rounded-lg border p-5 md:p-7"
            style={{ backgroundColor: brand.espresso, borderColor: 'rgba(235,199,119,0.22)', color: brand.stone }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: brand.bronzeLight }}>
                {copy.beforeAfter.after.label}
              </span>
              <span className="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur-md" style={{ borderColor: 'rgba(247,243,234,0.18)', backgroundColor: 'rgba(255,255,255,0.08)', color: brand.bronzeLight }}>
                Stayfolio experience
              </span>
            </div>
            <div className="overflow-hidden rounded-lg border" style={{ borderColor: 'rgba(247,243,234,0.14)', backgroundColor: '#201B16' }}>
              <div className="relative">
                <img src="/assets/cyclades_pool.png" alt="Stayfolio branded property preview" className="h-48 w-full object-cover md:h-64" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: brand.bronzeLight }}>
                    Cyclades · Island villa
                  </p>
                  <h3 className="mt-2 text-3xl font-light leading-none text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Villa Aether
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
                {[
                  { icon: ImageIcon, label: afterFeatures[0] },
                  { icon: MapPin, label: afterFeatures[1] },
                  { icon: CalendarCheck, label: afterFeatures[2] },
                  { icon: Star, label: afterFeatures[3] },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-lg border p-3" style={{ borderColor: 'rgba(247,243,234,0.12)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                      <Icon size={16} style={{ color: brand.bronzeLight }} />
                      <p className="mt-3 text-xs leading-5 text-white/70">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.article>
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#examples" className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-3 rounded-full px-7 py-4 text-xs font-black uppercase tracking-[0.18em]" style={{ backgroundColor: brand.deepInk, color: brand.stone }}>
            {copy.beforeAfter.cta}
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add before/after copy to `COPY`**

In `src/pages/Landing.jsx`, add to `COPY.en`:

```jsx
beforeAfter: {
  label: 'Before / After',
  title: 'From another listing to a branded stay experience.',
  body:
    'The property can be the same. The perceived value changes when the online experience has story, rhythm, and a clear direct inquiry path.',
  before: {
    label: 'Before: another listing',
    features: ['photos', 'price', 'reviews'],
  },
  after: {
    label: 'After: a Stayfolio experience',
    features: ['cinematic gallery', 'location story', 'direct inquiry', 'premium mood'],
  },
  cta: 'See what this could become',
},
```

Add to `COPY.gr`:

```jsx
beforeAfter: {
  label: 'Before / After',
  title: 'Από ακόμα ένα listing σε branded εμπειρία καταλύματος.',
  body:
    'Το κατάλυμα μπορεί να είναι το ίδιο. Η αντιληπτή αξία αλλάζει όταν η online εμπειρία έχει ιστορία, ρυθμό και καθαρό direct inquiry path.',
  before: {
    label: 'Πριν: ακόμα ένα listing',
    features: ['photos', 'τιμή', 'reviews'],
  },
  after: {
    label: 'Μετά: Stayfolio experience',
    features: ['cinematic gallery', 'ιστορία τοποθεσίας', 'direct inquiry', 'premium mood'],
  },
  cta: 'Δες πώς μπορεί να γίνει',
},
```

- [ ] **Step 3: Import and place the component**

In `src/pages/Landing.jsx`, add:

```jsx
import BeforeAfterTransformation from '../components/landing/BeforeAfterTransformation';
```

Place it immediately after `<CinematicHero ... />`:

```jsx
<BeforeAfterTransformation lang={lang} brand={BRAND} copy={c} />
```

- [ ] **Step 4: Remove old problem section**

Delete the current section that starts:

```jsx
<section className="px-5 py-20 md:px-10 md:py-24" style={{ backgroundColor: BRAND.linen }}>
```

and renders `c.problemLabel`, `c.problemTitle`, `c.problemBody`, and `c.problemPoints`.

- [ ] **Step 5: Run build**

Run:

```bash
npm.cmd run build
```

Expected: Vite build exits 0.

- [ ] **Step 6: Commit Task 2**

```bash
git add src/pages/Landing.jsx src/components/landing/BeforeAfterTransformation.jsx
git commit -m "feat: add stayfolio before after proof"
```

---

### Task 3: Capability Bento Component

**Files:**
- Create: `src/components/landing/CapabilityBento.jsx`
- Modify: `src/pages/Landing.jsx`

- [ ] **Step 1: Create `CapabilityBento.jsx`**

Create `src/components/landing/CapabilityBento.jsx`:

```jsx
import { motion, useReducedMotion } from 'framer-motion';
import { GalleryHorizontal, Globe2, Layout, MessageCircle, Smartphone } from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1];

const ICONS = {
  homepage: Layout,
  gallery: GalleryHorizontal,
  story: Globe2,
  inquiry: MessageCircle,
  mobile: Smartphone,
};

function MiniVisual({ type, brand }) {
  if (type === 'homepage') {
    return (
      <div className="relative h-44 overflow-hidden rounded-lg bg-black">
        <img src="/assets/greek_luxury_terrace_sunset_view_1776942676038.png" alt="" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-2 w-24 rounded" style={{ backgroundColor: brand.bronzeLight }} />
          <div className="mt-3 h-7 w-40 rounded bg-white/85" />
        </div>
      </div>
    );
  }

  if (type === 'gallery') {
    return (
      <div className="grid h-44 grid-cols-3 gap-2">
        {['/assets/cyclades_pool.png', '/assets/nisi_room.png', '/assets/ionian_terrace.png', '/assets/crete_living.png'].map((src, index) => (
          <img key={src} src={src} alt="" className={`h-full w-full rounded-lg object-cover ${index === 0 ? 'col-span-2 row-span-2' : ''}`} />
        ))}
      </div>
    );
  }

  if (type === 'story') {
    return (
      <div className="grid h-44 grid-cols-2 gap-3">
        <div className="rounded-lg border p-4" style={{ borderColor: 'rgba(26,22,18,0.1)', backgroundColor: '#F5EFE6' }}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: brand.aegeanBlue }}>EN</p>
          <div className="mt-5 space-y-2">
            <div className="h-2 rounded bg-black/55" />
            <div className="h-2 w-2/3 rounded bg-black/25" />
          </div>
        </div>
        <div className="rounded-lg border p-4" style={{ borderColor: 'rgba(26,22,18,0.1)', backgroundColor: '#F5EFE6' }}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: brand.aegeanBlue }}>GR</p>
          <div className="mt-5 space-y-2">
            <div className="h-2 rounded bg-black/55" />
            <div className="h-2 w-2/3 rounded bg-black/25" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'inquiry') {
    return (
      <div className="flex h-44 items-center justify-center rounded-lg" style={{ backgroundColor: brand.espresso }}>
        <div className="w-56 rounded-lg border p-4 text-center" style={{ borderColor: 'rgba(247,243,234,0.14)', backgroundColor: 'rgba(255,255,255,0.06)' }}>
          <MessageCircle className="mx-auto" size={22} style={{ color: brand.bronzeLight }} />
          <div className="mx-auto mt-4 h-3 w-32 rounded bg-white/70" />
          <div className="mx-auto mt-3 h-9 w-40 rounded-full" style={{ backgroundColor: brand.bronzeLight }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-44 items-center justify-center rounded-lg" style={{ backgroundColor: brand.deepInk }}>
      <div className="h-36 w-20 rounded-[1.5rem] border p-2" style={{ borderColor: 'rgba(247,243,234,0.28)' }}>
        <div className="h-full rounded-[1rem] bg-cover bg-center" style={{ backgroundImage: "url('/assets/nisi_hero.png')" }} />
      </div>
    </div>
  );
}

export default function CapabilityBento({ brand, copy }) {
  const reduced = useReducedMotion();

  return (
    <section className="px-5 py-24 md:px-10" style={{ backgroundColor: brand.warmMarble }}>
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: brand.aegeanBlue }}>
            {copy.capabilities.label}
          </p>
          <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.deepInk }}>
            {copy.capabilities.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          {copy.capabilities.items.map((item, index) => {
            const Icon = ICONS[item.type];
            const large = index === 0;
            return (
              <motion.article
                key={item.title}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
                className={`rounded-lg border p-5 ${large ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                style={{ backgroundColor: brand.stone, borderColor: 'rgba(26,22,18,0.1)' }}
              >
                <MiniVisual type={item.type} brand={brand} />
                <div className="mt-5 flex items-start gap-3">
                  <Icon size={18} className="mt-1 shrink-0" style={{ color: brand.aegeanBlue }} />
                  <div>
                    <h3 className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.deepInk }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: brand.taupe }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add capability copy to `COPY`**

In `src/pages/Landing.jsx`, add to `COPY.en`:

```jsx
capabilities: {
  label: 'What I can build',
  title: 'What your property can get online.',
  items: [
    { type: 'homepage', title: 'Cinematic homepage', body: 'A first screen that feels like the start of a premium stay, not a template.' },
    { type: 'gallery', title: 'Premium gallery', body: 'Photos arranged to build atmosphere, rhythm, and perceived value.' },
    { type: 'story', title: 'Bilingual story', body: 'English and Greek copy shaped around the property, location, and guest profile.' },
    { type: 'inquiry', title: 'Direct inquiry flow', body: 'WhatsApp, email, or form actions designed to make the next step obvious.' },
    { type: 'mobile', title: 'Mobile-first experience', body: 'A polished phone experience for guests browsing from social or booking platforms.' },
  ],
},
```

Add to `COPY.gr`:

```jsx
capabilities: {
  label: 'Τι μπορώ να χτίσω',
  title: 'Τι μπορεί να αποκτήσει online το κατάλυμά σου.',
  items: [
    { type: 'homepage', title: 'Cinematic homepage', body: 'Πρώτη οθόνη που μοιάζει με αρχή premium εμπειρίας, όχι με template.' },
    { type: 'gallery', title: 'Premium gallery', body: 'Φωτογραφίες στημένες για ατμόσφαιρα, ρυθμό και υψηλότερη αντιληπτή αξία.' },
    { type: 'story', title: 'Δίγλωσση ιστορία', body: 'Ελληνικά και Αγγλικά κείμενα γύρω από το property, την τοποθεσία και το κοινό σου.' },
    { type: 'inquiry', title: 'Direct inquiry flow', body: 'WhatsApp, email ή φόρμα ώστε το επόμενο βήμα να είναι προφανές.' },
    { type: 'mobile', title: 'Mobile-first εμπειρία', body: 'Προσεγμένη mobile εικόνα για guests που έρχονται από social ή booking platforms.' },
  ],
},
```

- [ ] **Step 3: Import and place `CapabilityBento`**

In `src/pages/Landing.jsx`, add:

```jsx
import CapabilityBento from '../components/landing/CapabilityBento';
```

Place it after `<BeforeAfterTransformation ... />` and before the examples section:

```jsx
<CapabilityBento brand={BRAND} copy={c} />
```

- [ ] **Step 4: Run build**

Run:

```bash
npm.cmd run build
```

Expected: Vite build exits 0.

- [ ] **Step 5: Commit Task 3**

```bash
git add src/pages/Landing.jsx src/components/landing/CapabilityBento.jsx
git commit -m "feat: add stayfolio capability bento"
```

---

### Task 4: Upgrade Examples Into Stay Experiences

**Files:**
- Modify: `src/pages/Landing.jsx`

- [ ] **Step 1: Add example type labels**

Add this constant near `PROJECTS` in `src/pages/Landing.jsx`:

```jsx
const EXPERIENCE_TYPES = {
  athens: { en: 'Urban stay', gr: 'Urban stay' },
  cyclades: { en: 'Island villa', gr: 'Island villa' },
  ionian: { en: 'Nature retreat', gr: 'Nature retreat' },
  crete: { en: 'Heritage estate', gr: 'Heritage estate' },
  nisi: { en: 'Boutique suite', gr: 'Boutique suite' },
  greece: { en: 'Signature escape', gr: 'Signature escape' },
};
```

- [ ] **Step 2: Update examples copy**

In `COPY.en`, replace:

```jsx
examplesLabel: 'Example stay experiences',
examplesTitle: 'Demo builds for properties that deserve more than a listing.',
examplesBody:
  'Each example shows how a Greek stay can feel online when it is treated as an individual experience.',
viewExample: 'View example',
```

with:

```jsx
examplesLabel: 'Stay experiences',
examplesTitle: 'Different properties. Different moods. One premium standard.',
examplesBody:
  'Explore demo experiences that show how each stay can carry its own atmosphere online.',
viewExample: 'See the experience',
```

In `COPY.gr`, replace the matching values with:

```jsx
examplesLabel: 'Stay experiences',
examplesTitle: 'Διαφορετικά καταλύματα. Διαφορετικά moods. Ένα premium επίπεδο.',
examplesBody:
  'Δες demo εμπειρίες που δείχνουν πώς κάθε stay μπορεί να έχει τη δική του ατμόσφαιρα online.',
viewExample: 'Δες την εμπειρία',
```

- [ ] **Step 3: Update `ExampleCard` poster treatment**

Inside `ExampleCard`, add:

```jsx
const type = EXPERIENCE_TYPES[project.id]?.[safeLang] || EXPERIENCE_TYPES[project.id]?.en || 'Stay experience';
```

Inside the image overlay, under the location line, render:

```jsx
<span className="mb-3 inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur-md" style={{ borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(20,17,14,0.45)', color: BRAND.bronzeLight }}>
  {type}
</span>
```

Then ensure the card CTA uses:

```jsx
{COPY[safeLang].viewExample}
```

- [ ] **Step 4: Update examples section id remains stable**

Keep:

```jsx
<section id="examples" ...>
```

because nav and hero CTA link to it.

- [ ] **Step 5: Run build**

Run:

```bash
npm.cmd run build
```

Expected: Vite build exits 0.

- [ ] **Step 6: Commit Task 4**

```bash
git add src/pages/Landing.jsx
git commit -m "feat: upgrade stayfolio examples atlas"
```

---

### Task 5: Verification And Visual Polish

**Files:**
- Modify only if verification finds issues:
  - `src/pages/Landing.jsx`
  - `src/components/landing/CinematicHero.jsx`
  - `src/components/landing/BeforeAfterTransformation.jsx`
  - `src/components/landing/CapabilityBento.jsx`

- [ ] **Step 1: Search for old agency language**

Run:

```bash
rg "STAYSCAPE|Stayscape|Our Work|We build|Talk to us|Digital Studio|Trusted by hosts" src/pages/Landing.jsx src/components/landing
```

Expected: no matches.

- [ ] **Step 2: Search for required new labels**

Run:

```bash
rg "Listing → Stayfolio|Before / After|What your property can get online|Stay experiences|See the experience" src/pages/Landing.jsx src/components/landing
```

Expected: matches in the new component files and `Landing.jsx`.

- [ ] **Step 3: Run production build**

Run:

```bash
npm.cmd run build
```

Expected: Vite build exits 0.

- [ ] **Step 4: Run lint and classify failures**

Run:

```bash
npm.cmd run lint
```

Expected for this task: no lint errors from `src/pages/Landing.jsx`, `src/components/landing/CinematicHero.jsx`, `src/components/landing/BeforeAfterTransformation.jsx`, or `src/components/landing/CapabilityBento.jsx`. If lint still fails in unrelated existing files, report those separately.

- [ ] **Step 5: Start or reuse dev server**

Run:

```bash
npm.cmd run dev -- --host 127.0.0.1
```

Expected: Vite serves the app at `http://127.0.0.1:5173/` or the next available port.

- [ ] **Step 6: Browser visual checks**

Verify manually in browser:

- At desktop width, first viewport shows split cinematic hero with media left and copy right.
- Hero shows `REC`, timecode, frame counter, and `Listing → Stayfolio`.
- Kinetic word changes slowly, and the layout does not jump.
- Before/after appears immediately after the hero.
- Capability bento appears before examples.
- Examples section reads `Stay experiences`.
- Mobile at 375px has no horizontal scroll and CTA text fits.
- Menu still opens and closes.
- Language toggle still switches EN/GR.

- [ ] **Step 7: Fix common visual issues if found**

If mobile headline is too tall, reduce hero h1 class in `CinematicHero.jsx` to:

```jsx
className="text-[clamp(2.65rem,13vw,6rem)] font-light leading-[0.92]"
```

If CTA text wraps badly, change CTA classes to:

```jsx
className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-3 rounded-full px-5 py-4 text-center text-[11px] font-black uppercase tracking-[0.12em] sm:w-auto"
```

If the media panel is too tall on mobile, change:

```jsx
className="relative min-h-[360px] overflow-hidden bg-black md:min-h-[560px] lg:min-h-0"
```

- [ ] **Step 8: Final build after fixes**

Run:

```bash
npm.cmd run build
```

Expected: Vite build exits 0.

- [ ] **Step 9: Commit verification fixes**

If files changed:

```bash
git add src/pages/Landing.jsx src/components/landing/CinematicHero.jsx src/components/landing/BeforeAfterTransformation.jsx src/components/landing/CapabilityBento.jsx
git commit -m "fix: polish stayfolio wow homepage"
```

If no files changed, do not create an empty commit.

---

## Self-Review Checklist

- Spec coverage: This plan covers cinematic split hero, rotating frames, video-ready config, kinetic word, before/after, capability bento, examples atlas, EN/GR, no fake proof, mobile checks, reduced motion, and build verification.
- Scope: Only landing page and new landing components are in scope. Destination demo pages and data remain untouched.
- Placeholder scan: This plan contains no TBD/TODO placeholders.
- Type consistency: Components receive `brand` and `copy` consistently; `lang` is passed where bilingual switching is needed.
- Known repo risk: Current workspace has existing modified files and unrelated lint failures. Do not revert unrelated changes; classify verification failures by touched vs unrelated files.
