import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Layers,
  CalendarCheck2,
  Users,
  Sparkles,
  Star,
  ShieldCheck,
  Zap,
  Heart,
  Crown,
  CircleCheck,
} from "lucide-react";

import {
  getServiceById,
  services,
} from "../../data/services";

import Button from "../../components/common/Button";
import formatCurrency from "../../utils/formatCurrency";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = getServiceById(serviceId);

  /* =========================================================
     SERVICE NOT FOUND
  ========================================================= */

  if (!service) {
    return (
      <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-950 px-5">

        {/* Background Glow */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-white p-8 text-center shadow-2xl"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-violet-700">
            <Layers className="h-7 w-7" />
          </div>

          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Service not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            The service you are looking for may have been
            removed or the link may be incorrect.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              to="/services"
              variant="primary"
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              Browse Services
            </Button>

            <Button to="/" variant="outline">
              Go Home
            </Button>
          </div>
        </motion.div>
      </main>
    );
  }

  /* =========================================================
     RELATED SERVICES
  ========================================================= */

  const relatedServices = services
    .filter(
      (item) =>
        item.id !== service.id &&
        item.category === service.category
    )
    .slice(0, 3);

  /* =========================================================
     COLOR THEMES
  ========================================================= */

  const featureThemes = [
    {
      wrapper:
        "border-violet-200 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-white",
      icon:
        "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
      check:
        "bg-violet-100 text-violet-700",
    },
    {
      wrapper:
        "border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-white",
      icon:
        "bg-gradient-to-br from-cyan-500 to-blue-500 text-white",
      check:
        "bg-cyan-100 text-cyan-700",
    },
    {
      wrapper:
        "border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white",
      icon:
        "bg-gradient-to-br from-rose-500 to-pink-500 text-white",
      check:
        "bg-rose-100 text-rose-700",
    },
    {
      wrapper:
        "border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white",
      icon:
        "bg-gradient-to-br from-amber-500 to-orange-500 text-white",
      check:
        "bg-amber-100 text-amber-700",
    },
    {
      wrapper:
        "border-emerald-200 bg-gradient-to-br from-emerald-50 via-lime-50 to-white",
      icon:
        "bg-gradient-to-br from-emerald-500 to-green-500 text-white",
      check:
        "bg-emerald-100 text-emerald-700",
    },
    {
      wrapper:
        "border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white",
      icon:
        "bg-gradient-to-br from-indigo-500 to-blue-600 text-white",
      check:
        "bg-indigo-100 text-indigo-700",
    },
  ];

  const relatedThemes = [
    {
      card:
        "border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50",
      badge:
        "bg-violet-100 text-violet-700 border-violet-200",
      title:
        "group-hover:text-violet-600",
    },
    {
      card:
        "border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50",
      badge:
        "bg-cyan-100 text-cyan-700 border-cyan-200",
      title:
        "group-hover:text-cyan-600",
    },
    {
      card:
        "border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50",
      badge:
        "bg-rose-100 text-rose-700 border-rose-200",
      title:
        "group-hover:text-rose-600",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 sm:pt-32 lg:px-12">

        {/* Animated Background Orbs */}

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -35, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-violet-600/25 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute right-[-120px] top-20 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute bottom-[-180px] left-1/3 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
        />

        {/* Decorative Rings */}

        <div className="pointer-events-none absolute right-10 top-40 hidden h-40 w-40 rounded-full border border-fuchsia-400/10 lg:block" />

        <div className="pointer-events-none absolute right-20 top-50 hidden h-24 w-24 rounded-full border border-cyan-400/10 lg:block" />

        <div className="relative mx-auto max-w-7xl">

          {/* Breadcrumb */}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm"
          >
            <Link
              to="/"
              className="transition-colors hover:text-cyan-300"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <Link
              to="/services"
              className="transition-colors hover:text-fuchsia-300"
            >
              Services
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="max-w-[220px] truncate text-slate-200">
              {service.name}
            </span>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

            {/* =================================================
                IMAGE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                x: -25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-1.5 shadow-2xl shadow-violet-950/40"
            >
              <div className="relative overflow-hidden rounded-[1.6rem]">

                <img
                  src={
                    service.image ||
                    "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80"
                  }
                  alt={service.name}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />

                {/* Image Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-lg backdrop-blur">
                      {service.categoryName}
                    </span>

                    {service.popular && (
                      <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-black text-slate-950 shadow-lg">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        Popular Service
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Glow */}

              <div className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-2/3 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-2xl" />
            </motion.div>

            {/* =================================================
                HERO CONTENT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
            >

              {/* Category */}

              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-violet-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                {service.categoryName}
              </div>

              {/* Title */}

            <h1 className="mt-5 bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
  {service.name}
</h1>

              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />

              {/* Description */}

              <p className="mt-6 text-sm leading-7 text-slate-300 sm:text-base">
                {service.description ||
                  service.shortDescription}
              </p>

              {/* Quick Trust Points */}

              <div className="mt-6 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 p-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-violet-300" />

                    <span className="text-xs font-bold text-violet-200">
                      Event Ready
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-300" />

                    <span className="text-xs font-bold text-cyan-200">
                      Flexible Planning
                    </span>
                  </div>
                </div>

              </div>

              {/* PRICE */}

              <motion.div
                whileHover={{ y: -3 }}
                className="relative mt-7 overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-white/5 p-5 backdrop-blur"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-400/10 blur-2xl" />

                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                    Starting Investment
                  </p>

                  <div className="mt-2 flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-black text-white sm:text-4xl">
                      {service.price
                        ? formatCurrency(service.price)
                        : "Custom Quote"}
                    </span>

                    {service.unit && (
                      <span className="text-sm text-slate-400">
                        {service.unit}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* CTA */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <Button
                  to={`/create-event?service=${service.id}`}
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="border-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 shadow-lg shadow-fuchsia-600/20 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500"
                >
                  Add to Event Plan
                </Button>

                <Button
                  to="/contact"
                  variant="outline"
                  icon={<Phone className="h-4 w-4" />}
                  className="border-white/20 bg-white/5 text-white backdrop-blur hover:border-white hover:bg-white hover:text-slate-900"
                >
                  Enquire Now
                </Button>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE CONTENT
      ===================================================== */}

      <section className="relative px-5 py-16 sm:px-8 lg:px-12">

        {/* Background Decorations */}

        <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-violet-100/60 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-[45%] h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              MAIN
          ================================================= */}

          <div className="space-y-8">

            {/* OVERVIEW */}

            <motion.section
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2rem] border border-violet-200 bg-gradient-to-br from-white via-violet-50/60 to-fuchsia-50/40 p-6 shadow-lg shadow-violet-100/50 sm:p-8"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />

              <div className="relative">

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-300/40">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                      Service Overview
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-slate-900">
                      What we can help with
                    </h2>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
                  {service.description ||
                    service.shortDescription}
                </p>

                {service.shortDescription && (
                  <div className="mt-6 rounded-2xl border border-fuchsia-100 bg-white/80 p-5 shadow-sm">
                    <div className="flex gap-3">
                      <Heart className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-500" />

                      <p className="text-sm leading-6 text-slate-600">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>

            {/* =================================================
                FEATURES
            ================================================= */}

            {Array.isArray(service.features) &&
              service.features.length > 0 && (
                <motion.section
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{ duration: 0.6 }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 sm:p-8"
                >

                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-200">
                      <CircleCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-600">
                        What's Included
                      </p>

                      <h2 className="mt-1 text-2xl font-black text-slate-900">
                        Service features
                      </h2>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">

                    {service.features.map(
                      (feature, index) => {
                        const theme =
                          featureThemes[
                            index %
                              featureThemes.length
                          ];

                        return (
                          <motion.div
                            key={`${feature}-${index}`}
                            initial={{
                              opacity: 0,
                              y: 15,
                            }}
                            whileInView={{
                              opacity: 1,
                              y: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              delay: index * 0.05,
                            }}
                            whileHover={{
                              y: -4,
                              scale: 1.01,
                            }}
                            className={`group rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-lg ${theme.wrapper}`}
                          >
                            <div className="flex items-start gap-3">

                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-md ${theme.icon}`}
                              >
                                <Check className="h-4 w-4" />
                              </span>

                              <span className="pt-1 text-sm font-semibold leading-6 text-slate-700">
                                {feature}
                              </span>

                            </div>
                          </motion.div>
                        );
                      }
                    )}

                  </div>
                </motion.section>
              )}

            {/* =================================================
                SUITABLE FOR
            ================================================= */}

            {Array.isArray(service.suitableFor) &&
              service.suitableFor.length > 0 && (
                <motion.section
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-[2rem] border border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-white p-6 shadow-lg shadow-cyan-100/50 sm:p-8"
                >

                  <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

                  <div className="relative">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-200">
                        <Users className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">
                          Perfect For
                        </p>

                        <h2 className="mt-1 text-2xl font-black text-slate-900">
                          Suitable events
                        </h2>
                      </div>

                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">

                      {service.suitableFor.map(
                        (item, index) => (
                          <motion.span
                            key={`${item}-${index}`}
                            initial={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            whileInView={{
                              opacity: 1,
                              scale: 1,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              delay: index * 0.05,
                            }}
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                            }}
                            className={`rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${
                              index % 4 === 0
                                ? "border-violet-200 bg-violet-100 text-violet-700"
                                : index % 4 === 1
                                ? "border-pink-200 bg-pink-100 text-pink-700"
                                : index % 4 === 2
                                ? "border-amber-200 bg-amber-100 text-amber-700"
                                : "border-emerald-200 bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {item}
                          </motion.span>
                        )
                      )}

                    </div>
                  </div>
                </motion.section>
              )}

          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              className="overflow-hidden rounded-[2rem] border border-violet-200 bg-white shadow-xl shadow-violet-100/50"
            >

              {/* Sidebar Header */}

              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 p-6 text-white">

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl" />

                <div className="relative">

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-violet-100">
                    <Sparkles className="h-3 w-3" />
                    Plan Your Event
                  </div>

                  <h3 className="mt-4 text-xl font-black">
                    Add this service to your plan
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-violet-100/80">
                    Build your event step by step and keep
                    everything organized.
                  </p>

                </div>
              </div>

              {/* Sidebar Body */}

              <div className="space-y-5 p-6">

                {/* PRICE */}

                <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
                  <div className="flex items-center justify-between gap-4">

                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                      Starting price
                    </span>

                    <span className="font-black text-slate-900">
                      {service.price
                        ? formatCurrency(service.price)
                        : "Custom"}
                    </span>

                  </div>
                </div>

                {/* CATEGORY */}

                <div className="flex items-center justify-between gap-4 rounded-xl border border-violet-100 bg-violet-50/60 p-3.5">
                  <span className="text-sm text-slate-500">
                    Category
                  </span>

                  <span className="text-right text-sm font-bold text-violet-700">
                    {service.categoryName}
                  </span>
                </div>

                {/* UNIT */}

                {service.unit && (
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-cyan-100 bg-cyan-50/60 p-3.5">
                    <span className="text-sm text-slate-500">
                      Pricing
                    </span>

                    <span className="text-right text-sm font-bold text-cyan-700">
                      {service.unit}
                    </span>
                  </div>
                )}

                {/* BENEFITS */}

                <div className="border-t border-slate-100 pt-5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-orange-600">
                      <Clock className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-black text-slate-800">
                        Flexible planning
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Customize your requirements based on
                        your event.
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-600">
                      <MapPin className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-black text-slate-800">
                        Event-ready service
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Coordinate this service alongside your
                        other event requirements.
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-600">
                      <ShieldCheck className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-black text-slate-800">
                        Organized experience
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Keep your event requirements together
                        in one planning flow.
                      </p>
                    </div>

                  </div>

                </div>

                {/* PRIMARY BUTTON */}

                <Button
                  to={`/create-event?service=${service.id}`}
                  className="w-full border-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 shadow-lg shadow-fuchsia-200 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Plan With This Service
                </Button>

                {/* SECONDARY */}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  <Phone className="h-4 w-4" />
                  Ask a Question
                </motion.button>

              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          RELATED SERVICES
      ===================================================== */}

      {relatedServices.length > 0 && (
        <section className="relative overflow-hidden border-t border-slate-200 bg-white px-5 py-20 sm:px-8 lg:px-12">

          {/* Background */}

          <div className="pointer-events-none absolute left-[-100px] top-20 h-72 w-72 rounded-full bg-fuchsia-100/60 blur-3xl" />

          <div className="pointer-events-none absolute right-[-100px] bottom-0 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">

            {/* Heading */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-pink-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  You may also need
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Related{" "}
                  <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                    services
                  </span>
                </h2>

              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-black text-violet-700 transition-colors hover:text-fuchsia-600"
              >
                View all services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

            </div>

            {/* Cards */}

            <div className="mt-9 grid gap-6 md:grid-cols-3">

              {relatedServices.map(
                (relatedService, index) => {
                  const theme =
                    relatedThemes[
                      index %
                        relatedThemes.length
                    ];

                  return (
                    <motion.article
                      key={relatedService.id}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        y: -7,
                      }}
                      className={`group overflow-hidden rounded-[1.7rem] border shadow-lg transition-shadow duration-300 hover:shadow-2xl ${theme.card}`}
                    >
                      <Link
                        to={`/services/${relatedService.id}`}
                      >

                        <div className="relative overflow-hidden">

                          <img
                            src={
                              relatedService.image ||
                              "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80"
                            }
                            alt={relatedService.name}
                            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70" />

                          <div className="absolute left-4 top-4">
                            <span
                              className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-sm ${theme.badge}`}
                            >
                              {relatedService.categoryName}
                            </span>
                          </div>

                        </div>

                        <div className="p-5">

                          <h3
                            className={`text-lg font-black text-slate-900 transition-colors ${theme.title}`}
                          >
                            {relatedService.name}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                            {relatedService.shortDescription ||
                              relatedService.description}
                          </p>

                          <div className="mt-5 flex items-center justify-between">

                            <span className="font-black text-slate-800">
                              {relatedService.price
                                ? formatCurrency(
                                    relatedService.price
                                  )
                                : "Custom quote"}
                            </span>

                            <span className="flex items-center gap-1.5 text-sm font-black text-violet-700">
                              View
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>

                          </div>

                        </div>
                      </Link>
                    </motion.article>
                  );
                }
              )}

            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 px-5 py-20 sm:px-8 lg:px-12">

        {/* Animated CTA Glows */}

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 35, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-950 via-violet-950 to-fuchsia-950 px-7 py-10 shadow-2xl sm:px-10 lg:px-14 lg:py-14"
          >

            {/* Decorative Gradient */}

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

            {/* Rings */}

            <div className="pointer-events-none absolute right-8 top-8 hidden h-40 w-40 rounded-full border border-white/10 lg:block" />

            <div className="pointer-events-none absolute right-16 top-16 hidden h-24 w-24 rounded-full border border-white/10 lg:block" />

            <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">

              <div className="max-w-2xl">

                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                  <CalendarCheck2 className="h-3.5 w-3.5" />
                  Ready to plan?
                </div>

                <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Make this service part of your{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                    celebration.
                  </span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-violet-100/70 sm:text-base">
                  Start your event plan and organize this service
                  together with your venue, guests, budget, and
                  other requirements.
                </p>

                {/* Small Trust Row */}

                <div className="mt-6 flex flex-wrap gap-3">

                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-violet-100">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                    Event Ready
                  </span>

                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-violet-100">
                    <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
                    Personalized Planning
                  </span>

                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-violet-100">
                    <Heart className="h-3.5 w-3.5 text-pink-300" />
                    Celebration Focused
                  </span>

                </div>

              </div>

              {/* CTA BUTTONS */}

              <div className="relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

                <Button
                  to={`/create-event?service=${service.id}`}
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="border-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-xl shadow-fuchsia-900/40 hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400"
                >
                  Start Planning
                </Button>

                <Button
                  to="/services"
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white hover:text-slate-900"
                >
                  Browse Services
                </Button>

              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetails;