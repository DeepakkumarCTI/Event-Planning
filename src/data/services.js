/* =========================================================
   FUNCTION PLANNER
   SERVICES DATA
========================================================= */

/* =========================================================
   SERVICE CATEGORIES
========================================================= */

export const serviceCategories = [
  {
    id: "venue",
    name: "Venue Management",
    description:
      "Find, coordinate and manage the perfect venue for your event.",
    icon: "MapPin",
  },
  {
    id: "decoration",
    name: "Decoration",
    description:
      "Transform your venue with beautiful and customized décor.",
    icon: "Palette",
  },
  {
    id: "catering",
    name: "Catering",
    description:
      "Delicious menus and professional catering services for your guests.",
    icon: "UtensilsCrossed",
  },
  {
    id: "photography",
    name: "Photography",
    description:
      "Capture the important moments of your celebration.",
    icon: "Camera",
  },
  {
    id: "music",
    name: "DJ & Music",
    description:
      "Create the perfect atmosphere with music and professional DJ services.",
    icon: "Music",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description:
      "Make your event memorable with engaging entertainment.",
    icon: "Mic2",
  },
  {
    id: "lighting",
    name: "Lighting",
    description:
      "Professional lighting solutions that bring your venue to life.",
    icon: "Lightbulb",
  },
  {
    id: "stage",
    name: "Stage Setup",
    description:
      "Professional stage design, production and installation.",
    icon: "Presentation",
  },
  {
    id: "transportation",
    name: "Transportation",
    description:
      "Reliable transportation arrangements for hosts and guests.",
    icon: "Car",
  },
  {
    id: "guest-management",
    name: "Guest Management",
    description:
      "Smooth registration, coordination and guest assistance.",
    icon: "Users",
  },
  {
    id: "invitations",
    name: "Invitations",
    description:
      "Beautiful digital and printed invitations for your event.",
    icon: "Mail",
  },
  {
    id: "makeup",
    name: "Makeup & Styling",
    description:
      "Professional styling and makeup services for special occasions.",
    icon: "Sparkles",
  },
  {
    id: "security",
    name: "Security",
    description:
      "Professional security and crowd-management support.",
    icon: "ShieldCheck",
  },
  {
    id: "wedding-planning",
    name: "Wedding Planning",
    description:
      "End-to-end planning and coordination for your wedding.",
    icon: "Heart",
  },
];

/* =========================================================
   SERVICES
========================================================= */

