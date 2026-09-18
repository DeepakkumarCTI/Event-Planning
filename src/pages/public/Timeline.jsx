
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Flame,
  Plus,
  CheckCircle2,
  AlertCircle,
  Play,
  Users,
  Camera,
  ChefHat,
  Music,
  Trash2,
  Calendar,
  X,
  Sparkles,
  Zap,
  Radio,
  ChevronRight,
} from "lucide-react";

const initialCues = [
  {
    id: 1,
    time: "05:00 AM",
    title: "Ganapathi Homam & Navagraha Puja",
    role: "Vadhyar",
    status: "Completed",
    note: "Sacred fire altar, ghee, coconut, and puja dravyam organized",
  },
  {
    id: 2,
    time: "06:15 AM",
    title: "Thiruvarur Nadaswaram & Thavil Recital",
    role: "Music",
    status: "Completed",
    note: "Mangala Vadhyam ensemble begins auspicious ragas",
  },
  {
    id: 3,
    time: "07:15 AM",
    title: "Kasi Yatra & Malai Matral (Garland Exchange)",
    role: "Family",
    status: "In Progress",
    note: "Silver umbrella, Gita, and fresh jasmine garlands ready",
  },
  {
    id: 4,
    time: "08:15 AM",
    title: "Oonjal (Swing Ceremony) & Family Songs",
    role: "Family",
    status: "Upcoming",
    note: "Milk, banana, coloured rice balls for traditional blessings",
  },
  {
    id: 5,
    time: "08:45 AM",
    title: "Auspicious Muhurtham Lagna & Thali Kattu",
    role: "Vadhyar",
    status: "Upcoming",
    note: "Mangalya Dharanam at peak auspicious time with Vadhyar chanting",
  },
  {
    id: 6,
    time: "10:15 AM",
    title: "Sapthapadi (7 Steps) & Elder Family Blessings",
    role: "Vadhyar",
    status: "Upcoming",
    note: "Sacred fire circumambulation and gift offerings",
  },
  {
    id: 7,
    time: "11:30 AM",
    title: "Royal Chettinad 24-Item Banana Leaf Feast",
    role: "Catering",
    status: "Upcoming",
    note: "Dining hall batch 1 seating (350 guests) + live filter coffee",
  },
  {
    id: 8,
    time: "06:30 PM",
    title: "Grand Reception & Stage Photography",
    role: "Coordinator",
    status: "Upcoming",
    note: "Couple grand entry on floral stage with classical fusion band",
  },
  {
    id: 9,
    time: "08:30 PM",
    title: "Evening Reception Banquet & Live Counters",
    role: "Catering",
    status: "Upcoming",
    note: "Chettinad delicacies, live appam / dosa stalls & elaneer payasam",
  },
];

const roleIcons = {
  Coordinator: Users,
  Photography: Camera,
  Catering: ChefHat,
  Music: Music,
  Vadhyar: Flame,
  Family: Users,
};

const roleStyles = {
  Vadhyar: {
    badge: "border-orange-200 bg-orange-50 text-orange-700",
    icon: "from-orange-500 to-rose-500",
    glow: "bg-orange-200",
  },
  Music: {
    badge: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
    icon: "from-fuchsia-500 to-purple-500",
    glow: "bg-fuchsia-200",
  },
  Family: {
    badge: "border-violet-200 bg-violet-50 text-violet-700",
    icon: "from-violet-500 to-indigo-500",
    glow: "bg-violet-200",
  },
  Catering: {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    icon: "from-amber-400 to-orange-500",
    glow: "bg-amber-200",
  },
  Coordinator: {
    badge: "border-cyan-200 bg-cyan-50 text-cyan-700",
    icon: "from-cyan-500 to-blue-500",
    glow: "bg-cyan-200",
  },
  Photography: {
    badge: "border-pink-200 bg-pink-50 text-pink-700",
    icon: "from-pink-500 to-rose-500",
    glow: "bg-pink-200",
  },
};

const filterStyles = {
  All: "from-violet-600 to-fuchsia-600",
  Vadhyar: "from-orange-500 to-rose-500",
  Music: "from-fuchsia-600 to-purple-600",
  Family: "from-violet-600 to-indigo-600",
  Catering: "from-amber-500 to-orange-500",
  Coordinator: "from-cyan-500 to-blue-600",
  Photography: "from-pink-500 to-rose-600",
};

