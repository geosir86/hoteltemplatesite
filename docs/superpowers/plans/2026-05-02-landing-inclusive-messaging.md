# Landing Inclusive Messaging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Stayfolio landing page clearly communicate that the service is for all types of Greek accommodations — not just luxury villas — by fixing hero copy, adding a linked property-type pill list, and reframing the problem section body.

**Architecture:** All changes are in `src/pages/Landing.jsx` only. The `COPY` object (EN + GR) receives four updated string fields and one new `propertyTypes` array. The hero JSX gets one new inline render block below the existing stats row. No new files, no new components.

**Tech Stack:** React 18, React Router v6 (`Link`), inline styles (no Tailwind in this file), `BRAND` color tokens defined at top of `Landing.jsx`

---

## File Map

| File | Change |
|------|--------|
| `src/pages/Landing.jsx` | Update `COPY.en` + `COPY.gr`: heroEyebrow, heroSub, propertyTypes (new), problemBody. Add pill list render below hero stats. |

---

## Task 1: Update hero copy strings (EN + GR)

**Files:**
- Modify: `src/pages/Landing.jsx` — `COPY.en` and `COPY.gr` objects

- [ ] **Step 1: Update COPY.en.heroEyebrow**

Find in `src/pages/Landing.jsx` inside `COPY.en`:
```js
heroEyebrow: 'Luxury hotel film · direct inquiry site',
```
Replace with:
```js
heroEyebrow: 'Premium website · direct inquiry',
```

- [ ] **Step 2: Update COPY.gr.heroEyebrow**

Find in `COPY.gr`:
```js
heroEyebrow: 'Luxury hotel film · direct inquiry site',
```
Replace with:
```js
heroEyebrow: 'Premium website · άμεσο inquiry',
```

- [ ] **Step 3: Update COPY.en.heroSub**

Find in `COPY.en`:
```js
heroSub:
  'I build cinematic, bilingual websites for Greek villas, Airbnb hosts, and boutique stays, so their online presence feels as considered as the real stay.',
```
Replace with:
```js
heroSub:
  'I build cinematic, bilingual websites for Greek studios, apartments, Airbnb hosts, and villas — so their online presence feels as considered as the real stay.',
```

- [ ] **Step 4: Update COPY.gr.heroSub**

Find in `COPY.gr`:
```js
heroSub:
  'Φτιάχνω cinematic, δίγλωσσα websites για villas, Airbnb και boutique stays στην Ελλάδα, ώστε η online παρουσία τους να δείχνει όσο προσεγμένη είναι και η πραγματική εμπειρία.',
```
Replace with:
```js
heroSub:
  'Φτιάχνω cinematic, δίγλωσσα websites για studios, διαμερίσματα, Airbnb και villas στην Ελλάδα, ώστε η online παρουσία τους να δείχνει όσο προσεγμένη είναι και η πραγματική εμπειρία.',
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/Landing.jsx
git commit -m "copy: update hero eyebrow and heroSub for inclusive property messaging"
```

---

## Task 2: Add propertyTypes to COPY + render pill list

**Files:**
- Modify: `src/pages/Landing.jsx` — `COPY.en`, `COPY.gr`, and hero JSX section

- [ ] **Step 1: Add propertyTypes to COPY.en**

Inside `COPY.en` (after `heroStats` or before `problemLabel` — anywhere inside the object), add:
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

- [ ] **Step 2: Add propertyTypes to COPY.gr**

Inside `COPY.gr`, add:
```js
propertyTypes: [
  { label: 'Studios',                path: '/airbnb' },
  { label: 'Διαμερίσματα',          path: '/athens' },
  { label: 'Island Villas',         path: '/cyclades' },
  { label: 'Καταφύγια φύσης',       path: '/ionian' },
  { label: 'Παραδοσιακές επαύλεις', path: '/crete' },
  { label: 'Boutique Suites',       path: '/nisi' },
  { label: 'Signature Stays',       path: '/santorini' },
],
```

- [ ] **Step 3: Find the hero stats row in JSX**

In the hero JSX, find the existing stats row. It looks like this (mapped from `c.heroStats`):
```jsx
<div className="... flex ...">
  {c.heroStats.map((s) => (
    ...
  ))}
</div>
```

This is the element you will add the pill list **directly after** (as a sibling element, not a child).

- [ ] **Step 4: Add pill list render block after stats row**

Immediately after the closing `</div>` of the heroStats map, add:

```jsx
<div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: '0 4px', alignItems: 'center' }}>
  {c.propertyTypes.map((pt, i) => (
    <span key={pt.path} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {i > 0 && (
        <span style={{ color: BRAND.taupe, fontSize: 10, userSelect: 'none' }}>·</span>
      )}
      <Link
        to={pt.path}
        style={{
          fontSize: 10,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: BRAND.taupe,
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = BRAND.bronze)}
        onMouseLeave={e => (e.currentTarget.style.color = BRAND.taupe)}
      >
        {pt.label}
      </Link>
    </span>
  ))}
</div>
```

Note: `Link` is already imported from `react-router-dom` at the top of `Landing.jsx`. `BRAND.taupe` is `#6F685F` and `BRAND.bronze` is `#B8894A` — both defined in the `BRAND` constant at the top of the file.

- [ ] **Step 5: Verify in browser**

Run `npm run dev`. Navigate to `/`. Confirm:
- The pill list appears below the stats row in the hero section
- All 7 types are visible: Studios · Apartments · Island Villas · Nature Retreats · Heritage Estates · Boutique Suites · Signature Stays
- Hovering a label changes its color to bronze
- Clicking each label navigates to the correct demo route
- Switch language to GR — Greek labels appear for the correct items

- [ ] **Step 6: Commit**

```bash
git add src/pages/Landing.jsx
git commit -m "feat: add linked property-type pill list below hero stats"
```

---

## Task 3: Update problemBody (EN + GR)

**Files:**
- Modify: `src/pages/Landing.jsx` — `COPY.en.problemBody` and `COPY.gr.problemBody`

- [ ] **Step 1: Update COPY.en.problemBody**

Find in `COPY.en`:
```js
problemBody:
  'Airbnb and Booking pages are useful, but they make many properties feel the same. A dedicated site gives your stay a place to show its atmosphere, story, and value.',
```
Replace with:
```js
problemBody:
  'Airbnb and Booking pages are useful, but they make every property feel the same — studio, apartment, or villa alike. A dedicated site gives your stay a place to show its atmosphere, story, and value.',
```

- [ ] **Step 2: Update COPY.gr.problemBody**

Find in `COPY.gr`:
```js
problemBody:
  'Airbnb και Booking είναι χρήσιμα, αλλά κάνουν πολλά καταλύματα να μοιάζουν ίδια. Ένα δικό σου site δίνει στο property χώρο να δείξει ατμόσφαιρα, ιστορία και αξία.',
```
Replace with:
```js
problemBody:
  'Airbnb και Booking είναι χρήσιμα, αλλά κάνουν κάθε κατάλυμα να μοιάζει ίδιο — studio, διαμέρισμα ή villa. Ένα δικό σου site δίνει στο property χώρο να δείξει ατμόσφαιρα, ιστορία και αξία.',
```

- [ ] **Step 3: Verify in browser**

Navigate to `/#why` (or scroll to the problem section). Confirm the body text reads "every property feel the same — studio, apartment, or villa alike." Switch to GR and confirm the Greek version appears.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Landing.jsx
git commit -m "copy: reframe problemBody to explicitly include studios and apartments"
```

---

## Self-Review

**Spec coverage:**
- ✅ heroEyebrow EN + GR (Task 1)
- ✅ heroSub EN + GR (Task 1)
- ✅ propertyTypes array EN + GR with `{ label, path }` shape (Task 2)
- ✅ Pill list rendered below hero stats with Link + hover (Task 2)
- ✅ problemBody EN + GR (Task 3)

**Placeholder scan:** None found.

**Type consistency:** `propertyTypes` defined as `{ label: string, path: string }[]` in Task 2 Step 1 — used as `pt.label` and `pt.path` in Task 2 Step 4. Consistent throughout.
