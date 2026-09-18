import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Users,
  MapPin,
} from "lucide-react";
import { events } from "../../data/events";

const cardThemes = [
  {
    card: "bg-gradient-to-br from-red-50 via-white to-orange-50",
    border: "border-red-200 hover:border-red-400",
    shadow: "hover:shadow-red-100",
    icon: "from-red-500 to-orange-500",
    iconBg: "bg-red-50 border-red-200",
    accent: "text-red-700",
    hoverText: "group-hover:text-red-700",
    badge: "bg-red-600 text-white",
    button:
      "bg-red-600 hover:bg-red-700 border-red-600 text-white shadow-red-100",
    outlineButton:
      "bg-white hover:bg-red-600 border-red-200 hover:border-red-600 text-red-700 hover:text-white",
  },
  {
    card: "bg-gradient-to-br from-yellow-50 via-white to-amber-50",
    border: "border-yellow-200 hover:border-yellow-400",
    shadow: "hover:shadow-yellow-100",
    icon: "from-yellow-500 to-amber-500",
    iconBg: "bg-yellow-50 border-yellow-200",
    accent: "text-amber-700",
    hoverText: "group-hover:text-amber-700",
    badge: "bg-amber-500 text-white",
    button:
      "bg-amber-500 hover:bg-amber-600 border-amber-500 text-white shadow-amber-100",
    outlineButton:
      "bg-white hover:bg-amber-500 border-amber-200 hover:border-amber-500 text-amber-700 hover:text-white",
  },
  {
    card: "bg-gradient-to-br from-emerald-50 via-white to-green-50",
    border: "border-emerald-200 hover:border-emerald-400",
    shadow: "hover:shadow-emerald-100",
    icon: "from-emerald-500 to-green-500",
    iconBg: "bg-emerald-50 border-emerald-200",
    accent: "text-emerald-700",
    hoverText: "group-hover:text-emerald-700",
    badge: "bg-emerald-600 text-white",
    button:
      "bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white shadow-emerald-100",
    outlineButton:
      "bg-white hover:bg-emerald-600 border-emerald-200 hover:border-emerald-600 text-emerald-700 hover:text-white",
  },
  {
    card: "bg-gradient-to-br from-orange-50 via-white to-yellow-50",
    border: "border-orange-200 hover:border-orange-400",
    shadow: "hover:shadow-orange-100",
    icon: "from-orange-500 to-yellow-500",
    iconBg: "bg-orange-50 border-orange-200",
    accent: "text-orange-700",
    hoverText: "group-hover:text-orange-700",
    badge: "bg-orange-600 text-white",
    button:
      "bg-orange-600 hover:bg-orange-700 border-orange-600 text-white shadow-orange-100",
    outlineButton:
      "bg-white hover:bg-orange-600 border-orange-200 hover:border-orange-600 text-orange-700 hover:text-white",
  },
  {
    card: "bg-gradient-to-br from-sky-50 via-white to-blue-50",
    border: "border-sky-200 hover:border-sky-400",
    shadow: "hover:shadow-sky-100",
    icon: "from-sky-500 to-blue-500",
    iconBg: "bg-sky-50 border-sky-200",
    accent: "text-sky-700",
    hoverText: "group-hover:text-sky-700",
    badge: "bg-sky-600 text-white",
    button:
      "bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-sky-100",
    outlineButton:
      "bg-white hover:bg-sky-600 border-sky-200 hover:border-sky-600 text-sky-700 hover:text-white",
  },
  {
    card: "bg-gradient-to-br from-violet-50 via-white to-purple-50",
    border: "border-violet-200 hover:border-violet-400",
    shadow: "hover:shadow-violet-100",
    icon: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-50 border-violet-200",
    accent: "text-violet-700",
    hoverText: "group-hover:text-violet-700",
    badge: "bg-violet-600 text-white",
    button:
      "bg-violet-600 hover:bg-violet-700 border-violet-600 text-white shadow-violet-100",
    outlineButton:
      "bg-white hover:bg-violet-600 border-violet-200 hover:border-violet-600 text-violet-700 hover:text-white",
  },
  {
    card: "bg-gradient-to-br from-pink-50 via-white to-rose-50",
    border: "border-pink-200 hover:border-pink-400",
    shadow: "hover:shadow-pink-100",
    icon: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-50 border-pink-200",
    accent: "text-pink-700",
    hoverText: "group-hover:text-pink-700",
    badge: "bg-pink-600 text-white",
    button:
      "bg-pink-600 hover:bg-pink-700 border-pink-600 text-white shadow-pink-100",
    outlineButton:
      "bg-white hover:bg-pink-600 border-pink-200 hover:border-pink-600 text-pink-700 hover:text-white",
  },
];

