/* =========================================================
   FUNCTION PLANNER
   VENUES DATA
========================================================= */

/* =========================================================
   VENUE TYPES
========================================================= */

export const venueTypes = [
  {
    id: "banquet-hall",
    name: "Banquet Hall",
    description:
      "Elegant indoor spaces suitable for weddings, receptions and celebrations.",
    icon: "Building2",
  },
  {
    id: "hotel",
    name: "Hotel",
    description:
      "Premium hotel venues with accommodation and event facilities.",
    icon: "Hotel",
  },
  {
    id: "outdoor",
    name: "Outdoor Venue",
    description:
      "Open-air venues for memorable outdoor celebrations.",
    icon: "Trees",
  },
  {
    id: "rooftop",
    name: "Rooftop",
    description:
      "Stylish rooftop spaces for private parties and social events.",
    icon: "Building",
  },
  {
    id: "conference",
    name: "Conference Centre",
    description:
      "Professional spaces designed for meetings and conferences.",
    icon: "Presentation",
  },
  {
    id: "resort",
    name: "Resort",
    description:
      "Relaxed resort environments for celebrations and destination events.",
    icon: "Palmtree",
  },
  {
    id: "community-hall",
    name: "Community Hall",
    description:
      "Practical and spacious venues for local gatherings and functions.",
    icon: "Users",
  },
];

/* =========================================================
   VENUES
========================================================= */

export const venues = [
  {
    id: "grand-heritage-hall",

    slug: "grand-heritage-hall",

    name: "Grand Heritage Hall",

    type: "banquet-hall",

    typeName: "Banquet Hall",

    description:
      "A spacious and elegant banquet hall designed for weddings, receptions, family celebrations and large social gatherings.",

    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
    ],

    location: {
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      area: "Anna Nagar",
      address:
        "Anna Nagar, Chennai, Tamil Nadu",
    },

    capacity: {
      minimum: 100,
      maximum: 800,
    },

    pricing: {
      startingFrom: 85000,
      priceType: "per event",
    },

    rating: 4.8,

    reviews: 124,

    featured: true,

    popular: true,

    availability: "Available",

    amenities: [
      "Air Conditioning",
      "Parking",
      "Stage",
      "Dining Area",
      "Green Room",
      "Power Backup",
      "Restrooms",
      "Wi-Fi",
    ],

    suitableFor: [
      "Weddings",
      "Receptions",
      "Engagements",
      "Anniversaries",
      "Corporate Events",
    ],

    highlights: [
      "Large seating capacity",
      "Premium interior",
      "Dedicated stage",
      "Ample parking",
    ],
  },

  {
    id: "royal-palm-resort",

    slug: "royal-palm-resort",

    name: "Royal Palm Resort",

    type: "resort",

    typeName: "Resort",

    description:
      "A premium resort venue surrounded by greenery, ideal for weddings, destination celebrations and private gatherings.",

    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],

    location: {
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      area: "Avinashi Road",
      address:
        "Avinashi Road, Coimbatore, Tamil Nadu",
    },

    capacity: {
      minimum: 80,
      maximum: 600,
    },

    pricing: {
      startingFrom: 120000,
      priceType: "per event",
    },

    rating: 4.9,

    reviews: 98,

    featured: true,

    popular: true,

    availability: "Available",

    amenities: [
      "Outdoor Lawn",
      "Swimming Pool",
      "Parking",
      "Guest Rooms",
      "Catering Kitchen",
      "Power Backup",
      "Wi-Fi",
      "Air Conditioning",
    ],

    suitableFor: [
      "Weddings",
      "Engagements",
      "Private Parties",
      "Anniversaries",
      "Destination Events",
    ],

    highlights: [
      "Beautiful outdoor spaces",
      "Accommodation available",
      "Premium resort facilities",
      "Multiple event areas",
    ],
  },

  {
    id: "skyline-rooftop",

    slug: "skyline-rooftop",

    name: "Skyline Rooftop",

    type: "rooftop",

    typeName: "Rooftop",

    description:
      "A contemporary rooftop venue offering city views and an intimate atmosphere for private celebrations and social events.",

    image:
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
    ],

    location: {
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      area: "T Nagar",
      address:
        "T Nagar, Chennai, Tamil Nadu",
    },

    capacity: {
      minimum: 30,
      maximum: 180,
    },

    pricing: {
      startingFrom: 45000,
      priceType: "per event",
    },

    rating: 4.7,

    reviews: 76,

    featured: true,

    popular: true,

    availability: "Available",

    amenities: [
      "City View",
      "Outdoor Seating",
      "Lighting",
      "Sound System",
      "Parking",
      "Restrooms",
      "Catering",
    ],

    suitableFor: [
      "Private Parties",
      "Birthdays",
      "Engagements",
      "Corporate Events",
      "Anniversaries",
    ],

    highlights: [
      "Beautiful city views",
      "Modern ambience",
      "Perfect for intimate events",
      "Flexible décor options",
    ],
  },

  {
    id: "emerald-garden",

    slug: "emerald-garden",

    name: "Emerald Garden",

    type: "outdoor",

    typeName: "Outdoor Venue",

    description:
      "A spacious landscaped outdoor venue for large celebrations, cultural events and memorable evening functions.",

    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    ],

    location: {
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      area: "Race Course",
      address:
        "Race Course, Coimbatore, Tamil Nadu",
    },

    capacity: {
      minimum: 100,
      maximum: 1200,
    },

    pricing: {
      startingFrom: 95000,
      priceType: "per event",
    },

    rating: 4.8,

    reviews: 89,

    featured: true,

    popular: false,

    availability: "Available",

    amenities: [
      "Large Lawn",
      "Stage Area",
      "Parking",
      "Power Backup",
      "Restrooms",
      "Lighting Setup",
      "Catering Area",
    ],

    suitableFor: [
      "Weddings",
      "College Events",
      "Cultural Events",
      "Corporate Events",
      "Large Parties",
    ],

    highlights: [
      "Large event capacity",
      "Beautiful landscaped area",
      "Flexible event layout",
      "Suitable for large gatherings",
    ],
  },

  {
    id: "business-conference-centre",

    slug: "business-conference-centre",

    name: "Business Conference Centre",

    type: "conference",

    typeName: "Conference Centre",

    description:
      "A professional conference facility with meeting rooms, presentation equipment and dedicated corporate event support.",

    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    ],

    location: {
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      area: "Guindy",
      address:
        "Guindy, Chennai, Tamil Nadu",
    },

    capacity: {
      minimum: 50,
      maximum: 700,
    },

    pricing: {
      startingFrom: 70000,
      priceType: "per event",
    },

    rating: 4.6,

    reviews: 65,

    featured: false,

    popular: true,

    availability: "Available",

    amenities: [
      "Projector",
      "LED Screen",
      "Audio System",
      "Wi-Fi",
      "Air Conditioning",
      "Parking",
      "Meeting Rooms",
      "Catering",
    ],

    suitableFor: [
      "Conferences",
      "Corporate Events",
      "Seminars",
      "Product Launches",
      "Meetings",
    ],

    highlights: [
      "Professional environment",
      "Modern AV equipment",
      "Multiple meeting spaces",
      "Corporate support",
    ],
  },

  {
    id: "lakeview-banquet",

    slug: "lakeview-banquet",

    name: "Lakeview Banquet",

    type: "banquet-hall",

    typeName: "Banquet Hall",

    description:
      "An elegant banquet space offering a refined atmosphere for weddings, receptions and family celebrations.",

    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
      "https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=800&q=80",
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80",
    ],

    location: {
      city: "Madurai",
      state: "Tamil Nadu",
      country: "India",
      area: "KK Nagar",
      address:
        "KK Nagar, Madurai, Tamil Nadu",
    },

    capacity: {
      minimum: 80,
      maximum: 500,
    },

    pricing: {
      startingFrom: 65000,
      priceType: "per event",
    },

    rating: 4.7,

    reviews: 71,

    featured: false,

    popular: false,

    availability: "Available",

    amenities: [
      "Air Conditioning",
      "Parking",
      "Stage",
      "Dining Area",
      "Bridal Room",
      "Power Backup",
      "Restrooms",
    ],

    suitableFor: [
      "Weddings",
      "Receptions",
      "Engagements",
      "Birthdays",
      "Anniversaries",
    ],

    highlights: [
      "Elegant interiors",
      "Comfortable seating",
      "Dedicated event spaces",
      "Convenient location",
    ],
  },

  {
    id: "green-meadows-community-hall",

    slug: "green-meadows-community-hall",

    name: "Green Meadows Community Hall",

    type: "community-hall",

    typeName: "Community Hall",

    description:
      "A practical and spacious community venue suitable for family functions, cultural programs and local gatherings.",

    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
    ],

    location: {
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      area: "Gandhipuram",
      address:
        "Gandhipuram, Coimbatore, Tamil Nadu",
    },

    capacity: {
      minimum: 50,
      maximum: 400,
    },

    pricing: {
      startingFrom: 35000,
      priceType: "per event",
    },

    rating: 4.5,

    reviews: 54,

    featured: false,

    popular: false,

    availability: "Available",

    amenities: [
      "Parking",
      "Dining Area",
      "Stage",
      "Kitchen",
      "Restrooms",
      "Power Backup",
    ],

    suitableFor: [
      "Birthdays",
      "Family Functions",
      "Cultural Events",
      "Community Events",
      "Private Parties",
    ],

    highlights: [
      "Affordable venue",
      "Flexible layout",
      "Convenient access",
      "Suitable for family events",
    ],
  },

  {
    id: "grand-oak-hotel",

    slug: "grand-oak-hotel",

    name: "Grand Oak Hotel",

    type: "hotel",

    typeName: "Hotel",

    description:
      "A premium hotel venue offering elegant event halls, accommodation and professional hospitality services.",

    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],

    location: {
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      area: "Whitefield",
      address:
        "Whitefield, Bengaluru, Karnataka",
    },

    capacity: {
      minimum: 100,
      maximum: 900,
    },

    pricing: {
      startingFrom: 150000,
      priceType: "per event",
    },

    rating: 4.9,

    reviews: 142,

    featured: true,

    popular: true,

    availability: "Available",

    amenities: [
      "Guest Rooms",
      "Restaurant",
      "Air Conditioning",
      "Parking",
      "Conference Rooms",
      "Stage",
      "Wi-Fi",
      "Power Backup",
    ],

    suitableFor: [
      "Weddings",
      "Corporate Events",
      "Conferences",
      "Receptions",
      "Product Launches",
    ],

    highlights: [
      "Premium hospitality",
      "Accommodation",
      "Multiple event halls",
      "Professional event support",
    ],
  },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

/* Get venue by ID or slug */

export const getVenueById = (id) => {
  return venues.find(
    (venue) =>
      venue.id === id ||
      venue.slug === id
  );
};

/* Get venues by type */

export const getVenuesByType = (
  type
) => {
  if (!type || type === "all") {
    return venues;
  }

  return venues.filter(
    (venue) =>
      venue.type === type
  );
};

/* Get venues by city */

export const getVenuesByCity = (
  city
) => {
  if (!city || city === "all") {
    return venues;
  }

  return venues.filter(
    (venue) =>
      venue.location.city
        .toLowerCase() ===
      city.toLowerCase()
  );
};

/* Get venues by minimum capacity */

export const getVenuesByCapacity = (
  guestCount
) => {
  const count =
    Number(guestCount) || 0;

  return venues.filter(
    (venue) =>
      venue.capacity.maximum >= count
  );
};

/* Get available venues */

export const getAvailableVenues = () => {
  return venues.filter(
    (venue) =>
      venue.availability ===
      "Available"
  );
};

/* Get featured venues */

export const getFeaturedVenues = () => {
  return venues.filter(
    (venue) => venue.featured
  );
};

/* Get popular venues */

export const getPopularVenues = () => {
  return venues.filter(
    (venue) => venue.popular
  );
};

/* Get venue types */

export const getVenueTypes = () => {
  return venueTypes;
};

/* Search venues */

export const searchVenues = (
  searchTerm
) => {
  if (!searchTerm?.trim()) {
    return venues;
  }

  const query =
    searchTerm
      .toLowerCase()
      .trim();

  return venues.filter(
    (venue) =>
      venue.name
        .toLowerCase()
        .includes(query) ||
      venue.typeName
        .toLowerCase()
        .includes(query) ||
      venue.location.city
        .toLowerCase()
        .includes(query) ||
      venue.location.area
        .toLowerCase()
        .includes(query)
  );
};

export default venues;