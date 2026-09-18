import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Award,
  Camera,
  Users,
  ShieldCheck,
  Check,
  Sparkles,
  Heart,
  Zap,
} from "lucide-react";

import { getEventById } from "../../data/events";
import { formatDate } from "../../utils/formatDate";
import Button from "../../components/common/Button";

const formatINR = (val) => {
  if (!val) return "Flexible";
  if (typeof val === "string") return val;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
};

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = getEventById(eventId);

  /* =========================================================
     EVENT NOT FOUND
  ========================================================= */

  if (!event) {
    return (
      <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-12">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -20, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-300 shadow-2xl shadow-violet-500/10"
          >
            <CalendarDays className="h-9 w-9" />
          </motion.div>

          <h1 className="mt-7 font-display text-3xl font-black tracking-tight sm:text-4xl">
            Event Not Found
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
            We couldn't locate the celebration package you requested. It may
            have been renamed or relocated.
          </p>

          <div className="mt-7">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/events")}
              icon={<ArrowLeft className="h-4 w-4" />}
              className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              Back to Celebrations
            </Button>
          </div>
        </motion.div>
      </main>
    );
  }

  /* =========================================================
     DATA HELPERS
  ========================================================= */

  const galleryImages = Array.isArray(event.gallery) ? event.gallery : [];
  const highlights = Array.isArray(event.highlights) ? event.highlights : [];
  const services = Array.isArray(event.services) ? event.services : [];
  const mainImage = event.image || "/images/hero_mandapam.jpg";

  return (
    <main className="overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 px-5 pb-4 pt-24 text-white sm:px-8 sm:pt-28 lg:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-7xl items-center gap-2 overflow-hidden text-xs text-slate-400 sm:text-sm">
          <Link
            to="/"
            className="shrink-0 transition-colors hover:text-fuchsia-300"
          >
            Home
          </Link>

          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-600" />

          <Link
            to="/events"
            className="shrink-0 transition-colors hover:text-violet-300"
          >
            Celebrations & Rituals
          </Link>

          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-600" />

          <span className="truncate font-semibold text-slate-200">
            {event.title}
          </span>
        </div>
      </section>

      {/* =====================================================
          HERO IMAGE BANNER
      ===================================================== */}

      <section className="relative bg-slate-950 px-5 pb-10 pt-5 sm:px-8 lg:px-12 lg:pb-14 lg:pt-7">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-violet-950/30 to-transparent" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl shadow-violet-950/30"
          >
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              src={mainImage}
              alt={event.title}
              className="aspect-[16/8] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />

            {/* Multi-color overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/10" />

            <div className="absolute inset-0 bg-gradient-to-r from-violet-950/30 via-transparent to-fuchsia-950/20" />

            {/* Floating decoration */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-8 top-8 hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-amber-300 backdrop-blur-md sm:flex"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>

            {/* Hero content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12">
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-lg">
                    {event.categoryName || event.category}
                  </span>

                  {event.featured && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-fuchsia-500/20"
                    >
                      <Award className="h-3.5 w-3.5" />
                      Featured Celebration
                    </motion.span>
                  )}

                  <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-medium text-cyan-200 backdrop-blur-md">
                    Tamil Nadu Certified
                  </span>
                </div>

                <h1 className="mt-5 font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  {event.title}
                </h1>

                <p className="mt-4 max-w-3xl text-xs leading-6 text-slate-200 sm:text-sm">
                  {event.shortDescription || event.description}
                </p>

                {/* Hero accent line */}
                <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="relative bg-gradient-to-br from-slate-50 via-violet-50/30 to-rose-50/20 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-100px] top-40 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
          <div className="absolute right-[-100px] top-96 h-80 w-80 rounded-full bg-fuchsia-300/15 blur-3xl" />
          <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-6">
            {/* Event Key Metrics */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
              {[
                {
                  icon: CalendarDays,
                  label: "Auspicious Date",
                  value: event.date
                    ? formatDate(event.date)
                    : "Flexible Dates",
                  gradient: "from-violet-500 to-fuchsia-500",
                  bg: "bg-violet-50",
                  text: "text-violet-700",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: event.location || "Tamil Nadu Venues",
                  gradient: "from-cyan-500 to-blue-500",
                  bg: "bg-cyan-50",
                  text: "text-cyan-700",
                },
                {
                  icon: Users,
                  label: "Invited Guests",
                  value: event.guestCount
                    ? `${event.guestCount} Guests`
                    : "Custom Count",
                  gradient: "from-amber-400 to-orange-500",
                  bg: "bg-amber-50",
                  text: "text-amber-700",
                },
                {
                  icon: Clock3,
                  label: "Ceremony Duration",
                  value: event.duration || "Multi-Session",
                  gradient: "from-rose-500 to-pink-500",
                  bg: "bg-rose-50",
                  text: "text-rose-700",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.07,
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.015,
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-white bg-white p-4 shadow-lg shadow-slate-200/50"
                  >
                    <div
                      className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${item.gradient}`}
                    />

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} ${item.text} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </div>

                    <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.label}
                    </p>

                    <p className="mt-1 line-clamp-1 text-sm font-bold text-slate-900">
                      {item.value}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* About Event */}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white p-6 shadow-xl shadow-violet-100/40 sm:p-8"
            >
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-100/60 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  Celebration Overview
                </div>

                <h2 className="mt-4 font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Sacred Tradition{" "}
                  <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    & Flawless Coordination
                  </span>
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {event.description ||
                    "A complete Tamil Nadu celebration blueprint orchestrating authentic rituals, master artisans, and guest hospitality."}
                </p>
              </div>
            </motion.section>

            {/* Highlights */}

            {highlights.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-amber-100 bg-white p-6 shadow-xl shadow-amber-100/30 sm:p-8"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  Key Rituals & Inclusions
                </div>

                <h2 className="mt-4 font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
                  What Makes This Occasion{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent">
                    Special
                  </span>
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={`${highlight}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.05,
                      }}
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-gradient-to-r from-amber-50/60 to-rose-50/40 p-3.5"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
                        <Check className="h-3.5 w-3.5" />
                      </span>

                      <span className="text-xs font-medium leading-relaxed text-slate-700 sm:text-sm">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Services */}

            {services.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-xl shadow-cyan-100/30 sm:p-8"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-100">
                    <Zap className="h-4 w-4" />
                  </span>
                  Coordinated Services
                </div>

                <h2 className="mt-4 font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Artisans{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    & Vendor Units
                  </span>
                </h2>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {services.map((service, index) => {
                    const serviceName =
                      typeof service === "string"
                        ? service
                        : service?.name || service?.title;

                    if (!serviceName) return null;

                    return (
                      <motion.div
                        key={`${serviceName}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.04,
                        }}
                        whileHover={{
                          y: -3,
                          scale: 1.02,
                        }}
                        className="flex items-center gap-2 rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 sm:text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                        {serviceName}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            )}

            {/* Gallery */}

            {galleryImages.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-fuchsia-100 bg-white p-6 shadow-xl shadow-fuchsia-100/30 sm:p-8"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fuchsia-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-fuchsia-100">
                    <Camera className="h-4 w-4" />
                  </span>
                  Visual Showcase
                </div>

                <h2 className="mt-4 font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Event Highlights{" "}
                  <span className="bg-gradient-to-r from-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
                    & Moments
                  </span>
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {galleryImages.map((img, index) => (
                    <motion.div
                      key={`${img}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      whileHover={{ y: -5 }}
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md"
                    >
                      <motion.img
                        src={img}
                        alt="Celebration moment"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-bold text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                        Moment {index + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* =================================================
              RIGHT COLUMN: SIDEBAR
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="overflow-hidden rounded-3xl border border-white bg-white shadow-2xl shadow-violet-200/50"
            >
              {/* Sidebar Header */}

              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-900 to-fuchsia-800 p-6 text-white">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-fuchsia-400/20 blur-3xl" />

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-fuchsia-200 backdrop-blur-md"
                >
                  <CalendarCheck2 className="h-5 w-5" />
                </motion.div>

                <p className="relative mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-fuchsia-200">
                  Turnkey Ceremony Blueprint
                </p>

                <h2 className="relative mt-2 font-display text-xl font-extrabold">
                  Customize This Package
                </h2>

                <p className="relative mt-2 text-xs leading-5 text-violet-100">
                  Lock verified mandapams, Chettinad catering, and Nadaswaram
                  ensembles for your auspicious date.
                </p>

                <div className="relative mt-5 h-px bg-gradient-to-r from-fuchsia-300/50 via-violet-300/20 to-transparent" />
              </div>

              {/* Budget Estimation */}

              <div className="border-b border-slate-100 bg-gradient-to-br from-white to-violet-50/40 p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Estimated Investment
                </p>

                <div className="mt-1 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500 bg-clip-text text-2xl font-black text-transparent">
                  {event.budgetRange || formatINR(event.budget)}
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Includes venue, mandapam floral decor, catering & Vedic
                  vidwans
                </p>
              </div>

              {/* Guest Count */}

              {event.guestCount && (
                <div className="border-b border-slate-100 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                      <Users className="h-[18px] w-[18px]" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Target Capacity
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-slate-900">
                        {event.guestCount} Guests
                        <span className="ml-1 text-xs font-medium text-cyan-600">
                          (Expandable)
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Verified Trust Badge */}

              <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-cyan-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <p className="text-xs leading-relaxed text-slate-600">
                    <strong className="font-bold text-slate-900">
                      Tamil Nadu Verified:
                    </strong>{" "}
                    Price guarantee, advance escrow protection, and 100%
                    replacement guarantee on artisans.
                  </p>
                </div>
              </div>

              {/* Actions */}

              <div className="space-y-3 p-5">
                <Button
                  to={`/ai-planner?type=${event.category || "wedding"}`}
                  size="lg"
                  className="group w-full justify-center bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 font-bold text-white shadow-lg shadow-fuchsia-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-500/30"
                  icon={
                    <CalendarCheck2 className="h-4 w-4 transition-transform group-hover:rotate-6" />
                  }
                >
                  Plan With AI Architect
                </Button>

                <Link
                  to="/vendors"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 py-3 text-xs font-bold text-violet-700 transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-100 sm:text-sm"
                >
                  Browse Matching Vendors
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={() => navigate("/events")}
                  className="flex w-full items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-400 transition-colors hover:text-violet-700"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to all celebrations
                </button>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-12">
        {/* Animated background */}
        <motion.div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-32 right-[-50px] h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-violet-900/60 via-fuchsia-900/40 to-rose-900/50 p-8 shadow-2xl shadow-violet-950/30 sm:p-10 lg:p-12">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-200">
                  <Heart className="h-3 w-3" />
                  Your Celebration Awaits
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
                  Ready to Lock Your Auspicious Date?
                </p>

                <h2 className="mt-3 font-display text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                  Customize this celebration with{" "}
                  <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-rose-300 bg-clip-text text-transparent">
                    Tamil Nadu's elite artisans.
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl text-xs leading-6 text-slate-300 sm:text-sm">
                  Get an instant breakdown of Muhurtham timings, mandapam
                  availability, and per-leaf Chettinad catering quotes.
                </p>
              </div>

              <Button
                to="/ai-planner"
                size="lg"
                className="group shrink-0 bg-white px-6 font-bold text-violet-800 shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-100 hover:shadow-2xl"
                icon={
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                }
              >
                Start Free AI Plan
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventDetails;