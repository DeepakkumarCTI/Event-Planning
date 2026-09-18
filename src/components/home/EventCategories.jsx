import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Heart,
  Gem,
  Baby,
  Home as HomeIcon,
  Award,
  Building2,
  Briefcase,
  Music,
  Gift,
  Flame,
  Sparkles,
} from "lucide-react";
import { eventCategories } from "../../data/events";

const categoryIconMap = {
  wedding: Heart,
  muhurtham: Heart,
  engagement: Gem,
  "baby-shower": Baby,
  seemantham: Baby,
  housewarming: HomeIcon,
  grahapravesam: HomeIcon,
  anniversary: Award,
  sashtiapthapoorthi: Award,
  corporate: Building2,
  conference: Briefcase,
  reception: Music,
  birthday: Gift,
  "product-launch": Flame,
};

const categoryThemes = [
  {
    card:
      "border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",
    hover: "hover:border-violet-400 hover:shadow-violet-100",
    icon:
      "bg-gradient-to-br from-violet-100 to-fuchsia-100 text-violet-600 border-violet-200",
    iconHover:
      "group-hover:from-violet-500 group-hover:to-fuchsia-500 group-hover:text-white",
    title: "group-hover:text-violet-600",
    explore: "text-violet-600",
    glow: "bg-violet-200/30",
  },
  {
    card:
      "border-pink-200 bg-gradient-to-br from-pink-50 via-white to-rose-50",
    hover: "hover:border-pink-400 hover:shadow-pink-100",
    icon:
      "bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600 border-pink-200",
    iconHover:
      "group-hover:from-pink-500 group-hover:to-rose-500 group-hover:text-white",
    title: "group-hover:text-pink-600",
    explore: "text-pink-600",
    glow: "bg-pink-200/30",
  },
  {
    card:
      "border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50",
    hover: "hover:border-orange-400 hover:shadow-orange-100",
    icon:
      "bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 border-orange-200",
    iconHover:
      "group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white",
    title: "group-hover:text-orange-600",
    explore: "text-orange-600",
    glow: "bg-orange-200/30",
  },
  {
    card:
      "border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50",
    hover: "hover:border-cyan-400 hover:shadow-cyan-100",
    icon:
      "bg-gradient-to-br from-cyan-100 to-sky-100 text-cyan-600 border-cyan-200",
    iconHover:
      "group-hover:from-cyan-500 group-hover:to-sky-500 group-hover:text-white",
    title: "group-hover:text-cyan-600",
    explore: "text-cyan-600",
    glow: "bg-cyan-200/30",
  },
  {
    card:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50",
    hover: "hover:border-emerald-400 hover:shadow-emerald-100",
    icon:
      "bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 border-emerald-200",
    iconHover:
      "group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white",
    title: "group-hover:text-emerald-600",
    explore: "text-emerald-600",
    glow: "bg-emerald-200/30",
  },
  {
    card:
      "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50",
    hover: "hover:border-blue-400 hover:shadow-blue-100",
    icon:
      "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 border-blue-200",
    iconHover:
      "group-hover:from-blue-500 group-hover:to-indigo-500 group-hover:text-white",
    title: "group-hover:text-blue-600",
    explore: "text-blue-600",
    glow: "bg-blue-200/30",
  },
  {
    card:
      "border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-white to-purple-50",
    hover: "hover:border-fuchsia-400 hover:shadow-fuchsia-100",
    icon:
      "bg-gradient-to-br from-fuchsia-100 to-purple-100 text-fuchsia-600 border-fuchsia-200",
    iconHover:
      "group-hover:from-fuchsia-500 group-hover:to-purple-500 group-hover:text-white",
    title: "group-hover:text-fuchsia-600",
    explore: "text-fuchsia-600",
    glow: "bg-fuchsia-200/30",
  },
  {
    card:
      "border-amber-200 bg-gradient-to-br from-amber-50 via-white to-yellow-50",
    hover: "hover:border-amber-400 hover:shadow-amber-100",
    icon:
      "bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600 border-amber-200",
    iconHover:
      "group-hover:from-amber-500 group-hover:to-yellow-500 group-hover:text-white",
    title: "group-hover:text-amber-600",
    explore: "text-amber-600",
    glow: "bg-amber-200/30",
  },
];

const EventCategories = () => {
  const categories = eventCategories.slice(0, 8);

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-violet-50/40 to-cyan-50/50 px-4 py-20 sm:px-6 lg:px-8">
      {/* Background Decorative Blurs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-pink-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-700 shadow-sm backdrop-blur-sm"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-sm">
              <Compass className="h-3.5 w-3.5 text-white" />
            </span>

            Cultural & Corporate Specializations
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          >
            Tailored Planning for{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
              Every Milestone
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base"
          >
            Select an occasion to explore ceremony blueprints, authentic
            banana-leaf catering options, and verified Tamil Nadu artisans.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
          {categories.map((cat, idx) => {
            const Icon = categoryIconMap[cat.id] || Sparkles;
            const theme = categoryThemes[idx % categoryThemes.length];

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: "easeOut",
                }}
              >
                <Link
                  to={`/events?category=${cat.id}`}
                  className={`group relative block h-full overflow-hidden rounded-2xl border p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${theme.card} ${theme.hover}`}
                >
                  {/* Card Glow */}
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150 ${theme.glow}`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                    className={`relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-300 ${theme.icon} ${theme.iconHover}`}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>

                  {/* Category Name */}
                  <h3
                    className={`relative text-sm font-extrabold text-slate-900 transition-colors duration-300 ${theme.title}`}
                  >
                    {cat.name}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-1.5 line-clamp-2 min-h-[32px] text-xs leading-relaxed text-slate-500">
                    {cat.description ||
                      "Verified vendors & custom run-of-show"}
                  </p>

                  {/* Explore */}
                  <span
                    className={`relative mt-4 inline-flex items-center gap-1 text-[11px] font-extrabold transition-all duration-300 group-hover:gap-2 ${theme.explore}`}
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>

                  {/* Bottom Gradient Accent */}
                  <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 transition-all duration-500 group-hover:w-2/3" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            to="/events"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-600 hover:shadow-md"
          >
            <span>View all celebration categories & event formats</span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventCategories;