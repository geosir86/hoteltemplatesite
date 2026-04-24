# Stayscape GR World-Class Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Stayscape GR into a world-class luxury property showcase with a new dual B2B/B2C landing page and five fully redesigned destination pages, each with a unique visual identity.

**Architecture:** Shared components (Cursor, Navbar, StickyBookingBar, SectionReveal, Lightbox) live in `src/components/shared/`. Property section components (Hero, Gallery, RoomParallax, Amenities, Reviews, DualCTA) live in `src/components/property/`. All data lives in `src/data/destinations.js`. Each destination page assembles components with its own theme. Landing page (`/`) showcases all destinations + B2B CTA.

**Tech Stack:** React 18, Framer Motion, Tailwind CSS v3, Lucide React, React Router v6

---

## File Map

**Create:**
- `src/data/destinations.js` — unified data for all 5 destinations
- `src/components/shared/Cursor.jsx` — magnetic cursor, accent color prop
- `src/components/shared/Navbar.jsx` — floating nav, language toggle
- `src/components/shared/StickyBookingBar.jsx` — appears on scroll
- `src/components/shared/SectionReveal.jsx` — scroll-triggered entrance
- `src/components/shared/Lightbox.jsx` — full-screen photo viewer
- `src/components/property/HeroCinematic.jsx` — full-screen hero with parallax
- `src/components/property/Gallery.jsx` — editorial masonry grid
- `src/components/property/DetailsStrip.jsx` — guests/beds/baths/rating
- `src/components/property/RoomParallax.jsx` — room reveal sections
- `src/components/property/AmenitiesGrid.jsx` — icon grid
- `src/components/property/ReviewCards.jsx` — 3 quote cards
- `src/components/property/DualCTA.jsx` — book + "want this site" CTA
- `src/components/landing/HeroLanding.jsx` — landing hero
- `src/components/landing/PropertyRow.jsx` — hover-preview row
- `src/components/landing/B2BSection.jsx` — B2B pitch section
- `src/pages/Landing.jsx` — new homepage
- `src/pages/Nisi.jsx` — new Nisi page (move from immersive/)

**Modify:**
- `index.html` — add all 5 destination Google Fonts
- `src/App.jsx` — add `/` and `/nisi` routes, language state
- `src/pages/Athens.jsx` — full rebuild using shared components
- `src/pages/Cyclades.jsx` — full rebuild using shared components
- `src/pages/Ionian.jsx` — full rebuild using shared components
- `src/pages/Crete.jsx` — full rebuild using shared components

---

## Task 1: Fonts + Data Layer

**Files:**
- Modify: `index.html`
- Create: `src/data/destinations.js`

- [ ] **Step 1: Update index.html — add all destination fonts**

Replace the existing `<link>` font line in `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stayscape GR — Greek Luxury Properties</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create `src/data/destinations.js`**

```js
import { Wifi, Wind, Coffee, Tv, Car, Waves, Sun, Anchor, Umbrella, Mountain, Shield, Star } from 'lucide-react';

export const DESTINATIONS = {
  athens: {
    id: 'athens',
    path: '/athens',
    theme: {
      bg: '#0A0A0A',
      fg: '#F5F0E8',
      accent: '#C9A84C',
      muted: 'rgba(245,240,232,0.5)',
      border: 'rgba(201,168,76,0.2)',
      fontHeading: "'Cormorant Garamond', serif",
    },
    pricing: { from: 290, currency: '€', label: '/ νύχτα' },
    heroImage: '/assets/greek_luxury_penthouse_acropolis_view_1776942386364.png',
    gallery: [
      '/assets/greek_luxury_penthouse_acropolis_view_1776942386364.png',
      '/assets/greek_luxury_interior_master_bedroom_1776942408192.png',
      '/assets/greek_luxury_living_room_dining_1776942426126.png',
      '/assets/greek_luxury_terrace_sunset_view_1776942676038.png',
      '/assets/greek_luxury_marble_bathroom_1776942694181.png',
      '/assets/greek_luxury_kitchen_detail_1776942713984.png',
    ],
    details: { guests: 8, beds: 4, baths: 3, sqm: '280m²', rating: 4.98, reviews: 200 },
    amenities: [
      { icon: Wifi, label: 'WiFi 1Gbps' }, { icon: Wind, label: 'A/C Nest' },
      { icon: Coffee, label: 'Nespresso' }, { icon: Tv, label: '85" 8K TV' },
      { icon: Car, label: 'Parking' }, { icon: Waves, label: 'Ιδ. SPA' },
    ],
    content: {
      en: {
        name: 'Athens', title: 'Athenian Penthouse', subtitle: 'Urban Elegance Above the City',
        location: 'Plaka, Athens',
        description: 'An extraordinary 280sqm penthouse in Plaka with unobstructed Acropolis views. Designed for those who demand the best — from the texture of the fabrics to the quality of sound.',
        rooms: [
          { title: 'The Master Suite', description: 'Wake up to panoramic city views. Floor-to-ceiling windows, private terrace, spa-like en-suite.', imageUrl: '/assets/greek_luxury_interior_master_bedroom_1776942408192.png' },
          { title: 'The Rooftop Terrace', description: 'Your private vantage point. Evening cocktails with an unobstructed view of the illuminated Parthenon.', imageUrl: '/assets/greek_luxury_terrace_sunset_view_1776942676038.png' },
          { title: 'The Living Space', description: 'Open-concept entertaining area with designer furniture and bespoke artwork.', imageUrl: '/assets/greek_luxury_living_room_dining_1776942426126.png' },
        ],
        reviews: [
          { name: 'Sofia M.', loc: 'London', rating: 5, text: 'Incredible Acropolis view. The best experience we have ever had in Athens.', avatar: 'https://i.pravatar.cc/100?img=47' },
          { name: 'Marco R.', loc: 'Milan', rating: 5, text: 'Perfectly curated space. The marble bathroom alone is worth every euro.', avatar: 'https://i.pravatar.cc/100?img=33' },
          { name: 'Anna K.', loc: 'Paris', rating: 5, text: 'Superhost in every sense. We will definitely be back.', avatar: 'https://i.pravatar.cc/100?img=25' },
        ],
      },
      gr: {
        name: 'Αθήνα', title: 'Αθηναϊκό Ρετιρέ', subtitle: 'Αστική Κομψότητα Πάνω από την Πόλη',
        location: 'Πλάκα, Αθήνα',
        description: 'Ένα εξαιρετικό penthouse 280τμ στην Πλάκα με ανεμπόδιστη θέα στην Ακρόπολη. Σχεδιασμένο για όσους αξιώνουν το καλύτερο.',
        rooms: [
          { title: 'Η Κύρια Σουίτα', description: 'Ξυπνήστε με πανοραμική θέα. Παράθυρα από το δάπεδο, ιδιωτική βεράντα, μπάνιο σπα.', imageUrl: '/assets/greek_luxury_interior_master_bedroom_1776942408192.png' },
          { title: 'Η Ταράτσα', description: 'Το δικό σας ιδιωτικό παρατηρητήριο. Βραδινά κοκτέιλ με θέα στον φωτισμένο Παρθενώνα.', imageUrl: '/assets/greek_luxury_terrace_sunset_view_1776942676038.png' },
          { title: 'Ο Χώρος Διημέρευσης', description: 'Ενιαίος χώρος με επώνυμα έπιπλα και ειδικά επιλεγμένα έργα τέχνης.', imageUrl: '/assets/greek_luxury_living_room_dining_1776942426126.png' },
        ],
        reviews: [
          { name: 'Sofia M.', loc: 'Λονδίνο', rating: 5, text: 'Απίστευτη θέα στην Ακρόπολη. Η καλύτερη εμπειρία που είχαμε ποτέ στην Αθήνα.', avatar: 'https://i.pravatar.cc/100?img=47' },
          { name: 'Marco R.', loc: 'Μιλάνο', rating: 5, text: 'Perfectly curated space. The marble bathroom alone is worth every euro.', avatar: 'https://i.pravatar.cc/100?img=33' },
          { name: 'Anna K.', loc: 'Παρίσι', rating: 5, text: 'Superhost με κάθε έννοια. Επιστρέφουμε σίγουρα.', avatar: 'https://i.pravatar.cc/100?img=25' },
        ],
      },
    },
  },

  cyclades: {
    id: 'cyclades',
    path: '/cyclades',
    theme: {
      bg: '#F8F8F8',
      fg: '#0A0A0A',
      accent: '#0E5FA8',
      muted: 'rgba(10,10,10,0.45)',
      border: 'rgba(14,95,168,0.15)',
      fontHeading: "'Playfair Display', serif",
    },
    pricing: { from: 650, currency: '€', label: '/ νύχτα' },
    heroImage: '/assets/cyclades_hero.png',
    gallery: [
      '/assets/cyclades_hero.png', '/assets/cyclades_pool.png', '/assets/cyclades_bed.png',
      '/assets/greek_luxury_living_room_dining_1776942426126.png',
      '/assets/greek_luxury_marble_bathroom_1776942694181.png',
      '/assets/greek_luxury_terrace_sunset_view_1776942676038.png',
    ],
    details: { guests: 6, beds: 3, baths: 2, sqm: '180m²', rating: 4.97, reviews: 156 },
    amenities: [
      { icon: Waves, label: 'Infinity Pool' }, { icon: Wind, label: 'Sea Breeze A/C' },
      { icon: Sun, label: 'South-facing' }, { icon: Wifi, label: 'Starlink WiFi' },
      { icon: Anchor, label: 'Private Dock' }, { icon: Umbrella, label: 'Beach Access' },
    ],
    content: {
      en: {
        name: 'Cyclades', title: 'Villa Aether', subtitle: 'The Cycladic Minimalist Dream',
        location: 'Santorini, Cyclades',
        description: 'Whitewashed walls and infinite blue. A sanctuary where minimalist Cycladic architecture meets the raw beauty of the Aegean Sea.',
        rooms: [
          { title: 'The Cave Suite', description: 'Carved into the caldera. Natural cooling, organic curves, and a private plunge pool facing the sea.', imageUrl: '/assets/cyclades_bed.png' },
          { title: 'The Infinity Edge', description: 'Seamlessly blending into the horizon. Undisturbed views of the dramatic island sunset.', imageUrl: '/assets/cyclades_pool.png' },
          { title: 'The Courtyard', description: 'Wind-protected outdoor dining under a traditional pergola. Perfect for long summer lunches.', imageUrl: '/assets/greek_luxury_living_room_dining_1776942426126.png' },
        ],
        reviews: [
          { name: 'Isabella F.', loc: 'Florence', rating: 5, text: 'The view from the infinity pool is something you never forget.', avatar: 'https://i.pravatar.cc/100?img=44' },
          { name: 'James H.', loc: 'London', rating: 5, text: 'Minimal perfection. The caldera view at sunrise is otherworldly.', avatar: 'https://i.pravatar.cc/100?img=51' },
          { name: 'Leila N.', loc: 'Paris', rating: 5, text: 'Architecture, light, silence. The Cyclades distilled into one property.', avatar: 'https://i.pravatar.cc/100?img=29' },
        ],
      },
      gr: {
        name: 'Κυκλάδες', title: 'Βίλα Αιθέρας', subtitle: 'Το Κυκλαδίτικο Μινιμαλιστικό Όνειρο',
        location: 'Σαντορίνη, Κυκλάδες',
        description: 'Ασπρισμένοι τοίχοι και απέραντο γαλάζιο. Ένα καταφύγιο όπου η μινιμαλιστική αρχιτεκτονική συναντά την άγρια ομορφιά του Αιγαίου.',
        rooms: [
          { title: 'Η Σπηλαιώδης Σουίτα', description: 'Λαξευμένη στην καλντέρα. Φυσική ψύξη, οργανικές καμπύλες και πισίνα με θέα στη θάλασσα.', imageUrl: '/assets/cyclades_bed.png' },
          { title: 'Η Πισίνα Υπερχείλισης', description: 'Εναρμονισμένη με τον ορίζοντα. Ανεμπόδιστη θέα στο δραματικό ηλιοβασίλεμα.', imageUrl: '/assets/cyclades_pool.png' },
          { title: 'Η Αυλή', description: 'Προστατευμένος υπαίθριος χώρος κάτω από παραδοσιακή πέργκολα.', imageUrl: '/assets/greek_luxury_living_room_dining_1776942426126.png' },
        ],
        reviews: [
          { name: 'Isabella F.', loc: 'Φλωρεντία', rating: 5, text: 'Η θέα από την infinity pool είναι κάτι που δεν ξεχνάς ποτέ.', avatar: 'https://i.pravatar.cc/100?img=44' },
          { name: 'James H.', loc: 'Λονδίνο', rating: 5, text: 'Minimal perfection. The caldera view at sunrise is otherworldly.', avatar: 'https://i.pravatar.cc/100?img=51' },
          { name: 'Leila N.', loc: 'Παρίσι', rating: 5, text: 'Αρχιτεκτονική, φως, σιωπή. Οι Κυκλάδες σε ένα property.', avatar: 'https://i.pravatar.cc/100?img=29' },
        ],
      },
    },
  },

  ionian: {
    id: 'ionian',
    path: '/ionian',
    theme: {
      bg: '#EAE0D5',
      fg: '#1A2E1E',
      accent: '#1A2E1E',
      muted: 'rgba(26,46,30,0.5)',
      border: 'rgba(26,46,30,0.15)',
      fontHeading: "'DM Serif Display', serif",
    },
    pricing: { from: 480, currency: '€', label: '/ νύχτα' },
    heroImage: '/assets/ionian_hero.png',
    gallery: [
      '/assets/ionian_hero.png', '/assets/ionian_terrace.png', '/assets/ionian_bed.png',
      '/assets/greek_luxury_living_room_dining_1776942426126.png',
      '/assets/greek_luxury_decor_olive_tree_1776942733057.png',
      '/assets/greek_luxury_kitchen_detail_1776942713864.png',
    ],
    details: { guests: 10, beds: 5, baths: 3, sqm: '320m²', rating: 4.99, reviews: 89 },
    amenities: [
      { icon: Wifi, label: 'Fast WiFi' }, { icon: Car, label: 'Parking' },
      { icon: Wind, label: 'Eco Cooling' }, { icon: Coffee, label: 'Organic Coffee' },
      { icon: Mountain, label: 'Olive Grove' }, { icon: Waves, label: 'Private Cove' },
    ],
    content: {
      en: {
        name: 'Ionian', title: 'Casa Verde', subtitle: 'A Lush Escape in the Ionian',
        location: 'Lefkada, Ionian Islands',
        description: "Surrounded by ancient olive groves and emerald waters. A stone-built sanctuary offering the ultimate retreat into nature's embrace.",
        rooms: [
          { title: 'The Forest Suite', description: 'Sleep among the trees. Vast windows frame the lush Ionian landscape with a private balcony.', imageUrl: '/assets/ionian_bed.png' },
          { title: 'The Stone Terrace', description: 'Hand-carved local stone meets modern luxury. An outdoor living space for long evenings under the stars.', imageUrl: '/assets/ionian_terrace.png' },
          { title: 'The Secret Cove', description: 'Steps from your door lies a private pebble beach with crystal-clear emerald waters.', imageUrl: '/assets/greek_luxury_kitchen_detail_1776942713864.png' },
        ],
        reviews: [
          { name: 'Elena P.', loc: 'Athens', rating: 5, text: "The olive grove at golden hour made us feel like we were living inside a painting.", avatar: 'https://i.pravatar.cc/100?img=32' },
          { name: 'Thomas B.', loc: 'Berlin', rating: 5, text: "Nature, silence, and absolute comfort. The perfect detox.", avatar: 'https://i.pravatar.cc/100?img=57' },
          { name: 'Maria C.', loc: 'Lisbon', rating: 5, text: "The secret cove is the kind of place you want to keep to yourself.", avatar: 'https://i.pravatar.cc/100?img=23' },
        ],
      },
      gr: {
        name: 'Ιόνιο', title: 'Πράσινη Οικία', subtitle: 'Μια Καταπράσινη Απόδραση στο Ιόνιο',
        location: 'Λευκάδα, Ιόνιο',
        description: 'Περιτριγυρισμένο από αρχαίους ελαιώνες και σμαραγδένια νερά. Ένα πέτρινο καταφύγιο στην αγκαλιά της φύσης.',
        rooms: [
          { title: 'Η Σουίτα του Δάσους', description: 'Κοιμηθείτε ανάμεσα στα δέντρα. Μεγάλα παράθυρα με θέα στο τοπίο και ιδιωτικό μπαλκόνι.', imageUrl: '/assets/ionian_bed.png' },
          { title: 'Η Πέτρινη Βεράντα', description: 'Χειροποίητη πέτρα και μοντέρνα πολυτέλεια. Χώρος για βραδιές κάτω από τα αστέρια.', imageUrl: '/assets/ionian_terrace.png' },
          { title: 'Ο Κρυφός Κολπίσκος', description: 'Λίγα βήματα από την πόρτα σας — ιδιωτική παραλία με κρυστάλλινα νερά.', imageUrl: '/assets/greek_luxury_kitchen_detail_1776942713864.png' },
        ],
        reviews: [
          { name: 'Elena P.', loc: 'Αθήνα', rating: 5, text: 'Ο ελαιώνας στη χρυσή ώρα μας έκανε να νιώθουμε μέσα σε πίνακα ζωγραφικής.', avatar: 'https://i.pravatar.cc/100?img=32' },
          { name: 'Thomas B.', loc: 'Βερολίνο', rating: 5, text: 'Φύση, ησυχία και άνεση. Η τέλεια αποτοξίνωση.', avatar: 'https://i.pravatar.cc/100?img=57' },
          { name: 'Maria C.', loc: 'Λισαβόνα', rating: 5, text: 'Ο κρυφός κολπίσκος είναι το είδος του τόπου που θέλεις να κρατάς μυστικό.', avatar: 'https://i.pravatar.cc/100?img=23' },
        ],
      },
    },
  },

  crete: {
    id: 'crete',
    path: '/crete',
    theme: {
      bg: '#1A0F08',
      fg: '#F2E8D9',
      accent: '#D4892A',
      muted: 'rgba(242,232,217,0.5)',
      border: 'rgba(212,137,42,0.2)',
      fontHeading: "'Libre Baskerville', serif",
    },
    pricing: { from: 560, currency: '€', label: '/ νύχτα' },
    heroImage: '/assets/crete_hero.png',
    gallery: [
      '/assets/crete_hero.png', '/assets/crete_living.png', '/assets/crete_bed.png',
      '/assets/greek_luxury_terrace_sunset_view_1776942676038.png',
      '/assets/greek_luxury_marble_bathroom_1776942694181.png',
      '/assets/greek_luxury_kitchen_detail_1776942713864.png',
    ],
    details: { guests: 12, beds: 6, baths: 4, sqm: '450m²', rating: 4.96, reviews: 124 },
    amenities: [
      { icon: Wifi, label: 'High Speed WiFi' }, { icon: Tv, label: 'Smart TV' },
      { icon: Coffee, label: 'Local Produce' }, { icon: Shield, label: 'Secure Estate' },
      { icon: Car, label: 'Private Parking' }, { icon: Waves, label: 'Heated Pool' },
    ],
    content: {
      en: {
        name: 'Crete', title: 'Villa Minos', subtitle: 'Timeless Cretan Luxury',
        location: 'Chania, Crete',
        description: 'Where rugged mountains meet the Libyan Sea. A heritage estate reimagined for modern luxury, offering an authentic Cretan experience.',
        rooms: [
          { title: 'The Heritage Suite', description: 'Exposed wooden beams, terracotta floors, and a private balcony overlooking olive groves and sea.', imageUrl: '/assets/crete_bed.png' },
          { title: 'The Courtyard Pool', description: 'An enclosed stone courtyard with total privacy around the heated pool, shaded by a century-old carob tree.', imageUrl: '/assets/crete_living.png' },
          { title: 'The Outdoor Kitchen', description: 'Fully equipped with a traditional wood-fired oven. Perfect for slow-cooked Cretan feasts under the stars.', imageUrl: '/assets/greek_luxury_terrace_sunset_view_1776942676038.png' },
        ],
        reviews: [
          { name: 'Nikos A.', loc: 'Thessaloniki', rating: 5, text: 'This is what luxury means in Crete. Raw, authentic, and absolutely breathtaking.', avatar: 'https://i.pravatar.cc/100?img=61' },
          { name: 'Sophie L.', loc: 'Lyon', rating: 5, text: 'The outdoor kitchen was the highlight — cooking Cretan food in a wood-fired oven at sunset.', avatar: 'https://i.pravatar.cc/100?img=19' },
          { name: 'David M.', loc: 'Tel Aviv', rating: 5, text: 'The estate has a soul. You feel the history in every stone.', avatar: 'https://i.pravatar.cc/100?img=42' },
        ],
      },
      gr: {
        name: 'Κρήτη', title: 'Βίλα Μίνως', subtitle: 'Διαχρονική Κρητική Πολυτέλεια',
        location: 'Χανιά, Κρήτη',
        description: 'Εκεί όπου τα τραχιά βουνά συναντούν το Λιβυκό Πέλαγος. Ένα ιστορικό κτήμα για μοντέρνα πολυτέλεια με αυθεντική κρητική εμπειρία.',
        rooms: [
          { title: 'Η Ιστορική Σουίτα', description: 'Εμφανή ξύλινα δοκάρια, δάπεδα τερακότα και μπαλκόνι με θέα σε ελαιώνες και θάλασσα.', imageUrl: '/assets/crete_bed.png' },
          { title: 'Η Πισίνα της Αυλής', description: 'Κλειστή πέτρινη αυλή με απόλυτη ιδιωτικότητα γύρω από τη θερμαινόμενη πισίνα.', imageUrl: '/assets/crete_living.png' },
          { title: 'Η Εξωτερική Κουζίνα', description: 'Πλήρως εξοπλισμένη με παραδοσιακό ξυλόφουρνο. Κρητικά γεύματα κάτω από τα αστέρια.', imageUrl: '/assets/greek_luxury_terrace_sunset_view_1776942676038.png' },
        ],
        reviews: [
          { name: 'Νίκος Α.', loc: 'Θεσσαλονίκη', rating: 5, text: 'Αυτή είναι η πολυτέλεια στην Κρήτη. Αδάμαστη, αυθεντική και συγκλονιστική.', avatar: 'https://i.pravatar.cc/100?img=61' },
          { name: 'Sophie L.', loc: 'Λυών', rating: 5, text: 'Η εξωτερική κουζίνα ήταν η κορύφωση — μαγείρεμα κρητικής κουζίνας στο ξυλόφουρνο.', avatar: 'https://i.pravatar.cc/100?img=19' },
          { name: 'David M.', loc: 'Τελ Αβίβ', rating: 5, text: 'Το κτήμα έχει ψυχή. Νιώθεις την ιστορία σε κάθε πέτρα.', avatar: 'https://i.pravatar.cc/100?img=42' },
        ],
      },
    },
  },

  nisi: {
    id: 'nisi',
    path: '/nisi',
    theme: {
      bg: '#1C1523',
      fg: '#FAFAFA',
      accent: '#C8956C',
      muted: 'rgba(250,250,250,0.45)',
      border: 'rgba(200,149,108,0.2)',
      fontHeading: "'Fraunces', serif",
    },
    pricing: { from: 420, currency: '€', label: '/ νύχτα' },
    heroImage: '/assets/nisi_hero.png',
    gallery: [
      '/assets/nisi_hero.png', '/assets/nisi_pool.png', '/assets/nisi_terrace.png',
      '/assets/nisi_room.png', '/assets/greek_luxury_marble_bathroom_1776942694181.png',
      '/assets/greek_luxury_decor_olive_tree_1776942733057.png',
    ],
    details: { guests: 2, beds: 1, baths: 1, sqm: '65m²', rating: 5.0, reviews: 47 },
    amenities: [
      { icon: Wifi, label: 'Satellite WiFi' }, { icon: Waves, label: 'Plunge Pool' },
      { icon: Coffee, label: 'Chef Breakfast' }, { icon: Shield, label: 'Fully Private' },
    ],
    content: {
      en: {
        name: 'Nisi', title: 'Nisi', subtitle: 'The Island Room Experience',
        location: 'Milos, Cyclades',
        description: 'Not a hotel. Not just a room. A living painting. The distilled essence of the Greek island dream — where every morning feels like the first.',
        rooms: [
          { title: 'The Cave Room', description: 'Carved into volcanic rock. Curved whitewashed walls, hand-woven linens, and a window that frames the Aegean like living artwork.', imageUrl: '/assets/nisi_room.png' },
          { title: 'The Plunge Pool', description: 'Step outside into warm cobalt-blue water with an uninterrupted sea view. Sunrise here is not an event — it is a ritual.', imageUrl: '/assets/nisi_pool.png' },
          { title: 'The Morning Table', description: 'Local honey, thyme cheese, vine tomatoes, and coffee brewed over embers. Every morning is an occasion.', imageUrl: '/assets/nisi_terrace.png' },
        ],
        reviews: [
          { name: 'Yuki T.', loc: 'Tokyo', rating: 5, text: "I have stayed in luxury hotels worldwide. Nisi is in a different category entirely.", avatar: 'https://i.pravatar.cc/100?img=38' },
          { name: 'Clara B.', loc: 'Amsterdam', rating: 5, text: "The morning ritual — coffee, plunge pool, sunrise — changed something in me.", avatar: 'https://i.pravatar.cc/100?img=16' },
          { name: 'Omar S.', loc: 'Dubai', rating: 5, text: "Perfection is rare. This is it.", avatar: 'https://i.pravatar.cc/100?img=68' },
        ],
      },
      gr: {
        name: 'Νησί', title: 'Νησί', subtitle: 'Η Εμπειρία του Νησιώτικου Δωματίου',
        location: 'Μήλος, Κυκλάδες',
        description: 'Ούτε ξενοδοχείο, ούτε απλώς δωμάτιο. Ένας ζωντανός πίνακας. Η ουσία του ελληνικού νησιώτικου ονείρου.',
        rooms: [
          { title: 'Το Σπηλαιώδες Δωμάτιο', description: 'Λαξευμένο στο ηφαιστειογενές βράχο. Καμπυλωτοί τοίχοι και παράθυρο που πλαισιώνει το Αιγαίο.', imageUrl: '/assets/nisi_room.png' },
          { title: 'Η Μικρή Πισίνα', description: 'Βγείτε σε ζεστά κοβαλτί νερά με αδιατάρακτη θέα στη θάλασσα. Η ανατολή εδώ είναι τελετουργία.', imageUrl: '/assets/nisi_pool.png' },
          { title: 'Το Πρωινό Τραπέζι', description: 'Τοπικό μέλι, τυρί θυμαριού, ντοματίνια και καφές. Κάθε πρωί είναι ξεχωριστό.', imageUrl: '/assets/nisi_terrace.png' },
        ],
        reviews: [
          { name: 'Yuki T.', loc: 'Τόκιο', rating: 5, text: 'Έχω μείνει σε luxury ξενοδοχεία σε όλο τον κόσμο. Το Νησί είναι σε άλλη κατηγορία.', avatar: 'https://i.pravatar.cc/100?img=38' },
          { name: 'Clara B.', loc: 'Άμστερνταμ', rating: 5, text: 'Η πρωινή τελετουργία — καφές, πισίνα, ανατολή — άλλαξε κάτι μέσα μου.', avatar: 'https://i.pravatar.cc/100?img=16' },
          { name: 'Omar S.', loc: 'Ντουμπάι', rating: 5, text: 'Η τελειότητα είναι σπάνια. Αυτό είναι.', avatar: 'https://i.pravatar.cc/100?img=68' },
        ],
      },
    },
  },
};

export const DESTINATION_LIST = ['athens', 'cyclades', 'ionian', 'crete', 'nisi'];
```

- [ ] **Step 3: Verify — run dev server, no errors**

```bash
npm run dev
```

Expected: Vite starts on `http://localhost:5173`. No console errors. (Data file is not yet used, but import graph should be clean.)

---

## Task 2: Routing + Language State

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update App.jsx**

```jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DemoSwitcher from './components/DemoSwitcher';
import Landing from './pages/Landing';
import Athens from './pages/Athens';
import Cyclades from './pages/Cyclades';
import Ionian from './pages/Ionian';
import Crete from './pages/Crete';
import Nisi from './pages/Nisi';

export default function App() {
  const [lang, setLang] = useState('en');

  return (
    <BrowserRouter>
      {import.meta.env.DEV && <DemoSwitcher />}
      <Routes>
        <Route path="/" element={<Landing lang={lang} setLang={setLang} />} />
        <Route path="/athens" element={<Athens lang={lang} setLang={setLang} />} />
        <Route path="/cyclades" element={<Cyclades lang={lang} setLang={setLang} />} />
        <Route path="/ionian" element={<Ionian lang={lang} setLang={setLang} />} />
        <Route path="/crete" element={<Crete lang={lang} setLang={setLang} />} />
        <Route path="/nisi" element={<Nisi lang={lang} setLang={setLang} />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Create placeholder pages so App compiles**

Create `src/pages/Landing.jsx`:
```jsx
export default function Landing({ lang, setLang }) {
  return <div style={{padding:'2rem',fontFamily:'sans-serif'}}>Landing — coming soon</div>;
}
```

Create `src/pages/Nisi.jsx`:
```jsx
export default function Nisi({ lang, setLang }) {
  return <div style={{padding:'2rem',fontFamily:'sans-serif'}}>Nisi — coming soon</div>;
}
```

- [ ] **Step 3: Verify routes work**

```bash
npm run dev
```

Open `http://localhost:5173/`, `/athens`, `/nisi` — each should render without crash.

