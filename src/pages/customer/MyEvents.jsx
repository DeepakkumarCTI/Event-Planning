import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";

import { useEvent } from "../../context/EventContext";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/formatCurrency";

/* =========================================================
   STAT THEMES
========================================================= */

const statThemes = [
  {
    card: "from-violet-950/80 via-fuchsia-950/50 to-slate-950",
    border: "border-violet-400/20",
    hover: "hover:border-violet-400/60",
    icon: "bg-violet-500/15 text-violet-300",
    glow: "bg-violet-500/20",
    value: "text-violet-100",
  },
  {
    card: "from-cyan-950/80 via-blue-950/50 to-slate-950",
    border: "border-cyan-400/20",
    hover: "hover:border-cyan-400/60",
    icon: "bg-cyan-500/15 text-cyan-300",
    glow: "bg-cyan-500/20",
    value: "text-cyan-100",
  },
  {
    card: "from-amber-950/80 via-orange-950/50 to-slate-950",
    border: "border-amber-400/20",
    hover: "hover:border-amber-400/60",
    icon: "bg-amber-500/15 text-amber-300",
    glow: "bg-amber-500/20",
    value: "text-amber-100",
  },
  {
    card: "from-emerald-950/80 via-teal-950/50 to-slate-950",
    border: "border-emerald-400/20",
    hover: "hover:border-emerald-400/60",
    icon: "bg-emerald-500/15 text-emerald-300",
    glow: "bg-emerald-500/20",
    value: "text-emerald-100",
  },
];

/* =========================================================
   EVENT THEMES
========================================================= */

const eventThemes = [
  {
    card: "from-violet-950/80 via-fuchsia-950/50 to-slate-950",
    border: "border-violet-400/20",
    hover: "hover:border-violet-400/60",
    icon: "bg-violet-500/15 text-violet-300",
    accent: "text-violet-300",
    soft: "bg-violet-500/10",
    line: "border-violet-400/10",
    glow: "bg-violet-500/20",
    progress: "from-violet-500 via-fuchsia-500 to-pink-500",
    button:
      "from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400",
  },
  {
    card: "from-cyan-950/80 via-blue-950/50 to-slate-950",
    border: "border-cyan-400/20",
    hover: "hover:border-cyan-400/60",
    icon: "bg-cyan-500/15 text-cyan-300",
    accent: "text-cyan-300",
    soft: "bg-cyan-500/10",
    line: "border-cyan-400/10",
    glow: "bg-cyan-500/20",
    progress: "from-cyan-400 via-blue-500 to-indigo-500",
    button:
      "from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:via-blue-400 hover:to-indigo-400",
  },
  {
    card: "from-amber-950/80 via-orange-950/50 to-slate-950",
    border: "border-amber-400/20",
    hover: "hover:border-amber-400/60",
    icon: "bg-amber-500/15 text-amber-300",
    accent: "text-amber-300",
    soft: "bg-amber-500/10",
    line: "border-amber-400/10",
    glow: "bg-amber-500/20",
    progress: "from-amber-400 via-orange-500 to-rose-500",
    button:
      "from-amber-400 via-orange-500 to-rose-500 hover:from-amber-300 hover:via-orange-400 hover:to-rose-400",
  },
  {
    card: "from-rose-950/80 via-pink-950/50 to-slate-950",
    border: "border-rose-400/20",
    hover: "hover:border-rose-400/60",
    icon: "bg-rose-500/15 text-rose-300",
    accent: "text-rose-300",
    soft: "bg-rose-500/10",
    line: "border-rose-400/10",
    glow: "bg-rose-500/20",
    progress: "from-rose-500 via-pink-500 to-fuchsia-500",
    button:
      "from-rose-500 via-pink-500 to-fuchsia-500 hover:from-rose-400 hover:via-pink-400 hover:to-fuchsia-400",
  },
  {
    card: "from-emerald-950/80 via-teal-950/50 to-slate-950",
    border: "border-emerald-400/20",
    hover: "hover:border-emerald-400/60",
    icon: "bg-emerald-500/15 text-emerald-300",
    accent: "text-emerald-300",
    soft: "bg-emerald-500/10",
    line: "border-emerald-400/10",
    glow: "bg-emerald-500/20",
    progress: "from-emerald-400 via-teal-500 to-cyan-500",
    button:
      "from-emerald-400 via-teal-500 to-cyan-500 hover:from-emerald-300 hover:via-teal-400 hover:to-cyan-400",
  },
  {
    card: "from-indigo-950/80 via-purple-950/50 to-slate-950",
    border: "border-indigo-400/20",
    hover: "hover:border-indigo-400/60",
    icon: "bg-indigo-500/15 text-indigo-300",
    accent: "text-indigo-300",
    soft: "bg-indigo-500/10",
    line: "border-indigo-400/10",
    glow: "bg-indigo-500/20",
    progress: "from-indigo-500 via-purple-500 to-violet-500",
    button:
      "from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-400 hover:via-purple-400 hover:to-violet-400",
  },
];

