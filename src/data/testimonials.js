/* =========================================================
   FUNCTION PLANNER
   TESTIMONIALS DATA
========================================================= */

/* =========================================================
   TESTIMONIALS
========================================================= */

export const testimonials = [
  {
    id: "testimonial-001",

    name: "Arun & Priya",

    role: "Wedding Couple",

    eventType: "Wedding",

    location: "Chennai, Tamil Nadu",

    image:
      "https://randomuser.me/api/portraits/men/32.jpg",

    rating: 5,

    title: "Everything was beautifully organized",

    review:
      "Eventara helped us organize our wedding from the venue and decoration to catering and guest coordination. Everything was handled smoothly and we could enjoy our special day without worrying about the arrangements.",

    eventDate: "2026-02-14",

    verified: true,

    featured: true,
  },

  {
    id: "testimonial-002",

    name: "Karthik R",

    role: "Corporate Event Organizer",

    eventType: "Corporate Event",

    location: "Coimbatore, Tamil Nadu",

    image:
      "https://randomuser.me/api/portraits/men/44.jpg",

    rating: 5,

    title: "Professional and well coordinated",

    review:
      "We used Eventara for our annual corporate gathering. The venue setup, audio equipment, catering and event coordination were handled professionally. The planning process was also very easy.",

    eventDate: "2026-01-28",

    verified: true,

    featured: true,
  },

  {
    id: "testimonial-003",

    name: "Meena S",

    role: "Birthday Celebration",

    eventType: "Birthday",

    location: "Madurai, Tamil Nadu",

    image:
      "https://randomuser.me/api/portraits/women/65.jpg",

    rating: 5,

    title: "A wonderful birthday celebration",

    review:
      "The decoration and entertainment made my daughter's birthday really special. We were able to choose the services we wanted and the team coordinated everything perfectly on the event day.",

    eventDate: "2026-03-09",

    verified: true,

    featured: true,
  },

  {
    id: "testimonial-004",

    name: "Vignesh & Divya",

    role: "Engagement Couple",

    eventType: "Engagement",

    location: "Chennai, Tamil Nadu",

    image:
      "https://randomuser.me/api/portraits/men/22.jpg",

    rating: 5,

    title: "Beautiful decoration and planning",

    review:
      "Our engagement setup looked exactly like we imagined. The decoration team listened to our ideas and created a beautiful stage and guest area. The whole experience was comfortable and organized.",

    eventDate: "2026-03-21",

    verified: true,

    featured: false,
  },

  {
    id: "testimonial-005",

    name: "Sanjay Kumar",

    role: "Business Owner",

    eventType: "Product Launch",

    location: "Bengaluru, Karnataka",

    image:
      "https://randomuser.me/api/portraits/men/55.jpg",

    rating: 4,

    title: "Smooth event management",

    review:
      "We needed a professional setup for our product launch and Eventara helped us coordinate the venue, stage, lighting, sound and guest management. The event went smoothly from start to finish.",

    eventDate: "2026-04-05",

    verified: true,

    featured: false,
  },

  {
    id: "testimonial-006",

    name: "Anitha R",

    role: "Family Event",

    eventType: "Baby Shower",

    location: "Coimbatore, Tamil Nadu",

    image:
      "https://randomuser.me/api/portraits/women/44.jpg",

    rating: 5,

    title: "Lovely experience for our family",

    review:
      "The baby shower decoration was beautiful and the team was very patient with all our requirements. They helped us plan the seating, food and decoration while keeping everything within our budget.",

    eventDate: "2026-04-19",

    verified: true,

    featured: false,
  },

  {
    id: "testimonial-007",

    name: "Rahul & Sneha",

    role: "Wedding Couple",

    eventType: "Wedding",

    location: "Salem, Tamil Nadu",

    image:
      "https://randomuser.me/api/portraits/men/12.jpg",

    rating: 5,

    title: "Planning became much easier",

    review:
      "Instead of coordinating with different vendors ourselves, we were able to organize most of our wedding requirements in one place. The planning checklist was especially useful for keeping track of everything.",

    eventDate: "2026-05-02",

    verified: true,

    featured: false,
  },

  {
    id: "testimonial-008",

    name: "Priyanka M",

    role: "Event Host",

    eventType: "Private Party",

    location: "Chennai, Tamil Nadu",

    image:
      "https://randomuser.me/api/portraits/women/22.jpg",

    rating: 4,

    title: "Great attention to detail",

    review:
      "The team helped us select the venue, music and decoration for a private celebration. They were responsive throughout the planning process and paid attention to the small details.",

    eventDate: "2026-05-17",

    verified: true,

    featured: false,
  },

  {
    id: "testimonial-009",

    name: "Suresh P",

    role: "Conference Organizer",

    eventType: "Conference",

    location: "Bengaluru, Karnataka",

    image:
      "https://randomuser.me/api/portraits/men/67.jpg",

    rating: 5,

    title: "Reliable corporate event support",

    review:
      "The conference venue, seating arrangement, presentation equipment and catering were all coordinated properly. Having one team manage the event requirements saved us a lot of time.",

    eventDate: "2026-06-06",

    verified: true,

    featured: false,
  },

  {
    id: "testimonial-010",

    name: "Harish & Kavya",

    role: "Anniversary Celebration",

    eventType: "Anniversary",

    location: "Coimbatore, Tamil Nadu",

    image:
      "https://randomuser.me/api/portraits/men/77.jpg",

    rating: 5,

    title: "A memorable anniversary",

    review:
      "We wanted a small but elegant anniversary celebration. Eventara helped us choose the venue and arrange the decoration, food and music. Everything came together beautifully.",

    eventDate: "2026-06-20",

    verified: true,

    featured: false,
  },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

/* Get testimonial by ID */

export const getTestimonialById = (
  id
) => {
  return testimonials.find(
    (testimonial) =>
      testimonial.id === id
  );
};

/* Get featured testimonials */

export const getFeaturedTestimonials =
  () => {
    return testimonials.filter(
      (testimonial) =>
        testimonial.featured
    );
  };

/* Get testimonials by event type */

export const getTestimonialsByEventType =
  (eventType) => {
    if (
      !eventType ||
      eventType === "all"
    ) {
      return testimonials;
    }

    return testimonials.filter(
      (testimonial) =>
        testimonial.eventType
          .toLowerCase() ===
        eventType.toLowerCase()
    );
  };

/* Get testimonials by minimum rating */

export const getTestimonialsByRating =
  (rating) => {
    const minimumRating =
      Number(rating) || 0;

    return testimonials.filter(
      (testimonial) =>
        testimonial.rating >=
        minimumRating
    );
  };

/* Get verified testimonials */

export const getVerifiedTestimonials =
  () => {
    return testimonials.filter(
      (testimonial) =>
        testimonial.verified
    );
  };

/* Get testimonials by location */

export const getTestimonialsByLocation =
  (location) => {
    if (
      !location ||
      location === "all"
    ) {
      return testimonials;
    }

    return testimonials.filter(
      (testimonial) =>
        testimonial.location
          .toLowerCase()
          .includes(
            location.toLowerCase()
          )
    );
  };

/* Search testimonials */

export const searchTestimonials = (
  searchTerm
) => {
  if (!searchTerm?.trim()) {
    return testimonials;
  }

  const query =
    searchTerm
      .toLowerCase()
      .trim();

  return testimonials.filter(
    (testimonial) =>
      testimonial.name
        .toLowerCase()
        .includes(query) ||
      testimonial.eventType
        .toLowerCase()
        .includes(query) ||
      testimonial.location
        .toLowerCase()
        .includes(query) ||
      testimonial.review
        .toLowerCase()
        .includes(query) ||
      testimonial.title
        .toLowerCase()
        .includes(query)
  );
};

/* Calculate average rating */

export const getAverageRating = () => {
  if (!testimonials.length) {
    return 0;
  }

  const total = testimonials.reduce(
    (sum, testimonial) =>
      sum + testimonial.rating,
    0
  );

  return Number(
    (total / testimonials.length).toFixed(
      1
    )
  );
};

/* Get total number of reviews */

export const getTestimonialCount = () => {
  return testimonials.length;
};

export default testimonials;