export const services = [
  {
    id: "venue-management",

    slug: "venue-management",

    name: "Venue Management",

    category: "venue",

    categoryName: "Venue Management",

    shortDescription:
      "Find and manage a venue that perfectly fits your event.",

    description:
      "From intimate celebrations to large corporate gatherings, we help coordinate venue selection, layout planning, setup requirements and event-day venue management.",

    icon: "MapPin",

    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",

    priceType: "Starting from",

    price: 25000,

    unit: "event",

    popular: true,

    features: [
      "Venue discovery",
      "Venue coordination",
      "Layout planning",
      "Setup coordination",
      "Event-day management",
    ],

    suitableFor: [
      "Weddings",
      "Corporate Events",
      "Conferences",
      "Private Parties",
      "College Events",
    ],
  },

  {
    id: "event-decoration",

    slug: "event-decoration",

    name: "Event Decoration",

    category: "decoration",

    categoryName: "Decoration",

    shortDescription:
      "Create a beautiful atmosphere with customized event décor.",

    description:
      "Our decoration service transforms your venue according to your event theme, colors and preferences with carefully planned décor elements.",

    icon: "Palette",

    image:
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",

    priceType: "Starting from",

    price: 15000,

    unit: "event",

    popular: true,

    features: [
      "Theme decoration",
      "Floral arrangements",
      "Backdrop design",
      "Table decoration",
      "Entrance decoration",
      "Stage decoration",
    ],

    suitableFor: [
      "Weddings",
      "Birthdays",
      "Engagements",
      "Baby Showers",
      "Anniversaries",
    ],
  },

  {
    id: "catering",

    slug: "catering",

    name: "Catering",

    category: "catering",

    categoryName: "Catering",

    shortDescription:
      "Serve memorable food experiences tailored to your guests.",

    description:
      "Plan menus for your event with a range of cuisine options, professional service and guest-focused food arrangements.",

    icon: "UtensilsCrossed",

    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",

    priceType: "Starting from",

    price: 450,

    unit: "guest",

    popular: true,

    features: [
      "Custom menu planning",
      "Vegetarian options",
      "Non-vegetarian options",
      "Buffet service",
      "Live counters",
      "Dessert arrangements",
      "Professional serving staff",
    ],

    suitableFor: [
      "Weddings",
      "Corporate Events",
      "Birthdays",
      "Conferences",
      "Private Parties",
    ],
  },

  {
    id: "photography",

    slug: "photography",

    name: "Photography",

    category: "photography",

    categoryName: "Photography",

    shortDescription:
      "Preserve your most important event moments professionally.",

    description:
      "Our photography service captures candid moments, portraits, event highlights and important details throughout your celebration.",

    icon: "Camera",

    image:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80",

    priceType: "Starting from",

    price: 30000,

    unit: "event",

    popular: true,

    features: [
      "Candid photography",
      "Traditional photography",
      "Portrait sessions",
      "Event coverage",
      "Edited digital photographs",
    ],

    suitableFor: [
      "Weddings",
      "Engagements",
      "Birthdays",
      "Anniversaries",
      "Corporate Events",
    ],
  },

  {
    id: "videography",

    slug: "videography",

    name: "Videography",

    category: "photography",

    categoryName: "Photography",

    shortDescription:
      "Capture your event through professional cinematic video.",

    description:
      "Create a lasting visual record of your celebration with professional event videography and edited highlight videos.",

    icon: "Video",

    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",

    priceType: "Starting from",

    price: 35000,

    unit: "event",

    popular: false,

    features: [
      "Full event coverage",
      "Cinematic video",
      "Highlight film",
      "Professional editing",
      "Digital delivery",
    ],

    suitableFor: [
      "Weddings",
      "Engagements",
      "Corporate Events",
      "Product Launches",
      "College Events",
    ],
  },

  {
    id: "dj-music",

    slug: "dj-music",

    name: "DJ & Music",

    category: "music",

    categoryName: "DJ & Music",

    shortDescription:
      "Set the right mood with professional DJ and music services.",

    description:
      "From background music to energetic dance floors, our music service is customized around your event style and audience.",

    icon: "Music",

    image:
      "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80",

    priceType: "Starting from",

    price: 20000,

    unit: "event",

    popular: true,

    features: [
      "Professional DJ",
      "Sound system",
      "Music selection",
      "Dance floor music",
      "Event announcements",
    ],

    suitableFor: [
      "Weddings",
      "Birthdays",
      "Private Parties",
      "College Events",
      "Corporate Events",
    ],
  },

  {
    id: "entertainment",

    slug: "entertainment",

    name: "Entertainment",

    category: "entertainment",

    categoryName: "Entertainment",

    shortDescription:
      "Keep your guests engaged with memorable entertainment.",

    description:
      "Choose entertainment options suited to your audience, event type and venue, from performers and hosts to interactive activities.",

    icon: "Mic2",

    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",

    priceType: "Starting from",

    price: 15000,

    unit: "event",

    popular: false,

    features: [
      "Live performers",
      "Anchors and hosts",
      "Interactive games",
      "Cultural performances",
      "Special acts",
    ],

    suitableFor: [
      "Weddings",
      "Birthdays",
      "Corporate Events",
      "College Events",
      "Cultural Events",
    ],
  },

  {
    id: "lighting",

    slug: "lighting",

    name: "Event Lighting",

    category: "lighting",

    categoryName: "Lighting",

    shortDescription:
      "Enhance your venue with professional event lighting.",

    description:
      "Create atmosphere and visual impact using decorative, stage and architectural lighting solutions.",

    icon: "Lightbulb",

    image:
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80",

    priceType: "Starting from",

    price: 18000,

    unit: "event",

    popular: false,

    features: [
      "Stage lighting",
      "Decorative lighting",
      "Ambient lighting",
      "Architectural lighting",
      "Special effects",
    ],

    suitableFor: [
      "Weddings",
      "Concerts",
      "College Events",
      "Corporate Events",
      "Private Parties",
    ],
  },

  {
    id: "stage-setup",

    slug: "stage-setup",

    name: "Stage Setup",

    category: "stage",

    categoryName: "Stage Setup",

    shortDescription:
      "Professional stage design and production for your event.",

    description:
      "We coordinate stage structures, backdrops, branding, screens and production elements based on the event requirements.",

    icon: "Presentation",

    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",

    priceType: "Starting from",

    price: 30000,

    unit: "event",

    popular: false,

    features: [
      "Stage structure",
      "Backdrop",
      "LED screens",
      "Stage branding",
      "Podium setup",
      "Production coordination",
    ],

    suitableFor: [
      "Conferences",
      "Corporate Events",
      "Product Launches",
      "College Events",
      "Cultural Events",
    ],
  },

  {
    id: "transportation",

    slug: "transportation",

    name: "Transportation",

    category: "transportation",

    categoryName: "Transportation",

    shortDescription:
      "Coordinate convenient transportation for your event.",

    description:
      "Arrange transportation for hosts, guests, VIPs and event teams according to venue location and event schedule.",

    icon: "Car",

    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&q=80",

    priceType: "Starting from",

    price: 10000,

    unit: "event",

    popular: false,

    features: [
      "Guest transportation",
      "Airport transfers",
      "VIP transportation",
      "Shuttle coordination",
      "Driver coordination",
    ],

    suitableFor: [
      "Weddings",
      "Corporate Events",
      "Conferences",
      "Private Parties",
    ],
  },

  {
    id: "guest-management",

    slug: "guest-management",

    name: "Guest Management",

    category: "guest-management",

    categoryName: "Guest Management",

    shortDescription:
      "Make guest arrival and coordination smooth and organized.",

    description:
      "From guest registration to on-site assistance, our guest management service helps ensure a smooth experience for attendees.",

    icon: "Users",

    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",

    priceType: "Starting from",

    price: 12000,

    unit: "event",

    popular: false,

    features: [
      "Guest registration",
      "Welcome desk",
      "Guest assistance",
      "Seating coordination",
      "VIP assistance",
      "Event information desk",
    ],

    suitableFor: [
      "Weddings",
      "Corporate Events",
      "Conferences",
      "College Events",
      "Large Gatherings",
    ],
  },

  {
    id: "invitations",

    slug: "invitations",

    name: "Invitations",

    category: "invitations",

    categoryName: "Invitations",

    shortDescription:
      "Create invitations that match the personality of your event.",

    description:
      "Design digital and printed invitations with customized event details, themes and branding.",

    icon: "Mail",

    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80",

    priceType: "Starting from",

    price: 5000,

    unit: "project",

    popular: false,

    features: [
      "Digital invitations",
      "Printed invitations",
      "Custom designs",
      "RSVP support",
      "Event information",
    ],

    suitableFor: [
      "Weddings",
      "Birthdays",
      "Engagements",
      "Baby Showers",
      "Corporate Events",
    ],
  },

  {
    id: "makeup-styling",

    slug: "makeup-styling",

    name: "Makeup & Styling",

    category: "makeup",

    categoryName: "Makeup & Styling",

    shortDescription:
      "Professional makeup and styling for your special occasion.",

    description:
      "Coordinate professional makeup and styling services for hosts, wedding parties, performers and special guests.",

    icon: "Sparkles",

    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",

    priceType: "Starting from",

    price: 15000,

    unit: "person",

    popular: false,

    features: [
      "Event makeup",
      "Bridal makeup",
      "Hair styling",
      "Pre-event consultation",
      "Touch-up support",
    ],

    suitableFor: [
      "Weddings",
      "Engagements",
      "Receptions",
      "Anniversaries",
      "Special Events",
    ],
  },

  {
    id: "security",

    slug: "security",

    name: "Event Security",

    category: "security",

    categoryName: "Security",

    shortDescription:
      "Professional security support for a safe and organized event.",

    description:
      "Coordinate event security personnel and access management based on venue size, guest count and event requirements.",

    icon: "ShieldCheck",

    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",

    priceType: "Starting from",

    price: 12000,

    unit: "event",

    popular: false,

    features: [
      "Security personnel",
      "Entry management",
      "Crowd coordination",
      "VIP protection",
      "Access management",
    ],

    suitableFor: [
      "Large Events",
      "Corporate Events",
      "College Events",
      "Concerts",
      "Public Events",
    ],
  },

  {
    id: "wedding-planning",

    slug: "wedding-planning",

    name: "Wedding Planning",

    category: "wedding-planning",

    categoryName: "Wedding Planning",

    shortDescription:
      "End-to-end wedding planning from the first idea to the final celebration.",

    description:
      "Our wedding planning service brings together venue, décor, catering, photography, entertainment, guest coordination and event-day management into one coordinated experience.",

    icon: "Heart",

    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",

    priceType: "Starting from",

    price: 75000,

    unit: "event",

    popular: true,

    features: [
      "Complete wedding planning",
      "Vendor coordination",
      "Venue coordination",
      "Décor planning",
      "Guest management",
      "Timeline management",
      "Event-day coordination",
    ],

    suitableFor: [
      "Traditional Weddings",
      "Destination Weddings",
      "Modern Weddings",
      "Intimate Weddings",
      "Large Weddings",
    ],
  },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

export const getServiceById = (id) => {
  return services.find(
    (service) =>
      service.id === id ||
      service.slug === id
  );
};

export const getServicesByCategory = (
  category
) => {
  if (
    !category ||
    category === "all"
  ) {
    return services;
  }

  return services.filter(
    (service) =>
      service.category === category
  );
};

export const getPopularServices = () => {
  return services.filter(
    (service) => service.popular
  );
};

export const getServiceCategories = () => {
  return serviceCategories;
};

export default services;