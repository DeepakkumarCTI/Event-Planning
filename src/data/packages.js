/* =========================================================
   FUNCTION PLANNER
   EVENT PACKAGES DATA
========================================================= */

/* =========================================================
   PACKAGE TYPES
========================================================= */

export const packageTypes = [
  {
    id: "wedding",
    name: "Wedding",
    description:
      "Complete planning packages for beautiful and memorable weddings.",
  },
  {
    id: "birthday",
    name: "Birthday",
    description:
      "Fun and personalized packages for birthday celebrations.",
  },
  {
    id: "engagement",
    name: "Engagement",
    description:
      "Elegant packages for engagement ceremonies and celebrations.",
  },
  {
    id: "corporate",
    name: "Corporate",
    description:
      "Professional packages for meetings, conferences and corporate events.",
  },
  {
    id: "private-party",
    name: "Private Party",
    description:
      "Flexible packages for private celebrations and social gatherings.",
  },
  {
    id: "baby-shower",
    name: "Baby Shower",
    description:
      "Beautiful packages designed for special baby shower celebrations.",
  },
];

/* =========================================================
   EVENT PACKAGES
========================================================= */

export const packages = [
  {
    id: "essential-celebration",

    slug: "essential-celebration",

    name: "Essential Celebration",

    shortDescription:
      "A simple and elegant package for intimate celebrations.",

    description:
      "Our Essential Celebration package covers the key elements needed to host a comfortable and memorable small event without unnecessary complexity.",

    type: "private-party",

    typeName: "Private Party",

    image:
      "https://images.unsplash.com/photo-1496843916299-590492c751f4?w=800&q=80",

    price: 75000,

    priceLabel: "Starting from ₹75,000",

    guestRange: {
      minimum: 30,
      maximum: 100,
    },

    duration: "4 Hours",

    popular: false,

    featured: false,

    suitableFor: [
      "Birthday Parties",
      "Private Parties",
      "Family Functions",
      "Small Celebrations",
    ],

    includedServices: [
      {
        name: "Basic Venue Setup",
        quantity: 1,
      },
      {
        name: "Standard Decoration",
        quantity: 1,
      },
      {
        name: "Catering",
        quantity: 100,
      },
      {
        name: "Basic Sound System",
        quantity: 1,
      },
      {
        name: "Event Coordination",
        quantity: 1,
      },
    ],

    features: [
      "Venue arrangement",
      "Basic event decoration",
      "Standard vegetarian catering",
      "Sound system",
      "Event coordinator",
      "Guest seating arrangement",
    ],

    exclusions: [
      "Photography",
      "Videography",
      "Premium entertainment",
      "Luxury decoration",
    ],
  },

  {
    id: "classic-celebration",

    slug: "classic-celebration",

    name: "Classic Celebration",

    shortDescription:
      "A balanced package combining venue, décor, catering and entertainment.",

    description:
      "A well-rounded event package designed for customers who want a complete celebration experience with essential event services included.",

    type: "private-party",

    typeName: "Private Party",

    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",

    price: 125000,

    priceLabel: "Starting from ₹1,25,000",

    guestRange: {
      minimum: 80,
      maximum: 250,
    },

    duration: "5 Hours",

    popular: true,

    featured: true,

    suitableFor: [
      "Birthdays",
      "Engagements",
      "Anniversaries",
      "Private Parties",
      "Family Functions",
    ],

    includedServices: [
      {
        name: "Premium Venue",
        quantity: 1,
      },
      {
        name: "Theme Decoration",
        quantity: 1,
      },
      {
        name: "Catering",
        quantity: 250,
      },
      {
        name: "Photography",
        quantity: 1,
      },
      {
        name: "DJ & Music",
        quantity: 1,
      },
      {
        name: "Event Coordinator",
        quantity: 1,
      },
    ],

    features: [
      "Premium venue arrangement",
      "Theme-based decoration",
      "Multi-menu catering",
      "Professional photography",
      "DJ and music setup",
      "Guest management",
      "Event coordination",
    ],

    exclusions: [
      "Luxury floral decoration",
      "Drone photography",
      "Celebrity entertainment",
    ],
  },

  {
    id: "grand-wedding",

    slug: "grand-wedding",

    name: "Grand Wedding",

    shortDescription:
      "A complete wedding planning package for a grand celebration.",

    description:
      "A comprehensive wedding package covering venue, decoration, catering, photography, entertainment and guest coordination.",

    type: "wedding",

    typeName: "Wedding",

    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",

    price: 350000,

    priceLabel: "Starting from ₹3,50,000",

    guestRange: {
      minimum: 150,
      maximum: 600,
    },

    duration: "8 Hours",

    popular: true,

    featured: true,

    suitableFor: [
      "Weddings",
      "Wedding Receptions",
      "Traditional Weddings",
      "Destination Weddings",
    ],

    includedServices: [
      {
        name: "Premium Wedding Venue",
        quantity: 1,
      },
      {
        name: "Luxury Decoration",
        quantity: 1,
      },
      {
        name: "Wedding Catering",
        quantity: 600,
      },
      {
        name: "Photography",
        quantity: 1,
      },
      {
        name: "Videography",
        quantity: 1,
      },
      {
        name: "DJ & Music",
        quantity: 1,
      },
      {
        name: "Stage Setup",
        quantity: 1,
      },
      {
        name: "Lighting",
        quantity: 1,
      },
      {
        name: "Guest Management",
        quantity: 1,
      },
      {
        name: "Wedding Planner",
        quantity: 1,
      },
    ],

    features: [
      "Premium wedding venue",
      "Luxury theme decoration",
      "Complete catering service",
      "Professional photography",
      "Cinematic videography",
      "DJ and entertainment",
      "Premium stage setup",
      "Decorative lighting",
      "Guest coordination",
      "Dedicated wedding planner",
    ],

    exclusions: [
      "Accommodation",
      "Bridal makeup",
      "Transportation",
      "Custom celebrity entertainment",
    ],
  },

  {
    id: "royal-wedding",

    slug: "royal-wedding",

    name: "Royal Wedding Experience",

    shortDescription:
      "A premium end-to-end wedding experience with personalized planning.",

    description:
      "Our premium wedding experience is designed for customers looking for highly personalized event planning, luxury décor and comprehensive guest services.",

    type: "wedding",

    typeName: "Wedding",

    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",

    price: 650000,

    priceLabel: "Starting from ₹6,50,000",

    guestRange: {
      minimum: 250,
      maximum: 1000,
    },

    duration: "Full Day",

    popular: true,

    featured: true,

    suitableFor: [
      "Luxury Weddings",
      "Large Weddings",
      "Destination Weddings",
      "Premium Receptions",
    ],

    includedServices: [
      {
        name: "Luxury Venue",
        quantity: 1,
      },
      {
        name: "Premium Decoration",
        quantity: 1,
      },
      {
        name: "Floral Decoration",
        quantity: 1,
      },
      {
        name: "Premium Catering",
        quantity: 1000,
      },
      {
        name: "Photography",
        quantity: 1,
      },
      {
        name: "Cinematic Videography",
        quantity: 1,
      },
      {
        name: "DJ & Live Music",
        quantity: 1,
      },
      {
        name: "Premium Stage",
        quantity: 1,
      },
      {
        name: "Professional Lighting",
        quantity: 1,
      },
      {
        name: "Guest Management",
        quantity: 1,
      },
      {
        name: "Transportation Coordination",
        quantity: 1,
      },
      {
        name: "Dedicated Event Manager",
        quantity: 1,
      },
    ],

    features: [
      "Luxury venue",
      "Personalized wedding concept",
      "Premium floral décor",
      "Large-scale catering",
      "Professional photography team",
      "Cinematic videography",
      "Live music and DJ",
      "Premium stage production",
      "Advanced lighting",
      "Guest transportation coordination",
      "Dedicated event management team",
    ],

    exclusions: [
      "Accommodation charges",
      "Individual guest travel",
      "Personal shopping",
    ],
  },

  {
    id: "birthday-fun",

    slug: "birthday-fun",

    name: "Birthday Fun",

    shortDescription:
      "A colorful birthday package packed with décor, music and entertainment.",

    description:
      "A fun and energetic birthday package created for children, teenagers and adults looking for a memorable celebration.",

    type: "birthday",

    typeName: "Birthday",

    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",

    price: 60000,

    priceLabel: "Starting from ₹60,000",

    guestRange: {
      minimum: 20,
      maximum: 120,
    },

    duration: "4 Hours",

    popular: true,

    featured: false,

    suitableFor: [
      "Kids Birthdays",
      "Teen Birthdays",
      "Adult Birthdays",
      "Family Parties",
    ],

    includedServices: [
      {
        name: "Party Venue",
        quantity: 1,
      },
      {
        name: "Birthday Decoration",
        quantity: 1,
      },
      {
        name: "Birthday Cake",
        quantity: 1,
      },
      {
        name: "Catering",
        quantity: 120,
      },
      {
        name: "Music System",
        quantity: 1,
      },
      {
        name: "Games & Entertainment",
        quantity: 1,
      },
    ],

    features: [
      "Theme birthday decoration",
      "Birthday cake",
      "Food and refreshments",
      "Music system",
      "Party games",
      "Entertainment coordination",
      "Guest seating",
    ],

    exclusions: [
      "Professional photography",
      "Premium entertainment",
      "Venue accommodation",
    ],
  },

  {
    id: "engagement-elegance",

    slug: "engagement-elegance",

    name: "Engagement Elegance",

    shortDescription:
      "An elegant engagement package with beautiful décor and complete coordination.",

    description:
      "A sophisticated engagement package designed around elegant décor, comfortable guest arrangements and professional event coordination.",

    type: "engagement",

    typeName: "Engagement",

    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",

    price: 145000,

    priceLabel: "Starting from ₹1,45,000",

    guestRange: {
      minimum: 50,
      maximum: 250,
    },

    duration: "5 Hours",

    popular: true,

    featured: false,

    suitableFor: [
      "Engagement Ceremonies",
      "Ring Ceremonies",
      "Family Celebrations",
    ],

    includedServices: [
      {
        name: "Venue",
        quantity: 1,
      },
      {
        name: "Engagement Decoration",
        quantity: 1,
      },
      {
        name: "Stage Setup",
        quantity: 1,
      },
      {
        name: "Catering",
        quantity: 250,
      },
      {
        name: "Photography",
        quantity: 1,
      },
      {
        name: "Sound System",
        quantity: 1,
      },
      {
        name: "Event Coordinator",
        quantity: 1,
      },
    ],

    features: [
      "Elegant engagement décor",
      "Premium stage",
      "Guest catering",
      "Photography",
      "Sound system",
      "Event coordination",
    ],

    exclusions: [
      "Videography",
      "Transportation",
      "Accommodation",
    ],
  },

  {
    id: "corporate-connect",

    slug: "corporate-connect",

    name: "Corporate Connect",

    shortDescription:
      "A professional package for corporate meetings, seminars and networking events.",

    description:
      "A business-focused event package covering venue setup, audio-visual equipment, catering and professional event coordination.",

    type: "corporate",

    typeName: "Corporate",

    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",

    price: 110000,

    priceLabel: "Starting from ₹1,10,000",

    guestRange: {
      minimum: 50,
      maximum: 300,
    },

    duration: "6 Hours",

    popular: false,

    featured: true,

    suitableFor: [
      "Corporate Meetings",
      "Seminars",
      "Conferences",
      "Networking Events",
      "Workshops",
    ],

    includedServices: [
      {
        name: "Conference Venue",
        quantity: 1,
      },
      {
        name: "Audio Visual Setup",
        quantity: 1,
      },
      {
        name: "Projector & Screen",
        quantity: 1,
      },
      {
        name: "Corporate Catering",
        quantity: 300,
      },
      {
        name: "Wi-Fi",
        quantity: 1,
      },
      {
        name: "Event Coordinator",
        quantity: 1,
      },
    ],

    features: [
      "Professional conference venue",
      "Projector and screen",
      "Audio system",
      "High-speed Wi-Fi",
      "Corporate catering",
      "Registration support",
      "Event coordination",
    ],

    exclusions: [
      "Accommodation",
      "Travel arrangements",
      "Custom branding production",
    ],
  },

  {
    id: "baby-blossom",

    slug: "baby-blossom",

    name: "Baby Blossom",

    shortDescription:
      "A warm and beautiful baby shower package with personalized décor.",

    description:
      "A charming baby shower package featuring soft-themed decoration, catering and event coordination for a memorable family celebration.",

    type: "baby-shower",

    typeName: "Baby Shower",

    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",

    price: 85000,

    priceLabel: "Starting from ₹85,000",

    guestRange: {
      minimum: 30,
      maximum: 150,
    },

    duration: "4 Hours",

    popular: false,

    featured: false,

    suitableFor: [
      "Baby Showers",
      "Seemantham",
      "Family Celebrations",
    ],

    includedServices: [
      {
        name: "Venue",
        quantity: 1,
      },
      {
        name: "Baby Shower Decoration",
        quantity: 1,
      },
      {
        name: "Stage Setup",
        quantity: 1,
      },
      {
        name: "Catering",
        quantity: 150,
      },
      {
        name: "Sound System",
        quantity: 1,
      },
      {
        name: "Event Coordinator",
        quantity: 1,
      },
    ],

    features: [
      "Personalized baby shower décor",
      "Decorative stage",
      "Catering",
      "Music system",
      "Guest seating",
      "Event coordination",
    ],

    exclusions: [
      "Photography",
      "Videography",
      "Transportation",
    ],
  },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

/* Get package by ID or slug */

export const getPackageById = (id) => {
  return packages.find(
    (item) =>
      item.id === id ||
      item.slug === id
  );
};

/* Get packages by type */

export const getPackagesByType = (
  type
) => {
  if (!type || type === "all") {
    return packages;
  }

  return packages.filter(
    (item) =>
      item.type === type
  );
};

/* Get featured packages */

export const getFeaturedPackages = () => {
  return packages.filter(
    (item) => item.featured
  );
};

/* Get popular packages */

export const getPopularPackages = () => {
  return packages.filter(
    (item) => item.popular
  );
};

/* Get packages within a customer's budget */

export const getPackagesByBudget = (
  budget
) => {
  const amount = Number(budget) || 0;

  return packages.filter(
    (item) =>
      item.price <= amount
  );
};

/* Get packages suitable for guest count */

export const getPackagesByGuestCount = (
  guestCount
) => {
  const count =
    Number(guestCount) || 0;

  return packages.filter(
    (item) =>
      count >= item.guestRange.minimum &&
      count <= item.guestRange.maximum
  );
};

/* Search packages */

export const searchPackages = (
  searchTerm
) => {
  if (!searchTerm?.trim()) {
    return packages;
  }

  const query =
    searchTerm
      .toLowerCase()
      .trim();

  return packages.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(query) ||
      item.typeName
        .toLowerCase()
        .includes(query) ||
      item.shortDescription
        .toLowerCase()
        .includes(query) ||
      item.features.some((feature) =>
        feature
          .toLowerCase()
          .includes(query)
      )
  );
};

/* Get package types */

export const getPackageTypes = () => {
  return packageTypes;
};

export default packages;