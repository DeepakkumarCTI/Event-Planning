import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  Plus,
  Sparkles,
  Trash2,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { useEvent } from "../../context/EventContext";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { services } from "../../data/services";
import { venues } from "../../data/venues";

/* ============================================================
   COLOR THEMES
============================================================ */

const statThemes = [
  {
    card: "from-violet-950/80 via-fuchsia-950/60 to-slate-950",
    border: "border-violet-400/20",
    icon: "from-violet-500 to-fuchsia-500",
    text: "text-violet-300",
    glow: "bg-violet-500/20",
  },
  {
    card: "from-cyan-950/80 via-blue-950/60 to-slate-950",
    border: "border-cyan-400/20",
    icon: "from-cyan-500 to-blue-500",
    text: "text-cyan-300",
    glow: "bg-cyan-500/20",
  },
  {
    card: "from-amber-950/80 via-orange-950/60 to-slate-950",
    border: "border-amber-400/20",
    icon: "from-amber-400 to-orange-500",
    text: "text-amber-300",
    glow: "bg-amber-500/20",
  },
];

const serviceThemes = [
  {
    card: "from-violet-950/80 via-fuchsia-950/50 to-slate-950",
    border: "border-violet-400/20",
    hover: "hover:border-violet-400/50",
    accent: "text-violet-300",
    badge: "from-violet-500 to-fuchsia-500",
  },
  {
    card: "from-cyan-950/80 via-blue-950/50 to-slate-950",
    border: "border-cyan-400/20",
    hover: "hover:border-cyan-400/50",
    accent: "text-cyan-300",
    badge: "from-cyan-500 to-blue-500",
  },
  {
    card: "from-rose-950/80 via-pink-950/50 to-slate-950",
    border: "border-rose-400/20",
    hover: "hover:border-rose-400/50",
    accent: "text-rose-300",
    badge: "from-rose-500 to-pink-500",
  },
  {
    card: "from-emerald-950/80 via-teal-950/50 to-slate-950",
    border: "border-emerald-400/20",
    hover: "hover:border-emerald-400/50",
    accent: "text-emerald-300",
    badge: "from-emerald-500 to-teal-500",
  },
  {
    card: "from-indigo-950/80 via-purple-950/50 to-slate-950",
    border: "border-indigo-400/20",
    hover: "hover:border-indigo-400/50",
    accent: "text-indigo-300",
    badge: "from-indigo-500 to-purple-500",
  },
  {
    card: "from-orange-950/80 via-amber-950/50 to-slate-950",
    border: "border-orange-400/20",
    hover: "hover:border-orange-400/50",
    accent: "text-orange-300",
    badge: "from-orange-500 to-amber-400",
  },
];

const infoThemes = [
  {
    box: "from-violet-500/15 to-fuchsia-500/5",
    border: "border-violet-400/15",
    icon: "from-violet-500 to-fuchsia-500",
  },
  {
    box: "from-cyan-500/15 to-blue-500/5",
    border: "border-cyan-400/15",
    icon: "from-cyan-500 to-blue-500",
  },
  {
    box: "from-rose-500/15 to-pink-500/5",
    border: "border-rose-400/15",
    icon: "from-rose-500 to-pink-500",
  },
  {
    box: "from-emerald-500/15 to-teal-500/5",
    border: "border-emerald-400/15",
    icon: "from-emerald-500 to-teal-500",
  },
];

/* ============================================================
   EVENT PLANNER
============================================================ */