---

## Task 3: Shared Components

**Files:**
- Create: `src/components/shared/Cursor.jsx`
- Create: `src/components/shared/SectionReveal.jsx`
- Create: `src/components/shared/Lightbox.jsx`

- [ ] **Step 1: Create `src/components/shared/Cursor.jsx`**

```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Cursor({ accentColor = '#C9A84C' }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => setHov(!!e.target.closest('button,a,[data-hover]'));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden lg:block mix-blend-difference"
        style={{ backgroundColor: accentColor }}
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hov ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] hidden lg:block"
        style={{ border: `1px solid ${accentColor}` }}
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hov ? 2.2 : 1, opacity: hov ? 0.4 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  );
}
```

- [ ] **Step 2: Create `src/components/shared/SectionReveal.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.23, 1, 0.32, 1];

export default function SectionReveal({ children, delay = 0, y = 60, className = '' }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? {} : { opacity: 0, y }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create `src/components/shared/Lightbox.jsx`**

```jsx
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const EASE = [0.23, 1, 0.32, 1];

export default function Lightbox({ photos, idx, onClose, onPrev, onNext }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10 cursor-pointer">
        <X size={32} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors cursor-pointer">
        <ChevronLeft size={44} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors cursor-pointer">
        <ChevronRight size={44} />
      </button>
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={photos[idx]} alt=""
          initial={reduced ? {} : { opacity: 0, scale: 1.04 }}
          animate={reduced ? {} : { opacity: 1, scale: 1 }}
          exit={reduced ? {} : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>
      <div className="absolute bottom-6 text-white/40 text-sm">{idx + 1} / {photos.length}</div>
    </motion.div>
  );
}
```

---

## Task 4: Navbar + StickyBookingBar

**Files:**
- Create: `src/components/shared/Navbar.jsx`
- Create: `src/components/shared/StickyBookingBar.jsx`

- [ ] **Step 1: Create `src/components/shared/Navbar.jsx`**

```jsx
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const EASE = [0.23, 1, 0.32, 1];

