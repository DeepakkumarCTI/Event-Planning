import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  MapPin,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Filter,
  X,
  Save,
  Tag,
} from "lucide-react";

import { useEvent } from "../../context/EventContext";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";

import { formatDate } from "../../utils/formatDate";

/* =========================================================
   CONSTANTS
========================================================= */

const EVENT_CATEGORIES = [
  "Wedding",
  "Birthday",
  "Engagement",
  "Corporate Event",
  "Conference",
  "Product Launch",
  "Baby Shower",
  "Anniversary",
  "Cultural Event",
  "Private Party",
  "Reception",
  "Seminar",
  "Other",
];

const EVENT_STATUSES = [
  "Active",
  "Pending",
  "In Progress",
  "Completed",
  "Cancelled",
];

/* =========================================================
   HELPERS
========================================================= */

const safeDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const getEventName = (event) =>
  event?.name ||
  event?.title ||
  event?.eventName ||
  event?.eventType ||
  "Untitled Event";

const getCategory = (event) =>
  event?.category ||
  event?.eventCategory ||
  event?.type ||
  event?.eventType ||
  "Other";

const getDate = (event) =>
  event?.eventDate ||
  event?.date ||
  event?.startDate ||
  "";

const getLocation = (event) =>
  event?.venue ||
  event?.venueName ||
  event?.location ||
  "Venue not specified";

const getGuests = (event) =>
  event?.guestCount ??
  event?.guests ??
  event?.numberOfGuests ??
  0;

const getStatus = (event) =>
  event?.status || "Active";

/* =========================================================
   ANIMATION
========================================================= */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   DEFAULT FORM
========================================================= */

const EMPTY_FORM = {
  name: "",
  category: "Wedding",
  eventDate: "",
  venue: "",
  location: "",
  guestCount: "",
  status: "Active",
  description: "",
};

/* =========================================================
   EVENT MANAGEMENT
========================================================= */

