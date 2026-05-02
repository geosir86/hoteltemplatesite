# Hero Carousel — Per-Listing Frames Design

## Goal
Replace the 4 generic hero frames in CinematicHero with 7 listing-linked frames. Each frame shows the property's hero image, its type label, a location detail, and a CTA pill linking to the demo. The entire image is clickable. The generic bottom pills are removed. The property-type pill list below stats is removed (carousel replaces it).

## Changes

### HERO_FRAMES (CinematicHero.jsx)
Replace with 7 frames:
```js
const HERO_FRAMES = [
  { image: '/assets/athens_flat_hero.png', typeLabel: { en: 'Studios', gr: 'Studios' }, detail: { en: '45m² · Monastiraki, Athens', gr: '45τμ · Μοναστηράκι, Αθήνα' }, path: '/airbnb', timecode: '07:14' },
  { image: '/assets/greek_luxury_penthouse_acropolis_view_1776942386364.png', typeLabel: { en: 'Apartments', gr: 'Διαμερίσματα' }, detail: { en: 'Penthouse · Acropolis view', gr: 'Penthouse · Θέα Ακρόπολης' }, path: '/athens', timecode: '06:42' },
  { image: '/assets/cyclades_pool.png', typeLabel: { en: 'Island Villas', gr: 'Island Villas' }, detail: { en: 'Clifftop pool · Cyclades', gr: 'Πισίνα με θέα · Κυκλάδες' }, path: '/cyclades', timecode: '08:30' },
  { image: '/assets/ionian_hero.png', typeLabel: { en: 'Nature Retreats', gr: 'Καταφύγια φύσης' }, detail: { en: 'Forest & sea · Ionian coast', gr: 'Δάσος & θάλασσα · Ιόνιο' }, path: '/ionian', timecode: '09:05' },
  { image: '/assets/crete_hero.png', typeLabel: { en: 'Heritage Estates', gr: 'Παραδοσιακές επαύλεις' }, detail: { en: 'Stone manor · Crete', gr: 'Πέτρινη έπαυλη · Κρήτη' }, path: '/crete', timecode: '19:21' },
  { image: '/assets/nisi_hero.png', typeLabel: { en: 'Boutique Suites', gr: 'Boutique Suites' }, detail: { en: 'Cave pool · Milos', gr: 'Cave pool · Μήλος' }, path: '/nisi', timecode: '08:03' },
  { image: '/assets/santorini_hero_day.png', typeLabel: { en: 'Signature Stays', gr: 'Signature Stays' }, detail: { en: 'Caldera view · Oia', gr: 'Θέα Καλντέρας · Οία' }, path: '/santorini', timecode: '06:15' },
];
```

### Overlay layout (bottom section of image panel)
- Remove the 2 generic pills ("Listing → Stayfolio", "Cinematic property presence")
- Replace with:
  - **Left**: bronze line accent + typeLabel (uppercase, bronzeLight) + detail (white/55, smaller)
  - **Right**: CTA pill Link → `frame.path`, text EN: "See the experience" / GR: "Δες την εμπειρία", ArrowRight icon

### Interaction
- Entire image panel wrapped in `<Link to={frame.path}>` with `cursor: pointer`
- Hover: overlay gradient darkens (add `hover:from-black/60` or inline onMouseEnter/Leave state)
- CTA pill hover: `scale(1.03)` transition
- Auto-advance timer stays at 5200ms

### Cleanup
- Remove `propertyTypes` pill list render from CinematicHero (below stats grid)
- Remove `propertyTypes` arrays from `COPY.en` and `COPY.gr` in Landing.jsx
