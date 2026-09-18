import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Calculator,
  Clock,
} from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Instant AI Ceremony Blueprints",
    description:
      "Enter your guest count, city, and budget. Eventara AI synthesizes auspicious Muhurtham timelines, itemized INR budgets, and verified Tamil Nadu vendor allocations in under 30 seconds.",
    theme: {
      card: "from-orange-50 via-white to-yellow-50",
      border: "border-orange-200",
      hover: "hover:border-orange-400 hover:shadow-orange-100",
      icon: "from-orange-500 to-amber-500",
      iconRing: "border-orange-200",
      title: "text-orange-700",
      badge: "bg-orange-50 border-orange-200 text-orange-700",
      accent: "bg-orange-400",
    },
  },
  {
    icon: ShieldCheck,
    title: "100% Vetted Tamil Nadu Artisans",
    description:
      "We rigorously verify traditional Chettinad caterers, Thiruvarur Nadaswaram vidwans, Tanjore floral decorators, and candid cinematographers for SLA reliability.",
    theme: {
      card: "from-emerald-50 via-white to-green-50",
      border: "border-emerald-200",
      hover: "hover:border-emerald-400 hover:shadow-emerald-100",
      icon: "from-emerald-500 to-green-600",
      iconRing: "border-emerald-200",
      title: "text-emerald-700",
      badge: "bg-emerald-50 border-emerald-200 text-emerald-700",
      accent: "bg-emerald-400",
    },
  },
  {
    icon: Calculator,
    title: "Smart INR Budget Guardrails",
    description:
      "Never lose sight of expenses. Allocate Kalyana Mandapam advances, catering costs per leaf, and bridal couture with real-time overspend alerts.",
    theme: {
      card: "from-sky-50 via-white to-blue-50",
      border: "border-sky-200",
      hover: "hover:border-sky-400 hover:shadow-sky-100",
      icon: "from-sky-500 to-blue-600",
      iconRing: "border-sky-200",
      title: "text-sky-700",
      badge: "bg-sky-50 border-sky-200 text-sky-700",
      accent: "bg-sky-400",
    },
  },
  {
    icon: Clock,
    title: "Minute-by-Minute Ritual Cues",
    description:
      "Keep family elders, Vadhyar priests, caterers, and photographers aligned with a synchronized day-of run-of-show schedule accessible on any mobile device.",
    theme: {
      card: "from-violet-50 via-white to-purple-50",
      border: "border-violet-200",
      hover: "hover:border-violet-400 hover:shadow-violet-100",
      icon: "from-violet-500 to-purple-600",
      iconRing: "border-violet-200",
      title: "text-violet-700",
      badge: "bg-violet-50 border-violet-200 text-violet-700",
      accent: "bg-violet-400",
    },
  },
];

const stats = [
  {
    value: "30s",
    label: "AI Plan Generation",
    sub: "Instant feasibility",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    value: "99.8%",
    label: "Lagna Synchronization",
    sub: "On-time rituals",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    value: "70+",
    label: "Verified TN Vendors",
    sub: "Chennai, CBE & Madurai",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    value: "₹45 Cr+",
    label: "Budgets Managed",
    sub: "INR precision tracking",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
];

const WhyChooseUs = () => {
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
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl"
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
          className="absolute left-[30%] top-[18%] h-64 w-64 rounded-full bg-pink-200/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[20%] right-[20%] h-56 w-56 rounded-full bg-emerald-200/20 blur-3xl"
        />

        <div className="absolute left-[15%] top-[55%] h-40 w-40 rounded-full bg-violet-200/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-pink-700 shadow-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>

            The Eventara Advantage
          </div>

          {/* Heading */}
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Why Modern Planners Choose{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
              Eventara
            </span>
          </h2>

          {/* Color Accent */}
          <div className="mt-5 flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-8 rounded-full bg-orange-400" />
            <span className="h-1.5 w-12 rounded-full bg-yellow-400" />
            <span className="h-1.5 w-8 rounded-full bg-emerald-400" />
            <span className="h-1.5 w-10 rounded-full bg-sky-400" />
            <span className="h-1.5 w-8 rounded-full bg-pink-400" />
            <span className="h-1.5 w-10 rounded-full bg-violet-400" />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Replacing fragmented phone calls and notebook calculations with
            an enterprise-grade operating system designed for Indian
            celebrations.
          </p>
        </motion.div>

        {/* ================= 4 CORE PILLARS ================= */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const theme = pillar.theme;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all duration-300 ${theme.card} ${theme.border} ${theme.hover}`}
              >
                {/* Top Accent */}
                <div
                  className={`absolute left-0 right-0 top-0 h-1 ${theme.accent}`}
                />

                {/* Soft Decorative Circle */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/60 blur-2xl" />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 4,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br shadow-md ${theme.icon} ${theme.iconRing}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </motion.div>

                {/* Title + Pillar */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3
                    className={`font-display text-lg font-extrabold leading-snug transition-colors duration-300 ${theme.title}`}
                  >
                    {pillar.title}
                  </h3>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${theme.badge}`}
                  >
                    Pillar {idx + 1}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {pillar.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-5 flex items-center gap-1.5">
                  <span
                    className={`h-1 w-6 rounded-full ${theme.accent}`}
                  />
                  <span className="h-1 w-2 rounded-full bg-slate-200" />
                  <span className="h-1 w-2 rounded-full bg-slate-200" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= STATS STRIP ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8"
        >
          {/* Gradient Top Border */}
          <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-orange-400 via-yellow-400 via-emerald-400 via-sky-400 via-pink-400 to-violet-500" />

          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-pink-100/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-sky-100/50 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                }}
                className={`rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5 ${
                  stat.bg
                } ${stat.border} ${
                  i !== 0 ? "lg:border-l" : ""
                }`}
              >
                <div
                  className={`font-display text-3xl font-extrabold sm:text-4xl ${stat.color}`}
                >
                  {stat.value}
                </div>

                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  {stat.label}
                </div>

                <div
                  className={`mt-1 text-xs font-semibold ${stat.color}`}
                >
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= COLORFUL BOTTOM ACCENT ================= */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          <span className="h-2 w-2 rounded-full bg-pink-400" />
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;