const EventManagement = () => {
  const eventContext = useEvent();

  const {
    events = [],
    addEvent,
    updateEvent,
    deleteEvent,
  } = eventContext;

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  /* =======================================================
     FILTERED EVENTS
  ======================================================= */

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const name = getEventName(event).toLowerCase();
      const category = String(getCategory(event)).toLowerCase();
      const venue = getLocation(event).toLowerCase();
      const status = String(getStatus(event)).toLowerCase();

      const matchesSearch =
        !query ||
        name.includes(query) ||
        category.includes(query) ||
        venue.includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        category === categoryFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "All" ||
        status === statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [events, search, categoryFilter, statusFilter]);

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    const getCount = (status) =>
      events.filter(
        (event) =>
          String(getStatus(event)).toLowerCase() ===
          status.toLowerCase()
      ).length;

    return {
      total: events.length,
      active: getCount("Active"),
      pending: getCount("Pending"),
      inProgress: getCount("In Progress"),
      completed: getCount("Completed"),
      cancelled: getCount("Cancelled"),
    };
  }, [events]);

  /* =======================================================
     FORM HANDLERS
  ======================================================= */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingEvent(null);

    setForm({
      ...EMPTY_FORM,
    });

    setShowFormModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);

    const eventDate = safeDate(getDate(event));

    setForm({
      name: getEventName(event),
      category: getCategory(event),
      eventDate: eventDate
        ? eventDate.toISOString().split("T")[0]
        : "",
      venue: event?.venue || event?.venueName || "",
      location: event?.location || "",
      guestCount: getGuests(event) || "",
      status: getStatus(event),
      description: event?.description || "",
    });

    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setEditingEvent(null);
    setForm(EMPTY_FORM);
  };

  /* =======================================================
     SAVE EVENT
  ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.eventDate) {
      return;
    }

    const payload = {
      name: form.name.trim(),
      title: form.name.trim(),
      eventName: form.name.trim(),

      category: form.category,
      eventCategory: form.category,

      eventDate: form.eventDate,
      date: form.eventDate,

      venue: form.venue.trim(),
      venueName: form.venue.trim(),

      location: form.location.trim(),

      guestCount: Number(form.guestCount) || 0,
      guests: Number(form.guestCount) || 0,

      status: form.status,

      description: form.description.trim(),

      updatedAt: new Date().toISOString(),
    };

    if (editingEvent) {
      if (typeof updateEvent === "function") {
        updateEvent(
          editingEvent.id || editingEvent._id,
          payload
        );
      }
    } else {
      if (typeof addEvent === "function") {
        addEvent({
          ...payload,
          id: `event-${Date.now()}`,
          createdAt: new Date().toISOString(),
        });
      }
    }

    closeFormModal();
  };

  /* =======================================================
     DETAILS
  ======================================================= */

  const openDetails = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!eventToDelete) return;

    if (typeof deleteEvent === "function") {
      deleteEvent(
        eventToDelete.id || eventToDelete._id
      );
    }

    setEventToDelete(null);
    setShowDeleteModal(false);
  };

  /* =======================================================
     QUICK STATUS
  ======================================================= */

  const updateStatus = (event, status) => {
    if (typeof updateEvent !== "function") return;

    updateEvent(
      event.id || event._id,
      {
        ...event,
        status,
        updatedAt: new Date().toISOString(),
      }
    );
  };

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  const hasFilters =
    search ||
    categoryFilter !== "All" ||
    statusFilter !== "All";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <motion.div
        variants={itemVariants}
        className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-600">
            <CalendarDays size={16} />
            Event management
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
            Events
          </h1>

          <p className="mt-1 text-sm text-stone-500">
            Create, manage and monitor customer events.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={openAddModal}
        >
          Add Event
        </Button>
      </motion.div>

      {/* ===================================================
          STAT CARDS
      =================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          {
            label: "Total",
            value: stats.total,
            icon: CalendarDays,
            className:
              "bg-orange-100 text-orange-600",
          },
          {
            label: "Active",
            value: stats.active,
            icon: CheckCircle2,
            className:
              "bg-emerald-100 text-emerald-600",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: Clock3,
            className:
              "bg-amber-100 text-amber-600",
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            icon: PlayCircle,
            className:
              "bg-blue-100 text-blue-600",
          },
          {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            className:
              "bg-violet-100 text-violet-600",
          },
          {
            label: "Cancelled",
            value: stats.cancelled,
            icon: XCircle,
            className:
              "bg-red-100 text-red-600",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-stone-500">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-2xl font-bold text-stone-900">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.className}`}
                >
                  <Icon size={18} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ===================================================
          FILTERS
      =================================================== */}

      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          {/* SEARCH */}

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search events, categories or venues..."
              className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* CATEGORY */}

          <div className="relative">
            <Tag
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="h-11 min-w-[190px] appearance-none rounded-xl border border-stone-200 bg-stone-50 pl-9 pr-9 text-sm text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            >
              <option value="All">
                All Categories
              </option>

              {EVENT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* STATUS */}

          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="h-11 min-w-[160px] appearance-none rounded-xl border border-stone-200 bg-stone-50 pl-9 pr-9 text-sm text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            >
              <option value="All">
                All Statuses
              </option>

              {EVENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 text-sm font-medium text-stone-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <X size={16} />
              Clear
            </button>
          )}
        </div>
      </motion.div>

      {/* ===================================================
          EVENT TABLE
      =================================================== */}

      <motion.section
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
      >
        <div className="flex flex-col justify-between gap-2 border-b border-stone-200 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-stone-900">
              Event list
            </h2>

            <p className="mt-1 text-xs text-stone-500">
              Showing {filteredEvents.length} of{" "}
              {events.length} events
            </p>
          </div>

          <div className="text-xs text-stone-400">
            {hasFilters
              ? "Filters applied"
              : "All events"}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={CalendarDays}
              title={
                hasFilters
                  ? "No matching events"
                  : "No events yet"
              }
              description={
                hasFilters
                  ? "Try changing your search or filters."
                  : "Create your first event to get started."
              }
              action={
                hasFilters
                  ? {
                      label: "Clear Filters",
                      onClick: clearFilters,
                    }
                  : {
                      label: "Add Event",
                      onClick: openAddModal,
                    }
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Event
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Category
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Date
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Venue
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Guests
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                <AnimatePresence initial={false}>
                  {filteredEvents.map((event, index) => {
                    const date = safeDate(getDate(event));

                    const eventId =
                      event?.id ||
                      event?._id ||
                      `event-${index}`;

                    return (
                      <motion.tr
                        key={eventId}
                        layout
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="group transition hover:bg-stone-50"
                      >
                        {/* EVENT */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                              <CalendarDays size={18} />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold text-stone-800">
                                {getEventName(event)}
                              </p>

                              <p className="mt-0.5 max-w-[220px] truncate text-xs text-stone-500">
                                {event?.description ||
                                  "No description"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CATEGORY */}

                        <td className="px-5 py-4">
                          <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                            {getCategory(event)}
                          </span>
                        </td>

                        {/* DATE */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-stone-600">
                            <CalendarDays
                              size={15}
                              className="text-stone-400"
                            />

                            {date
                              ? formatDate(date)
                              : "Not specified"}
                          </div>
                        </td>

                        {/* VENUE */}

                        <td className="px-5 py-4">
                          <div className="flex max-w-[190px] items-center gap-2 text-sm text-stone-600">
                            <MapPin
                              size={15}
                              className="shrink-0 text-stone-400"
                            />

                            <span className="truncate">
                              {getLocation(event)}
                            </span>
                          </div>
                        </td>

                        {/* GUESTS */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-stone-600">
                            <Users
                              size={15}
                              className="text-stone-400"
                            />

                            {getGuests(event) || "—"}
                          </div>
                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={getStatus(event)}
                          />
                        </td>

                        {/* ACTIONS */}

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              title="View event"
                              onClick={() =>
                                openDetails(event)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 transition hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              type="button"
                              title="Edit event"
                              onClick={() =>
                                openEditModal(event)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 transition hover:bg-orange-50 hover:text-orange-600"
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              type="button"
                              title="Delete event"
                              onClick={() =>
                                openDeleteModal(event)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      {/* ===================================================
          ADD / EDIT MODAL
      =================================================== */}

      <Modal
        isOpen={showFormModal}
        onClose={closeFormModal}
        title={
          editingEvent
            ? "Edit Event"
            : "Create New Event"
        }
        size="lg"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {/* NAME */}

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                Event Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                placeholder="Enter event name"
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                Category *
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              >
                {EVENT_CATEGORIES.map(
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
            </div>

            {/* STATUS */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                Status *
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleInputChange}
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              >
                {EVENT_STATUSES.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                Event Date *
              </label>

              <input
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleInputChange}
                required
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* GUEST COUNT */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                Number of Guests
              </label>

              <input
                type="number"
                min="0"
                name="guestCount"
                value={form.guestCount}
                onChange={handleInputChange}
                placeholder="e.g. 150"
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* VENUE */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                Venue
              </label>

              <input
                name="venue"
                value={form.venue}
                onChange={handleInputChange}
                placeholder="Enter venue name"
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* LOCATION */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleInputChange}
                placeholder="City / area"
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe the event..."
                className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={closeFormModal}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              icon={Save}
            >
              {editingEvent
                ? "Update Event"
                : "Create Event"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ===================================================
          DETAILS MODAL
      =================================================== */}

      <Modal
        isOpen={showDetailsModal}
        onClose={() =>
          setShowDetailsModal(false)
        }
        title="Event Details"
        size="md"
      >
        {selectedEvent && (
          <div className="space-y-5">
            {/* TITLE */}

            <div className="rounded-2xl bg-orange-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <CalendarDays size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-stone-900">
                    {getEventName(selectedEvent)}
                  </h3>

                  <p className="mt-1 text-sm text-stone-500">
                    {getCategory(selectedEvent)}
                  </p>
                </div>

                <StatusBadge
                  status={getStatus(selectedEvent)}
                />
              </div>
            </div>

            {/* DETAILS */}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-stone-200 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <CalendarDays size={15} />
                  Event Date
                </div>

                <p className="mt-2 font-semibold text-stone-800">
                  {safeDate(getDate(selectedEvent))
                    ? formatDate(
                        safeDate(
                          getDate(selectedEvent)
                        )
                      )
                    : "Not specified"}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <Users size={15} />
                  Guests
                </div>

                <p className="mt-2 font-semibold text-stone-800">
                  {getGuests(selectedEvent) || "Not specified"}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <MapPin size={15} />
                  Venue
                </div>

                <p className="mt-2 font-semibold text-stone-800">
                  {getLocation(selectedEvent)}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <Tag size={15} />
                  Category
                </div>

                <p className="mt-2 font-semibold text-stone-800">
                  {getCategory(selectedEvent)}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div>
              <p className="mb-2 text-sm font-semibold text-stone-800">
                Description
              </p>

              <div className="rounded-xl bg-stone-50 p-4 text-sm leading-6 text-stone-600">
                {selectedEvent?.description ||
                  "No description available for this event."}
              </div>
            </div>

            {/* QUICK STATUS */}

            <div>
              <p className="mb-2 text-sm font-semibold text-stone-800">
                Change Status
              </p>

              <div className="flex flex-wrap gap-2">
                {EVENT_STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      updateStatus(
                        selectedEvent,
                        status
                      );

                      setSelectedEvent({
                        ...selectedEvent,
                        status,
                      });
                    }}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      getStatus(selectedEvent) ===
                      status
                        ? "border-orange-300 bg-orange-50 text-orange-700"
                        : "border-stone-200 bg-white text-stone-600 hover:border-orange-200 hover:text-orange-600"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end border-t border-stone-200 pt-4">
              <Button
                variant="outline"
                onClick={() =>
                  setShowDetailsModal(false)
                }
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      <Modal
        isOpen={showDeleteModal}
        onClose={() =>
          setShowDeleteModal(false)
        }
        title="Delete Event"
        size="sm"
      >
        {eventToDelete && (
          <div>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Trash2 size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-stone-900">
                  Delete this event?
                </h3>

                <p className="mt-1 text-sm leading-6 text-stone-500">
                  You are about to delete{" "}
                  <span className="font-semibold text-stone-700">
                    {getEventName(eventToDelete)}
                  </span>
                  . This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                icon={Trash2}
                onClick={confirmDelete}
              >
                Delete Event
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default EventManagement;