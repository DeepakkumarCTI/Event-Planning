import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Calendar,
  Check,
  ArrowRight,
  MessageSquare,
  ChevronLeft,
  Send,
  X,
  Sparkles,
  Crown,
  Gem,
  Zap,
  Heart,
} from "lucide-react";
import { vendors } from "../../data/vendors";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const vendor = vendors.find((v) => v.id === vendorId) || vendors[0];

  const [selectedPackage, setSelectedPackage] = useState(
    vendor.packages?.[1] || vendor.packages?.[0]
  );

  const [selectedDate, setSelectedDate] = useState("2026-10-17");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteMessage, setQuoteMessage] = useState("");
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [calendarMonth] = useState("October 2026");

  const daysInMonth = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-10-${day < 10 ? "0" + day : day}`;
    const isBooked = vendor.bookedDates?.includes(dateStr);

    return {
      day,
      dateStr,
      isBooked,
    };
  });

  const handleSendQuote = (e) => {
    e.preventDefault();

    const existing = JSON.parse(
      localStorage.getItem("eventara_vendor_inquiries") || "[]"
    );

    const newInquiry = {
      id: Date.now(),
      vendorId: vendor.id,
      vendorName: vendor.name,
      package: selectedPackage?.name || "Custom",
      date: selectedDate,
      message: quoteMessage,
      createdAt: new Date().toLocaleDateString(),
      status: "Pending Response",
    };

    localStorage.setItem(
      "eventara_vendor_inquiries",
      JSON.stringify([newInquiry, ...existing])
    );

    setQuoteSuccess(true);

    setTimeout(() => {
      setQuoteSuccess(false);
      setIsQuoteModalOpen(false);
      setQuoteMessage("");
    }, 2000);
  };

  const packageGradients = [
    {
      border: "border-violet-300/60",
      selected:
        "bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-white border-violet-500 ring-1 ring-violet-400/50",
      icon: "from-violet-600 to-fuchsia-600",
      price: "text-violet-700",
      check: "text-violet-600",
      glow: "bg-violet-500/10",
    },
    {
      border: "border-cyan-300/60",
      selected:
        "bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-white border-cyan-500 ring-1 ring-cyan-400/50",
      icon: "from-cyan-600 to-blue-600",
      price: "text-cyan-700",
      check: "text-cyan-600",
      glow: "bg-cyan-500/10",
    },
    {
      border: "border-amber-300/60",
      selected:
        "bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-white border-amber-500 ring-1 ring-amber-400/50",
      icon: "from-amber-500 to-orange-600",
      price: "text-amber-700",
      check: "text-amber-600",
      glow: "bg-amber-500/10",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] px-4 pb-24 pt-28 font-sans text-slate-900 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-120px] top-72 h-[30rem] w-[30rem] rounded-full bg-cyan-500/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -40, 50, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-150px] left-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/10 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/vendors"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-slate-300 backdrop-blur-md transition-all hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Tamil Nadu Marketplace
          </Link>
        </motion.div>

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12">
            {/* Image */}
            <div className="group relative aspect-[4/3] overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-[500px]">
              <img
                src={vendor.avatar}
                alt={vendor.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute left-5 top-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md">
                  <Gem className="h-3.5 w-3.5 text-cyan-300" />
                  {vendor.categoryName}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-300">
                    <Sparkles className="h-4 w-4" />
                    Eventara Verified Partner
                  </div>
                  <p className="mt-1 text-sm text-slate-200">
                    Curated for memorable celebrations across Tamil Nadu.
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="relative flex flex-col justify-between space-y-7 p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300">
                      {vendor.aiMatchScore}% AI Match
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified Vendor
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-300">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {vendor.rating}
                    <span className="font-normal text-slate-400">
                      ({vendor.reviewCount || 48})
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                    Premium Celebration Partner
                  </p>

                  <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
                    {vendor.name}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-300">
                    {vendor.tagline}
                  </p>
                </div>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">
                    <MapPin className="h-3.5 w-3.5" />
                    {vendor.location}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-xs text-violet-200">
                    <Crown className="h-3.5 w-3.5" />
                    {vendor.bookedCount}+ Celebrations
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
                    <Clock className="h-3.5 w-3.5" />
                    Response &lt; 2 hrs
                  </span>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-slate-400">
                  {vendor.bio}
                </p>
              </div>

              {/* Pricing */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      Starting Package Rate
                    </div>

                    <div className="mt-1 bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text font-mono text-2xl font-black text-transparent">
                      ₹
                      {Number(
                        vendor.startingPrice || 25000
                      ).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-fuchsia-500/20 transition-all hover:scale-[1.02] hover:shadow-fuchsia-500/40"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Request Official Quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* PACKAGES */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-5 lg:col-span-7"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                <LayersIcon />
                Flexible Packages
              </div>

              <h2 className="mt-2 font-display text-2xl font-black text-white">
                Curated Service Packages
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Choose a package and customize the details for your celebration.
              </p>
            </div>

            <div className="space-y-4">
              {vendor.packages?.map((pkg, idx) => {
                const isSelected = selectedPackage?.name === pkg.name;
                const style =
                  packageGradients[idx % packageGradients.length];

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`relative cursor-pointer overflow-hidden rounded-2xl border p-5 shadow-xl transition-all ${
                      isSelected
                        ? style.selected
                        : `bg-white ${style.border} hover:shadow-2xl`
                    }`}
                  >
                    <div
                      className={`absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
                        style.glow
                      }`}
                    />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${style.icon} text-white shadow-lg`}
                          >
                            {idx === 0 ? (
                              <Crown className="h-5 w-5" />
                            ) : idx === 1 ? (
                              <Zap className="h-5 w-5" />
                            ) : (
                              <Heart className="h-5 w-5" />
                            )}
                          </div>

                          <div>
                            <h3 className="text-sm font-black text-slate-900 sm:text-base">
                              {pkg.name}
                            </h3>

                            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                              {pkg.desc}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`shrink-0 text-right font-mono text-base font-black sm:text-lg ${style.price}`}
                        >
                          ₹{Number(pkg.price).toLocaleString("en-IN")}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          <Check className="h-3 w-3" />
                          Selected Package
                        </div>
                      )}

                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {pkg.features?.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-slate-600"
                          >
                            <Check
                              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${style.check}`}
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* CALENDAR */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 p-5 shadow-2xl lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                    <Calendar className="h-4 w-4" />
                    Availability
                  </div>

                  <h3 className="mt-1 font-display text-lg font-black text-white">
                    Live Booking Calendar
                  </h3>
                </div>

                <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-[10px] font-bold text-violet-200">
                  {calendarMonth}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div
                    key={i}
                    className="py-1 text-[10px] font-bold text-slate-500"
                  >
                    {d}
                  </div>
                ))}

                {daysInMonth.map(({ day, dateStr, isBooked }) => {
                  const isSelected = selectedDate === dateStr;

                  return (
                    <motion.button
                      key={day}
                      whileHover={!isBooked ? { scale: 1.08 } : {}}
                      whileTap={!isBooked ? { scale: 0.95 } : {}}
                      disabled={isBooked}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`relative rounded-lg py-2 text-xs font-bold transition-all ${
                        isBooked
                          ? "cursor-not-allowed bg-white/[0.03] text-slate-700 line-through"
                          : isSelected
                          ? "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-rose-500 text-white shadow-lg shadow-fuchsia-500/30"
                          : "border border-white/5 bg-white/[0.05] text-slate-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
                      }`}
                    >
                      {day}

                      {isSelected && (
                        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-fuchsia-300">
                    Selected Date
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-white">
                    {selectedDate}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-500/20 bg-white/[0.04] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">
                    Calendar Status
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Live
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] hover:shadow-blue-500/40"
              >
                <Calendar className="h-4 w-4" />
                Lock In {selectedDate}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.section>
        </div>

        {/* TRUST STRIP */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5">
            <Crown className="h-6 w-6 text-violet-300" />
            <h3 className="mt-3 text-sm font-bold text-white">
              Curated Expertise
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Experienced professionals selected for Eventara celebrations.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
            <ShieldCheck className="h-6 w-6 text-cyan-300" />
            <h3 className="mt-3 text-sm font-bold text-white">
              Verified Partner
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Vendor details and celebration services are presented through
              the Eventara marketplace.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5">
            <MessageSquare className="h-6 w-6 text-amber-300" />
            <h3 className="mt-3 text-sm font-bold text-white">
              Direct Enquiry
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Send your event requirements and preferred date directly.
            </p>
          </div>
        </motion.section>
      </div>

      {/* QUOTE MODAL */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-300">
                      <Send className="h-3 w-3" />
                      Vendor Enquiry
                    </div>

                    <h3 className="font-display text-xl font-black text-white">
                      Request Official Quote
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {vendor.name}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/[0.05] p-2 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {quoteSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    >
                      <Check className="h-8 w-8" />
                    </motion.div>

                    <h4 className="mt-5 text-xl font-black text-white">
                      Inquiry Transmitted!
                    </h4>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                      {vendor.name} has received your request and selected
                      date preference.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSendQuote}
                    className="relative mt-6 space-y-4 text-xs"
                  >
                    <div>
                      <label className="mb-2 block font-bold text-slate-300">
                        Target Date
                      </label>

                      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 font-mono font-bold text-cyan-200">
                        {selectedDate}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-bold text-slate-300">
                        Selected Package
                      </label>

                      <div className="rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-3 font-semibold leading-relaxed text-violet-200">
                        {selectedPackage?.name || "Custom"}{" "}
                        <span className="text-violet-400">—</span>{" "}
                        ₹
                        {Number(
                          selectedPackage?.price || 0
                        ).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-bold text-slate-300">
                        Ceremony Notes / Guest Count
                      </label>

                      <textarea
                        rows={5}
                        required
                        value={quoteMessage}
                        onChange={(e) => setQuoteMessage(e.target.value)}
                        placeholder="E.g. Traditional Brahmin Muhurtham for 500 guests at Mayor Ramanathan Chettiar Hall..."
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] p-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-fuchsia-400/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-fuchsia-400/10"
                      />
                    </div>

                    <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={() => setIsQuoteModalOpen(false)}
                        className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 font-bold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-5 py-3 font-black text-white shadow-lg shadow-fuchsia-500/20 transition-all hover:scale-[1.01]"
                      >
                        <Send className="h-4 w-4" />
                        Submit Inquiry
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Small reusable icon wrapper */
const LayersIcon = () => (
  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
    <span className="text-[10px] font-black">✦</span>
  </span>
);

export default VendorProfile;