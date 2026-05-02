# Hero Carousel Listing Frames Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 4 generic hero carousel frames with 7 listing-linked frames, each with property type label, location detail, and a CTA pill that links to the demo. Remove the property-type pill list below stats.

**Architecture:** All changes in `src/components/landing/CinematicHero.jsx` plus cleanup in `src/pages/Landing.jsx`. The frame data gains `typeLabel`, `detail`, and `path` fields. The bottom overlay is rebuilt. The image panel is wrapped in a `Link`.

**Tech Stack:** React 18, React Router v6 (`Link`), Framer Motion, Tailwind CSS, lucide-react (`ArrowRight`)

---

## Task 1: Replace HERO_FRAMES and rebuild bottom overlay

**Files:**
- Modify: `src/components/landing/CinematicHero.jsx`

- [ ] **Step 1: Replace HERO_FRAMES constant**

Find the existing `const HERO_FRAMES = [...]` (lines ~9-30) and replace entirely with:

```js
const HERO_FRAMES = [
  {
    image: '/assets/athens_flat_hero.png',
    typeLabel: { en: 'Studios', gr: 'Studios' },
    detail: { en: '45m² · Monastiraki, Athens', gr: '45τμ · Μοναστηράκι, Αθήνα' },
    path: '/airbnb',
    timecode: '07:14',
  },
  {
    image: '/assets/greek_luxury_penthouse_acropolis_view_1776942386364.png',
    typeLabel: { en: 'Apartments', gr: 'Διαμερίσματα' },
    detail: { en: 'Penthouse · Acropolis view', gr: 'Penthouse · Θέα Ακρόπολης' },
    path: '/athens',
    timecode: '06:42',
  },
  {
    image: '/assets/cyclades_pool.png',
    typeLabel: { en: 'Island Villas', gr: 'Island Villas' },
    detail: { en: 'Clifftop pool · Cyclades', gr: 'Πισίνα με θέα · Κυκλάδες' },
    path: '/cyclades',
    timecode: '08:30',
  },
  {
    image: '/assets/ionian_hero.png',
    typeLabel: { en: 'Nature Retreats', gr: 'Καταφύγια φύσης' },
    detail: { en: 'Forest & sea · Ionian coast', gr: 'Δάσος & θάλασσα · Ιόνιο' },
    path: '/ionian',
    timecode: '09:05',
  },
  {
    image: '/assets/crete_hero.png',
    typeLabel: { en: 'Heritage Estates', gr: 'Παραδοσιακές επαύλεις' },
    detail: { en: 'Stone manor · Crete', gr: 'Πέτρινη έπαυλη · Κρήτη' },
    path: '/crete',
    timecode: '19:21',
  },
  {
    image: '/assets/nisi_hero.png',
    typeLabel: { en: 'Boutique Suites', gr: 'Boutique Suites' },
    detail: { en: 'Cave pool · Milos', gr: 'Cave pool · Μήλος' },
    path: '/nisi',
    timecode: '08:03',
  },
  {
    image: '/assets/santorini_hero_day.png',
    typeLabel: { en: 'Signature Stays', gr: 'Signature Stays' },
    detail: { en: 'Caldera view · Oia', gr: 'Θέα Καλντέρας · Οία' },
    path: '/santorini',
    timecode: '06:15',
  },
];
```

- [ ] **Step 2: Add hover state**

Inside the component, after the existing state declarations (`frameIndex`, `wordIndex`, `videoReady`), add:

```js
const [hovered, setHovered] = useState(false);
```

- [ ] **Step 3: Wrap the image panel in a Link with hover handlers**

Find the opening div of the image panel:
```jsx
<div className="relative min-h-[420px] min-w-0 overflow-hidden bg-black md:min-h-[560px] lg:min-h-0">
```

Replace with:
```jsx
<Link
  to={frame.path}
  className="relative block min-h-[420px] min-w-0 overflow-hidden bg-black md:min-h-[560px] lg:min-h-0"
  style={{ cursor: 'pointer', textDecoration: 'none' }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
```

