import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  ImagePlus,
  Search,
  Trash2,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";

const GALLERY_STORAGE_KEY =
  "functionPlannerGallery";

const DEMO_GALLERY = [
  {
    id: "GAL-1001",
    title: "Elegant Wedding Celebration",
    category: "Wedding",
    description:
      "A beautifully decorated wedding venue with elegant stage and guest seating.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    location: "Chennai",
    eventDate: "2026-02-14",
    featured: true,
    status: "Active",
    createdAt: "2026-02-20T10:00:00",
  },
  {
    id: "GAL-1002",
    title: "Luxury Reception",
    category: "Wedding",
    description:
      "Premium reception decoration with floral arrangements and ambient lighting.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    location: "Coimbatore",
    eventDate: "2026-01-28",
    featured: true,
    status: "Active",
    createdAt: "2026-02-01T10:00:00",
  },
  {
    id: "GAL-1003",
    title: "Corporate Conference",
    category: "Corporate",
    description:
      "Professional conference setup designed for presentations and networking.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    location: "Bengaluru",
    eventDate: "2026-03-10",
    featured: false,
    status: "Active",
    createdAt: "2026-03-12T10:00:00",
  },
  {
    id: "GAL-1004",
    title: "Birthday Celebration",
    category: "Birthday",
    description:
      "Colorful birthday party setup with themed decoration and entertainment.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    location: "Chennai",
    eventDate: "2026-03-18",
    featured: false,
    status: "Active",
    createdAt: "2026-03-20T10:00:00",
  },
  {
    id: "GAL-1005",
    title: "Outdoor Engagement",
    category: "Engagement",
    description:
      "Outdoor engagement celebration with floral backdrop and warm lighting.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    location: "Madurai",
    eventDate: "2026-04-05",
    featured: false,
    status: "Active",
    createdAt: "2026-04-07T10:00:00",
  },
  {
    id: "GAL-1006",
    title: "Baby Shower",
    category: "Baby Shower",
    description:
      "Soft themed baby shower decoration with elegant table arrangements.",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
    location: "Coimbatore",
    eventDate: "2026-04-20",
    featured: false,
    status: "Inactive",
    createdAt: "2026-04-22T10:00:00",
  },
];

const GALLERY_CATEGORIES = [
  "Wedding",
  "Birthday",
  "Engagement",
  "Corporate",
  "Conference",
  "Anniversary",
  "Baby Shower",
  "Private Party",
  "Other",
];

const GalleryManagement = () => {
  const [gallery, setGallery] = useState(
    () => {
      try {
        const saved =
          localStorage.getItem(
            GALLERY_STORAGE_KEY
          );

        return saved
          ? JSON.parse(saved)
          : DEMO_GALLERY;
      } catch {
        return DEMO_GALLERY;
      }
    }
  );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("all");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [featuredFilter, setFeaturedFilter] =
    useState("all");

  const [selectedImage, setSelectedImage] =
    useState(null);
  const [editImage, setEditImage] =
    useState(null);
  const [deleteTarget, setDeleteTarget] =
    useState(null);
  const [showAdd, setShowAdd] =
    useState(false);

  const [formData, setFormData] =
    useState(getEmptyForm());

  /* =========================================================
     SAVE
  ========================================================= */

  const saveGallery = (items) => {
    setGallery(items);

    try {
      localStorage.setItem(
        GALLERY_STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch {
      // Ignore storage errors.
    }
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredGallery = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return gallery.filter((item) => {
      const matchesSearch =
        !query ||
        item.title
          ?.toLowerCase()
          .includes(query) ||
        item.category
          ?.toLowerCase()
          .includes(query) ||
        item.location
          ?.toLowerCase()
          .includes(query) ||
        item.description
          ?.toLowerCase()
          .includes(query);

      const matchesCategory =
        categoryFilter === "all" ||
        item.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        normalizeStatus(item.status) ===
          statusFilter;

      const matchesFeatured =
        featuredFilter === "all" ||
        (featuredFilter === "featured"
          ? item.featured
          : !item.featured);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesFeatured
      );
    });
  }, [
    gallery,
    search,
    categoryFilter,
    statusFilter,
    featuredFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    return {
      total: gallery.length,

      active: gallery.filter(
        (item) =>
          normalizeStatus(item.status) ===
          "active"
      ).length,

      featured: gallery.filter(
        (item) => item.featured
      ).length,

      inactive: gallery.filter(
        (item) =>
          normalizeStatus(item.status) ===
          "inactive"
      ).length,
    };
  }, [gallery]);

  /* =========================================================
     ADD
  ========================================================= */

  const handleAdd = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.image.trim()
    ) {
      return;
    }

    const newItem = {
      id: `GAL-${Date.now()}`,
      ...formData,
      featured:
        Boolean(formData.featured),
      status: "Active",
      createdAt:
        new Date().toISOString(),
    };

    saveGallery([
      newItem,
      ...gallery,
    ]);

    setFormData(getEmptyForm());
    setShowAdd(false);
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const openEdit = (item) => {
    setEditImage(item);

    setFormData({
      title: item.title || "",
      category:
        item.category || "Wedding",
      description:
        item.description || "",
      image: item.image || "",
      location:
        item.location || "",
      eventDate:
        item.eventDate || "",
      featured:
        Boolean(item.featured),
      status:
        item.status || "Active",
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();

    if (!editImage) return;

    const updated = gallery.map(
      (item) =>
        item.id === editImage.id
          ? {
              ...item,
              ...formData,
              featured:
                Boolean(formData.featured),
            }
          : item
    );

    saveGallery(updated);

    setEditImage(null);
    setFormData(getEmptyForm());
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = () => {
    if (!deleteTarget) return;

    const updated = gallery.filter(
      (item) =>
        item.id !== deleteTarget.id
    );

    saveGallery(updated);

    setDeleteTarget(null);

    if (
      selectedImage?.id ===
      deleteTarget.id
    ) {
      setSelectedImage(null);
    }
  };

  /* =========================================================
     TOGGLE STATUS
  ========================================================= */

  const toggleStatus = (item) => {
    const nextStatus =
      normalizeStatus(item.status) ===
      "active"
        ? "Inactive"
        : "Active";

    saveGallery(
      gallery.map((current) =>
        current.id === item.id
          ? {
              ...current,
              status: nextStatus,
            }
          : current
      )
    );

    setSelectedImage((current) =>
      current?.id === item.id
        ? {
            ...current,
            status: nextStatus,
          }
        : current
    );
  };

  /* =========================================================
     TOGGLE FEATURED
  ========================================================= */

  const toggleFeatured = (item) => {
    saveGallery(
      gallery.map((current) =>
        current.id === item.id
          ? {
              ...current,
              featured:
                !current.featured,
            }
          : current
      )
    );

    setSelectedImage((current) =>
      current?.id === item.id
        ? {
            ...current,
            featured:
              !current.featured,
          }
        : current
    );
  };

  return (
    <main className="min-h-full bg-stone-50">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-amber-700">
                <Camera className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Gallery Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Event Gallery
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Manage event photographs, featured
                gallery items and customer-facing
                event inspiration.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setFormData(
                  getEmptyForm()
                );
                setShowAdd(true);
              }}
              icon={
                <ImagePlus className="h-4 w-4" />
              }
            >
              Add Gallery Image
            </Button>
          </div>
        </motion.div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <GalleryStat
            title="Total Images"
            value={stats.total}
            icon={Camera}
          />

          <GalleryStat
            title="Active"
            value={stats.active}
            icon={CheckCircle2}
          />

          <GalleryStat
            title="Featured"
            value={stats.featured}
            icon={Check}
          />

          <GalleryStat
            title="Inactive"
            value={stats.inactive}
            icon={XCircle}
          />
        </div>

        {/* ===================================================
            FILTERS
        =================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="mt-6 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-3 xl:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search gallery images..."
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            <FilterSelect
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[
                {
                  value: "all",
                  label: "All Categories",
                },
                ...GALLERY_CATEGORIES.map(
                  (category) => ({
                    value: category,
                    label: category,
                  })
                ),
              ]}
            />

            <FilterSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                {
                  value: "all",
                  label: "All Status",
                },
                {
                  value: "active",
                  label: "Active",
                },
                {
                  value: "inactive",
                  label: "Inactive",
                },
              ]}
            />

            <FilterSelect
              value={featuredFilter}
              onChange={setFeaturedFilter}
              options={[
                {
                  value: "all",
                  label: "All Images",
                },
                {
                  value: "featured",
                  label: "Featured Only",
                },
                {
                  value: "regular",
                  label: "Regular Images",
                },
              ]}
            />

            {(search ||
              categoryFilter !== "all" ||
              statusFilter !== "all" ||
              featuredFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                  setFeaturedFilter("all");
                }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 text-xs font-bold text-stone-600 transition hover:bg-stone-50"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </motion.section>

        {/* ===================================================
            RESULT COUNT
        =================================================== */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-bold text-stone-800">
              {filteredGallery.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-800">
              {gallery.length}
            </span>{" "}
            images
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Filter className="h-3.5 w-3.5" />
            {stats.featured} featured images
          </div>
        </div>

        {/* ===================================================
            GALLERY GRID
        =================================================== */}

        {filteredGallery.length > 0 ? (
          <motion.div
            layout
            className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map(
                (item, index) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={index}
                    onView={() =>
                      setSelectedImage(
                        item
                      )
                    }
                    onEdit={() =>
                      openEdit(item)
                    }
                    onDelete={() =>
                      setDeleteTarget(
                        item
                      )
                    }
                    onToggleStatus={() =>
                      toggleStatus(item)
                    }
                    onToggleFeatured={() =>
                      toggleFeatured(item)
                    }
                  />
                )
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <EmptyState
              icon="search"
              title="No gallery images found"
              description="Try changing your search or gallery filters."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearch("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                  setFeaturedFilter("all");
                },
              }}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          VIEW IMAGE
      ===================================================== */}

      <Modal
        isOpen={Boolean(selectedImage)}
        onClose={() =>
          setSelectedImage(null)
        }
        title="Gallery Preview"
        description={
          selectedImage?.title || ""
        }
        size="xl"
      >
        {selectedImage && (
          <GalleryDetails
            item={selectedImage}
            onClose={() =>
              setSelectedImage(null)
            }
            onEdit={() => {
              openEdit(selectedImage);
              setSelectedImage(null);
            }}
            onDelete={() => {
              setDeleteTarget(
                selectedImage
              );
              setSelectedImage(null);
            }}
            onToggleStatus={() =>
              toggleStatus(selectedImage)
            }
            onToggleFeatured={() =>
              toggleFeatured(selectedImage)
            }
          />
        )}
      </Modal>

      {/* =====================================================
          ADD
      ===================================================== */}

      <Modal
        isOpen={showAdd}
        onClose={() =>
          setShowAdd(false)
        }
        title="Add Gallery Image"
        description="Add a new event image to the gallery."
        size="lg"
      >
        <GalleryForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAdd}
          onClose={() =>
            setShowAdd(false)
          }
          submitLabel="Add Image"
        />
      </Modal>

      {/* =====================================================
          EDIT
      ===================================================== */}

      <Modal
        isOpen={Boolean(editImage)}
        onClose={() =>
          setEditImage(null)
        }
        title="Edit Gallery Image"
        description="Update gallery image information."
        size="lg"
      >
        {editImage && (
          <GalleryForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleEdit}
            onClose={() =>
              setEditImage(null)
            }
            submitLabel="Save Changes"
            editing
          />
        )}
      </Modal>

      {/* =====================================================
          DELETE
      ===================================================== */}

      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() =>
          setDeleteTarget(null)
        }
        title="Delete Gallery Image?"
        description="This action cannot be undone."
        size="sm"
      >
        {deleteTarget && (
          <div>
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-red-800">
                    {deleteTarget.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    This image will be permanently
                    removed from the gallery.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setDeleteTarget(null)
                }
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={handleDelete}
                icon={
                  <Trash2 className="h-4 w-4" />
                }
              >
                Delete Image
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

/* ===========================================================
   GALLERY CARD
=========================================================== */

const GalleryCard = ({
  item,
  index,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
}) => {
  const active =
    normalizeStatus(item.status) ===
    "active";

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
      }}
      transition={{
        delay: index * 0.04,
      }}
      className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
    >
      {/* Image */}

      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-80" />

        {/* Featured */}

        {item.featured && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg">
            <Check className="h-3 w-3" />
            Featured
          </div>
        )}

        {/* Status */}

        <div className="absolute right-3 top-3">
          <StatusBadge
            status={
              active
                ? "active"
                : "inactive"
            }
            size="sm"
          />
        </div>

        {/* Hover action */}

        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={onView}
            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/95 text-xs font-bold text-stone-700 shadow-lg backdrop-blur transition hover:bg-white"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="flex h-9 w-10 items-center justify-center rounded-xl bg-white/95 text-stone-700 shadow-lg backdrop-blur transition hover:bg-white"
            aria-label="Edit image"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
              {item.category}
            </p>

            <h3 className="mt-1 truncate text-sm font-bold text-stone-900">
              {item.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onToggleFeatured}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
              item.featured
                ? "bg-amber-100 text-amber-600"
                : "bg-stone-100 text-stone-400 hover:text-amber-500"
            }`}
            aria-label="Toggle featured"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-stone-500">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
          <div className="flex min-w-0 items-center gap-2 text-[10px] text-stone-400">
            <Camera className="h-3 w-3 shrink-0" />

            <span className="truncate">
              {item.location || "Location not set"}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleStatus}
            className={`text-[10px] font-bold ${
              active
                ? "text-red-500 hover:text-red-600"
                : "text-emerald-600 hover:text-emerald-700"
            }`}
          >
            {active
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onView}
            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-stone-100 text-[10px] font-bold text-stone-600 transition hover:bg-stone-200"
          >
            <Eye className="h-3.5 w-3.5" />
            Details
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex h-9 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
            aria-label="Delete image"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

/* ===========================================================
   DETAILS
=========================================================== */

const GalleryDetails = ({
  item,
  onClose,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
}) => {
  const active =
    normalizeStatus(item.status) ===
    "active";

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-100">
        <div className="relative aspect-video">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.src =
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80";
            }}
          />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {item.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg">
                <Check className="h-3 w-3" />
                Featured
              </span>
            )}

            <StatusBadge
              status={
                active
                  ? "active"
                  : "inactive"
              }
              size="sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
              {item.category}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-stone-900">
              {item.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onToggleFeatured}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition ${
              item.featured
                ? "bg-amber-100 text-amber-700"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            <Check className="h-4 w-4" />

            {item.featured
              ? "Featured"
              : "Make Featured"}
          </button>
        </div>

        <p className="mt-4 text-sm leading-7 text-stone-600">
          {item.description ||
            "No description provided."}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <DetailItem
            label="Category"
            value={
              item.category ||
              "Not set"
            }
          />

          <DetailItem
            label="Location"
            value={
              item.location ||
              "Not set"
            }
          />

          <DetailItem
            label="Event Date"
            value={
              item.eventDate
                ? formatDisplayDate(
                    item.eventDate
                  )
                : "Not set"
            }
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            type="button"
            variant={
              active
                ? "secondary"
                : "primary"
            }
            onClick={onToggleStatus}
            icon={
              active ? (
                <XCircle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )
            }
          >
            {active
              ? "Deactivate"
              : "Activate"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onEdit}
            icon={
              <Edit3 className="h-4 w-4" />
            }
          >
            Edit Image
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={onDelete}
            icon={
              <Trash2 className="h-4 w-4" />
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ===========================================================
   FORM
=========================================================== */

const GalleryForm = ({
  formData,
  setFormData,
  onSubmit,
  onClose,
  submitLabel,
  editing = false,
}) => {
  const updateField = (
    field,
    value
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Image Title">
          <input
            required
            value={formData.title}
            onChange={(event) =>
              updateField(
                "title",
                event.target.value
              )
            }
            placeholder="Elegant Wedding Celebration"
            className="form-input"
          />
        </FormField>

        <FormField label="Category">
          <div className="relative">
            <select
              value={formData.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.target.value
                )
              }
              className="form-input appearance-none pr-10"
            >
              {GALLERY_CATEGORIES.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          </div>
        </FormField>

        <FormField label="Image URL">
          <input
            required
            type="url"
            value={formData.image}
            onChange={(event) =>
              updateField(
                "image",
                event.target.value
              )
            }
            placeholder="https://example.com/image.jpg"
            className="form-input"
          />
        </FormField>

        <FormField label="Location">
          <input
            value={formData.location}
            onChange={(event) =>
              updateField(
                "location",
                event.target.value
              )
            }
            placeholder="Chennai"
            className="form-input"
          />
        </FormField>

        <FormField label="Event Date">
          <input
            type="date"
            value={formData.eventDate}
            onChange={(event) =>
              updateField(
                "eventDate",
                event.target.value
              )
            }
            className="form-input"
          />
        </FormField>

        {editing && (
          <FormField label="Status">
            <div className="relative">
              <select
                value={formData.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value
                  )
                }
                className="form-input appearance-none pr-10"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            </div>
          </FormField>
        )}
      </div>

      <FormField label="Description">
        <textarea
          rows="5"
          value={formData.description}
          onChange={(event) =>
            updateField(
              "description",
              event.target.value
            )
          }
          placeholder="Describe the event image..."
          className="form-input min-h-[130px] py-3"
        />
      </FormField>

      {/* Featured */}

      <button
        type="button"
        onClick={() =>
          updateField(
            "featured",
            !formData.featured
          )
        }
        className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${
          formData.featured
            ? "border-amber-200 bg-amber-50"
            : "border-stone-200 bg-stone-50 hover:bg-stone-100"
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            formData.featured
              ? "bg-amber-500 text-white"
              : "bg-white text-stone-400"
          }`}
        >
          {formData.featured ? (
            <Check className="h-5 w-5" />
          ) : (
            <Camera className="h-5 w-5" />
          )}
        </div>

        <div>
          <p className="text-sm font-bold text-stone-800">
            Featured Image
          </p>

          <p className="mt-1 text-xs text-stone-500">
            Show this image prominently in the
            customer gallery.
          </p>
        </div>
      </button>

      {/* Preview */}

      {formData.image && (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
          <div className="flex items-center gap-2 border-b border-stone-200 bg-white px-4 py-3">
            <Eye className="h-4 w-4 text-stone-400" />

            <span className="text-xs font-bold text-stone-600">
              Image Preview
            </span>
          </div>

          <div className="aspect-video">
            <img
              src={formData.image}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          icon={
            editing ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Upload className="h-4 w-4" />
            )
          }
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

/* ===========================================================
   STAT
=========================================================== */

const GalleryStat = ({
  title,
  value,
  icon: Icon,
}) => (
  <motion.div
    whileHover={{
      y: -3,
    }}
    className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
  >
    <div className="flex items-center justify-between">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
        <Icon className="h-5 w-5" />
      </div>

      <ArrowUpRight className="h-4 w-4 text-stone-300" />
    </div>

    <p className="mt-5 text-xs font-semibold text-stone-500">
      {title}
    </p>

    <p className="mt-1 text-3xl font-bold tracking-tight text-stone-900">
      {value}
    </p>
  </motion.div>
);

/* ===========================================================
   FILTER SELECT
=========================================================== */

const FilterSelect = ({
  value,
  onChange,
  options,
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(event) =>
        onChange(
          event.target.value
        )
      }
      className="h-11 min-w-[170px] appearance-none rounded-xl border border-stone-200 bg-stone-50 pl-4 pr-10 text-sm font-semibold text-stone-600 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>

    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
  </div>
);

/* ===========================================================
   DETAIL
=========================================================== */

const DetailItem = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
      {label}
    </p>

    <p className="mt-2 text-sm font-semibold text-stone-700">
      {value}
    </p>
  </div>
);

/* ===========================================================
   FORM FIELD
=========================================================== */

const FormField = ({
  label,
  children,
}) => (
  <div>
    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-600">
      {label}
    </label>

    {children}
  </div>
);

/* ===========================================================
   HELPERS
=========================================================== */

const getEmptyForm = () => ({
  title: "",
  category: "Wedding",
  description: "",
  image: "",
  location: "",
  eventDate: "",
  featured: false,
  status: "Active",
});

const normalizeStatus = (
  status
) =>
  String(status || "inactive")
    .trim()
    .toLowerCase();

const formatDisplayDate = (
  value
) => {
  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return String(value);
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(date);
};

export default GalleryManagement;