# Landing Page — Inclusive Messaging Design

## Goal

Make the Stayfolio landing page clearly communicate that the service is for **all types of Greek accommodations** — studios, apartments, regular Airbnb listings — not just luxury villas or boutique properties. The premium look and feel stays unchanged; only the messaging becomes more inclusive.

## Problem

The current hero copy uses words like "Luxury hotel film", "villas", and "boutique stays" which signal "this is for high-end properties only." A regular studio or apartment owner in Greece reads this and thinks the service is not for them — even though it is.

## Approach

Option B: Hero copy fixes + property type pill list + small problem section reframe. No new sections. One file (`Landing.jsx`).

---

## Changes

### 1. heroEyebrow

Remove "Luxury" framing. Keep it factual.

```
EN (was):  'Luxury hotel film · direct inquiry site'
EN (new):  'Premium website · direct inquiry'

GR (was):  'Luxury hotel film · direct inquiry site'
GR (new):  'Premium website · άμεσο inquiry'
```

### 2. heroSub

Put studios and apartments first, villas later. Same sentence structure, more inclusive order.

```
EN (was):  'I build cinematic, bilingual websites for Greek villas,
            Airbnb hosts, and boutique stays...'
EN (new):  'I build cinematic, bilingual websites for Greek studios,
            apartments, Airbnb hosts, and villas — so their online
            presence feels as considered as the real stay.'

GR (was):  'Φτιάχνω cinematic, δίγλωσσα websites για villas,
            Airbnb και boutique stays στην Ελλάδα...'
GR (new):  'Φτιάχνω cinematic, δίγλωσσα websites για studios,
            διαμερίσματα, Airbnb και villas στην Ελλάδα, ώστε η
            online παρουσία τους να δείχνει όσο προσεγμένη είναι
            και η πραγματική εμπειρία.'
```

### 3. Property Type Pill List (with demo links)

A new inline element rendered directly below the existing 3-stat hero row (`2 languages · 14 days · 1 specialist`). Each property type is a clickable `<Link>` to its corresponding demo page — one type per demo, no duplicates.

**Mapping (1-to-1 with demos):**

| EN Label | GR Label | Demo path |
|---|---|---|
| Studios | Studios | `/airbnb` |
| Apartments | Διαμερίσματα | `/athens` |
| Island Villas | Island Villas | `/cyclades` |
| Nature Retreats | Καταφύγια φύσης | `/ionian` |
| Heritage Estates | Παραδοσιακές επαύλεις | `/crete` |
| Boutique Suites | Boutique Suites | `/nisi` |
| Signature Stays | Signature Stays | `/santorini` |

**Style** (matches existing design system):
- `fontSize: 10px`
- `letterSpacing: '0.3em'`
- `textTransform: 'uppercase'`
- `color: BRAND.taupe` (`#6F685F`) at rest
- `color: BRAND.bronze` (`#B8894A`) on hover — matches existing nav link hover color
- No underline (`textDecoration: 'none'`)
- Items separated by `·` plain text spans (not links)
- `marginTop: 24px` below the stats row
- Bilingual: reads from `COPY[lang]` object

**Implementation:** Add `propertyTypes` array to both `COPY.en` and `COPY.gr`. Each item is `{ label, path }`. Render as inline `<Link>` elements from `react-router-dom`. No new component needed.

```js
// COPY.en
propertyTypes: [
  { label: 'Studios',          path: '/airbnb' },
  { label: 'Apartments',       path: '/athens' },
  { label: 'Island Villas',    path: '/cyclades' },
  { label: 'Nature Retreats',  path: '/ionian' },
  { label: 'Heritage Estates', path: '/crete' },
  { label: 'Boutique Suites',  path: '/nisi' },
  { label: 'Signature Stays',  path: '/santorini' },
],

// COPY.gr
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

Rendered as:
```jsx
<div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: '0 4px', alignItems: 'center' }}>
  {c.propertyTypes.map((pt, i) => (
    <span key={pt.path} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {i > 0 && <span style={{ color: BRAND.taupe, fontSize: 10 }}>·</span>}
      <Link
        to={pt.path}
        style={{
          fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: BRAND.taupe, textDecoration: 'none', transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = BRAND.bronze}
        onMouseLeave={e => e.currentTarget.style.color = BRAND.taupe}
      >
        {pt.label}
      </Link>
    </span>
  ))}
</div>
```
`Link` is already imported from `react-router-dom` in `Landing.jsx`.

### 4. problemBody

Add "studio, apartment, or villa alike" to make the framing explicitly inclusive.

```
EN (was):  'Airbnb and Booking pages are useful, but they make
            many properties feel the same. A dedicated site gives
            your stay a place to show its atmosphere, story, and value.'
EN (new):  'Airbnb and Booking pages are useful, but they make every
            property feel the same — studio, apartment, or villa alike.
            A dedicated site gives your stay a place to show its
            atmosphere, story, and value.'

GR (was):  'Airbnb και Booking είναι χρήσιμα, αλλά κάνουν πολλά
            καταλύματα να μοιάζουν ίδια. Ένα δικό σου site δίνει
            στο property χώρο να δείξει ατμόσφαιρα, ιστορία και αξία.'
GR (new):  'Airbnb και Booking είναι χρήσιμα, αλλά κάνουν κάθε
            κατάλυμα να μοιάζει ίδιο — studio, διαμέρισμα ή villa.
            Ένα δικό σου site δίνει στο property χώρο να δείξει
            ατμόσφαιρα, ιστορία και αξία.'
```

---

## What Does NOT Change

- `problemTitle` — "Premium in person. Lost inside another listing online." stays as-is (already inclusive)
- `problemPoints` — all three bullet points stay as-is (already generic)
- All other COPY sections (capabilities, examples, why, process, pricing, contact)
- Visual design, layout, fonts, colors — nothing changes
- Any other file besides `Landing.jsx`

---

## Self-Review

- **Placeholders:** None.
- **Consistency:** `propertyTypes` key added to both `COPY.en` and `COPY.gr` with identical structure `{ label, path }[]`. Used once in hero JSX. `Link` already imported. No orphaned keys.
- **Scope:** Single file, four copy changes + one small render addition. Tight.
- **Ambiguity:** Pill list uses `BRAND.taupe` color — defined at top of `Landing.jsx` as `#6F685F`. No ambiguity.
