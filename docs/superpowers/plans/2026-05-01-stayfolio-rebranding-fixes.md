# Stayfolio Rebranding & UI Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand STAYSCAPE → STAYFOLIO everywhere, fix the RESERVE button overlap, rename and reorder DemoSwitcher tabs, and complete all missing Greek translations across listing and landing pages.

**Architecture:** Six targeted edits across `src/components/DemoSwitcher.jsx`, `src/App.jsx`, `src/pages/listing/Nav.jsx`, `src/pages/AirbnbListing.jsx`, `src/pages/listing/{Amenities,Description,Hero,StickyBar}.jsx`, `src/pages/Landing.jsx`, `src/components/shared/Navbar.jsx`, and `src/components/Immersive/EnhancedCTA.jsx`. No new files. No new components.

**Tech Stack:** React 18, React Router v6, Framer Motion, Tailwind CSS v3

---

## File Map

| File | Change |
|------|--------|
| `src/App.jsx` | Pass `setLang` to `AirbnbListing`; add `/airbnblisting` redirect cleanup |
| `src/components/DemoSwitcher.jsx` | Rename AIRBNB → ATHENS FLAT / ΑΘΗΝΑ FLAT; reorder: Athens Flat first, then Santorini, Crete, Athens, Cyclades, Ionian, Nisi |
| `src/pages/listing/Nav.jsx` | Replace STAYSCAPE with STAYFOLIO; add `top: 60px` to avoid DemoSwitcher overlap; bilingual section links |
| `src/pages/AirbnbListing.jsx` | Replace STAYSCAPE footer with STAYFOLIO |
| `src/components/shared/Navbar.jsx` | Replace STAYSCAPE with STAYFOLIO |
| `src/components/Immersive/EnhancedCTA.jsx` | Replace STAYSCAPE with STAYFOLIO |
| `src/pages/listing/Amenities.jsx` | Convert hardcoded English labels to bilingual using `lang` prop |
| `src/pages/listing/Description.jsx` | Convert hardcoded English highlight cards to bilingual |
| `src/pages/listing/Hero.jsx` | Convert hardcoded English bottom strip and awards to bilingual |
| `src/pages/listing/StickyBar.jsx` | Translate `/ night` to `/ διανυκτέρευση` in GR |
| `src/pages/Landing.jsx` | Fix GR copy: heroEyebrow, heroStats specialist label, examplesLabel |

---

## Task 1: Fix setLang prop + RESERVE layout conflict

**Problem:** `App.jsx` passes `lang` but not `setLang` to `AirbnbListing`. Also, the listing `Nav.jsx` is `position: fixed; top: 0` while DemoSwitcher is also fixed at `top: 12px` centered — on desktop the listing Nav's RESERVE button peeks out from the right edge of the DemoSwitcher pill. Fix: push listing Nav below DemoSwitcher by setting `top: 60px`, and pass `setLang` through.

**Files:**
- Modify: `src/App.jsx:52`
- Modify: `src/pages/listing/Nav.jsx:14-21`

- [ ] **Step 1: Fix setLang in App.jsx**

In `src/App.jsx` line 52, change:
```jsx
<Route path="/airbnb" element={<AirbnbListing lang={lang} />} />
```
to:
```jsx
<Route path="/airbnb" element={<AirbnbListing lang={lang} setLang={setLang} />} />
```

- [ ] **Step 2: Push listing Nav below DemoSwitcher**

In `src/pages/listing/Nav.jsx`, change the nav style's `top: 0` to `top: 60px` and add a permanent semi-transparent background so it doesn't look floating:

```jsx
<nav style={{
  position: 'fixed', top: 60, left: 0, right: 0, zIndex: 100,
  padding: '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  background: 'rgba(10,9,8,0.82)',
  backdropFilter: 'blur(16px)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  transition: `all 0.5s ${EASE}`,
}}>
```

- [ ] **Step 3: Verify dev server shows RESERVE correctly**