const EventPlanner = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const eventId = searchParams.get("event");

  const {
    events,
    getEventById,
    selectEvent,
    currentEvent,
    toggleChecklistItem,
    addChecklistItem,
    removeChecklistItem,
    addServiceToEvent,
    removeServiceFromEvent,
    updateEvent,
    getEventProgress,
  } = useEvent();

  const [activeTab, setActiveTab] = useState("overview");

  const [showAddTask, setShowAddTask] = useState(false);

  const [showServices, setShowServices] = useState(false);

  const [newTask, setNewTask] = useState("");

  const [editingBudget, setEditingBudget] = useState(false);

  const [budgetValue, setBudgetValue] = useState("");

  const [showDeleteService, setShowDeleteService] =
    useState(null);

  const [isSaving, setIsSaving] = useState(false);

  /* =========================================================
     FIND EVENT
  ========================================================= */

  const event = useMemo(() => {
    if (!eventId) return null;

    return (
      getEventById(eventId) ||
      events.find(
        (item) =>
          String(item.id) === String(eventId) ||
          String(item._id) === String(eventId)
      ) ||
      null
    );
  }, [eventId, events, getEventById]);

  /* =========================================================
     SELECT EVENT
  ========================================================= */

  useEffect(() => {
    if (eventId && event) {
      selectEvent(eventId);
    }
  }, [eventId, event, selectEvent]);

  /* =========================================================
     EVENT NOT FOUND
  ========================================================= */

  if (!eventId || !event) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-slate-900/75 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
            <EmptyState
              icon="calendar"
              title="Event not found"
              description="We couldn't find the event you're trying to plan. Create a new event or return to your event list."
              action={
                <Button
                  to="/create-event"
                  variant="primary"
                  icon={<Plus className="h-4 w-4" />}
                >
                  Create New Event
                </Button>
              }
            />

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => navigate("/my-events")}
                className="text-sm font-bold text-slate-400 transition hover:text-cyan-300"
              >
                ← Back to My Events
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     CHECKLIST
  ========================================================= */

  const checklist = Array.isArray(event.checklist)
    ? event.checklist
    : [];

  const completedTasks = checklist.filter(
    (item) => item.completed
  ).length;

  const taskProgress =
    checklist.length > 0
      ? Math.round(
          (completedTasks / checklist.length) * 100
        )
      : 0;

  /* =========================================================
     SERVICES
  ========================================================= */

  const selectedServices = Array.isArray(event.services)
    ? event.services
    : [];

  const selectedServiceIds = selectedServices.map(
    (service) =>
      typeof service === "string"
        ? service
        : service?.id || service?._id
  );

  const availableServices = services.filter(
    (service) =>
      !selectedServiceIds.includes(service.id)
  );

  /* =========================================================
     VENUE
  ========================================================= */

  const selectedVenueId =
    typeof event.venue === "string"
      ? event.venue
      : event.venue?.id ||
        event.venue?._id ||
        "";

  const selectedVenue =
    venues.find(
      (venue) =>
        venue.id === selectedVenueId ||
        venue._id === selectedVenueId
    ) || null;

  /* =========================================================
     BUDGET
  ========================================================= */

  const budget =
    Number(
      event.budget ??
        event.budgetAmount ??
        0
    ) || 0;

  const serviceTotal = selectedServices.reduce(
    (total, selected) => {
      const id =
        typeof selected === "string"
          ? selected
          : selected?.id || selected?._id;

      const service = services.find(
        (item) => item.id === id
      );

      return (
        total +
        (Number(service?.price) || 0)
      );
    },
    0
  );

  const budgetUsed =
    budget > 0
      ? Math.min(
          100,
          Math.round(
            (serviceTotal / budget) * 100
          )
        )
      : 0;

  /* =========================================================
     HELPERS
  ========================================================= */

  const getService = (selected) => {
    const id =
      typeof selected === "string"
        ? selected
        : selected?.id || selected?._id;

    return services.find(
      (item) => item.id === id
    );
  };

  const getChecklistTitle = (item) =>
    item?.title ||
    item?.name ||
    "Planning task";

  /* =========================================================
     ADD TASK
  ========================================================= */

  const handleAddTask = () => {
    const title = newTask.trim();

    if (!title) return;

    addChecklistItem(event.id, {
      title,
      completed: false,
    });

    setNewTask("");
    setShowAddTask(false);
  };

  /* =========================================================
     DELETE TASK
  ========================================================= */

  const handleDeleteTask = (task) => {
    const taskId = task.id || task._id;

    removeChecklistItem(event.id, taskId);
  };

  /* =========================================================
     ADD SERVICE
  ========================================================= */

  const handleAddService = (service) => {
    addServiceToEvent(event.id, service);

    setShowServices(false);
  };

  /* =========================================================
     REMOVE SERVICE
  ========================================================= */

  const handleRemoveService = () => {
    if (!showDeleteService) return;

    const serviceId =
      typeof showDeleteService === "string"
        ? showDeleteService
        : showDeleteService.id ||
          showDeleteService._id;

    removeServiceFromEvent(
      event.id,
      serviceId
    );

    setShowDeleteService(null);
  };

  /* =========================================================
     UPDATE BUDGET
  ========================================================= */

  const openBudgetEditor = () => {
    setBudgetValue(
      budget ? String(budget) : ""
    );

    setEditingBudget(true);
  };

  const saveBudget = async () => {
    const value =
      Number(budgetValue) || 0;

    setIsSaving(true);

    try {
      await updateEvent(event.id, {
        budget: value,
        budgetAmount: value,
      });

      setEditingBudget(false);
    } catch (error) {
      console.error(
        "Budget update error:",
        error
      );
    } finally {
      setIsSaving(false);
    }
  };

  /* =========================================================
     UPDATE EVENT STATUS
  ========================================================= */

  const handleStatusChange = async (status) => {
    try {
      await updateEvent(event.id, {
        status,
      });
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );
    }
  };

  /* =========================================================
     PROGRESS
  ========================================================= */

  let contextProgress = 0;

  try {
    contextProgress =
      Number(getEventProgress(event.id)) || 0;
  } catch {
    contextProgress = taskProgress;
  }

  const progress =
    checklist.length > 0
      ? taskProgress
      : contextProgress;

  /* =========================================================
     TABS
  ========================================================= */

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <Sparkles className="h-4 w-4" />,
      active:
        "from-violet-500 to-fuchsia-500",
    },
    {
      id: "checklist",
      label: "Checklist",
      icon: <CheckCircle2 className="h-4 w-4" />,
      active:
        "from-emerald-500 to-teal-500",
    },
    {
      id: "services",
      label: "Services",
      icon: <Plus className="h-4 w-4" />,
      active:
        "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pb-16 text-white">
      {/* =====================================================
          GLOBAL BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-violet-600/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -60, 20, 0],
            y: [0, 40, -20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/10 blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/40 via-transparent to-cyan-950/30" />

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Link
                to="/my-events"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-cyan-300"
              >
                <ArrowLeft className="h-4 w-4" />
                My Events
              </Link>

              <div className="mt-6 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 px-3 py-1.5 text-xs font-bold text-violet-200">
                      <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
                      {event.categoryName ||
                        event.category ||
                        "Event"}
                    </span>

                    <StatusBadge
                      status={
                        event.status ||
                        "planning"
                      }
                    />
                  </div>

                  <h1 className="max-w-3xl truncate bg-gradient-to-r from-white via-violet-100 to-cyan-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                    {event.title ||
                      event.name ||
                      "My Event"}
                  </h1>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                    {event.date && (
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-violet-300" />
                        {formatDate(event.date)}
                      </span>
                    )}

                    {event.location && (
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-cyan-300" />
                        {event.location}
                      </span>
                    )}

                    {(event.guestCount ||
                      event.guests) && (
                      <span className="inline-flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-300" />
                        {event.guestCount ||
                          event.guests}{" "}
                        guests
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                  <Button
                    to={`/events/${
                      event.category || ""
                    }`}
                    variant="outline"
                    size="sm"
                  >
                    Browse Ideas
                  </Button>

                  <Button
                    to="/contact"
                    variant="primary"
                    size="sm"
                  >
                    Get Planning Help
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            PROGRESS BAR
        ===================================================== */}

        <section className="border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-white">
                  Planning progress
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {completedTasks} of{" "}
                  {checklist.length} tasks completed
                </p>
              </div>

              <span className="text-lg font-extrabold text-cyan-300">
                {progress}%
              </span>
            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/20"
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            TABS
        ===================================================== */}

        <section className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="planner-tab-bg"
                      className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${tab.active} opacity-20`}
                    />
                  )}

                  <span
                    className={
                      activeTab === tab.id
                        ? "text-white"
                        : "text-slate-500"
                    }
                  >
                    {tab.icon}
                  </span>

                  {tab.label}

                  {tab.id === "checklist" &&
                    checklist.length > 0 && (
                      <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                        {checklist.length}
                      </span>
                    )}

                  {tab.id === "services" &&
                    selectedServices.length >
                      0 && (
                      <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                        {selectedServices.length}
                      </span>
                    )}

                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="planner-tab-line"
                      className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r ${tab.active}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* =================================================
                OVERVIEW
            ================================================= */}

            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
                className="grid gap-6 lg:grid-cols-3"
              >
                {/* Main */}

                <div className="space-y-6 lg:col-span-2">
                  {/* Quick stats */}

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        icon: (
                          <CheckCircle2 className="h-5 w-5" />
                        ),
                        value: completedTasks,
                        label: "Tasks completed",
                      },
                      {
                        icon: (
                          <Users className="h-5 w-5" />
                        ),
                        value:
                          event.guestCount ||
                          event.guests ||
                          0,
                        label: "Expected guests",
                      },
                      {
                        icon: (
                          <Wallet className="h-5 w-5" />
                        ),
                        value:
                          formatCurrency(
                            budget
                          ),
                        label: "Estimated budget",
                      },
                    ].map((item, index) => {
                      const theme =
                        statThemes[index];

                      return (
                        <motion.div
                          key={item.label}
                          whileHover={{
                            y: -4,
                          }}
                          className={`relative overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.card} p-5 shadow-xl`}
                        >
                          <div
                            className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${theme.glow} blur-2xl`}
                          />

                          <div
                            className={`relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${theme.icon} text-white shadow-lg`}
                          >
                            {item.icon}
                          </div>

                          <p className="relative mt-5 truncate text-2xl font-extrabold text-white">
                            {item.value}
                          </p>

                          <p className="relative mt-1 text-xs font-semibold text-slate-400">
                            {item.label}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Event details */}

                  <div className="rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-950/70 via-violet-950/40 to-slate-950 p-5 shadow-xl sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-extrabold text-white">
                          Event details
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Your event information at a glance.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/create-event?type=${
                              event.category ||
                              ""
                            }`
                          )
                        }
                        className="rounded-lg px-3 py-2 text-sm font-bold text-violet-300 transition hover:bg-violet-500/10 hover:text-violet-200"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <InfoItem
                        theme={infoThemes[0]}
                        icon={
                          <CalendarDays className="h-5 w-5" />
                        }
                        label="Event date"
                        value={
                          event.date
                            ? formatDate(
                                event.date
                              )
                            : "Not set"
                        }
                      />

                      <InfoItem
                        theme={infoThemes[1]}
                        icon={
                          <Clock3 className="h-5 w-5" />
                        }
                        label="Planning status"
                        value={
                          event.status ||
                          "Planning"
                        }
                      />

                      <InfoItem
                        theme={infoThemes[2]}
                        icon={
                          <MapPin className="h-5 w-5" />
                        }
                        label="Location"
                        value={
                          event.location ||
                          "Not set"
                        }
                      />

                      <InfoItem
                        theme={infoThemes[3]}
                        icon={
                          <Users className="h-5 w-5" />
                        }
                        label="Guest count"
                        value={`${event.guestCount ||
                          event.guests ||
                          0} guests`}
                      />
                    </div>
                  </div>

                  {/* Venue */}

                  <div className="rounded-2xl border border-rose-400/15 bg-gradient-to-br from-rose-950/70 via-pink-950/40 to-slate-950 p-5 shadow-xl sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-extrabold text-white">
                          Venue
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Where your event will happen.
                        </p>
                      </div>

                      {!selectedVenue && (
                        <Button
                          to={`/venues${
                            event.category
                              ? `?type=${event.category}`
                              : ""
                          }`}
                          variant="outline"
                          size="sm"
                        >
                          Explore venues
                        </Button>
                      )}
                    </div>

                    {selectedVenue ? (
                      <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-lg sm:flex-row">
                        <img
                          src={selectedVenue.image}
                          alt={selectedVenue.name}
                          className="h-32 w-full rounded-xl object-cover ring-1 ring-white/10 sm:w-44"
                        />

                        <div className="min-w-0">
                          <p className="text-xs font-extrabold uppercase tracking-wide text-rose-300">
                            {selectedVenue.typeName}
                          </p>

                          <h3 className="mt-1 text-lg font-extrabold text-white">
                            {selectedVenue.name}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                            {selectedVenue.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-rose-300" />
                              {selectedVenue.capacity}
                            </span>

                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-pink-300" />
                              {selectedVenue.location
                                ?.city ||
                                selectedVenue.location ||
                                "Location"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-slate-950/40 p-8 text-center">
                        <MapPin className="mx-auto h-8 w-8 text-rose-300/60" />

                        <p className="mt-3 font-bold text-white">
                          No venue selected yet
                        </p>

                        <p className="mx-auto mt-1 max-w-md text-sm text-slate-400">
                          Explore venues and add one to your event when you're ready.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}

                <div className="space-y-6">
                  {/* Budget */}

                  <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-950/80 via-orange-950/50 to-slate-950 p-5 shadow-xl">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/15 blur-2xl" />

                    <div className="relative flex items-center justify-between">
                      <div>
                        <h2 className="font-extrabold text-white">
                          Budget
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                          Keep an eye on your plan.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={
                          openBudgetEditor
                        }
                        className="rounded-lg px-2 py-1 text-xs font-bold text-amber-300 transition hover:bg-amber-500/10 hover:text-amber-200"
                      >
                        Edit
                      </button>
                    </div>

                    <p className="relative mt-5 text-2xl font-extrabold text-white">
                      {formatCurrency(budget)}
                    </p>

                    <div className="relative mt-4 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Services selected
                      </span>

                      <span className="font-extrabold text-amber-200">
                        {formatCurrency(
                          serviceTotal
                        )}
                      </span>
                    </div>

                    <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        animate={{
                          width: `${budgetUsed}%`,
                        }}
                        className={`h-full rounded-full ${
                          budgetUsed > 90
                            ? "bg-gradient-to-r from-red-500 to-rose-400"
                            : "bg-gradient-to-r from-amber-400 to-orange-500"
                        }`}
                      />
                    </div>

                    {budget > 0 && (
                      <p className="relative mt-2 text-xs text-slate-400">
                        {budgetUsed}% of your estimated
                        budget allocated.
                      </p>
                    )}
                  </div>

                  {/* Planning status */}

                  <div className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-950/70 via-blue-950/40 to-slate-950 p-5 shadow-xl">
                    <h2 className="font-extrabold text-white">
                      Planning status
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Update this as your event progresses.
                    </p>

                    <div className="relative mt-4">
                      <select
                        value={
                          event.status ||
                          "planning"
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            e.target.value
                          )
                        }
                        className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 pr-10 text-sm font-bold text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/15"
                      >
                        <option
                          value="planning"
                          className="bg-slate-950 text-white"
                        >
                          Planning
                        </option>

                        <option
                          value="confirmed"
                          className="bg-slate-950 text-white"
                        >
                          Confirmed
                        </option>

                        <option
                          value="completed"
                          className="bg-slate-950 text-white"
                        >
                          Completed
                        </option>
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" />
                    </div>
                  </div>

                  {/* Quick actions */}

                  <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-xl backdrop-blur-xl">
                    <h2 className="font-extrabold text-white">
                      Quick actions
                    </h2>

                    <div className="mt-4 space-y-2">
                      <QuickAction
                        icon={
                          <CheckCircle2 className="h-4 w-4" />
                        }
                        label="Manage checklist"
                        accent="emerald"
                        onClick={() =>
                          setActiveTab(
                            "checklist"
                          )
                        }
                      />

                      <QuickAction
                        icon={
                          <Sparkles className="h-4 w-4" />
                        }
                        label="Add services"
                        accent="violet"
                        onClick={() =>
                          setActiveTab(
                            "services"
                          )
                        }
                      />

                      <QuickAction
                        icon={
                          <MapPin className="h-4 w-4" />
                        }
                        label="Explore venues"
                        accent="rose"
                        onClick={() =>
                          navigate("/venues")
                        }
                      />

                      <QuickAction
                        icon={
                          <Users className="h-4 w-4" />
                        }
                        label="View my bookings"
                        accent="cyan"
                        onClick={() =>
                          navigate(
                            "/my-bookings"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =================================================
                CHECKLIST
            ================================================= */}

            {activeTab === "checklist" && (
              <motion.div
                key="checklist"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
                className="mx-auto max-w-4xl"
              >
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-300">
                      Stay organized
                    </p>

                    <h2 className="mt-1 bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-2xl font-extrabold text-transparent">
                      Event checklist
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Complete each task as your event comes together.
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() =>
                      setShowAddTask(true)
                    }
                    variant="primary"
                    size="sm"
                    icon={
                      <Plus className="h-4 w-4" />
                    }
                  >
                    Add Task
                  </Button>
                </div>

                <div className="mb-5 rounded-2xl border border-emerald-400/15 bg-gradient-to-r from-emerald-950/70 via-teal-950/40 to-slate-950 p-5 shadow-xl">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-extrabold text-white">
                      Checklist progress
                    </span>

                    <span className="font-extrabold text-emerald-300">
                      {taskProgress}%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{
                        width: `${taskProgress}%`,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                    />
                  </div>
                </div>

                {checklist.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-emerald-400/20 bg-slate-900/75 p-10 text-center shadow-xl">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>

                    <h3 className="mt-4 font-extrabold text-white">
                      Your checklist is empty
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                      Start adding planning tasks such as booking a venue, finalizing the guest list, arranging catering and more.
                    </p>

                    <div className="mt-5">
                      <Button
                        type="button"
                        onClick={() =>
                          setShowAddTask(true)
                        }
                        variant="primary"
                        icon={
                          <Plus className="h-4 w-4" />
                        }
                      >
                        Add Your First Task
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {checklist.map(
                      (task, index) => {
                        const taskId =
                          task.id ||
                          task._id ||
                          index;

                        return (
                          <motion.div
                            layout
                            key={taskId}
                            whileHover={{
                              x: 3,
                            }}
                            className={`group flex items-center gap-4 rounded-2xl border p-4 shadow-lg transition ${
                              task.completed
                                ? "border-emerald-400/20 bg-gradient-to-r from-emerald-950/50 to-teal-950/30"
                                : "border-white/10 bg-slate-900/75 hover:border-violet-400/20"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                toggleChecklistItem(
                                  event.id,
                                  taskId
                                )
                              }
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition ${
                                task.completed
                                  ? "border-emerald-400 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                                  : "border-slate-600 text-transparent hover:border-emerald-400"
                              }`}
                              aria-label={
                                task.completed
                                  ? "Mark task incomplete"
                                  : "Mark task complete"
                              }
                            >
                              <Check className="h-4 w-4" />
                            </button>

                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-sm font-bold ${
                                  task.completed
                                    ? "text-slate-500 line-through"
                                    : "text-white"
                                }`}
                              >
                                {getChecklistTitle(
                                  task
                                )}
                              </p>

                              {task.description && (
                                <p className="mt-1 text-xs text-slate-500">
                                  {
                                    task.description
                                  }
                                </p>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteTask(
                                  task
                                )
                              }
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 opacity-100 transition hover:bg-red-500/10 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100"
                              aria-label="Delete task"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </motion.div>
                        );
                      }
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* =================================================
                SERVICES
            ================================================= */}

            {activeTab === "services" && (
              <motion.div
                key="services"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
              >
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-wider text-cyan-300">
                      Build your event
                    </p>

                    <h2 className="mt-1 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-2xl font-extrabold text-transparent">
                      Selected services
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Add the services you need to bring your event together.
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() =>
                      setShowServices(true)
                    }
                    variant="primary"
                    size="sm"
                    icon={
                      <Plus className="h-4 w-4" />
                    }
                  >
                    Add Service
                  </Button>
                </div>

                {selectedServices.length ===
                0 ? (
                  <div className="rounded-2xl border border-dashed border-cyan-400/20 bg-gradient-to-br from-cyan-950/60 via-blue-950/30 to-slate-950 p-10 text-center shadow-xl">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20">
                      <Sparkles className="h-7 w-7" />
                    </div>

                    <h3 className="mt-4 font-extrabold text-white">
                      No services selected
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                      Browse our planning services and add the ones that match your event.
                    </p>

                    <div className="mt-5">
                      <Button
                        type="button"
                        onClick={() =>
                          setShowServices(true)
                        }
                        variant="primary"
                      >
                        Explore Services
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {selectedServices.map(
                      (selected, index) => {
                        const service =
                          getService(selected);

                        if (!service) {
                          return null;
                        }

                        const theme =
                          serviceThemes[
                            index %
                              serviceThemes.length
                          ];

                        return (
                          <motion.div
                            layout
                            key={
                              service.id ||
                              index
                            }
                            whileHover={{
                              y: -5,
                            }}
                            className={`group overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.card} shadow-xl transition ${theme.hover}`}
                          >
                            <div className="relative h-44 overflow-hidden bg-slate-950">
                              <img
                                src={
                                  service.image
                                }
                                alt={
                                  service.name
                                }
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                              <button
                                type="button"
                                onClick={() =>
                                  setShowDeleteService(
                                    service
                                  )
                                }
                                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-slate-200 shadow-lg backdrop-blur transition hover:bg-red-500/20 hover:text-red-300"
                                aria-label="Remove service"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="p-5">
                              <p
                                className={`text-xs font-extrabold uppercase tracking-wide ${theme.accent}`}
                              >
                                {
                                  service.categoryName
                                }
                              </p>

                              <h3 className="mt-1 font-extrabold text-white">
                                {
                                  service.name
                                }
                              </h3>

                              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                                {
                                  service.shortDescription ||
                                  service.description
                                }
                              </p>

                              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                                <span className="text-sm font-extrabold text-white">
                                  {formatCurrency(
                                    service.price
                                  )}
                                </span>

                                {service.unit && (
                                  <span className="text-xs font-medium text-slate-500">
                                    {
                                      service.unit
                                    }
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      }
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =====================================================
          ADD TASK MODAL
      ===================================================== */}

      <Modal
        isOpen={showAddTask}
        onClose={() =>
          setShowAddTask(false)
        }
        title="Add planning task"
        description="Add something you need to complete for this event."
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="newTask"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Task name
            </label>

            <input
              id="newTask"
              type="text"
              value={newTask}
              onChange={(e) =>
                setNewTask(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTask();
                }
              }}
              placeholder="e.g. Finalize guest list"
              autoFocus
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setShowAddTask(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="primary"
              onClick={handleAddTask}
              icon={
                <Plus className="h-4 w-4" />
              }
            >
              Add Task
            </Button>
          </div>
        </div>
      </Modal>

      {/* =====================================================
          SERVICES MODAL
      ===================================================== */}

      <Modal
        isOpen={showServices}
        onClose={() =>
          setShowServices(false)
        }
        title="Add services"
        description="Choose services you'd like to include in your event plan."
        size="lg"
      >
        {availableServices.length === 0 ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />

            <h3 className="mt-4 font-bold text-slate-900">
              All available services are selected
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              You can remove a service from your event and select another one.
            </p>
          </div>
        ) : (
          <div className="grid max-h-[65vh] gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
            {availableServices.map(
              (service, index) => {
                const theme =
                  serviceThemes[
                    index %
                      serviceThemes.length
                  ];

                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    whileHover={{
                      y: -3,
                    }}
                    onClick={() =>
                      handleAddService(
                        service
                      )
                    }
                    className={`group overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.card} text-left shadow-lg transition ${theme.hover}`}
                  >
                    <div className="relative h-32 overflow-hidden bg-slate-950">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                      <span
                        className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${theme.badge} text-white shadow-lg`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="p-4">
                      <p
                        className={`text-[10px] font-extrabold uppercase tracking-wider ${theme.accent}`}
                      >
                        {
                          service.categoryName
                        }
                      </p>

                      <h3 className="mt-1 font-extrabold text-white">
                        {service.name}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                        {
                          service.shortDescription
                        }
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-extrabold text-white">
                          {formatCurrency(
                            service.price
                          )}
                        </span>

                        <span
                          className={`text-xs font-extrabold ${theme.accent}`}
                        >
                          Add
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              }
            )}
          </div>
        )}
      </Modal>

      {/* =====================================================
          REMOVE SERVICE MODAL
      ===================================================== */}

      <Modal
        isOpen={Boolean(showDeleteService)}
        onClose={() =>
          setShowDeleteService(null)
        }
        title="Remove service?"
        description="This service will be removed from your event plan. You can add it again later."
        size="sm"
      >
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              setShowDeleteService(null)
            }
          >
            Keep Service
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={
              handleRemoveService
            }
            icon={
              <Trash2 className="h-4 w-4" />
            }
          >
            Remove
          </Button>
        </div>
      </Modal>

      {/* =====================================================
          BUDGET MODAL
      ===================================================== */}

      <Modal
        isOpen={editingBudget}
        onClose={() =>
          setEditingBudget(false)
        }
        title="Update budget"
        description="Set the estimated amount you want to plan this event around."
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="budgetValue"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Estimated budget
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                ₹
              </span>

              <input
                id="budgetValue"
                type="number"
                min="0"
                value={budgetValue}
                onChange={(e) =>
                  setBudgetValue(
                    e.target.value
                  )
                }
                placeholder="250000"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setEditingBudget(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="primary"
              loading={isSaving}
              onClick={saveBudget}
            >
              Save Budget
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

/* ============================================================
   INFO ITEM
============================================================ */

const InfoItem = ({
  icon,
  label,
  value,
  theme,
}) => (
  <div
    className={`flex items-start gap-3 rounded-xl border ${theme.border} bg-gradient-to-br ${theme.box} p-4`}
  >
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${theme.icon} text-white shadow-lg`}
    >
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-xs font-semibold text-slate-500">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-extrabold capitalize text-white">
        {value}
      </p>
    </div>
  </div>
);

/* ============================================================
   QUICK ACTION
============================================================ */

const QuickAction = ({
  icon,
  label,
  onClick,
  accent = "violet",
}) => {
  const styles = {
    violet: {
      box: "hover:border-violet-400/20 hover:bg-violet-500/10",
      icon: "text-violet-300",
    },
    emerald: {
      box: "hover:border-emerald-400/20 hover:bg-emerald-500/10",
      icon: "text-emerald-300",
    },
    rose: {
      box: "hover:border-rose-400/20 hover:bg-rose-500/10",
      icon: "text-rose-300",
    },
    cyan: {
      box: "hover:border-cyan-400/20 hover:bg-cyan-500/10",
      icon: "text-cyan-300",
    },
  };

  const current =
    styles[accent] || styles.violet;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border border-transparent bg-white/[0.03] px-4 py-3 text-left text-sm font-bold text-slate-300 transition ${current.box} hover:text-white`}
    >
      <span className={current.icon}>
        {icon}
      </span>

      <span>{label}</span>

      <ArrowRight className="ml-auto h-4 w-4 text-slate-600 transition group-hover:text-slate-300" />
    </button>
  );
};

export default EventPlanner;