
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Car,
  ChefHat,
  Headphones,
  Lightbulb,
  MapPin,
  Presentation,
  Search,
  ShieldCheck,
  Users,
  X,
  CheckCircle2,
  Palette,
  Music,
  Mail,
  CalendarCheck2,
  Layers,
  Sparkles,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  services,
  serviceCategories,
} from "../../data/services";
import formatCurrency from "../../utils/formatCurrency";

const categoryIcons = {
  venue: MapPin,
  decoration: Palette,
  catering: ChefHat,
  photography: Camera,
  music: Headphones,
  entertainment: Music,
  lighting: Lightbulb,
  stage: Presentation,
  transportation: Car,
  "guest-management": Users,
  invitations: Mail,
  makeup: Users,
  security: ShieldCheck,
  "wedding-planning": CalendarCheck2,
};

const serviceGradients = [
  {
    card: "from-violet-50 via-fuchsia-50 to-white",
    border: "border-violet-200",
    glow: "bg-violet-400/20",
    icon: "from-violet-500 to-fuchsia-500",
    badge:
      "bg-violet-50 text-violet-700 border-violet-200",
    price: "from-violet-500 to-fuchsia-500",
    button:
      "from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500",
    check: "text-violet-600",
  },
  {
    card: "from-cyan-50 via-sky-50 to-white",
    border: "border-cyan-200",
    glow: "bg-cyan-400/20",
    icon: "from-cyan-500 to-blue-500",
    badge:
      "bg-cyan-50 text-cyan-700 border-cyan-200",
    price: "from-cyan-500 to-blue-600",
    button:
      "from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500",
    check: "text-cyan-600",
  },
  {
    card: "from-amber-50 via-orange-50 to-white",
    border: "border-amber-200",
    glow: "bg-amber-400/20",
    icon: "from-amber-400 to-orange-500",
    badge:
      "bg-amber-50 text-amber-700 border-amber-200",
    price: "from-amber-400 to-orange-500",
    button:
      "from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400",
    check: "text-amber-600",
  },
  {
    card: "from-rose-50 via-pink-50 to-white",
    border: "border-rose-200",
    glow: "bg-rose-400/20",
    icon: "from-rose-500 to-pink-500",
    badge:
      "bg-rose-50 text-rose-700 border-rose-200",
    price: "from-rose-500 to-pink-500",
    button:
      "from-rose-600 via-pink-600 to-fuchsia-600 hover:from-rose-500 hover:to-fuchsia-500",
    check: "text-rose-600",
  },
  {
    card: "from-emerald-50 via-green-50 to-white",
    border: "border-emerald-200",
    glow: "bg-emerald-400/20",
    icon: "from-emerald-500 to-teal-500",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    price: "from-emerald-500 to-teal-500",
    button:
      "from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
    check: "text-emerald-600",
  },
  {
    card: "from-indigo-50 via-blue-50 to-white",
    border: "border-indigo-200",
    glow: "bg-indigo-400/20",
    icon: "from-indigo-500 to-blue-500",
    badge:
      "bg-indigo-50 text-indigo-700 border-indigo-200",
    price: "from-indigo-500 to-blue-500",
    button:
      "from-indigo-600 via-blue-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500",
    check: "text-indigo-600",
  },
  {
    card: "from-sky-50 via-cyan-50 to-white",
    border: "border-sky-200",
    glow: "bg-sky-400/20",
    icon: "from-sky-500 to-cyan-500",
    badge:
      "bg-sky-50 text-sky-700 border-sky-200",
    price: "from-sky-500 to-cyan-500",
    button:
      "from-sky-600 via-cyan-600 to-teal-600 hover:from-sky-500 hover:to-teal-500",
    check: "text-sky-600",
  },
  {
    card: "from-orange-50 via-red-50 to-white",
    border: "border-orange-200",
    glow: "bg-orange-400/20",
    icon: "from-orange-500 to-red-500",
    badge:
      "bg-orange-50 text-orange-700 border-orange-200",
    price: "from-orange-500 to-red-500",
    button:
      "from-orange-600 via-red-600 to-pink-600 hover:from-orange-500 hover:to-pink-500",
    check: "text-orange-600",
  },
  {
    card: "from-fuchsia-50 via-purple-50 to-white",
    border: "border-fuchsia-200",
    glow: "bg-fuchsia-400/20",
    icon: "from-fuchsia-500 to-purple-500",
    badge:
      "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    price: "from-fuchsia-500 to-purple-500",
    button:
      "from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500",
    check: "text-fuchsia-600",
  },
  {
    card: "from-teal-50 via-emerald-50 to-white",
    border: "border-teal-200",
    glow: "bg-teal-400/20",
    icon: "from-teal-500 to-emerald-500",
    badge:
      "bg-teal-50 text-teal-700 border-teal-200",
    price: "from-teal-500 to-emerald-500",
    button:
      "from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500",
    check: "text-teal-600",
  },
];

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const filteredServices = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesCategory =
        category === "all" ||
        service.category === category ||
        service.categoryName?.toLowerCase() ===
          category.toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        service.name
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        service.description
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        service.shortDescription
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        service.categoryName
          ?.toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }

    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-slate-50 to-sky-50/60 font-sans text-slate-900">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
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
          className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-300/25 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-10rem] top-72 h-[32rem] w-[32rem] rounded-full bg-cyan-300/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -60, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.05),transparent_30%)]" />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative border-b border-slate-200/80 px-5 pb-16 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/85 p-7 shadow-xl shadow-slate-200/60 backdrop-blur-xl sm:p-10 lg:p-14"
          >
            {/* Decorative gradients */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="absolute right-1/3 top-1/2 h-32 w-32 rounded-full bg-violet-300/15 blur-3xl" />

            <div className="relative max-w-4xl">
              {/* Breadcrumb */}
              <div className="mb-5 flex items-center gap-2 text-xs text-slate-500">
                <Link
                  to="/"
                  className="transition-colors hover:text-cyan-600"
                >
                  Home
                </Link>

                <ArrowRight className="h-3 w-3 text-slate-400" />

                <span className="font-semibold text-violet-600">
                  Services
                </span>
              </div>

              {/* Eyebrow */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 shadow-sm">
                <Sparkles className="h-4 w-4 text-fuchsia-500" />
                Comprehensive Event Production
              </div>

              {/* Heading */}
              <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-slate-900">
                  Event Production
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  & Services
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                From traditional Chettinad banana-leaf catering and
                Thiruvarur Nadaswaram to grand temple mandapam decor and
                candid 4K cinematography — bring every detail of your
                celebration together in one place.
              </p>

              {/* Hero highlights */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md shadow-violet-200">
                    <Layers className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {services.length}+
                    </p>

                    <p className="text-xs text-violet-600">
                      Services
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md shadow-cyan-200">
                    <Star className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Curated
                    </p>

                    <p className="text-xs text-cyan-600">
                      Event Experiences
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-200">
                    <CalendarCheck2 className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      End-to-End
                    </p>

                    <p className="text-xs text-amber-600">
                      Event Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FILTER AREA
      ========================================================= */}
      <section className="relative border-b border-slate-200/80 px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-200/50 backdrop-blur-xl lg:p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search services by keyword..."
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    category === "all"
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                >
                  All Services ({services.length})
                </button>

                {serviceCategories.slice(0, 8).map((cat, index) => {
                  const colors = [
                    "violet",
                    "cyan",
                    "amber",
                    "rose",
                    "emerald",
                    "indigo",
                    "sky",
                    "orange",
                  ];

                  const color = colors[index];

                  const activeClasses = {
                    violet:
                      "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200",
                    cyan:
                      "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-200",
                    amber:
                      "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200",
                    rose:
                      "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-200",
                    emerald:
                      "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200",
                    indigo:
                      "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200",
                    sky:
                      "bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-lg shadow-sky-200",
                    orange:
                      "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-200",
                  };

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                        category === cat.id
                          ? activeClasses[color]
                          : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section className="relative px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Result header */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Our Collection
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-600">
                Showing{" "}
                <span className="font-black text-slate-900">
                  {filteredServices.length}
                </span>{" "}
                Production Services
              </p>
            </div>

            {category !== "all" && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 self-start rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 transition-all hover:bg-rose-100 sm:self-auto"
              >
                <span>Reset Category Filter</span>
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service, index) => {
                const Icon =
                  categoryIcons[service.category] || Layers;

                const style =
                  serviceGradients[
                    index % serviceGradients.length
                  ];

                return (
                  <motion.article
                    key={service.id}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(index * 0.06, 0.4),
                    }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.25 },
                    }}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.7rem] border ${style.border} bg-gradient-to-br ${style.card} shadow-lg shadow-slate-200/60 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl`}
                  >
                    {/* Card glow */}
                    <div
                      className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${style.glow} blur-3xl transition-transform duration-500 group-hover:scale-150`}
                    />

                    <div className="relative">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={
                            service.image ||
                            "/images/banana_leaf_feast.jpg"
                          }
                          alt={service.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Image overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent opacity-90" />

                        {/* Category badge */}
                        <div className="absolute left-4 top-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md ${style.badge}`}
                          >
                            <Layers className="h-3 w-3" />
                            {service.categoryName}
                          </span>
                        </div>

                        {/* Price */}
                        {service.price && (
                          <div className="absolute right-4 top-4">
                            <span
                              className={`rounded-full bg-gradient-to-r ${style.price} px-3 py-1.5 text-[10px] font-black text-white shadow-lg`}
                            >
                              Starting{" "}
                              {formatCurrency(service.price)}
                            </span>
                          </div>
                        )}

                        {/* Image bottom title */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-end justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${style.icon} shadow-lg`}
                              >
                                <Icon className="h-5 w-5 text-white" />
                              </div>

                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-white/75">
                                  Eventara Service
                                </p>

                                <h3 className="line-clamp-1 text-base font-black text-white">
                                  {service.name}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative p-5">
                        <p className="line-clamp-3 text-xs leading-6 text-slate-600">
                          {service.shortDescription ||
                            service.description}
                        </p>

                        {/* Features */}
                        {service.features &&
                          service.features.length > 0 && (
                            <div className="mt-5 border-t border-slate-200 pt-4">
                              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                                What's Included
                              </p>

                              <ul className="space-y-2">
                                {service.features
                                  .slice(0, 3)
                                  .map((f, i) => (
                                    <li
                                      key={i}
                                      className="flex items-center gap-2 text-xs text-slate-600"
                                    >
                                      <CheckCircle2
                                        className={`h-4 w-4 shrink-0 ${style.check}`}
                                      />

                                      <span className="truncate">
                                        {f}
                                      </span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Button */}
                    <div className="relative p-5 pt-0">
                      <Link
                        to={`/services/${service.id}`}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${style.button} px-4 py-3 text-xs font-black text-white shadow-lg transition-all duration-300 group-hover:shadow-xl`}
                      >
                        <span>
                          View Service Specifications
                        </span>

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-20 text-center shadow-xl shadow-slate-200/60"
            >
              <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-300/25 blur-3xl" />

              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-200">
                <Search className="h-7 w-7 text-white" />
              </div>

              <h3 className="relative mt-5 text-xl font-black text-slate-900">
                No Services Found
              </h3>

              <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                We couldn't find a service matching your search.
                Try another keyword or reset the filters.
              </p>

              <button
                onClick={clearFilters}
                className="relative mt-6 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-6 py-3 text-xs font-black text-white shadow-lg shadow-violet-200 transition-all hover:scale-105"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================= */}
      <section className="relative px-5 pb-20 pt-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 p-8 shadow-xl shadow-violet-100/70 sm:p-12"
          >
            {/* Background glows */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300/15 blur-3xl" />

            {/* Decorative circles */}
            <div className="absolute right-10 top-10 hidden h-40 w-40 rounded-full border border-cyan-300/30 sm:block" />
            <div className="absolute right-16 top-16 hidden h-28 w-28 rounded-full border border-fuchsia-300/30 sm:block" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-700">
                <Sparkles className="h-3.5 w-3.5" />
                Build Your Celebration
              </div>

              <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Every detail deserves its{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
                  own moment.
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Choose the services that match your vision and let
                Eventara bring your celebration together with a
                seamless, beautifully coordinated experience.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/create-event"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-3 text-xs font-black text-white shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 hover:shadow-blue-300"
                >
                  Start Planning
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3 text-xs font-black text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white hover:text-violet-700"
                >
                  Talk to Our Concierge
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Services;