And find the closing `</div>` of that panel (it's the first major closing div after all the image/overlay content, before `<div className="flex min-w-0 flex-col justify-between...`). Replace that `</div>` with `</Link>`.

- [ ] **Step 4: Update gradient overlay to darken on hover**

Find:
```jsx
<div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/45 via-black/10 to-black/35" />
```

Replace with:
```jsx
<div
  className="absolute inset-0 z-[2] transition-all duration-300"
  style={{
    background: hovered
      ? 'linear-gradient(to right, rgba(0,0,0,0.62), rgba(0,0,0,0.15), rgba(0,0,0,0.48))'
      : 'linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0.10), rgba(0,0,0,0.35))',
  }}
/>
```

- [ ] **Step 5: Replace bottom overlay content**

Find the existing bottom overlay block:
```jsx
<div className="absolute bottom-6 left-5 right-5 z-[3] flex flex-col gap-4 text-white md:bottom-8 md:left-8 md:right-8">
  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.28em] text-white/80">
    <span className="h-px w-8" style={{ backgroundColor: brand.bronzeLight }} />
    {frame.caption}
  </div>
  <div className="flex flex-wrap items-center gap-3">
    <span ...>Listing → Stayfolio</span>
    <span ...>Cinematic property presence</span>
  </div>
</div>
```

Replace entirely with:
```jsx
<div className="absolute bottom-6 left-5 right-5 z-[3] flex items-end justify-between gap-4 text-white md:bottom-8 md:left-8 md:right-8">
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-3">
      <span className="h-px w-6 shrink-0" style={{ backgroundColor: brand.bronzeLight }} />
      <span
        className="text-[10px] font-black uppercase tracking-[0.32em]"
        style={{ color: brand.bronzeLight }}
      >
        {frame.typeLabel[safeLang] || frame.typeLabel.en}
      </span>
    </div>
    <p className="pl-9 text-[11px] font-medium tracking-[0.12em] text-white/60">
      {frame.detail[safeLang] || frame.detail.en}
    </p>
  </div>
  <span
    className="flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur-md transition-transform duration-200"
    style={{
      borderColor: 'rgba(255,255,255,0.22)',
      backgroundColor: 'rgba(20,17,14,0.54)',
      color: 'white',
      transform: hovered ? 'scale(1.04)' : 'scale(1)',
    }}
  >
    {safeLang === 'gr' ? 'Δες την εμπειρία' : 'See the experience'}
    <ArrowRight size={11} />
  </span>
</div>
```

- [ ] **Step 6: Remove propertyTypes pill list**

Find and delete the block added in the previous feature (below the stats grid):
```jsx
{copy.propertyTypes?.length > 0 && (
  <div className="mt-5 flex flex-wrap items-center gap-1">
    ...
  </div>
)}
```

- [ ] **Step 7: Verify in browser**

Run `npm run dev`. Go to `/`. Confirm:
- 7 frames cycle with correct images
- Bottom left shows type label (bronze) + detail (muted)
- Bottom right shows "See the experience" pill
- Clicking image or pill navigates to correct demo
- Hover darkens image slightly and scales pill
- Switch to GR: labels show in Greek where translated
- Progress bars show 7 dots

- [ ] **Step 8: Commit**

```bash
git add src/components/landing/CinematicHero.jsx
git commit -m "feat: hero carousel — 7 listing frames with type labels, details, and demo links"
```

---

## Task 2: Cleanup propertyTypes from Landing.jsx

**Files:**
- Modify: `src/pages/Landing.jsx`

- [ ] **Step 1: Remove propertyTypes from COPY.en**

Find and delete from `COPY.en`:
```js
propertyTypes: [
  { label: 'Studios',          path: '/airbnb' },
  { label: 'Apartments',       path: '/athens' },
  { label: 'Island Villas',    path: '/cyclades' },
  { label: 'Nature Retreats',  path: '/ionian' },
  { label: 'Heritage Estates', path: '/crete' },
  { label: 'Boutique Suites',  path: '/nisi' },
  { label: 'Signature Stays',  path: '/santorini' },
],
```

- [ ] **Step 2: Remove propertyTypes from COPY.gr**

Find and delete from `COPY.gr`:
```js
propertyTypes: [
  { label: 'Studios',                    path: '/airbnb' },
  { label: 'Διαμερίσματα',              path: '/athens' },
  { label: 'Island Villas',             path: '/cyclades' },
  { label: 'Καταφύγια φύσης',           path: '/ionian' },
  { label: 'Παραδοσιακές επαύλεις',     path: '/crete' },
  { label: 'Boutique Suites',           path: '/nisi' },
  { label: 'Signature Stays',           path: '/santorini' },
],
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Landing.jsx
git commit -m "cleanup: remove propertyTypes from COPY — carousel handles this now"
```
