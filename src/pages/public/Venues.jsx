
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  MapPin,
  Search,
  Star,
  Users,
  X,
  Sparkles,
  Crown,
  Gem,
  Zap,
} from "lucide-react";

import {
  venues,
  venueTypes,
} from "../../data/venues";

import formatCurrency from "../../utils/formatCurrency";

const Venues = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "all";

  const [search, setSearch] = useState("");
  const [type, setType] = useState(initialType);
  const [capacity, setCapacity] = useState("all");

  /* =========================================================
     FILTER VENUES
  ========================================================= */

  const filteredVenues = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return venues.filter((venue) => {
      const matchesSearch =
        !normalizedSearch ||
        venue.name?.toLowerCase().includes(normalizedSearch) ||
        venue.description?.toLowerCase().includes(normalizedSearch) ||
        venue.location?.city?.toLowerCase().includes(normalizedSearch) ||
        venue.location?.area?.toLowerCase().includes(normalizedSearch) ||
        venue.typeName?.toLowerCase().includes(normalizedSearch);

      const matchesType =
        type === "all" ||
        venue.type === type ||
        venue.typeName?.toLowerCase() === type.toLowerCase();

      const matchesCapacity = (() => {
        if (capacity === "all") return true;

        const val =
          typeof venue.capacity === "object"
            ? Number(
                venue.capacity?.maximum ||
                  venue.capacity?.minimum
              ) || 0
            : Number(venue.capacity) || 0;

        if (capacity === "small") return val <= 200;
        if (capacity === "medium") return val > 200 && val <= 500;
        if (capacity === "large") return val > 500;

        return true;
      })();

      return matchesSearch && matchesType && matchesCapacity;
    });
  }, [type, capacity, search]);

  /* =========================================================
     TYPE CHANGE
  ========================================================= */

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

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setType("all");
    setCapacity("all");

    const params = new URLSearchParams(searchParams);
    params.delete("type");

    setSearchParams(params);
  };

  /* =========================================================
     LIGHT CARD THEMES
  ========================================================= */

  const cardThemes = [
    {
      card:
        "from-violet-50 via-fuchsia-50/70 to-white",
      border:
        "border-violet-200",
      hoverBorder:
        "hover:border-violet-400",
      glow:
        "bg-violet-400/20",
      badge:
        "from-violet-600 to-fuchsia-600",
      badgeText:
        "text-white",
      icon:
        "from-violet-600 to-fuchsia-600",
      accent:
        "text-violet-600",
      accentSoft:
        "bg-violet-50",
      accentBorder:
        "border-violet-200",
      button:
        "from-violet-600 to-fuchsia-600",
      check:
        "text-violet-600",
    },

    {
      card:
        "from-cyan-50 via-blue-50/70 to-white",
      border:
        "border-cyan-200",
      hoverBorder:
        "hover:border-cyan-400",
      glow:
        "bg-cyan-400/20",
      badge:
        "from-cyan-500 to-blue-600",
      badgeText:
        "text-white",
      icon:
        "from-cyan-500 to-blue-600",
      accent:
        "text-cyan-600",
      accentSoft:
        "bg-cyan-50",
      accentBorder:
        "border-cyan-200",
      button:
        "from-cyan-500 to-blue-600",
      check:
        "text-cyan-600",
    },

    {
      card:
        "from-amber-50 via-orange-50/70 to-white",
      border:
        "border-amber-200",
      hoverBorder:
        "hover:border-amber-400",
      glow:
        "bg-amber-400/20",
      badge:
        "from-amber-500 to-orange-600",
      badgeText:
        "text-white",
      icon:
        "from-amber-500 to-orange-600",
      accent:
        "text-amber-600",
      accentSoft:
        "bg-amber-50",
      accentBorder:
        "border-amber-200",
      button:
        "from-amber-500 to-orange-600",
      check:
        "text-amber-600",
    },

    {
      card:
        "from-rose-50 via-pink-50/70 to-white",
      border:
        "border-rose-200",
      hoverBorder:
        "hover:border-rose-400",
      glow:
        "bg-rose-400/20",
      badge:
        "from-rose-500 to-pink-600",
      badgeText:
        "text-white",
      icon:
        "from-rose-500 to-pink-600",
      accent:
        "text-rose-600",
      accentSoft:
        "bg-rose-50",
      accentBorder:
        "border-rose-200",
      button:
        "from-rose-500 to-pink-600",
      check:
        "text-rose-600",
    },

    {
      card:
        "from-emerald-50 via-teal-50/70 to-white",
      border:
        "border-emerald-200",
      hoverBorder:
        "hover:border-emerald-400",
      glow:
        "bg-emerald-400/20",
      badge:
        "from-emerald-500 to-teal-600",
      badgeText:
        "text-white",
      icon:
        "from-emerald-500 to-teal-600",
      accent:
        "text-emerald-600",
      accentSoft:
        "bg-emerald-50",
      accentBorder:
        "border-emerald-200",
      button:
        "from-emerald-500 to-teal-600",
      check:
        "text-emerald-600",
    },

    {
      card:
        "from-indigo-50 via-purple-50/70 to-white",
      border:
        "border-indigo-200",
      hoverBorder:
        "hover:border-indigo-400",
      glow:
        "bg-indigo-400/20",
      badge:
        "from-indigo-500 to-purple-600",
      badgeText:
        "text-white",
      icon:
        "from-indigo-500 to-purple-600",
      accent:
        "text-indigo-600",
      accentSoft:
        "bg-indigo-50",
      accentBorder:
        "border-indigo-200",
      button:
        "from-indigo-500 to-purple-600",
      check:
        "text-indigo-600",
    },
  ];

  /* =========================================================
     CATEGORY COLORS
  ========================================================= */

  const categoryColors = [
    "from-violet-600 to-fuchsia-600",
    "from-cyan-500 to-blue-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-indigo-500 to-purple-600",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">

      {/* =====================================================
          ANIMATED LIGHT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-48 top-20 h-[34rem] w-[34rem] rounded-full bg-violet-300/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-180px] top-[25%] h-[35rem] w-[35rem] rounded-full bg-cyan-300/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -40, 50, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-180px] left-1/3 h-[32rem] w-[32rem] rounded-full bg-fuchsia-300/15 blur-3xl"
        />

        <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-5 pb-12 pt-28 sm:px-8 sm:pt-32 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10 lg:p-12"
          >

            {/* Hero glow */}

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />

            <div className="absolute bottom-[-100px] left-1/3 h-64 w-64 rounded-full bg-cyan-300/15 blur-3xl" />

            <div className="relative max-w-4xl">

              {/* Breadcrumb */}

              <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">

                <Link
                  to="/"
                  className="transition-colors hover:text-violet-600"
                >
                  Home
                </Link>

                <ArrowRight className="h-3 w-3 text-slate-400" />

                <span className="font-bold text-violet-600">
                  Venues & Mandapams
                </span>

              </div>

              {/* Badge */}

              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-cyan-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-700 shadow-sm">

                <Sparkles className="h-3.5 w-3.5 text-fuchsia-500" />

                Tamil Nadu Venues & Mandapams
              </div>

              {/* Heading */}

              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">

                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  Grand Kalyana Mandapams & Venues
                </span>

              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                Explore air-conditioned Kalyana Mandapams, ECR beach
                resorts, heritage Chettinad mansions, and 5-star
                convention halls across Tamil Nadu.
              </p>

              {/* Hero highlights */}

              <div className="mt-8 grid gap-3 sm:grid-cols-3">

                <HeroFeature
                  icon={<Building2 className="h-4 w-4" />}
                  title="Premium Venues"
                  description="Curated celebration spaces"
                  theme="violet"
                />

                <HeroFeature
                  icon={<Users className="h-4 w-4" />}
                  title="Any Guest Count"
                  description="Intimate to grand gatherings"
                  theme="cyan"
                />

                <HeroFeature
                  icon={<Gem className="h-4 w-4" />}
                  title="Verified Spaces"
                  description="Event-ready locations"
                  theme="amber"
                />

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FILTER AREA
      ===================================================== */}

      <section className="relative px-5 pb-6 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-[0_15px_45px_rgba(15,23,42,0.07)] backdrop-blur-xl">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}

              <div className="relative w-full lg:max-w-md">

                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search by venue, city, or area..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-xs font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

              </div>

              {/* Capacity */}

              <div className="relative w-full lg:w-48">

                <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />

                <select
                  value={capacity}
                  onChange={(e) =>
                    setCapacity(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-xs font-semibold text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
                >
                  <option value="all">
                    Any Capacity
                  </option>

                  <option value="small">
                    Up to 200 Guests
                  </option>

                  <option value="medium">
                    201 - 500 Guests
                  </option>

                  <option value="large">
                    500+ Guests
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              </div>

            </div>

            {/* Category buttons */}

            <div className="mt-5 border-t border-slate-200 pt-5">

              <div className="mb-3 flex items-center gap-2">

                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Browse by venue type
                </p>

              </div>

              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={() =>
                    handleTypeChange("all")
                  }
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    type === "all"
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20"
                      : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                >
                  All Types ({venues.length})
                </button>

                {venueTypes
                  .slice(0, 6)
                  .map((vt, index) => {

                    const gradient =
                      categoryColors[
                        index %
                          categoryColors.length
                      ];

                    return (
                      <button
                        key={vt.id}
                        type="button"
                        onClick={() =>
                          handleTypeChange(vt.id)
                        }
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                          type === vt.id
                            ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                            : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                        }`}
                      >
                        {vt.name}
                      </button>
                    );
                  })}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VENUES GRID
      ===================================================== */}

      <section className="relative px-5 py-12 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-7xl">

          {/* Result header */}

          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Showing{" "}
                <span className="text-slate-900">
                  {filteredVenues.length}
                </span>{" "}
                Verified Venues
              </p>

              <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

            </div>

            {(type !== "all" ||
              capacity !== "all" ||
              search) && (

              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 self-start rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-100 sm:self-auto"
              >
                Reset Filters
                <X className="h-3.5 w-3.5" />
              </button>

            )}

          </div>

          {filteredVenues.length > 0 ? (

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >

              {filteredVenues.map(
                (venue, idx) => {

                  const isFeatured = idx === 0;

                  const theme =
                    cardThemes[
                      idx %
                        cardThemes.length
                    ];

                  return (
                    <motion.article
                      key={venue.id}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 25,
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                        },
                      }}
                      whileHover={{
                        y: -8,
                      }}
                      className={`group relative overflow-hidden rounded-[1.75rem] border bg-gradient-to-br ${theme.card} ${theme.border} ${theme.hoverBorder} shadow-[0_15px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(15,23,42,0.14)]`}
                    >

                      {/* Glow */}

                      <div
                        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${theme.glow} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                      />

                      {/* Top gradient line */}

                      <div
                        className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${theme.badge}`}
                      />

                      <div className="relative">

                        {/* =================================================
                            IMAGE
                        ================================================= */}

                        <div className="relative aspect-[16/10] overflow-hidden">

                          <img
                            src={
                              venue.image ||
                              "/images/chennai_reception_stage.jpg"
                            }
                            alt={venue.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />

                          {/* Type */}

                          <div className="absolute left-4 top-4 flex max-w-[75%] flex-wrap gap-2">

                            <span
                              className={`rounded-full bg-gradient-to-r ${theme.badge} px-3 py-1.5 text-[10px] font-black uppercase tracking-wide ${theme.badgeText} shadow-lg`}
                            >
                              {venue.typeName}
                            </span>

                            {isFeatured && (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-amber-700 shadow-lg backdrop-blur-md">
                                <Crown className="h-3 w-3 text-amber-500" />
                                Premier
                              </span>
                            )}

                          </div>

                          {/* Price */}

                          {(venue.price ||
                            venue.pricing
                              ?.startingFrom) && (

                            <div className="absolute right-4 top-4">

                              <span className="rounded-full border border-white/30 bg-slate-950/70 px-3 py-1.5 text-[10px] font-black text-white shadow-lg backdrop-blur-md">
                                From{" "}
                                {formatCurrency(
                                  venue.price ||
                                    venue
                                      .pricing
                                      ?.startingFrom
                                )}
                              </span>

                            </div>

                          )}

                          {/* Bottom rating */}

                          {venue.rating && (

                            <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full border border-amber-200/30 bg-slate-950/70 px-2.5 py-1.5 text-xs font-bold text-amber-200 backdrop-blur-md">

                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />

                              {venue.rating}

                            </div>

                          )}

                        </div>

                        {/* =================================================
                            CONTENT
                        ================================================= */}

                        <div className="p-5">

                          {/* Title */}

                          <div className="flex items-start gap-3">

                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${theme.icon} text-white shadow-lg`}
                            >
                              <Building2 className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">

                              <h3 className="line-clamp-1 text-base font-black text-slate-900">
                                {venue.name}
                              </h3>

                              {isFeatured && (
                                <p className="mt-1 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-600">
                                  <Sparkles className="h-3 w-3" />
                                  Eventara featured venue
                                </p>
                              )}

                            </div>
                          </div>

                          {/* Description */}

                          <p className="mt-4 line-clamp-2 text-xs leading-6 text-slate-600">
                            {venue.shortDescription ||
                              venue.description}
                          </p>

                          {/* Details */}

                          <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">

                            {venue.location && (

                              <div className="flex items-center gap-2 text-xs text-slate-600">

                                <MapPin
                                  className={`h-3.5 w-3.5 shrink-0 ${theme.accent}`}
                                />

                                <span className="truncate">
                                  {venue.location
                                    .area
                                    ? `${venue.location.area}, `
                                    : ""}
                                  {venue.location.city}
                                </span>

                              </div>

                            )}

                            {venue.capacity && (

                              <div className="flex items-center gap-2 text-xs text-slate-600">

                                <Users
                                  className={`h-3.5 w-3.5 shrink-0 ${theme.accent}`}
                                />

                                <span>
                                  Up to{" "}
                                  {typeof venue.capacity ===
                                  "object"
                                    ? venue.capacity
                                        .maximum ||
                                      venue.capacity
                                        .minimum
                                    : venue.capacity}{" "}
                                  Guests
                                </span>

                              </div>

                            )}

                          </div>

                          {/* Feature tags */}

                          <div className="mt-4 flex flex-wrap gap-2">

                            <span
                              className={`inline-flex items-center gap-1 rounded-full border ${theme.accentBorder} ${theme.accentSoft} px-2.5 py-1 text-[9px] font-bold ${theme.accent}`}
                            >
                              <Check className="h-3 w-3" />
                              Event Ready
                            </span>

                            {venue.featured && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] font-bold text-amber-700">
                                <Crown className="h-3 w-3" />
                                Featured
                              </span>
                            )}

                          </div>

                        </div>
                      </div>

                      {/* =================================================
                          FOOTER BUTTON
                      ================================================= */}

                      <div className="relative px-5 pb-5">

                        <Link
                          to={`/venues/${venue.id}`}
                          className={`group/button flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${theme.button} px-4 py-3 text-xs font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl`}
                        >

                          <span>
                            View Venue Specs & Rates
                          </span>

                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/button:translate-x-1" />

                        </Link>

                      </div>

                    </motion.article>
                  );
                }
              )}

            </motion.div>

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-20 text-center shadow-[0_15px_45px_rgba(15,23,42,0.07)]"
            >

              <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-300/20 blur-3xl" />

              <div className="relative">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 text-white shadow-xl">
                  <Building2 className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-black text-slate-900">
                  No Venues Found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Try searching for Chennai, Coimbatore,
                  Madurai, ECR, or another Tamil Nadu
                  location.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-xs font-black text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  Clear All Filters
                  <X className="h-4 w-4" />
                </button>

              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* =====================================================
          BOTTOM DISCOVERY BANNER
      ===================================================== */}

      <section className="relative px-5 pb-20 sm:px-8 lg:px-12">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10"
        >

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-fuchsia-300/25 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                <Zap className="h-3 w-3" />
                Build your celebration
              </div>

              <h2 className="mt-4 text-2xl font-black text-slate-900 sm:text-3xl">
                Found your venue?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Combine your perfect venue with catering,
                decoration, photography, music and other
                event services to create your complete
                celebration plan.
              </p>

            </div>

            <Link
              to="/services"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-6 py-3.5 text-xs font-black text-white shadow-xl transition-all hover:scale-[1.02] hover:brightness-110"
            >
              Explore Event Services
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>
        </motion.div>
      </section>

    </main>
  );
};

/* =========================================================
   HERO FEATURE
========================================================= */

const HeroFeature = ({
  icon,
  title,
  description,
  theme,
}) => {

  const themes = {
    violet: {
      wrapper:
        "border-violet-200 bg-violet-50/80",
      icon:
        "from-violet-600 to-fuchsia-600",
      title:
        "text-violet-700",
    },

    cyan: {
      wrapper:
        "border-cyan-200 bg-cyan-50/80",
      icon:
        "from-cyan-500 to-blue-600",
      title:
        "text-cyan-700",
    },

    amber: {
      wrapper:
        "border-amber-200 bg-amber-50/80",
      icon:
        "from-amber-500 to-orange-600",
      title:
        "text-amber-700",
    },
  };

  const current =
    themes[theme] || themes.violet;

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className={`flex items-center gap-3 rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-md ${current.wrapper}`}
    >

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${current.icon} text-white shadow-lg`}
      >
        {icon}
      </div>

      <div>

        <p
          className={`text-xs font-black ${current.title}`}
        >
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-500">
          {description}
        </p>

      </div>

    </motion.div>
  );
};

export default Venues;
