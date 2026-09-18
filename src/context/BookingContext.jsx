import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const BookingContext = createContext(null);

const BOOKINGS_KEY = "functionPlannerBookings";

/* =========================================================
   BOOKING STATUS
========================================================= */

export const BOOKING_STATUSES = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

/* =========================================================
   PAYMENT STATUS
========================================================= */

export const PAYMENT_STATUSES = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

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

  return `booking-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

const getStoredBookings = () => {
  const storedBookings =
    localStorage.getItem(BOOKINGS_KEY);

  if (!storedBookings) {
    return [];
  }

  try {
    const parsedBookings =
      JSON.parse(storedBookings);

    return Array.isArray(parsedBookings)
      ? parsedBookings
      : [];
  } catch (error) {
    console.error(
      "Invalid stored booking data:",
      error
    );

    localStorage.removeItem(BOOKINGS_KEY);

    return [];
  }
};

/* =========================================================
   BOOKING PROVIDER
========================================================= */

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] =
    useState(null);

  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD BOOKINGS
  ======================================================== */

  useEffect(() => {
    const loadBookings = () => {
      try {
        const storedBookings =
          getStoredBookings();

        setBookings(storedBookings);

        if (storedBookings.length > 0) {
          setCurrentBooking(storedBookings[0]);
        }
      } catch (error) {
        console.error(
          "Failed to load bookings:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  /* =======================================================
     SAVE BOOKINGS
  ======================================================== */

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        BOOKINGS_KEY,
        JSON.stringify(bookings)
      );
    }
  }, [bookings, loading]);

  /* =======================================================
     CREATE BOOKING
  ======================================================== */

  const createBooking = (bookingData = {}) => {
    const userId =
      user?.id ||
      user?._id ||
      null;

    const newBooking = {
      id: generateId(),

      bookingNumber:
        `FP-${Date.now()
          .toString()
          .slice(-8)}`,

      userId,

      customer: {
        name:
          bookingData.customer?.name ||
          user?.name ||
          user?.fullName ||
          "",

        email:
          bookingData.customer?.email ||
          user?.email ||
          "",

        phone:
          bookingData.customer?.phone ||
          user?.phone ||
          "",
      },

      event: {
        id:
          bookingData.event?.id ||
          bookingData.eventId ||
          null,

        name:
          bookingData.event?.name ||
          bookingData.eventName ||
          "",

        category:
          bookingData.event?.category ||
          bookingData.category ||
          "",

        date:
          bookingData.event?.date ||
          bookingData.date ||
          "",

        startTime:
          bookingData.event?.startTime ||
          bookingData.startTime ||
          "",

        endTime:
          bookingData.event?.endTime ||
          bookingData.endTime ||
          "",

        guestCount:
          Number(
            bookingData.event?.guestCount ||
              bookingData.guestCount ||
              0
          ),

        budget:
          Number(
            bookingData.event?.budget ||
              bookingData.budget ||
              0
          ),
      },

      venue:
        bookingData.venue || null,

      services:
        Array.isArray(bookingData.services)
          ? bookingData.services
          : [],

      package:
        bookingData.package || null,

      pricing: {
        subtotal:
          Number(
            bookingData.pricing?.subtotal ||
              bookingData.subtotal ||
              0
          ),

        tax:
          Number(
            bookingData.pricing?.tax ||
              bookingData.tax ||
              0
          ),

        serviceCharge:
          Number(
            bookingData.pricing
              ?.serviceCharge ||
              bookingData.serviceCharge ||
              0
          ),

        total:
          Number(
            bookingData.pricing?.total ||
              bookingData.total ||
              0
          ),
      },

      payment: {
        method:
          bookingData.payment?.method ||
          bookingData.paymentMethod ||
          "Pending",

        status:
          bookingData.payment?.status ||
          bookingData.paymentStatus ||
          PAYMENT_STATUSES.PENDING,

        transactionId:
          bookingData.payment?.transactionId ||
          null,
      },

      bookingStatus:
        bookingData.bookingStatus ||
        BOOKING_STATUSES.PENDING,

      notes:
        bookingData.notes || "",

      enquiryMessage:
        bookingData.enquiryMessage || "",

      cancellationReason:
        bookingData.cancellationReason || "",

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    setBookings((previousBookings) => [
      newBooking,
      ...previousBookings,
    ]);

    setCurrentBooking(newBooking);

    return newBooking;
  };

  /* =======================================================
     CREATE ENQUIRY
  ======================================================== */

  const createEnquiry = (enquiryData = {}) => {
    return createBooking({
      ...enquiryData,

      bookingStatus:
        BOOKING_STATUSES.PENDING,

      paymentStatus:
        PAYMENT_STATUSES.PENDING,

      enquiryMessage:
        enquiryData.message ||
        enquiryData.enquiryMessage ||
        "",
    });
  };

  /* =======================================================
     UPDATE BOOKING
  ======================================================== */

  const updateBooking = (
    bookingId,
    updates = {}
  ) => {
    let updatedBooking = null;

    setBookings((previousBookings) =>
      previousBookings.map((booking) => {
        if (booking.id !== bookingId) {
          return booking;
        }

        updatedBooking = {
          ...booking,
          ...updates,

          updatedAt:
            new Date().toISOString(),
        };

        return updatedBooking;
      })
    );

    if (
      currentBooking?.id === bookingId
    ) {
      setCurrentBooking((previousBooking) => ({
        ...previousBooking,
        ...updates,

        updatedAt:
          new Date().toISOString(),
      }));
    }

    return updatedBooking;
  };

  /* =======================================================
     GET BOOKING BY ID
  ======================================================== */

  const getBookingById = (bookingId) => {
    return bookings.find(
      (booking) =>
        booking.id === bookingId ||
        booking.bookingNumber === bookingId
    );
  };

  /* =======================================================
     SELECT BOOKING
  ======================================================== */

  const selectBooking = (bookingId) => {
    const booking =
      getBookingById(bookingId);

    if (booking) {
      setCurrentBooking(booking);
    }

    return booking || null;
  };

  /* =======================================================
     CLEAR CURRENT BOOKING
  ======================================================== */

  const clearCurrentBooking = () => {
    setCurrentBooking(null);
  };

  /* =======================================================
     CONFIRM BOOKING
  ======================================================== */

  const confirmBooking = (bookingId) => {
    return updateBooking(bookingId, {
      bookingStatus:
        BOOKING_STATUSES.CONFIRMED,
    });
  };

  /* =======================================================
     COMPLETE BOOKING
  ======================================================== */

  const completeBooking = (bookingId) => {
    return updateBooking(bookingId, {
      bookingStatus:
        BOOKING_STATUSES.COMPLETED,
    });
  };

  /* =======================================================
     CANCEL BOOKING
  ======================================================== */

  const cancelBooking = (
    bookingId,
    reason = ""
  ) => {
    return updateBooking(bookingId, {
      bookingStatus:
        BOOKING_STATUSES.CANCELLED,

      cancellationReason: reason,
    });
  };

  /* =======================================================
     UPDATE PAYMENT STATUS
  ======================================================== */

  const updatePaymentStatus = (
    bookingId,
    paymentStatus,
    transactionId = null
  ) => {
    const booking =
      getBookingById(bookingId);

    if (!booking) {
      return null;
    }

    return updateBooking(bookingId, {
      payment: {
        ...booking.payment,

        status: paymentStatus,

        transactionId:
          transactionId ||
          booking.payment?.transactionId ||
          null,
      },
    });
  };

  /* =======================================================
     MARK PAYMENT AS PAID
  ======================================================== */

  const markPaymentAsPaid = (
    bookingId,
    transactionId = null
  ) => {
    return updatePaymentStatus(
      bookingId,
      PAYMENT_STATUSES.PAID,
      transactionId
    );
  };

  /* =======================================================
     DELETE BOOKING
  ======================================================== */

  const deleteBooking = (bookingId) => {
    setBookings((previousBookings) => {
      const remainingBookings =
        previousBookings.filter(
          (booking) =>
            booking.id !== bookingId
        );

      if (
        currentBooking?.id === bookingId
      ) {
        setCurrentBooking(
          remainingBookings.length > 0
            ? remainingBookings[0]
            : null
        );
      }

      return remainingBookings;
    });
  };

  /* =======================================================
     USER BOOKINGS
  ======================================================== */

  const userBookings = useMemo(() => {
    if (!user) {
      return [];
    }

    const userId =
      user.id ||
      user._id;

    if (!userId) {
      return bookings;
    }

    return bookings.filter(
      (booking) =>
        !booking.userId ||
        booking.userId === userId
    );
  }, [bookings, user]);

  /* =======================================================
     BOOKING FILTERS
  ======================================================== */

  const getBookingsByStatus = (
    status
  ) => {
    return userBookings.filter(
      (booking) =>
        booking.bookingStatus
          ?.toLowerCase() ===
        status.toLowerCase()
    );
  };

  const getUpcomingBookings = () => {
    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    return userBookings.filter(
      (booking) => {
        const eventDate =
          booking.event?.date;

        if (!eventDate) {
          return false;
        }

        const date =
          new Date(eventDate);

        return (
          date >= today &&
          booking.bookingStatus !==
            BOOKING_STATUSES.CANCELLED
        );
      }
    );
  };

  /* =======================================================
     BOOKING STATISTICS
  ======================================================== */

  const bookingStats = useMemo(() => {
    const total =
      userBookings.length;

    const pending =
      userBookings.filter(
        (booking) =>
          booking.bookingStatus ===
          BOOKING_STATUSES.PENDING
      ).length;

    const confirmed =
      userBookings.filter(
        (booking) =>
          booking.bookingStatus ===
          BOOKING_STATUSES.CONFIRMED
      ).length;

    const completed =
      userBookings.filter(
        (booking) =>
          booking.bookingStatus ===
          BOOKING_STATUSES.COMPLETED
      ).length;

    const cancelled =
      userBookings.filter(
        (booking) =>
          booking.bookingStatus ===
          BOOKING_STATUSES.CANCELLED
      ).length;

    const paid =
      userBookings.filter(
        (booking) =>
          booking.payment?.status ===
          PAYMENT_STATUSES.PAID
      ).length;

    const totalValue =
      userBookings.reduce(
        (total, booking) =>
          total +
          Number(
            booking.pricing?.total || 0
          ),
        0
      );

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      paid,
      totalValue,
    };
  }, [userBookings]);

  /* =======================================================
     CONTEXT VALUE
  ======================================================== */

  const value = useMemo(
    () => ({
      /* Data */
      bookings: userBookings,
      allBookings: bookings,
      currentBooking,
      loading,

      /* Creation */
      createBooking,
      createEnquiry,

      /* Management */
      updateBooking,
      deleteBooking,
      getBookingById,
      selectBooking,
      clearCurrentBooking,

      /* Booking status */
      confirmBooking,
      completeBooking,
      cancelBooking,

      /* Payment */
      updatePaymentStatus,
      markPaymentAsPaid,

      /* Filters */
      getBookingsByStatus,
      getUpcomingBookings,

      /* Statistics */
      bookingStats,

      /* Constants */
      bookingStatuses: BOOKING_STATUSES,
      paymentStatuses: PAYMENT_STATUSES,
    }),
    [
      userBookings,
      bookings,
      currentBooking,
      loading,
      bookingStats,
    ]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

/* =========================================================
   USE BOOKING HOOK
========================================================= */

export const useBooking = () => {
  const context =
    useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBooking must be used inside a BookingProvider."
    );
  }

  return context;
};

export default BookingContext;