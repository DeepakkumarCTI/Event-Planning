import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { venues, venueTypes } from "../../data/venues";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { formatCurrency } from "../../utils/formatCurrency";

const VenueManagement = () => {
  const [venueList, setVenueList] = useState(() =>
    venues.map((venue) => ({
      ...venue,
      active: venue.active !== false,
    }))
  );

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("all");

  const [selectedVenue, setSelectedVenue] = useState(null);
  const [editVenue, setEditVenue] = useState(null);
  const [deleteVenue, setDeleteVenue] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getVenueType = (venue) =>
    venue.typeName || venue.type || "Venue";

  const getVenueLocation = (venue) => {
    if (typeof venue.location === "string") {
      return venue.location;
    }

    if (venue.location?.city) {
      return [
        venue.location.city,
        venue.location.state,
      ]
        .filter(Boolean)
        .join(", ");
    }

    return "Location not specified";
  };

  const getCapacityText = (venue) => {
    if (typeof venue.capacity === "string") {
      return venue.capacity;
    }

    if (typeof venue.capacity === "number") {
      return `${venue.capacity} guests`;
    }

    if (venue.capacity?.max) {
      return `${venue.capacity.min || 0} - ${venue.capacity.max} guests`;
    }

    return "Flexible";
  };

  const getMaxCapacity = (venue) => {
    if (typeof venue.capacity === "number") {
      return venue.capacity;
    }

    if (venue.capacity?.max) {
      return Number(venue.capacity.max) || 0;
    }

    if (typeof venue.capacity === "string") {
      const numbers = venue.capacity.match(/\d[\d,]*/g);

      if (numbers?.length) {
        return Math.max(
          ...numbers.map((number) =>
            Number(number.replace(/,/g, ""))
          )
        );
      }
    }

    return 0;
  };

  const getVenuePrice = (venue) => {
    if (typeof venue.pricing === "number") {
      return venue.pricing;
    }

    if (venue.pricing?.startingFrom) {
      return Number(venue.pricing.startingFrom) || 0;
    }

    if (venue.pricing?.price) {
      return Number(venue.pricing.price) || 0;
    }

    if (typeof venue.price === "number") {
      return venue.price;
    }

    return 0;
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredVenues = useMemo(() => {
    const query = search.trim().toLowerCase();

    return venueList.filter((venue) => {
      const name = venue.name || "";
      const type = getVenueType(venue);
      const location = getVenueLocation(venue);
      const description =
        venue.description ||
        venue.shortDescription ||
        "";

      const matchesSearch =
        !query ||
        name.toLowerCase().includes(query) ||
        type.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "all" ||
        String(venue.type).toLowerCase() ===
          typeFilter.toLowerCase();

      const maxCapacity = getMaxCapacity(venue);

      const matchesCapacity =
        capacityFilter === "all" ||
        (capacityFilter === "small" &&
          maxCapacity > 0 &&
          maxCapacity <= 100) ||
        (capacityFilter === "medium" &&
          maxCapacity > 100 &&
          maxCapacity <= 300) ||
        (capacityFilter === "large" &&
          maxCapacity > 300 &&
          maxCapacity <= 700) ||
        (capacityFilter === "xlarge" &&
          maxCapacity > 700);

      const active = venue.active !== false;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && active) ||
        (statusFilter === "inactive" && !active) ||
        (statusFilter === "featured" && venue.featured) ||
        (statusFilter === "popular" && venue.popular) ||
        (statusFilter === "available" &&
          venue.availability !== false);

      return (
        matchesSearch &&
        matchesType &&
        matchesCapacity &&
        matchesStatus
      );
    });
  }, [
    venueList,
    search,
    typeFilter,
    capacityFilter,
    statusFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const total = venueList.length;

    const active = venueList.filter(
      (venue) => venue.active !== false
    ).length;

    const inactive = total - active;

    const featured = venueList.filter(
      (venue) => venue.featured
    ).length;

    const available = venueList.filter(
      (venue) => venue.availability !== false
    ).length;

    return {
      total,
      active,
      inactive,
      featured,
      available,
    };
  }, [venueList]);

  /* =========================================================
     TOGGLE
  ========================================================= */

  const toggleVenue = (venueId) => {
    setVenueList((current) =>
      current.map((venue) =>
        venue.id === venueId
          ? {
              ...venue,
              active: !(venue.active !== false),
            }
          : venue
      )
    );
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = () => {
    if (!deleteVenue) return;

    setVenueList((current) =>
      current.filter(
        (venue) => venue.id !== deleteVenue.id
      )
    );

    setDeleteVenue(null);
  };

  /* =========================================================
     UPDATE
  ========================================================= */

  const handleUpdate = (updatedVenue) => {
    setVenueList((current) =>
      current.map((venue) =>
        venue.id === updatedVenue.id
          ? updatedVenue
          : venue
      )
    );

    setEditVenue(null);
  };

  return (
    <main className="min-h-full bg-stone-50">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-amber-700">
                <Building2 className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Venue Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Manage Venues
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Manage event venues, capacities, pricing,
                amenities and customer availability.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setShowCreateModal(true)}
              icon={<Plus className="h-4 w-4" />}
            >
              Add Venue
            </Button>
          </div>
        </motion.div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <VenueStat
            title="Total Venues"
            value={stats.total}
            icon={Building2}
          />

          <VenueStat
            title="Active Venues"
            value={stats.active}
            icon={CheckCircle2}
          />

          <VenueStat
            title="Featured Venues"
            value={stats.featured}
            icon={Sparkles}
          />

          <VenueStat
            title="Available"
            value={stats.available}
            icon={MapPin}
          />
        </div>

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-6 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-3 xl:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search venues..."
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            {/* Venue Type */}

            <FilterSelect
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                {
                  value: "all",
                  label: "All Venue Types",
                },
                ...venueTypes.map((type) => ({
                  value: type.id,
                  label: type.name,
                })),
              ]}
            />

            {/* Capacity */}

            <FilterSelect
              value={capacityFilter}
              onChange={setCapacityFilter}
              options={[
                {
                  value: "all",
                  label: "All Capacities",
                },
                {
                  value: "small",
                  label: "Up to 100",
                },
                {
                  value: "medium",
                  label: "101 - 300",
                },
                {
                  value: "large",
                  label: "301 - 700",
                },
                {
                  value: "xlarge",
                  label: "700+",
                },
              ]}
            />

            {/* Status */}

            <FilterSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                {
                  value: "all",
                  label: "All Statuses",
                },
                {
                  value: "active",
                  label: "Active",
                },
                {
                  value: "inactive",
                  label: "Inactive",
                },
                {
                  value: "featured",
                  label: "Featured",
                },
                {
                  value: "popular",
                  label: "Popular",
                },
                {
                  value: "available",
                  label: "Available",
                },
              ]}
            />

            {(search ||
              typeFilter !== "all" ||
              capacityFilter !== "all" ||
              statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                  setCapacityFilter("all");
                  setStatusFilter("all");
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
              {filteredVenues.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-800">
              {venueList.length}
            </span>{" "}
            venues
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Filter className="h-3.5 w-3.5" />
            Customer-facing venue catalogue
          </div>
        </div>

        {/* ===================================================
            VENUE GRID
        =================================================== */}

        {filteredVenues.length > 0 ? (
          <motion.div
            layout
            className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredVenues.map((venue, index) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  index={index}
                  onView={() =>
                    setSelectedVenue(venue)
                  }
                  onEdit={() =>
                    setEditVenue(venue)
                  }
                  onDelete={() =>
                    setDeleteVenue(venue)
                  }
                  onToggle={() =>
                    toggleVenue(venue.id)
                  }
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-3 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <EmptyState
              icon="search"
              title="No venues found"
              description="Try changing your search or filter settings."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearch("");
                  setTypeFilter("all");
                  setCapacityFilter("all");
                  setStatusFilter("all");
                },
              }}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      <Modal
        isOpen={Boolean(selectedVenue)}
        onClose={() => setSelectedVenue(null)}
        title={selectedVenue?.name || "Venue Details"}
        description="Venue information and availability"
        size="lg"
      >
        {selectedVenue && (
          <VenueDetails
            venue={selectedVenue}
            onClose={() => setSelectedVenue(null)}
            onEdit={() => {
              setEditVenue(selectedVenue);
              setSelectedVenue(null);
            }}
          />
        )}
      </Modal>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      <Modal
        isOpen={Boolean(editVenue)}
        onClose={() => setEditVenue(null)}
        title="Edit Venue"
        description="Update venue information."
        size="lg"
      >
        {editVenue && (
          <VenueForm
            venue={editVenue}
            onClose={() => setEditVenue(null)}
            onSave={handleUpdate}
          />
        )}
      </Modal>

      {/* =====================================================
          CREATE MODAL
      ===================================================== */}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Venue"
        description="Create a venue for your event catalogue."
        size="lg"
      >
        <VenueForm
          onClose={() => setShowCreateModal(false)}
          onSave={(newVenue) => {
            setVenueList((current) => [
              {
                ...newVenue,
                id: `venue-${Date.now()}`,
              },
              ...current,
            ]);

            setShowCreateModal(false);
          }}
        />
      </Modal>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <Modal
        isOpen={Boolean(deleteVenue)}
        onClose={() => setDeleteVenue(null)}
        title="Delete Venue?"
        description="This action cannot be undone."
        size="sm"
      >
        {deleteVenue && (
          <div>
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-red-800">
                    {deleteVenue.name}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    This venue will be removed from the
                    current admin venue list.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDeleteVenue(null)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={handleDelete}
                icon={<Trash2 className="h-4 w-4" />}
              >
                Delete Venue
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

/* ===========================================================
   VENUE CARD
=========================================================== */

const VenueCard = ({
  venue,
  index,
  onView,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const active = venue.active !== false;
  const price = getCardPrice(venue);

  const location =
    typeof venue.location === "string"
      ? venue.location
      : venue.location?.city ||
        "Location not specified";

  const capacity = getCardCapacity(venue);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.04 }}
      className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
    >
      {/* Image */}

      <div className="relative h-48 overflow-hidden bg-stone-100">
        {venue.image ? (
          <img
            src={venue.image}
            alt={venue.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Building2 className="h-12 w-12 text-stone-300" />
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] font-bold text-stone-700 shadow-sm backdrop-blur">
            {venue.typeName ||
              venue.type ||
              "Venue"}
          </span>

          <div className="flex gap-2">
            {venue.featured && (
              <span className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm">
                Featured
              </span>
            )}

            {venue.popular && (
              <span className="rounded-lg bg-stone-900/80 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm backdrop-blur">
                Popular
              </span>
            )}
          </div>
        </div>

        <div className="absolute bottom-3 left-3">
          <StatusBadge
            status={active ? "active" : "inactive"}
            size="sm"
          />
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-stone-900">
              {venue.name}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
              <MapPin className="h-3.5 w-3.5 shrink-0" />

              <span className="truncate">
                {location}
              </span>
            </div>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Building2 className="h-4 w-4" />
          </div>
        </div>

        <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-5 text-stone-500">
          {venue.description ||
            "A flexible venue for memorable events."}
        </p>

        {/* Info */}

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-stone-100 pt-4">
          <div className="rounded-xl bg-stone-50 p-3">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Users className="h-3.5 w-3.5" />

              <span className="text-[10px] font-bold uppercase tracking-wider">
                Capacity
              </span>
            </div>

            <p className="mt-1 text-xs font-bold text-stone-800">
              {capacity}
            </p>
          </div>

          <div className="rounded-xl bg-stone-50 p-3">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Star className="h-3.5 w-3.5" />

              <span className="text-[10px] font-bold uppercase tracking-wider">
                Rating
              </span>
            </div>

            <p className="mt-1 text-xs font-bold text-stone-800">
              {venue.rating
                ? `${venue.rating} / 5`
                : "Not rated"}
            </p>
          </div>
        </div>

        {/* Price */}

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Pricing
            </p>

            <p className="mt-1 text-lg font-bold text-stone-900">
              {price
                ? formatCurrency(price)
                : "Custom"}
            </p>
          </div>

          {venue.reviews !== undefined && (
            <p className="text-[10px] text-stone-400">
              {venue.reviews} reviews
            </p>
          )}
        </div>

        {/* Availability */}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Visibility
          </span>

          <button
            type="button"
            onClick={onToggle}
            className="flex items-center gap-2"
          >
            <span className="text-[10px] font-bold text-stone-400">
              {active ? "Active" : "Inactive"}
            </span>

            <span
              className={`relative h-6 w-11 rounded-full p-1 transition ${
                active
                  ? "bg-amber-500"
                  : "bg-stone-300"
              }`}
            >
              <span
                className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  active
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Actions */}

        <div className="mt-4 grid grid-cols-3 gap-2">
          <CardAction
            icon={Eye}
            label="View"
            onClick={onView}
          />

          <CardAction
            icon={Edit3}
            label="Edit"
            onClick={onEdit}
          />

          <CardAction
            icon={Trash2}
            label="Delete"
            danger
            onClick={onDelete}
          />
        </div>
      </div>
    </motion.article>
  );
};

/* ===========================================================
   VENUE DETAILS
=========================================================== */

const VenueDetails = ({
  venue,
  onClose,
  onEdit,
}) => {
  const active = venue.active !== false;

  const amenities = Array.isArray(venue.amenities)
    ? venue.amenities
    : [];

  const suitableFor = Array.isArray(
    venue.suitableFor
  )
    ? venue.suitableFor
    : [];

  const highlights = Array.isArray(
    venue.highlights
  )
    ? venue.highlights
    : [];

  const gallery = Array.isArray(venue.gallery)
    ? venue.gallery
    : [];

  const price = getCardPrice(venue);

  return (
    <div>
      {/* Hero */}

      <div className="relative overflow-hidden rounded-2xl bg-stone-100">
        {venue.image ? (
          <img
            src={venue.image}
            alt={venue.name}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="flex h-56 items-center justify-center">
            <Building2 className="h-14 w-14 text-stone-300" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-white/15 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur">
              {venue.typeName ||
                venue.type ||
                "Venue"}
            </span>

            {venue.featured && (
              <span className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-[10px] font-bold text-white">
                Featured
              </span>
            )}

            {venue.popular && (
              <span className="rounded-lg bg-white/15 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur">
                Popular
              </span>
            )}
          </div>

          <h2 className="mt-3 text-xl font-bold text-white">
            {venue.name}
          </h2>
        </div>
      </div>

      {/* Summary */}

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <DetailItem
          label="Status"
          value={
            <StatusBadge
              status={active ? "active" : "inactive"}
              size="sm"
            />
          }
        />

        <DetailItem
          label="Capacity"
          value={getCardCapacity(venue)}
        />

        <DetailItem
          label="Rating"
          value={
            venue.rating
              ? `${venue.rating} / 5`
              : "Not rated"
          }
        />

        <DetailItem
          label="Price"
          value={
            price
              ? formatCurrency(price)
              : "Custom"
          }
        />
      </div>

      {/* Location */}

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <MapPin className="h-4 w-4" />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Location
          </p>

          <p className="mt-1 text-sm font-semibold text-stone-700">
            {getDetailedLocation(venue)}
          </p>
        </div>
      </div>

      {/* Description */}

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
          About This Venue
        </p>

        <p className="mt-2 text-sm leading-6 text-stone-600">
          {venue.description ||
            "No venue description available."}
        </p>
      </div>

      {/* Highlights */}

      {highlights.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Highlights
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {highlights.map(
              (highlight, index) => (
                <div
                  key={`${highlight}-${index}`}
                  className="flex items-start gap-2 rounded-xl bg-stone-50 p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                  <span className="text-xs font-semibold leading-5 text-stone-600">
                    {highlight}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Amenities */}

      {amenities.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Amenities
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {amenities.map(
              (amenity, index) => (
                <span
                  key={`${amenity}-${index}`}
                  className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700"
                >
                  {typeof amenity === "object"
                    ? amenity.name
                    : amenity}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Suitable For */}

      {suitableFor.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Suitable For
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {suitableFor.map(
              (eventType, index) => (
                <span
                  key={`${eventType}-${index}`}
                  className="rounded-lg bg-stone-100 px-3 py-2 text-xs font-semibold text-stone-600"
                >
                  {eventType}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Gallery */}

      {gallery.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Gallery
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {gallery.slice(0, 6).map(
              (image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="aspect-[4/3] overflow-hidden rounded-xl bg-stone-100"
                >
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : image?.url
                    }
                    alt={`${venue.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Actions */}

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Close
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={onEdit}
          icon={<Edit3 className="h-4 w-4" />}
        >
          Edit Venue
        </Button>
      </div>
    </div>
  );
};

/* ===========================================================
   VENUE FORM
=========================================================== */

const VenueForm = ({
  venue,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(venue);

  const [formData, setFormData] = useState(() => ({
    name: venue?.name || "",

    type:
      venue?.type ||
      venueTypes[0]?.id ||
      "",

    typeName:
      venue?.typeName ||
      venueTypes[0]?.name ||
      "",

    description:
      venue?.description || "",

    image:
      venue?.image || "",

    city:
      typeof venue?.location === "object"
        ? venue?.location?.city || ""
        : venue?.location || "",

    address:
      typeof venue?.location === "object"
        ? venue?.location?.address || ""
        : "",

    capacity:
      typeof venue?.capacity === "number"
        ? venue.capacity
        : venue?.capacity?.max || "",

    minCapacity:
      venue?.capacity?.min || "",

    price:
      getCardPrice(venue || {}),

    priceLabel:
      venue?.pricing?.priceLabel ||
      venue?.priceLabel ||
      "",

    rating:
      venue?.rating || "",

    reviews:
      venue?.reviews || "",

    amenities:
      Array.isArray(venue?.amenities)
        ? venue.amenities
            .map((item) =>
              typeof item === "object"
                ? item.name
                : item
            )
            .join("\n")
        : "",

    suitableFor:
      Array.isArray(venue?.suitableFor)
        ? venue.suitableFor.join(", ")
        : "",

    highlights:
      Array.isArray(venue?.highlights)
        ? venue.highlights.join("\n")
        : "",

    featured:
      Boolean(venue?.featured),

    popular:
      Boolean(venue?.popular),

    active:
      venue?.active !== false,

    availability:
      venue?.availability !== false,
  }));

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (name === "type") {
      const selectedType = venueTypes.find(
        (venueType) =>
          venueType.id === value
      );

      setFormData((current) => ({
        ...current,
        typeName:
          selectedType?.name || value,
      }));
    }

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter a venue name.");
      return;
    }

    if (!formData.type) {
      setError("Please select a venue type.");
      return;
    }

    const splitLines = (value) =>
      value
        .split("\n")
        .map((entry) => entry.trim())
        .filter(Boolean);

    const splitComma = (value) =>
      value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);

    const minCapacity =
      Number(formData.minCapacity) || 0;

    const maxCapacity =
      Number(formData.capacity) || 0;

    const data = {
      ...(venue || {}),

      name: formData.name.trim(),

      type: formData.type,

      typeName: formData.typeName,

      description:
        formData.description.trim(),

      image:
        formData.image.trim(),

      location: {
        city: formData.city.trim(),
        address: formData.address.trim(),
      },

      capacity: {
        min: minCapacity,
        max: maxCapacity,
      },

      pricing: {
        startingFrom:
          Number(formData.price) || 0,
        priceLabel:
          formData.priceLabel.trim(),
      },

      rating:
        Number(formData.rating) || 0,

      reviews:
        Number(formData.reviews) || 0,

      amenities:
        splitLines(formData.amenities),

      suitableFor:
        splitComma(formData.suitableFor),

      highlights:
        splitLines(formData.highlights),

      featured:
        formData.featured,

      popular:
        formData.popular,

      active:
        formData.active,

      availability:
        formData.availability,
    };

    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-xs font-semibold text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Name / Type */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Venue Name"
          required
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Grand Heritage Hall"
            className="form-input"
          />
        </FormField>

        <FormField
          label="Venue Type"
          required
        >
          <div className="relative">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-input appearance-none pr-10"
            >
              {venueTypes.map((type) => (
                <option
                  key={type.id}
                  value={type.id}
                >
                  {type.name}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          </div>
        </FormField>
      </div>

      {/* Description */}

      <FormField label="Description">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the venue..."
          className="form-input min-h-28 py-3"
        />
      </FormField>

      {/* Image */}

      <FormField label="Image URL">
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
          className="form-input"
        />
      </FormField>

      {/* Location */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="City">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Chennai"
            className="form-input"
          />
        </FormField>

        <FormField label="Address">
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Venue address"
            className="form-input"
          />
        </FormField>
      </div>

      {/* Capacity */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Minimum Capacity">
          <input
            name="minCapacity"
            type="number"
            min="0"
            value={formData.minCapacity}
            onChange={handleChange}
            placeholder="50"
            className="form-input"
          />
        </FormField>

        <FormField label="Maximum Capacity">
          <input
            name="capacity"
            type="number"
            min="0"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="500"
            className="form-input"
          />
        </FormField>
      </div>

      {/* Pricing */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Starting Price">
          <input
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="50000"
            className="form-input"
          />
        </FormField>

        <FormField label="Price Label">
          <input
            name="priceLabel"
            value={formData.priceLabel}
            onChange={handleChange}
            placeholder="Starting from"
            className="form-input"
          />
        </FormField>
      </div>

      {/* Rating */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Rating">
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            placeholder="4.5"
            className="form-input"
          />
        </FormField>

        <FormField label="Review Count">
          <input
            name="reviews"
            type="number"
            min="0"
            value={formData.reviews}
            onChange={handleChange}
            placeholder="120"
            className="form-input"
          />
        </FormField>
      </div>

      {/* Amenities */}

      <FormField
        label="Amenities"
        hint="Enter one amenity per line"
      >
        <textarea
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          rows={5}
          placeholder={
            "Air conditioning\nParking\nWi-Fi\nPower backup"
          }
          className="form-input min-h-32 py-3"
        />
      </FormField>

      {/* Suitable for */}

      <FormField
        label="Suitable For"
        hint="Separate items with commas"
      >
        <input
          name="suitableFor"
          value={formData.suitableFor}
          onChange={handleChange}
          placeholder="Wedding, Reception, Conference"
          className="form-input"
        />
      </FormField>

      {/* Highlights */}

      <FormField
        label="Highlights"
        hint="Enter one highlight per line"
      >
        <textarea
          name="highlights"
          value={formData.highlights}
          onChange={handleChange}
          rows={4}
          placeholder={
            "Elegant interiors\nLarge parking area\nPremium event setup"
          }
          className="form-input min-h-28 py-3"
        />
      </FormField>

      {/* Toggles */}

      <div className="grid gap-3 sm:grid-cols-2">
        <ToggleField
          checked={formData.active}
          onChange={() =>
            setFormData((current) => ({
              ...current,
              active: !current.active,
            }))
          }
          title="Active"
          description="Show this venue in the customer catalogue."
        />

        <ToggleField
          checked={formData.availability}
          onChange={() =>
            setFormData((current) => ({
              ...current,
              availability:
                !current.availability,
            }))
          }
          title="Available"
          description="Allow customers to consider this venue."
        />

        <ToggleField
          checked={formData.featured}
          onChange={() =>
            setFormData((current) => ({
              ...current,
              featured: !current.featured,
            }))
          }
          title="Featured"
          description="Highlight this venue."
        />

        <ToggleField
          checked={formData.popular}
          onChange={() =>
            setFormData((current) => ({
              ...current,
              popular: !current.popular,
            }))
          }
          title="Popular"
          description="Mark this venue as popular."
        />
      </div>

      {/* Actions */}

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
            <CheckCircle2 className="h-4 w-4" />
          }
        >
          {isEditing
            ? "Save Changes"
            : "Create Venue"}
        </Button>
      </div>
    </form>
  );
};

/* ===========================================================
   FORM FIELD
=========================================================== */

const FormField = ({
  label,
  required,
  hint,
  children,
}) => (
  <div>
    <div className="mb-2 flex items-center justify-between gap-2">
      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
        {label}

        {required && (
          <span className="ml-1 text-amber-600">
            *
          </span>
        )}
      </label>

      {hint && (
        <span className="text-[10px] text-stone-400">
          {hint}
        </span>
      )}
    </div>

    {children}
  </div>
);

/* ===========================================================
   TOGGLE FIELD
=========================================================== */

const ToggleField = ({
  checked,
  onChange,
  title,
  description,
}) => (
  <button
    type="button"
    onClick={onChange}
    className="flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left transition hover:border-amber-200 hover:bg-white"
  >
    <div>
      <p className="text-sm font-bold text-stone-800">
        {title}
      </p>

      <p className="mt-1 text-[11px] leading-5 text-stone-400">
        {description}
      </p>
    </div>

    <span
      className={`relative h-6 w-11 shrink-0 rounded-full p-1 transition ${
        checked
          ? "bg-amber-500"
          : "bg-stone-300"
      }`}
    >
      <span
        className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked
            ? "translate-x-5"
            : "translate-x-0"
        }`}
      />
    </span>
  </button>
);

/* ===========================================================
   DETAIL ITEM
=========================================================== */

const DetailItem = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
      {label}
    </p>

    <div className="mt-2 text-sm font-bold text-stone-800">
      {value}
    </div>
  </div>
);

/* ===========================================================
   CARD ACTION
=========================================================== */

const CardAction = ({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-9 items-center justify-center gap-1.5 rounded-lg text-[11px] font-bold transition ${
      danger
        ? "bg-red-50 text-red-600 hover:bg-red-100"
        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
    }`}
  >
    <Icon className="h-3.5 w-3.5" />
    {label}
  </button>
);

/* ===========================================================
   STAT
=========================================================== */

const VenueStat = ({
  title,
  value,
  icon: Icon,
}) => (
  <motion.div
    whileHover={{ y: -3 }}
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
        onChange(event.target.value)
      }
      className="h-11 min-w-[165px] appearance-none rounded-xl border border-stone-200 bg-stone-50 pl-4 pr-10 text-sm font-semibold text-stone-600 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
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
   CARD HELPERS
=========================================================== */

const getCardPrice = (venue) => {
  if (!venue) return 0;

  if (typeof venue.pricing === "number") {
    return venue.pricing;
  }

  if (venue.pricing?.startingFrom) {
    return Number(venue.pricing.startingFrom) || 0;
  }

  if (venue.pricing?.price) {
    return Number(venue.pricing.price) || 0;
  }

  if (typeof venue.price === "number") {
    return venue.price;
  }

  return 0;
};

const getCardCapacity = (venue) => {
  if (!venue) return "Flexible";

  if (typeof venue.capacity === "number") {
    return `${venue.capacity} guests`;
  }

  if (typeof venue.capacity === "string") {
    return venue.capacity;
  }

  if (venue.capacity?.max) {
    const min = venue.capacity.min || 0;
    const max = venue.capacity.max;

    return min
      ? `${min} - ${max} guests`
      : `${max} guests`;
  }

  return "Flexible";
};

const getDetailedLocation = (venue) => {
  if (!venue) {
    return "Location not specified";
  }

  if (typeof venue.location === "string") {
    return venue.location;
  }

  if (venue.location) {
    return [
      venue.location.address,
      venue.location.city,
      venue.location.state,
    ]
      .filter(Boolean)
      .join(", ");
  }

  return "Location not specified";
};

export default VenueManagement;