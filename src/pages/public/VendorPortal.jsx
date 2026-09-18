import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Store,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Star,
  Users,
  MessageSquare,
  Plus,
  ArrowRight,
  TrendingUp,
  X,
  Sparkles,
  MapPin,
  Wallet,
  Zap,
} from "lucide-react";

const initialGigs = [
  {
    id: 1,
    client: "Arun & Priya",
    event: "Grand Chettinad Muhurtham",
    date: "2026-10-18",
    package: "Royal 4K Muhurtham & Cinema",
    status: "Confirmed",
    paid: 85000,
  },
  {
    id: 2,
    client: "Karthik R (Zoho Tech)",
    event: "Chennai OMR Tech Leadership Conclave",
    date: "2026-11-14",
    package: "Keynote Production & Live Stream",
    status: "Deposit Paid",
    paid: 140000,
  },
  {
    id: 3,
    client: "Vignesh & Divya",
    event: "Traditional Betrothal & Sangeet",
    date: "2026-12-05",
    package: "Candid Stills & Drone Cinematics",
    status: "Confirmed",
    paid: 65000,
  },
];

const initialInquiries = [
  {
    id: 101,
    client: "Sundaram Chettiar",
    event: "Traditional Brahmin Muhurtham (500 guests)",
    date: "2026-11-28",
    guests: 500,
    budget: 150000,
    message:
      "Looking for complete temple mandapam coverage with drone footage at Mayor Ramanathan Chettiar Hall.",
    status: "Pending Response",
  },
  {
    id: 102,
    client: "Dr. Meenakshi Sundaram",
    event: "Madurai Heritage Palace Wedding",
    date: "2026-12-19",
    guests: 750,
    budget: 220000,
    message:
      "Need multi-camera setup with traditional Nadaswaram synchronization and same-day teaser film.",
    status: "Pending Response",
  },
];

