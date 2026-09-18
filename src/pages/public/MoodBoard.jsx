
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Plus,
  Trash2,
  Copy,
  X,
  Sparkles,
  WandSparkles,
  Layers3,
  Image as ImageIcon,
  Zap,
  Check,
} from "lucide-react";

const initialPresets = [
  {
    id: "royal-tanjore-marigold",
    name: "Royal Tanjore Temple Gold & Marigold",
    category: "Traditional Tamil Muhurtham & Mandapam",
    palette: [
      { name: "Temple Maroon", hex: "#800020" },
      { name: "Tanjore Gold", hex: "#D4AF37" },
      { name: "Auspicious Marigold", hex: "#FFB300" },
      { name: "Sacred Deep Teal", hex: "#0F766E" },
      { name: "Jasmine Pearl", hex: "#FDFDFD" },
    ],
    items: [
      {
        id: 1,
        title: "Traditional Floral Mandapam & Brass Vilakku",
        image: "/images/hero_mandapam.jpg",
        tag: "Mandapam Decor",
        note: "Marigold garlands, banana saplings, and brass Kuthu Vilakku oil lamps",
      },
      {
        id: 2,
        title: "24-Item Royal Chettinad Banana Leaf Feast",
        image: "/images/banana_leaf_feast.jpg",
        tag: "Culinary Tradition",
        note: "Authentic vegetarian feast on fresh green banana leaf with filter coffee",
      },
      {
        id: 3,
        title: "Grand Modern Reception Stage & Lighting",
        image: "/images/chennai_reception_stage.jpg",
        tag: "Reception Stage",
        note: "Chennai luxury convention floral stage with classical backdrop",
      },
      {
        id: 4,
        title: "Thiruvarur Nadaswaram & Thavil Vidwans",
        image: "/images/nadaswaram_vidwans.jpg",
        tag: "Mangala Vadhyam",
        note: "Live classical music recital in traditional silk veshti & angavastram",
      },
    ],
  },
  {
    id: "chettinad-heritage-teak",
    name: "Chettinad Heritage Mansion & Terracotta",
    category: "Heritage Palaces & Chettinad Banquets",
    palette: [
      { name: "Antique Teak", hex: "#8B4513" },
      { name: "Terracotta Red", hex: "#E07A5F" },
      { name: "Athangudi Blue", hex: "#264653" },
      { name: "Banana Green", hex: "#2D6A4F" },
      { name: "Heritage Ivory", hex: "#F4F1DE" },
    ],
    items: [
      {
        id: 5,
        title: "Athangudi Handcrafted Tile Courtyard",
        image: "/images/chennai_reception_stage.jpg",
        tag: "Spatial Heritage",
        note: "Geometric tile courtyard with hand-carved Burma teak pillars",
      },
      {
        id: 6,
        title: "Heritage Chettinad Brass Urli & Rose Petals",
        image: "/images/hero_mandapam.jpg",
        tag: "Entrance Decor",
        note: "Floating rose petals, camphor lamps, and traditional Thoranam",
      },
    ],
  },
];

const pinGradients = [
  {
    card: "from-violet-50 via-fuchsia-50 to-white",
    border: "border-violet-200",
    accent: "text-violet-600",
    glow: "bg-violet-300/40",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
  },
  {
    card: "from-cyan-50 via-sky-50 to-white",
    border: "border-cyan-200",
    accent: "text-cyan-600",
    glow: "bg-cyan-300/40",
    badge: "bg-cyan-100 text-cyan-700 border-cyan-200",
  },
  {
    card: "from-rose-50 via-pink-50 to-white",
    border: "border-pink-200",
    accent: "text-pink-600",
    glow: "bg-pink-300/40",
    badge: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    card: "from-orange-50 via-amber-50 to-white",
    border: "border-orange-200",
    accent: "text-orange-600",
    glow: "bg-orange-300/40",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    card: "from-emerald-50 via-lime-50 to-white",
    border: "border-emerald-200",
    accent: "text-emerald-600",
    glow: "bg-emerald-300/40",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    card: "from-indigo-50 via-blue-50 to-white",
    border: "border-indigo-200",
    accent: "text-indigo-600",
    glow: "bg-indigo-300/40",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
];

const paletteColors = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-400 to-blue-600",
  "from-amber-400 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-emerald-400 to-teal-600",
];