const Timeline = () => {
  const [cues, setCues] = useState(() => {
    const saved = localStorage.getItem("eventara_run_of_show_tamil");
    return saved ? JSON.parse(saved) : initialCues;
  });

  const [roleFilter, setRoleFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTime, setNewTime] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newRole, setNewRole] = useState("Coordinator");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "eventara_run_of_show_tamil",
      JSON.stringify(cues)
    );
  }, [cues]);

  const toggleCueStatus = (id) => {
    setCues(
      cues.map((c) => {
        if (c.id === id) {
          const next =
            c.status === "Completed"
              ? "In Progress"
              : c.status === "In Progress"
              ? "Upcoming"
              : "Completed";

          return {
            ...c,
            status: next,
          };
        }

        return c;
      })
    );
  };

  const handleAddCue = (e) => {
    e.preventDefault();

    if (!newTime.trim() || !newTitle.trim()) return;

    const newCue = {
      id: Date.now(),
      time: newTime,
      title: newTitle,
      role: newRole,
      status: "Upcoming",
      note: newNote,
    };

    setCues([...cues, newCue]);

    setNewTime("");
    setNewTitle("");
    setNewNote("");
    setNewRole("Coordinator");
    setIsAddModalOpen(false);
  };

  const handleDeleteCue = (id) => {
    setCues(cues.filter((c) => c.id !== id));
  };

  const filteredCues =
    roleFilter === "All"
      ? cues
      : cues.filter((c) => c.role === roleFilter);

  const completedCount = cues.filter(
    (c) => c.status === "Completed"
  ).length;

  const inProgressCount = cues.filter(
    (c) => c.status === "In Progress"
  ).length;

  const upcomingCount = cues.filter(
    (c) => c.status === "Upcoming"
  ).length;

  const progressPercentage =
    cues.length > 0
      ? Math.round((completedCount / cues.length) * 100)
      : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-slate-50 to-violet-50/60 px-4 pb-24 pt-28 font-sans text-slate-900 sm:px-6 lg:px-8">
      {/* =====================================================
          ANIMATED LIGHT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 70, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-300/25 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-12rem] top-40 h-[32rem] w-[32rem] rounded-full bg-cyan-300/25 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.07),transparent_30%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-8">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl sm:p-8"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-200/50 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-violet-700">
                <Clock className="h-4 w-4 text-fuchsia-600" />

                Ceremonial Run-of-Show

                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-300" />
              </div>

              <h1 className="font-display text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                <span className="text-slate-900">
                  Day-of Muhurtham
                </span>{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  Timeline
                </span>
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                Minute-by-minute ritual synchronization for Vadhyar
                priests, Nadaswaram troupe, caterers, photographers,
                coordinators, and family hosts.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-5 py-3 text-xs font-black text-white shadow-xl shadow-fuchsia-200/70 transition-all hover:shadow-fuchsia-300"
            >
              <Plus className="h-4 w-4" />
              Add Ceremony Cue
            </motion.button>
          </div>
        </motion.div>

        {/* =====================================================
            STATISTICS
        ====================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-5 shadow-lg shadow-violet-100/70"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-200/60 blur-2xl" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                  Execution
                </p>

                <p className="mt-2 text-2xl font-black text-slate-900">
                  {progressPercentage}%
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Overall Progress
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-200">
                <Zap className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-violet-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              />
            </div>
          </motion.div>

          {/* Completed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-lg shadow-emerald-100/70"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-200/60 blur-2xl" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  Completed
                </p>

                <p className="mt-2 text-2xl font-black text-slate-900">
                  {completedCount}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Ritual Cues
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-200">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Live */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-5 shadow-lg shadow-cyan-100/70"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-200/60 blur-2xl" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-cyan-700">
                  Live Now
                </p>

                <p className="mt-2 text-2xl font-black text-slate-900">
                  {inProgressCount}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  In Progress
                </p>
              </div>

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-200">
                <Radio className="h-5 w-5 text-white" />

                <span className="absolute right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-white" />
              </div>
            </div>
          </motion.div>

          {/* Upcoming */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow-lg shadow-amber-100/70"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-200/60 blur-2xl" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                  Upcoming
                </p>

                <p className="mt-2 text-2xl font-black text-slate-900">
                  {upcomingCount}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Remaining Cues
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-200">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            LIVE STATUS BAR
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/50 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-50/60 via-transparent to-cyan-50/60" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                Ceremony Execution Progress
              </p>

              <p className="mt-1 text-lg font-black text-slate-900">
                {completedCount} of {cues.length} Ritual Cues Completed
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live Sync Active
              </span>

              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-bold text-cyan-700">
                {filteredCues.length} Visible
              </span>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            ROLE FILTER
        ====================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-200/50 backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md shadow-indigo-200">
                <Users className="h-4 w-4 text-white" />
              </div>

              <span className="text-xs font-bold text-slate-600">
                Role Filter
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                "All",
                "Vadhyar",
                "Music",
                "Family",
                "Catering",
                "Coordinator",
                "Photography",
              ].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    roleFilter === r
                      ? `bg-gradient-to-r ${filterStyles[r]} text-white shadow-lg`
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            TIMELINE
        ====================================================== */}

        <div className="relative">
          {/* Main timeline gradient line */}
          <div className="absolute bottom-0 left-[20px] top-0 w-[2px] bg-gradient-to-b from-violet-400 via-fuchsia-400 via-cyan-400 to-amber-400 sm:left-[28px]" />

          <div className="space-y-5">
            <AnimatePresence mode="popLayout">
              {filteredCues.map((cue, index) => {
                const Icon = roleIcons[cue.role] || Users;

                const roleStyle =
                  roleStyles[cue.role] || roleStyles.Coordinator;

                const isCompleted = cue.status === "Completed";
                const isInProgress = cue.status === "In Progress";

                return (
                  <motion.div
                    key={cue.id}
                    layout
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25, scale: 0.97 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.05, 0.3),
                    }}
                    className="relative pl-10 sm:pl-14"
                  >
                    {/* Timeline Node */}
                    <motion.div
                      animate={
                        isInProgress
                          ? {
                              scale: [1, 1.15, 1],
                              boxShadow: [
                                "0 0 0 rgba(6,182,212,0)",
                                "0 0 25px rgba(6,182,212,0.35)",
                                "0 0 0 rgba(6,182,212,0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className={`absolute left-[11px] top-7 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white shadow-md sm:left-[19px] ${
                        isCompleted
                          ? "bg-gradient-to-br from-emerald-400 to-teal-500"
                          : isInProgress
                          ? "bg-gradient-to-br from-cyan-400 to-blue-500"
                          : "bg-gradient-to-br from-slate-400 to-slate-500"
                      }`}
                    >
                      {isInProgress && (
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                      )}
                    </motion.div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`group relative overflow-hidden rounded-[1.5rem] border ${
                        isInProgress
                          ? "border-cyan-300 shadow-lg shadow-cyan-100"
                          : "border-slate-200"
                      } bg-white/95 shadow-lg shadow-slate-200/60 backdrop-blur-xl transition-all hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50`}
                    >
                      {/* Card glow */}
                      <div
                        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full ${roleStyle.glow} opacity-40 blur-3xl transition-transform duration-500 group-hover:scale-150`}
                      />

                      <div className="relative p-5 sm:p-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            {/* Top metadata */}
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 font-mono text-xs font-black text-cyan-700">
                                <Clock className="h-3.5 w-3.5" />
                                {cue.time}
                              </div>

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${roleStyle.badge}`}
                              >
                                <Icon className="h-3 w-3" />
                                {cue.role}
                              </span>

                              {isInProgress && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-cyan-700">
                                  <Play className="h-3 w-3 fill-current" />
                                  Live
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="mt-4 text-base font-black leading-snug text-slate-900 sm:text-lg">
                              {cue.title}
                            </h3>

                            {/* Note */}
                            {cue.note && (
                              <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-500">
                                {cue.note}
                              </p>
                            )}

                            {/* Bottom information */}
                            <div className="mt-5 flex flex-wrap items-center gap-2">
                              {isCompleted && (
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Successfully Completed
                                </span>
                              )}

                              {isInProgress && (
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-[10px] font-bold text-cyan-700">
                                  <Radio className="h-3.5 w-3.5" />
                                  Currently Executing
                                </span>
                              )}

                              {cue.status === "Upcoming" && (
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-bold text-amber-700">
                                  <AlertCircle className="h-3.5 w-3.5" />
                                  Awaiting Execution
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex shrink-0 items-center gap-2 lg:flex-col lg:items-end">
                            <button
                              onClick={() => toggleCueStatus(cue.id)}
                              className={`rounded-full border px-4 py-2 text-[10px] font-black transition-all ${
                                isCompleted
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  : isInProgress
                                  ? "border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
                                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                              }`}
                            >
                              {cue.status}
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteCue(cue.id)
                              }
                              className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-400 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                              title="Delete Cue"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Progress strip */}
                        <div className="mt-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                            Ceremony Cue #{index + 1}
                          </span>

                          <ChevronRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-violet-500" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty filtered state */}
          {filteredCues.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-10 rounded-2xl border border-slate-200 bg-white/90 p-12 text-center shadow-lg shadow-slate-200/50 backdrop-blur-xl sm:ml-14"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-200">
                <Users className="h-6 w-6 text-white" />
              </div>

              <h3 className="mt-4 text-lg font-black text-slate-900">
                No Cues for This Role
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another role filter to view ceremony activities.
              </p>
            </motion.div>
          )}
        </div>

        {/* =====================================================
            FOOTER INFORMATION
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-r from-indigo-50 via-violet-50 to-fuchsia-50 p-5 shadow-lg shadow-violet-100/60"
        >
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-200/50 blur-3xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md shadow-cyan-200">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-xs font-black text-slate-900">
                  Eventara Ceremony Control
                </p>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  Keep every ritual, team, and celebration moment synchronized.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Local schedule sync enabled
            </div>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          ADD CUE MODAL
      ====================================================== */}

      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-md"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
            >
              {/* Modal glows */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-fuchsia-200/60 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-200/50 blur-3xl" />

              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-slate-200 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md shadow-violet-200">
                    <Plus className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-violet-600">
                      New Timeline Entry
                    </p>

                    <h3 className="mt-0.5 text-lg font-black text-slate-900">
                      Add Ceremony Cue
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleAddCue}
                className="relative mt-6 space-y-5 text-xs"
              >
                {/* Time + Role */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-600">
                      Ceremony Time
                    </label>

                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />

                      <input
                        type="text"
                        required
                        value={newTime}
                        onChange={(e) =>
                          setNewTime(e.target.value)
                        }
                        placeholder="08:45 AM"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 font-mono text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-600">
                      Lead Role
                    </label>

                    <select
                      value={newRole}
                      onChange={(e) =>
                        setNewRole(e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-900 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                    >
                      <option value="Vadhyar">
                        Vadhyar
                      </option>
                      <option value="Music">
                        Music
                      </option>
                      <option value="Family">
                        Family
                      </option>
                      <option value="Catering">
                        Catering
                      </option>
                      <option value="Coordinator">
                        Coordinator
                      </option>
                      <option value="Photography">
                        Photography
                      </option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-600">
                    Cue / Ritual Title
                  </label>

                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) =>
                      setNewTitle(e.target.value)
                    }
                    placeholder="E.g. Oonjal Swing Ceremony & Songs"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-fuchsia-400 focus:bg-white focus:ring-2 focus:ring-fuchsia-500/10"
                  />
                </div>

                {/* Note */}
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-600">
                    Operational Note
                  </label>

                  <textarea
                    rows={4}
                    value={newNote}
                    onChange={(e) =>
                      setNewNote(e.target.value)
                    }
                    placeholder="E.g. Keep rosewater and milk bowls ready on stage..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                  />
                </div>

                {/* Preview */}
                <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-cyan-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                      <Calendar className="h-4 w-4 text-violet-600" />
                    </div>

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">
                        New Cue Preview
                      </p>

                      <p className="mt-1 text-xs font-black text-slate-800">
                        {newTime || "Ceremony Time"} •{" "}
                        {newRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-5 py-3 text-xs font-black text-white shadow-lg shadow-fuchsia-200 transition-all hover:scale-[1.02] hover:shadow-fuchsia-300"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Save Ceremony Cue
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;

