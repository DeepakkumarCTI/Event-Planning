import { useMemo, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Star,
  Trash2,
  Users,
} from "lucide-react";

import { events } from "../../data/events";
import { services } from "../../data/services";
import { venues } from "../../data/venues";
import { packages } from "../../data/packages";

import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const STORAGE_KEY = "functionPlannerFavourites";

/* ============================================================
   COLOUR THEMES
============================================================ */

const favouriteThemes = {
  event: {
    card:
      "from-violet-950/80 via-fuchsia-950/40 to-slate-950",
    border:
      "border-violet-400/20",
    hover:
      "hover:border-violet-400/50",
    badge:
      "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    icon:
      "bg-violet-500/15 text-violet-300",
    accent:
      "text-violet-300",
    glow:
      "bg-violet-500/20",
  },

  service: {
    card:
      "from-cyan-950/80 via-blue-950/40 to-slate-950",
    border:
      "border-cyan-400/20",
    hover:
      "hover:border-cyan-400/50",
    badge:
      "bg-gradient-to-r from-cyan-400 to-blue-500",
    icon:
      "bg-cyan-500/15 text-cyan-300",
    accent:
      "text-cyan-300",
    glow:
      "bg-cyan-500/20",
  },

  venue: {
    card:
      "from-amber-950/80 via-orange-950/40 to-slate-950",
    border:
      "border-amber-400/20",
    hover:
      "hover:border-amber-400/50",
    badge:
      "bg-gradient-to-r from-amber-400 to-orange-500",
    icon:
      "bg-amber-500/15 text-amber-300",
    accent:
      "text-amber-300",
    glow:
      "bg-amber-500/20",
  },

  package: {
    card:
      "from-rose-950/80 via-pink-950/40 to-slate-950",
    border:
      "border-rose-400/20",
    hover:
      "hover:border-rose-400/50",
    badge:
      "bg-gradient-to-r from-rose-500 to-pink-500",
    icon:
      "bg-rose-500/15 text-rose-300",
    accent:
      "text-rose-300",
    glow:
      "bg-rose-500/20",
  },
};

/* ============================================================
   FAVOURITES PAGE
============================================================ */

const Favourites = () => {
  const navigate = useNavigate();

  const [favourites, setFavourites] =
    useState(() => {
      try {
        const stored =
          localStorage.getItem(
            STORAGE_KEY
          );

        return stored
          ? JSON.parse(stored)
          : [];
      } catch {
        return [];
      }
    });

  const [activeTab, setActiveTab] =
    useState("all");

  const [search, setSearch] =
    useState("");

  const [removeItem, setRemoveItem] =
    useState(null);

  /* =========================================================
     SAVE FAVOURITES
  ========================================================= */

  const saveFavourites = (updated) => {
    setFavourites(updated);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error(
        "Unable to save favourites:",
        error
      );
    }
  };

  /* =========================================================
     BUILD FAVOURITE ITEMS
  ========================================================= */

  const favouriteItems = useMemo(() => {
    if (!Array.isArray(favourites)) {
      return [];
    }

    return favourites
      .map((item) => {
        const type =
          item?.type || "event";

        const id =
          item?.id ||
          item?.itemId ||
          item?._id;

        let data = null;

        if (type === "event") {
          data =
            events.find(
              (event) =>
                String(event.id) ===
                  String(id) ||
                String(event._id) ===
                  String(id)
            ) || null;
        }

        if (type === "service") {
          data =
            services.find(
              (service) =>
                String(service.id) ===
                  String(id) ||
                String(service._id) ===
                  String(id)
            ) || null;
        }

        if (type === "venue") {
          data =
            venues.find(
              (venue) =>
                String(venue.id) ===
                  String(id) ||
                String(venue._id) ===
                  String(id)
            ) || null;
        }

        if (type === "package") {
          data =
            packages.find(
              (pkg) =>
                String(pkg.id) ===
                  String(id) ||
                String(pkg._id) ===
                  String(id)
            ) || null;
        }

        if (!data) {
          return null;
        }

        return {
          ...data,
          favouriteType: type,
          favouriteId: id,
        };
      })
      .filter(Boolean);
  }, [favourites]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredItems = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return favouriteItems.filter(
      (item) => {
        const matchesType =
          activeTab === "all" ||
          item.favouriteType ===
            activeTab;

        const searchableText = [
          item.name,
          item.title,
          item.description,
          item.shortDescription,
          item.categoryName,
          item.typeName,
          item.location,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !query ||
          searchableText.includes(
            query
          );

        return (
          matchesType &&
          matchesSearch
        );
      }
    );
  }, [
    favouriteItems,
    activeTab,
    search,
  ]);

  /* =========================================================
     REMOVE
  ========================================================= */

  const confirmRemove = () => {
    if (!removeItem) return;

    const updated =
      favourites.filter(
        (item) =>
          !(
            String(
              item.id ||
                item.itemId ||
                item._id
            ) ===
              String(
                removeItem.favouriteId
              ) &&
            (item.type ||
              "event") ===
              removeItem.favouriteType
          )
      );

    saveFavourites(updated);
    setRemoveItem(null);
  };

  /* =========================================================
     COUNTS
  ========================================================= */

  const counts = useMemo(
    () => ({
      all: favouriteItems.length,

      event: favouriteItems.filter(
        (item) =>
          item.favouriteType ===
          "event"
      ).length,

      service: favouriteItems.filter(
        (item) =>
          item.favouriteType ===
          "service"
      ).length,

      venue: favouriteItems.filter(
        (item) =>
          item.favouriteType ===
          "venue"
      ).length,

      package: favouriteItems.filter(
        (item) =>
          item.favouriteType ===
          "package"
      ).length,
    }),
    [favouriteItems]
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pb-16 text-white">
      {/* =====================================================
          ANIMATED BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl"
        />

        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-slate-950/90 to-cyan-950/40" />

          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {/* Badge */}

              <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-rose-300">
                <Heart className="h-4 w-4 fill-current" />

                Saved ideas
              </div>

              <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="max-w-3xl bg-gradient-to-r from-white via-violet-100 to-cyan-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                    Your favourites
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    Keep the events, services, venues
                    and packages you love in one
                    beautiful place.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <HeroStat
                      icon={
                        <Heart className="h-4 w-4" />
                      }
                      value={counts.all}
                      label="Saved"
                      color="violet"
                    />

                    <HeroStat
                      icon={
                        <Sparkles className="h-4 w-4" />
                      }
                      value={
                        counts.event
                      }
                      label="Events"
                      color="cyan"
                    />

                    <HeroStat
                      icon={
                        <MapPin className="h-4 w-4" />
                      }
                      value={
                        counts.venue
                      }
                      label="Venues"
                      color="amber"
                    />
                  </div>
                </div>

                <div className="shrink-0">
                  <Button
                    to="/events"
                    variant="primary"
                    size="sm"
                    icon={
                      <Sparkles className="h-4 w-4" />
                    }
                  >
                    Explore Ideas
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* =================================================
              CATEGORY TABS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.05,
            }}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <div className="flex gap-2 overflow-x-auto">
              <FavouriteTab
                active={
                  activeTab === "all"
                }
                onClick={() =>
                  setActiveTab("all")
                }
                label="All"
                count={counts.all}
                gradient="from-violet-500 to-fuchsia-500"
              />

              <FavouriteTab
                active={
                  activeTab === "event"
                }
                onClick={() =>
                  setActiveTab("event")
                }
                label="Events"
                count={counts.event}
                gradient="from-violet-500 to-fuchsia-500"
              />

              <FavouriteTab
                active={
                  activeTab === "service"
                }
                onClick={() =>
                  setActiveTab("service")
                }
                label="Services"
                count={counts.service}
                gradient="from-cyan-400 to-blue-500"
              />

              <FavouriteTab
                active={
                  activeTab === "venue"
                }
                onClick={() =>
                  setActiveTab("venue")
                }
                label="Venues"
                count={counts.venue}
                gradient="from-amber-400 to-orange-500"
              />

              <FavouriteTab
                active={
                  activeTab === "package"
                }
                onClick={() =>
                  setActiveTab("package")
                }
                label="Packages"
                count={counts.package}
                gradient="from-rose-500 to-pink-500"
              />
            </div>
          </motion.div>

          {/* =================================================
              SEARCH
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="mt-5"
          >
            <div className="relative max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search your saved events, services, venues..."
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-900/80 pl-11 pr-4 text-sm font-medium text-white outline-none shadow-xl shadow-black/10 backdrop-blur-xl transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/10 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>

          {/* =================================================
              RESULT HEADER
          ================================================= */}

          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Saved items
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {filteredItems.length}{" "}
                {filteredItems.length ===
                1
                  ? "item"
                  : "items"}{" "}
                {search &&
                  "matching your search"}
              </p>
            </div>

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="text-xs font-bold text-cyan-300 transition hover:text-cyan-200"
              >
                Clear search
              </button>
            )}
          </div>

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {filteredItems.length ===
          0 ? (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
              <EmptyState
                icon="favourites"
                title={
                  favouriteItems.length ===
                  0
                    ? "Nothing saved yet"
                    : "No favourites found"
                }
                description={
                  favouriteItems.length ===
                  0
                    ? "Browse events, services, venues and packages and save the ideas you want to revisit."
                    : "Try another search or switch to a different category."
                }
                action={
                  favouriteItems.length ===
                  0 ? (
                    <Button
                      to="/events"
                      variant="primary"
                      icon={
                        <Sparkles className="h-4 w-4" />
                      }
                    >
                      Explore Events
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSearch("");
                        setActiveTab(
                          "all"
                        );
                      }}
                    >
                      Clear Filters
                    </Button>
                  )
                }
              />
            </motion.div>
          ) : (
            /* =================================================
               GRID
            ================================================= */

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredItems.map(
                  (item, index) => (
                    <FavouriteCard
                      key={`${item.favouriteType}-${item.favouriteId}`}
                      item={item}
                      index={index}
                      onRemove={() =>
                        setRemoveItem(
                          item
                        )
                      }
                      onOpen={() => {
                        const route =
                          getItemRoute(
                            item
                          );

                        navigate(route);
                      }}
                    />
                  )
                )}
              </AnimatePresence>
            </div>
          )}

          {/* =================================================
              BOTTOM CTA
          ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="relative mt-14 overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-950/70 via-slate-950 to-cyan-950/60 px-6 py-10 shadow-2xl shadow-black/30 sm:px-10"
          >
            {/* Decorative glows */}

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />

            <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Turn inspiration into reality
                </div>

                <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  Found something you love?
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Add your favourite ideas to your
                  event plan and start bringing
                  everything together.
                </p>
              </div>

              <Button
                to="/create-event"
                variant="primary"
                size="lg"
                icon={
                  <ArrowRight className="h-4 w-4" />
                }
              >
                Start Planning
              </Button>
            </div>
          </motion.section>
        </div>
      </div>

      {/* =====================================================
          REMOVE MODAL
      ===================================================== */}

      <Modal
        isOpen={Boolean(removeItem)}
        onClose={() =>
          setRemoveItem(null)
        }
        title="Remove from favourites?"
        description="This item will be removed from your saved ideas."
        size="sm"
      >
        {removeItem && (
          <>
            <div className="overflow-hidden rounded-2xl border border-rose-400/15 bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-950 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/20">
                  <Heart className="h-5 w-5 fill-current" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">
                    {removeItem.name ||
                      removeItem.title}
                  </p>

                  <p className="mt-1 text-xs capitalize text-slate-400">
                    {
                      removeItem.favouriteType
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setRemoveItem(null)
                }
              >
                Keep
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={
                  confirmRemove
                }
                icon={
                  <Trash2 className="h-4 w-4" />
                }
              >
                Remove
              </Button>
            </div>
          </>
        )}
      </Modal>
    </main>
  );
};

