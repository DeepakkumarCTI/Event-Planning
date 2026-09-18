
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid,
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  UserPlus,
  X,
  Sparkles,
  Armchair,
  Utensils,
  Crown,
  LayoutGrid,
  CircleAlert,
} from "lucide-react";

const initialTables = [
  {
    id: 1,
    name: "Table 1 — Sambandhi VIP / Front Row",
    capacity: 8,
    shape: "Mandapam Front Row",
    guests: [
      "Ramaswamy Iyer",
      "Kalyani Ammal",
      "Sundaram Chettiar",
      "Meenakshi Sundaram",
    ],
  },
  {
    id: 2,
    name: "Table 2 — Periyavargal (Elders & Uncles)",
    capacity: 8,
    shape: "VIP Round Table",
    guests: [
      "Natarajan Pillai",
      "Saraswathi Natarajan",
      "Venkatesh Rao",
    ],
  },
  {
    id: 3,
    name: "Table 3 — Groom & Bride Friends Circle",
    capacity: 8,
    shape: "Reception Seating",
    guests: [
      "Karthik Subramanian",
      "Anand Raj",
      "Deepa Krishnan",
    ],
  },
  {
    id: 4,
    name: "Table 4 — Chennai Tech Colleagues",
    capacity: 8,
    shape: "Reception Seating",
    guests: [
      "Arvind Swaminathan",
      "Pooja Hegde",
      "Siddharth Menon",
    ],
  },
  {
    id: 5,
    name: "Dining Hall Batch 1 — Priority Seating",
    capacity: 10,
    shape: "Banana Leaf Rows",
    guests: ["Dr. Balaji K", "Shanti Balaji"],
  },
];

const initialUnassigned = [
  {
    id: 101,
    name: "Murugan Selvam",
    dietary: "Traditional Pure Veg",
  },
  {
    id: 102,
    name: "Priya Chandran",
    dietary: "Jain Satvik",
  },
  {
    id: 103,
    name: "Ramesh Kannan",
    dietary: "Chettinad Non-Veg",
  },
  {
    id: 104,
    name: "Lakshmi Narayanan",
    dietary: "Diabetic Friendly",
  },
  {
    id: 105,
    name: "Suresh Babu",
    dietary: "Traditional Pure Veg",
  },
];

const dietaryStyles = {
  "Traditional Pure Veg": {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: "bg-emerald-100 text-emerald-600",
  },

  "Chettinad Non-Veg": {
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "bg-orange-100 text-orange-600",
  },

  "Jain Satvik": {
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    icon: "bg-violet-100 text-violet-600",
  },

  "Diabetic Friendly": {
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
    icon: "bg-cyan-100 text-cyan-600",
  },

  None: {
    badge: "bg-slate-50 text-slate-700 border-slate-200",
    icon: "bg-slate-100 text-slate-600",
  },
};

const tableGradients = [
  {
    card: "from-violet-50 via-fuchsia-50 to-white",
    border: "border-violet-200",
    accent: "text-violet-700",
    icon: "bg-violet-100 text-violet-700",
    progress: "from-violet-500 to-fuchsia-500",
    glow: "bg-violet-400/20",
  },

  {
    card: "from-cyan-50 via-sky-50 to-white",
    border: "border-cyan-200",
    accent: "text-cyan-700",
    icon: "bg-cyan-100 text-cyan-700",
    progress: "from-cyan-500 to-blue-500",
    glow: "bg-cyan-400/20",
  },

  {
    card: "from-pink-50 via-rose-50 to-white",
    border: "border-pink-200",
    accent: "text-pink-700",
    icon: "bg-pink-100 text-pink-700",
    progress: "from-pink-500 to-rose-500",
    glow: "bg-pink-400/20",
  },

  {
    card: "from-amber-50 via-orange-50 to-white",
    border: "border-amber-200",
    accent: "text-orange-700",
    icon: "bg-amber-100 text-orange-700",
    progress: "from-amber-500 to-orange-500",
    glow: "bg-amber-400/20",
  },

  {
    card: "from-emerald-50 via-lime-50 to-white",
    border: "border-emerald-200",
    accent: "text-emerald-700",
    icon: "bg-emerald-100 text-emerald-700",
    progress: "from-emerald-500 to-lime-500",
    glow: "bg-emerald-400/20",
  },

  {
    card: "from-blue-50 via-indigo-50 to-white",
    border: "border-blue-200",
    accent: "text-indigo-700",
    icon: "bg-indigo-100 text-indigo-700",
    progress: "from-blue-500 to-indigo-500",
    glow: "bg-blue-400/20",
  },
];

