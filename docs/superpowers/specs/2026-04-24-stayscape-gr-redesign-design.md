# Stayscape GR — World-Class Redesign Spec
**Date:** 2026-04-24  
**Goal:** Top-3-in-the-world luxury property listing site that makes every Greek Airbnb/hotel owner want to buy a site like this.

---

## 1. Overview

Stayscape GR is a React SPA showcasing 5 luxury Greek properties (Athens, Cyclades, Ionian, Crete, Nisi). The redesign adds a **landing page** and elevates all 5 destination pages to award-winning quality. The site serves a **dual audience**: travelers booking properties (B2C) and hospitality business owners who want to buy a similar site (B2B).

---

## 2. Architecture

### Routes
| Route | Page | Status |
|---|---|---|
| `/` | Landing — new homepage | **New** |
| `/athens` | Athenian Penthouse | Rebuild |
| `/cyclades` | Villa Aether | Rebuild |
| `/ionian` | Casa Verde | Rebuild |
| `/crete` | Villa Minos | Rebuild |
| `/nisi` | Nisi | Rebuild |

### File Structure Changes
```
src/
  pages/
    Landing.jsx          ← new
    Athens.jsx           ← full rebuild
    Cyclades.jsx         ← full rebuild
    Ionian.jsx           ← full rebuild
    Crete.jsx            ← full rebuild
    Nisi.jsx             ← full rebuild (move from immersive/)
  components/
    shared/
      Cursor.jsx         ← magnetic cursor, color prop
      Navbar.jsx         ← floating, language toggle, CTA link
      StickyBookingBar.jsx
      SectionReveal.jsx  ← existing, keep
      PageTransition.jsx ← new fade+scale wrapper
    landing/
      HeroLanding.jsx
      PropertyRow.jsx    ← hover → image preview slides in from right
      B2BSection.jsx
    property/
      HeroCinematic.jsx  ← existing, enhance
      Gallery.jsx
      DetailsStrip.jsx
      RoomParallax.jsx
      Amenities.jsx
      Reviews.jsx
      DualCTA.jsx
  data/
    destinations.js      ← unified data layer (replaces immersiveContent.js)
```

### Data Layer
Single source of truth in `src/data/destinations.js` — replaces `immersiveContent.js` and all per-page inline constants. Migration: copy all data from `immersiveContent.js` and the constants at the top of each page file into the new unified structure. Each destination object shape: `{ theme, heroImage, gallery[], rooms[], amenities[], reviews[], faqs[], pricing: { from, currency } }`, with `content: { en: {...}, gr: {...} }` for bilingual text.

---

## 3. Design System

### Typography
- **Headings:** Per-destination (see theme table below)
- **Body:** Inter 300/400/500
- **Labels/caps:** Inter 400, `letter-spacing: 0.2–0.4em`, uppercase

### Global tokens (Tailwind extend)
Keep existing `bg-background`, `text-foreground`, `text-muted`, `bg-dark`. Add per-destination CSS variables injected at the page root via inline style or a theme class.

### Effects
- Framer Motion throughout, shared `EASE = [0.23, 1, 0.32, 1]`
- All animations wrapped with `useReducedMotion()` — if true, no motion
- Scroll progress bar (thin, 3px, at top, destination-colored)
- Magnetic cursor (desktop only, `pointer-events-none`, `mix-blend-difference`)

---

## 4. Per-Destination Themes

| Destination | Background | Accent | Font (heading) | Personality |
|---|---|---|---|---|
| Athens | `#0A0A0A` | Gold `#C9A84C` | Cormorant Garamond | Cinematic dark |
| Cyclades | `#F8F8F8` | Aegean `#0E5FA8` | Playfair Display | Minimal coastal |
| Ionian | `#EAE0D5` | Forest `#1A2E1E` | DM Serif Display | Organic earth |
| Crete | `#1A0F08` | Ochre `#D4892A` | Libre Baskerville | Heritage warm |
| Nisi | `#1C1523` | Rose Gold `#C8956C` | Fraunces | Boutique journal |

All 5 destination fonts are preloaded in `index.html` (Cormorant Garamond, Playfair Display, DM Serif Display, Libre Baskerville, Fraunces) with `display=swap`. No runtime injection. Applied via `style={{ fontFamily }}` on heading elements — Tailwind does not need to know about these.

---

## 5. Landing Page (`/`)

### Sections (top to bottom)

**A. Navbar** (floating, fixed)
- Left: `STAYSCAPE GR` wordmark (Plus Jakarta Sans, weight 700)
- Right: `EN / GR` language toggle + `Get your site →` CTA button (destination-gold border)
- Background: transparent → `rgba(0,0,0,0.8)` on scroll (backdrop-blur)

**B. Hero**
- Full viewport, dark background `#080808`
- Animated headline (word-by-word reveal): *"Where Greek Luxury Lives Online"*
- Sub-copy: *"Five destinations. Five personalities. One standard."*
- Scroll indicator: animated chevron

**C. Properties List**
- 5 rows, full-width, `border-bottom: 1px solid #1a1a1a`
- Each row: destination number + name + tagline + price-from
- Hover: full-bleed preview image slides in from right (absolute positioned, `z-0`, image `object-cover`, text stays on top)
- Click: navigates to destination page (React Router `<Link>`)
- Row accent color matches destination theme

**D. B2B Section**
- Dark background, centered
- Headline: *"Want a site like this for your property?"*
- Sub: *"We design and build custom luxury listing pages for Greek hospitality businesses."*
- Two CTAs: `WhatsApp →` + `See how it works →`
- Social proof: *"Trusted by hosts across Athens, Cyclades, Ionian, Crete"*

---

## 6. Destination Page Flow

All 5 destination pages follow this exact section order:

### 6.1 Hero (full-screen)
- Background image with parallax scale on scroll (`useScroll` + `useTransform`)
- Dark overlay (radial gradient, vignette)
- Title: letter-by-letter or word-by-word reveal on mount
- Subtitle: fade in with delay
- Scroll hint: animated line + "Scroll" label

### 6.2 Sticky Booking Bar
- Hidden until `scrollY > 100`
- Slides in from top with spring animation
- Content: property name + star rating + price/night + `Book` button
- Themed: uses destination accent color for the Book button
- On mobile: full-width bottom bar

### 6.3 Gallery (editorial masonry)
- 6 photos in a responsive CSS grid (same structure across destinations: first image large, rest 2-col)
- First image large (col-span-2 or row-span-2), rest smaller
- Hover: subtle scale 1.02 + overlay with photo number
- Click: opens Lightbox (existing component, keep)
- "View all photos" button

### 6.4 Details Strip
- Single horizontal row (scrollable on mobile)
- Items: Guest count · Bedrooms · Bathrooms · Rating (⭐ x.x) · Host name + avatar
- Clean dividers, muted text, destination accent for rating star

### 6.5 Rooms (parallax reveals)
- 3 rooms, each: full-width section, image left + text right (alternating on odd)
- Image has parallax: scrolls slightly slower than text (`useTransform`)
- Text: room title (large serif) + 2-line description
- `SectionReveal` wrapper for entrance animation

### 6.6 Amenities
- Dark-themed section (destination bg, or forced dark if page is light)
- Icon grid: 3–4 columns, Lucide icons, accent-colored
- Section title: "What's included"

### 6.7 Reviews
- 3 cards, horizontal row (snap scroll on mobile)
- Each: avatar + name + location + 5 stars + quote text
- Clean, minimal — no borders, just subtle shadow or background

### 6.8 Dual CTA (full-bleed)
- Destination background, large centered layout
- Primary: `Book this stay` → (Airbnb/external link or placeholder)
- Secondary below: `"Impressed by this site? We build them for properties like yours."` + `Get your site →`

---

## 7. Navigation & Routing

- React Router v6, existing `BrowserRouter` setup in `App.jsx`
- Add `/` route for `Landing`
- Add `/nisi` route (currently only in immersive paths)
- `DemoSwitcher` component: keep as dev-only nav (rendered only when `import.meta.env.DEV === true`), hidden in production build
- Language state: `useState('en')` lifted to `App`, passed as prop to all pages

---

## 8. Shared Components

### `Cursor`
- Props: `accentColor` (hex string)
- Dot + ring, mix-blend-difference, desktop only
- Ring expands on hover over `[data-hover]` elements

### `Navbar`
- Props: `theme` (destination theme object or null for landing)
- On landing: dark background, gold CTA
- On destination: transparent → blur on scroll, destination-colored CTA

### `PageTransition`
- Wraps each page in `<AnimatePresence>`
- On enter: `opacity 0→1, y 20→0` (300ms)
- On exit: `opacity 1→0` (200ms)
- Respects `useReducedMotion`

### `StickyBookingBar`
- Props: `title`, `rating`, `price`, `accentColor`, `bookingUrl`
- Controlled by `scrollY` threshold via `useScroll`

---

## 9. Bilingual Support (EN / GR)

- Language toggle in Navbar: `EN | GR`
- State in `App.jsx`: `const [lang, setLang] = useState('en')`
- All destination data already bilingual in `destinations.js`
- Landing page copy: two objects `COPY.en` and `COPY.gr` at top of `Landing.jsx`

---

## 10. Performance & Accessibility

- `prefers-reduced-motion`: all Framer Motion animations check `useReducedMotion()` — if true, skip transitions
- Images: `loading="lazy"` on all below-fold images
- Alt text: all images have descriptive alt
- Keyboard nav: `focus-visible` rings on all interactive elements (Tailwind `focus-visible:ring-2`)
- Contrast: destination themes selected to meet 4.5:1 on body text
- No emojis as icons — Lucide icons throughout
- `cursor-pointer` on all clickable elements

---

## 11. Anti-Patterns to Avoid

- No raw hex colors in JSX — use theme object or CSS variables
- No blocking fonts — all Google Fonts loaded with `display=swap`
- No layout shift on cursor/sticky bar appear
- No animation on initial page load that delays content visibility
- No `useEffect` for animations that Framer Motion handles natively
