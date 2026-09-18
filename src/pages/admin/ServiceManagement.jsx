import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { services, serviceCategories } from "../../data/services";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { formatCurrency } from "../../utils/formatCurrency";

const ServiceManagement = () => {
  const [serviceList, setServiceList] =
    useState(() =>
      services.map((service) => ({
        ...service,
        active:
          service.active !== false,
      }))
    );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("all");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [selectedService, setSelectedService] =
    useState(null);

  const [editService, setEditService] =
    useState(null);

  const [deleteService, setDeleteService] =
    useState(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  /* =========================================================
     FILTER SERVICES
  ========================================================= */

  const filteredServices = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return serviceList.filter(
      (service) => {
        const name =
          service.name || "";

        const category =
          service.categoryName ||
          service.category ||
          "";

        const description =
          service.shortDescription ||
          service.description ||
          "";

        const matchesSearch =
          !query ||
          name
            .toLowerCase()
            .includes(query) ||
          category
            .toLowerCase()
            .includes(query) ||
          description
            .toLowerCase()
            .includes(query);

        const matchesCategory =
          categoryFilter === "all" ||
          String(
            service.category
          ).toLowerCase() ===
            categoryFilter.toLowerCase();

        const isActive =
          service.active !== false;

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" &&
            isActive) ||
          (statusFilter === "inactive" &&
            !isActive);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        );
      }
    );
  }, [
    serviceList,
    search,
    categoryFilter,
    statusFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const total =
      serviceList.length;

    const active =
      serviceList.filter(
        (service) =>
          service.active !== false
      ).length;

    const inactive =
      total - active;

    const popular =
      serviceList.filter(
        (service) =>
          service.popular
      ).length;

    return {
      total,
      active,
      inactive,
      popular,
    };
  }, [serviceList]);

  /* =========================================================
     TOGGLE SERVICE
  ========================================================= */

  const toggleService = (
    serviceId
  ) => {
    setServiceList(
      (current) =>
        current.map(
          (service) =>
            service.id === serviceId
              ? {
                  ...service,
                  active:
                    !(
                      service.active !==
                      false
                    ),
                }
              : service
        )
    );
  };

  /* =========================================================
     DELETE SERVICE
  ========================================================= */

  const handleDelete = () => {
    if (!deleteService) {
      return;
    }

    setServiceList(
      (current) =>
        current.filter(
          (service) =>
            service.id !==
            deleteService.id
        )
    );

    setDeleteService(null);
  };

  /* =========================================================
     UPDATE SERVICE
  ========================================================= */

  const handleUpdate = (
    updatedService
  ) => {
    setServiceList(
      (current) =>
        current.map(
          (service) =>
            service.id ===
            updatedService.id
              ? updatedService
              : service
        )
    );

    setEditService(null);
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
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-amber-700">
                <Sparkles className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Service Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Manage Services
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Add, organize and control the services available
                to customers while planning their events.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() =>
                setShowCreateModal(true)
              }
              icon={
                <Plus className="h-4 w-4" />
              }
            >
              Add Service
            </Button>
          </div>
        </motion.div>

        {/* ===================================================
            STAT CARDS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ServiceStat
            title="Total Services"
            value={stats.total}
            icon={Settings2}
          />

          <ServiceStat
            title="Active Services"
            value={stats.active}
            icon={CheckCircle2}
          />

          <ServiceStat
            title="Inactive Services"
            value={stats.inactive}
            icon={XCircle}
          />

          <ServiceStat
            title="Popular Services"
            value={stats.popular}
            icon={Sparkles}
          />
        </div>

        {/* ===================================================
            FILTER BAR
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
            delay: 0.12,
          }}
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
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search services..."
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            {/* Category */}

            <FilterSelect
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[
                {
                  value: "all",
                  label: "All Categories",
                },
                ...serviceCategories.map(
                  (category) => ({
                    value: category.id,
                    label: category.name,
                  })
                ),
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

            {/* Clear */}

            {(search ||
              categoryFilter !== "all" ||
              statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter(
                    "all"
                  );
                  setStatusFilter(
                    "all"
                  );
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
            RESULTS HEADER
        =================================================== */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-bold text-stone-800">
              {filteredServices.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-800">
              {serviceList.length}
            </span>{" "}
            services
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Filter className="h-3.5 w-3.5" />
            Manage customer-facing services
          </div>
        </div>

        {/* ===================================================
            SERVICE GRID
        =================================================== */}

        {filteredServices.length > 0 ? (
          <motion.div
            layout
            className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map(
                (service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    onView={() =>
                      setSelectedService(
                        service
                      )
                    }
                    onEdit={() =>
                      setEditService(
                        service
                      )
                    }
                    onDelete={() =>
                      setDeleteService(
                        service
                      )
                    }
                    onToggle={() =>
                      toggleService(
                        service.id
                      )
                    }
                  />
                )
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-3 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <EmptyState
              icon="search"
              title="No services found"
              description="Try changing your search or filter settings."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearch("");
                  setCategoryFilter(
                    "all"
                  );
                  setStatusFilter(
                    "all"
                  );
                },
              }}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          VIEW SERVICE
      ===================================================== */}

      <Modal
        isOpen={
          Boolean(selectedService)
        }
        onClose={() =>
          setSelectedService(null)
        }
        title={
          selectedService?.name ||
          "Service Details"
        }
        description="Service information and availability"
        size="lg"
      >
        {selectedService && (
          <ServiceDetails
            service={
              selectedService
            }
            onClose={() =>
              setSelectedService(null)
            }
            onEdit={() => {
              setEditService(
                selectedService
              );
              setSelectedService(
                null
              );
            }}
          />
        )}
      </Modal>

      {/* =====================================================
          EDIT SERVICE
      ===================================================== */}

      <Modal
        isOpen={
          Boolean(editService)
        }
        onClose={() =>
          setEditService(null)
        }
        title="Edit Service"
        description="Update the service information."
        size="lg"
      >
        {editService && (
          <ServiceForm
            service={editService}
            onClose={() =>
              setEditService(null)
            }
            onSave={
              handleUpdate
            }
          />
        )}
      </Modal>

      {/* =====================================================
          ADD SERVICE
      ===================================================== */}

      <Modal
        isOpen={
          showCreateModal
        }
        onClose={() =>
          setShowCreateModal(false)
        }
        title="Add New Service"
        description="Create a service for your customers."
        size="lg"
      >
        <ServiceForm
          onClose={() =>
            setShowCreateModal(
              false
            )
          }
          onSave={(newService) => {
            setServiceList(
              (current) => [
                {
                  ...newService,
                  id: `service-${Date.now()}`,
                },
                ...current,
              ]
            );

            setShowCreateModal(
              false
            );
          }}
        />
      </Modal>

      {/* =====================================================
          DELETE SERVICE
      ===================================================== */}

      <Modal
        isOpen={
          Boolean(deleteService)
        }
        onClose={() =>
          setDeleteService(null)
        }
        title="Delete Service?"
        description="This action cannot be undone."
        size="sm"
      >
        {deleteService && (
          <div>
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-red-800">
                    {deleteService.name}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    This service will be removed from the
                    current admin service list.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setDeleteService(
                    null
                  )
                }
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={
                  handleDelete
                }
                icon={
                  <Trash2 className="h-4 w-4" />
                }
              >
                Delete Service
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

/* ===========================================================
   SERVICE CARD
=========================================================== */

const ServiceCard = ({
  service,
  index,
  onView,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const active =
    service.active !== false;

  const price =
    Number(service.price) || 0;

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
      className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
    >
      {/* Image */}

      <div className="relative h-44 overflow-hidden bg-stone-100">
        {service.image ? (
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Sparkles className="h-12 w-12 text-stone-300" />
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] font-bold text-stone-700 shadow-sm backdrop-blur">
            {service.categoryName ||
              service.category ||
              "Service"}
          </span>

          {service.popular && (
            <span className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm">
              Popular
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3">
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

      {/* Content */}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-stone-900">
              {service.name}
            </h3>

            <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-stone-500">
              {service.shortDescription ||
                service.description ||
                "Professional event planning service."}
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        {/* Price */}

        <div className="mt-5 flex items-end justify-between border-t border-stone-100 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Starting price
            </p>

            <p className="mt-1 text-lg font-bold text-stone-900">
              {price
                ? formatCurrency(
                    price
                  )
                : "Custom"}
            </p>

            {service.unit && (
              <p className="text-[10px] text-stone-400">
                {service.unit}
              </p>
            )}
          </div>

          {/* Toggle */}

          <button
            type="button"
            onClick={
              onToggle
            }
            className="group/toggle flex items-center gap-2"
            title={
              active
                ? "Disable service"
                : "Enable service"
            }
          >
            <span className="text-[10px] font-bold text-stone-400">
              {active
                ? "Active"
                : "Inactive"}
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
            onClick={
              onView
            }
          />

          <CardAction
            icon={Edit3}
            label="Edit"
            onClick={
              onEdit
            }
          />

          <CardAction
            icon={Trash2}
            label="Delete"
            danger
            onClick={
              onDelete
            }
          />
        </div>
      </div>
    </motion.article>
  );
};

/* ===========================================================
   SERVICE DETAILS
=========================================================== */

const ServiceDetails = ({
  service,
  onClose,
  onEdit,
}) => {
  const active =
    service.active !== false;

  const features =
    Array.isArray(
      service.features
    )
      ? service.features
      : [];

  const suitableFor =
    Array.isArray(
      service.suitableFor
    )
      ? service.suitableFor
      : [];

  return (
    <div>
      {/* Image */}

      <div className="relative overflow-hidden rounded-2xl bg-stone-100">
        {service.image ? (
          <img
            src={service.image}
            alt={service.name}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="flex h-56 items-center justify-center">
            <Sparkles className="h-14 w-14 text-stone-300" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
          <p className="text-xl font-bold text-white">
            {service.name}
          </p>

          <p className="mt-1 text-xs text-white/80">
            {service.categoryName ||
              service.category ||
              "Event Service"}
          </p>
        </div>
      </div>

      {/* Summary */}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <DetailItem
          label="Status"
          value={
            <StatusBadge
              status={
                active
                  ? "active"
                  : "inactive"
              }
              size="sm"
            />
          }
        />

        <DetailItem
          label="Starting Price"
          value={
            service.price
              ? formatCurrency(
                  service.price
                )
              : "Custom"
          }
        />

        <DetailItem
          label="Pricing Unit"
          value={
            service.unit ||
            "As required"
          }
        />
      </div>

      {/* Description */}

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Description
        </p>

        <p className="mt-2 text-sm leading-6 text-stone-600">
          {service.description ||
            service.shortDescription ||
            "No description available."}
        </p>
      </div>

      {/* Features */}

      {features.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Included Features
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {features.map(
              (feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="flex items-start gap-2 rounded-xl bg-stone-50 p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                  <span className="text-xs font-semibold leading-5 text-stone-600">
                    {feature}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Suitable for */}

      {suitableFor.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Suitable For
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {suitableFor.map(
              (item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700"
                >
                  {item}
                </span>
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
          icon={
            <Edit3 className="h-4 w-4" />
          }
        >
          Edit Service
        </Button>
      </div>
    </div>
  );
};

/* ===========================================================
   SERVICE FORM
=========================================================== */

const ServiceForm = ({
  service,
  onClose,
  onSave,
}) => {
  const isEditing =
    Boolean(service);

  const [formData, setFormData] =
    useState(() => ({
      name:
        service?.name || "",
      category:
        service?.category ||
        serviceCategories[0]?.id ||
        "",
      categoryName:
        service?.categoryName ||
        serviceCategories[0]?.name ||
        "",
      shortDescription:
        service?.shortDescription ||
        "",
      description:
        service?.description ||
        "",
      price:
        service?.price || "",
      unit:
        service?.unit || "",
      image:
        service?.image || "",
      popular:
        Boolean(
          service?.popular
        ),
      active:
        service?.active !==
        false,
      features:
        Array.isArray(
          service?.features
        )
          ? service.features.join(
              "\n"
            )
          : "",
      suitableFor:
        Array.isArray(
          service?.suitableFor
        )
          ? service.suitableFor.join(
              ", "
            )
          : "",
    }));

  const [error, setError] =
    useState("");

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData(
      (current) => ({
        ...current,
        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );

    if (error) {
      setError("");
    }

    if (
      name === "category"
    ) {
      const selected =
        serviceCategories.find(
          (item) =>
            item.id === value
        );

      setFormData(
        (current) => ({
          ...current,
          categoryName:
            selected?.name ||
            value,
        })
      );
    }
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (
      !formData.name.trim()
    ) {
      setError(
        "Please enter a service name."
      );
      return;
    }

    if (
      !formData.category
    ) {
      setError(
        "Please select a category."
      );
      return;
    }

    const features =
      formData.features
        .split("\n")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean);

    const suitableFor =
      formData.suitableFor
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean);

    const data = {
      ...(service || {}),
      name:
        formData.name.trim(),
      category:
        formData.category,
      categoryName:
        formData.categoryName,
      shortDescription:
        formData.shortDescription.trim(),
      description:
        formData.description.trim(),
      price:
        Number(formData.price) ||
        0,
      unit:
        formData.unit.trim(),
      image:
        formData.image.trim(),
      popular:
        formData.popular,
      active:
        formData.active,
      features,
      suitableFor,
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

      {/* Name / Category */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Service Name"
          required
        >
          <input
            name="name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            placeholder="e.g. Event Decoration"
            className="form-input"
          />
        </FormField>

        <FormField
          label="Category"
          required
        >
          <div className="relative">
            <select
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
              className="form-input appearance-none pr-10"
            >
              {serviceCategories.map(
                (category) => (
                  <option
                    key={
                      category.id
                    }
                    value={
                      category.id
                    }
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          </div>
        </FormField>
      </div>

      {/* Short description */}

      <FormField
        label="Short Description"
      >
        <input
          name="shortDescription"
          value={
            formData.shortDescription
          }
          onChange={
            handleChange
          }
          placeholder="Short description shown on service cards"
          className="form-input"
        />
      </FormField>

      {/* Description */}

      <FormField
        label="Description"
      >
        <textarea
          name="description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          rows={4}
          placeholder="Describe this service..."
          className="form-input min-h-28 py-3"
        />
      </FormField>

      {/* Price / Unit */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Starting Price"
        >
          <input
            name="price"
            type="number"
            min="0"
            value={
              formData.price
            }
            onChange={
              handleChange
            }
            placeholder="0"
            className="form-input"
          />
        </FormField>

        <FormField
          label="Pricing Unit"
        >
          <input
            name="unit"
            value={
              formData.unit
            }
            onChange={
              handleChange
            }
            placeholder="e.g. per event, per plate"
            className="form-input"
          />
        </FormField>
      </div>

      {/* Image */}

      <FormField
        label="Image URL"
      >
        <input
          name="image"
          value={
            formData.image
          }
          onChange={
            handleChange
          }
          placeholder="https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80"
          className="form-input"
        />
      </FormField>

      {/* Features */}

      <FormField
        label="Features"
        hint="Enter one feature per line"
      >
        <textarea
          name="features"
          value={
            formData.features
          }
          onChange={
            handleChange
          }
          rows={4}
          placeholder={
            "Professional coordination\nPremium materials\nDedicated support"
          }
          className="form-input min-h-28 py-3"
        />
      </FormField>

      {/* Suitable For */}

      <FormField
        label="Suitable For"
        hint="Separate items with commas"
      >
        <input
          name="suitableFor"
          value={
            formData.suitableFor
          }
          onChange={
            handleChange
          }
          placeholder="Wedding, Birthday, Corporate"
          className="form-input"
        />
      </FormField>

      {/* Toggles */}

      <div className="grid gap-3 sm:grid-cols-2">
        <ToggleField
          checked={
            formData.active
          }
          onChange={() =>
            setFormData(
              (current) => ({
                ...current,
                active:
                  !current.active,
              })
            )
          }
          title="Service Active"
          description="Customers can see and use this service."
        />

        <ToggleField
          checked={
            formData.popular
          }
          onChange={() =>
            setFormData(
              (current) => ({
                ...current,
                popular:
                  !current.popular,
              })
            )
          }
          title="Popular Service"
          description="Highlight this service as popular."
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
            : "Create Service"}
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
    className="flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left transition hover:border-amber-200 hover:bg-white"
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

const ServiceStat = ({
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
      className="h-11 min-w-[175px] appearance-none rounded-xl border border-stone-200 bg-stone-50 pl-4 pr-10 text-sm font-semibold text-stone-600 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
    >
      {options.map(
        (option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        )
      )}
    </select>

    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
  </div>
);

export default ServiceManagement;