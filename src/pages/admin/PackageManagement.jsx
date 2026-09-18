import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  Package,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { packages, packageTypes } from "../../data/packages";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { formatCurrency } from "../../utils/formatCurrency";

const PackageManagement = () => {
  const [packageList, setPackageList] = useState(() =>
    packages.map((item) => ({
      ...item,
      active: item.active !== false,
    }))
  );

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editPackage, setEditPackage] = useState(null);
  const [deletePackage, setDeletePackage] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredPackages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return packageList.filter((item) => {
      const name = item.name || "";
      const type = item.typeName || item.type || "";
      const description =
        item.shortDescription || item.description || "";

      const matchesSearch =
        !query ||
        name.toLowerCase().includes(query) ||
        type.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "all" ||
        String(item.type).toLowerCase() ===
          typeFilter.toLowerCase();

      const active = item.active !== false;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && active) ||
        (statusFilter === "inactive" && !active);

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [packageList, search, typeFilter, statusFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const total = packageList.length;

    const active = packageList.filter(
      (item) => item.active !== false
    ).length;

    const inactive = total - active;

    const featured = packageList.filter(
      (item) => item.featured
    ).length;

    return {
      total,
      active,
      inactive,
      featured,
    };
  }, [packageList]);

  /* =========================================================
     TOGGLE
  ========================================================= */

  const togglePackage = (packageId) => {
    setPackageList((current) =>
      current.map((item) =>
        item.id === packageId
          ? {
              ...item,
              active: !(item.active !== false),
            }
          : item
      )
    );
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = () => {
    if (!deletePackage) return;

    setPackageList((current) =>
      current.filter(
        (item) => item.id !== deletePackage.id
      )
    );

    setDeletePackage(null);
  };

  /* =========================================================
     UPDATE
  ========================================================= */

  const handleUpdate = (updatedPackage) => {
    setPackageList((current) =>
      current.map((item) =>
        item.id === updatedPackage.id
          ? updatedPackage
          : item
      )
    );

    setEditPackage(null);
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
                <Package className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Package Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Manage Packages
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Create and organize event packages that customers
                can choose while planning their celebrations.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setShowCreateModal(true)}
              icon={<Plus className="h-4 w-4" />}
            >
              Add Package
            </Button>
          </div>
        </motion.div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PackageStat
            title="Total Packages"
            value={stats.total}
            icon={Package}
          />

          <PackageStat
            title="Active Packages"
            value={stats.active}
            icon={CheckCircle2}
          />

          <PackageStat
            title="Inactive Packages"
            value={stats.inactive}
            icon={XCircle}
          />

          <PackageStat
            title="Featured Packages"
            value={stats.featured}
            icon={Sparkles}
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
                placeholder="Search packages..."
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            {/* Type */}

            <FilterSelect
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                {
                  value: "all",
                  label: "All Package Types",
                },
                ...packageTypes.map((type) => ({
                  value: type.id,
                  label: type.name,
                })),
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
              ]}
            />

            {(search ||
              typeFilter !== "all" ||
              statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
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
            RESULTS
        =================================================== */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-bold text-stone-800">
              {filteredPackages.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-800">
              {packageList.length}
            </span>{" "}
            packages
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Filter className="h-3.5 w-3.5" />
            Manage customer-facing packages
          </div>
        </div>

        {/* ===================================================
            PACKAGE GRID
        =================================================== */}

        {filteredPackages.length > 0 ? (
          <motion.div
            layout
            className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((item, index) => (
                <PackageCard
                  key={item.id}
                  item={item}
                  index={index}
                  onView={() => setSelectedPackage(item)}
                  onEdit={() => setEditPackage(item)}
                  onDelete={() => setDeletePackage(item)}
                  onToggle={() => togglePackage(item.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-3 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <EmptyState
              icon="search"
              title="No packages found"
              description="Try changing your search or filter settings."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearch("");
                  setTypeFilter("all");
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
        isOpen={Boolean(selectedPackage)}
        onClose={() => setSelectedPackage(null)}
        title={selectedPackage?.name || "Package Details"}
        description="Package information and included services"
        size="lg"
      >
        {selectedPackage && (
          <PackageDetails
            item={selectedPackage}
            onClose={() => setSelectedPackage(null)}
            onEdit={() => {
              setEditPackage(selectedPackage);
              setSelectedPackage(null);
            }}
          />
        )}
      </Modal>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      <Modal
        isOpen={Boolean(editPackage)}
        onClose={() => setEditPackage(null)}
        title="Edit Package"
        description="Update the package information."
        size="lg"
      >
        {editPackage && (
          <PackageForm
            item={editPackage}
            onClose={() => setEditPackage(null)}
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
        title="Add New Package"
        description="Create a package for your customers."
        size="lg"
      >
        <PackageForm
          onClose={() => setShowCreateModal(false)}
          onSave={(newPackage) => {
            setPackageList((current) => [
              {
                ...newPackage,
                id: `package-${Date.now()}`,
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
        isOpen={Boolean(deletePackage)}
        onClose={() => setDeletePackage(null)}
        title="Delete Package?"
        description="This action cannot be undone."
        size="sm"
      >
        {deletePackage && (
          <div>
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-red-800">
                    {deletePackage.name}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    This package will be removed from the current
                    admin package list.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDeletePackage(null)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={handleDelete}
                icon={<Trash2 className="h-4 w-4" />}
              >
                Delete Package
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

/* ===========================================================
   PACKAGE CARD
=========================================================== */

const PackageCard = ({
  item,
  index,
  onView,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const active = item.active !== false;
  const price = Number(item.price) || 0;

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
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-12 w-12 text-stone-300" />
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] font-bold text-stone-700 shadow-sm backdrop-blur">
            {item.typeName || item.type || "Package"}
          </span>

          {item.featured && (
            <span className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm">
              Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3">
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
              {item.name}
            </h3>

            <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-stone-500">
              {item.shortDescription ||
                item.description ||
                "Complete event package."}
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Package className="h-4 w-4" />
          </div>
        </div>

        {/* Package info */}

        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-stone-100 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Starting From
            </p>

            <p className="mt-1 text-lg font-bold text-stone-900">
              {price
                ? formatCurrency(price)
                : "Custom"}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Guests
            </p>

            <p className="mt-1 truncate text-sm font-bold text-stone-800">
              {item.guestRange || "Flexible"}
            </p>
          </div>
        </div>

        {/* Toggle */}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Availability
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
                active ? "bg-amber-500" : "bg-stone-300"
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
   PACKAGE DETAILS
=========================================================== */

const PackageDetails = ({
  item,
  onClose,
  onEdit,
}) => {
  const active = item.active !== false;

  const includedServices = Array.isArray(
    item.includedServices
  )
    ? item.includedServices
    : [];

  const features = Array.isArray(item.features)
    ? item.features
    : [];

  const exclusions = Array.isArray(item.exclusions)
    ? item.exclusions
    : [];

  const suitableFor = Array.isArray(item.suitableFor)
    ? item.suitableFor
    : [];

  return (
    <div>
      {/* Hero */}

      <div className="relative overflow-hidden rounded-2xl bg-stone-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="flex h-56 items-center justify-center">
            <Package className="h-14 w-14 text-stone-300" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-white/15 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur">
              {item.typeName || item.type}
            </span>

            {item.featured && (
              <span className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-[10px] font-bold text-white">
                Featured
              </span>
            )}
          </div>

          <h2 className="mt-3 text-xl font-bold text-white">
            {item.name}
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
          label="Price"
          value={
            item.price
              ? formatCurrency(item.price)
              : "Custom"
          }
        />

        <DetailItem
          label="Guests"
          value={item.guestRange || "Flexible"}
        />

        <DetailItem
          label="Duration"
          value={item.duration || "Flexible"}
        />
      </div>

      {/* Description */}

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Description
        </p>

        <p className="mt-2 text-sm leading-6 text-stone-600">
          {item.description ||
            item.shortDescription ||
            "No description available."}
        </p>
      </div>

      {/* Included Services */}

      {includedServices.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Included Services
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {includedServices.map(
              (service, index) => (
                <div
                  key={`${service}-${index}`}
                  className="flex items-start gap-2 rounded-xl bg-stone-50 p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                  <span className="text-xs font-semibold leading-5 text-stone-600">
                    {typeof service === "object"
                      ? service.name
                      : service}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Features */}

      {features.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Package Features
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {features.map(
              (feature, index) => (
                <span
                  key={`${feature}-${index}`}
                  className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700"
                >
                  {feature}
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
              (itemName, index) => (
                <span
                  key={`${itemName}-${index}`}
                  className="rounded-lg bg-stone-100 px-3 py-2 text-xs font-semibold text-stone-600"
                >
                  {itemName}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Exclusions */}

      {exclusions.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Exclusions
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {exclusions.map(
              (exclusion, index) => (
                <div
                  key={`${exclusion}-${index}`}
                  className="flex items-start gap-2 rounded-xl bg-red-50 p-3"
                >
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                  <span className="text-xs leading-5 text-red-700">
                    {exclusion}
                  </span>
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
          Edit Package
        </Button>
      </div>
    </div>
  );
};

/* ===========================================================
   PACKAGE FORM
=========================================================== */

const PackageForm = ({
  item,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(item);

  const [formData, setFormData] = useState(() => ({
    name: item?.name || "",
    type:
      item?.type ||
      packageTypes[0]?.id ||
      "",
    typeName:
      item?.typeName ||
      packageTypes[0]?.name ||
      "",
    shortDescription:
      item?.shortDescription || "",
    description:
      item?.description || "",
    price: item?.price || "",
    priceLabel:
      item?.priceLabel || "",
    guestRange:
      item?.guestRange || "",
    duration:
      item?.duration || "",
    image:
      item?.image || "",
    featured:
      Boolean(item?.featured),
    popular:
      Boolean(item?.popular),
    active:
      item?.active !== false,
    suitableFor:
      Array.isArray(item?.suitableFor)
        ? item.suitableFor.join(", ")
        : "",
    includedServices:
      Array.isArray(item?.includedServices)
        ? item.includedServices
            .map((service) =>
              typeof service === "object"
                ? service.name
                : service
            )
            .join("\n")
        : "",
    features:
      Array.isArray(item?.features)
        ? item.features.join("\n")
        : "",
    exclusions:
      Array.isArray(item?.exclusions)
        ? item.exclusions.join("\n")
        : "",
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
      const selected = packageTypes.find(
        (packageType) =>
          packageType.id === value
      );

      setFormData((current) => ({
        ...current,
        typeName:
          selected?.name || value,
      }));
    }

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter a package name.");
      return;
    }

    if (!formData.type) {
      setError("Please select a package type.");
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

    const data = {
      ...(item || {}),
      name: formData.name.trim(),
      type: formData.type,
      typeName: formData.typeName,
      shortDescription:
        formData.shortDescription.trim(),
      description:
        formData.description.trim(),
      price: Number(formData.price) || 0,
      priceLabel:
        formData.priceLabel.trim(),
      guestRange:
        formData.guestRange.trim(),
      duration:
        formData.duration.trim(),
      image:
        formData.image.trim(),
      featured:
        formData.featured,
      popular:
        formData.popular,
      active:
        formData.active,
      suitableFor:
        splitComma(formData.suitableFor),
      includedServices:
        splitLines(formData.includedServices),
      features:
        splitLines(formData.features),
      exclusions:
        splitLines(formData.exclusions),
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
          label="Package Name"
          required
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Grand Wedding"
            className="form-input"
          />
        </FormField>

        <FormField
          label="Package Type"
          required
        >
          <div className="relative">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-input appearance-none pr-10"
            >
              {packageTypes.map((type) => (
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

      {/* Short description */}

      <FormField label="Short Description">
        <input
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Short description shown on package cards"
          className="form-input"
        />
      </FormField>

      {/* Description */}

      <FormField label="Description">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the package..."
          className="form-input min-h-28 py-3"
        />
      </FormField>

      {/* Price / Price label */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Package Price">
          <input
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
            className="form-input"
          />
        </FormField>

        <FormField label="Price Label">
          <input
            name="priceLabel"
            value={formData.priceLabel}
            onChange={handleChange}
            placeholder="e.g. Starting from"
            className="form-input"
          />
        </FormField>
      </div>

      {/* Guest / Duration */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Guest Range">
          <input
            name="guestRange"
            value={formData.guestRange}
            onChange={handleChange}
            placeholder="e.g. 100 - 300 guests"
            className="form-input"
          />
        </FormField>

        <FormField label="Duration">
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g. Full day"
            className="form-input"
          />
        </FormField>
      </div>

      {/* Image */}

      <FormField label="Image URL">
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80"
          className="form-input"
        />
      </FormField>

      {/* Included services */}

      <FormField
        label="Included Services"
        hint="Enter one service per line"
      >
        <textarea
          name="includedServices"
          value={formData.includedServices}
          onChange={handleChange}
          rows={5}
          placeholder={
            "Venue arrangement\nDecoration\nCatering\nPhotography"
          }
          className="form-input min-h-32 py-3"
        />
      </FormField>

      {/* Features */}

      <FormField
        label="Features"
        hint="Enter one feature per line"
      >
        <textarea
          name="features"
          value={formData.features}
          onChange={handleChange}
          rows={4}
          placeholder={
            "Dedicated coordinator\nPremium setup\nGuest assistance"
          }
          className="form-input min-h-28 py-3"
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
          placeholder="Wedding, Reception, Engagement"
          className="form-input"
        />
      </FormField>

      {/* Exclusions */}

      <FormField
        label="Exclusions"
        hint="Enter one item per line"
      >
        <textarea
          name="exclusions"
          value={formData.exclusions}
          onChange={handleChange}
          rows={3}
          placeholder={
            "Transportation\nSpecial lighting requests"
          }
          className="form-input min-h-24 py-3"
        />
      </FormField>

      {/* Toggles */}

      <div className="grid gap-3 sm:grid-cols-3">
        <ToggleField
          checked={formData.active}
          onChange={() =>
            setFormData((current) => ({
              ...current,
              active: !current.active,
            }))
          }
          title="Active"
          description="Visible to customers."
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
          description="Highlight this package."
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
          description="Mark as popular."
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
            : "Create Package"}
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

const PackageStat = ({
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
      className="h-11 min-w-[175px] appearance-none rounded-xl border border-stone-200 bg-stone-50 pl-4 pr-10 text-sm font-semibold text-stone-600 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
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

export default PackageManagement;