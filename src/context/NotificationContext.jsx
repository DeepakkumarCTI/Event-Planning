import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

const NOTIFICATIONS_KEY =
  "functionPlannerNotifications";

/* =========================================================
   NOTIFICATION TYPES
========================================================= */

export const NOTIFICATION_TYPES = {
  BOOKING: "booking",
  EVENT: "event",
  PAYMENT: "payment",
  REMINDER: "reminder",
  SYSTEM: "system",
  SUCCESS: "success",
  WARNING: "warning",
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

  return `notification-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

const getStoredNotifications = () => {
  const stored =
    localStorage.getItem(NOTIFICATIONS_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "Invalid stored notification data:",
      error
    );

    localStorage.removeItem(
      NOTIFICATIONS_KEY
    );

    return [];
  }
};

/* =========================================================
   NOTIFICATION PROVIDER
========================================================= */

export const NotificationProvider = ({
  children,
}) => {
  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =======================================================
     LOAD NOTIFICATIONS
  ======================================================== */

  useEffect(() => {
    const loadNotifications = () => {
      try {
        const storedNotifications =
          getStoredNotifications();

        setNotifications(
          storedNotifications
        );
      } catch (error) {
        console.error(
          "Failed to load notifications:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  /* =======================================================
     SAVE NOTIFICATIONS
  ======================================================== */

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(notifications)
      );
    }
  }, [
    notifications,
    loading,
  ]);

  /* =======================================================
     USER NOTIFICATIONS
  ======================================================== */

  const userNotifications = useMemo(() => {
    if (!user) {
      return [];
    }

    const userId =
      user.id ||
      user._id;

    if (!userId) {
      return notifications;
    }

    return notifications.filter(
      (notification) =>
        !notification.userId ||
        notification.userId === userId
    );
  }, [
    notifications,
    user,
  ]);

  /* =======================================================
     ADD NOTIFICATION
  ======================================================== */

  const addNotification = (
    notificationData = {}
  ) => {
    const userId =
      notificationData.userId ||
      user?.id ||
      user?._id ||
      null;

    const newNotification = {
      id: generateId(),

      userId,

      type:
        notificationData.type ||
        NOTIFICATION_TYPES.SYSTEM,

      title:
        notificationData.title ||
        "New Notification",

      message:
        notificationData.message ||
        "",

      link:
        notificationData.link ||
        null,

      relatedId:
        notificationData.relatedId ||
        null,

      isRead: false,

      createdAt:
        new Date().toISOString(),
    };

    setNotifications(
      (previousNotifications) => [
        newNotification,
        ...previousNotifications,
      ]
    );

    return newNotification;
  };

  /* =======================================================
     BOOKING NOTIFICATION
  ======================================================== */

  const addBookingNotification = ({
    title = "Booking Update",
    message = "",
    bookingId = null,
    link = null,
  } = {}) => {
    return addNotification({
      type:
        NOTIFICATION_TYPES.BOOKING,

      title,

      message,

      relatedId:
        bookingId,

      link:
        link ||
        (bookingId
          ? `/my-bookings/${bookingId}`
          : "/my-bookings"),
    });
  };

  /* =======================================================
     EVENT NOTIFICATION
  ======================================================== */

  const addEventNotification = ({
    title = "Event Update",
    message = "",
    eventId = null,
    link = null,
  } = {}) => {
    return addNotification({
      type:
        NOTIFICATION_TYPES.EVENT,

      title,

      message,

      relatedId:
        eventId,

      link:
        link ||
        (eventId
          ? `/my-events`
          : "/my-events"),
    });
  };

  /* =======================================================
     PAYMENT NOTIFICATION
  ======================================================== */

  const addPaymentNotification = ({
    title = "Payment Update",
    message = "",
    bookingId = null,
    link = null,
  } = {}) => {
    return addNotification({
      type:
        NOTIFICATION_TYPES.PAYMENT,

      title,

      message,

      relatedId:
        bookingId,

      link:
        link ||
        "/payments",
    });
  };

  /* =======================================================
     REMINDER NOTIFICATION
  ======================================================== */

  const addReminder = ({
    title = "Event Reminder",
    message = "",
    eventId = null,
  } = {}) => {
    return addNotification({
      type:
        NOTIFICATION_TYPES.REMINDER,

      title,

      message,

      relatedId:
        eventId,

      link:
        "/my-events",
    });
  };

  /* =======================================================
     MARK AS READ
  ======================================================== */

  const markAsRead = (
    notificationId
  ) => {
    setNotifications(
      (previousNotifications) =>
        previousNotifications.map(
          (notification) =>
            notification.id ===
            notificationId
              ? {
                  ...notification,
                  isRead: true,
                }
              : notification
        )
    );
  };

  /* =======================================================
     MARK AS UNREAD
  ======================================================== */

  const markAsUnread = (
    notificationId
  ) => {
    setNotifications(
      (previousNotifications) =>
        previousNotifications.map(
          (notification) =>
            notification.id ===
            notificationId
              ? {
                  ...notification,
                  isRead: false,
                }
              : notification
        )
    );
  };

  /* =======================================================
     MARK ALL AS READ
  ======================================================== */

  const markAllAsRead = () => {
    setNotifications(
      (previousNotifications) =>
        previousNotifications.map(
          (notification) => ({
            ...notification,
            isRead: true,
          })
        )
    );
  };

  /* =======================================================
     DELETE NOTIFICATION
  ======================================================== */

  const deleteNotification = (
    notificationId
  ) => {
    setNotifications(
      (previousNotifications) =>
        previousNotifications.filter(
          (notification) =>
            notification.id !==
            notificationId
        )
    );
  };

  /* =======================================================
     CLEAR ALL NOTIFICATIONS
  ======================================================== */

  const clearNotifications = () => {
    setNotifications([]);
  };

  /* =======================================================
     GET NOTIFICATION
  ======================================================== */

  const getNotificationById = (
    notificationId
  ) => {
    return userNotifications.find(
      (notification) =>
        notification.id ===
        notificationId
    );
  };

  /* =======================================================
     FILTER BY TYPE
  ======================================================== */

  const getNotificationsByType = (
    type
  ) => {
    return userNotifications.filter(
      (notification) =>
        notification.type === type
    );
  };

  /* =======================================================
     UNREAD NOTIFICATIONS
  ======================================================== */

  const unreadNotifications =
    useMemo(() => {
      return userNotifications.filter(
        (notification) =>
          !notification.isRead
      );
    }, [userNotifications]);

  /* =======================================================
     READ NOTIFICATIONS
  ======================================================== */

  const readNotifications =
    useMemo(() => {
      return userNotifications.filter(
        (notification) =>
          notification.isRead
      );
    }, [userNotifications]);

  /* =======================================================
     NOTIFICATION STATISTICS
  ======================================================== */

  const notificationStats =
    useMemo(() => {
      const total =
        userNotifications.length;

      const unread =
        unreadNotifications.length;

      const read =
        readNotifications.length;

      const bookings =
        userNotifications.filter(
          (notification) =>
            notification.type ===
            NOTIFICATION_TYPES.BOOKING
        ).length;

      const events =
        userNotifications.filter(
          (notification) =>
            notification.type ===
            NOTIFICATION_TYPES.EVENT
        ).length;

      const payments =
        userNotifications.filter(
          (notification) =>
            notification.type ===
            NOTIFICATION_TYPES.PAYMENT
        ).length;

      const reminders =
        userNotifications.filter(
          (notification) =>
            notification.type ===
            NOTIFICATION_TYPES.REMINDER
        ).length;

      return {
        total,
        unread,
        read,
        bookings,
        events,
        payments,
        reminders,
      };
    }, [
      userNotifications,
      unreadNotifications,
      readNotifications,
    ]);

  /* =======================================================
     CONTEXT VALUE
  ======================================================== */

  const value = useMemo(
    () => ({
      /* Data */
      notifications:
        userNotifications,

      allNotifications:
        notifications,

      unreadNotifications,

      readNotifications,

      loading,

      /* Creation */
      addNotification,

      addBookingNotification,

      addEventNotification,

      addPaymentNotification,

      addReminder,

      /* Management */
      markAsRead,

      markAsUnread,

      markAllAsRead,

      deleteNotification,

      clearNotifications,

      getNotificationById,

      getNotificationsByType,

      /* Statistics */
      notificationStats,

      /* Constants */
      notificationTypes:
        NOTIFICATION_TYPES,
    }),
    [
      userNotifications,
      notifications,
      unreadNotifications,
      readNotifications,
      loading,
      notificationStats,
    ]
  );

  return (
    <NotificationContext.Provider
      value={value}
    >
      {children}
    </NotificationContext.Provider>
  );
};

/* =========================================================
   USE NOTIFICATION HOOK
========================================================= */

export const useNotification = () => {
  const context =
    useContext(
      NotificationContext
    );

  if (!context) {
    throw new Error(
      "useNotification must be used inside a NotificationProvider."
    );
  }

  return context;
};

export default NotificationContext;