/* ============================================================
   HERO STAT
============================================================ */

const HeroStat = ({
  icon,
  value,
  label,
  color,
}) => {
  const styles = {
    violet:
      "border-violet-400/20 bg-violet-500/10 text-violet-300",
    cyan:
      "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
    amber:
      "border-amber-400/20 bg-amber-500/10 text-amber-300",
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${styles[color]}`}
    >
      {icon}

      <span className="font-bold text-white">
        {value}
      </span>

      <span className="text-xs text-slate-400">
        {label}
      </span>
    </div>
  );
};

/* ============================================================
   FAVOURITE TAB
============================================================ */

const FavouriteTab = ({
  active,
  onClick,
  label,
  count,
  gradient,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex shrink-0 items-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-bold transition ${
      active
        ? "text-white shadow-lg"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    {active && (
      <motion.span
        layoutId="favourite-tab"
        className={`absolute inset-0 -z-0 bg-gradient-to-r ${gradient}`}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 30,
        }}
      />
    )}

    <span className="relative z-10">
      {label}
    </span>

    <span
      className={`relative z-10 rounded-full px-2 py-0.5 text-[10px] ${
        active
          ? "bg-white/20 text-white"
          : "bg-white/5 text-slate-500"
      }`}
    >
      {count}
    </span>
  </button>
);

/* ============================================================
   FAVOURITE CARD
============================================================ */

const FavouriteCard = ({
  item,
  index,
  onRemove,
  onOpen,
}) => {
  const type =
    item.favouriteType;

  const theme =
    favouriteThemes[type] ||
    favouriteThemes.event;

  const title =
    item.name ||
    item.title ||
    "Saved item";

  const description =
    item.shortDescription ||
    item.description ||
    "";

  const image =
    item.image ||
    item.images?.[0] ||
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80";

  const typeLabel =
    type === "event"
      ? item.categoryName ||
        "Event"
      : type === "service"
      ? item.categoryName ||
        "Service"
      : type === "venue"
      ? item.typeName ||
        "Venue"
      : type === "package"
      ? item.typeName ||
        "Package"
      : "Saved";

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.94,
      }}
      transition={{
        delay: index * 0.05,
      }}
      whileHover={{
        y: -6,
      }}
      className={`group relative overflow-hidden rounded-3xl border ${theme.border} bg-gradient-to-br ${theme.card} shadow-2xl shadow-black/20 transition ${theme.hover}`}
    >
      {/* Glow */}

      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${theme.glow} blur-3xl`}
      />

      {/* Image */}

      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          onError={(
            event
          ) => {
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80";
          }}
        />

        {/* Dark overlay for image readability */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/10" />

        {/* Type */}

        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg ${theme.badge}`}
          >
            {typeLabel}
          </span>
        </div>

        {/* Remove */}

        <button
          type="button"
          onClick={onRemove}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-slate-950/80 text-rose-300 shadow-xl backdrop-blur-md transition hover:border-rose-400/40 hover:bg-rose-500 hover:text-white"
          aria-label={`Remove ${title} from favourites`}
        >
          <Heart className="h-4 w-4 fill-current" />
        </button>

        {/* Featured */}

        {item.featured && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-500/90 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg">
            <Sparkles className="h-3 w-3" />

            Featured
          </span>
        )}
      </div>

      {/* Content */}

      <div className="relative p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-white">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-400">
          {description}
        </p>

        {/* EVENT */}

        {type === "event" && (
          <div className="mt-4 space-y-2">
            {item.date && (
              <SmallInfo
                icon={
                  <CalendarDays className="h-3.5 w-3.5" />
                }
                value={formatDate(
                  item.date
                )}
                color="violet"
              />
            )}

            {item.location && (
              <SmallInfo
                icon={
                  <MapPin className="h-3.5 w-3.5" />
                }
                value={
                  typeof item.location ===
                  "string"
                    ? item.location
                    : item.location
                        ?.city ||
                      "Location"
                }
                color="cyan"
              />
            )}

            {item.guestCount && (
              <SmallInfo
                icon={
                  <Users className="h-3.5 w-3.5" />
                }
                value={`${item.guestCount} guests`}
                color="amber"
              />
            )}
          </div>
        )}

        {/* VENUE */}

        {type === "venue" && (
          <div className="mt-4 space-y-2">
            <SmallInfo
              icon={
                <MapPin className="h-3.5 w-3.5" />
              }
              value={
                typeof item.location ===
                "string"
                  ? item.location
                  : item.location
                      ?.city ||
                    "Location"
              }
              color="amber"
            />

            {item.capacity && (
              <SmallInfo
                icon={
                  <Users className="h-3.5 w-3.5" />
                }
                value={`${item.capacity} guests capacity`}
                color="emerald"
              />
            )}

            {item.rating && (
              <SmallInfo
                icon={
                  <Star className="h-3.5 w-3.5 fill-current" />
                }
                value={`${item.rating} rating`}
                color="rose"
              />
            )}
          </div>
        )}

        {/* SERVICE */}

        {type === "service" && (
          <div className="mt-4">
            {item.price && (
              <div className="rounded-xl border border-cyan-400/10 bg-cyan-500/5 px-3 py-2">
                <p className="text-sm font-bold text-white">
                  {formatCurrency(
                    item.price
                  )}

                  {item.unit && (
                    <span className="ml-1 text-xs font-medium text-slate-500">
                      {item.unit}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {/* PACKAGE */}

        {type === "package" && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-rose-400/10 bg-rose-500/5 px-3 py-2">
            {item.price && (
              <p className="text-sm font-bold text-white">
                {formatCurrency(
                  item.price
                )}
              </p>
            )}

            {item.guestRange && (
              <span className="text-xs font-medium text-slate-400">
                {item.guestRange}
              </span>
            )}
          </div>
        )}

        {/* ACTIONS */}

        <div className="mt-5 flex gap-2 border-t border-white/10 pt-4">
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={onOpen}
            icon={
              <ArrowRight className="h-4 w-4" />
            }
          >
            View Details
          </Button>

          <button
            type="button"
            onClick={onRemove}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-500 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300"
            aria-label="Remove favourite"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

/* ============================================================
   SMALL INFO
============================================================ */

const SmallInfo = ({
  icon,
  value,
  color = "cyan",
}) => {
  const iconColors = {
    violet: "text-violet-300",
    cyan: "text-cyan-300",
    amber: "text-amber-300",
    emerald: "text-emerald-300",
    rose: "text-rose-300",
  };

  return (
    <div className="flex min-w-0 items-center gap-2 text-xs text-slate-400">
      <span
        className={`shrink-0 ${
          iconColors[color]
        }`}
      >
        {icon}
      </span>

      <span className="truncate">
        {value}
      </span>
    </div>
  );
};

/* ============================================================
   ROUTE HELPER
============================================================ */

const getItemRoute = (item) => {
  const id =
    item.favouriteId;

  switch (item.favouriteType) {
    case "event":
      return `/events/${id}`;

    case "service":
      return `/services/${id}`;

    case "venue":
      return `/venues/${id}`;

    case "package":
      return `/packages/${id}`;

    default:
      return "/events";
  }
};

export default Favourites;