const MyEvents = () => {
  const {
    userEvents = [],
    deleteEvent,
    selectEvent,
  } = useEvent();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    event: null,
  });

  /* =========================================================
     FILTER EVENTS
  ========================================================= */

  const filteredEvents = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return [...userEvents]
      .filter((event) => {
        if (
          statusFilter !== "all" &&
          String(event?.status || "").toLowerCase() !==
            statusFilter.toLowerCase()
        ) {
          return false;
        }

        if (!searchValue) {
          return true;
        }

        const searchableText = [
          event?.title,
          event?.name,
          event?.category,
          event?.categoryName,
          event?.location,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchValue);
      })
      .sort((a, b) => {
        if (!a?.date) return 1;
        if (!b?.date) return -1;

        return new Date(a.date) - new Date(b.date);
      });
  }, [userEvents, search, statusFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const total = userEvents.length;

    const upcoming = userEvents.filter((event) => {
      if (!event?.date) return false;

      return new Date(event.date) >= new Date();
    }).length;

    const completed = userEvents.filter(
      (event) =>
        String(event?.status || "").toLowerCase() ===
        "completed"
    ).length;

    const planning = userEvents.filter((event) => {
      const status = String(
        event?.status || ""
      ).toLowerCase();

      return (
        status === "planning" ||
        status === "draft" ||
        status === "pending" ||
        !status
      );
    }).length;

    return {
      total,
      upcoming,
      completed,
      planning,
    };
  }, [userEvents]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getTitle = (event) =>
    event?.title ||
    event?.name ||
    "Untitled Event";

  const getImage = (event) =>
    event?.image ||
    event?.coverImage ||
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80";

  const getLocation = (event) => {
    if (typeof event?.location === "string") {
      return event.location;
    }

    if (event?.location?.name) {
      return event.location.name;
    }

    if (event?.venue?.name) {
      return event.venue.name;
    }

    return "Location not selected";
  };

  const getGuests = (event) =>
    event?.guestCount ??
    event?.guests ??
    0;

  const getProgress = (event) =>
    Math.min(
      100,
      Math.max(
        0,
        Number(event?.progress || 0)
      )
    );

  const getBudget = (event) => {
    if (event?.budget) {
      return Number(event.budget);
    }

    if (event?.budgetAmount) {
      return Number(event.budgetAmount);
    }

    return 0;
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const openDeleteModal = (event) => {
    setDeleteModal({
      open: true,
      event,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      open: false,
      event: null,
    });
  };

  const handleDelete = () => {
    if (!deleteModal.event) return;

    const eventId =
      deleteModal.event.id ||
      deleteModal.event._id;

    if (eventId && deleteEvent) {
      deleteEvent(eventId);
    }

    closeDeleteModal();
  };

  /* =========================================================
     SELECT EVENT
  ========================================================= */

  const handleOpenPlanner = (event) => {
    if (selectEvent) {
      selectEvent(
        event.id || event._id
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
          className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl"
          animate={{
            x: [0, 50, 0],
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
          className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
          animate={{
            x: [0, -50, 0],
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
          className="absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-3xl"
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
          PAGE HEADER
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <motion.div
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl"
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.3, 0.65, 0.3],
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
            scale: [1, 1.2, 1],
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
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-cyan-500/15 px-3.5 py-1.5 text-xs font-bold text-violet-200 shadow-lg shadow-violet-500/5">
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
                Event management
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-white via-violet-100 to-cyan-200 bg-clip-text sm:text-4xl lg:text-5xl">
                My Events
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                View and manage all your planned
                celebrations from one place.
              </p>
            </div>

            <Button
              to="/create-event"
              variant="primary"
              icon={
                <Plus className="h-4 w-4" />
              }
              className="border-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20 transition-all hover:from-violet-400 hover:via-fuchsia-400 hover:to-cyan-400 hover:shadow-fuchsia-500/25"
            >
              Create New Event
            </Button>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* ===================================================
            STAT CARDS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Events",
              value: stats.total,
              icon: CalendarDays,
            },
            {
              label: "Upcoming",
              value: stats.upcoming,
              icon: Clock3,
            },
            {
              label: "Planning",
              value: stats.planning,
              icon: Sparkles,
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: CheckCircle2,
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            const theme =
              statThemes[index % statThemes.length];

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.07,
                }}
                whileHover={{
                  y: -4,
                }}
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${theme.card} ${theme.border} ${theme.hover} p-5 shadow-xl shadow-black/20 transition-all duration-300`}
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full ${theme.glow} blur-3xl`}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${theme.icon} ring-1 ring-white/10`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={`text-3xl font-bold ${theme.value}`}
                  >
                    {stat.value}
                  </span>
                </div>

                <p className="relative mt-4 text-sm font-semibold text-slate-200">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
          }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}

            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search your events..."
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:bg-slate-950 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* Filters */}

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/70 py-3 pl-4 pr-10 text-sm font-medium text-slate-200 outline-none transition focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-500/10 sm:w-48"
                >
                  <option
                    value="all"
                    className="bg-slate-950"
                  >
                    All statuses
                  </option>

                  <option
                    value="planning"
                    className="bg-slate-950"
                  >
                    Planning
                  </option>

                  <option
                    value="pending"
                    className="bg-slate-950"
                  >
                    Pending
                  </option>

                  <option
                    value="confirmed"
                    className="bg-slate-950"
                  >
                    Confirmed
                  </option>

                  <option
                    value="completed"
                    className="bg-slate-950"
                  >
                    Completed
                  </option>

                  <option
                    value="cancelled"
                    className="bg-slate-950"
                  >
                    Cancelled
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>

              {(search || statusFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                  }}
                  className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-100"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            RESULT COUNT
        =================================================== */}

        <div className="mt-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Your Events
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1
                ? "event"
                : "events"}{" "}
              found
            </p>
          </div>
        </div>

        {/* ===================================================
            EVENT LIST
        =================================================== */}

        {filteredEvents.length > 0 ? (
          <motion.div
            layout
            className="mt-5 grid gap-5 lg:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map(
                (event, index) => {
                  const eventId =
                    event.id || event._id;

                  const progress =
                    getProgress(event);

                  const theme =
                    eventThemes[
                      index %
                        eventThemes.length
                    ];

                  return (
                    <motion.article
                      key={eventId || index}
                      layout
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.04,
                      }}
                      whileHover={{
                        y: -4,
                      }}
                      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${theme.card} ${theme.border} ${theme.hover} shadow-2xl shadow-black/25 transition-all duration-300`}
                    >
                      {/* Card glow */}

                      <div
                        className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full ${theme.glow} blur-3xl`}
                      />

                      {/* Image */}

                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={getImage(event)}
                          alt={getTitle(event)}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          onError={(imageEvent) => {
                            imageEvent.currentTarget.src =
                              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80";
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                        {/* Category */}

                        <div className="absolute left-4 top-4">
                          <span className="rounded-full border border-white/20 bg-slate-950/70 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                            {event.categoryName ||
                              event.category ||
                              "Event"}
                          </span>
                        </div>

                        {/* Status */}

                        <div className="absolute right-4 top-4">
                          <StatusBadge
                            status={
                              event.status ||
                              "planning"
                            }
                            size="sm"
                          />
                        </div>

                        {/* Title */}

                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white drop-shadow-lg">
                            {getTitle(event)}
                          </h3>

                          <p className="mt-1 text-xs text-slate-300">
                            Created{" "}
                            {event.createdAt
                              ? formatDate(
                                  event.createdAt
                                )
                              : "recently"}
                          </p>
                        </div>
                      </div>

                      {/* Details */}

                      <div className="relative p-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          {/* Date */}

                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${theme.icon} ring-1 ring-white/10`}
                            >
                              <CalendarDays className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                Date
                              </p>

                              <p className="mt-1 truncate text-sm font-semibold text-slate-200">
                                {event.date
                                  ? formatDate(
                                      event.date
                                    )
                                  : "Not selected"}
                              </p>
                            </div>
                          </div>

                          {/* Location */}

                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${theme.icon} ring-1 ring-white/10`}
                            >
                              <MapPin className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                Location
                              </p>

                              <p className="mt-1 truncate text-sm font-semibold text-slate-200">
                                {getLocation(
                                  event
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Guests */}

                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${theme.icon} ring-1 ring-white/10`}
                            >
                              <Users className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                Guests
                              </p>

                              <p className="mt-1 text-sm font-semibold text-slate-200">
                                {getGuests(event) ||
                                  "Not set"}
                              </p>
                            </div>
                          </div>

                          {/* Budget */}

                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${theme.icon} ring-1 ring-white/10`}
                            >
                              <Sparkles className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                Budget
                              </p>

                              <p className="mt-1 text-sm font-semibold text-slate-200">
                                {getBudget(event)
                                  ? formatCurrency(
                                      getBudget(
                                        event
                                      )
                                    )
                                  : "Not set"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Progress */}

                        <div className="mt-6 rounded-xl border border-white/10 bg-slate-950/45 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400">
                              Planning progress
                            </span>

                            <span
                              className={`text-sm font-bold ${theme.accent}`}
                            >
                              {progress}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              initial={{
                                width: 0,
                              }}
                              animate={{
                                width: `${progress}%`,
                              }}
                              transition={{
                                duration: 0.8,
                                delay:
                                  0.2 +
                                  index * 0.05,
                              }}
                              className={`h-full rounded-full bg-gradient-to-r ${theme.progress} shadow-lg`}
                            />
                          </div>
                        </div>

                        {/* Actions */}

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                          <Link
                            to={`/event-planner?event=${eventId}`}
                            onClick={() =>
                              handleOpenPlanner(
                                event
                              )
                            }
                            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${theme.button} px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl`}
                          >
                            Continue Planning

                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </Link>

                          <Link
                            to={`/event-planner?event=${eventId}`}
                            onClick={() =>
                              handleOpenPlanner(
                                event
                              )
                            }
                            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-200"
                          >
                            Details
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              openDeleteModal(
                                event
                              )
                            }
                            className="inline-flex items-center justify-center rounded-xl border border-rose-400/20 bg-rose-500/5 px-4 py-3 text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-200 sm:px-3"
                            aria-label={`Delete ${getTitle(
                              event
                            )}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                }
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-5">
            {userEvents.length === 0 ? (
              <div className="overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-950/40 via-slate-950 to-cyan-950/30 p-2 shadow-2xl shadow-black/20">
                <EmptyState
                  icon="calendar"
                  title="No events yet"
                  description="Create your first event and start organizing your date, guests, venue, services and checklist."
                  action={
                    <Button
                      to="/create-event"
                      variant="primary"
                      icon={
                        <Plus className="h-4 w-4" />
                      }
                      className="border-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                    >
                      Create Your First Event
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-950/30 via-slate-950 to-violet-950/30 p-2 shadow-2xl shadow-black/20">
                <EmptyState
                  icon="search"
                  title="No matching events"
                  description="Try changing your search or status filter."
                  action={
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setStatusFilter("all");
                      }}
                      className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-400"
                    >
                      Clear Filters
                    </button>
                  }
                />
              </div>
            )}
          </div>
        )}

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

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
          className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950 via-indigo-950 to-cyan-950 p-6 text-white shadow-2xl shadow-black/30 sm:p-8"
        >
          {/* Animated glows */}

          <motion.div
            className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1.5 text-xs font-bold text-fuchsia-200">
                <Sparkles className="h-3.5 w-3.5" />
                Ready for another celebration?
              </div>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Start planning your next event.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Build another event plan and keep all
                your celebrations organized separately.
              </p>
            </div>

            <Button
              to="/create-event"
              variant="primary"
              size="lg"
              icon={
                <Plus className="h-5 w-5" />
              }
              className="shrink-0 border-0 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 text-white shadow-lg shadow-fuchsia-500/20 transition-all hover:from-fuchsia-400 hover:via-violet-400 hover:to-cyan-400 hover:shadow-cyan-500/20"
            >
              Create Event
            </Button>
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <Modal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        title="Delete Event?"
        description="This action will remove the event from your planning dashboard."
        size="sm"
      >
        <div className="space-y-5">
          <div className="rounded-xl border border-rose-400/20 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300">
                <Trash2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-rose-100">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-white">
                    {deleteModal.event
                      ? getTitle(
                          deleteModal.event
                        )
                      : "this event"}
                  </span>
                  ?
                </p>

                <p className="mt-2 text-xs leading-5 text-rose-200/70">
                  Your event details and planning
                  progress will be removed from your
                  current frontend storage.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeDeleteModal}
              className="rounded-xl border border-slate-300/20 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-200"
            >
              Keep Event
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition hover:from-rose-400 hover:to-red-500 hover:shadow-rose-500/30"
            >
              <Trash2 className="h-4 w-4" />
              Delete Event
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default MyEvents;