Run: `npm run dev`
Navigate to `/airbnb`. Confirm the RESERVE button in the top-right of the listing Nav is fully visible and does not overlap the DemoSwitcher pill.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/pages/listing/Nav.jsx
git commit -m "fix: pass setLang to AirbnbListing; push listing nav below DemoSwitcher"
```

---

## Task 2: Rename STAYSCAPE → STAYFOLIO everywhere

**Files:**
- Modify: `src/pages/listing/Nav.jsx:23`
- Modify: `src/pages/AirbnbListing.jsx:27`
- Modify: `src/components/shared/Navbar.jsx:28`
- Modify: `src/components/Immersive/EnhancedCTA.jsx:61`

- [ ] **Step 1: listing/Nav.jsx — logo text**

Change line 23 in `src/pages/listing/Nav.jsx`:
```jsx
// FROM:
STAYSCAPE<span style={{ color: GOLD }}>.</span>GR
// TO:
STAYFOLIO<span style={{ color: GOLD }}>.</span>GR
```

- [ ] **Step 2: AirbnbListing.jsx — footer**

Change line 27 in `src/pages/AirbnbListing.jsx`:
```jsx
// FROM:
<span style={{ fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)' }}>
  STAYSCAPE<span style={{ color: GOLD }}>.</span>GR
</span>
// TO:
<span style={{ fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)' }}>
  STAYFOLIO<span style={{ color: GOLD }}>.</span>GR
</span>
```

- [ ] **Step 3: shared/Navbar.jsx — shared navbar**

In `src/components/shared/Navbar.jsx` find `STAYSCAPE` (line ~28) and replace:
```jsx
// FROM:
STAYSCAPE<span style={{ color: accentColor }}>.</span>GR
// TO:
STAYFOLIO<span style={{ color: accentColor }}>.</span>GR
```

- [ ] **Step 4: EnhancedCTA.jsx**

In `src/components/Immersive/EnhancedCTA.jsx` find `STAYSCAPE` (line ~61) and replace with `STAYFOLIO`. Read the full context around that line first to ensure the replacement is correct (it may have `.GR` suffix or not).

- [ ] **Step 5: Verify no remaining STAYSCAPE**

Run in terminal:
```bash
grep -r "STAYSCAPE\|Stayscape\|stayscape" src/
```
Expected: no output (zero matches).

- [ ] **Step 6: Commit**

```bash
git add src/pages/listing/Nav.jsx src/pages/AirbnbListing.jsx src/components/shared/Navbar.jsx src/components/Immersive/EnhancedCTA.jsx
git commit -m "rebrand: replace STAYSCAPE with STAYFOLIO across all pages"
```

---

## Task 3: Rename AIRBNB tab → ATHENS FLAT and reorder DemoSwitcher

**New order:** Athens Flat → Santorini → Crete → Athens → Cyclades → Ionian → Nisi

**Files:**
- Modify: `src/components/DemoSwitcher.jsx:6-14`

- [ ] **Step 1: Update versions array**

Replace the entire `versions` array in `src/components/DemoSwitcher.jsx`:

```jsx
const versions = [
  { id: 'airbnb',    en: 'ATHENS FLAT', gr: 'ΑΘΗΝΑ FLAT',  path: '/airbnb' },
  { id: 'santorini', en: 'SANTORINI',   gr: 'ΣΑΝΤΟΡΙΝΗ',   path: '/santorini' },
  { id: 'crete',     en: 'CRETE',       gr: 'ΚΡΗΤΗ',       path: '/crete' },
  { id: 'athens',    en: 'ATHENS',      gr: 'ΑΘΗΝΑ',       path: '/athens' },
  { id: 'cyclades',  en: 'CYCLADES',    gr: 'ΚΥΚΛΑΔΕΣ',    path: '/cyclades' },
  { id: 'ionian',    en: 'IONIAN',      gr: 'ΙΟΝΙΟ',       path: '/ionian' },
  { id: 'nisi',      en: 'NISI',        gr: 'ΝΗΣΙ',        path: '/nisi' },
];
```

- [ ] **Step 2: Verify in browser**

Navigate to any inner page (e.g. `/athens`). Confirm DemoSwitcher shows tabs in order: ATHENS FLAT · SANTORINI · CRETE · ATHENS · CYCLADES · IONIAN · NISI. Confirm clicking ATHENS FLAT navigates to `/airbnb`.

- [ ] **Step 3: Commit**

```bash
git add src/components/DemoSwitcher.jsx
git commit -m "feat: rename AIRBNB tab to ATHENS FLAT; reorder DemoSwitcher tabs"
```

---

## Task 4: Fix listing page Greek translations

**Scope:** Amenities labels, Description highlight cards, Hero bottom strip, Nav section links, StickyBar "/ night".

**Files:**
- Modify: `src/pages/listing/Amenities.jsx`
- Modify: `src/pages/listing/Description.jsx`
- Modify: `src/pages/listing/Hero.jsx`
- Modify: `src/pages/listing/Nav.jsx`
- Modify: `src/pages/listing/StickyBar.jsx`

### 4a — Amenities: bilingual items

- [ ] **Step 1: Replace static ITEMS with a function**

In `src/pages/listing/Amenities.jsx`, remove the top-level `const ITEMS = [...]` and replace with a function, then use it inside the component:

```jsx
function getItems(isGr) {
  return [
    { Icon: Ico.Wifi,   label: 'Gigabit WiFi',              sub: isGr ? 'Mesh-network για βιντεοκλήσεις'        : 'Mesh-routed for video calls' },
    { Icon: Ico.Wind,   label: isGr ? 'Κλιματισμός'        : 'A/C & Heating',  sub: isGr ? 'Smart, ελεγχόμενο από app'      : 'Smart, app-controlled' },
    { Icon: Ico.Coffee, label: 'Nespresso',                  sub: isGr ? 'Κάψουλες που ανανεώνονται καθημερινά' : 'Daily-restocked pods' },
    { Icon: Ico.Tv,     label: 'Smart TV',                   sub: 'Netflix · Disney · YouTube' },
    { Icon: Ico.Home,   label: isGr ? 'Self check-in'       : 'Self check-in',  sub: isGr ? 'Smart-lock, άμεση πρόσβαση'    : 'Smart-lock, instant access' },
    { Icon: Ico.MapPin, label: isGr ? 'Κεντρικό'            : 'Central',        sub: isGr ? '2 λεπτά Μετρό Ακρόπολης'      : '2 min Acropolis Metro' },
  ];
}
```

Inside the component body (after `const isGr = lang === 'gr';`), add:
```jsx
const ITEMS = getItems(isGr);
```

Then the existing `{ITEMS.map(...)}` works unchanged.

### 4b — Description: bilingual highlight cards

- [ ] **Step 2: Make highlights bilingual**

In `src/pages/listing/Description.jsx`, replace the hardcoded array inside the JSX with a bilingual version. After `const isGr = lang === 'gr';` add:

```jsx
const highlights = isGr ? [
  { t: 'Σπάνιο εύρημα.', d: 'Αυτό το studio είναι πλήρως κλεισμένο το 92% του χρόνου.' },
  { t: 'Σχεδιασμένο από την Ελένη.', d: 'Ελληνίδα αρχιτέκτων-host. Κάθε αντικείμενο επιλεγμένο με πρόθεση.' },
  { t: '2 λεπτά από το Μετρό Ακρόπολης.', d: 'Στο κατώφλι του μεγαλύτερου υπαίθριου μουσείου στον κόσμο.' },
] : [
  { t: 'Rare find.', d: 'This studio is fully booked 92% of the year.' },
  { t: 'Designed by Eleni.', d: 'A Greek architect-host. Every object placed with intent.' },
  { t: '2 min from the Acropolis Metro.', d: "You are at the doorstep of the world's greatest open-air museum." },
];
```

Then in the JSX, change the hardcoded array map from:
```jsx
{[
  { t: 'Rare find.', d: 'This studio...' },
  ...
].map((h, i) => (
```
to:
```jsx
{highlights.map((h, i) => (
```

### 4c — Hero: bilingual bottom strip

- [ ] **Step 3: Translate Hero static strings**

In `src/pages/listing/Hero.jsx`, the bottom-left strip and awards strip are hardcoded English. Make them bilingual:

```jsx
// Replace the awards strip array:
{(isGr
  ? ['Condé Nast · Featured', 'Airbnb · Top 1%', "Editor's Pick · 2026"]
  : ['Featured · Condé Nast', 'Top 1% · Airbnb', "Editor's Pick · 2026"]
).map((a, i) => ( ... ))}

// Replace the bottom-left "Now booking" line:
<span style={{ ... }}>
  {isGr ? 'Ανοιχτό · Άνοιξη 2026' : 'Now booking · Spring 2026'}
</span>

// Replace "87 reviews" inline:
<span style={{ color: 'rgba(255,255,255,0.4)' }}>· {isGr ? '87 κριτικές' : '87 reviews'}</span>
```

Note: `isGr` is not defined yet in Hero — add `const isGr = lang === 'gr';` at the top of the component body (after the scrollY state).

### 4d — Nav: bilingual section links

- [ ] **Step 4: Translate section links in listing Nav**

In `src/pages/listing/Nav.jsx`, the section links array is hardcoded English. Replace it with a bilingual version. After `const [scrolled, setScrolled] = useState(false);`, add:

```jsx
const isGr = lang === 'gr';
const NAV_LINKS = isGr
  ? [
      { l: 'Ιστορία', h: '#story' },
      { l: 'Γκαλερί', h: '#gallery' },
      { l: 'Κρατήσεις', h: '#calendar' },
      { l: 'Κριτικές', h: '#reviews' },
    ]
  : [
      { l: 'Story', h: '#story' },
      { l: 'Gallery', h: '#gallery' },
      { l: 'Stays', h: '#calendar' },
      { l: 'Reviews', h: '#reviews' },
    ];
```

Then replace the hardcoded array in the JSX:
```jsx
// FROM:
{[
  { l: 'Story', h: '#story' },
  { l: 'Gallery', h: '#gallery' },
  { l: 'Stays', h: '#calendar' },
  { l: 'Reviews', h: '#reviews' },
].map((i) => (
// TO:
{NAV_LINKS.map((i) => (
```

Also translate the RESERVE button label:
```jsx
// FROM:
<a href="#book" style={{ ... }}>Reserve</a>
// TO:
<a href="#book" style={{ ... }}>{isGr ? 'Κράτηση' : 'Reserve'}</a>
```

### 4e — StickyBar: translate "/ night"

- [ ] **Step 5: Translate night label**

In `src/pages/listing/StickyBar.jsx` line 24, change:
```jsx
// FROM:
<span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>/ night</span>
// TO:
<span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{lang === 'gr' ? '/ διανυκτέρευση' : '/ night'}</span>
```

- [ ] **Step 6: Verify in browser**

Navigate to `/airbnb`, switch language to GR. Confirm: section nav links show in Greek, amenities labels are Greek, highlight cards are Greek, StickyBar shows "/ διανυκτέρευση".

- [ ] **Step 7: Commit**

```bash
git add src/pages/listing/Amenities.jsx src/pages/listing/Description.jsx src/pages/listing/Hero.jsx src/pages/listing/Nav.jsx src/pages/listing/StickyBar.jsx
git commit -m "feat: complete Greek translations for all listing page components"
```

---

## Task 5: Fix Landing page Greek copy gaps

**Issues found in `src/pages/Landing.jsx` GR copy object:**
1. `heroEyebrow` — same as English (`'Luxury hotel film · direct inquiry site'`)
2. `heroStats[2].label` — `'specialist'` (not translated)
3. `examplesLabel` — `'Stay experiences'` (not translated)
4. `processLabel` — `'Process'` (English; keep as-is since it's a widely used business term in Greek)

**Files:**
- Modify: `src/pages/Landing.jsx` (COPY.gr object)

- [ ] **Step 1: Fix GR heroEyebrow**

In `src/pages/Landing.jsx`, inside `COPY.gr`, change:
```js
// FROM:
heroEyebrow: 'Luxury hotel film · direct inquiry site',
// TO:
heroEyebrow: 'Luxury hotel film · άμεσο inquiry',
```

- [ ] **Step 2: Fix GR heroStats specialist label**

In `COPY.gr.heroStats`, change:
```js
// FROM:
{ value: '1', label: 'specialist' },
// TO:
{ value: '1', label: 'ειδικός' },
```

- [ ] **Step 3: Fix GR examplesLabel**

In `COPY.gr`, change:
```js
// FROM:
examplesLabel: 'Stay experiences',
// TO:
examplesLabel: 'Stay εμπειρίες',
```

- [ ] **Step 4: Verify in browser**

Navigate to `/`, switch language to GR. Confirm:
- Hero eyebrow shows `'Luxury hotel film · άμεσο inquiry'`
- Stats row shows `1 ειδικός`
- Examples section label shows `Stay εμπειρίες`

- [ ] **Step 5: Commit**

```bash
git add src/pages/Landing.jsx
git commit -m "fix: complete missing Greek translations in Landing page COPY object"
```

---

## Self-Review

**Spec coverage:**
- ✅ RESERVE display fix (Task 1)
- ✅ STAYSCAPE → STAYFOLIO (Task 2)
- ✅ AIRBNB tab rename + reorder (Task 3)
- ✅ Listing translations (Task 4)
- ✅ Landing translations (Task 5)
- ✅ setLang prop bug (Task 1)

**No placeholders, no TBDs.**

**Type consistency:** All component props (`lang`, `setLang`, `isGr`) are used consistently across tasks. `getItems(isGr)` is defined and called within the same file.
