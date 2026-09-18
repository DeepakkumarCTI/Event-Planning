import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellOff,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  CircleAlert,
  Clock3,
  CreditCard,
  Info,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import { useNotification } from "../../context/NotificationContext";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";
import { formatDateTime } from "../../utils/formatDate";

/* =========================================================
   NOTIFICATION COLOR THEMES
========================================================= */

const notificationThemes = {
  booking: {
    icon: "bg-cyan-500/15 text-cyan-300 ring-cyan-400/20",
    badge: "bg-cyan-500/10 text-cyan-200 border-cyan-400/20",
    accent: "bg-cyan-400",
    glow: "bg-cyan-500/20",
  },

  event: {
    icon: "bg-violet-500/15 text-violet-300 ring-violet-400/20",
    badge: "bg-violet-500/10 text-violet-200 border-violet-400/20",
    accent: "bg-violet-400",
    glow: "bg-violet-500/20",
  },

  payment: {
    icon: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20",
    badge: "bg-emerald-500/10 text-emerald-200 border-emerald-400/20",
    accent: "bg-emerald-400",
    glow: "bg-emerald-500/20",
  },

  reminder: {
    icon: "bg-amber-500/15 text-amber-300 ring-amber-400/20",
    badge: "bg-amber-500/10 text-amber-200 border-amber-400/20",
    accent: "bg-amber-400",
    glow: "bg-amber-500/20",
  },

  system: {
    icon: "bg-blue-500/15 text-blue-300 ring-blue-400/20",
    badge: "bg-blue-500/10 text-blue-200 border-blue-400/20",
    accent: "bg-blue-400",
    glow: "bg-blue-500/20",
  },

  success: {
    icon: "bg-teal-500/15 text-teal-300 ring-teal-400/20",
    badge: "bg-teal-500/10 text-teal-200 border-teal-400/20",
    accent: "bg-teal-400",
    glow: "bg-teal-500/20",
  },

  warning: {
    icon: "bg-rose-500/15 text-rose-300 ring-rose-400/20",
    badge: "bg-rose-500/10 text-rose-200 border-rose-400/20",
    accent: "bg-rose-400",
    glow: "bg-rose-500/20",
  },

  default: {
    icon: "bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-400/20",
    badge: "bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-400/20",
    accent: "bg-fuchsia-400",
    glow: "bg-fuchsia-500/20",
  },
};

/* =========================================================
   PAGE
========================================================= */

