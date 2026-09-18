import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Star,
  Check,
  Plus,
  Trash2,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  MapPin,
  IndianRupee,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { vendors } from "../../data/vendors";

const vendorThemes = [
  {
    card:
      "from-violet-50 via-fuchsia-50 to-white border-violet-200 hover:border-violet-400",
    icon: "from-violet-600 to-fuchsia-600",
    accent: "text-violet-700",
    soft: "bg-violet-100 text-violet-700 border-violet-200",
    button:
      "from-violet-600 via-fuchsia-600 to-pink-500 hover:from-violet-700 hover:via-fuchsia-700 hover:to-pink-600",
    progress: "from-violet-500 to-fuchsia-500",
  },
  {
    card:
      "from-cyan-50 via-sky-50 to-white border-cyan-200 hover:border-cyan-400",
    icon: "from-cyan-500 to-blue-600",
    accent: "text-cyan-700",
    soft: "bg-cyan-100 text-cyan-700 border-cyan-200",
    button:
      "from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-600 hover:via-blue-700 hover:to-indigo-700",
    progress: "from-cyan-400 to-blue-600",
  },
  {
    card:
      "from-amber-50 via-orange-50 to-white border-amber-200 hover:border-orange-400",
    icon: "from-amber-500 to-orange-600",
    accent: "text-orange-700",
    soft: "bg-amber-100 text-orange-700 border-amber-200",
    button:
      "from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600",
    progress: "from-amber-400 to-orange-500",
  },
];

const CompareVendors = () => {
  const [comparedIds, setComparedIds] = useState(() => {
    const saved = localStorage.getItem("eventara_compare_vendors");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((v) => (typeof v === "object" ? v.id : v));
        }
      } catch (e) {
        console.error("Failed to restore comparison vendors:", e);
      }
    }

    return [
      "sri-meenakshi-caterers",
      "madras-lens-studios",
      "kavitha-tanjore-decorators",
    ];
  });

  const selectedVendors = vendors.filter((v) =>
    comparedIds.includes(v.id)
  );

  const removeVendor = (id) => {
    const updated = comparedIds.filter((item) => item !== id);

    setComparedIds(updated);

    localStorage.setItem(
      "eventara_compare_vendors",
      JSON.stringify(updated)
    );
  };

  const addVendor = (id) => {
    if (comparedIds.length >= 3) {
      alert("You can compare up to 3 vendors simultaneously.");
      return;
    }

    const updated = [...comparedIds, id];

    setComparedIds(updated);

    localStorage.setItem(
      "eventara_compare_vendors",
      JSON.stringify(updated)
    );
  };

  const availableToAdd = vendors.filter(
    (v) => !comparedIds.includes(v.id)
  );

  const getVendorTheme = (index) => {
    return vendorThemes[index % vendorThemes.length];
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-900 pt-28 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      {/* =========================================================
          Animated Background
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
          animate={{
            x: [0, 80, -20, 0],
            y: [0, 60, 120, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl"
          animate={{
            x: [0, -70, 30, 0],
            y: [0, 80, -40, 0],
            scale: [1, 0.9, 1.12, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            x: [-20, 60, -40, -20],
            y: [20, -50, 30, 20],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.10),transparent_30%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* =========================================================
            Header
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-7"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm"
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Layers className="w-3.5 h-3.5 text-fuchsia-400" />
              </motion.span>

              Vendor Decision Matrix

              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Side-by-Side{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Vendor Comparison
              </span>
            </h1>

            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Compare package rates, verified inclusions, ratings, AI match
              scores and event experience before making your booking decision.
            </p>

            {/* Comparison Count */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-300">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {selectedVendors.length}/3 vendors selected
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified marketplace data</span>
              </div>
            </div>
          </div>

          <Link
            to="/vendors"
            className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-violet-400/40 text-sm font-semibold text-slate-200 transition-all backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Browse Marketplace</span>
          </Link>
        </motion.div>

        {/* =========================================================
            Add Vendor Section
        ========================================================= */}
        <AnimatePresence>
          {selectedVendors.length < 3 &&
            availableToAdd.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-cyan-500/10 p-5 backdrop-blur-sm"
              >
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />

                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <Plus className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Expand Your Comparison
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {3 - selectedVendors.length} comparison{" "}
                        {3 - selectedVendors.length === 1
                          ? "slot"
                          : "slots"}{" "}
                        available.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {availableToAdd.slice(0, 4).map((v, index) => (
                      <motion.button
                        key={v.id}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => addVendor(v.id)}
                        className="group px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/40 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all"
                      >
                        <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                          <Plus className="w-3.5 h-3.5 text-white" />
                        </span>

                        <span className="max-w-[180px] truncate">
                          {v.name}
                        </span>

                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-violet-300 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* =========================================================
            Empty State
        ========================================================= */}
        {selectedVendors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden text-center py-20 px-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
          >
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-fuchsia-500/20"
            >
              <Layers className="w-9 h-9 text-white" />
            </motion.div>

            <h3 className="mt-7 text-xl font-bold text-white">
              No Vendors Selected
            </h3>

            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
              Browse the Eventara marketplace and add vendors to create your
              side-by-side comparison.
            </p>

            <Link
              to="/vendors"
              className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 hover:from-violet-700 hover:via-fuchsia-700 hover:to-pink-600 text-white font-bold text-sm shadow-lg shadow-fuchsia-500/20 transition-all"
            >
              Browse Vendors
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* =====================================================
                Vendor Comparison Cards
            ===================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {selectedVendors.map((vendor, index) => {
                const theme = getVendorTheme(index);

                const matchScore = Number(
                  vendor.aiMatchScore || 0
                );

                return (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.12,
                    }}
                    whileHover={{ y: -7 }}
                    className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${theme.card} shadow-2xl shadow-black/20 transition-all duration-300 flex flex-col`}
                  >
                    {/* Decorative Glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/70 blur-3xl pointer-events-none" />

                    {/* =================================================
                        Vendor Image
                    ================================================= */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                      <motion.img
                        src={vendor.avatar}
                        alt={vendor.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.6 }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      {/* Vendor Number */}
                      <div className="absolute top-3 left-3">
                        <div
                          className={`w-8 h-8 rounded-xl bg-gradient-to-br ${theme.icon} flex items-center justify-center text-white font-black text-xs shadow-lg`}
                        >
                          0{index + 1}
                        </div>
                      </div>

                      {/* Remove */}
                      <motion.button
                        whileHover={{
                          scale: 1.08,
                          rotate: 5,
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeVendor(vendor.id)}
                        className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-sm text-slate-600 hover:text-rose-600 shadow-lg transition-colors"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </motion.button>

                      {/* Category */}
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-slate-800 shadow-lg">
                          <span
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${theme.icon}`}
                          />
                          {vendor.categoryName}
                        </span>
                      </div>
                    </div>

                    {/* =================================================
                        Vendor Details
                    ================================================= */}
                    <div className="relative p-5 space-y-5 flex-1">
                      {/* Name */}
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                          {vendor.name}
                        </h3>

                        <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                          {vendor.tagline}
                        </p>
                      </div>

                      {/* AI Match Score */}
                      <div className="rounded-2xl bg-white/70 border border-white/80 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-7 h-7 rounded-lg bg-gradient-to-br ${theme.icon} flex items-center justify-center`}
                            >
                              <Zap className="w-3.5 h-3.5 text-white" />
                            </div>

                            <span className="text-xs font-bold text-slate-700">
                              AI Match
                            </span>
                          </div>

                          <span
                            className={`text-sm font-black ${theme.accent}`}
                          >
                            {matchScore}%
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.min(matchScore, 100)}%`,
                            }}
                            transition={{
                              duration: 1.2,
                              delay: 0.3 + index * 0.1,
                              ease: "easeOut",
                            }}
                            className={`h-full rounded-full bg-gradient-to-r ${theme.progress}`}
                          />
                        </div>

                        <p className="text-[10px] text-slate-500 mt-2">
                          Compatibility based on your event preferences
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl bg-white/60 border border-white/80 p-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            Rating
                          </div>

                          <div className="mt-1 text-sm font-extrabold text-slate-900">
                            {vendor.rating}
                            <span className="text-[10px] font-medium text-slate-500 ml-1">
                              ({vendor.reviewCount || 48})
                            </span>
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/60 border border-white/80 p-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                            <IndianRupee className="w-3 h-3 text-emerald-600" />
                            Starting
                          </div>

                          <div className="mt-1 text-sm font-extrabold text-slate-900">
                            ₹
                            {Number(
                              vendor.startingPrice || 25000
                            ).toLocaleString("en-IN")}
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/60 border border-white/80 p-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                            <MapPin className="w-3 h-3 text-cyan-600" />
                            Location
                          </div>

                          <div className="mt-1 text-xs font-bold text-slate-800 truncate">
                            {vendor.location}
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/60 border border-white/80 p-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                            <Trophy className="w-3 h-3 text-orange-500" />
                            Events
                          </div>

                          <div className="mt-1 text-sm font-extrabold text-slate-900">
                            {vendor.bookedCount}+
                          </div>
                        </div>
                      </div>

                      {/* =================================================
                          Package Features
                      ================================================= */}
                      <div className="pt-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.16em]">
                            Package Highlights
                          </span>

                          <Sparkles
                            className={`w-3.5 h-3.5 ${theme.accent}`}
                          />
                        </div>

                        <ul className="space-y-2">
                          {vendor.packages?.[0]?.features
                            ?.slice(0, 3)
                            .map((feat, i) => (
                              <motion.li
                                key={i}
                                initial={{
                                  opacity: 0,
                                  x: -8,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  delay:
                                    0.35 + index * 0.1 + i * 0.08,
                                }}
                                className="flex items-start gap-2 text-xs text-slate-600"
                              >
                                <span
                                  className={`mt-0.5 w-5 h-5 shrink-0 rounded-full bg-gradient-to-br ${theme.icon} flex items-center justify-center`}
                                >
                                  <Check className="w-3 h-3 text-white" />
                                </span>

                                <span className="leading-relaxed">
                                  {feat}
                                </span>
                              </motion.li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* =================================================
                        CTA
                    ================================================= */}
                    <div className="relative p-5 pt-0">
                      <Link
                        to={`/vendors/${vendor.id}`}
                        className={`group w-full py-3 rounded-xl bg-gradient-to-r ${theme.button} text-white font-bold text-xs text-center transition-all shadow-lg flex items-center justify-center gap-2`}
                      >
                        <span>View Full Profile</span>

                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* =========================================================
                Comparison Guidance
            ========================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5"
            >
              <div className="absolute right-0 top-0 w-56 h-56 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

              <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">
                    Compare beyond the price
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Review vendor experience, ratings, location, package
                    inclusions and AI compatibility together before opening a
                    full vendor profile.
                  </p>
                </div>

                <Link
                  to="/vendors"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 transition-all"
                >
                  Explore More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompareVendors;