import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Search,
  X,
  Sparkles,
  Images,
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Traditional Floral Mandapam & Brass Vilakku",
    category: "Muhurtham",
    image: "/images/hero_mandapam.jpg",
    description:
      "Grand temple mandapam decorated with fresh Madurai jasmine, marigold garlands, and auspicious Kuthu Vilakku.",
  },
  {
    id: 2,
    title: "24-Item Royal Chettinad Banana Leaf Feast",
    category: "Catering",
    image: "/images/banana_leaf_feast.jpg",
    description:
      "Traditional South Indian feast served on fresh plantain leaf with Kumbakonam degree filter coffee.",
  },
  {
    id: 3,
    title: "Chennai Luxury Wedding Reception Stage",
    category: "Reception",
    image: "/images/chennai_reception_stage.jpg",
    description:
      "Floral architectural stage setup with warm ambient lighting at Mayor Ramanathan Chettiar Hall.",
  },
  {
    id: 4,
    title: "Thiruvarur Nadaswaram & Thavil Vidwans",
    category: "Music",
    image: "/images/nadaswaram_vidwans.jpg",
    description:
      "Auspicious Mangala Vadhyam recital performed in traditional silk veshti and angavastram.",
  },
  {
    id: 5,
    title: "Seemantham & Valaikaappu Ceremony",
    category: "Ceremony",
    image: "/images/hero_mandapam.jpg",
    description:
      "Traditional baby shower bangle blessings and flower decorations.",
  },
  {
    id: 6,
    title: "Chennai Tech Leadership Conclave",
    category: "Corporate",
    image: "/images/chennai_reception_stage.jpg",
    description:
      "Enterprise keynote stage with 4K multi-camera coverage in Guindy Tech Park.",
  },
];

const categories = [
  "All",
  "Muhurtham",
  "Reception",
  "Catering",
  "Music",
  "Corporate",
  "Ceremony",
];

const cardStyles = [
  {
    card: "from-violet-50 via-purple-50 to-white",
    border: "border-violet-200",
    accent: "text-violet-700",
    badge: "bg-violet-600",
    glow: "bg-violet-400/30",
    hover: "hover:border-violet-400",
    divider: "border-violet-100",
  },
  {
    card: "from-rose-50 via-pink-50 to-white",
    border: "border-rose-200",
    accent: "text-rose-700",
    badge: "bg-rose-600",
    glow: "bg-rose-400/30",
    hover: "hover:border-rose-400",
    divider: "border-rose-100",
  },
  {
    card: "from-amber-50 via-orange-50 to-white",
    border: "border-amber-200",
    accent: "text-amber-700",
    badge: "bg-orange-600",
    glow: "bg-amber-400/30",
    hover: "hover:border-amber-400",
    divider: "border-amber-100",
  },
  {
    card: "from-cyan-50 via-sky-50 to-white",
    border: "border-cyan-200",
    accent: "text-cyan-700",
    badge: "bg-cyan-600",
    glow: "bg-cyan-400/30",
    hover: "hover:border-cyan-400",
    divider: "border-cyan-100",
  },
  {
    card: "from-emerald-50 via-green-50 to-white",
    border: "border-emerald-200",
    accent: "text-emerald-700",
    badge: "bg-emerald-600",
    glow: "bg-emerald-400/30",
    hover: "hover:border-emerald-400",
    divider: "border-emerald-100",
  },
  {
    card: "from-blue-50 via-indigo-50 to-white",
    border: "border-blue-200",
    accent: "text-blue-700",
    badge: "bg-blue-600",
    glow: "bg-blue-400/30",
    hover: "hover:border-blue-400",
    divider: "border-blue-100",
  },
];

const categoryStyles = {
  All: "from-violet-600 to-fuchsia-600",
  Muhurtham: "from-violet-600 to-purple-600",
  Reception: "from-rose-600 to-pink-600",
  Catering: "from-amber-500 to-orange-600",
  Music: "from-cyan-600 to-sky-600",
  Corporate: "from-blue-600 to-indigo-600",
  Ceremony: "from-emerald-600 to-green-600",
};

const Gallery = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchCat =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      const normalizedSearch = search.trim().toLowerCase();

      const matchSearch =
        !normalizedSearch ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch);

      return matchCat && matchSearch;
    });
  }, [selectedCategory, search]);

  const activeStyle =
    activeImage &&
    cardStyles[(activeImage.id - 1) % cardStyles.length];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-20 pt-32 text-white sm:px-8 lg:px-12 lg:pb-24">
        {/* Animated background gradients */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 top-10 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, -35, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl"
        />

        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-[18%] top-20 h-32 w-32 rounded-full border border-amber-300/10"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2 text-xs"
          >
            <Link
              to="/"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Home
            </Link>

            <ArrowRight className="h-3 w-3 text-fuchsia-400" />

            <span className="font-semibold text-fuchsia-300">
              Gallery
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-200 backdrop-blur-md"
          >
            <Camera className="h-4 w-4 text-pink-300" />
            Visual Inspiration
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Moments That
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
              Inspire Beautiful Celebrations
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base"
          >
            Step inside memorable Muhurthams, elegant receptions,
            traditional ceremonies, vibrant feasts, live music experiences,
            and modern corporate events crafted across Tamil Nadu.
          </motion.p>

          {/* Accent */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "190px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-7 h-1 rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300"
          />
        </div>
      </section>

      {/* =========================================================
          FILTER AREA
      ========================================================== */}
      <section className="relative border-b border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search moments, decor, ceremonies..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? `bg-gradient-to-r ${
                          categoryStyles[cat]
                        } text-white shadow-lg`
                      : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          GALLERY
      ========================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/30 to-rose-50/30 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section heading */}
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-fuchsia-600">
                Explore the gallery
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Celebration Stories in Every Frame
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Browse real-inspired event setups, traditional details,
                beautiful decor, food experiences, and unforgettable
                celebration moments.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Images className="h-4 w-4 text-violet-500" />
              {filteredItems.length} Moments
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => {
                  const style =
                    cardStyles[index % cardStyles.length];

                  return (
                    <motion.article
                      key={item.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: Math.min(index * 0.07, 0.35),
                      }}
                      whileHover={{
                        y: -8,
                      }}
                      onClick={() => setActiveImage(item)}
                      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border ${style.border} bg-gradient-to-br ${style.card} shadow-sm transition-all duration-300 ${style.hover} hover:shadow-2xl`}
                    >
                      {/* Glow */}
                      <div
                        className={`absolute -right-12 -top-12 h-36 w-36 rounded-full ${style.glow} blur-3xl transition-transform duration-500 group-hover:scale-150`}
                      />

                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                        {/* Category */}
                        <div className="absolute left-4 top-4">
                          <span
                            className={`rounded-full ${style.badge} px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg`}
                          >
                            {item.category}
                          </span>
                        </div>

                        {/* View indicator */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md"
                        >
                          <Camera className="h-4 w-4" />
                        </motion.div>

                        {/* Bottom title */}
                        <div className="absolute bottom-4 left-4 right-16">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                            Event Story
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative flex flex-1 flex-col p-5">
                        <h3
                          className={`line-clamp-2 text-lg font-extrabold leading-tight text-slate-900 transition-colors ${style.accent}`}
                        >
                          {item.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>

                        {/* Explore */}
                        <div
                          className={`mt-5 flex items-center justify-between border-t ${style.divider} pt-4`}
                        >
                          <span
                            className={`text-xs font-extrabold ${style.accent}`}
                          >
                            View Moment
                          </span>

                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:translate-x-1 ${style.accent}`}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </span>
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
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="rounded-3xl border border-violet-100 bg-white p-10 text-center shadow-xl shadow-violet-100/40"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100">
                <Search className="h-7 w-7 text-violet-600" />
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                No Gallery Moments Found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try a different search term or select another category to
                discover more celebration inspiration.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-6 py-3 text-xs font-extrabold text-white shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span>View All Moments</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* =========================================================
          LIGHTBOX
      ========================================================== */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md sm:p-6"
          >
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
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] bg-slate-900">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setActiveImage(null)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Image category */}
                <div className="absolute bottom-5 left-5">
                  <span
                    className={`rounded-full ${
                      activeStyle?.badge || "bg-violet-600"
                    } px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg`}
                  >
                    {activeImage.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      activeStyle?.card || "bg-violet-50"
                    }`}
                  >
                    <Sparkles
                      className={`h-5 w-5 ${
                        activeStyle?.accent || "text-violet-600"
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold leading-tight text-slate-900 sm:text-2xl">
                      {activeImage.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {activeImage.description}
                    </p>
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

export default Gallery;