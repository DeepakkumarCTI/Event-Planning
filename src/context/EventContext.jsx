import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const EventContext = createContext(null);

const EVENTS_KEY = "functionPlannerEvents";

/* =========================================================
   EVENT CATEGORIES
========================================================= */

export const EVENT_CATEGORIES = [
  {
    id: "wedding",
    name: "Wedding",
    description: "Plan your perfect wedding celebration.",
    icon: "Heart",
  },
  {
    id: "birthday",
    name: "Birthday",
    description: "Make every birthday memorable.",
    icon: "Gift",
  },
  {
    id: "engagement",
    name: "Engagement",
    description: "Celebrate your special beginning.",
    icon: "Gem",
  },
  {
    id: "corporate",
    name: "Corporate Event",
    description: "Professional events for your organization.",
    icon: "Building2",
  },
  {
    id: "conference",
    name: "Conference",
    description: "Organize conferences and business gatherings.",
    icon: "Briefcase",
  },
  {
    id: "product-launch",
    name: "Product Launch",
    description: "Create an impressive product launch.",
    icon: "Flame",
  },
  {
    id: "baby-shower",
    name: "Baby Shower",
    description: "Celebrate the arrival of a little one.",
    icon: "Baby",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    description: "Celebrate years of beautiful memories.",
    icon: "Award",
  },
  {
    id: "reception",
    name: "Reception",
    description: "Plan an elegant reception.",
    icon: "Music",
  },
  {
    id: "college",
    name: "College Event",
    description: "Manage college and campus events.",
    icon: "GraduationCap",
  },
  {
    id: "cultural",
    name: "Cultural Event",
    description: "Celebrate culture, traditions and arts.",
    icon: "Sparkles",
  },
  {
    id: "private-party",
    name: "Private Party",
    description: "Plan an unforgettable private gathering.",
    icon: "Users",
  },
  {
    id: "festival",
    name: "Festival Event",
    description: "Organize festivals and public celebrations.",
    icon: "Sparkles",
  },
];

/* =========================================================
   DEFAULT CHECKLIST
========================================================= */

const DEFAULT_CHECKLIST = [
  {
    id: "venue",
    title: "Select a venue",
    completed: false,
  },
  {
    id: "guest-list",
    title: "Prepare guest list",
    completed: false,
  },
  {
    id: "decoration",
    title: "Plan decoration",
    completed: false,
  },
  {
    id: "catering",
    title: "Confirm catering",
    completed: false,
  },
  {
    id: "photography",
    title: "Book photography",
    completed: false,
  },
  {
    id: "entertainment",
    title: "Arrange entertainment",
    completed: false,
  },
  {
    id: "invitations",
    title: "Send invitations",
    completed: false,
  },
  {
    id: "final-check",
    title: "Final event check",
    completed: false,
  },
];

/* =========================================================
   HELPERS
========================================================= */

