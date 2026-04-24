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
      '/assets/greek_luxury_kitchen_detail_1776942713864.png',
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
      accent: '#3B6E47',
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
