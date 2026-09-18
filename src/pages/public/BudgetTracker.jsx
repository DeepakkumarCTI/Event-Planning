
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  PieChart,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingDown,
  ShieldAlert,
  Filter,
  X,
  Wallet,
  Sparkles,
  IndianRupee,
  Receipt,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";

const initialExpenses = [
  {
    id: 1,
    name: "Mayor Ramanathan Chettiar Mandapam Advance",
    category: "Mandapam",
    amount: 350000,
    status: "Paid",
    due: "2026-08-15",
  },
  {
    id: 2,
    name: "Sri Meenakshi Grand Caterers (Banana Leaf Advance)",
    category: "Catering",
    amount: 250000,
    status: "Paid",
    due: "2026-08-20",
  },
  {
    id: 3,
    name: "Madras Lens Studios & Candid Cinema 4K Retainer",
    category: "Photography",
    amount: 45000,
    status: "Paid",
    due: "2026-09-01",
  },
  {
    id: 4,
    name: "Kavitha Tanjore Temple Mandapam & Brass Vilakku",
    category: "Decor",
    amount: 120000,
    status: "Pending",
    due: "2026-10-15",
  },
  {
    id: 5,
    name: "Thiruvarur Nadaswaram & Thavil Troupe",
    category: "Music",
    amount: 35000,
    status: "Pending",
    due: "2026-10-20",
  },
  {
    id: 6,
    name: "Kanchi Bridal Silk Sarees & Muhurtham Draping",
    category: "Styling",
    amount: 85000,
    status: "Paid",
    due: "2026-09-10",
  },
];

const categoryAllocations = [
  {
    name: "Mandapam",
    defaultPercent: 32,
    color: "bg-violet-600",
    light: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    barColor: "#7C3AED",
  },
  {
    name: "Catering",
    defaultPercent: 30,
    color: "bg-fuchsia-600",
    light: "bg-fuchsia-50",
    text: "text-fuchsia-700",
    border: "border-fuchsia-200",
    barColor: "#C026D3",
  },
  {
    name: "Photography",
    defaultPercent: 15,
    color: "bg-cyan-500",
    light: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    barColor: "#06B6D4",
  },
  {
    name: "Decor",
    defaultPercent: 13,
    color: "bg-amber-500",
    light: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    barColor: "#F59E0B",
  },
  {
    name: "Music",
    defaultPercent: 10,
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    barColor: "#10B981",
  },
];

const categoryStyles = {
  Mandapam: {
    icon: "bg-violet-100 text-violet-700",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  Catering: {
    icon: "bg-fuchsia-100 text-fuchsia-700",
    badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  },
  Photography: {
    icon: "bg-cyan-100 text-cyan-700",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  Decor: {
    icon: "bg-amber-100 text-amber-700",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  Music: {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  Styling: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

const formatCurrency = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const BudgetTracker = () => {
  const [totalBudget, setTotalBudget] = useState(() => {
    return Number(localStorage.getItem("eventara_total_budget_inr")) || 1800000;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("eventara_budget_expenses_inr");
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState("All");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Mandapam");
  const [newItemAmount, setNewItemAmount] = useState("");
  const [newItemStatus, setNewItemStatus] = useState("Pending");
  const [newItemDue, setNewItemDue] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "eventara_total_budget_inr",
      totalBudget.toString()
    );

    localStorage.setItem(
      "eventara_budget_expenses_inr",
      JSON.stringify(expenses)
    );
  }, [totalBudget, expenses]);

  const totalSpent = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0
  );

  const paidTotal = expenses
    .filter((e) => e.status === "Paid")
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const pendingTotal = expenses
    .filter((e) => e.status !== "Paid")
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const remainingBudget = totalBudget - totalSpent;

  const isOverBudget = remainingBudget < 0;

  const spentPercentage =
    totalBudget > 0
      ? Math.round((totalSpent / totalBudget) * 100)
      : 0;

  const paidPercentage =
    totalSpent > 0
      ? Math.round((paidTotal / totalSpent) * 100)
      : 0;

  const pendingPercentage =
    totalSpent > 0
      ? Math.round((pendingTotal / totalSpent) * 100)
      : 0;

  const filteredExpenses =
    selectedCategoryFilter === "All"
      ? expenses
      : expenses.filter(
          (e) => e.category === selectedCategoryFilter
        );

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!newItemName.trim() || !newItemAmount) return;

    const newExp = {
      id: Date.now(),
      name: newItemName.trim(),
      category: newItemCategory,
      amount: Number(newItemAmount),
      status: newItemStatus,
      due:
        newItemDue ||
        new Date().toISOString().split("T")[0],
    };

    setExpenses((prev) => [newExp, ...prev]);

    setNewItemName("");
    setNewItemAmount("");
    setNewItemDue("");
    setNewItemCategory("Mandapam");
    setNewItemStatus("Pending");
    setIsAddModalOpen(false);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleStatus = (id) => {
    setExpenses((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const nextStatus =
            e.status === "Paid"
              ? "Pending"
              : e.status === "Pending"
              ? "Overdue"
              : "Paid";

          return {
            ...e,
            status: nextStatus,
          };
        }

        return e;
      })
    );
  };

  const getCategoryStyle = (category) => {
    return (
      categoryStyles[category] || {
        icon: "bg-slate-100 text-slate-700",
        badge:
          "bg-slate-50 text-slate-700 border-slate-200",
      }
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-slate-50 to-violet-50/40 px-4 pb-20 pt-28 font-sans text-slate-900 sm:px-6 lg:px-8">
      {/* =========================
          Animated Light Background
      ========================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-300/25 blur-3xl"
          animate={{
            x: [0, 60, 20, 0],
            y: [0, 30, 70, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-fuchsia-300/20 blur-3xl"
          animate={{
            x: [0, -50, -20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.08, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-1/4 top-1/2 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl"
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 25, -25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.07),transparent_35%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">

        {/* =========================
            Page Header
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl sm:p-8"
        >
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-fuchsia-200/50 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-44 w-44 rounded-full bg-violet-200/50 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-gradient-to-r from-fuchsia-50 to-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-fuchsia-700"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Ceremonial Financial Governance
              </motion.div>

              <h1 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Smart Budget{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  Tracker
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Manage your event finances across mandapams, catering,
                photography, décor, music and styling with a clear real-time
                spending overview.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                  <Wallet className="h-3.5 w-3.5" />
                  Event Finance
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                  <IndianRupee className="h-3.5 w-3.5" />
                  INR Tracking
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  <Receipt className="h-3.5 w-3.5" />
                  {expenses.length} Expenses
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsAddModalOpen(true)}
              className="group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-300/50"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />

              <Plus className="relative h-4 w-4" />
              <span className="relative">
                Record New Expense
              </span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* =========================
            KPI Cards
        ========================== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Budget Cap",
              value: formatCurrency(totalBudget),
              description: "Configured event allocation",
              icon: Wallet,
              iconStyle: "bg-violet-100 text-violet-700",
              cardStyle:
                "from-violet-50 via-white to-white",
              borderStyle: "border-violet-200",
              valueStyle: "text-slate-900",
            },
            {
              title: "Committed / Spent",
              value: formatCurrency(totalSpent),
              description: `${spentPercentage}% of total cap committed`,
              icon: TrendingDown,
              iconStyle: "bg-fuchsia-100 text-fuchsia-700",
              cardStyle:
                "from-fuchsia-50 via-white to-white",
              borderStyle: "border-fuchsia-200",
              valueStyle: "text-fuchsia-700",
            },
            {
              title: "Paid Deposits",
              value: formatCurrency(paidTotal),
              description: `${formatCurrency(
                pendingTotal
              )} pending payments`,
              icon: CheckCircle2,
              iconStyle: "bg-emerald-100 text-emerald-700",
              cardStyle:
                "from-emerald-50 via-white to-white",
              borderStyle: "border-emerald-200",
              valueStyle: "text-emerald-700",
            },
            {
              title: "Remaining Buffer",
              value: formatCurrency(remainingBudget),
              description: isOverBudget
                ? "Exceeding budget limit"
                : "Available financial buffer",
              icon: isOverBudget
                ? ShieldAlert
                : CircleDollarSign,
              iconStyle: isOverBudget
                ? "bg-rose-100 text-rose-700"
                : "bg-amber-100 text-amber-700",
              cardStyle: isOverBudget
                ? "from-rose-50 via-white to-white"
                : "from-amber-50 via-white to-white",
              borderStyle: isOverBudget
                ? "border-rose-200"
                : "border-amber-200",
              valueStyle: isOverBudget
                ? "text-rose-700"
                : "text-amber-700",
            },
          ].map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.55,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                }}
                className={`relative overflow-hidden rounded-2xl border ${card.borderStyle} bg-gradient-to-br ${card.cardStyle} p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl`}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/80 blur-2xl" />

                <div className="relative flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {card.title}
                  </span>

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconStyle}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <motion.div
                  key={card.value}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className={`relative mt-5 text-2xl font-black tracking-tight ${card.valueStyle}`}
                >
                  {card.value}
                </motion.div>

                <p className="relative mt-1.5 text-xs text-slate-500">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* =========================
            Budget Progress Overview
        ========================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ delay: 0.35 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl sm:p-7"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-200">
                  <PieChart className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Financial Pulse
                  </h3>

                  <p className="text-xs text-slate-500">
                    Current event budget utilization
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                isOverBudget
                  ? "border-rose-200 bg-rose-50 text-rose-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {isOverBudget
                ? `${Math.abs(
                    spentPercentage - 100
                  )}% over cap`
                : `${Math.max(
                    0,
                    100 - spentPercentage
                  )}% buffer remaining`}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">
                Budget utilization
              </span>

              <span
                className={`font-black ${
                  isOverBudget
                    ? "text-rose-600"
                    : "text-violet-600"
                }`}
              >
                {spentPercentage}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    spentPercentage,
                    100
                  )}%`,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className={`h-full rounded-full ${
                  isOverBudget
                    ? "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500"
                    : "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500"
                }`}
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
              <span>
                Spent:{" "}
                <strong className="text-slate-900">
                  {formatCurrency(totalSpent)}
                </strong>
              </span>

              <span>
                Paid:{" "}
                <strong className="text-emerald-600">
                  {formatCurrency(paidTotal)}
                </strong>
              </span>

              <span>
                Pending:{" "}
                <strong className="text-amber-600">
                  {formatCurrency(pendingTotal)}
                </strong>
              </span>
            </div>
          </div>
        </motion.div>

        {/* =========================
            Budget Adjustment
        ========================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ delay: 0.42 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl sm:p-7"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl" />

          <div className="relative flex flex-col gap-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                  <Calculator className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Adjust Total Event Budget Cap
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Drag the slider to dynamically recalibrate
                    your financial thresholds.
                  </p>
                </div>
              </div>

              <motion.span
                key={totalBudget}
                initial={{
                  opacity: 0.5,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="font-mono text-lg font-black text-cyan-700"
              >
                {formatCurrency(totalBudget)}
              </motion.span>
            </div>

            <input
              type="range"
              min="500000"
              max="6000000"
              step="50000"
              value={totalBudget}
              onChange={(e) =>
                setTotalBudget(Number(e.target.value))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 accent-fuchsia-500"
            />

            <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              <span>₹5L</span>
              <span>₹20L</span>
              <span>₹40L</span>
              <span>₹60L</span>
            </div>
          </div>
        </motion.div>

        {/* =========================
            Category Allocation
        ========================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ delay: 0.48 }}
          className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl sm:p-7"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200">
              <PieChart className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recommended Allocation
              </h3>

              <p className="text-xs text-slate-500">
                Event planning budget distribution
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {categoryAllocations.map(
              (category, index) => (
                <motion.div
                  key={category.name}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.55 + index * 0.06,
                  }}
                >
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${category.color}`}
                      />

                      <span className="font-semibold text-slate-600">
                        {category.name}
                      </span>
                    </div>

                    <span className="font-bold text-slate-900">
                      {category.defaultPercent}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${category.defaultPercent}%`,
                      }}
                      transition={{
                        duration: 0.9,
                        delay:
                          0.6 + index * 0.08,
                      }}
                      className={`h-full rounded-full ${category.color}`}
                    />
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* =========================
            Expenses Table
        ========================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ delay: 0.55 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-xl shadow-slate-200/60 backdrop-blur-xl"
        >
          {/* Table Header */}
          <div className="border-b border-slate-200 p-6 sm:p-7">
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white shadow-lg shadow-rose-200">
                  <Receipt className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Itemized Ceremonial Expenses
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Click a status pill to cycle between Paid,
                    Pending and Overdue.
                  </p>
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <div className="mr-1 flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </div>

                {[
                  "All",
                  "Mandapam",
                  "Catering",
                  "Photography",
                  "Decor",
                  "Music",
                  "Styling",
                ].map((cat) => (
                  <motion.button
                    key={cat}
                    whileTap={{ scale: 0.94 }}
                    onClick={() =>
                      setSelectedCategoryFilter(cat)
                    }
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold transition-all ${
                      selectedCategoryFilter === cat
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] uppercase tracking-[0.14em] text-slate-500">
                  <th className="px-5 py-4 font-bold">
                    Expense Item
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Category
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Amount
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Status
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Due Date
                  </th>

                  <th className="px-5 py-4 text-right font-bold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredExpenses.map((item) => {
                    const categoryStyle =
                      getCategoryStyle(item.category);

                    return (
                      <motion.tr
                        key={item.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: 30,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="group border-b border-slate-100 transition-colors hover:bg-violet-50/40"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${categoryStyle.icon}`}
                            >
                              <Receipt className="h-4 w-4" />
                            </div>

                            <span className="max-w-xs font-bold leading-5 text-slate-800">
                              {item.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${categoryStyle.badge}`}
                          >
                            {item.category}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="font-mono font-black text-cyan-700">
                            {formatCurrency(item.amount)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={() =>
                              toggleStatus(item.id)
                            }
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all ${
                              item.status === "Paid"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : item.status === "Pending"
                                ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                            }`}
                          >
                            <span className="inline-flex items-center gap-1.5">
                              {item.status === "Paid" ? (
                                <CheckCircle2 className="h-3 w-3" />
                              ) : item.status === "Pending" ? (
                                <Clock className="h-3 w-3" />
                              ) : (
                                <AlertTriangle className="h-3 w-3" />
                              )}

                              {item.status}
                            </span>
                          </motion.button>
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 font-mono text-slate-500">
                            <CalendarDays className="h-3.5 w-3.5 text-violet-500" />
                            {item.due}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <motion.button
                            whileHover={{
                              scale: 1.08,
                            }}
                            whileTap={{
                              scale: 0.9,
                            }}
                            onClick={() =>
                              handleDeleteExpense(item.id)
                            }
                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                            title="Delete expense"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Expense Cards */}
          <div className="space-y-3 p-4 md:hidden">
            <AnimatePresence mode="popLayout">
              {filteredExpenses.map((item) => {
                const categoryStyle =
                  getCategoryStyle(item.category);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${categoryStyle.icon}`}
                        >
                          <Receipt className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-sm font-bold leading-5 text-slate-900">
                            {item.name}
                          </h4>

                          <span
                            className={`mt-2 inline-flex rounded-full border px-2 py-1 text-[10px] font-bold ${categoryStyle.badge}`}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleDeleteExpense(item.id)
                        }
                        className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Amount
                        </span>

                        <span className="mt-1 block font-mono text-sm font-black text-cyan-700">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Due Date
                        </span>

                        <span className="mt-1 block font-mono text-xs text-slate-600">
                          {item.due}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          toggleStatus(item.id)
                        }
                        className={`w-full rounded-xl border px-3 py-2 text-xs font-bold ${
                          item.status === "Paid"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : item.status === "Pending"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-rose-200 bg-rose-50 text-rose-700"
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          {item.status === "Paid" ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : item.status === "Pending" ? (
                            <Clock className="h-3.5 w-3.5" />
                          ) : (
                            <AlertTriangle className="h-3.5 w-3.5" />
                          )}

                          {item.status}
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredExpenses.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Receipt className="h-5 w-5" />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No expenses found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try another category filter.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* =========================
            Financial Summary
        ========================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ delay: 0.62 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Paid Share
                </p>

                <p className="text-xl font-black text-emerald-700">
                  {paidPercentage}%
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Clock className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Pending Share
                </p>

                <p className="text-xl font-black text-amber-700">
                  {pendingPercentage}%
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                <ArrowUpRight className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Expense Records
                </p>

                <p className="text-xl font-black text-cyan-700">
                  {expenses.length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================
          Add Expense Modal
      ========================== */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
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
              {/* Modal Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-fuchsia-200/50 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-violet-200/50 blur-3xl" />

              <div className="relative">
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200">
                      <Plus className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-black text-slate-900">
                        Record New Expense
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Add a new event financial commitment.
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setIsAddModalOpen(false)
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleAddExpense}
                  className="relative mt-6 space-y-4"
                >
                  {/* Expense Name */}
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Expense Title
                    </label>

                    <input
                      type="text"
                      required
                      value={newItemName}
                      onChange={(e) =>
                        setNewItemName(e.target.value)
                      }
                      placeholder="E.g. Banana Leaf Catering Second Deposit"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-all focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                    />
                  </div>

                  {/* Category + Amount */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-700">
                        Category
                      </label>

                      <select
                        value={newItemCategory}
                        onChange={(e) =>
                          setNewItemCategory(
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition-all focus:border-fuchsia-400 focus:bg-white focus:ring-2 focus:ring-fuchsia-500/10"
                      >
                        <option value="Mandapam">
                          Mandapam
                        </option>
                        <option value="Catering">
                          Catering
                        </option>
                        <option value="Photography">
                          Photography
                        </option>
                        <option value="Decor">
                          Decor
                        </option>
                        <option value="Music">
                          Music
                        </option>
                        <option value="Styling">
                          Styling
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-700">
                        Amount (₹)
                      </label>

                      <div className="relative">
                        <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />

                        <input
                          type="number"
                          required
                          min="1"
                          value={newItemAmount}
                          onChange={(e) =>
                            setNewItemAmount(
                              e.target.value
                            )
                          }
                          placeholder="50000"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3.5 font-mono text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-all focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status + Due */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-700">
                        Status
                      </label>

                      <select
                        value={newItemStatus}
                        onChange={(e) =>
                          setNewItemStatus(
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                      >
                        <option value="Pending">
                          Pending
                        </option>
                        <option value="Paid">
                          Paid
                        </option>
                        <option value="Overdue">
                          Overdue
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-700">
                        Due Date
                      </label>

                      <input
                        type="date"
                        value={newItemDue}
                        onChange={(e) =>
                          setNewItemDue(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition-all focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-500/10"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-cyan-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-amber-500" />

                        <span className="text-xs font-semibold text-slate-600">
                          Expense preview
                        </span>
                      </div>

                      <span className="font-mono text-sm font-black text-cyan-700">
                        {newItemAmount
                          ? formatCurrency(
                              newItemAmount
                            )
                          : "₹0"}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setIsAddModalOpen(false)
                      }
                      className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"
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
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-fuchsia-200"
                    >
                      <Plus className="h-4 w-4" />
                      Save Expense
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

export default BudgetTracker;