const generateId = () => {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  return `event-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

const getStoredEvents = () => {
  const storedEvents = localStorage.getItem(EVENTS_KEY);

  if (!storedEvents) {
    return [];
  }

  try {
    const parsedEvents = JSON.parse(storedEvents);

    return Array.isArray(parsedEvents)
      ? parsedEvents
      : [];
  } catch (error) {
    console.error(
      "Invalid stored event data:",
      error
    );

    localStorage.removeItem(EVENTS_KEY);

    return [];
  }
};

/* =========================================================
   EVENT PROVIDER
========================================================= */

export const EventProvider = ({ children }) => {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD EVENTS
  ======================================================== */

  useEffect(() => {
    const loadEvents = () => {
      try {
        const storedEvents = getStoredEvents();

        setEvents(storedEvents);

        if (storedEvents.length > 0) {
          setCurrentEvent(storedEvents[0]);
        }
      } catch (error) {
        console.error(
          "Failed to load events:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  /* =======================================================
     SAVE EVENTS
  ======================================================== */

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        EVENTS_KEY,
        JSON.stringify(events)
      );
    }
  }, [events, loading]);

  /* =======================================================
     CREATE EVENT
  ======================================================== */

  const createEvent = (eventData = {}) => {
    const category = EVENT_CATEGORIES.find(
      (item) =>
        item.id === eventData.category ||
        item.name === eventData.category
    );

    const newEvent = {
      id: generateId(),

      userId: user?.id || user?._id || null,

      name:
        eventData.name ||
        eventData.eventName ||
        "Untitled Event",

      category:
        eventData.category ||
        "private-party",

      categoryName:
        category?.name ||
        eventData.categoryName ||
        "Private Party",

      description:
        eventData.description || "",

      date:
        eventData.date || "",

      startTime:
        eventData.startTime || "",

      endTime:
        eventData.endTime || "",

      venue:
        eventData.venue || null,

      location:
        eventData.location || "",

      guestCount:
        Number(eventData.guestCount) || 0,

      budget:
        Number(eventData.budget) || 0,

      selectedServices:
        Array.isArray(eventData.selectedServices)
          ? eventData.selectedServices
          : [],

      checklist:
        Array.isArray(eventData.checklist)
          ? eventData.checklist
          : DEFAULT_CHECKLIST.map((item) => ({
              ...item,
            })),

      status:
        eventData.status || "Planning",

      progress:
        Number(eventData.progress) || 0,

      notes:
        eventData.notes || "",

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    setEvents((previousEvents) => [
      newEvent,
      ...previousEvents,
    ]);

    setCurrentEvent(newEvent);

    return newEvent;
  };

  /* =======================================================
     UPDATE EVENT
  ======================================================== */

  const updateEvent = (eventId, updates = {}) => {
    let updatedEvent = null;

    setEvents((previousEvents) =>
      previousEvents.map((event) => {
        if (event.id !== eventId) {
          return event;
        }

        updatedEvent = {
          ...event,
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        return updatedEvent;
      })
    );

    if (currentEvent?.id === eventId) {
      setCurrentEvent((previousEvent) => ({
        ...previousEvent,
        ...updates,
        updatedAt: new Date().toISOString(),
      }));
    }

    return updatedEvent;
  };

  /* =======================================================
     DELETE EVENT
  ======================================================== */

  const deleteEvent = (eventId) => {
    setEvents((previousEvents) => {
      const remainingEvents = previousEvents.filter(
        (event) => event.id !== eventId
      );

      if (currentEvent?.id === eventId) {
        setCurrentEvent(
          remainingEvents.length > 0
            ? remainingEvents[0]
            : null
        );
      }

      return remainingEvents;
    });
  };

  /* =======================================================
     GET EVENT BY ID
  ======================================================== */

  const getEventById = (eventId) => {
    return events.find(
      (event) => event.id === eventId
    );
  };

  /* =======================================================
     SELECT EVENT
  ======================================================== */

  const selectEvent = (eventId) => {
    const event = getEventById(eventId);

    if (event) {
      setCurrentEvent(event);
    }

    return event || null;
  };

  /* =======================================================
     CLEAR CURRENT EVENT
  ======================================================== */

  const clearCurrentEvent = () => {
    setCurrentEvent(null);
  };

  /* =======================================================
     UPDATE CHECKLIST ITEM
  ======================================================== */

  const toggleChecklistItem = (
    eventId,
    checklistItemId
  ) => {
    const event = getEventById(eventId);

    if (!event) return;

    const updatedChecklist =
      event.checklist.map((item) =>
        item.id === checklistItemId
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      );

    const completedCount =
      updatedChecklist.filter(
        (item) => item.completed
      ).length;

    const progress =
      updatedChecklist.length > 0
        ? Math.round(
            (completedCount /
              updatedChecklist.length) *
              100
          )
        : 0;

    updateEvent(eventId, {
      checklist: updatedChecklist,
      progress,
    });
  };

  /* =======================================================
     ADD CUSTOM CHECKLIST ITEM
  ======================================================== */

  const addChecklistItem = (
    eventId,
    title
  ) => {
    if (!title?.trim()) return;

    const event = getEventById(eventId);

    if (!event) return;

    const newItem = {
      id: generateId(),
      title: title.trim(),
      completed: false,
    };

    updateEvent(eventId, {
      checklist: [
        ...(event.checklist || []),
        newItem,
      ],
    });

    return newItem;
  };

  /* =======================================================
     REMOVE CHECKLIST ITEM
  ======================================================== */

  const removeChecklistItem = (
    eventId,
    checklistItemId
  ) => {
    const event = getEventById(eventId);

    if (!event) return;

    const updatedChecklist =
      event.checklist.filter(
        (item) => item.id !== checklistItemId
      );

    updateEvent(eventId, {
      checklist: updatedChecklist,
    });
  };

  /* =======================================================
     ADD SERVICE TO EVENT
  ======================================================== */

  const addServiceToEvent = (
    eventId,
    service
  ) => {
    const event = getEventById(eventId);

    if (!event || !service) return;

    const existingServices =
      event.selectedServices || [];

    const serviceId =
      service.id || service._id;

    const alreadyAdded =
      existingServices.some(
        (item) =>
          (item.id || item._id) === serviceId
      );

    if (alreadyAdded) {
      return;
    }

    updateEvent(eventId, {
      selectedServices: [
        ...existingServices,
        service,
      ],
    });
  };

  /* =======================================================
     REMOVE SERVICE FROM EVENT
  ======================================================== */

  const removeServiceFromEvent = (
    eventId,
    serviceId
  ) => {
    const event = getEventById(eventId);

    if (!event) return;

    const updatedServices = (
      event.selectedServices || []
    ).filter(
      (service) =>
        (service.id || service._id) !== serviceId
    );

    updateEvent(eventId, {
      selectedServices: updatedServices,
    });
  };

  /* =======================================================
     UPDATE EVENT PROGRESS
  ======================================================== */

  const updateEventProgress = (
    eventId,
    progress
  ) => {
    const safeProgress = Math.min(
      100,
      Math.max(0, Number(progress) || 0)
    );

    updateEvent(eventId, {
      progress: safeProgress,
    });
  };

  /* =======================================================
     EVENT STATUS
  ======================================================== */

  const updateEventStatus = (
    eventId,
    status
  ) => {
    updateEvent(eventId, {
      status,
    });
  };

  /* =======================================================
     USER EVENTS
  ======================================================== */

  const userEvents = useMemo(() => {
    if (!user) {
      return [];
    }

    const userId =
      user.id || user._id;

    if (!userId) {
      return events;
    }

    return events.filter(
      (event) =>
        !event.userId ||
        event.userId === userId
    );
  }, [events, user]);

  /* =======================================================
     EVENT STATISTICS
  ======================================================== */

  const eventStats = useMemo(() => {
    const total = userEvents.length;

    const planning = userEvents.filter(
      (event) =>
        event.status?.toLowerCase() ===
        "planning"
    ).length;

    const confirmed = userEvents.filter(
      (event) =>
        event.status?.toLowerCase() ===
        "confirmed"
    ).length;

    const completed = userEvents.filter(
      (event) =>
        event.status?.toLowerCase() ===
        "completed"
    ).length;

    const cancelled = userEvents.filter(
      (event) =>
        event.status?.toLowerCase() ===
        "cancelled"
    ).length;

    const totalGuests = userEvents.reduce(
      (totalGuests, event) =>
        totalGuests +
        Number(event.guestCount || 0),
      0
    );

    const totalBudget = userEvents.reduce(
      (totalBudget, event) =>
        totalBudget +
        Number(event.budget || 0),
      0
    );

    return {
      total,
      planning,
      confirmed,
      completed,
      cancelled,
      totalGuests,
      totalBudget,
    };
  }, [userEvents]);

  /* =======================================================
     CONTEXT VALUE
  ======================================================== */

  const value = useMemo(
    () => ({
      /* Data */
      events: userEvents,
      allEvents: events,
      currentEvent,
      loading,

      /* Categories */
      eventCategories: EVENT_CATEGORIES,

      /* Event actions */
      createEvent,
      updateEvent,
      deleteEvent,
      getEventById,
      selectEvent,
      clearCurrentEvent,

      /* Checklist */
      toggleChecklistItem,
      addChecklistItem,
      removeChecklistItem,

      /* Services */
      addServiceToEvent,
      removeServiceFromEvent,

      /* Progress / status */
      updateEventProgress,
      updateEventStatus,

      /* Statistics */
      eventStats,
    }),
    [
      userEvents,
      events,
      currentEvent,
      loading,
      eventStats,
    ]
  );

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

/* =========================================================
   USE EVENT HOOK
========================================================= */

export const useEvent = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEvent must be used inside an EventProvider."
    );
  }

  return context;
};

export default EventContext;