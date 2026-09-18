import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Search,
  Users,
  X,
  Sparkles,
  Flame,
} from "lucide-react";

import { events, eventCategories } from "../../data/events";
import EmptyState from "../../components/common/EmptyState";

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [filter, setFilter] = useState("all");

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        category === "all" ||
        event.category === category ||
        event.categoryName?.toLowerCase() === category.toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        event.title?.toLowerCase().includes(normalizedSearch) ||
        event.description?.toLowerCase().includes(normalizedSearch) ||
        event.shortDescription?.toLowerCase().includes(normalizedSearch) ||
        event.location?.toLowerCase().includes(normalizedSearch) ||
        event.categoryName?.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        filter === "all" ||
        (filter === "featured" && event.featured) ||
        (filter === "popular" && event.popular);

      return matchesCategory && matchesSearch && matchesFilter;
    });
  }, [category, filter, search]);

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }

    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setFilter("all");
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  const cardGradients = [
    {
      card: "from-violet-50 via-fuchsia-50 to-white",
      border: "border-violet-200",
      icon: "bg-violet-100 text-violet-700",
      badge: "bg-violet-600 text-white",
      button:
        "from-violet-600 via-fuchsia-600 to-pink-500 hover:from-violet-700 hover:via-fuchsia-700 hover:to-pink-600",
      divider: "border-violet-200",
    },
    {
      card: "from-cyan-50 via-blue-50 to-white",
      border: "border-cyan-200",
      icon: "bg-cyan-100 text-cyan-700",
      badge: "bg-cyan-600 text-white",
      button:
        "from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-700",
      divider: "border-cyan-200",
    },
    {
      card: "from-amber-50 via-orange-50 to-white",
      border: "border-amber-200",
      icon: "bg-amber-100 text-amber-700",
      badge: "bg-orange-600 text-white",
      button:
        "from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600",
      divider: "border-amber-200",
    },
    {
      card: "from-rose-50 via-pink-50 to-white",
      border: "border-rose-200",
      icon: "bg-rose-100 text-rose-700",
      badge: "bg-rose-600 text-white",
      button:
        "from-rose-600 via-pink-600 to-fuchsia-600 hover:from-rose-700 hover:via-pink-700 hover:to-fuchsia-700",
      divider: "border-rose-200",
    },
    {
      card: "from-indigo-50 via-violet-50 to-white",
      border: "border-indigo-200",
      icon: "bg-indigo-100 text-indigo-700",
      badge: "bg-indigo-600 text-white",
      button:
        "from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-700 hover:via-violet-700 hover:to-fuchsia-700",
      divider: "border-indigo-200",
    },
    {
      card: "from-emerald-50 via-cyan-50 to-white",
      border: "border-emerald-200",
      icon: "bg-emerald-100 text-emerald-700",
      badge: "bg-emerald-600 text-white",
      button:
        "from-emerald-600 via-cyan-600 to-blue-600 hover:from-emerald-700 hover:via-cyan-700 hover:to-blue-700",
      divider: "border-emerald-200",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-20 pt-32 text-white sm:px-8 lg:px-12 lg:pb-24">
        {/* Decorative gradient blobs */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 top-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2 text-xs"
          >
            <Link
              to="/"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Home
            </Link>

            <ArrowRight className="h-3 w-3 text-violet-400" />

            <span className="font-semibold text-violet-300">
              Events & Celebrations
            </span>
          </motion.div>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-fuchsia-300" />
              Tamil Nadu Celebration Collection
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              
              <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-200 bg-clip-text text-transparent">
                Discover Beautiful Celebration Ideas
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base"
            >
              Explore thoughtfully planned celebration blueprints for
              weddings, receptions, betrothals, seemanthams, cultural
              gatherings, and corporate experiences across Tamil Nadu.
            </motion.p>

            {/* Accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "180px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-7 h-1 rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FILTER AREA
      ========================================================== */}
      <section className="relative border-b border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search celebrations, cities, or event types..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  category === "all"
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                All Celebrations ({events.length})
              </button>

              {eventCategories.slice(0, 7).map((cat, index) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    category === cat.id
                      ? index % 2 === 0
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200"
                        : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-200"
                      : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EVENTS GRID
      ========================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/40 to-rose-50/30 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-fuchsia-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* Results header */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet-600">
                Explore the collection
              </p>

              <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                {filteredEvents.length} Celebration
                {filteredEvents.length !== 1 ? "s" : ""} Ready to Explore
              </h2>
            </div>

            {(category !== "all" || search || filter !== "all") && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex w-fit items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-600 shadow-sm transition-all hover:border-rose-300 hover:bg-rose-50"
              >
                <span>Reset Search & Filters</span>
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event, index) => {
                  const style = cardGradients[index % cardGradients.length];

                  return (
                    <motion.article
                      key={event.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{
                        duration: 0.45,
                        delay: Math.min(index * 0.06, 0.3),
                      }}
                      whileHover={{ y: -8 }}
                      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border ${style.border} bg-gradient-to-br ${style.card} shadow-sm transition-shadow duration-300 hover:shadow-2xl`}
                    >
                      {/* Top glow */}
                      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/60 blur-2xl transition-transform duration-500 group-hover:scale-150" />

                      <div className="relative">
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          <img
                            src={event.image || "/images/hero_mandapam.jpg"}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          {/* Image overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                          {/* Category */}
                          <div className="absolute left-4 top-4">
                            <span
                              className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider shadow-lg ${style.badge}`}
                            >
                              {event.categoryName || event.category}
                            </span>
                          </div>

                          {/* Budget */}
                          {event.budget && (
                            <div className="absolute right-4 top-4">
                              <span className="rounded-full border border-white/30 bg-slate-950/70 px-3 py-1.5 text-xs font-extrabold text-white shadow-lg backdrop-blur-md">
                                ₹{Number(event.budget).toLocaleString("en-IN")}
                              </span>
                            </div>
                          )}

                          {/* Featured */}
                          {event.featured && (
                            <div className="absolute bottom-4 left-4">
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                                <Sparkles className="h-3 w-3 text-amber-300" />
                                Featured Celebration
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <h3 className="line-clamp-2 text-lg font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-violet-700">
                              {event.title}
                            </h3>
                          </div>

                          <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                            {event.shortDescription || event.description}
                          </p>

                          {/* Details */}
                          <div
                            className={`mt-5 space-y-2.5 border-t ${style.divider} pt-4`}
                          >
                            {event.location && (
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                                <span
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
                                >
                                  <MapPin className="h-3.5 w-3.5" />
                                </span>

                                <span className="truncate">
                                  {event.location}
                                </span>
                              </div>
                            )}

                            {event.guestCount && (
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                                <span
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
                                >
                                  <Users className="h-3.5 w-3.5" />
                                </span>

                                <span>{event.guestCount} Guests</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="relative p-5 pt-0">
                        <Link
                          to={`/events/${event.id}`}
                          className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${style.button} px-4 py-3 text-xs font-extrabold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
                        >
                          <span>Explore Celebration Details</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-violet-100 bg-white p-10 text-center shadow-xl shadow-violet-100/50"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100">
                <Search className="h-7 w-7 text-violet-600" />
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                We Couldn't Find That Celebration
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try another keyword, choose a different celebration category,
                or clear your filters to explore the full collection.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-6 py-3 text-xs font-extrabold text-white shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span>Explore All Celebrations</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-950 px-5 py-16 sm:px-8 lg:px-12">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-violet-600 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-fuchsia-600 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-xl shadow-violet-500/20">
            <Flame className="h-7 w-7 text-white" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Plan Your
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-200 bg-clip-text text-transparent">
              Perfect Celebration?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Find the right celebration blueprint, discover trusted vendors,
            and turn your event vision into a beautifully coordinated
            experience.
          </p>

          <Link
            to="/ai-planner"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-violet-700 shadow-xl transition-all hover:-translate-y-1 hover:bg-violet-50 hover:shadow-2xl"
          >
            <span>Start Planning Your Event</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Events;