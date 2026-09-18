
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
  UserPlus,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  CircleDot,
  Mail,
  UserRound,
  CalendarDays,
  ArrowUpRight,
  Activity,
} from "lucide-react";

const initialMembers = [
  {
    id: 1,
    name: "Arun & Priya",
    email: "arun.priya@eventara.in",
    role: "Primary Hosts",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sundaram Chettiar",
    email: "sundaram@family.in",
    role: "Mandapam & Ritual Lead",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 3,
    name: "Sri Meenakshi Catering",
    email: "orders@meenakshicaterers.in",
    role: "Banana Leaf Feast Lead",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "Sundaram Chettiar",
    text: "Vadhyar Narayana Sastrigal confirmed the auspicious Muhurtham lagna starts at 08:45 AM sharp.",
    time: "09:30 AM",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 2,
    sender: "Sri Meenakshi Catering",
    text: "Vanakkam! 24-Item banana leaf menu confirmed. Live Kumbakonam degree filter coffee stall will be active from 06:00 AM.",
    time: "10:15 AM",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    sender: "Arun & Priya",
    text: "Thank you! Kavitha Decorators will begin flower mandapam setup with Madurai jasmine and marigolds tomorrow evening.",
    time: "11:20 AM",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const initialTasks = [
  {
    id: 1,
    title: "Review Temple Mandapam 3D floral mockups",
    assignee: "Priya",
    status: "In Review",
    priority: "High",
  },
  {
    id: 2,
    title: "Confirm Nadaswaram troupe traditional raga sequence",
    assignee: "Sundaram",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Lock Mayor Ramanathan Chettiar hall stage clearance",
    assignee: "Arun",
    status: "Done",
    priority: "Urgent",
  },
  {
    id: 4,
    title: "Finalize dining hall banana leaf batch counts",
    assignee: "Meenakshi Catering",
    status: "In Review",
    priority: "High",
  },
];

const memberColors = [
  "from-violet-500 to-indigo-500",
  "from-fuchsia-500 to-rose-500",
  "from-cyan-400 to-blue-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
];

const priorityStyles = {
  Urgent:
    "border-rose-200 bg-rose-50 text-rose-700",
  High:
    "border-orange-200 bg-orange-50 text-orange-700",
  Medium:
    "border-amber-200 bg-amber-50 text-amber-700",
  Low:
    "border-cyan-200 bg-cyan-50 text-cyan-700",
};

const statusStyles = {
  Done: {
    wrapper:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  "In Review": {
    wrapper:
      "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock,
  },
  "To Do": {
    wrapper:
      "border-violet-200 bg-violet-50 text-violet-700",
    icon: CircleDot,
  },
};

const Collaborate = () => {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("eventara_collab_members_tn");
    return saved ? JSON.parse(saved) : initialMembers;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("eventara_collab_messages_tn");
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("eventara_collab_tasks_tn");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [newMessageText, setNewMessageText] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] =
    useState("Family Member");

  useEffect(() => {
    localStorage.setItem(
      "eventara_collab_members_tn",
      JSON.stringify(members)
    );

    localStorage.setItem(
      "eventara_collab_messages_tn",
      JSON.stringify(messages)
    );

    localStorage.setItem(
      "eventara_collab_tasks_tn",
      JSON.stringify(tasks)
    );
  }, [members, messages, tasks]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessageText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "Arun & Priya",
      text: newMessageText.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessageText("");
  };

  const handleInvite = (e) => {
    e.preventDefault();

    if (!inviteEmail.trim() || !inviteName.trim()) return;

    const newMem = {
      id: Date.now(),
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        inviteName
      )}&background=7c3aed&color=fff`,
    };

    setMembers((prev) => [...prev, newMem]);

    setInviteEmail("");
    setInviteName("");
    setInviteRole("Family Member");
    setIsInviteOpen(false);
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next =
            t.status === "To Do"
              ? "In Review"
              : t.status === "In Review"
              ? "Done"
              : "To Do";

          return {
            ...t,
            status: next,
          };
        }

        return t;
      })
    );
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const reviewTasks = tasks.filter(
    (task) => task.status === "In Review"
  ).length;

  const todoTasks = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  const completionPercentage =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-sky-50/70 to-violet-50/70 px-4 pb-20 pt-28 font-sans text-slate-900 sm:px-6 lg:px-8">

      {/* =====================================================
          ANIMATED LIGHT BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-sky-300/25 blur-3xl"
          animate={{
            x: [0, 70, 20, 0],
            y: [0, 40, 80, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-40 top-20 h-[32rem] w-[32rem] rounded-full bg-violet-300/25 blur-3xl"
          animate={{
            x: [0, -50, -10, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.9, 1.08, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl"
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -50, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_38%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-8"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-700"
              >
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-500" />
                Family & Vendor Collaboration
              </motion.div>

              <h1 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Ceremony{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
                  Coordination Hub
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Bring family members, ritual leads, caterers, photographers,
                decorators and vendors together in one beautifully organized
                collaboration space.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                  <Users className="h-3.5 w-3.5" />
                  {members.length} Members
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {messages.length} Updates
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {completedTasks}/{tasks.length} Completed
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.04,
                y: -3,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() => setIsInviteOpen(true)}
              className="group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-violet-200/70"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />

              <UserPlus className="relative h-4 w-4" />
              <span className="relative">
                Invite Co-Planner / Vendor
              </span>
              <ArrowUpRight className="relative h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* =====================================================
            COLLABORATION STATS
        ====================================================== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[
            {
              label: "Planning Committee",
              value: members.length,
              description: "Active collaborators",
              icon: Users,
              style:
                "from-violet-50 via-indigo-50 to-white border-violet-200",
              iconStyle:
                "bg-violet-100 text-violet-700",
            },
            {
              label: "Tasks Completed",
              value: completedTasks,
              description: `${completionPercentage}% completion`,
              icon: CheckCircle2,
              style:
                "from-emerald-50 via-teal-50 to-white border-emerald-200",
              iconStyle:
                "bg-emerald-100 text-emerald-700",
            },
            {
              label: "In Review",
              value: reviewTasks,
              description: "Awaiting decisions",
              icon: Clock,
              style:
                "from-amber-50 via-orange-50 to-white border-amber-200",
              iconStyle:
                "bg-amber-100 text-amber-700",
            },
            {
              label: "Messages",
              value: messages.length,
              description: "Coordination updates",
              icon: MessageSquare,
              style:
                "from-sky-50 via-cyan-50 to-white border-sky-200",
              iconStyle:
                "bg-sky-100 text-sky-700",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15 + index * 0.07,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -5,
                }}
                className={`rounded-2xl border bg-gradient-to-br ${stat.style} p-5 shadow-lg shadow-slate-200/50`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      {stat.label}
                    </p>

                    <motion.p
                      key={stat.value}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      className="mt-3 text-3xl font-black text-slate-900"
                    >
                      {stat.value}
                    </motion.p>

                    <p className="mt-1 text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconStyle}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =====================================================
            MAIN 3 COLUMN AREA
        ====================================================== */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

          {/* ===================================================
              TEAM / MEMBERS
          ==================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.6,
            }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-xl lg:col-span-3"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900">
                  Planning Committee
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  {members.length} people connected
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <Users className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    whileHover={{
                      x: 4,
                    }}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition-all hover:border-violet-200 hover:bg-violet-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-11 w-11 rounded-full border border-white object-cover shadow-sm"
                        />

                        <motion.span
                          animate={{
                            scale: [1, 1.15, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-bold text-slate-900">
                          {member.name}
                        </div>

                        <div className="mt-1 truncate text-[10px] font-medium text-violet-600">
                          {member.role}
                        </div>

                        <div className="mt-1 truncate text-[9px] text-slate-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => setIsInviteOpen(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-300 bg-violet-50 py-3 text-xs font-bold text-violet-700 transition-all hover:border-violet-400 hover:bg-violet-100"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Collaborator
            </motion.button>
          </motion.div>

          {/* ===================================================
              TASKS
          ==================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.42,
              duration: 0.6,
            }}
            className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-xl lg:col-span-4"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900">
                  Ceremony Action Items
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  Click status to move tasks forward
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Zap className="h-4 w-4" />
              </div>
            </div>

            {/* Progress */}
            <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Planning Progress
                </span>

                <span className="text-xs font-black text-emerald-600">
                  {completionPercentage}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${completionPercentage}%`,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-400"
                />
              </div>

              <div className="mt-3 flex justify-between text-[9px] font-semibold text-slate-500">
                <span>
                  {completedTasks} Done
                </span>
                <span>
                  {reviewTasks} Review
                </span>
                <span>
                  {todoTasks} To Do
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {tasks.map((task, index) => {
                  const currentStatus =
                    statusStyles[task.status] ||
                    statusStyles["To Do"];

                  const StatusIcon = currentStatus.icon;

                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-violet-200 hover:bg-violet-50/30 hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-xs font-bold leading-5 text-slate-800">
                          {task.title}
                        </h4>

                        <motion.button
                          whileTap={{
                            scale: 0.92,
                          }}
                          onClick={() =>
                            toggleTaskStatus(task.id)
                          }
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-bold ${currentStatus.wrapper}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {task.status}
                        </motion.button>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500">
                          <UserRound className="h-3 w-3 text-sky-500" />
                          {task.assignee}
                        </span>

                        <span
                          className={`rounded-full border px-2 py-1 text-[9px] font-bold ${
                            priorityStyles[task.priority] ||
                            priorityStyles.Medium
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ===================================================
              LIVE DISCUSSION
          ==================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.49,
              duration: 0.6,
            }}
            className="flex h-[620px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-xl lg:col-span-5"
          >
            {/* Discussion Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200">
                  <MessageSquare className="h-5 w-5" />

                  <motion.span
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.4, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-500"
                  />
                </div>

                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">
                    Ceremony Coordination Feed
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Live family & vendor updates
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
                <Activity className="h-3 w-3" />
                LIVE
              </div>
            </div>

            {/* Messages */}
            <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto py-5 pr-1">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{
                      opacity: 0,
                      y: 15,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="flex items-start gap-3"
                  >
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="h-9 w-9 shrink-0 rounded-full border border-slate-200 object-cover shadow-sm"
                    />

                    <div className="min-w-0 flex-1">
                      <div
                        className={`rounded-2xl rounded-tl-md border p-3 ${
                          index % 3 === 0
                            ? "border-violet-200 bg-violet-50"
                            : index % 3 === 1
                            ? "border-sky-200 bg-sky-50"
                            : "border-fuchsia-200 bg-fuchsia-50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="truncate text-[11px] font-bold text-slate-900">
                            {msg.sender}
                          </span>

                          <span className="shrink-0 text-[9px] text-slate-500">
                            {msg.time}
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-600">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-slate-200 pt-4"
            >
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 transition-all focus-within:border-sky-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-100">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessageText}
                    onChange={(e) =>
                      setNewMessageText(e.target.value)
                    }
                    placeholder="Type an update for family or vendors..."
                    className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-slate-800 outline-none placeholder:text-slate-400"
                  />

                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between px-1 text-[9px] text-slate-400">
                <span>
                  Updates are saved locally
                </span>

                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  Private Workspace
                </span>
              </div>
            </form>
          </motion.div>
        </div>

        {/* =====================================================
            BOTTOM COLLABORATION STRIP
        ====================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
          }}
          className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-sky-50 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl"
        >
          <motion.div
            className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-fuchsia-200/40 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />

          <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-200">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Keep everyone aligned before the big day
                </h3>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600">
                  Share decisions, assign responsibilities and keep every
                  family member and vendor informed as your celebration gets
                  closer.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => setIsInviteOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-xs font-bold text-violet-700 shadow-sm transition-all hover:border-violet-300 hover:bg-violet-50 hover:shadow-md"
            >
              <UserPlus className="h-4 w-4" />
              Invite Someone
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          INVITE MODAL
      ====================================================== */}
      <AnimatePresence>
        {isInviteOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-md"
            onClick={() => setIsInviteOpen(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/20 sm:p-7"
            >
              {/* Modal Glows */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-fuchsia-200/50 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-violet-200/50 blur-3xl" />

              <div className="relative">

                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200">
                      <UserPlus className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-black text-slate-900">
                        Invite Co-Planner
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Add a family member or trusted vendor.
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{
                      rotate: 90,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={() => setIsInviteOpen(false)}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleInvite}
                  className="relative mt-6 space-y-4"
                >

                  {/* Name */}
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <UserRound className="h-3.5 w-3.5 text-violet-500" />
                      Name
                    </label>

                    <input
                      type="text"
                      required
                      value={inviteName}
                      onChange={(e) =>
                        setInviteName(e.target.value)
                      }
                      placeholder="E.g. Sundaram Chettiar"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-all focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Mail className="h-3.5 w-3.5 text-sky-500" />
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      value={inviteEmail}
                      onChange={(e) =>
                        setInviteEmail(e.target.value)
                      }
                      placeholder="email@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-all focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      Role in Celebration
                    </label>

                    <select
                      value={inviteRole}
                      onChange={(e) =>
                        setInviteRole(e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition-all focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                    >
                      <option value="Family Member">
                        Family Member
                      </option>

                      <option value="Mandapam / Ritual Lead">
                        Mandapam / Ritual Lead
                      </option>

                      <option value="Catering Coordinator">
                        Catering Coordinator
                      </option>

                      <option value="Photography Lead">
                        Photography Lead
                      </option>

                      <option value="Music / Vadhyar Ensemble">
                        Music / Vadhyar Ensemble
                      </option>
                    </select>
                  </div>

                  {/* Preview */}
                  <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-sky-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
                        {inviteName ? (
                          inviteName
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()
                        ) : (
                          <UserRound className="h-4 w-4" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900">
                          {inviteName || "New Collaborator"}
                        </p>

                        <p className="mt-0.5 text-[10px] text-violet-600">
                          {inviteRole}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setIsInviteOpen(false)
                      }
                      className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      Cancel
                    </button>

                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-200"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Send Invitation
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

export default Collaborate;