export default function Navbar({ theme = null, lang, setLang, isLanding = false }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60));

  const bg = scrolled
    ? (theme ? `${theme.bg}e6` : 'rgba(8,8,8,0.92)')
    : 'transparent';
  const textColor = theme ? theme.fg : '#FAFAFA';
  const accentColor = theme ? theme.accent : '#C9A84C';

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-colors duration-500"
      style={{ backgroundColor: bg, backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
    >
      <Link to="/" data-hover className="font-bold text-lg tracking-wider" style={{ color: textColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        STAYSCAPE<span style={{ color: accentColor }}>.</span>GR
      </Link>

      <div className="flex items-center gap-4">
        <button
          data-hover
          onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}
          className="text-xs font-semibold tracking-widest transition-opacity hover:opacity-70 cursor-pointer"
          style={{ color: textColor }}
        >
          {lang === 'en' ? 'EN' : 'GR'} <span style={{ color: accentColor }}>|</span> {lang === 'en' ? 'GR' : 'EN'}
        </button>

        {isLanding ? (
          <motion.a
            href="https://wa.me/306900000000"
            target="_blank" rel="noopener noreferrer"
            data-hover
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="text-xs font-bold tracking-widest px-6 py-3 rounded-full border cursor-pointer transition-colors duration-300"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            GET YOUR SITE →
          </motion.a>
        ) : (
          <Link to="/">
            <motion.button
              data-hover
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="text-xs font-bold tracking-widest px-6 py-3 rounded-full cursor-pointer transition-colors duration-300"
              style={{ backgroundColor: accentColor, color: theme?.bg || '#0A0A0A' }}
            >
              ← ALL PROPERTIES
            </motion.button>
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
```

- [ ] **Step 2: Create `src/components/shared/StickyBookingBar.jsx`**

```jsx
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState } from 'react';

const EASE = [0.23, 1, 0.32, 1];

export default function StickyBookingBar({ title, rating, reviewCount, price, currency, accentColor, fgColor, bgColor }) {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 100));

  return (
    <motion.div
      initial={false}
      animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 35 }}
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-3 flex items-center justify-between shadow-lg"
      style={{ backgroundColor: bgColor, borderBottom: `1px solid ${accentColor}22` }}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold" style={{ color: fgColor }}>{title}</span>
        <div className="hidden md:flex items-center gap-1">
          <Star size={12} fill={accentColor} color={accentColor} />
          <span className="text-xs font-bold" style={{ color: accentColor }}>{rating}</span>
          <span className="text-xs" style={{ color: fgColor, opacity: 0.5 }}>({reviewCount}+)</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold" style={{ color: fgColor }}>
          {currency}{price} <span className="font-normal text-xs" style={{ opacity: 0.6 }}>/night</span>
        </span>
        <motion.button
          data-hover
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="text-xs font-bold tracking-widest px-5 py-2 rounded-full cursor-pointer"
          style={{ backgroundColor: accentColor, color: bgColor }}
        >
          BOOK
        </motion.button>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

No console errors. Components not yet used in pages, but files should parse without issues.

---

## Task 5: Property Section Components

**Files:**
- Create: `src/components/property/HeroCinematic.jsx`
- Create: `src/components/property/Gallery.jsx`
- Create: `src/components/property/DetailsStrip.jsx`
- Create: `src/components/property/RoomParallax.jsx`
- Create: `src/components/property/AmenitiesGrid.jsx`
- Create: `src/components/property/ReviewCards.jsx`
- Create: `src/components/property/DualCTA.jsx`

- [ ] **Step 1: Create `src/components/property/HeroCinematic.jsx`**

```jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const EASE = [0.23, 1, 0.32, 1];

function WordReveal({ text, className, style }) {
  const reduced = useReducedMotion();
  if (reduced) return <h1 className={className} style={style}>{text}</h1>;
  return (
    <motion.h1
      className={className} style={style}
      initial="hidden" animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: 1.1, ease: EASE } } }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export default function HeroCinematic({ title, subtitle, location, imageUrl, theme, lang }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const reduced = useReducedMotion();

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-25%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.85]);

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: reduced ? 1 : imgScale }}
      >
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          initial={reduced ? {} : { scale: 1.08 }}
          animate={reduced ? {} : { scale: 1 }}
          transition={{ duration: 2.8, ease: EASE }}
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: reduced ? 0.5 : overlayOpacity }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.9) 100%)' }}
      />

      {/* Text content */}
      <motion.div
        className="relative z-10 text-center px-6 flex flex-col items-center gap-5"
        style={{ y: reduced ? 0 : textY }}
      >
        <motion.div
          initial={reduced ? {} : { opacity: 0, letterSpacing: '0.6em' }}
          animate={reduced ? {} : { opacity: 1, letterSpacing: '0.25em' }}
          transition={{ delay: 1.0, duration: 1.5, ease: EASE }}
          className="text-xs md:text-sm uppercase tracking-[0.25em]"
          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {location}
        </motion.div>

        <WordReveal
          text={title}
          className="text-5xl md:text-7xl lg:text-[8rem] font-light leading-[0.92] tracking-tighter text-white"
          style={{ fontFamily: theme.fontHeading }}
        />

        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2, ease: EASE }}
          className="text-sm md:text-base tracking-[0.15em] uppercase"
          style={{ color: theme.accent, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {subtitle}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={reduced ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={reduced ? {} : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
        />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/property/Gallery.jsx`**

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid2X2 } from 'lucide-react';
import Lightbox from '../shared/Lightbox';
import SectionReveal from '../shared/SectionReveal';

export default function Gallery({ photos, theme }) {
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });

  const close = () => setLightbox({ open: false, idx: 0 });
  const prev = () => setLightbox(l => ({ ...l, idx: (l.idx - 1 + photos.length) % photos.length }));
  const next = () => setLightbox(l => ({ ...l, idx: (l.idx + 1) % photos.length }));

  return (
    <SectionReveal>
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight" style={{ fontFamily: theme.fontHeading, color: theme.fg }}>
            The Space
          </h2>
          <button
            data-hover
            onClick={() => setLightbox({ open: true, idx: 0 })}
            className="flex items-center gap-2 text-xs tracking-widest uppercase cursor-pointer transition-opacity hover:opacity-60"
            style={{ color: theme.accent }}
          >
            <Grid2X2 size={14} />
            View all
          </button>
        </div>

        {/* Editorial grid: first image large, rest 2-col */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {photos.slice(0, 6).map((src, i) => (
            <motion.div
              key={i}
              data-hover
              onClick={() => setLightbox({ open: true, idx: i })}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? 'col-span-2 row-span-2 h-[280px] md:h-[420px]' : 'h-[135px] md:h-[200px]'}`}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <img
                src={src} alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
              <span className="absolute bottom-3 right-3 text-white/0 group-hover:text-white/80 text-xs tracking-widest transition-all duration-500">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox.open && (
          <Lightbox photos={photos} idx={lightbox.idx} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}
```

- [ ] **Step 3: Create `src/components/property/DetailsStrip.jsx`**

```jsx
import { Users, Bed, Bath, Star } from 'lucide-react';
import SectionReveal from '../shared/SectionReveal';

export default function DetailsStrip({ details, theme, hostName = 'Eleni' }) {
  const items = [
    { icon: Users, value: details.guests, label: 'guests' },
    { icon: Bed, value: details.beds, label: 'bedrooms' },
    { icon: Bath, value: details.baths, label: 'bathrooms' },
    { icon: null, value: details.sqm, label: 'area' },
  ];

  return (
    <SectionReveal>
      <div
        className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b"
        style={{ borderColor: theme.border }}
      >
        {items.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {Icon && <Icon size={16} style={{ color: theme.accent }} />}
              <span className="text-2xl font-light" style={{ fontFamily: theme.fontHeading, color: theme.fg }}>{value}</span>
            </div>
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.muted }}>{label}</span>
          </div>
        ))}

        <div className="flex flex-col gap-1 col-span-2 md:col-span-1 md:col-start-4 md:items-end">
          <div className="flex items-center gap-1.5">
            <Star size={14} fill={theme.accent} color={theme.accent} />
            <span className="text-2xl font-light" style={{ fontFamily: theme.fontHeading, color: theme.fg }}>{details.rating}</span>
          </div>
          <span className="text-xs tracking-widest uppercase" style={{ color: theme.muted }}>{details.reviews}+ reviews</span>
        </div>
      </div>
    </SectionReveal>
  );
}
```

- [ ] **Step 4: Create `src/components/property/RoomParallax.jsx`**

```jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionReveal from '../shared/SectionReveal';

const EASE = [0.23, 1, 0.32, 1];

function RoomItem({ room, index, theme }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const reduced = useReducedMotion();
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const isEven = index % 2 === 0;

  return (
    <SectionReveal delay={0.1}>
      <div
        ref={ref}
        className={`max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-8 md:gap-16 items-center ${isEven ? '' : 'md:[&>*:first-child]:order-2'}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
          <motion.div
            className="w-full h-[120%] -mt-[10%]"
            style={{ y: reduced ? 0 : imgY }}
          >
            <img
              src={room.imageUrl} alt={room.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute top-4 left-4">
            <span
              className="text-xs tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ backgroundColor: `${theme.accent}22`, color: theme.accent }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-5">
          <div className="w-10 h-px" style={{ backgroundColor: theme.accent }} />
          <h3
            className="text-3xl md:text-4xl font-light leading-tight"
            style={{ fontFamily: theme.fontHeading, color: theme.fg }}
          >
            {room.title}
          </h3>
          <p className="text-base leading-relaxed" style={{ color: theme.muted }}>
            {room.description}
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}

export default function RoomParallax({ rooms, theme, sectionTitle = 'The Rooms' }) {
  return (
    <section style={{ backgroundColor: theme.bg }}>
      <SectionReveal>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24">
          <div className="flex items-center gap-6">
            <div className="w-12 h-px" style={{ backgroundColor: theme.accent }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: theme.accent }}>
              {sectionTitle}
            </span>
          </div>
        </div>
      </SectionReveal>
      {rooms.map((room, i) => (
        <RoomItem key={room.title} room={room} index={i} theme={theme} />
      ))}
    </section>
  );
}
```

- [ ] **Step 5: Create `src/components/property/AmenitiesGrid.jsx`**

```jsx
import SectionReveal from '../shared/SectionReveal';
import { motion } from 'framer-motion';

export default function AmenitiesGrid({ amenities, theme, title = "What's Included" }) {
  return (
    <SectionReveal>
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: theme.bg }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <h2
            className="text-3xl md:text-4xl font-light mb-10 tracking-tight"
            style={{ fontFamily: theme.fontHeading, color: theme.fg }}
          >
            {title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {amenities.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                data-hover
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 px-4 py-4 rounded-xl border cursor-default"
                style={{ borderColor: theme.border, backgroundColor: `${theme.fg}06` }}
              >
                <Icon size={18} style={{ color: theme.accent }} />
                <span className="text-sm font-medium" style={{ color: theme.fg }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
```

- [ ] **Step 6: Create `src/components/property/ReviewCards.jsx`**

```jsx
import { Star } from 'lucide-react';
import SectionReveal from '../shared/SectionReveal';

export default function ReviewCards({ reviews, theme, title = 'What Guests Say' }) {
  return (
    <SectionReveal>
      <section className="py-16 md:py-24" style={{ backgroundColor: theme.bg }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <h2
            className="text-3xl md:text-4xl font-light mb-10 tracking-tight"
            style={{ fontFamily: theme.fontHeading, color: theme.fg }}
          >
            {title}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl border"
                style={{ borderColor: theme.border, backgroundColor: `${theme.fg}05` }}
              >
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={theme.accent} color={theme.accent} />)}
                </div>
                <p className="text-sm md:text-base leading-relaxed flex-1" style={{ color: theme.muted }}>
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: theme.border }}>
                  <img src={r.avatar} alt={r.name} loading="lazy" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: theme.fg }}>{r.name}</div>
                    <div className="text-xs" style={{ color: theme.muted }}>{r.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
```

- [ ] **Step 7: Create `src/components/property/DualCTA.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE = [0.23, 1, 0.32, 1];

export default function DualCTA({ theme, price, currency, lang }) {
  const reduced = useReducedMotion();
  const bookLabel = lang === 'gr' ? 'Κάνε Κράτηση' : 'Book This Stay';
  const b2bLine = lang === 'gr'
    ? 'Θέλεις τέτοιο site για το property σου;'
    : 'Impressed by this site? We build them for your property.';
  const b2bCta = lang === 'gr' ? 'Μάθε περισσότερα →' : 'Get your site →';

  return (
    <section
      className="py-24 md:py-32 text-center px-6"
      style={{ backgroundColor: theme.bg }}
    >
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 40 }}
        whileInView={reduced ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: EASE }}
        className="flex flex-col items-center gap-8 max-w-xl mx-auto"
      >
        <div className="w-12 h-px mx-auto" style={{ backgroundColor: theme.accent }} />

        <p className="text-sm tracking-widest uppercase" style={{ color: theme.accent }}>
          {currency}{price} / night
        </p>

        <motion.a
          href="#"
          data-hover
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="px-12 py-5 rounded-full text-sm font-bold tracking-widest uppercase cursor-pointer transition-opacity"
          style={{ backgroundColor: theme.accent, color: theme.bg }}
        >
          {bookLabel}
        </motion.a>

        <div className="w-full h-px mt-4" style={{ backgroundColor: theme.border }} />

        <p className="text-sm" style={{ color: theme.muted }}>{b2bLine}</p>

        <Link to="/">
          <motion.button
            data-hover
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="text-xs font-bold tracking-widest uppercase px-8 py-3 rounded-full border cursor-pointer"
            style={{ borderColor: theme.accent, color: theme.accent }}
          >
            {b2bCta}
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 8: Verify all property components compile**

```bash
npm run dev
```

No errors expected. Components are not yet used in pages.

---

## Task 6: Athens Page Rebuild

**Files:**
- Modify: `src/pages/Athens.jsx`

- [ ] **Step 1: Replace `src/pages/Athens.jsx` entirely**

```jsx
import { useReducedMotion } from 'framer-motion';
import { DESTINATIONS } from '../data/destinations';
import Cursor from '../components/shared/Cursor';
import Navbar from '../components/shared/Navbar';
import StickyBookingBar from '../components/shared/StickyBookingBar';
import HeroCinematic from '../components/property/HeroCinematic';
import Gallery from '../components/property/Gallery';
import DetailsStrip from '../components/property/DetailsStrip';
import RoomParallax from '../components/property/RoomParallax';
import AmenitiesGrid from '../components/property/AmenitiesGrid';
import ReviewCards from '../components/property/ReviewCards';
import DualCTA from '../components/property/DualCTA';
import SectionReveal from '../components/shared/SectionReveal';

export default function Athens({ lang = 'en', setLang }) {
  const d = DESTINATIONS.athens;
  const c = d.content[lang];
  const { theme } = d;

  return (
    <div
      className="min-h-screen antialiased overflow-x-hidden"
      style={{ backgroundColor: theme.bg, color: theme.fg, cursor: 'none' }}
    >
      <Cursor accentColor={theme.accent} />
      <Navbar theme={theme} lang={lang} setLang={setLang} />
      <StickyBookingBar
        title={c.title}
        rating={d.details.rating}
        reviewCount={d.details.reviews}
        price={d.pricing.from}
        currency={d.pricing.currency}
        accentColor={theme.accent}
        fgColor={theme.fg}
        bgColor={theme.bg}
      />

      <HeroCinematic
        title={c.title}
        subtitle={c.subtitle}
        location={c.location}
        imageUrl={d.heroImage}
        theme={theme}
        lang={lang}
      />

      <SectionReveal>
        <div
          className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-0"
          style={{ borderTop: `1px solid ${theme.border}` }}
        >
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: theme.muted }}>
            {c.description}
          </p>
        </div>
      </SectionReveal>

      <Gallery photos={d.gallery} theme={theme} />
      <DetailsStrip details={d.details} theme={theme} />

      <RoomParallax
        rooms={c.rooms}
        theme={theme}
        sectionTitle={lang === 'gr' ? 'Οι Χώροι' : 'The Spaces'}
      />

      <AmenitiesGrid
        amenities={d.amenities}
        theme={theme}
        title={lang === 'gr' ? 'Τι Περιλαμβάνεται' : "What's Included"}
      />

      <ReviewCards
        reviews={c.reviews}
        theme={theme}
        title={lang === 'gr' ? 'Λένε οι Επισκέπτες' : 'What Guests Say'}
      />

      <DualCTA
        theme={theme}
        price={d.pricing.from}
        currency={d.pricing.currency}
        lang={lang}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify Athens page in browser**

```bash
npm run dev
```

Open `http://localhost:5173/athens`. Check:
- Dark background, gold accent visible
- Hero image loads with parallax on scroll
- Gallery grid shows 6 photos
- Rooms section shows 3 rooms with parallax
- Amenities grid renders
- Reviews show 3 cards
- Dual CTA at bottom

---

## Task 7: Cyclades Page

**Files:**
- Modify: `src/pages/Cyclades.jsx`

- [ ] **Step 1: Replace `src/pages/Cyclades.jsx`**

```jsx
import { DESTINATIONS } from '../data/destinations';
import Cursor from '../components/shared/Cursor';
import Navbar from '../components/shared/Navbar';
import StickyBookingBar from '../components/shared/StickyBookingBar';
import HeroCinematic from '../components/property/HeroCinematic';
import Gallery from '../components/property/Gallery';
import DetailsStrip from '../components/property/DetailsStrip';
import RoomParallax from '../components/property/RoomParallax';
import AmenitiesGrid from '../components/property/AmenitiesGrid';
import ReviewCards from '../components/property/ReviewCards';
import DualCTA from '../components/property/DualCTA';
import SectionReveal from '../components/shared/SectionReveal';

export default function Cyclades({ lang = 'en', setLang }) {
  const d = DESTINATIONS.cyclades;
  const c = d.content[lang];
  const { theme } = d;

  return (
    <div
      className="min-h-screen antialiased overflow-x-hidden"
      style={{ backgroundColor: theme.bg, color: theme.fg, cursor: 'none' }}
    >
      <Cursor accentColor={theme.accent} />
      <Navbar theme={theme} lang={lang} setLang={setLang} />
      <StickyBookingBar
        title={c.title}
        rating={d.details.rating}
        reviewCount={d.details.reviews}
        price={d.pricing.from}
        currency={d.pricing.currency}
        accentColor={theme.accent}
        fgColor={theme.fg}
        bgColor={theme.bg}
      />
      <HeroCinematic title={c.title} subtitle={c.subtitle} location={c.location} imageUrl={d.heroImage} theme={theme} lang={lang} />
      <SectionReveal>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24" style={{ borderTop: `1px solid ${theme.border}` }}>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: theme.muted }}>{c.description}</p>
        </div>
      </SectionReveal>
      <Gallery photos={d.gallery} theme={theme} />
      <DetailsStrip details={d.details} theme={theme} />
      <RoomParallax rooms={c.rooms} theme={theme} sectionTitle={lang === 'gr' ? 'Οι Χώροι' : 'The Spaces'} />
      <AmenitiesGrid amenities={d.amenities} theme={theme} title={lang === 'gr' ? 'Τι Περιλαμβάνεται' : "What's Included"} />
      <ReviewCards reviews={c.reviews} theme={theme} title={lang === 'gr' ? 'Λένε οι Επισκέπτες' : 'What Guests Say'} />
      <DualCTA theme={theme} price={d.pricing.from} currency={d.pricing.currency} lang={lang} />
    </div>
  );
}
```

- [ ] **Step 2: Verify Cyclades in browser**

Open `http://localhost:5173/cyclades`. Check: light background, blue accent, Playfair Display heading font.

---

## Task 8: Ionian Page

**Files:**
- Modify: `src/pages/Ionian.jsx`

- [ ] **Step 1: Replace `src/pages/Ionian.jsx`**

```jsx
import { DESTINATIONS } from '../data/destinations';
import Cursor from '../components/shared/Cursor';
import Navbar from '../components/shared/Navbar';
import StickyBookingBar from '../components/shared/StickyBookingBar';
import HeroCinematic from '../components/property/HeroCinematic';
import Gallery from '../components/property/Gallery';
import DetailsStrip from '../components/property/DetailsStrip';
import RoomParallax from '../components/property/RoomParallax';
import AmenitiesGrid from '../components/property/AmenitiesGrid';
import ReviewCards from '../components/property/ReviewCards';
import DualCTA from '../components/property/DualCTA';
import SectionReveal from '../components/shared/SectionReveal';

export default function Ionian({ lang = 'en', setLang }) {
  const d = DESTINATIONS.ionian;
  const c = d.content[lang];
  const { theme } = d;

  return (
    <div
      className="min-h-screen antialiased overflow-x-hidden"
      style={{ backgroundColor: theme.bg, color: theme.fg, cursor: 'none' }}
    >
      <Cursor accentColor={theme.accent} />
      <Navbar theme={theme} lang={lang} setLang={setLang} />
      <StickyBookingBar
        title={c.title}
        rating={d.details.rating}
        reviewCount={d.details.reviews}
        price={d.pricing.from}
        currency={d.pricing.currency}
        accentColor={theme.accent}
        fgColor={theme.fg}
        bgColor={theme.bg}
      />
      <HeroCinematic title={c.title} subtitle={c.subtitle} location={c.location} imageUrl={d.heroImage} theme={theme} lang={lang} />
      <SectionReveal>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24" style={{ borderTop: `1px solid ${theme.border}` }}>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: theme.muted }}>{c.description}</p>
        </div>
      </SectionReveal>
      <Gallery photos={d.gallery} theme={theme} />
      <DetailsStrip details={d.details} theme={theme} />
      <RoomParallax rooms={c.rooms} theme={theme} sectionTitle={lang === 'gr' ? 'Οι Χώροι' : 'The Spaces'} />
      <AmenitiesGrid amenities={d.amenities} theme={theme} title={lang === 'gr' ? 'Τι Περιλαμβάνεται' : "What's Included"} />
      <ReviewCards reviews={c.reviews} theme={theme} title={lang === 'gr' ? 'Λένε οι Επισκέπτες' : 'What Guests Say'} />
      <DualCTA theme={theme} price={d.pricing.from} currency={d.pricing.currency} lang={lang} />
    </div>
  );
}
```

- [ ] **Step 2: Verify Ionian in browser**

Open `http://localhost:5173/ionian`. Check: warm beige background `#EAE0D5`, forest green accent, DM Serif Display headings.

---

## Task 9: Crete Page

**Files:**
- Modify: `src/pages/Crete.jsx`

- [ ] **Step 1: Replace `src/pages/Crete.jsx`**

```jsx
import { DESTINATIONS } from '../data/destinations';
import Cursor from '../components/shared/Cursor';
import Navbar from '../components/shared/Navbar';
import StickyBookingBar from '../components/shared/StickyBookingBar';
import HeroCinematic from '../components/property/HeroCinematic';
import Gallery from '../components/property/Gallery';
import DetailsStrip from '../components/property/DetailsStrip';
import RoomParallax from '../components/property/RoomParallax';
import AmenitiesGrid from '../components/property/AmenitiesGrid';
import ReviewCards from '../components/property/ReviewCards';
import DualCTA from '../components/property/DualCTA';
import SectionReveal from '../components/shared/SectionReveal';

export default function Crete({ lang = 'en', setLang }) {
  const d = DESTINATIONS.crete;
  const c = d.content[lang];
  const { theme } = d;

  return (
    <div
      className="min-h-screen antialiased overflow-x-hidden"
      style={{ backgroundColor: theme.bg, color: theme.fg, cursor: 'none' }}
    >
      <Cursor accentColor={theme.accent} />
      <Navbar theme={theme} lang={lang} setLang={setLang} />
      <StickyBookingBar
        title={c.title}
        rating={d.details.rating}
        reviewCount={d.details.reviews}
        price={d.pricing.from}
        currency={d.pricing.currency}
        accentColor={theme.accent}
        fgColor={theme.fg}
        bgColor={theme.bg}
      />
      <HeroCinematic title={c.title} subtitle={c.subtitle} location={c.location} imageUrl={d.heroImage} theme={theme} lang={lang} />
      <SectionReveal>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24" style={{ borderTop: `1px solid ${theme.border}` }}>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: theme.muted }}>{c.description}</p>
        </div>
      </SectionReveal>
      <Gallery photos={d.gallery} theme={theme} />
      <DetailsStrip details={d.details} theme={theme} />
      <RoomParallax rooms={c.rooms} theme={theme} sectionTitle={lang === 'gr' ? 'Οι Χώροι' : 'The Spaces'} />
      <AmenitiesGrid amenities={d.amenities} theme={theme} title={lang === 'gr' ? 'Τι Περιλαμβάνεται' : "What's Included"} />
      <ReviewCards reviews={c.reviews} theme={theme} title={lang === 'gr' ? 'Λένε οι Επισκέπτες' : 'What Guests Say'} />
      <DualCTA theme={theme} price={d.pricing.from} currency={d.pricing.currency} lang={lang} />
    </div>
  );
}
```

- [ ] **Step 2: Verify Crete in browser**

Open `http://localhost:5173/crete`. Check: deep brown-black `#1A0F08`, ochre accent, Libre Baskerville headings.

---

## Task 10: Nisi Page

**Files:**
- Modify: `src/pages/Nisi.jsx`

- [ ] **Step 1: Replace `src/pages/Nisi.jsx`**

```jsx
import { DESTINATIONS } from '../data/destinations';
import Cursor from '../components/shared/Cursor';
import Navbar from '../components/shared/Navbar';
import StickyBookingBar from '../components/shared/StickyBookingBar';
import HeroCinematic from '../components/property/HeroCinematic';
import Gallery from '../components/property/Gallery';
import DetailsStrip from '../components/property/DetailsStrip';
import RoomParallax from '../components/property/RoomParallax';
import AmenitiesGrid from '../components/property/AmenitiesGrid';
import ReviewCards from '../components/property/ReviewCards';
import DualCTA from '../components/property/DualCTA';
import SectionReveal from '../components/shared/SectionReveal';

export default function Nisi({ lang = 'en', setLang }) {
  const d = DESTINATIONS.nisi;
  const c = d.content[lang];
  const { theme } = d;

  return (
    <div
      className="min-h-screen antialiased overflow-x-hidden"
      style={{ backgroundColor: theme.bg, color: theme.fg, cursor: 'none' }}
    >
      <Cursor accentColor={theme.accent} />
      <Navbar theme={theme} lang={lang} setLang={setLang} />
      <StickyBookingBar
        title={c.title}
        rating={d.details.rating}
        reviewCount={d.details.reviews}
        price={d.pricing.from}
        currency={d.pricing.currency}
        accentColor={theme.accent}
        fgColor={theme.fg}
        bgColor={theme.bg}
      />
      <HeroCinematic title={c.title} subtitle={c.subtitle} location={c.location} imageUrl={d.heroImage} theme={theme} lang={lang} />
      <SectionReveal>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24" style={{ borderTop: `1px solid ${theme.border}` }}>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: theme.muted }}>{c.description}</p>
        </div>
      </SectionReveal>
      <Gallery photos={d.gallery} theme={theme} />
      <DetailsStrip details={d.details} theme={theme} />
      <RoomParallax rooms={c.rooms} theme={theme} sectionTitle={lang === 'gr' ? 'Οι Χώροι' : 'The Spaces'} />
      <AmenitiesGrid amenities={d.amenities} theme={theme} title={lang === 'gr' ? 'Τι Περιλαμβάνεται' : "What's Included"} />
      <ReviewCards reviews={c.reviews} theme={theme} title={lang === 'gr' ? 'Λένε οι Επισκέπτες' : 'What Guests Say'} />
      <DualCTA theme={theme} price={d.pricing.from} currency={d.pricing.currency} lang={lang} />
    </div>
  );
}
```

- [ ] **Step 2: Verify Nisi in browser**

Open `http://localhost:5173/nisi`. Check: dusk purple `#1C1523`, rose gold accent, Fraunces headings.

---

## Task 11: Landing Page

**Files:**
- Modify: `src/pages/Landing.jsx`

- [ ] **Step 1: Replace `src/pages/Landing.jsx` with the full landing page**

```jsx
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import Cursor from '../components/shared/Cursor';
import Navbar from '../components/shared/Navbar';
import SectionReveal from '../components/shared/SectionReveal';
import { DESTINATIONS, DESTINATION_LIST } from '../data/destinations';

const EASE = [0.23, 1, 0.32, 1];
const LANDING_ACCENT = '#C9A84C';

const COPY = {
  en: {
    heroLine1: 'Where Greek',
    heroLine2: 'Luxury Lives',
    heroLine3: 'Online.',
    heroSub: 'Five destinations. Five personalities. One standard.',
    ourWork: 'Our Work',
    b2bHeadline: 'Want a site like this for your property?',
    b2bSub: 'We design and build world-class luxury listing pages for Greek hospitality businesses — Airbnb hosts, boutique hotels, and private villas across Greece.',
    b2bCta1: 'WhatsApp Us →',
    b2bCta2: 'See how it works',
    social: 'Trusted by hosts across Athens · Cyclades · Ionian · Crete',
    fromLabel: 'from',
    night: '/ night',
    explore: 'Explore →',
  },
  gr: {
    heroLine1: 'Η Ελληνική',
    heroLine2: 'Πολυτέλεια',
    heroLine3: 'Online.',
    heroSub: 'Πέντε προορισμοί. Πέντε προσωπικότητες. Ένα επίπεδο.',
    ourWork: 'Η Δουλειά μας',
    b2bHeadline: 'Θέλεις τέτοιο site για το property σου;',
    b2bSub: 'Σχεδιάζουμε και χτίζουμε luxury listing pages για ελληνικές επιχειρήσεις φιλοξενίας — Airbnb hosts, boutique ξενοδοχεία και βίλες σε όλη την Ελλάδα.',
    b2bCta1: 'WhatsApp →',
    b2bCta2: 'Δες πώς λειτουργεί',
    social: 'Εμπιστεύονται hosts σε Αθήνα · Κυκλάδες · Ιόνιο · Κρήτη',
    fromLabel: 'από',
    night: '/ νύχτα',
    explore: 'Εξερεύνησε →',
  },
};

function HeroLine({ text, delay }) {
  const reduced = useReducedMotion();
  if (reduced) return (
    <div className="overflow-hidden">
      <span className="block text-6xl md:text-8xl lg:text-[9rem] font-light tracking-tighter leading-[0.92] text-white"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}>{text}</span>
    </div>
  );
  return (
    <div className="overflow-hidden">
      <motion.span
        className="block text-6xl md:text-8xl lg:text-[9rem] font-light tracking-tighter leading-[0.92] text-white"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </div>
  );
}

function PropertyRow({ id, lang, copy }) {
  const [hovered, setHovered] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const rowRef = useRef(null);
  const d = DESTINATIONS[id];
  const c = d.content[lang];
  const reduced = useReducedMotion();

  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMouseY(e.clientY - rect.top);
  };

  return (
    <Link to={d.path}>
      <motion.div
        ref={rowRef}
        data-hover
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative flex items-center justify-between px-4 md:px-10 py-7 border-b cursor-pointer overflow-hidden group"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Hover image preview */}
        {!reduced && (
          <motion.div
            className="absolute right-0 top-0 h-full w-1/3 pointer-events-none overflow-hidden"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 60 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <img
              src={d.heroImage} alt={c.name}
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${mouseY * 0.1 - 20}px)`, transition: 'transform 0.3s ease' }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#080808]" />
          </motion.div>
        )}

        {/* Left: number + name */}
        <div className="flex items-center gap-6 md:gap-10 relative z-10">
          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {String(DESTINATION_LIST.indexOf(id) + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-1">
            <motion.span
              className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white"
              style={{ fontFamily: d.theme.fontHeading }}
              animate={{ x: hovered && !reduced ? 8 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {c.title}
            </motion.span>
            <span className="text-xs tracking-widest uppercase" style={{ color: d.theme.accent }}>
              {c.location}
            </span>
          </div>
        </div>

        {/* Right: price + arrow */}
        <div className="flex items-center gap-6 relative z-10">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{copy.fromLabel}</span>
            <span className="text-lg font-light text-white">{d.pricing.currency}{d.pricing.from} <span className="text-xs opacity-50">{copy.night}</span></span>
          </div>
          <motion.span
            animate={{ x: hovered && !reduced ? 6 : 0, color: hovered ? d.theme.accent : 'rgba(255,255,255,0.3)' }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Landing({ lang = 'en', setLang }) {
  const copy = COPY[lang];
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen antialiased overflow-x-hidden" style={{ backgroundColor: '#080808', cursor: 'none' }}>
      <Cursor accentColor={LANDING_ACCENT} />
      <Navbar lang={lang} setLang={setLang} isLanding />

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-[1280px] mx-auto w-full pt-24">
          <motion.div
            initial={reduced ? {} : { opacity: 0 }}
            animate={reduced ? {} : { opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: LANDING_ACCENT }}
          >
            Stayscape GR — Luxury Property Sites
          </motion.div>

          <div className="flex flex-col mb-8">
            <HeroLine text={copy.heroLine1} delay={0.5} />
            <HeroLine text={copy.heroLine2} delay={0.65} />
            <HeroLine text={copy.heroLine3} delay={0.8} />
          </div>

          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1, ease: EASE }}
            className="text-base md:text-lg max-w-md"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {copy.heroSub}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={reduced ? {} : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div
            animate={reduced ? {} : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-8 bg-white/20"
          />
        </motion.div>
      </section>

      {/* PROPERTIES LIST */}
      <SectionReveal>
        <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-10 h-px" style={{ backgroundColor: LANDING_ACCENT }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: LANDING_ACCENT }}>
              {copy.ourWork}
            </span>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {DESTINATION_LIST.map((id) => (
              <PropertyRow key={id} id={id} lang={lang} copy={copy} />
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* B2B SECTION */}
      <SectionReveal>
        <section
          className="py-24 md:py-36 px-6 md:px-16 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-[900px] mx-auto text-center flex flex-col items-center gap-8">
            <div className="w-10 h-px" style={{ backgroundColor: LANDING_ACCENT }} />

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {copy.b2bHeadline}
            </h2>

            <p className="text-base md:text-lg max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {copy.b2bSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <motion.a
                href="https://wa.me/306900000000"
                target="_blank" rel="noopener noreferrer"
                data-hover
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase cursor-pointer"
                style={{ backgroundColor: LANDING_ACCENT, color: '#080808' }}
              >
                {copy.b2bCta1}
              </motion.a>
              <motion.button
                data-hover
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase border cursor-pointer"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
              >
                {copy.b2bCta2}
              </motion.button>
            </div>

            <p className="text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {copy.social}
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* Footer */}
      <footer
        className="py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t text-xs"
        style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}
      >
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
          STAYSCAPE<span style={{ color: LANDING_ACCENT }}>.</span>GR
        </span>
        <span>© 2026 · All properties are demo showcases</span>
        <div className="flex gap-1">
          <button data-hover onClick={() => {}} className="cursor-pointer hover:opacity-60 transition-opacity">EN</button>
          <span className="mx-1" style={{ color: LANDING_ACCENT }}>|</span>
          <button data-hover onClick={() => {}} className="cursor-pointer hover:opacity-60 transition-opacity">GR</button>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Wire language buttons in Landing footer**

The footer language buttons should call `setLang`. Replace the footer `<div>` at the bottom of Landing.jsx:

```jsx
<div className="flex gap-1">
  <button data-hover onClick={() => setLang('en')} className="cursor-pointer hover:opacity-60 transition-opacity" style={{ color: lang === 'en' ? LANDING_ACCENT : 'inherit' }}>EN</button>
  <span className="mx-1" style={{ color: LANDING_ACCENT }}>|</span>
  <button data-hover onClick={() => setLang('gr')} className="cursor-pointer hover:opacity-60 transition-opacity" style={{ color: lang === 'gr' ? LANDING_ACCENT : 'inherit' }}>GR</button>
</div>
```

- [ ] **Step 3: Verify landing page**

Open `http://localhost:5173/`. Check:
- Full-screen dark hero with animated Cormorant Garamond title lines
- 5 property rows — hover on each shows image preview from right
- Each row has correct accent color
- B2B section visible after scrolling
- Language toggle switches EN/GR on all rows
- Clicking a row navigates to destination page

---

## Task 12: Final Polish + Lint

**Files:**
- Modify: `src/index.css` — ensure `cursor: none` applies globally on desktop

- [ ] **Step 1: Check `src/index.css` for global cursor rule**

Open `src/index.css`. If the file does not already contain a global cursor-none rule, add at the top of the file after `:root`:

```css
@media (min-width: 1024px) {
  * { cursor: none !important; }
}
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Fix any warnings. Common issues:
- Unused imports (remove them)
- Missing `key` props (add them)
- `href` on `<a>` without `rel="noopener"` (add it)

- [ ] **Step 3: Run build to confirm no errors**

```bash
npm run build
```

Expected: Build completes successfully. Check `dist/` exists.

- [ ] **Step 4: Full visual check across all routes**

With `npm run dev` running, check each route:
- `/` — Landing: hero, 5 rows with hover previews, B2B section
- `/athens` — Dark gold, Cormorant Garamond, all 8 sections visible on scroll
- `/cyclades` — Light bg, Aegean blue, all 8 sections
- `/ionian` — Warm beige bg, forest green, all 8 sections
- `/crete` — Deep brown, ochre, all 8 sections
- `/nisi` — Dusk purple, rose gold, all 8 sections
- Language toggle EN↔GR on every page changes text content
- Sticky bar appears after scrolling ~100px on all destination pages
- Custom cursor visible on desktop, hidden on mobile

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Landing page (B2B/B2C dual): Task 11
- ✅ 5 destination pages: Tasks 6-10
- ✅ Separate routes: Task 2
- ✅ Per-destination themes: `destinations.js` theme objects
- ✅ Sticky booking bar: Task 4
- ✅ Magnetic cursor (color prop): Task 3
- ✅ Gallery with lightbox: Task 5
- ✅ Details strip: Task 5
- ✅ Room parallax: Task 5
- ✅ Amenities grid: Task 5
- ✅ Reviews (3 cards): Task 5
- ✅ Dual CTA: Task 5
- ✅ Language toggle EN/GR: Task 4 (Navbar), Task 11 (Landing)
- ✅ `prefers-reduced-motion`: all animation components check `useReducedMotion()`
- ✅ All 5 fonts in index.html: Task 1
- ✅ DemoSwitcher dev-only: Task 2
- ✅ Unified data layer: Task 1

**Type consistency:**
- `theme.fontHeading` used consistently across HeroCinematic, Gallery, RoomParallax, DetailsStrip, DualCTA
- `theme.accent`, `theme.fg`, `theme.bg`, `theme.muted`, `theme.border` used consistently in all components
- `lang` prop passed as `'en' | 'gr'` string throughout — no mismatches
- `DESTINATIONS.athens.content[lang]` pattern used identically in all 5 page files
