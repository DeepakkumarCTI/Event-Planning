import { useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

import { useEvent } from "../../context/EventContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import { EVENT_CATEGORIES } from "../../context/EventContext";

const CreateEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const { createEvent } = useEvent();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const initialCategory =
    queryParams.get("type") || "";

  const initialVenue =
    queryParams.get("venue") || "";

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    category: initialCategory,
    date: "",
    location: "",
    guestCount: "",
    budget: "",
    venue: initialVenue,
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);

  const totalSteps = 3;

  /* =========================================================
     FORM UPDATE
  ========================================================= */

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) {
        newErrors.title =
          "Please enter an event name.";
      }

      if (!formData.category) {
        newErrors.category =
          "Please select an event type.";
      }
    }

    if (currentStep === 2) {
      if (!formData.date) {
        newErrors.date =
          "Please select your event date.";
      } else {
        const selectedDate = new Date(
          `${formData.date}T00:00:00`
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          newErrors.date =
            "Event date cannot be in the past.";
        }
      }

      if (!formData.location.trim()) {
        newErrors.location =
          "Please enter the event location.";
      }

      if (!formData.guestCount) {
        newErrors.guestCount =
          "Please enter the expected guest count.";
      } else if (
        Number(formData.guestCount) < 1
      ) {
        newErrors.guestCount =
          "Guest count must be at least 1.";
      }
    }

    if (currentStep === 3) {
      if (
        formData.budget &&
        Number(formData.budget) < 0
      ) {
        newErrors.budget =
          "Budget cannot be negative.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     NEXT STEP
  ========================================================= */

  const handleNext = () => {
    if (!validateStep(step)) return;

    if (step < totalSteps) {
      setStep((previous) => previous + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* =========================================================
     PREVIOUS STEP
  ========================================================= */

  const handleBack = () => {
    if (step > 1) {
      setStep((previous) => previous - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* =========================================================
     CREATE EVENT
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateStep(3)) return;

    setIsCreating(true);

    try {
      const selectedCategory =
        EVENT_CATEGORIES.find(
          (category) =>
            category.id === formData.category
        );

      const eventData = {
        title: formData.title.trim(),

        name: formData.title.trim(),

        category: formData.category,

        categoryName:
          selectedCategory?.name ||
          formData.category,

        date: formData.date,

        location: formData.location.trim(),

        guestCount: Number(
          formData.guestCount
        ),

        guests: Number(
          formData.guestCount
        ),

        budget: formData.budget
          ? Number(formData.budget)
          : 0,

        budgetAmount: formData.budget
          ? Number(formData.budget)
          : 0,

        venue: formData.venue
          ? {
              id: formData.venue,
            }
          : null,

        notes: formData.notes.trim(),

        description: formData.notes.trim(),

        status: "planning",

        progress: 0,

        checklist: [],

        services: [],

        createdBy:
          user?.id ||
          user?._id ||
          user?.email ||
          null,

        createdAt:
          new Date().toISOString(),
      };

      const createdEvent =
        await createEvent(eventData);

      const eventId =
        createdEvent?.id ||
        createdEvent?._id;

      if (eventId) {
        navigate(
          `/event-planner?event=${eventId}`,
          {
            replace: true,
          }
        );
      } else {
        navigate("/my-events", {
          replace: true,
        });
      }
    } catch (error) {
      console.error(
        "Create event error:",
        error
      );

      setErrors({
        submit:
          "Something went wrong while creating your event. Please try again.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  /* =========================================================
     STEP DATA
  ========================================================= */

  const steps = [
    {
      number: 1,
      title: "Event basics",
      description:
        "Tell us what you're planning.",
      icon: Sparkles,
      gradient:
        "from-violet-500 to-fuchsia-500",
      soft:
        "bg-violet-500/10",
      border:
        "border-violet-400/20",
      text:
        "text-violet-300",
    },
    {
      number: 2,
      title: "Date & guests",
      description:
        "Set the important event details.",
      icon: CalendarDays,
      gradient:
        "from-cyan-500 to-blue-500",
      soft:
        "bg-cyan-500/10",
      border:
        "border-cyan-400/20",
      text:
        "text-cyan-300",
    },
    {
      number: 3,
      title: "Budget & notes",
      description:
        "Add your planning preferences.",
      icon: Users,
      gradient:
        "from-amber-400 to-orange-500",
      soft:
        "bg-amber-500/10",
      border:
        "border-amber-400/20",
      text:
        "text-amber-300",
    },
  ];

  /* =========================================================
     CATEGORY COLORS
  ========================================================= */

  const categoryStyles = [
    {
      card:
        "from-violet-500/10 to-fuchsia-500/5",
      border:
        "border-violet-400/20",
      selected:
        "border-violet-400 bg-violet-500/15 ring-2 ring-violet-400/20",
      icon:
        "from-violet-500 to-fuchsia-500",
      text:
        "text-violet-200",
      check:
        "bg-violet-500",
    },
    {
      card:
        "from-cyan-500/10 to-blue-500/5",
      border:
        "border-cyan-400/20",
      selected:
        "border-cyan-400 bg-cyan-500/15 ring-2 ring-cyan-400/20",
      icon:
        "from-cyan-500 to-blue-500",
      text:
        "text-cyan-200",
      check:
        "bg-cyan-500",
    },
    {
      card:
        "from-amber-500/10 to-orange-500/5",
      border:
        "border-amber-400/20",
      selected:
        "border-amber-400 bg-amber-500/15 ring-2 ring-amber-400/20",
      icon:
        "from-amber-400 to-orange-500",
      text:
        "text-amber-200",
      check:
        "bg-amber-500",
    },
    {
      card:
        "from-rose-500/10 to-pink-500/5",
      border:
        "border-rose-400/20",
      selected:
        "border-rose-400 bg-rose-500/15 ring-2 ring-rose-400/20",
      icon:
        "from-rose-500 to-pink-500",
      text:
        "text-rose-200",
      check:
        "bg-rose-500",
    },
    {
      card:
        "from-emerald-500/10 to-teal-500/5",
      border:
        "border-emerald-400/20",
      selected:
        "border-emerald-400 bg-emerald-500/15 ring-2 ring-emerald-400/20",
      icon:
        "from-emerald-500 to-teal-500",
      text:
        "text-emerald-200",
      check:
        "bg-emerald-500",
    },
    {
      card:
        "from-indigo-500/10 to-purple-500/5",
      border:
        "border-indigo-400/20",
      selected:
        "border-indigo-400 bg-indigo-500/15 ring-2 ring-indigo-400/20",
      icon:
        "from-indigo-500 to-purple-500",
      text:
        "text-indigo-200",
      check:
        "bg-indigo-500",
    },
    {
      card:
        "from-sky-500/10 to-cyan-500/5",
      border:
        "border-sky-400/20",
      selected:
        "border-sky-400 bg-sky-500/15 ring-2 ring-sky-400/20",
      icon:
        "from-sky-500 to-cyan-500",
      text:
        "text-sky-200",
      check:
        "bg-sky-500",
    },
    {
      card:
        "from-orange-500/10 to-red-500/5",
      border:
        "border-orange-400/20",
      selected:
        "border-orange-400 bg-orange-500/15 ring-2 ring-orange-400/20",
      icon:
        "from-orange-500 to-red-500",
      text:
        "text-orange-200",
      check:
        "bg-orange-500",
    },
  ];

  /* =========================================================
     INPUT CLASS
  ========================================================= */

  const inputClass = (field) =>
    `w-full rounded-2xl border bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none backdrop-blur-sm transition placeholder:text-slate-600 ${
      errors[field]
        ? "border-red-400/60 ring-4 ring-red-500/10"
        : "border-white/10 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10"
    }`;

  /* =========================================================
     CURRENT STEP THEME
  ========================================================= */

  const currentStep =
    steps[step - 1];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-180px] top-[25%] h-[460px] w-[460px] rounded-full bg-cyan-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-180px] left-[30%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_35%)]" />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative border-b border-white/10 bg-slate-950/80 pt-28 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 pb-7 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex items-center justify-between gap-4"
          >
            <div>
              <Link
                to="/my-events"
                className="group mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-violet-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition group-hover:border-violet-400/40 group-hover:bg-violet-500/10">
                  <ArrowLeft className="h-4 w-4" />
                </span>

                My Events
              </Link>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Create a{" "}
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  New Event
                </span>
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Let's build your event plan step by
                step and turn your celebration into
                something unforgettable.
              </p>
            </div>

            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 text-white shadow-xl shadow-violet-500/20 sm:flex"
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          STEPPER
      ===================================================== */}

      <section className="relative border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start">
            {steps.map((item, index) => {
              const Icon = item.icon;

              const isCompleted =
                step > item.number;

              const isCurrent =
                step === item.number;

              return (
                <div
                  key={item.number}
                  className="flex flex-1 items-start"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <motion.div
                      animate={{
                        scale: isCurrent
                          ? [1, 1.05, 1]
                          : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: isCurrent
                          ? Infinity
                          : 0,
                      }}
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                        isCompleted
                          ? `border-transparent bg-gradient-to-br ${item.gradient} text-white shadow-lg`
                          : isCurrent
                          ? `border-white/10 ${item.soft} ${item.text}`
                          : "border-white/10 bg-white/5 text-slate-600"
                      }`}
                    >
                      {isCurrent && (
                        <span
                          className={`absolute inset-[-4px] rounded-full bg-gradient-to-r ${item.gradient} opacity-20 blur-md`}
                        />
                      )}

                      <span className="relative">
                        {isCompleted ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </span>
                    </motion.div>

                    <div className="hidden min-w-0 md:block">
                      <p
                        className={`text-sm font-bold ${
                          isCurrent ||
                          isCompleted
                            ? "text-white"
                            : "text-slate-600"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {index <
                    steps.length - 1 && (
                    <div className="mx-3 mt-5 h-px flex-1 overflow-hidden bg-white/10 sm:mx-5">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width:
                            step >
                            item.number
                              ? "100%"
                              : "0%",
                        }}
                        transition={{
                          duration: 0.5,
                        }}
                        className={`h-full bg-gradient-to-r ${item.gradient}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 text-center text-xs font-semibold text-slate-500 md:hidden">
            Step {step} of {totalSteps}
          </div>
        </div>
      </section>

      {/* =====================================================
          FORM
      ===================================================== */}

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* =================================================
                STEP 1
            ================================================= */}

            {step === 1 && (
              <motion.section
                key="step-one"
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -30,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/60 via-fuchsia-950/30 to-slate-950 p-5 shadow-2xl shadow-violet-950/20 backdrop-blur-xl sm:p-8"
              >
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Step 1 · Event basics
                  </span>

                  <h2 className="mt-5 text-2xl font-black text-white sm:text-3xl">
                    What are you{" "}
                    <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                      planning?
                    </span>
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Give your event a name and choose
                    the type of celebration you're
                    organizing.
                  </p>
                </div>

                <div className="relative mt-8 space-y-7">
                  {/* Event name */}

                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2.5 block text-sm font-bold text-slate-200"
                    >
                      Event name
                    </label>

                    <input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(event) =>
                        updateField(
                          "title",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Priya & Arun's Wedding"
                      className={inputClass(
                        "title"
                      )}
                    />

                    {errors.title && (
                      <p className="mt-2 text-xs font-medium text-red-400">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Category */}

                  <div>
                    <label className="mb-3 block text-sm font-bold text-slate-200">
                      Event type
                    </label>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {EVENT_CATEGORIES.map(
                        (
                          category,
                          index
                        ) => {
                          const selected =
                            formData.category ===
                            category.id;

                          const style =
                            categoryStyles[
                              index %
                                categoryStyles.length
                            ];

                          return (
                            <motion.button
                              key={
                                category.id
                              }
                              type="button"
                              onClick={() =>
                                updateField(
                                  "category",
                                  category.id
                                )
                              }
                              whileHover={{
                                y: -4,
                              }}
                              whileTap={{
                                scale: 0.98,
                              }}
                              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${
                                selected
                                  ? style.selected
                                  : `${style.border} bg-gradient-to-br ${style.card} hover:bg-white/5`
                              }`}
                            >
                              <div
                                className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${style.icon} opacity-10 blur-xl`}
                              />

                              <div className="relative flex items-center justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                  <span
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${style.icon} text-xl shadow-lg`}
                                  >
                                    {category.icon}
                                  </span>

                                  <span
                                    className={`text-sm font-bold ${
                                      selected
                                        ? style.text
                                        : "text-slate-200"
                                    }`}
                                  >
                                    {
                                      category.name
                                    }
                                  </span>
                                </div>

                                {selected && (
                                  <span
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${style.check} text-white shadow-lg`}
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                  </span>
                                )}
                              </div>

                              {category.description && (
                                <p className="relative mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
                                  {
                                    category.description
                                  }
                                </p>
                              )}
                            </motion.button>
                          );
                        }
                      )}
                    </div>

                    {errors.category && (
                      <p className="mt-2 text-xs font-medium text-red-400">
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>
              </motion.section>
            )}

            {/* =================================================
                STEP 2
            ================================================= */}

            {step === 2 && (
              <motion.section
                key="step-two"
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -30,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/60 via-blue-950/40 to-slate-950 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8"
              >
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-300">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Step 2 · Date & guests
                  </span>

                  <h2 className="mt-5 text-2xl font-black text-white sm:text-3xl">
                    Set the{" "}
                    <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                      event essentials
                    </span>
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Choose your date, location and
                    approximate number of guests.
                  </p>
                </div>

                <div className="relative mt-8 grid gap-6 sm:grid-cols-2">
                  {/* Date */}

                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2.5 block text-sm font-bold text-slate-200"
                    >
                      Event date
                    </label>

                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />

                      <input
                        id="date"
                        type="date"
                        value={
                          formData.date
                        }
                        onChange={(event) =>
                          updateField(
                            "date",
                            event.target.value
                          )
                        }
                        min={
                          new Date()
                            .toISOString()
                            .split(
                              "T"
                            )[0]
                        }
                        className={`${inputClass(
                          "date"
                        )} pl-12`}
                      />
                    </div>

                    {errors.date && (
                      <p className="mt-2 text-xs font-medium text-red-400">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  {/* Guests */}

                  <div>
                    <label
                      htmlFor="guestCount"
                      className="mb-2.5 block text-sm font-bold text-slate-200"
                    >
                      Expected guests
                    </label>

                    <div className="relative">
                      <Users className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-400" />

                      <input
                        id="guestCount"
                        type="number"
                        min="1"
                        value={
                          formData.guestCount
                        }
                        onChange={(event) =>
                          updateField(
                            "guestCount",
                            event.target.value
                          )
                        }
                        placeholder="e.g. 150"
                        className={`${inputClass(
                          "guestCount"
                        )} pl-12`}
                      />
                    </div>

                    {errors.guestCount && (
                      <p className="mt-2 text-xs font-medium text-red-400">
                        {
                          errors.guestCount
                        }
                      </p>
                    )}
                  </div>

                  {/* Location */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="location"
                      className="mb-2.5 block text-sm font-bold text-slate-200"
                    >
                      Event location
                    </label>

                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-400" />

                      <input
                        id="location"
                        type="text"
                        value={
                          formData.location
                        }
                        onChange={(event) =>
                          updateField(
                            "location",
                            event.target.value
                          )
                        }
                        placeholder="e.g. Chennai, Tamil Nadu"
                        className={`${inputClass(
                          "location"
                        )} pl-12`}
                      />
                    </div>

                    {errors.location && (
                      <p className="mt-2 text-xs font-medium text-red-400">
                        {
                          errors.location
                        }
                      </p>
                    )}
                  </div>

                  {/* Venue */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="venue"
                      className="mb-2.5 block text-sm font-bold text-slate-200"
                    >
                      Venue preference

                      <span className="ml-2 font-normal text-slate-500">
                        Optional
                      </span>
                    </label>

                    <div className="relative">
                      <select
                        id="venue"
                        value={
                          formData.venue
                        }
                        onChange={(event) =>
                          updateField(
                            "venue",
                            event.target.value
                          )
                        }
                        className={`${inputClass(
                          "venue"
                        )} appearance-none pr-12`}
                      >
                        <option
                          value=""
                          className="bg-slate-950"
                        >
                          Select later
                        </option>

                        <option
                          value="grand-heritage-hall"
                          className="bg-slate-950"
                        >
                          Grand Heritage Hall
                        </option>

                        <option
                          value="royal-palm-resort"
                          className="bg-slate-950"
                        >
                          Royal Palm Resort
                        </option>

                        <option
                          value="skyline-rooftop"
                          className="bg-slate-950"
                        >
                          Skyline Rooftop
                        </option>

                        <option
                          value="emerald-garden"
                          className="bg-slate-950"
                        >
                          Emerald Garden
                        </option>

                        <option
                          value="business-conference-centre"
                          className="bg-slate-950"
                        >
                          Business Conference Centre
                        </option>

                        <option
                          value="lakeview-banquet"
                          className="bg-slate-950"
                        >
                          Lakeview Banquet
                        </option>

                        <option
                          value="green-meadows-community-hall"
                          className="bg-slate-950"
                        >
                          Green Meadows Community Hall
                        </option>

                        <option
                          value="grand-oak-hotel"
                          className="bg-slate-950"
                        >
                          Grand Oak Hotel
                        </option>
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* =================================================
                STEP 3
            ================================================= */}

            {step === 3 && (
              <motion.section
                key="step-three"
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -30,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-950/60 via-orange-950/40 to-slate-950 p-5 shadow-2xl shadow-orange-950/20 backdrop-blur-xl sm:p-8"
              >
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

                <div className="relative max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Step 3 · Budget & notes
                  </span>

                  <h2 className="mt-5 text-2xl font-black text-white sm:text-3xl">
                    Add your{" "}
                    <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                      planning preferences
                    </span>
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    These details help you keep your
                    event plan organized. You can update
                    them later.
                  </p>
                </div>

                <div className="relative mt-8 space-y-7">
                  {/* Budget */}

                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-2.5 block text-sm font-bold text-slate-200"
                    >
                      Estimated budget

                      <span className="ml-2 font-normal text-slate-500">
                        Optional
                      </span>
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-amber-400">
                        ₹
                      </span>

                      <input
                        id="budget"
                        type="number"
                        min="0"
                        value={
                          formData.budget
                        }
                        onChange={(event) =>
                          updateField(
                            "budget",
                            event.target.value
                          )
                        }
                        placeholder="e.g. 250000"
                        className={`${inputClass(
                          "budget"
                        )} pl-10`}
                      />
                    </div>

                    {errors.budget && (
                      <p className="mt-2 text-xs font-medium text-red-400">
                        {errors.budget}
                      </p>
                    )}
                  </div>

                  {/* Notes */}

                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-2.5 block text-sm font-bold text-slate-200"
                    >
                      Additional notes

                      <span className="ml-2 font-normal text-slate-500">
                        Optional
                      </span>
                    </label>

                    <textarea
                      id="notes"
                      rows="6"
                      value={
                        formData.notes
                      }
                      onChange={(event) =>
                        updateField(
                          "notes",
                          event.target.value
                        )
                      }
                      placeholder="Tell us anything important about your event..."
                      className={`${inputClass(
                        "notes"
                      )} resize-none`}
                    />

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      You can add specific requirements,
                      preferred themes, important guests,
                      or anything else you want to remember.
                    </p>
                  </div>

                  {/* Summary */}

                  <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-950/60 via-teal-950/40 to-slate-950 p-5">
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

                    <div className="relative flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="font-bold text-white">
                          Ready to create your event?
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          You can change any of these
                          details later from your event planner.
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
                      <SummaryItem
                        label="Event"
                        value={
                          formData.title ||
                          "Not provided"
                        }
                        gradient="from-violet-500 to-fuchsia-500"
                      />

                      <SummaryItem
                        label="Type"
                        value={
                          EVENT_CATEGORIES.find(
                            (category) =>
                              category.id ===
                              formData.category
                          )?.name ||
                          "Not selected"
                        }
                        gradient="from-cyan-500 to-blue-500"
                      />

                      <SummaryItem
                        label="Date"
                        value={
                          formData.date ||
                          "Not selected"
                        }
                        gradient="from-amber-400 to-orange-500"
                      />

                      <SummaryItem
                        label="Guests"
                        value={
                          formData.guestCount ||
                          "Not provided"
                        }
                        gradient="from-rose-500 to-pink-500"
                      />
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm font-medium text-red-300">
                      {errors.submit}
                    </div>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* ===================================================
              NAVIGATION
          =================================================== */}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="button"
              onClick={
                step === 1
                  ? () =>
                      navigate(
                        "/my-events"
                      )
                  : handleBack
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-5 py-3.5 text-sm font-bold text-slate-300 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />

              {step === 1
                ? "Cancel"
                : "Previous"}
            </motion.button>

            {step < totalSteps ? (
              <motion.div
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Button
                  type="button"
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  icon={
                    <ArrowRight className="h-4 w-4" />
                  }
                >
                  Continue
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isCreating}
                  icon={
                    !isCreating && (
                      <CheckCircle2 className="h-4 w-4" />
                    )
                  }
                >
                  Create Event
                </Button>
              </motion.div>
            )}
          </div>

          {/* ===================================================
              PROGRESS
          =================================================== */}

          <div className="mx-auto mt-7 max-w-sm">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">
                Your progress
              </span>

              <span
                className={
                  currentStep.text
                }
              >
                {Math.round(
                  (step / totalSteps) *
                    100
                )}
                %
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{
                  width: `${
                    (step /
                      totalSteps) *
                    100
                  }%`,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className={`h-full rounded-full bg-gradient-to-r ${currentStep.gradient} shadow-lg`}
              />
            </div>

            <div className="mt-3 flex justify-center gap-1.5">
              {steps.map((item) => (
                <motion.div
                  key={item.number}
                  animate={{
                    width:
                      step ===
                      item.number
                        ? 28
                        : 7,
                  }}
                  className={`h-1.5 rounded-full ${
                    step >= item.number
                      ? `bg-gradient-to-r ${item.gradient}`
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

/* ===========================================================
   SUMMARY ITEM
=========================================================== */

const SummaryItem = ({
  label,
  value,
  gradient,
}) => (
  <motion.div
    whileHover={{
      y: -2,
    }}
    className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-4"
  >
    <div
      className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${gradient}`}
    />

    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
      {label}
    </p>

    <p className="mt-1.5 truncate text-sm font-semibold text-white">
      {value}
    </p>
  </motion.div>
);

export default CreateEvent;