const MoodBoard = () => {
  const [presets, setPresets] = useState(initialPresets);
  const [activePreset, setActivePreset] = useState(initialPresets[0]);
  const [copiedHex, setCopiedHex] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemTag, setNewItemTag] = useState("Decor");
  const [newItemImage, setNewItemImage] = useState("");
  const [newItemNote, setNewItemNote] = useState("");

  const copyToClipboard = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);

      setTimeout(() => {
        setCopiedHex(null);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy HEX:", error);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!newItemTitle.trim() || !newItemImage.trim()) return;

    const newItem = {
      id: Date.now(),
      title: newItemTitle.trim(),
      tag: newItemTag,
      image: newItemImage.trim(),
      note: newItemNote.trim(),
    };

    const updated = {
      ...activePreset,
      items: [newItem, ...activePreset.items],
    };

    setActivePreset(updated);

    setPresets((prev) =>
      prev.map((preset) =>
        preset.id === updated.id ? updated : preset
      )
    );

    setNewItemTitle("");
    setNewItemTag("Decor");
    setNewItemImage("");
    setNewItemNote("");
    setIsAddModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    const updated = {
      ...activePreset,
      items: activePreset.items.filter((item) => item.id !== id),
    };

    setActivePreset(updated);

    setPresets((prev) =>
      prev.map((preset) =>
        preset.id === updated.id ? updated : preset
      )
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-sky-50/70 to-violet-50/80 px-4 pb-24 pt-28 font-sans text-slate-900 sm:px-6 lg:px-8">

      {/* =========================================================
          Animated Background
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 80, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-120px] top-40 h-[420px] w-[420px] rounded-full bg-sky-300/30 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-160px] left-1/3 h-[420px] w-[420px] rounded-full bg-rose-300/25 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-8">

        {/* =========================================================
            Header
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-violet-100/50 backdrop-blur-xl sm:p-8"
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-200/50 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-cyan-200/40 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-700"
              >
                <Sparkles className="h-4 w-4 text-fuchsia-500" />
                Aesthetic & Palette Studio
              </motion.div>

              <h1 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Ceremony{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
                  Mood Board
                </span>{" "}
                Studio
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                Curate traditional Tamil temple tones, Kanjeevaram-inspired
                palettes, mandapam architecture, floral concepts and
                unforgettable celebration aesthetics.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                  <Palette className="h-3.5 w-3.5" />
                  Color Curation
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700">
                  <Layers3 className="h-3.5 w-3.5" />
                  Visual Concepts
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                  <Zap className="h-3.5 w-3.5" />
                  Celebration Ready
                </span>

              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 35px rgba(217,70,239,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsAddModalOpen(true)}
              className="group relative flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-fuchsia-200"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

              <Plus className="relative h-5 w-5" />

              <span className="relative">
                Add Visual Pin
              </span>

              <Sparkles className="relative h-4 w-4" />
            </motion.button>

          </div>
        </motion.div>

        {/* =========================================================
            Preset Switcher
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-100 backdrop-blur-xl"
        >
          <div className="mb-3 flex items-center gap-2">
            <WandSparkles className="h-4 w-4 text-fuchsia-600" />

            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Curated Themes
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {presets.map((preset, index) => {
              const active = activePreset.id === preset.id;

              return (
                <motion.button
                  key={preset.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActivePreset(preset)}
                  className={`relative min-w-fit overflow-hidden rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
                    active
                      ? "border-fuchsia-300 bg-gradient-to-r from-violet-100 via-fuchsia-100 to-rose-100 text-fuchsia-800 shadow-lg shadow-fuchsia-100"
                      : "border-slate-200 bg-slate-50 text-slate-500 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activePresetGlow"
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10"
                    />
                  )}

                  <span className="relative flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        index === 0
                          ? "bg-fuchsia-500 shadow-[0_0_10px_#e879f9]"
                          : "bg-cyan-500 shadow-[0_0_10px_#22d3ee]"
                      }`}
                    />

                    {preset.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* =========================================================
            Palette
        ========================================================== */}

        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-violet-100/40 backdrop-blur-xl sm:p-7"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />

          <div className="relative mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>
              <div className="flex items-center gap-2">

                <div className="rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 shadow-lg shadow-fuchsia-200">
                  <Palette className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-lg font-black text-slate-900">
                  Official Color Palette
                </h3>

              </div>

              <p className="mt-2 text-xs text-slate-500">
                {activePreset.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Click any swatch to copy its HEX code for decorators,
                designers and printing vendors.
              </p>
            </div>

            <AnimatePresence>
              {copiedHex && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-2 self-start rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 sm:self-auto"
                >
                  <Check className="h-4 w-4" />
                  Copied {copiedHex}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

            {activePreset.palette.map((swatch, index) => (
              <motion.button
                key={swatch.hex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 * index,
                  duration: 0.45,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => copyToClipboard(swatch.hex)}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 text-left shadow-sm transition-all hover:border-violet-200 hover:bg-white hover:shadow-lg hover:shadow-violet-100"
              >

                <div className="relative h-24 overflow-hidden rounded-xl">

                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: swatch.hex,
                    }}
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      paletteColors[index] ||
                      "from-white/20 to-white/5"
                    } opacity-20`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  <div className="absolute bottom-2 left-2 rounded-lg bg-black/30 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                    {index + 1}
                  </div>

                  <motion.div
                    className="absolute right-2 top-2 rounded-lg bg-black/30 p-1.5 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100"
                    whileHover={{ rotate: 8 }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </motion.div>

                </div>

                <div className="px-1 pb-1 pt-3">
                  <p className="truncate text-xs font-black text-slate-800">
                    {swatch.name}
                  </p>

                  <p className="mt-1 font-mono text-[11px] text-slate-500">
                    {swatch.hex}
                  </p>
                </div>

              </motion.button>
            ))}

          </div>
        </motion.section>

        {/* =========================================================
            Visual Pins
        ========================================================== */}

        <section className="space-y-5">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>
              <div className="mb-2 flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_12px_#e879f9]" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-700">
                  Visual Collection
                </span>

              </div>

              <h3 className="font-display text-2xl font-black text-slate-900 sm:text-3xl">
                Visual Concept{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Pins
                </span>
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm">
              <ImageIcon className="h-3.5 w-3.5 text-cyan-600" />
              {activePreset.items.length} Visual Concepts
            </div>

          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            <AnimatePresence mode="popLayout">

              {activePreset.items.map((item, index) => {
                const style = pinGradients[index % pinGradients.length];

                return (
                  <motion.article
                    layout
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 35,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.06,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className={`group relative overflow-hidden rounded-3xl border ${style.border} bg-gradient-to-br ${style.card} shadow-lg transition-shadow duration-300 hover:shadow-xl`}
                  >

                    {/* Glow */}

                    <div
                      className={`pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full ${style.glow} blur-3xl transition-all duration-500 group-hover:scale-150`}
                    />

                    {/* Image */}

                    <div className="relative aspect-[4/3] overflow-hidden">

                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        whileHover={{
                          scale: 1.1,
                        }}
                        transition={{
                          duration: 0.7,
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />

                      {/* Top tag */}

                      <div className="absolute left-3 top-3">

                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${style.badge}`}
                        >
                          {item.tag}
                        </span>

                      </div>

                      {/* Delete */}

                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        onClick={() => handleDeleteItem(item.id)}
                        className="absolute right-3 top-3 rounded-xl border border-white/40 bg-black/40 p-2 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:border-rose-300 hover:bg-rose-500/40 hover:text-rose-100 group-hover:opacity-100"
                        title="Remove Pin"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>

                      {/* Bottom visual number */}

                      <div className="absolute bottom-3 left-3 flex items-center gap-2">

                        <div className="rounded-lg border border-white/30 bg-black/35 px-2 py-1 text-[10px] font-black text-white backdrop-blur-md">
                          PIN {String(index + 1).padStart(2, "0")}
                        </div>

                      </div>
                    </div>

                    {/* Content */}

                    <div className="relative p-5">

                      <h4 className="line-clamp-2 min-h-[42px] text-sm font-black leading-5 text-slate-900 transition-colors group-hover:text-fuchsia-700">
                        {item.title}
                      </h4>

                      {item.note && (
                        <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600">
                          {item.note}
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3">

                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          <Sparkles
                            className={`h-3.5 w-3.5 ${style.accent}`}
                          />
                          Mood Concept
                        </div>

                        <div
                          className={`h-2 w-2 rounded-full ${style.glow.replace(
                            "/40",
                            ""
                          )} shadow-[0_0_10px_currentColor]`}
                        />

                      </div>

                    </div>

                  </motion.article>
                );
              })}

            </AnimatePresence>

          </div>
        </section>

        {/* =========================================================
            Bottom Inspiration Banner
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-r from-violet-100 via-fuchsia-100 to-indigo-100 p-6 shadow-xl shadow-violet-100/60 sm:p-8"
        >

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-300/30 blur-3xl" />

          <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-cyan-300/30 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

            <div>

              <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fuchsia-700">
                <Sparkles className="h-4 w-4" />
                Design Your Celebration
              </div>

              <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                Every celebration deserves its own visual identity.
              </h3>

              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Combine colors, floral architecture, traditional elements and
                modern lighting concepts to create a celebration that feels
                uniquely yours.
              </p>

            </div>

            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 30px rgba(34,211,238,0.25)",
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-200"
            >
              <Plus className="h-4 w-4" />
              Create New Pin
            </motion.button>

          </div>
        </motion.div>

      </div>

      {/* =========================================================
          Add Pin Modal
      ========================================================== */}

      <AnimatePresence>

        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-md"
            onClick={() => setIsAddModalOpen(false)}
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
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-violet-200/60 sm:p-7"
            >

              {/* Modal glow */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-fuchsia-200/50 blur-3xl" />

              <div className="relative">

                {/* Modal header */}

                <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-200 pb-5">

                  <div>

                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-violet-700">
                      <Sparkles className="h-3.5 w-3.5" />
                      New Visual
                    </div>

                    <h3 className="text-xl font-black text-slate-900">
                      Add Visual Concept Pin
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Add an image and styling direction to your mood board.
                    </p>

                  </div>

                  <motion.button
                    whileHover={{
                      rotate: 90,
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>

                </div>

                {/* Form */}

                <form
                  onSubmit={handleAddItem}
                  className="relative space-y-4"
                >

                  {/* Title */}

                  <div>

                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-violet-700">
                      Pin Title
                    </label>

                    <input
                      type="text"
                      required
                      value={newItemTitle}
                      onChange={(e) =>
                        setNewItemTitle(e.target.value)
                      }
                      placeholder="E.g. Marigold & Lotus Urli Entrance"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-violet-50 focus:ring-2 focus:ring-violet-100"
                    />

                  </div>

                  {/* Category */}

                  <div>

                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-cyan-700">
                      Category Tag
                    </label>

                    <input
                      type="text"
                      value={newItemTag}
                      onChange={(e) =>
                        setNewItemTag(e.target.value)
                      }
                      placeholder="E.g. Mandapam Floral"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-cyan-400 focus:bg-cyan-50 focus:ring-2 focus:ring-cyan-100"
                    />

                  </div>

                  {/* Image */}

                  <div>

                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-fuchsia-700">
                      Image URL
                    </label>

                    <input
                      type="text"
                      required
                      value={newItemImage}
                      onChange={(e) =>
                        setNewItemImage(e.target.value)
                      }
                      placeholder="/images/hero_mandapam.jpg or image URL"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-fuchsia-400 focus:bg-fuchsia-50 focus:ring-2 focus:ring-fuchsia-100"
                    />

                  </div>

                  {/* Note */}

                  <div>

                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-amber-700">
                      Styling Note
                    </label>

                    <textarea
                      rows={3}
                      value={newItemNote}
                      onChange={(e) =>
                        setNewItemNote(e.target.value)
                      }
                      placeholder="E.g. Warm amber lighting with brass kuthu vilakku..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-amber-400 focus:bg-amber-50 focus:ring-2 focus:ring-amber-100"
                    />

                  </div>

                  {/* Buttons */}

                  <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                    >
                      Cancel
                    </button>

                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 25px rgba(168,85,247,0.25)",
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-fuchsia-200"
                    >
                      <Plus className="h-4 w-4" />
                      Add Pin
                    </motion.button>

                  </div>

                </form>
              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default MoodBoard;

