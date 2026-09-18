
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Plus,
  Sparkles,
  WalletCards,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useEvent } from "../../context/EventContext";
import { useBooking } from "../../context/BookingContext";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const Dashboard = () => {
  const { user } = useAuth();

  const {
    userEvents = [],
    eventStats = {},
  } = useEvent();

  const {
    userBookings = [],
    bookingStats = {},
  } = useBooking();

  /* =========================================================
     USER
  ========================================================= */

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "Planner";

  const firstName =
    userName.split(" ")[0] || "Planner";

  /* =========================================================
     UPCOMING EVENTS
  ========================================================= */

  const upcomingEvents = useMemo(() => {
    const now = new Date();

    return [...userEvents]
      .filter((event) => {
        if (!event?.date) return false;

        const eventDate = new Date(event.date);

        return (
          !Number.isNaN(eventDate.getTime()) &&
          eventDate >= now
        );
      })
      .sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date)
      )
      .slice(0, 3);
  }, [userEvents]);

  /* =========================================================
     RECENT BOOKINGS
  ========================================================= */

  const recentBookings = useMemo(() => {
    return [...userBookings]
      .sort((a, b) => {
        const first = new Date(
          a?.createdAt || a?.date || 0
        );

        const second = new Date(
          b?.createdAt || b?.date || 0
        );

        return second - first;
      })
      .slice(0, 4);
  }, [userBookings]);

  /* =========================================================
     PLANNING PROGRESS
  ========================================================= */

  const averageProgress = useMemo(() => {
    if (!userEvents.length) return 0;

    const total = userEvents.reduce(
      (sum, event) =>
        sum + Number(event?.progress || 0),
      0
    );

    return Math.round(
      total / userEvents.length
    );
  }, [userEvents]);

  /* =========================================================
     STAT DATA
  ========================================================= */

  const stats = [
    {
      title: "My Events",
      value:
        eventStats?.total ??
        userEvents.length,
      icon: CalendarDays,
      href: "/my-events",
      description: "Events you're planning",
      gradient:
        "from-violet-600 to-fuchsia-500",
      soft:
        "bg-violet-50",
      iconColor:
        "text-violet-700",
      border:
        "border-violet-200",
      glow:
        "bg-violet-300/30",
    },
    {
      title: "Upcoming",
      value:
        eventStats?.upcoming ??
        upcomingEvents.length,
      icon: Clock3,
      href: "/my-events",
      description: "Events coming up",
      gradient:
        "from-cyan-500 to-blue-600",
      soft:
        "bg-cyan-50",
      iconColor:
        "text-cyan-700",
      border:
        "border-cyan-200",
      glow:
        "bg-cyan-300/30",
    },
    {
      title: "Bookings",
      value:
        bookingStats?.total ??
        userBookings.length,
      icon: CheckCircle2,
      href: "/my-bookings",
      description: "Your event bookings",
      gradient:
        "from-rose-500 to-pink-600",
      soft:
        "bg-rose-50",
      iconColor:
        "text-rose-700",
      border:
        "border-rose-200",
      glow:
        "bg-rose-300/30",
    },
    {
      title: "Planning Progress",
      value: `${averageProgress}%`,
      icon: WalletCards,
      href: "/event-planner",
      description: "Average completion",
      gradient:
        "from-emerald-500 to-teal-600",
      soft:
        "bg-emerald-50",
      iconColor:
        "text-emerald-700",
      border:
        "border-emerald-200",
      glow:
        "bg-emerald-300/30",
    },
  ];

  /* =========================================================
     HELPERS
  ========================================================= */

  const getEventImage = (event) => {
    return (
      event?.image ||
      event?.coverImage ||
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80"
    );
  };

  const getEventLocation = (event) => {
    if (typeof event?.location === "string") {
      return event.location;
    }

    if (event?.location?.name) {
      return event.location.name;
    }

    if (event?.venue?.name) {
      return event.venue.name;
    }

    return "Location to be decided";
  };

  const getBookingName = (booking) => {
    return (
      booking?.eventName ||
      booking?.eventTitle ||
      booking?.serviceName ||
      booking?.title ||
      "Event Booking"
    );
  };

  const getBookingDate = (booking) => {
    return (
      booking?.eventDate ||
      booking?.date ||
      booking?.createdAt
    );
  };

  const getBookingAmount = (booking) => {
    return Number(
      booking?.totalAmount ??
        booking?.amount ??
        booking?.total ??
        0
    );
  };

  const getProgress = (event) => {
    return Math.min(
      100,
      Math.max(
        0,
        Number(event?.progress || 0)
      )
    );
  };

  /* =========================================================
     ANIMATION
  ========================================================= */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
      },
    },
  };

  const quickActions = [
    {
      href: "/create-event",
      icon: Plus,
      title: "Create an Event",
      description: "Start a new event plan",
      gradient:
        "from-violet-600 to-fuchsia-500",
      iconColor:
        "text-violet-700",
      hover:
        "hover:border-violet-300",
    },
    {
      href: "/event-planner",
      icon: CheckCircle2,
      title: "Continue Planning",
      description: "Update your event checklist",
      gradient:
        "from-emerald-500 to-teal-500",
      iconColor:
        "text-emerald-700",
      hover:
        "hover:border-emerald-300",
    },
    {
      href: "/services",
      icon: Sparkles,
      title: "Explore Services",
      description: "Find services for your event",
      gradient:
        "from-cyan-500 to-blue-600",
      iconColor:
        "text-cyan-700",
      hover:
        "hover:border-cyan-300",
    },
    {
      href: "/venues",
      icon: MapPin,
      title: "Find a Venue",
      description: "Explore suitable venues",
      gradient:
        "from-amber-500 to-orange-500",
      iconColor:
        "text-amber-700",
      hover:
        "hover:border-amber-300",
    },
    {
      href: "/my-bookings",
      icon: CalendarDays,
      title: "View Bookings",
      description: "Check your booking status",
      gradient:
        "from-rose-500 to-pink-600",
      iconColor:
        "text-rose-700",
      hover:
        "hover:border-rose-300",
    },
    {
      href: "/profile",
      icon: WalletCards,
      title: "Update Profile",
      description: "Manage your account details",
      gradient:
        "from-indigo-600 to-purple-600",
      iconColor:
        "text-indigo-700",
      hover:
        "hover:border-indigo-300",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-violet-50/50 to-rose-50/60 text-slate-900">

      {/* =====================================================
          BACKGROUND AMBIENCE
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <motion.div
          className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-300/25 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-0 top-10 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.10),transparent_35%)]" />
      </div>

      <div className="relative z-10">

        {/* ===================================================
            HEADER
        =================================================== */}

        <section className="relative overflow-hidden border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">

          <div className="absolute inset-0 bg-gradient-to-r from-violet-50 via-white to-cyan-50" />

          <motion.div
            className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-fuchsia-300/25 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
            >

              <div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-fuchsia-600" />
                  Your planning dashboard
                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  <span className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                    {`Good to see you, ${firstName}`}
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Keep your events, bookings and planning
                  tasks organized from one place.
                </p>

              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <Button
                  to="/my-events"
                  variant="outline"
                  icon={
                    <CalendarDays className="h-4 w-4" />
                  }
                >
                  My Events
                </Button>

                <Button
                  to="/create-event"
                  variant="primary"
                  icon={
                    <Plus className="h-4 w-4" />
                  }
                >
                  Plan New Event
                </Button>

              </div>

            </motion.div>

          </div>
        </section>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

          {/* =================================================
              STATS
          ================================================= */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                >
                  <Link
                    to={stat.href}
                    className={`group relative block overflow-hidden rounded-2xl border ${stat.border} bg-white/90 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >

                    <div
                      className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${stat.glow} blur-3xl transition duration-500 group-hover:scale-150`}
                    />

                    <div className="relative flex items-start justify-between">

                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700" />

                    </div>

                    <p className="relative mt-5 text-3xl font-black text-slate-900">
                      {stat.value}
                    </p>

                    <p className="relative mt-1 text-sm font-semibold text-slate-700">
                      {stat.title}
                    </p>

                    <p className="relative mt-1 text-xs text-slate-500">
                      {stat.description}
                    </p>

                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: "65%",
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.4,
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${stat.gradient}`}
                      />
                    </div>

                  </Link>
                </motion.div>
              );
            })}

          </motion.div>

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.5fr_1fr]">

            {/* =================================================
                UPCOMING EVENTS
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.5,
              }}
              className="relative overflow-hidden rounded-2xl border border-cyan-200 bg-white/90 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl sm:p-6"
            >

              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-200/30 blur-3xl" />

              <div className="relative flex items-center justify-between gap-4">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
                    Your calendar
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Upcoming Events
                  </h2>

                  <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
                </div>

                <Link
                  to="/my-events"
                  className="hidden items-center gap-1 text-sm font-semibold text-slate-500 transition hover:text-cyan-700 sm:flex"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>

              {upcomingEvents.length > 0 ? (
                <div className="relative mt-6 space-y-4">

                  {upcomingEvents.map(
                    (event, index) => (
                      <motion.div
                        key={
                          event.id ||
                          event._id ||
                          index
                        }
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            0.35 +
                            index * 0.08,
                        }}
                      >

                        <Link
                          to={`/event-planner?event=${event.id || event._id}`}
                          className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition duration-300 hover:border-cyan-300 hover:bg-cyan-50/50 hover:shadow-lg hover:shadow-cyan-100 sm:flex-row"
                        >

                          <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32">

                            <img
                              src={getEventImage(
                                event
                              )}
                              alt={
                                event.title ||
                                event.name ||
                                "Event"
                              }
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                              onError={(
                                imageEvent
                              ) => {
                                imageEvent.currentTarget.src =
                                  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80";
                              }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                          </div>

                          <div className="min-w-0 flex-1 py-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700">
                                {event.categoryName ||
                                  event.category ||
                                  "Event"}
                              </span>

                              {event.status && (
                                <StatusBadge
                                  status={
                                    event.status
                                  }
                                  size="sm"
                                />
                              )}

                            </div>

                            <h3 className="mt-2 truncate text-base font-bold text-slate-800 transition group-hover:text-cyan-700">
                              {event.title ||
                                event.name ||
                                "Untitled Event"}
                            </h3>

                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">

                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="h-3.5 w-3.5 text-cyan-600" />
                                {formatDate(
                                  event.date
                                )}
                              </span>

                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-blue-600" />
                                {getEventLocation(
                                  event
                                )}
                              </span>

                            </div>

                            <div className="mt-3">

                              <div className="mb-1 flex items-center justify-between text-[11px]">
                                <span className="font-medium text-slate-500">
                                  Planning progress
                                </span>

                                <span className="font-bold text-cyan-700">
                                  {getProgress(
                                    event
                                  )}
                                  %
                                </span>
                              </div>

                              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">

                                <motion.div
                                  initial={{
                                    width: 0,
                                  }}
                                  animate={{
                                    width: `${getProgress(
                                      event
                                    )}%`,
                                  }}
                                  transition={{
                                    duration: 0.8,
                                    delay:
                                      0.4 +
                                      index * 0.1,
                                  }}
                                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                                />

                              </div>

                            </div>

                          </div>

                          <div className="hidden items-center sm:flex">
                            <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-600" />
                          </div>

                        </Link>

                      </motion.div>
                    )
                  )}

                </div>
              ) : (
                <div className="relative mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                  <EmptyState
                    icon="calendar"
                    title="No events yet"
                    description="Start planning your first event and keep everything organized in one place."
                    action={
                      <Button
                        to="/create-event"
                        variant="primary"
                        size="sm"
                        icon={
                          <Plus className="h-4 w-4" />
                        }
                      >
                        Create Event
                      </Button>
                    }
                  />
                </div>
              )}

              <Link
                to="/my-events"
                className="mt-5 flex items-center justify-center gap-1 text-sm font-semibold text-slate-500 transition hover:text-cyan-700 sm:hidden"
              >
                View all events
                <ArrowRight className="h-4 w-4" />
              </Link>

            </motion.section>

            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
              className="relative overflow-hidden rounded-2xl border border-amber-200 bg-white/90 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl sm:p-6"
            >

              <div className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-amber-200/30 blur-3xl" />

              <div className="relative">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                  Shortcuts
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Quick Actions
                </h2>

                <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />

              </div>

              <div className="relative mt-6 grid gap-3">

                {quickActions.map(
                  (action, index) => {
                    const Icon = action.icon;

                    return (
                      <motion.div
                        key={action.title}
                        initial={{
                          opacity: 0,
                          x: 15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            0.4 +
                            index * 0.06,
                        }}
                      >

                        <Link
                          to={action.href}
                          className={`group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-3 transition duration-300 ${action.hover} hover:bg-white hover:shadow-md`}
                        >

                          <div
                            className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${action.gradient} text-white shadow-lg`}
                          >
                            <Icon className="relative z-10 h-5 w-5" />

                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              initial={{
                                x: "-100%",
                              }}
                              whileHover={{
                                x: "100%",
                              }}
                              transition={{
                                duration: 0.5,
                              }}
                            />
                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="text-sm font-semibold text-slate-800 transition group-hover:text-slate-950">
                              {action.title}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {action.description}
                            </p>

                          </div>

                          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700" />

                        </Link>

                      </motion.div>
                    );
                  }
                )}

              </div>

            </motion.section>

          </div>

          {/* ===================================================
              RECENT BOOKINGS
          =================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.5,
            }}
            className="relative mt-8 overflow-hidden rounded-2xl border border-rose-200 bg-white/90 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl sm:p-6"
          >

            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-rose-200/30 blur-3xl" />

            <div className="relative flex items-center justify-between gap-4">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-700">
                  Activity
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Recent Bookings
                </h2>

                <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-600" />

              </div>

              <Link
                to="/my-bookings"
                className="flex items-center gap-1 text-sm font-semibold text-slate-500 transition hover:text-rose-700"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

            {recentBookings.length > 0 ? (
              <div className="relative mt-6 overflow-x-auto">

                <div className="min-w-[680px]">

                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 rounded-xl border border-rose-100 bg-gradient-to-r from-rose-50 via-fuchsia-50 to-white px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <span>Booking</span>
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span />
                  </div>

                  <div className="divide-y divide-slate-100">

                    {recentBookings.map(
                      (booking, index) => {
                        const bookingDate =
                          getBookingDate(
                            booking
                          );

                        return (
                          <motion.div
                            key={
                              booking.id ||
                              booking._id ||
                              index
                            }
                            initial={{
                              opacity: 0,
                              y: 8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay:
                                0.45 +
                                index * 0.08,
                            }}
                            className="group grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] items-center gap-4 px-4 py-4 transition hover:bg-rose-50/50"
                          >

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-slate-800">
                                {getBookingName(
                                  booking
                                )}
                              </p>

                              <p className="mt-1 truncate text-xs text-slate-500">
                                {booking?.bookingId ||
                                  booking?.id ||
                                  booking?._id ||
                                  "Booking"}
                              </p>

                            </div>

                            <div className="text-sm text-slate-600">
                              {bookingDate
                                ? formatDate(
                                    bookingDate
                                  )
                                : "—"}
                            </div>

                            <div className="text-sm font-semibold text-emerald-700">
                              {formatCurrency(
                                getBookingAmount(
                                  booking
                                )
                              )}
                            </div>

                            <div>
                              <StatusBadge
                                status={
                                  booking?.status ||
                                  booking?.bookingStatus ||
                                  "pending"
                                }
                                size="sm"
                              />
                            </div>

                            <Link
                              to={`/my-bookings/${
                                booking.id ||
                                booking._id
                              }`}
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-100 hover:text-rose-700"
                              aria-label="View booking"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Link>

                          </motion.div>
                        );
                      }
                    )}

                  </div>

                </div>

              </div>
            ) : (
              <div className="relative mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                <EmptyState
                  icon="bookings"
                  title="No bookings yet"
                  description="Your confirmed and pending bookings will appear here."
                  action={
                    <Button
                      to="/services"
                      variant="outline"
                      size="sm"
                      icon={
                        <ArrowRight className="h-4 w-4" />
                      }
                    >
                      Explore Services
                    </Button>
                  }
                />
              </div>
            )}

          </motion.section>

          {/* ===================================================
              PLANNING CTA
          =================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
            className="relative mt-8 overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 p-6 text-slate-900 shadow-xl shadow-indigo-100/70 sm:p-8 lg:p-10"
          >

            {/* Decorative gradients */}

            <motion.div
              className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-fuchsia-300/25 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
            />

            <motion.div
              className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
              }}
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1.5 text-xs font-semibold text-fuchsia-700 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-fuchsia-600" />
                  Keep the momentum going
                </div>

                <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                  Have another{" "}
                  <span className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    celebration
                  </span>{" "}
                  in mind?
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Create a new event and organize its
                  date, venue, guests, services and
                  checklist in one place.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700">
                    ✨ Smart Planning
                  </span>

                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700">
                    📅 Organized Events
                  </span>

                  <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700">
                    🎉 Beautiful Experiences
                  </span>

                </div>

              </div>

              <Button
                to="/create-event"
                variant="primary"
                size="lg"
                icon={
                  <ArrowRight className="h-5 w-5" />
                }
                className="shrink-0"
              >
                Start Planning
              </Button>

            </div>

          </motion.section>

        </div>

      </div>
    </main>
  );
};

export default Dashboard;