const SeatingChart = () => {
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem(
      "eventara_seating_tables_tn"
    );

    return saved ? JSON.parse(saved) : initialTables;
  });

  const [unassigned, setUnassigned] = useState(() => {
    const saved = localStorage.getItem(
      "eventara_seating_unassigned_tn"
    );

    return saved ? JSON.parse(saved) : initialUnassigned;
  });

  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestDietary, setNewGuestDietary] = useState(
    "Traditional Pure Veg"
  );

  const [newTableName, setNewTableName] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState(8);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "eventara_seating_tables_tn",
      JSON.stringify(tables)
    );

    localStorage.setItem(
      "eventara_seating_unassigned_tn",
      JSON.stringify(unassigned)
    );
  }, [tables, unassigned]);

  const handleAddGuest = (e) => {
    e.preventDefault();

    if (!newGuestName.trim()) return;

    const newGuest = {
      id: Date.now(),
      name: newGuestName.trim(),
      dietary: newGuestDietary,
    };

    setUnassigned([newGuest, ...unassigned]);
    setNewGuestName("");
  };

  const assignGuestToTable = (guest, targetTableId) => {
    const targetTable = tables.find(
      (table) => table.id === targetTableId
    );

    if (!targetTable) return;

    if (targetTable.guests.length >= targetTable.capacity) {
      alert(
        `Table is at maximum capacity (${targetTable.capacity} guests).`
      );
      return;
    }

    setTables(
      tables.map((table) => {
        if (table.id === targetTableId) {
          return {
            ...table,
            guests: [...table.guests, guest.name],
          };
        }

        return table;
      })
    );

    setUnassigned(
      unassigned.filter((item) => item.id !== guest.id)
    );
  };

  const removeGuestFromTable = (tableId, guestName) => {
    setTables(
      tables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            guests: table.guests.filter(
              (guest) => guest !== guestName
            ),
          };
        }

        return table;
      })
    );

    setUnassigned([
      ...unassigned,
      {
        id: Date.now(),
        name: guestName,
        dietary: "Traditional Pure Veg",
      },
    ]);
  };

  const handleAddTable = (e) => {
    e.preventDefault();

    if (!newTableName.trim()) return;

    const newTable = {
      id: Date.now(),
      name: newTableName.trim(),
      capacity: Number(newTableCapacity),
      shape: "Reception Seating",
      guests: [],
    };

    setTables([...tables, newTable]);
    setNewTableName("");
    setNewTableCapacity(8);
    setIsAddTableOpen(false);
  };

  const handleDeleteTable = (id) => {
    const tableToDelete = tables.find(
      (table) => table.id === id
    );

    if (!tableToDelete) return;

    const returnedGuests = tableToDelete.guests.map(
      (guest, index) => ({
        id: Date.now() + index,
        name: guest,
        dietary: "Traditional Pure Veg",
      })
    );

    setUnassigned([
      ...unassigned,
      ...returnedGuests,
    ]);

    setTables(
      tables.filter((table) => table.id !== id)
    );
  };

  const totalCapacity = tables.reduce(
    (acc, table) => acc + table.capacity,
    0
  );

  const totalAssigned = tables.reduce(
    (acc, table) => acc + table.guests.length,
    0
  );

  const occupancyPercentage = Math.round(
    (totalAssigned / (totalCapacity || 1)) * 100
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-violet-50/60 to-sky-50 px-4 pb-20 pt-28 font-sans text-slate-900 sm:px-6 lg:px-8">

      {/* Animated Background */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-0 top-80 h-96 w-96 rounded-full bg-cyan-300/25 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.18, 0.35, 0.18],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-300/25 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 30, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-1/4 top-10 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-violet-100/50 backdrop-blur-xl sm:p-8"
        >
          {/* Header Glow */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-pink-200/30 blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-gradient-to-r from-fuchsia-50 to-violet-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-fuchsia-700"
              >
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-500" />
                Kalyana Mandapam Layout
              </motion.div>

              <h1 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Interactive{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                  Seating Studio
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                Organize front-row Sambandhi seats, elder relatives,
                reception circles, and banana-leaf dining batches with
                an elegant visual seating planner.
              </p>
            </div>

            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow:
                  "0 0 35px rgba(217,70,239,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsAddTableOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-fuchsia-200 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Seating Row / Table
            </motion.button>
          </div>
        </motion.div>

        {/* CAPACITY SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {/* Capacity */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-5 shadow-lg shadow-violet-100/50"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-200/50 blur-2xl transition-all group-hover:bg-violet-300/60" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700">
                <LayoutGrid className="h-4 w-4" />
                Total Hall Capacity
              </div>

              <div className="text-3xl font-black text-slate-900">
                {totalCapacity}
                <span className="ml-1 text-sm font-semibold text-violet-600">
                  Seats
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Configured across {tables.length} tables / rows
              </p>
            </div>
          </motion.div>

          {/* Assigned */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5 shadow-lg shadow-cyan-100/50"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-200/50 blur-2xl transition-all group-hover:bg-cyan-300/60" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
                <Users className="h-4 w-4" />
                Assigned Guests
              </div>

              <div className="text-3xl font-black text-slate-900">
                {totalAssigned}
                <span className="ml-1 text-sm font-semibold text-cyan-600">
                  Guests
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {occupancyPercentage}% capacity allocated
              </p>
            </div>
          </motion.div>

          {/* Unassigned */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow-lg shadow-amber-100/50"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-200/50 blur-2xl transition-all group-hover:bg-amber-300/60" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                <UserPlus className="h-4 w-4" />
                Unassigned Queue
              </div>

              <div className="text-3xl font-black text-slate-900">
                {unassigned.length}
                <span className="ml-1 text-sm font-semibold text-amber-600">
                  Guests
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Awaiting row allocation
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* MAIN AREA */}
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12">

          {/* UNASSIGNED */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-sm lg:col-span-4"
          >
            <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="flex items-center gap-2 font-display text-sm font-black text-slate-900">
                  <span className="rounded-lg bg-violet-100 p-1.5 text-violet-600">
                    <UserPlus className="h-4 w-4" />
                  </span>
                  Unassigned Guests
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  Select a destination table to assign.
                </p>
              </div>

              <span className="rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 px-3 py-1 text-xs font-black text-violet-700">
                {unassigned.length}
              </span>
            </div>

            {/* ADD GUEST */}
            <form
              onSubmit={handleAddGuest}
              className="mb-5 rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-3"
            >
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-violet-800">
                <Plus className="h-3.5 w-3.5" />
                Quick Add Guest
              </div>

              <input
                type="text"
                value={newGuestName}
                onChange={(e) =>
                  setNewGuestName(e.target.value)
                }
                placeholder="Guest full name"
                className="mb-2 w-full rounded-lg border border-violet-200 bg-white px-3 py-2.5 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100"
              />

              <div className="flex gap-2">
                <select
                  value={newGuestDietary}
                  onChange={(e) =>
                    setNewGuestDietary(e.target.value)
                  }
                  className="min-w-0 flex-1 rounded-lg border border-violet-200 bg-white px-2 py-2 text-xs text-slate-700 outline-none focus:border-violet-500"
                >
                  <option value="Traditional Pure Veg">
                    Traditional Pure Veg
                  </option>
                  <option value="Chettinad Non-Veg">
                    Chettinad Non-Veg
                  </option>
                  <option value="Jain Satvik">
                    Jain Satvik
                  </option>
                  <option value="Diabetic Friendly">
                    Diabetic Friendly
                  </option>
                </select>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-violet-200"
                >
                  Add
                </motion.button>
              </div>
            </form>

            {/* GUEST LIST */}
            <div className="max-h-[470px] space-y-2.5 overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {unassigned.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50 px-4 py-8 text-center"
                  >
                    <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-500" />

                    <p className="text-xs font-bold text-emerald-700">
                      All guests are allocated!
                    </p>

                    <p className="mt-1 text-[11px] text-emerald-600">
                      Every guest has a seating destination.
                    </p>
                  </motion.div>
                ) : (
                  unassigned.map((guest) => {
                    const style =
                      dietaryStyles[guest.dietary] ||
                      dietaryStyles.None;

                    return (
                      <motion.div
                        key={guest.id}
                        layout
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: 20,
                        }}
                        whileHover={{
                          scale: 1.01,
                        }}
                        className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-3 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-black text-white shadow-md">
                            {guest.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-1">
                              <span className="truncate text-xs font-black text-slate-900">
                                {guest.name}
                              </span>

                              <span
                                className={`w-fit rounded-full border px-2 py-0.5 text-[10px] font-bold ${style.badge}`}
                              >
                                {guest.dietary}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                            Seat at
                          </span>

                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                assignGuestToTable(
                                  guest,
                                  Number(e.target.value)
                                );
                              }
                            }}
                            defaultValue=""
                            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-medium text-slate-700 outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                          >
                            <option value="" disabled>
                              Select Table / Row...
                            </option>

                            {tables.map((table) => (
                              <option
                                key={table.id}
                                value={table.id}
                                disabled={
                                  table.guests.length >=
                                  table.capacity
                                }
                              >
                                {table.name} (
                                {table.guests.length}/
                                {table.capacity})
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* TABLE GRID */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:col-span-8">
            <AnimatePresence>
              {tables.map((table, index) => {
                const isFull =
                  table.guests.length >= table.capacity;

                const percentage = Math.round(
                  (table.guests.length /
                    (table.capacity || 1)) *
                    100
                );

                const theme =
                  tableGradients[
                    index % tableGradients.length
                  ];

                return (
                  <motion.div
                    key={table.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{
                      delay: index * 0.07,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className={`group relative overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.card} p-5 shadow-lg transition-shadow hover:shadow-2xl`}
                  >
                    {/* Glow */}
                    <div
                      className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full ${theme.glow} blur-2xl transition-all group-hover:scale-150`}
                    />

                    <div className="relative">
                      {/* HEADER */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-200/70 pb-4">
                        <div className="flex min-w-0 gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
                          >
                            {index === 0 ? (
                              <Crown className="h-5 w-5" />
                            ) : index === 1 ? (
                              <Users className="h-5 w-5" />
                            ) : (
                              <Armchair className="h-5 w-5" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-sm font-black leading-snug text-slate-900">
                              {table.name}
                            </h4>

                            <span
                              className={`mt-1 block text-[11px] font-semibold ${theme.accent}`}
                            >
                              {table.shape}
                            </span>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${
                              isFull
                                ? "border-rose-200 bg-rose-100 text-rose-700"
                                : "border-emerald-200 bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {table.guests.length}/
                            {table.capacity}
                          </span>

                          <motion.button
                            whileHover={{
                              scale: 1.1,
                              rotate: 4,
                            }}
                            whileTap={{
                              scale: 0.9,
                            }}
                            onClick={() =>
                              handleDeleteTable(table.id)
                            }
                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-100 hover:text-rose-600"
                            title="Delete Table"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </motion.button>
                        </div>
                      </div>

                      {/* CAPACITY BAR */}
                      <div className="mt-4">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            <Grid className="h-3 w-3" />
                            Seating Capacity
                          </span>

                          <span className="text-[10px] font-black text-slate-600">
                            {percentage}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${percentage}%`,
                            }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.1,
                            }}
                            className={`h-full rounded-full bg-gradient-to-r ${theme.progress}`}
                          />
                        </div>
                      </div>

                      {/* GUESTS */}
                      <div className="mt-4 min-h-[115px] space-y-1.5">
                        {table.guests.length === 0 ? (
                          <div className="flex min-h-[105px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/70">
                            <Armchair className="mb-2 h-7 w-7 text-slate-300" />

                            <span className="text-[11px] font-semibold italic text-slate-400">
                              Table is currently empty
                            </span>
                          </div>
                        ) : (
                          <AnimatePresence>
                            {table.guests.map(
                              (guestName, guestIndex) => (
                                <motion.div
                                  key={guestName}
                                  initial={{
                                    opacity: 0,
                                    x: -10,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    x: 0,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    x: 10,
                                  }}
                                  transition={{
                                    delay:
                                      guestIndex * 0.03,
                                  }}
                                  className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-white/90 p-2 shadow-sm backdrop-blur-sm"
                                >
                                  <div className="flex min-w-0 items-center gap-2">
                                    <div
                                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${theme.icon} text-[9px] font-black`}
                                    >
                                      {guestName
                                        .charAt(0)
                                        .toUpperCase()}
                                    </div>

                                    <span className="truncate text-[11px] font-bold text-slate-700">
                                      {guestName}
                                    </span>
                                  </div>

                                  <motion.button
                                    whileHover={{
                                      scale: 1.15,
                                    }}
                                    whileTap={{
                                      scale: 0.9,
                                    }}
                                    onClick={() =>
                                      removeGuestFromTable(
                                        table.id,
                                        guestName
                                      )
                                    }
                                    className="shrink-0 rounded-md p-1 text-slate-300 transition-colors hover:bg-rose-100 hover:text-rose-600"
                                    title="Unseat Guest"
                                  >
                                    <X className="h-3 w-3" />
                                  </motion.button>
                                </motion.div>
                              )
                            )}
                          </AnimatePresence>
                        )}
                      </div>

                      {/* FOOTER */}
                      <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-3">
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                          <Utensils className="h-3 w-3" />

                          {table.capacity -
                            table.guests.length}{" "}
                          seats available
                        </span>

                        {isFull ? (
                          <span className="flex items-center gap-1 text-[10px] font-black text-rose-600">
                            <CircleAlert className="h-3 w-3" />
                            Capacity Full
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600">
                            <CheckCircle2 className="h-3 w-3" />
                            Available
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ADD TABLE MODAL */}
      <AnimatePresence>
        {isAddTableOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-md"
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
                scale: 0.92,
                y: 25,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            >
              {/* Modal Header Gradient */}
              <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-6 py-5 text-white">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-xl" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fuchsia-100">
                      <Sparkles className="h-3.5 w-3.5" />
                      Seating Studio
                    </div>

                    <h3 className="text-lg font-black">
                      Add Seating Row / Table
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      setIsAddTableOpen(false)
                    }
                    className="rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Modal Form */}
              <form
                onSubmit={handleAddTable}
                className="space-y-5 p-6"
              >
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Table / Row Label
                  </label>

                  <input
                    type="text"
                    required
                    value={newTableName}
                    onChange={(e) =>
                      setNewTableName(e.target.value)
                    }
                    placeholder="E.g. Table 6 — College Friends"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Seat Capacity
                  </label>

                  <input
                    type="number"
                    required
                    min="2"
                    max="30"
                    value={newTableCapacity}
                    onChange={(e) =>
                      setNewTableCapacity(
                        Number(e.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-mono text-xs text-slate-900 outline-none transition-all focus:border-fuchsia-500 focus:bg-white focus:ring-4 focus:ring-fuchsia-100"
                  />

                  <p className="mt-1.5 text-[10px] text-slate-400">
                    Choose between 2 and 30 seats.
                  </p>
                </div>

                {/* Preview */}
                <div className="rounded-xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-blue-50 to-violet-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                      <Armchair className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-black text-slate-800">
                        Seating Preview
                      </p>

                      <p className="text-[11px] text-slate-500">
                        {newTableCapacity} guest capacity
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setIsAddTableOpen(false)
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100"
                  >
                    Cancel
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-fuchsia-200"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Create Table
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeatingChart;

