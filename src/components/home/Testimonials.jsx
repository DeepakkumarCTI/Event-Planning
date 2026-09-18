import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { testimonials } from "../../data/testimonials";

const testimonialThemes = [
  {
    card: "from-orange-50 via-white to-yellow-50",
    border: "border-orange-200",
    quote: "text-orange-200",
    badgeBg: "bg-orange-50",
    badgeBorder: "border-orange-200",
    badgeText: "text-orange-700",
    badgeIcon: "text-orange-600",
    avatarBorder: "border-orange-500",
    role: "text-orange-700",
    divider: "border-orange-100",
    buttonBorder: "border-orange-200",
    buttonText: "text-orange-700",
    buttonHover: "hover:bg-orange-500 hover:border-orange-500",
    number: "text-orange-700",
    dot: "bg-orange-500",
  },
  {
    card: "from-yellow-50 via-white to-amber-50",
    border: "border-yellow-200",
    quote: "text-yellow-200",
    badgeBg: "bg-yellow-50",
    badgeBorder: "border-yellow-200",
    badgeText: "text-yellow-800",
    badgeIcon: "text-yellow-600",
    avatarBorder: "border-yellow-500",
    role: "text-yellow-700",
    divider: "border-yellow-100",
    buttonBorder: "border-yellow-200",
    buttonText: "text-yellow-700",
    buttonHover: "hover:bg-yellow-500 hover:border-yellow-500",
    number: "text-yellow-700",
    dot: "bg-yellow-500",
  },
  {
    card: "from-emerald-50 via-white to-green-50",
    border: "border-emerald-200",
    quote: "text-emerald-200",
    badgeBg: "bg-emerald-50",
    badgeBorder: "border-emerald-200",
    badgeText: "text-emerald-700",
    badgeIcon: "text-emerald-600",
    avatarBorder: "border-emerald-500",
    role: "text-emerald-700",
    divider: "border-emerald-100",
    buttonBorder: "border-emerald-200",
    buttonText: "text-emerald-700",
    buttonHover: "hover:bg-emerald-500 hover:border-emerald-500",
    number: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  {
    card: "from-sky-50 via-white to-blue-50",
    border: "border-sky-200",
    quote: "text-sky-200",
    badgeBg: "bg-sky-50",
    badgeBorder: "border-sky-200",
    badgeText: "text-sky-700",
    badgeIcon: "text-sky-600",
    avatarBorder: "border-sky-500",
    role: "text-sky-700",
    divider: "border-sky-100",
    buttonBorder: "border-sky-200",
    buttonText: "text-sky-700",
    buttonHover: "hover:bg-sky-500 hover:border-sky-500",
    number: "text-sky-700",
    dot: "bg-sky-500",
  },
  {
    card: "from-pink-50 via-white to-rose-50",
    border: "border-pink-200",
    quote: "text-pink-200",
    badgeBg: "bg-pink-50",
    badgeBorder: "border-pink-200",
    badgeText: "text-pink-700",
    badgeIcon: "text-pink-600",
    avatarBorder: "border-pink-500",
    role: "text-pink-700",
    divider: "border-pink-100",
    buttonBorder: "border-pink-200",
    buttonText: "text-pink-700",
    buttonHover: "hover:bg-pink-500 hover:border-pink-500",
    number: "text-pink-700",
    dot: "bg-pink-500",
  },
  {
    card: "from-violet-50 via-white to-purple-50",
    border: "border-violet-200",
    quote: "text-violet-200",
    badgeBg: "bg-violet-50",
    badgeBorder: "border-violet-200",
    badgeText: "text-violet-700",
    badgeIcon: "text-violet-600",
    avatarBorder: "border-violet-500",
    role: "text-violet-700",
    divider: "border-violet-100",
    buttonBorder: "border-violet-200",
    buttonText: "text-violet-700",
    buttonHover: "hover:bg-violet-500 hover:border-violet-500",
    number: "text-violet-700",
    dot: "bg-violet-500",
  },
  {
    card: "from-red-50 via-white to-orange-50",
    border: "border-red-200",
    quote: "text-red-200",
    badgeBg: "bg-red-50",
    badgeBorder: "border-red-200",
    badgeText: "text-red-700",
    badgeIcon: "text-red-600",
    avatarBorder: "border-red-500",
    role: "text-red-700",
    divider: "border-red-100",
    buttonBorder: "border-red-200",
    buttonText: "text-red-700",
    buttonHover: "hover:bg-red-500 hover:border-red-500",
    number: "text-red-700",
    dot: "bg-red-500",
  },
  {
    card: "from-cyan-50 via-white to-teal-50",
    border: "border-cyan-200",
    quote: "text-cyan-200",
    badgeBg: "bg-cyan-50",
    badgeBorder: "border-cyan-200",
    badgeText: "text-cyan-700",
    badgeIcon: "text-cyan-600",
    avatarBorder: "border-cyan-500",
    role: "text-cyan-700",
    divider: "border-cyan-100",
    buttonBorder: "border-cyan-200",
    buttonText: "text-cyan-700",
    buttonHover: "hover:bg-cyan-500 hover:border-cyan-500",
    number: "text-cyan-700",
    dot: "bg-cyan-500",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = testimonials.slice(0, 4);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? items.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === items.length - 1 ? 0 : curr + 1));
  };

  const active = items[currentIndex] || items[0];

  const theme =
    testimonialThemes[currentIndex % testimonialThemes.length];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-slate-50 to-yellow-50/40 px-4 py-20 sm:px-6 lg:px-8">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl"
        />

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
          className="absolute left-[35%] top-[20%] h-64 w-64 rounded-full bg-yellow-200/20 blur-3xl"
        />

        <div className="absolute bottom-[15%] right-[25%] h-56 w-56 rounded-full bg-emerald-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-700 shadow-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>

            Verified Host Testimonials
          </div>

          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
              Families & Corporate Hosts
            </span>
          </h2>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            <span className="h-1 w-8 rounded-full bg-orange-400" />
            <span className="h-1 w-12 rounded-full bg-yellow-400" />
            <span className="h-1 w-8 rounded-full bg-emerald-400" />
            <span className="h-1 w-10 rounded-full bg-sky-400" />
            <span className="h-1 w-8 rounded-full bg-pink-400" />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Real feedback from celebrations across Chennai, Coimbatore,
            Madurai, and Trichy planned with Eventara.
          </p>
        </motion.div>

        {/* ================= SPOTLIGHT CARD ================= */}
        <motion.div
          layout
          className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${theme.card} ${theme.border} p-6 shadow-[0_25px_70px_rgba(15,23,42,0.09)] sm:p-10`}
        >
          {/* Decorative Quote */}
          <Quote
            className={`pointer-events-none absolute right-6 top-6 h-20 w-20 opacity-70 sm:right-8 sm:top-8 sm:h-24 sm:w-24 ${theme.quote}`}
          />

          {/* Top Color Strip */}
          <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-orange-400 via-pink-500 via-violet-500 to-sky-500" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="relative space-y-6"
            >
              {/* ================= RATING ================= */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.2,
                      }}
                    >
                      <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                    </motion.div>
                  ))}
                </div>

                <span
                  className={`ml-1 flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold shadow-sm ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}
                >
                  <ShieldCheck
                    className={`h-3.5 w-3.5 ${theme.badgeIcon}`}
                  />
                  Verified Host
                </span>
              </div>

              {/* ================= QUOTE ================= */}
              <div className="relative max-w-4xl">
                <p className="text-base font-medium italic leading-relaxed text-slate-800 sm:text-xl">
                  "{active.review ||
                    active.content ||
                    active.quote ||
                    active.comment}"
                </p>
              </div>

              {/* ================= AUTHOR SECTION ================= */}
              <div
                className={`flex flex-wrap items-center justify-between gap-5 border-t pt-5 ${theme.divider}`}
              >
                {/* Author */}
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={
                        active.image ||
                        active.avatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
                      }
                      alt={active.name || active.author}
                      className={`h-12 w-12 rounded-full border-2 object-cover shadow-sm ${theme.avatarBorder}`}
                    />

                    <span
                      className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${theme.dot}`}
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-extrabold text-slate-900">
                      {active.name || active.author}
                    </h4>

                    <p
                      className={`text-xs font-bold ${theme.role}`}
                    >
                      {active.role ||
                        active.eventType ||
                        "Event Host"}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      {active.location || "Chennai, Tamil Nadu"}
                    </p>
                  </div>
                </div>

                {/* ================= NAVIGATION ================= */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-white text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-md ${theme.buttonBorder} ${theme.buttonText} ${theme.buttonHover}`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  <div
                    className={`min-w-[58px] text-center text-xs font-extrabold ${theme.number}`}
                  >
                    {currentIndex + 1}{" "}
                    <span className="text-slate-400">/</span>{" "}
                    {items.length}
                  </div>

                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-white text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-md ${theme.buttonBorder} ${theme.buttonText} ${theme.buttonHover}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* ================= SLIDE INDICATORS ================= */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? `w-8 ${theme.dot}`
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ================= BOTTOM TRUST BAR ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-[11px] font-bold text-emerald-700 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Verified Reviews
          </div>

          <div className="flex items-center gap-2 rounded-full border border-yellow-100 bg-white px-4 py-2 text-[11px] font-bold text-yellow-700 shadow-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
            4.98/5 Rating
          </div>

          <div className="flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-[11px] font-bold text-sky-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-sky-500" />
            Trusted Event Planning
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;