const VendorPortal = () => {
  const [gigs, setGigs] = useState(() => {
    const saved = localStorage.getItem("eventara_vendor_gigs_tn");
    return saved ? JSON.parse(saved) : initialGigs;
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem(
      "eventara_vendor_portal_inquiries_tn"
    );
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  const [blockedDates, setBlockedDates] = useState([
    "2026-10-18",
    "2026-11-14",
    "2026-12-05",
  ]);

  const [newBlockedDate, setNewBlockedDate] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "eventara_vendor_gigs_tn",
      JSON.stringify(gigs)
    );

    localStorage.setItem(
      "eventara_vendor_portal_inquiries_tn",
      JSON.stringify(inquiries)
    );
  }, [gigs, inquiries]);

  const acceptInquiry = (inq) => {
    const newGig = {
      id: Date.now(),
      client: inq.client,
      event: inq.event,
      date: inq.date,
      package: "Custom Package",
      status: "Confirmed",
      paid: inq.budget,
    };

    setGigs([newGig, ...gigs]);
    setInquiries(inquiries.filter((i) => i.id !== inq.id));

    if (!blockedDates.includes(inq.date)) {
      setBlockedDates([...blockedDates, inq.date]);
    }
  };

  const declineInquiry = (inqId) => {
    setInquiries(inquiries.filter((i) => i.id !== inqId));
  };

  const addBlockedDate = (e) => {
    e.preventDefault();

    if (
      newBlockedDate &&
      !blockedDates.includes(newBlockedDate)
    ) {
      setBlockedDates([...blockedDates, newBlockedDate]);
      setNewBlockedDate("");
    }
  };

  const removeBlockedDate = (dateStr) => {
    setBlockedDates(
      blockedDates.filter((d) => d !== dateStr)
    );
  };

  const totalEarnings = gigs.reduce(
    (acc, curr) => acc + curr.paid,
    0
  );

  const statCards = [
    {
      title: "Total Contract Volume",
      value: `₹${totalEarnings.toLocaleString("en-IN")}`,
      subtitle: `From ${gigs.length} confirmed bookings`,
      icon: Wallet,
      gradient: "from-violet-600 via-fuchsia-600 to-pink-500",
      soft: "from-violet-500/10 via-fuchsia-500/10 to-pink-500/10",
      iconBg: "bg-violet-500/15",
      iconColor: "text-violet-300",
    },
    {
      title: "Pending Inquiries",
      value: `${inquiries.length} Inquiries`,
      subtitle: "Response SLA: Under 4 hours",
      icon: MessageSquare,
      gradient: "from-amber-500 via-orange-500 to-rose-500",
      soft: "from-amber-500/10 via-orange-500/10 to-rose-500/10",
      iconBg: "bg-amber-500/15",
      iconColor: "text-amber-300",
    },
    {
      title: "Calendar Dates Locked",
      value: `${blockedDates.length} Dates`,
      subtitle: "Blocked on public profile",
      icon: Calendar,
      gradient: "from-cyan-500 via-blue-600 to-indigo-600",
      soft: "from-cyan-500/10 via-blue-500/10 to-indigo-500/10",
      iconBg: "bg-cyan-500/15",
      iconColor: "text-cyan-300",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 font-sans">

      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 70, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 50, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-120px] top-40 h-[430px] w-[430px] rounded-full bg-cyan-500/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, -60, 0],
            y: [0, -40, 60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-180px] left-1/3 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_38%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-xl p-6 sm:p-8"
        >
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-500/15 via-fuchsia-500/15 to-cyan-500/15 border border-violet-400/20 text-violet-200 text-xs font-bold uppercase tracking-wider mb-4"
              >
                <Store className="w-3.5 h-3.5 text-fuchsia-300" />
                Vendor Operations Portal
                <Sparkles className="w-3 h-3 text-cyan-300" />
              </motion.div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
                Artisan{" "}
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
                Manage client inquiries, calendar date holds, and booked
                ceremony contracts across Tamil Nadu.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 self-start md:self-center px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-400/25 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-500/5"
            >
              <ShieldCheck className="w-4 h-4" />
              Verified Partner Tier
              <CheckCircle2 className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </motion.div>

        {/* =====================================================
            KPI CARDS
        ====================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {statCards.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${stat.soft} backdrop-blur-xl p-5`}
              >
                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {stat.title}
                    </span>

                    <div
                      className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                  </div>

                  <div
                    className={`mt-4 text-2xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {stat.subtitle}
                  </div>

                  <div
                    className={`mt-4 h-1 w-full rounded-full bg-gradient-to-r ${stat.gradient} opacity-70`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =====================================================
            MAIN TWO COLUMN AREA
        ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* =====================================================
              INQUIRIES
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-6 relative overflow-hidden rounded-3xl border border-violet-400/15 bg-white/[0.045] backdrop-blur-xl p-5 sm:p-6"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative flex items-center justify-between gap-3 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    New Client Inquiries
                  </h3>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {inquiries.length} requests waiting for your response
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-[11px] font-bold">
                {inquiries.length} Pending
              </span>
            </div>

            <div className="relative space-y-3">
              <AnimatePresence mode="popLayout">
                {inquiries.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center rounded-2xl border border-dashed border-white/10 bg-white/[0.025]"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />

                    <p className="text-sm text-slate-400">
                      No pending inquiries at this moment.
                    </p>
                  </motion.div>
                ) : (
                  inquiries.map((inq, index) => (
                    <motion.div
                      key={inq.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.06 }}
                      whileHover={{ y: -3 }}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500 opacity-70" />

                      <div className="pl-2 space-y-3">

                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white">
                              {inq.client}
                            </h4>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <Calendar className="w-3 h-3 text-violet-400" />
                              <span>{inq.event}</span>
                            </div>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock className="w-3 h-3 text-cyan-400" />
                              <span>{inq.date}</span>

                              <span className="mx-1 text-slate-700">
                                •
                              </span>

                              <Users className="w-3 h-3 text-fuchsia-400" />
                              <span>{inq.guests} guests</span>
                            </div>
                          </div>

                          <span className="shrink-0 text-sm font-extrabold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent font-mono">
                            ₹{Number(inq.budget).toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="rounded-xl border border-white/5 bg-white/[0.035] p-3">
                          <div className="flex gap-2">
                            <MessageSquare className="w-3.5 h-3.5 mt-0.5 text-fuchsia-400 shrink-0" />

                            <p className="text-xs text-slate-400 leading-relaxed">
                              "{inq.message}"
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-2 pt-1">
                          <button
                            onClick={() => declineInquiry(inq.id)}
                            className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.035] text-slate-400 text-xs font-semibold hover:bg-rose-500/10 hover:border-rose-400/20 hover:text-rose-300 transition-all flex items-center justify-center gap-1.5"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Decline
                          </button>

                          <button
                            onClick={() => acceptInquiry(inq)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500 text-white text-xs font-bold transition-all shadow-lg shadow-fuchsia-500/15 flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Accept & Lock Date
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* =====================================================
              CONFIRMED CONTRACTS
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-6 relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-white/[0.045] backdrop-blur-xl p-5 sm:p-6"
          >
            <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex items-center justify-between gap-3 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    Confirmed Celebrations
                  </h3>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Your active contracts and upcoming events
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-[11px] font-bold">
                {gigs.length} Active
              </span>
            </div>

            <div className="relative space-y-3">
              {gigs.map((gig, index) => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  whileHover={{ y: -3 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <div
                    className={`absolute inset-y-0 left-0 w-1 ${
                      index % 3 === 0
                        ? "bg-gradient-to-b from-cyan-400 to-blue-600"
                        : index % 3 === 1
                        ? "bg-gradient-to-b from-violet-400 to-fuchsia-600"
                        : "bg-gradient-to-b from-amber-400 to-orange-500"
                    }`}
                  />

                  <div className="pl-2">

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white">
                          {gig.client}
                        </h4>

                        <div className="mt-1 text-xs text-slate-500">
                          {gig.event}
                        </div>

                        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                          <Briefcase className="w-3 h-3 text-cyan-400" />
                          {gig.package}
                        </div>
                      </div>

                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          gig.status === "Confirmed"
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20"
                            : "bg-amber-500/10 text-amber-300 border border-amber-400/20"
                        }`}
                      >
                        {gig.status}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-violet-400" />
                        {gig.date}
                      </span>

                      <span className="font-bold text-cyan-300 font-mono">
                        ₹{Number(gig.paid).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            DATE BLOCKING
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-amber-400/15 bg-white/[0.045] backdrop-blur-xl p-5 sm:p-6"
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-32 w-32 rounded-full bg-rose-500/10 blur-3xl" />

          <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-5 border-b border-white/10 pb-5">

            <div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Calendar className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Blocked Dates & Auspicious Muhurtham Holds
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Dates listed here are disabled on your public booking
                    calendar.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={addBlockedDate}
              className="flex flex-col sm:flex-row gap-2 text-xs"
            >
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400 pointer-events-none" />

                <input
                  type="date"
                  required
                  value={newBlockedDate}
                  onChange={(e) =>
                    setNewBlockedDate(e.target.value)
                  }
                  className="h-10 w-full sm:w-auto rounded-xl border border-white/10 bg-slate-950/70 pl-9 pr-3 text-slate-200 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-500/10"
                />
              </div>

              <button
                type="submit"
                className="h-10 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-white font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/15 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Block Date</span>
              </button>
            </form>
          </div>

          {/* Dates */}
          <div className="relative pt-5">

            {blockedDates.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.025] py-8 text-center">
                <Calendar className="w-7 h-7 text-slate-600 mx-auto mb-2" />

                <p className="text-xs text-slate-500">
                  No dates are currently blocked.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                <AnimatePresence>
                  {blockedDates.map((dateStr, index) => (
                    <motion.div
                      key={dateStr}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      whileHover={{ y: -2 }}
                      className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono font-semibold ${
                        index % 4 === 0
                          ? "bg-violet-500/10 border-violet-400/20 text-violet-300"
                          : index % 4 === 1
                          ? "bg-cyan-500/10 border-cyan-400/20 text-cyan-300"
                          : index % 4 === 2
                          ? "bg-amber-500/10 border-amber-400/20 text-amber-300"
                          : "bg-rose-500/10 border-rose-400/20 text-rose-300"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />

                      <span>{dateStr}</span>

                      <button
                        onClick={() =>
                          removeBlockedDate(dateStr)
                        }
                        className="ml-1 opacity-50 hover:opacity-100 hover:text-white transition-all"
                        title="Remove blocked date"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* =====================================================
            BOTTOM INFO STRIP
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div className="rounded-2xl border border-violet-400/15 bg-violet-500/5 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-violet-300" />
            </div>

            <div>
              <p className="text-xs font-bold text-violet-200">
                Growing Portfolio
              </p>
              <p className="text-[11px] text-slate-500">
                Track every celebration contract
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/5 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyan-300" />
            </div>

            <div>
              <p className="text-xs font-bold text-cyan-200">
                Fast Response
              </p>
              <p className="text-[11px] text-slate-500">
                Keep your inquiry SLA under 4 hours
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-400/15 bg-amber-500/5 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
            </div>

            <div>
              <p className="text-xs font-bold text-amber-200">
                Trusted Partner
              </p>
              <p className="text-[11px] text-slate-500">
                Your verified Eventara vendor profile
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorPortal;