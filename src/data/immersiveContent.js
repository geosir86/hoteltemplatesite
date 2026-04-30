export const IMMERSIVE_DATA = {
  athens: {
    theme: {
      id: 'athens',
      primary: '#C9A84C', // Gold
      secondary: '#0A0A0A', // Dark
      accent: '#F5F0E8', // Warm White
      fontHeading: "'Cormorant Garamond', serif",
      fontBody: "'Inter', sans-serif",
      style: 'editorial-dark'
    },
    heroImage: '/assets/greek_luxury_penthouse_acropolis_view_1776942386364.png',
    sequenceImages: [
      '/assets/greek_luxury_interior_master_bedroom_1776942408192.png',
      '/assets/greek_luxury_living_room_dining_1776942426126.png',
      '/assets/greek_luxury_marble_bathroom_1776942694181.png',
    ],
    content: {
      en: {
        title: 'Athenian Penthouse',
        subtitle: 'Urban Elegance Above the City',
        introText: 'Discover an oasis of modern luxury floating above the historic streets of Athens. A perfect blend of contemporary design and timeless Acropolis views.',
        rooms: [
          {
            title: 'The Master Suite',
            description: 'Wake up to panoramic city views. The master suite features floor-to-ceiling windows, a private terrace, and a spa-like en-suite bathroom.',
            imageUrl: '/assets/greek_luxury_marble_bathroom_1776942694181.png'
          },
          {
            title: 'The Rooftop Terrace',
            description: 'Your private vantage point. Enjoy evening cocktails with an unobstructed, breathtaking view of the Parthenon illuminated against the night sky.',
            imageUrl: '/assets/greek_luxury_terrace_sunset_view_1776942676038.png'
          },
          {
            title: 'The Living Space',
            description: 'An open-concept living area designed for entertaining, complete with designer furniture and bespoke artwork.',
            imageUrl: '/assets/greek_luxury_kitchen_detail_1776942713984.png'
          }
        ],
        amenities: [
          { icon: 'wifi', label: 'Gigabit Fiber' },
          { icon: 'ac', label: 'Climate Control' },
          { icon: 'tv', label: 'Home Cinema' },
          { icon: 'coffee', label: 'Espresso Bar' }
        ]
      },
      gr: {
        title: 'Αθηναϊκό Ρετιρέ',
        subtitle: 'Αστική Κομψότητα Πάνω από την Πόλη',
        introText: 'Ανακαλύψτε μια όαση μοντέρνας πολυτέλειας που αιωρείται πάνω από τους ιστορικούς δρόμους της Αθήνας. Ένας τέλειος συνδυασμός σύγχρονου σχεδιασμού και διαχρονικής θέας στην Ακρόπολη.',
        rooms: [
          {
            title: 'Η Κύρια Σουίτα',
            description: 'Ξυπνήστε με πανοραμική θέα στην πόλη. Η κύρια σουίτα διαθέτει παράθυρα από το δάπεδο μέχρι την οροφή, ιδιωτική βεράντα και μπάνιο που θυμίζει σπα.',
            imageUrl: '/assets/greek_luxury_marble_bathroom_1776942694181.png'
          },
          {
            title: 'Η Ταράτσα',
            description: 'Το δικό σας ιδιωτικό παρατηρητήριο. Απολαύστε βραδινά κοκτέιλ με μια ανεμπόδιστη, εκπληκτική θέα του Παρθενώνα φωτισμένου στον νυχτερινό ουρανό.',
            imageUrl: '/assets/greek_luxury_terrace_sunset_view_1776942676038.png'
          },
          {
            title: 'Ο Χώρος Διημέρευσης',
            description: 'Ένας ενιαίος χώρος καθιστικού σχεδιασμένος για φιλοξενία, με επώνυμα έπιπλα και ειδικά επιλεγμένα έργα τέχνης.',
            imageUrl: '/assets/greek_luxury_kitchen_detail_1776942713984.png'
          }
        ],
        amenities: [
          { icon: 'wifi', label: 'Gigabit Fiber' },
          { icon: 'ac', label: 'Κλιματισμός' },
          { icon: 'tv', label: 'Home Cinema' },
          { icon: 'coffee', label: 'Espresso Bar' }
        ]
      }
    }
  },

  cyclades: {
    theme: {
      id: 'cyclades',
      primary: '#0E5FA8', // Aegean Blue
      secondary: '#F8F8F8', // Near-White (avoid pure white for readability)
      accent: '#E8DCC8', // Sand
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Outfit', sans-serif",
      style: 'minimal-coastal'
    },
    heroImage: '/assets/cyclades_hero.png',
    sequenceImages: [
      '/assets/greek_luxury_decor_olive_tree_1776942733057.png',
      '/assets/gallery_items_deep_scroll_1776942186794.png',
      '/assets/cyclades_pool.png',
    ],
    content: {
      en: {
        title: 'Villa Aether',
        subtitle: 'The Cycladic Minimalist Dream',
        introText: 'Whitewashed walls and infinite blue. A sanctuary where minimalist Cycladic architecture meets the raw beauty of the Aegean Sea.',
        rooms: [
          {
            title: 'The Cave Suite',
            description: 'Carved directly into the caldera. The master suite offers natural cooling, organic curves, and a private plunge pool facing the sea.',
            imageUrl: '/assets/cyclades_bed.png'
          },
          {
            title: 'The Infinity Edge',
            description: 'Seamlessly blending into the horizon. Spend your days lounging by the pool with undisturbed views of the dramatic island sunset.',
            imageUrl: '/assets/cyclades_pool.png'
          },
          {
            title: 'The Courtyard',
            description: 'A wind-protected outdoor dining area under a traditional pergola, perfect for long summer lunches.',
            imageUrl: '/assets/hero_section_greek_1776942485511.png'
          }
        ],
        amenities: [
          { icon: 'wifi', label: 'Starlink Internet' },
          { icon: 'bath', label: 'Private Plunge Pool' },
          { icon: 'shield', label: 'Absolute Privacy' },
          { icon: 'coffee', label: 'Local Breakfast' }
        ]
      },
      gr: {
        title: 'Βίλα Αιθέρας',
        subtitle: 'Το Κυκλαδίτικο Μινιμαλιστικό Όνειρο',
        introText: 'Ασπρισμένοι τοίχοι και απέραντο γαλάζιο. Ένα καταφύγιο όπου η μινιμαλιστική κυκλαδίτικη αρχιτεκτονική συναντά την άγρια ομορφιά του Αιγαίου.',
        rooms: [
          {
            title: 'Η Σπηλαιώδης Σουίτα',
            description: 'Λαξευμένη απευθείας στην καλντέρα. Η κύρια σουίτα προσφέρει φυσική ψύξη, οργανικές καμπύλες και ιδιωτική πισίνα με θέα στη θάλασσα.',
            imageUrl: '/assets/cyclades_bed.png'
          },
          {
            title: 'Η Πισίνα Υπερχείλισης',
            description: 'Εναρμονισμένη απόλυτα με τον ορίζοντα. Περάστε τις μέρες σας δίπλα στην πισίνα με ανεμπόδιστη θέα στο δραματικό ηλιοβασίλεμα του νησιού.',
            imageUrl: '/assets/cyclades_pool.png'
          },
          {
            title: 'Η Αυλή',
            description: 'Ένας προστατευμένος από τον άνεμο υπαίθριος χώρος φαγητού κάτω από μια παραδοσιακή πέργκολα, ιδανικός για μεγάλα καλοκαιρινά γεύματα.',
            imageUrl: '/assets/hero_section_greek_1776942485511.png'
          }
        ],
        amenities: [
          { icon: 'wifi', label: 'Starlink Internet' },
          { icon: 'bath', label: 'Ιδιωτική Πισίνα' },
          { icon: 'shield', label: 'Απόλυτη Ιδιωτικότητα' },
          { icon: 'coffee', label: 'Τοπικό Πρωινό' }
        ]
      }
    }
  },

  ionian: {
    theme: {
      id: 'ionian',
      primary: '#1A2E1E', // Forest Green
      secondary: '#EAE0D5', // Limestone
      accent: '#C67C4E', // Terracotta
      fontHeading: "'DM Serif Display', serif",
      fontBody: "'DM Sans', sans-serif",
      style: 'organic-nature'
    },
    heroImage: '/assets/ionian_hero.png',
    sequenceImages: [
      '/assets/greek_luxury_living_room_dining_1776942426126.png',
      '/assets/greek_luxury_decor_olive_tree_1776942733057.png',
      '/assets/ionian_terrace.png',
    ],
    content: {
      en: {
        title: 'Casa Verde',
        subtitle: 'A Lush Escape in the Ionian',
        introText: "Surrounded by ancient olive groves and emerald waters. A stone-built sanctuary offering the ultimate retreat into nature's embrace.",
        rooms: [
          {
            title: 'The Forest Suite',
            description: 'Sleep among the trees. The master bedroom features vast windows framing the lush Ionian landscape and a private balcony.',
            imageUrl: '/assets/ionian_bed.png'
          },
          {
            title: 'The Stone Terrace',
            description: 'Hand-carved local stone meets modern luxury. An outdoor living space designed for long evenings under the stars.',
            imageUrl: '/assets/ionian_terrace.png'
          },
          {
            title: 'The Secret Cove',
            description: 'Just steps away from your door lies a private pebble beach with crystal-clear emerald waters.',
            imageUrl: '/assets/greek_luxury_kitchen_detail_1776942713984.png'
          }
        ],
        amenities: [
          { icon: 'wifi', label: 'Fast WiFi' },
          { icon: 'car', label: 'Private Parking' },
          { icon: 'ac', label: 'Eco Cooling' },
          { icon: 'coffee', label: 'Organic Coffee' }
        ]
      },
      gr: {
        title: 'Πράσινη Οικία',
        subtitle: 'Μια Καταπράσινη Απόδραση στο Ιόνιο',
        introText: 'Περιτριγυρισμένο από αρχαίους ελαιώνες και σμαραγδένια νερά. Ένα πέτρινο καταφύγιο που προσφέρει την απόλυτη απόδραση στην αγκαλιά της φύσης.',
        rooms: [
          {
            title: 'Η Σουίτα του Δάσους',
            description: 'Κοιμηθείτε ανάμεσα στα δέντρα. Η κύρια κρεβατοκάμαρα διαθέτει τεράστια παράθυρα που πλαισιώνουν το καταπράσινο τοπίο του Ιονίου και ιδιωτικό μπαλκόνι.',
            imageUrl: '/assets/ionian_bed.png'
          },
          {
            title: 'Η Πέτρινη Βεράντα',
            description: 'Η χειροποίητη τοπική πέτρα συναντά τη μοντέρνα πολυτέλεια. Ένας εξωτερικός χώρος διαβίωσης σχεδιασμένος για μεγάλες βραδιές κάτω από τα αστέρια.',
            imageUrl: '/assets/ionian_terrace.png'
          },
          {
            title: 'Ο Κρυφός Κολπίσκος',
            description: 'Μόλις λίγα βήματα μακριά από την πόρτα σας βρίσκεται μια ιδιωτική παραλία με βότσαλα και κρυστάλλινα σμαραγδένια νερά.',
            imageUrl: '/assets/greek_luxury_kitchen_detail_1776942713984.png'
          }
        ],
        amenities: [
          { icon: 'wifi', label: 'Γρήγορο WiFi' },
          { icon: 'car', label: 'Ιδιωτικό Πάρκινγκ' },
          { icon: 'ac', label: 'Οικολογική Ψύξη' },
          { icon: 'coffee', label: 'Βιολογικός Καφές' }
        ]
      }
    }
  },

  crete: {
    theme: {
      id: 'crete',
      primary: '#4B4B2D', // Olive Green
      secondary: '#F1EDE1', // Warm Cream
      accent: '#8B4513', // Saddle Brown
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Montserrat', sans-serif",
      style: 'tenuta-rustic'
    },
    heroImage: '/assets/crete_hero.png',
    interiorImage: '/assets/crete_interior.png',
    aerialImage: '/assets/crete_aerial.png',
    details: {
      location: 'Apokoronas, Chania',
      land: '40,000 m²',
      vibe: 'Rustic Estate'
    },
    content: {
      en: {
        title: 'Creta Heritage',
        subtitle: 'An Organic Heritage Estate',
        introText: 'Nestled between the White Mountains and the Libyan Sea, Creta Heritage is an century-old estate reimagined as a sanctuary of slow living.',
        philosophy: 'Our philosophy is rooted in the earth. Here, luxury is defined by the rustle of olive leaves and the taste of sun-warmed stone.',
        sections: [
          {
            title: 'The Stone House',
            text: 'Original Cretan architecture restored with minimalist Italian precision.',
            image: '/assets/crete_interior.png'
          },
          {
            title: 'The Olive Groves',
            text: '40 acres of organic olive trees that produce our signature liquid gold.',
            image: '/assets/crete_aerial.png'
          }
        ],
        rooms: [
          {
            title: 'Stone Master Suite',
            description: 'Exposed stone walls and raw linen textures create a grounding atmosphere.',
            imageUrl: '/assets/crete_interior.png'
          },
          {
            title: 'The Garden Studio',
            description: 'Nestled within the olive groves, offering ultimate privacy and connection to nature.',
            imageUrl: '/assets/crete_hero.png'
          }
        ],
        amenities: [
          { icon: 'leaf', label: 'Organic Estate', desc: '40 acres of private olive groves and gardens.' },
          { icon: 'waves', label: 'Stone Pool', desc: 'Hand-carved infinity pool with mountain views.' },
          { icon: 'wind', label: 'Sea Breeze', desc: 'Naturally cooled by the Libyan Sea winds.' },
          { icon: 'shield', label: 'Total Privacy', desc: 'A gated estate with no neighbors in sight.' }
        ]
      },
      gr: {
        title: 'Creta Heritage',
        subtitle: 'Ένα Ιστορικό Βιολογικό Κτήμα',
        introText: 'Ανάμεσα στα Λευκά Όρη και το Λιβυκό Πέλαγος, το Creta Heritage είναι ένα κτήμα αιώνων που αναγεννήθηκε ως καταφύγιο αργής διαβίωσης.',
        philosophy: 'Η φιλοσοφία μας ριζώνει στη γη. Εδώ, η πολυτέλεια ορίζεται από το θρόισμα των φύλλων της ελιάς και τη ζεστασιά της πέτρας.',
        sections: [
          {
            title: 'Το Πέτρινο Σπίτι',
            text: 'Αυθεντική κρητική αρχιτεκτονική αποκατεστημένη με ιταλική μινιμαλιστική ακρίβεια.',
            image: '/assets/crete_interior.png'
          },
          {
            title: 'Οι Ελαιώνες',
            text: '160 στρέμματα βιολογικών ελαιόδεντρων που παράγουν τον δικό μας υγρό χρυσό.',
            image: '/assets/crete_aerial.png'
          }
        ],
        rooms: [
          {
            title: 'Πέτρινη Κύρια Σουίτα',
            description: 'Οι εκτεθειμένοι πέτρινοι τοίχοι και οι υφές από λινό δημιουργούν μια ατμόσφαιρα γαλήνης.',
            imageUrl: '/assets/crete_interior.png'
          },
          {
            title: 'Το Στούντιο του Κήπου',
            description: 'Μέσα στους ελαιώνες, προσφέροντας απόλυτη ιδιωτικότητα και σύνδεση με τη φύση.',
            imageUrl: '/assets/crete_hero.png'
          }
        ],
        amenities: [
          { icon: 'leaf', label: 'Βιολογικό Κτήμα', desc: '160 στρέμματα ιδιωτικών ελαιώνων και κήπων.' },
          { icon: 'waves', label: 'Πέτρινη Πισίνα', desc: 'Χειροποίητη πισίνα υπερχείλισης με θέα στο βουνό.' },
          { icon: 'wind', label: 'Θαλασσινή Αύρα', desc: 'Φυσική ψύξη από τους ανέμους του Λιβυκού Πελάγους.' },
          { icon: 'shield', label: 'Απόλυτη Ιδιωτικότητα', desc: 'Περιφραγμένο κτήμα χωρίς γείτονες σε κοντινή απόσταση.' }
        ]
      }
    }
  },

  nisi: {
    theme: {
      id: 'nisi',
      primary: '#C8956C', // Rose Gold
      secondary: '#1C1523', // Dusk Purple-Black
      accent: '#FAFAFA', // Off-white
      fontHeading: "'Fraunces', serif",
      fontBody: "'Lato', sans-serif",
      style: 'boutique-journal'
    },
    heroImage: '/assets/nisi_hero.png',
    sequenceImages: [
      '/assets/nisi_pool.png',
      '/assets/nisi_terrace.png',
      '/assets/nisi_room.png',
    ],
    content: {
      en: {
        title: 'Nisi',
        subtitle: 'The Island Room Experience',
        introText: 'Not a hotel. Not just a room. A living painting. Nisi is the distilled essence of the Greek island dream — where every morning feels like the first.',
        rooms: [
          {
            title: 'The Cave Room',
            description: 'Carved into the volcanic rock. Curved whitewashed walls, hand-woven linens, and a private window that frames the Aegean like a living artwork.',
            imageUrl: '/assets/nisi_room.png'
          },
          {
            title: 'The Plunge Pool',
            description: 'Step outside your door into warm cobalt-blue water with an uninterrupted view of the sea below. Sunrise here is not an event — it is a ritual.',
            imageUrl: '/assets/nisi_pool.png'
          },
          {
            title: 'The Morning Table',
            description: 'Local honey, thyme cheese, vine tomatoes, and coffee brewed over embers. Every morning is an occasion at Nisi.',
            imageUrl: '/assets/nisi_terrace.png'
          }
        ],
        amenities: [
          { icon: 'wifi', label: 'Satellite WiFi' },
          { icon: 'bath', label: 'Plunge Pool' },
          { icon: 'coffee', label: 'Chef Breakfast' },
          { icon: 'shield', label: 'Fully Private' },
          { icon: 'key', label: 'Self Check-In' },
          { icon: 'premium', label: 'Superhost' },
          { icon: 'tv', label: 'No TV Policy' },
          { icon: 'garden', label: 'Organic Garden' },
        ]
      },
      gr: {
        title: 'Νησί',
        subtitle: 'Η Εμπειρία του Νησιώτικου Δωματίου',
        introText: 'Ούτε ξενοδοχείο, ούτε απλώς δωμάτιο. Ένας ζωντανός πίνακας. Το Νησί είναι η ουσία του ελληνικού νησιώτικου ονείρου — όπου κάθε πρωινό μοιάζει με πρώτη φορά.',
        rooms: [
          {
            title: 'Το Σπηλαιώδες Δωμάτιο',
            description: 'Λαξευμένο στο ηφαιστειογενές βράχο. Καμπυλωτοί ασβεστωμένοι τοίχοι, χειροποίητα λινά και ένα παράθυρο που πλαισιώνει το Αιγαίο σαν ζωντανό έργο τέχνης.',
            imageUrl: '/assets/nisi_room.png'
          },
          {
            title: 'Η Μικρή Πισίνα',
            description: 'Βγείτε από την πόρτα σας σε ζεστά κοβαλτί νερά με αδιατάρακτη θέα στη θάλασσα. Η ανατολή εδώ δεν είναι γεγονός — είναι τελετουργία.',
            imageUrl: '/assets/nisi_pool.png'
          },
          {
            title: 'Το Πρωινό Τραπέζι',
            description: 'Τοπικό μέλι, τυρί θυμαριού, ντοματίνια αμπελιού και καφές. Κάθε πρωί είναι μια ξεχωριστή εκδήλωση στο Νησί.',
            imageUrl: '/assets/nisi_terrace.png'
          }
        ],
        amenities: [
          { icon: 'wifi', label: 'Δορυφορικό WiFi' },
          { icon: 'bath', label: 'Ιδ. Πισίνα' },
          { icon: 'coffee', label: 'Πρωινό Chef' },
          { icon: 'shield', label: 'Πλήρης Privacy' },
          { icon: 'key', label: 'Self Check-In' },
          { icon: 'premium', label: 'Superhost' },
          { icon: 'tv', label: 'Χωρίς TV' },
          { icon: 'garden', label: 'Βιολογικός Κήπος' },
        ]
      }
    }
  },
  santorini: {
    theme: {
      id: 'santorini',
      primary: '#1A1A1A',
      secondary: '#FCFAF7',
      accent: '#D1B07C',
      fontHeading: "'Cormorant Garamond', serif",
      fontBody: "'Inter', sans-serif",
      style: 'hutstuf-premium'
    },
    heroImage: '/assets/santorini_hero_day.png',
    heroImageNight: '/assets/santorini_hero_night.png',
    heroVideo: '/assets/santorini_hero.mp4',
    volcanoImage: '/assets/santorini_volcano.png',
    volcanoSunset: '/assets/santorini_volcano_sunset.png',
    sequenceImages: [
      '/assets/santorini_interior.png',
      '/assets/santorini_terrace.png',
      '/assets/santorini_volcano.png',
      '/assets/santorini_hero_night.png',
    ],
    details: {
      capacity: '4 Guests',
      size: '140 m²',
      beds: '2 Master Suites',
      baths: '2 En-suite'
    },
    content: {
      en: {
        title: 'The Santorini Estate',
        subtitle: 'Sculpted Solitude Above the Aegean',
        introText: 'A geometric sanctuary carved into the volcanic cliffs of Oia. Where organic white stone meets the infinite blue of the Aegean summer.',
        volcanoTitle: 'Facing the Fire',
        volcanoText: 'The estate is positioned at the highest point of the caldera, offering an unobstructed view of the volcanic Nea Kameni. A reminder of the raw power that shaped this beauty.',
        rooms: [
          {
            title: 'The Caldera Suite',
            description: 'Minimalist Cycladic architecture reimagined. Curved walls, natural light, and a window that frames the sea like living art.',
            imageUrl: '/assets/santorini_interior.png'
          },
          {
            title: 'The Infinite Terrace',
            description: 'Suspended between sky and sea. Featuring a private plunge pool and panoramic views of the Santorini sunset.',
            imageUrl: '/assets/santorini_terrace.png'
          },
          {
            title: 'Aegean Twilight',
            description: 'As the sun dips below the horizon, the estate transforms into a softly glowing sculpture against the indigo sky.',
            imageUrl: '/assets/santorini_hero_night.png'
          }
        ],
        amenities: [
          { icon: 'waves', label: 'Infinity Pool', desc: 'Temperature-controlled with caldera views.' },
          { icon: 'sun', label: 'Sunset Deck', desc: 'Positioned for the ultimate golden hour.' },
          { icon: 'wine', label: 'Local Cellar', desc: 'Curated selection of Assyrtiko wines.' },
          { icon: 'shield', label: 'Full Privacy', desc: 'Discrete access and total seclusion.' },
          { icon: 'wifi', label: 'Starlink', desc: 'High-speed connectivity everywhere.' },
          { icon: 'key', label: 'Concierge', desc: '24/7 dedicated estate manager.' },
        ]
      },
      gr: {
        title: 'Το Κτήμα της Σαντορίνης',
        subtitle: 'Σμιλεμένη Μοναξιά πάνω από το Αιγαίο',
        introText: 'Ένα γεωμετρικό καταφύγιο λαξευμένο στους ηφαιστειογενείς βράχους της Οίας. Εκεί όπου η λευκή πέτρα συναντά το απέραντο γαλάζιο του ελληνικού καλοκαιριού.',
        volcanoTitle: 'Απέναντι στο Ηφαίστειο',
        volcanoText: 'Το κτήμα βρίσκεται στο υψηλότερο σημείο της καλντέρας, προσφέροντας ανεμπόδιστη θέα στη Νέα Καμένη. Μια υπενθύμιση της δύναμης που δημιούργησε αυτή την ομορφιά.',
        rooms: [
          {
            title: 'Η Σουίτα της Καλντέρας',
            description: 'Η μινιμαλιστική κυκλαδίτικη αρχιτεκτονική σε νέα μορφή. Καμπύλοι τοίχοι και φως που αναδεικνύει το Αιγαίο.',
            imageUrl: '/assets/santorini_interior.png'
          },
          {
            title: 'Η Απέραντη Βεράντα',
            description: 'Αιωρούμενη μεταξύ ουρανού και θάλασσας. Με ιδιωτική πισίνα και πανοραμική θέα στο ηλιοβασίλεμα.',
            imageUrl: '/assets/santorini_terrace.png'
          },
          {
            title: 'Λυκόφως στο Αιγαίο',
            description: 'Καθώς ο ήλιος δύει, το κτήμα μεταμορφώνεται σε ένα λαμπερό γλυπτό πάνω στον νυχτερινό ουρανό.',
            imageUrl: '/assets/santorini_hero_night.png'
          }
        ],
        amenities: [
          { icon: 'waves', label: 'Infinity Pool', desc: 'Θερμαινόμενη με θέα στην καλντέρα.' },
          { icon: 'sun', label: 'Sunset Deck', desc: 'Το ιδανικό σημείο για το ηλιοβασίλεμα.' },
          { icon: 'wine', label: 'Κελάρι', desc: 'Επιλεγμένα κρασιά Ασύρτικο.' },
          { icon: 'shield', label: 'Ιδιωτικότητα', desc: 'Απόλυτη απομόνωση και ασφάλεια.' },
          { icon: 'wifi', label: 'Starlink', desc: 'Γρήγορη σύνδεση σε όλους τους χώρους.' },
          { icon: 'key', label: 'Concierge', desc: '24/7 προσωπικός βοηθός.' },
        ]
      }
    }
  }
};
