import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  Search,
  Users,
  X,
  Sparkles,
  Crown,
  Zap,
  WandSparkles,
  Star,
} from "lucide-react";

import {
  packages,
  packageTypes,
} from "../../data/packages";

import formatCurrency from "../../utils/formatCurrency";

const packageStyles = [
  {
    card: "from-violet-950 via-purple-950 to-fuchsia-950",
    border: "border-violet-400/30",
    glow: "bg-violet-500/20",
    accent: "text-violet-300",
    badge: "border-violet-300/30 bg-violet-400/10 text-violet-200",
    button: "from-violet-600 via-fuchsia-600 to-pink-500",
    icon: "bg-violet-400/15 text-violet-300",
  },
  {
    card: "from-cyan-950 via-blue-950 to-indigo-950",
    border: "border-cyan-400/30",
    glow: "bg-cyan-500/20",
    accent: "text-cyan-300",
    badge: "border-cyan-300/30 bg-cyan-400/10 text-cyan-200",
    button: "from-cyan-500 via-blue-600 to-indigo-600",
    icon: "bg-cyan-400/15 text-cyan-300",
  },
  {
    card: "from-rose-950 via-pink-950 to-fuchsia-950",
    border: "border-pink-400/30",
    glow: "bg-pink-500/20",
    accent: "text-pink-300",
    badge: "border-pink-300/30 bg-pink-400/10 text-pink-200",
    button: "from-rose-500 via-pink-600 to-fuchsia-600",
    icon: "bg-pink-400/15 text-pink-300",
  },
  {
    card: "from-amber-950 via-orange-950 to-red-950",
    border: "border-amber-400/30",
    glow: "bg-amber-500/20",
    accent: "text-amber-300",
    badge: "border-amber-300/30 bg-amber-400/10 text-amber-200",
    button: "from-amber-500 via-orange-500 to-red-500",
    icon: "bg-amber-400/15 text-amber-300",
  },
  {
    card: "from-emerald-950 via-green-950 to-teal-950",
    border: "border-emerald-400/30",
    glow: "bg-emerald-500/20",
    accent: "text-emerald-300",
    badge: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
    button: "from-emerald-500 via-teal-500 to-cyan-600",
    icon: "bg-emerald-400/15 text-emerald-300",
  },
  {
    card: "from-indigo-950 via-violet-950 to-blue-950",
    border: "border-indigo-400/30",
    glow: "bg-indigo-500/20",
    accent: "text-indigo-300",
    badge: "border-indigo-300/30 bg-indigo-400/10 text-indigo-200",
    button: "from-indigo-600 via-violet-600 to-purple-600",
    icon: "bg-indigo-400/15 text-indigo-300",
  },
];

const Packages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "all";

  const [search, setSearch] = useState("");
  const [type, setType] = useState(initialType);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const filteredPackages = useMemo(() => {
    let result = [...packages];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((pkg) =>
        [
          pkg.name,
          pkg.shortDescription,
          pkg.description,
          pkg.typeName,
          ...(pkg.features || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (type !== "all") {
      result = result.filter((pkg) => pkg.type === type);
    }

    return result;
  }, [type, search]);

  const handleTypeChange = (value) => {
    setType(value);

    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch("");
    setType("all");

    const params = new URLSearchParams(searchParams);
    params.delete("type");

    setSearchParams(params);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] font-sans text-white">

      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, -30, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full bg-violet-600/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-180px] top-[25%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-180px] left-[35%] h-[480px] w-[480px] rounded-full bg-fuchsia-600/10 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_35%)]" />
      </div>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative border-b border-white/10 px-5 pb-16 pt-32 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-12"
          >

            {/* Hero glow */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative max-w-4xl">

              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-5 flex items-center gap-2 text-xs"
              >
                <Link
                  to="/"
                  className="text-slate-500 transition-colors hover:text-cyan-300"
                >
                  Home
                </Link>

                <ArrowRight className="h-3 w-3 text-slate-600" />

                <span className="font-bold text-fuchsia-300">
                  Packages
                </span>
              </motion.div>

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-fuchsia-300"
              >
                <Gift className="h-4 w-4" />

                All-Inclusive Event Packages

                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              </motion.div>

              {/* Heading */}
              <h1 className="font-display text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                Curated{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                  Celebration
                </span>{" "}
                Packages
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Transparent, all-inclusive packages combining venue,
                banana-leaf catering, mandapam floral decor, candid
                photography and celebration experiences — carefully
                designed for unforgettable Indian occasions.
              </p>

              {/* Hero mini cards */}
              <div className="mt-7 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Crown className="h-4 w-4 text-violet-300" />
                    <span className="text-xs font-black text-violet-200">
                      Premium
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Carefully curated experiences
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-300" />
                    <span className="text-xs font-black text-cyan-200">
                      All-Inclusive
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Multiple services in one package
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-300" />
                    <span className="text-xs font-black text-amber-200">
                      Celebration Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Designed for memorable moments
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FILTER AREA
      ========================================================== */}

      <section className="relative border-b border-white/10 bg-black/20 px-5 py-5 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >

            {/* Search */}
            <div className="relative w-full lg:max-w-md">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ceremonies, packages or inclusions..."
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-11 pr-11 text-xs font-medium text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-cyan-400/[0.05] focus:ring-2 focus:ring-cyan-400/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-rose-400/10 hover:text-rose-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">

              <button
                type="button"
                onClick={() => handleTypeChange("all")}
                className={`rounded-xl px-4 py-2.5 text-xs font-black transition-all ${
                  type === "all"
                    ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white shadow-lg shadow-fuchsia-900/30"
                    : "border border-white/10 bg-white/[0.05] text-slate-400 hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-white"
                }`}
              >
                All Packages ({packages.length})
              </button>

              {packageTypes.map((pt, index) => {
                const colors = [
                  "from-cyan-500 to-blue-600",
                  "from-amber-500 to-orange-600",
                  "from-emerald-500 to-teal-600",
                  "from-rose-500 to-pink-600",
                  "from-indigo-500 to-violet-600",
                ];

                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => handleTypeChange(pt.id)}
                    className={`rounded-xl px-4 py-2.5 text-xs font-black transition-all ${
                      type === pt.id
                        ? `bg-gradient-to-r ${colors[index % colors.length]} text-white shadow-lg`
                        : "border border-white/10 bg-white/[0.05] text-slate-400 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {pt.name}
                  </button>
                );
              })}

            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          PACKAGES
      ========================================================== */}

      <section className="relative px-5 py-14 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_12px_#e879f9]" />

                <span className="text-xs font-black uppercase tracking-[0.18em] text-fuchsia-300">
                  Explore Experiences
                </span>
              </div>

              <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
                Celebration{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Collections
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">

              <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Showing{" "}
                <span className="text-white">
                  {filteredPackages.length}
                </span>{" "}
                Packages
              </p>

              {type !== "all" && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-xs font-bold text-rose-300 transition-all hover:border-rose-400/40 hover:bg-rose-400/20"
                >
                  Reset
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

            </div>
          </div>

          {/* Grid */}
          {filteredPackages.length > 0 ? (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              <AnimatePresence mode="popLayout">

                {filteredPackages.map((pkg, index) => {

                  const style =
                    packageStyles[index % packageStyles.length];

                  return (
                    <motion.article
                      layout
                      key={pkg.id}
                      initial={{
                        opacity: 0,
                        y: 35,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.06,
                      }}
                      whileHover={{
                        y: -8,
                      }}
                      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border ${style.border} bg-gradient-to-br ${style.card} shadow-2xl`}
                    >

                      {/* Glow */}
                      <div
                        className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full ${style.glow} blur-3xl transition-transform duration-700 group-hover:scale-150`}
                      />

                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">

                        <motion.img
                          src={
                            pkg.image ||
                            "/images/chennai_reception_stage.jpg"
                          }
                          alt={pkg.name}
                          className="h-full w-full object-cover"
                          whileHover={{
                            scale: 1.09,
                          }}
                          transition={{
                            duration: 0.7,
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20" />

                        {/* Type badge */}
                        <div className="absolute left-4 top-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${style.badge}`}
                          >
                            {pkg.typeName || pkg.type}
                          </span>
                        </div>

                        {/* Price */}
                        {pkg.price && (
                          <div className="absolute right-4 top-4">
                            <span
                              className={`inline-flex rounded-xl bg-gradient-to-r ${style.button} px-3 py-1.5 text-xs font-black text-white shadow-lg`}
                            >
                              {formatCurrency(pkg.price)}
                            </span>
                          </div>
                        )}

                        {/* Package number */}
                        <div className="absolute bottom-4 left-4">
                          <span className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-black text-white backdrop-blur-md">
                            PACKAGE{" "}
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="relative flex flex-1 flex-col p-5">

                        <h3 className="min-h-[44px] text-lg font-black leading-6 text-white transition-colors group-hover:text-fuchsia-200">
                          {pkg.name}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-xs leading-5 text-slate-300">
                          {pkg.shortDescription ||
                            pkg.description}
                        </p>

                        {/* Guest */}
                        {pkg.guestRange && (
                          <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold text-slate-300">
                            <Users
                              className={`h-4 w-4 ${style.accent}`}
                            />

                            <span>
                              Suitable for{" "}
                              <span className="font-black text-white">
                                {pkg.guestRange}
                              </span>{" "}
                              Guests
                            </span>
                          </div>
                        )}

                        {/* Features */}
                        {pkg.features &&
                          pkg.features.length > 0 && (
                            <div className="mt-5 border-t border-white/10 pt-4">

                              <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                Included Experiences
                              </p>

                              <ul className="space-y-2">

                                {pkg.features
                                  .slice(0, 4)
                                  .map((feature, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{
                                        opacity: 0,
                                        x: -5,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        x: 0,
                                      }}
                                      transition={{
                                        delay:
                                          0.15 +
                                          index * 0.05 +
                                          i * 0.04,
                                      }}
                                      className="flex items-start gap-2 text-xs text-slate-300"
                                    >
                                      <CheckCircle2
                                        className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${style.accent}`}
                                      />

                                      <span className="line-clamp-1">
                                        {feature}
                                      </span>
                                    </motion.li>
                                  ))}

                              </ul>
                            </div>
                          )}

                        {/* Button */}
                        <div className="mt-auto pt-6">

                          <motion.button
                            whileHover={{
                              scale: 1.02,
                              boxShadow:
                                "0 0 28px rgba(217,70,239,0.22)",
                            }}
                            whileTap={{
                              scale: 0.97,
                            }}
                            onClick={() =>
                              setSelectedPackage(pkg)
                            }
                            className={`group/button flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${style.button} px-4 py-3 text-xs font-black text-white shadow-lg`}
                          >
                            <span>
                              Package Details & Inclusions
                            </span>

                            <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                          </motion.button>

                        </div>
                      </div>
                    </motion.article>
                  );
                })}

              </AnimatePresence>
            </div>

          ) : (

            /* Empty state */
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-2xl backdrop-blur-xl"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-fuchsia-300">
                <Search className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-black text-white">
                No Packages Found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                We couldn't find a package matching your current
                search or category selection.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-5 py-3 text-xs font-black text-white shadow-lg"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* =========================================================
          PACKAGE DETAIL MODAL
      ========================================================== */}

      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            onClick={() => setSelectedPackage(null)}
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-violet-400/20 bg-[#0a0f23] p-6 shadow-2xl shadow-violet-950/50 sm:p-8"
            >

              {/* Modal glows */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-fuchsia-500/15 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative">

                {/* Header */}
                <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">

                  <div>

                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-fuchsia-300">
                      <Gift className="h-3.5 w-3.5" />

                      {selectedPackage.typeName ||
                        selectedPackage.type}
                    </div>

                    <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                      {selectedPackage.name}
                    </h3>

                  </div>

                  <motion.button
                    whileHover={{
                      rotate: 90,
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={() =>
                      setSelectedPackage(null)
                    }
                    className="shrink-0 rounded-xl border border-white/10 bg-white/[0.05] p-2 text-slate-400 transition-colors hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>

                </div>

                <div className="space-y-6 pt-6">

                  {/* Price */}
                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-400/20 bg-gradient-to-r from-amber-400/10 to-orange-400/10 p-5">

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                        Package Investment
                      </p>

                      <div className="mt-1 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text font-mono text-3xl font-black text-transparent">
                        {formatCurrency(
                          selectedPackage.price
                        )}
                      </div>
                    </div>

                    {selectedPackage.guestRange && (
                      <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                          <Users className="h-4 w-4 text-cyan-300" />
                          {selectedPackage.guestRange} Guests
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm leading-7 text-slate-300">
                      {selectedPackage.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>

                    <div className="mb-4 flex items-center gap-2">
                      <div className="rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 p-1.5">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>

                      <h4 className="text-sm font-black uppercase tracking-wider text-white">
                        All Included Features
                      </h4>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">

                      {selectedPackage.features?.map(
                        (feature, index) => (
                          <motion.div
                            key={index}
                            initial={{
                              opacity: 0,
                              x: -10,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: index * 0.04,
                            }}
                            className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-xs text-slate-300"
                          >
                            <CheckCircle2
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                [
                                  "text-violet-400",
                                  "text-cyan-400",
                                  "text-pink-400",
                                  "text-amber-400",
                                  "text-emerald-400",
                                ][index % 5]
                              }`}
                            />

                            <span>
                              {feature}
                            </span>
                          </motion.div>
                        )
                      )}

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">

                    <button
                      onClick={() =>
                        setSelectedPackage(null)
                      }
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold text-slate-300 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    >
                      Close
                    </button>

                    <motion.div
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                    >
                      <Link
                        to={`/ai-planner?prompt=${encodeURIComponent(
                          selectedPackage.name
                        )}`}
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-5 py-3 text-xs font-black text-white shadow-lg shadow-fuchsia-900/20"
                      >
                        <WandSparkles className="h-4 w-4" />
                        Plan With This Package
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>

                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Packages;