const Notifications = () => {
  const {
    userNotifications,
    unreadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
  } = useNotification();

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  const [showClearModal, setShowClearModal] =
    useState(false);

  /* =========================================================
     FILTER NOTIFICATIONS
  ========================================================= */

  const filteredNotifications = useMemo(() => {
    if (!Array.isArray(userNotifications)) {
      return [];
    }

    if (activeFilter === "unread") {
      return userNotifications.filter(
        (notification) =>
          !notification.read
      );
    }

    if (activeFilter === "booking") {
      return userNotifications.filter(
        (notification) =>
          notification.type === "booking"
      );
    }

    if (activeFilter === "event") {
      return userNotifications.filter(
        (notification) =>
          notification.type === "event"
      );
    }

    if (activeFilter === "payment") {
      return userNotifications.filter(
        (notification) =>
          notification.type === "payment"
      );
    }

    if (activeFilter === "reminder") {
      return userNotifications.filter(
        (notification) =>
          notification.type === "reminder"
      );
    }

    return userNotifications;
  }, [
    userNotifications,
    activeFilter,
  ]);

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleNotificationClick = async (
    notification
  ) => {
    if (!notification) return;

    if (!notification.read) {
      try {
        await markAsRead(
          notification.id ||
            notification._id
        );
      } catch (error) {
        console.error(
          "Unable to mark notification as read:",
          error
        );
      }
    }

    setSelectedNotification(
      notification
    );
  };

  const handleDelete = async (
    notification
  ) => {
    const id =
      notification?.id ||
      notification?._id;

    if (!id) return;

    try {
      await deleteNotification(id);

      if (
        selectedNotification &&
        String(
          selectedNotification.id ||
            selectedNotification._id
        ) === String(id)
      ) {
        setSelectedNotification(
          null
        );
      }
    } catch (error) {
      console.error(
        "Unable to delete notification:",
        error
      );
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error(
        "Unable to mark all notifications as read:",
        error
      );
    }
  };

  const handleClearAll = async () => {
    try {
      await clearNotifications();

      setShowClearModal(false);
    } catch (error) {
      console.error(
        "Unable to clear notifications:",
        error
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pb-16 text-white">
      {/* =====================================================
          BACKGROUND GLOWS
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 35, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
          animate={{
            x: [0, -45, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <motion.div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            {/* Label */}

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-cyan-500/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-violet-200 shadow-lg shadow-violet-500/5">
              <Bell className="h-3.5 w-3.5 text-fuchsia-300" />
              Notifications
            </div>

            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-white via-violet-100 to-cyan-200 bg-clip-text sm:text-4xl lg:text-5xl">
                    Your notifications
                  </h1>

                  {unreadNotifications?.length >
                    0 && (
                    <motion.span
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-bold text-fuchsia-200"
                    >
                      {
                        unreadNotifications.length
                      }{" "}
                      unread
                    </motion.span>
                  )}
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Stay updated with booking changes,
                  event reminders, payment updates and
                  planning activity.
                </p>
              </div>

              {userNotifications?.length >
                0 && (
                <div className="flex flex-wrap gap-2">
                  {unreadNotifications?.length >
                    0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={
                        handleMarkAllRead
                      }
                      icon={
                        <CheckCheck className="h-4 w-4" />
                      }
                      className="border-cyan-400/25 bg-cyan-500/5 text-cyan-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-100"
                    >
                      Mark all read
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setShowClearModal(
                        true
                      )
                    }
                    icon={
                      <Trash2 className="h-4 w-4" />
                    }
                    className="text-rose-300 hover:bg-rose-500/10 hover:text-rose-200"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================
            FILTERS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.05,
          }}
          className="flex gap-2 overflow-x-auto pb-2"
        >
          <FilterButton
            active={activeFilter === "all"}
            onClick={() =>
              setActiveFilter("all")
            }
            label="All"
            count={
              userNotifications?.length ||
              0
            }
            theme="violet"
          />

          <FilterButton
            active={
              activeFilter === "unread"
            }
            onClick={() =>
              setActiveFilter("unread")
            }
            label="Unread"
            count={
              unreadNotifications?.length ||
              0
            }
            theme="fuchsia"
          />

          <FilterButton
            active={
              activeFilter === "booking"
            }
            onClick={() =>
              setActiveFilter("booking")
            }
            label="Bookings"
            theme="cyan"
          />

          <FilterButton
            active={
              activeFilter === "event"
            }
            onClick={() =>
              setActiveFilter("event")
            }
            label="Events"
            theme="violet"
          />

          <FilterButton
            active={
              activeFilter === "payment"
            }
            onClick={() =>
              setActiveFilter("payment")
            }
            label="Payments"
            theme="emerald"
          />

          <FilterButton
            active={
              activeFilter === "reminder"
            }
            onClick={() =>
              setActiveFilter("reminder")
            }
            label="Reminders"
            theme="amber"
          />
        </motion.div>

        {/* =================================================
            NOTIFICATION LIST
        ================================================= */}

        <section className="mt-6">
          {filteredNotifications.length ===
          0 ? (
            <div className="overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-950/40 via-slate-950 to-cyan-950/30 p-2 shadow-2xl shadow-black/20">
              <EmptyState
                icon="inbox"
                title={
                  userNotifications?.length ===
                  0
                    ? "You're all caught up"
                    : "No notifications found"
                }
                description={
                  userNotifications?.length ===
                  0
                    ? "New booking, event and planning updates will appear here."
                    : "There are no notifications in this category."
                }
                action={
                  userNotifications?.length ===
                  0 ? (
                    <Button
                      to="/dashboard"
                      variant="primary"
                      icon={
                        <Sparkles className="h-4 w-4" />
                      }
                      className="border-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                    >
                      Go to Dashboard
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setActiveFilter(
                          "all"
                        )
                      }
                      className="border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/10"
                    >
                      Show All
                    </Button>
                  )
                }
              />
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {filteredNotifications.map(
                  (
                    notification,
                    index
                  ) => (
                    <NotificationCard
                      key={
                        notification.id ||
                        notification._id ||
                        index
                      }
                      notification={
                        notification
                      }
                      index={index}
                      onOpen={() =>
                        handleNotificationClick(
                          notification
                        )
                      }
                      onRead={() =>
                        markAsRead(
                          notification.id ||
                            notification._id
                        )
                      }
                      onDelete={() =>
                        handleDelete(
                          notification
                        )
                      }
                    />
                  )
                )}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* =================================================
            HELPFUL LINKS
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-10 grid gap-4 sm:grid-cols-2"
        >
          {/* Bookings */}

          <Link
            to="/my-bookings"
            className="group relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-950/50 via-blue-950/30 to-slate-950 p-5 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/15 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/20">
                <CalendarDays className="h-5 w-5" />
              </div>

              <ChevronRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
            </div>

            <h3 className="relative mt-4 font-bold text-white">
              View my bookings
            </h3>

            <p className="relative mt-1 text-xs leading-5 text-slate-400">
              Check your upcoming events and booking
              status.
            </p>
          </Link>

          {/* Planner */}

          <Link
            to="/event-planner"
            className="group relative overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-950/50 via-fuchsia-950/30 to-slate-950 p-5 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-fuchsia-500/15 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20">
                <Sparkles className="h-5 w-5" />
              </div>

              <ChevronRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-violet-300" />
            </div>

            <h3 className="relative mt-4 font-bold text-white">
              Continue planning
            </h3>

            <p className="relative mt-1 text-xs leading-5 text-slate-400">
              Continue working on your event checklist
              and services.
            </p>
          </Link>
        </motion.section>
      </div>

      {/* =====================================================
          NOTIFICATION DETAIL MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelectedNotification(
                null
              )
            }
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-violet-950/40 to-cyan-950/30 shadow-2xl shadow-black/50"
            >
              {/* Modal glow */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl" />

              <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <NotificationIcon
                    type={
                      selectedNotification.type
                    }
                    size="md"
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-fuchsia-300">
                      Notification
                    </p>

                    <h2 className="mt-1 truncate font-bold text-white">
                      {selectedNotification.title ||
                        "Update"}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedNotification(
                      null
                    )
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-200"
                  aria-label="Close notification"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative p-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm leading-7 text-slate-200">
                    {selectedNotification.message ||
                      selectedNotification.description ||
                      "You have a new update."}
                  </p>
                </div>

                {selectedNotification.createdAt && (
                  <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                    <Clock3 className="h-4 w-4 text-cyan-300" />

                    {formatDateTime(
                      selectedNotification.createdAt
                    )}
                  </div>
                )}

                {selectedNotification.link && (
                  <div className="mt-5">
                    <Button
                      to={
                        selectedNotification.link
                      }
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        setSelectedNotification(
                          null
                        )
                      }
                      icon={
                        <ChevronRight className="h-4 w-4" />
                      }
                      className="border-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                    >
                      Open related page
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative border-t border-white/10 bg-white/[0.025] px-5 py-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setSelectedNotification(
                      null
                    )
                  }
                  className="text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          CLEAR ALL MODAL
      ===================================================== */}

      <Modal
        isOpen={showClearModal}
        onClose={() =>
          setShowClearModal(false)
        }
        title="Clear all notifications?"
        description="This will remove all notifications from your notification list."
        size="sm"
      >
        <div className="rounded-2xl border border-rose-400/20 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent p-4">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/20">
              <BellOff className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-rose-100">
                Remove all notifications
              </p>

              <p className="mt-1 text-xs leading-5 text-rose-200/70">
                This action clears your current
                notification history.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              setShowClearModal(false)
            }
            className="text-slate-300 hover:bg-white/10 hover:text-white"
          >
            Keep Notifications
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={
              handleClearAll
            }
            icon={
              <Trash2 className="h-4 w-4" />
            }
            className="border-0 bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/20"
          >
            Clear All
          </Button>
        </div>
      </Modal>
    </main>
  );
};

/* ===========================================================
   NOTIFICATION CARD
=========================================================== */

const NotificationCard = ({
  notification,
  index,
  onOpen,
  onRead,
  onDelete,
}) => {
  const isUnread =
    !notification.read;

  const theme =
    notificationThemes[
      notification.type
    ] ||
    notificationThemes.default;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        x: -20,
      }}
      transition={{
        delay: index * 0.03,
      }}
      whileHover={{
        y: -2,
      }}
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${
        isUnread
          ? "from-slate-900 via-violet-950/30 to-slate-950"
          : "from-slate-950 via-slate-900 to-slate-950"
      } ${
        isUnread
          ? "border-white/15"
          : "border-white/10"
      } p-4 shadow-xl shadow-black/20 transition-all duration-300 hover:border-white/20 hover:shadow-2xl sm:p-5`}
    >
      {/* Notification glow */}

      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${theme.glow} blur-3xl`}
      />

      {/* Unread accent */}

      {isUnread && (
        <motion.div
          className={`absolute bottom-0 left-0 top-0 w-1 ${theme.accent}`}
          initial={{
            scaleY: 0,
          }}
          animate={{
            scaleY: 1,
          }}
          transition={{
            duration: 0.4,
          }}
        />
      )}

      <div className="relative flex gap-4">
        {/* Icon */}

        <button
          type="button"
          onClick={onOpen}
          className="shrink-0"
        >
          <NotificationIcon
            type={notification.type}
          />
        </button>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={onOpen}
            className="block w-full text-left"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <h3
                  className={`truncate text-sm ${
                    isUnread
                      ? "font-bold text-white"
                      : "font-semibold text-slate-200"
                  }`}
                >
                  {notification.title ||
                    "Notification"}
                </h3>

                {isUnread && (
                  <motion.span
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className={`h-2 w-2 shrink-0 rounded-full ${theme.accent}`}
                  />
                )}
              </div>

              {notification.createdAt && (
                <span className="shrink-0 text-[11px] text-slate-500">
                  {formatDateTime(
                    notification.createdAt
                  )}
                </span>
              )}
            </div>

            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400 sm:text-sm">
              {notification.message ||
                notification.description ||
                "You have a new update."}
            </p>
          </button>

          {/* Bottom controls */}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {notification.type && (
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold capitalize ${theme.badge}`}
              >
                {notification.type}
              </span>
            )}

            <div className="ml-auto flex items-center gap-1">
              {isUnread && (
                <button
                  type="button"
                  onClick={onRead}
                  className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-slate-400 transition hover:bg-emerald-500/10 hover:text-emerald-300"
                >
                  <Check className="h-3.5 w-3.5" />
                  Mark read
                </button>
              )}

              <button
                type="button"
                onClick={onDelete}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                aria-label="Delete notification"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={onOpen}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-cyan-500/10 hover:text-cyan-300"
                aria-label="Open notification"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ===========================================================
   NOTIFICATION ICON
=========================================================== */

const NotificationIcon = ({
  type,
  size = "sm",
}) => {
  const iconMap = {
    booking: CalendarDays,
    event: Sparkles,
    payment: CreditCard,
    reminder: Clock3,
    system: Info,
    success: CheckCircle2,
    warning: CircleAlert,
  };

  const Icon =
    iconMap[type] || Bell;

  const theme =
    notificationThemes[type] ||
    notificationThemes.default;

  const sizeClasses =
    size === "md"
      ? "h-11 w-11 rounded-xl"
      : "h-11 w-11 rounded-xl";

  return (
    <div
      className={`flex ${sizeClasses} items-center justify-center ${theme.icon} ring-1`}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
};

/* ===========================================================
   FILTER BUTTON
=========================================================== */

const FilterButton = ({
  active,
  onClick,
  label,
  count,
  theme = "violet",
}) => {
  const themes = {
    violet: {
      active:
        "border-violet-400/40 bg-violet-500/15 text-violet-100 shadow-lg shadow-violet-500/10",
      hover:
        "hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-200",
    },

    fuchsia: {
      active:
        "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-100 shadow-lg shadow-fuchsia-500/10",
      hover:
        "hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-200",
    },

    cyan: {
      active:
        "border-cyan-400/40 bg-cyan-500/15 text-cyan-100 shadow-lg shadow-cyan-500/10",
      hover:
        "hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-200",
    },

    emerald: {
      active:
        "border-emerald-400/40 bg-emerald-500/15 text-emerald-100 shadow-lg shadow-emerald-500/10",
      hover:
        "hover:border-emerald-400/30 hover:bg-emerald-500/10 hover:text-emerald-200",
    },

    amber: {
      active:
        "border-amber-400/40 bg-amber-500/15 text-amber-100 shadow-lg shadow-amber-500/10",
      hover:
        "hover:border-amber-400/30 hover:bg-amber-500/10 hover:text-amber-200",
    },
  };

  const currentTheme =
    themes[theme] || themes.violet;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
        active
          ? currentTheme.active
          : `border-white/10 bg-white/[0.04] text-slate-400 ${currentTheme.hover}`
      }`}
    >
      {label}

      {typeof count === "number" && (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] ${
            active
              ? "bg-white/10 text-white"
              : "bg-white/5 text-slate-500"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default Notifications;