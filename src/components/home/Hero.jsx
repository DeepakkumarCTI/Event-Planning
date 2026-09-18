
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  Utensils,
  Camera,
} from "lucide-react";

const Hero = () => {
  const [promptInput, setPromptInput] = useState("");
  const navigate = useNavigate();

  const handlePromptSubmit = (e) => {
    e.preventDefault();

    if (promptInput.trim()) {
      navigate(
        `/ai-planner?prompt=${encodeURIComponent(promptInput.trim())}`
      );
    } else {
      navigate("/ai-planner");
    }
  };

  const samplePrompts = [
    "Traditional Muhurtham for 500 guests in Chennai under ₹15 Lakhs",
    "Grand Reception at Mayor Ramanathan Chettiar Hall for 800 guests",
    "Corporate AI Summit at OMR Chennai for 250 delegates",
  ];

  return (
   
<section className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-slate-200 px-4 pb-20 pt-32 sm:px-6 lg:px-8">

  {/* ================= BACKGROUND IMAGE ================= */}
  <div className="absolute inset-0">
    <img
      src="/images/hero_mandapam.jpg"
      alt="Traditional South Indian Wedding Mandapam"
      className="h-full w-full object-cover object-center"
    />
  </div>

  {/* ================= DARK IMAGE OVERLAY ================= */}
  <div className="absolute inset-0 bg-slate-950/55" />

  {/* ================= LEFT SIDE READABILITY ================= */}
  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-transparent" />

  {/* ================= BOTTOM IMAGE FADE ================= */}
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/40 to-transparent" />

  {/* ================= SUBTLE COLOR GLOW ================= */}
  <motion.div
    animate={{
      x: [0, 30, 0],
      y: [0, -15, 0],
      opacity: [0.15, 0.25, 0.15],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-sky-400/20 blur-3xl"
  />

  <motion.div
    animate={{
      x: [0, -25, 0],
      y: [0, 20, 0],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="pointer-events-none absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-orange-400/20 blur-3xl"
  />

  {/* ================= CONTENT ================= */}
  <div className="relative z-10 mx-auto w-full max-w-7xl">
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

      {/* ================= LEFT COLUMN ================= */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="space-y-6 text-left lg:col-span-7"
      >

        {/* ================= PILL TAG ================= */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/30">
            <ShieldCheck className="h-3.5 w-3.5 text-white" />
          </span>

          <span>
            Tamil Nadu Event Planning Operating System
          </span>
        </motion.div>

        {/* ================= MAIN HEADING ================= */}
        <h1 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-2xl sm:text-5xl lg:text-[52px]">
          Curate Magnificent Celebrations with{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
            Precision Planning
          </span>
        </h1>

        {/* ================= COLOR ACCENT ================= */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-10 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/40" />
          <span className="h-1.5 w-16 rounded-full bg-orange-400 shadow-lg shadow-orange-400/40" />
          <span className="h-1.5 w-10 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />
          <span className="h-1.5 w-14 rounded-full bg-sky-400 shadow-lg shadow-sky-400/40" />
        </div>

        {/* ================= SUBHEADING ================= */}
        <p className="max-w-2xl text-base leading-relaxed text-white/90 drop-shadow-lg sm:text-lg">
          From auspicious Tamil Muhurthams and grand Chettinad receptions
          to premier Chennai corporate summits. Eventara orchestrates
          verified elite artisans, minute-by-minute ceremonial schedules,
          and real-time INR budget tracking.
        </p>

        {/* ================= TRUST INDICATORS ================= */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-2 text-xs text-white sm:gap-x-5">

          {/* Verified Vendors */}
          <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2 shadow-lg backdrop-blur-md">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
            </span>

            <span className="font-medium">
              100% Verified Tamil Nadu Vendors
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2 shadow-lg backdrop-blur-md">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/20">
              <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
            </span>

            <span className="font-medium">
              4.98/5 Host Satisfaction Rating
            </span>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2 shadow-lg backdrop-blur-md">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20">
              <Clock className="h-4 w-4 text-sky-300" />
            </span>

            <span className="font-medium">
              Instant Ceremonial Timeline
            </span>
          </div>

        </div>
      </motion.div>

      {/* ================= RIGHT COLUMN ================= */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.94,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: "easeOut",
        }}
        className="relative lg:col-span-5"
      >

        {/* ================= DECORATIVE GLOW ================= */}
        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-yellow-300/20 via-pink-300/20 to-sky-300/20 blur-2xl" />

        {/* ================= BLUEPRINT CARD ================= */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/30 bg-white/95 shadow-[0_25px_70px_rgba(0,0,0,0.30)] backdrop-blur-xl">

          {/* ================= IMAGE ================= */}
          <div className="relative h-48 w-full overflow-hidden bg-slate-100 sm:h-56">

            <img
              src="/images/hero.jpg"
              alt="Traditional South Indian Wedding Mandapam"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            {/* Top Accent */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500" />

            {/* Image Content */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">

              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-300">
                  Live Blueprint Preview
                </div>

                <div className="text-sm font-extrabold">
                  Grand Chettinad Muhurtham & Reception
                </div>
              </div>

              <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-500/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg">
                <CheckCircle2 className="h-3 w-3" />
                Feasible
              </span>

            </div>
          </div>

          {/* ================= BLUEPRINT DETAILS ================= */}
          <div className="space-y-5 p-5">

            {/* ================= METRICS ================= */}
            <div className="grid grid-cols-3 gap-2.5">

              <div className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wide text-violet-500">
                  Guest Count
                </div>

                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  650 Guests
                </div>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                  Budget Target
                </div>

                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  ₹16,50,000
                </div>
              </div>

              <div className="rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wide text-orange-600">
                  Muhurtham Lagna
                </div>

                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  08:45 AM
                </div>
              </div>

            </div>

            {/* ================= VENDOR ALLOCATIONS ================= */}
            <div className="space-y-2.5">

              <div className="flex items-center justify-between">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Verified Vendor Allocations
                </div>

                <span className="text-[10px] font-bold text-emerald-600">
                  2 MATCHED
                </span>
              </div>

              {/* Caterer */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50/80 to-yellow-50/50 p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100">

                <div className="flex min-w-0 items-center gap-2.5">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-white text-orange-600 shadow-sm">
                    <Utensils className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-xs font-bold text-slate-900">
                      Sri Meenakshi Grand Caterers
                    </div>

                    <div className="mt-0.5 truncate text-[10px] text-slate-500">
                      24-Item Royal Banana Leaf Feast
                    </div>
                  </div>

                </div>

                <span className="shrink-0 text-xs font-extrabold text-orange-700">
                  ₹650/leaf
                </span>

              </div>

              {/* Photography */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-sky-100 bg-gradient-to-r from-sky-50/80 to-blue-50/50 p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-100">

                <div className="flex min-w-0 items-center gap-2.5">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-600 shadow-sm">
                    <Camera className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-xs font-bold text-slate-900">
                      Madras Lens Studios
                    </div>

                    <div className="mt-0.5 truncate text-[10px] text-slate-500">
                      Traditional Muhurtham & 4K Cinema
                    </div>
                  </div>

                </div>

                <span className="shrink-0 text-xs font-extrabold text-sky-700">
                  ₹85,000
                </span>

              </div>

            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex items-center gap-3 border-t border-slate-100 pt-3">

              <Link
                to="/ai-planner"
                className="group/plan flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 text-xs font-extrabold text-white shadow-md shadow-emerald-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-200"
              >
                <span>
                  Customize Full Plan
                </span>

                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/plan:translate-x-1" />
              </Link>

              <Link
                to="/vendors"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
              >
                Browse Vendors
              </Link>

            </div>

          </div>
        </div>

        {/* ================= FLOATING BADGE ================= */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-3 -top-4 hidden rounded-2xl border border-yellow-200 bg-white px-3 py-2 shadow-xl sm:block"
        >
          <div className="flex items-center gap-2">

            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md">
              <Star className="h-3.5 w-3.5 fill-white text-white" />
            </span>

            <div>
              <div className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                Planning Score
              </div>

              <div className="text-xs font-extrabold text-slate-900">
                98% Matched
              </div>
            </div>

          </div>
        </motion.div>

      </motion.div>
    </div>
  </div>
</section>




  );
};

export default Hero;