const FeaturedEvents = () => {
  const featuredEvents = events.filter((e) => e.featured).slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-orange-50/30 to-emerald-50/30 px-4 py-20 sm:px-6 lg:px-8">
      {/* Decorative Background Glows */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-red-200/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-yellow-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 via-yellow-50 to-red-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700 shadow-sm"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </span>

              Exemplary Celebrations
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Tamil Nadu
              </span>{" "}
              Event Showcases
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base"
            >
              Explore authentic celebrations planned through Eventara's
              intelligent ceremony planner and executed by verified Tamil Nadu
              vendors.
            </motion.p>
          </div>

          {/* Explore All Button */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              to="/events"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:text-orange-700 hover:shadow-lg hover:shadow-orange-100"
            >
              <span>Explore All Events</span>

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event, idx) => {
            const isFeatured = idx === 0;
            const theme = cardThemes[idx % cardThemes.length];

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${theme.card} ${theme.border} ${theme.shadow} ${
                  isFeatured ? "ring-2 ring-orange-200/70" : ""
                }`}
              >
                {/* Featured Accent */}
                {isFeatured && (
                  <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400" />
                )}

                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />

                  {/* Category */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold shadow-lg ${theme.badge}`}
                    >
                      {event.category}
                    </span>

                    {isFeatured && (
                      <span className="rounded-lg border border-white/70 bg-white/95 px-3 py-1.5 text-[11px] font-bold text-slate-800 shadow-lg backdrop-blur-sm">
                        Flagship
                      </span>
                    )}
                  </div>

                  {/* Budget */}
                  {event.budget && (
                    <div className="absolute right-4 top-4">
                      <span className="rounded-lg border border-white/60 bg-white/95 px-3 py-1.5 text-xs font-extrabold text-slate-900 shadow-lg backdrop-blur-sm">
                        ₹{Number(event.budget).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  {/* Image Bottom Label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Verified Event Showcase
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="flex flex-1 flex-col justify-between space-y-5 p-5">
                  <div>
                    {/* Title */}
                    <h3
                      className={`font-display line-clamp-1 text-base font-extrabold text-slate-900 transition-colors duration-300 ${theme.hoverText}`}
                    >
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600">
                      {event.description}
                    </p>
                  </div>

                  {/* Meta Details */}
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 text-xs">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${theme.iconBg}`}
                      >
                        <Users className={`h-3.5 w-3.5 ${theme.accent}`} />
                      </span>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Guests
                        </p>
                        <p className="truncate font-bold text-slate-700">
                          {event.guestCount || "500"}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${theme.iconBg}`}
                      >
                        <MapPin className={`h-3.5 w-3.5 ${theme.accent}`} />
                      </span>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Location
                        </p>
                        <p className="truncate font-bold text-slate-700">
                          {event.location || "Chennai, TN"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/events/${event.id}`}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-xs font-extrabold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${isFeatured ? theme.button : theme.outlineButton}`}
                  >
                    <span>View Event Details</span>

                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Decorative Accent */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <span className="h-1 w-10 rounded-full bg-red-400" />
          <span className="h-1 w-16 rounded-full bg-yellow-400" />
          <span className="h-1 w-10 rounded-full bg-emerald-400" />
          <span className="h-1 w-16 rounded-full bg-orange-400" />
          <span className="h-1 w-10 rounded-full bg-sky-400" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;