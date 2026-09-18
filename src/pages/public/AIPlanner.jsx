
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Zap,
  Calendar,
  Users,
  MapPin,
  Palette,
  Clock,
  CheckCircle2,
  ArrowRight,
  Bookmark,
  Share2,
  Store,
  ShieldCheck,
  Heart,
  Gem,
  Baby,
  Home as HomeIcon,
  Award,
  Building2,
  Check,
  Plus,
  Music,
  Layers,
  Sparkles,
  WandSparkles,
  PartyPopper,
  Star,
  IndianRupee,
  CircleDot,
  ChevronRight,
} from "lucide-react";

import Loader from "../../components/common/Loader";
import { vendors } from "../../data/vendors";

const eventTypes = [
  {
    id: "muhurtham",
    label: "Tamil Muhurtham",
    icon: Heart,
    desc: "Auspicious lagna, thali kattu & feast",
    gradient: "from-violet-500 to-fuchsia-500",
    bg: "bg-violet-50",
    border: "border-violet-300",
    text: "text-violet-700",
  },
  {
    id: "nichayathartham",
    label: "Betrothal / Engagement",
    icon: Gem,
    desc: "Ring exchange & family blessings",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    border: "border-pink-300",
    text: "text-pink-700",
  },
  {
    id: "reception",
    label: "Grand Evening Reception",
    icon: Music,
    desc: "Floral stage, orchestra & banquet",
    gradient: "from-orange-400 to-red-500",
    bg: "bg-orange-50",
    border: "border-orange-300",
    text: "text-orange-700",
  },
  {
    id: "seemantham",
    label: "Seemantham & Valaikaappu",
    icon: Baby,
    desc: "Traditional baby shower rituals",
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    text: "text-emerald-700",
  },
  {
    id: "grahapravesam",
    label: "Grahapravesam",
    icon: HomeIcon,
    desc: "Housewarming puja & feasts",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-700",
  },
  {
    id: "corporate",
    label: "Enterprise Tech Conclave",
    icon: Building2,
    desc: "Chennai / Coimbatore keynotes",
    gradient: "from-cyan-400 to-indigo-500",
    bg: "bg-cyan-50",
    border: "border-cyan-300",
    text: "text-cyan-700",
  },
];

const themes = [
  {
    id: "royal-tanjore",
    label: "Royal Tanjore Temple Gold",
    colors: ["#800020", "#D4AF37", "#FFB300", "#0F766E"],
    gradient: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: "kanjeevaram-crimson",
    label: "Kanjeevaram Crimson & Zari",
    colors: ["#990000", "#D4AF37", "#047857", "#FFFFFF"],
    gradient: "from-rose-500 via-red-500 to-amber-400",
  },
  {
    id: "chettinad-heritage",
    label: "Chettinad Heritage Teak",
    colors: ["#8B4513", "#E07A5F", "#F4F1DE", "#264653"],
    gradient: "from-orange-500 via-amber-500 to-emerald-500",
  },
  {
    id: "coastal-ecr",
    label: "ECR Coastal Ivory & Sage",
    colors: ["#F8F9FA", "#0F766E", "#E2E8F0", "#334155"],
    gradient: "from-cyan-400 via-teal-500 to-slate-600",
  },
];

const priorityOptions = [
  "24-Item Royal Chettinad Banana Leaf Feast",
  "Thiruvarur Style Nadaswaram & Thavil Vidwans",
  "Temple Mandapam Floral Architecture with Brass Vilakku",
  "Kanjeevaram Saree Draping & Bridal Makeup",
  "4K Muhurtham & Candid Drone Cinematography",
  "Filter Coffee Live Brass Counter & Evening Snacks",
  "Auspicious Vadhyar & Vedic Purohit Ensemble",
];

const floatingDecorations = [
  {
    icon: Sparkles,
    position: "top-[10%] left-[3%]",
    color: "text-fuchsia-400",
    delay: 0,
  },
  {
    icon: Star,
    position: "top-[18%] right-[4%]",
    color: "text-amber-400",
    delay: 0.8,
  },
  {
    icon: PartyPopper,
    position: "bottom-[15%] left-[4%]",
    color: "text-violet-400",
    delay: 1.5,
  },
  {
    icon: Sparkles,
    position: "bottom-[8%] right-[5%]",
    color: "text-cyan-400",
    delay: 2.2,
  },
];

const AIPlanner = () => {
  const [searchParams] = useSearchParams();

  const initialPrompt = searchParams.get("prompt") || "";

  const [prompt, setPrompt] = useState(initialPrompt);
  const [eventType, setEventType] = useState("muhurtham");
  const [guestCount, setGuestCount] = useState(500);
  const [budget, setBudget] = useState(1500000);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [location, setLocation] = useState("Chennai, Tamil Nadu");

  const [priorities, setPriorities] = useState([
    "24-Item Royal Chettinad Banana Leaf Feast",
    "Temple Mandapam Floral Architecture with Brass Vilakku",
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [planResult, setPlanResult] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [checklist, setChecklist] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const togglePriority = (priority) => {
    setPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((item) => item !== priority)
        : [...prev, priority]
    );
  };

  const generatePlan = () => {
    setIsGenerating(true);
    setGenerationStep(0);

    const steps = [
      "Calibrating auspicious Muhurtham lagna and Vedic ceremony cues...",
      "Allocating Kalyana Mandapam, catering per leaf & decor budgets in INR...",
      "Matching verified Tamil Nadu artisans across Chennai, CBE & Madurai...",
      "Constructing minute-by-minute ceremonial run-of-show...",
      "Finalizing feasibility score and buffer allocations...",
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      if (currentStep < steps.length) {
        setGenerationStep(currentStep);
      } else {
        clearInterval(interval);
        setIsGenerating(false);

        const venueBudget = Math.round(budget * 0.32);
        const cateringBudget = Math.round(budget * 0.30);
        const photoBudget = Math.round(budget * 0.15);
        const decorBudget = Math.round(budget * 0.13);
        const musicVadhyarBudget = Math.round(budget * 0.10);

        const newPlan = {
          id: `plan_${Date.now()}`,

          title: prompt
            ? prompt.slice(0, 50) + (prompt.length > 50 ? "..." : "")
            : `${eventType.toUpperCase()} Celebration Blueprint`,

          eventType,
          guestCount,
          budget,
          location,
          theme: selectedTheme,
          feasibilityScore: 99,
          createdAt: new Date().toLocaleDateString(),

          budgetBreakdown: [
            {
              category: "Kalyana Mandapam & Hall Advance",
              amount: venueBudget,
              percent: 32,
              color: "bg-violet-600",
            },
            {
              category: "Chettinad Banana Leaf Catering",
              amount: cateringBudget,
              percent: 30,
              color: "bg-orange-500",
            },
            {
              category: "Candid Cinema & Drone Stills",
              amount: photoBudget,
              percent: 15,
              color: "bg-cyan-500",
            },
            {
              category: "Temple Mandapam Floral Architecture",
              amount: decorBudget,
              percent: 13,
              color: "bg-fuchsia-500",
            },
            {
              category: "Nadaswaram, Thavil & Vedic Purohits",
              amount: musicVadhyarBudget,
              percent: 10,
              color: "bg-emerald-500",
            },
          ],

          matchedVendors: vendors.slice(0, 3),

          timeline: [
            {
              time: "05:00 AM",
              cue: "Ganapathi Homam & Navagraha Puja (Vadhyar priests)",
              role: "Purohits / Family",
            },
            {
              time: "06:15 AM",
              cue: "Mangala Vadhyam Recital (Thiruvarur Nadaswaram & Thavil)",
              role: "Music Ensemble",
            },
            {
              time: "07:15 AM",
              cue: "Kasi Yatra, Oonjal & Malai Matral (Garland exchange)",
              role: "Family / Photo",
            },
            {
              time: "08:30 AM",
              cue: "Auspicious Muhurtham Lagna & Thali Kattu (Mangalya Dharanam)",
              role: "Bride & Groom / Vadhyar",
            },
            {
              time: "10:15 AM",
              cue: "Sapthapadi, Ashirvatham & Elders Blessings",
              role: "Family Elders",
            },
            {
              time: "11:30 AM",
              cue: "24-Item Royal Chettinad Banana Leaf Feast & Kumbakonam Degree Coffee",
              role: "Catering Staff",
            },
            {
              time: "06:30 PM",
              cue: "Grand Stage Evening Reception & Live Carnatic Fusion Concert",
              role: "Decor / Music",
            },
          ],

          tasks: [
            {
              id: 1,
              text: "Lock Kalyana Mandapam booking & auspicious date slot",
              done: true,
              due: "9 months out",
            },
            {
              id: 2,
              text: "Finalize Chettinad caterer banana leaf menu & coffee live stall",
              done: false,
              due: "6 months out",
            },
            {
              id: 3,
              text: "Book Thiruvarur style Nadaswaram vidwans & Vadhyar ensemble",
              done: false,
              due: "5 months out",
            },
            {
              id: 4,
              text: "Finalize Kanchipuram silk sarees & book bridal draping artist",
              done: false,
              due: "3 months out",
            },
            {
              id: 5,
              text: "Send digital invitations with RSVP & feast dietary counts",
              done: false,
              due: "1 month out",
            },
          ],
        };

        setPlanResult(newPlan);
        setChecklist(newPlan.tasks);
      }
    }, 600);
  };

  useEffect(() => {
    if (initialPrompt && !planResult) {
      generatePlan();
    }
  }, [initialPrompt]);

  const toggleTask = (id) => {
    setChecklist((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleSavePlan = () => {
    if (!planResult) return;

    const existing = JSON.parse(
      localStorage.getItem("eventara_plans") || "[]"
    );

    localStorage.setItem(
      "eventara_plans",
      JSON.stringify([
        planResult,
        ...existing.filter((plan) => plan.id !== planResult.id),
      ])
    );

    setSavedSuccess(true);

    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: Layers,
      color: "violet",
    },
    {
      id: "budget",
      label: "INR Budget",
      icon: IndianRupee,
      color: "orange",
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: Clock,
      color: "cyan",
    },
    {
      id: "vendors",
      label: "Artisans",
      icon: Store,
      color: "emerald",
    },
    {
      id: "checklist",
      label: "Milestones",
      icon: CheckCircle2,
      color: "fuchsia",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-300/20 blur-3xl" />

        <div className="absolute top-[25%] -right-40 w-[500px] h-[500px] rounded-full bg-fuchsia-300/15 blur-3xl" />

        <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] rounded-full bg-orange-300/15 blur-3xl" />

        <div className="absolute top-[60%] right-[30%] w-[350px] h-[350px] rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      {/* Floating decorations */}
      {floatingDecorations.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            className={`fixed hidden xl:block ${item.position} ${item.color} pointer-events-none z-0`}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 8, -8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-7 h-7" />
          </motion.div>
        );
      })}

      <div className="relative max-w-7xl mx-auto z-10">

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 via-fuchsia-50 to-orange-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-wider shadow-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Compass className="w-4 h-4" />
            </motion.div>

            Ceremonial Event Intelligence

            <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />
          </div>

          <h1 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight font-display">
            AI Event
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
              {" "}Planning Engine
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Synthesize authentic Tamil ceremony blueprints with intelligent
            INR budgets, auspicious Muhurtham timelines and carefully matched
            local artisans.
          </p>
        </motion.div>

        {/* =========================================================
            MAIN CONFIGURATION GRID
        ========================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">

          {/* =====================================================
              LEFT CONFIGURATION PANEL
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden">

              {/* Animated gradient border */}
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-500 opacity-70" />

              <div className="relative rounded-3xl bg-white p-6 sm:p-7 shadow-xl">

                {/* Panel header */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center shadow-lg">
                      <WandSparkles className="w-5 h-5" />
                    </div>

                    <div>
                      <h2 className="text-base font-black text-slate-900">
                        Configure Your Event
                      </h2>

                      <p className="text-[11px] text-slate-500">
                        Customize your celebration blueprint
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                    AI READY
                  </span>
                </div>

                {/* =================================================
                    EVENT DESCRIPTION
                ================================================= */}

                <div className="mb-6">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                    Event Description & Vision
                  </label>

                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g. Traditional Brahmin Muhurtham for 500 guests in Chennai under 15 Lakhs with Chettinad feast..."
                    className="w-full p-4 rounded-2xl bg-gradient-to-br from-violet-50/50 to-fuchsia-50/40 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all resize-none"
                  />
                </div>

                {/* =================================================
                    EVENT TYPE
                ================================================= */}

                <div className="mb-6">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    <PartyPopper className="w-3.5 h-3.5 text-fuchsia-500" />
                    Occasion Type
                  </label>

                  <div className="grid grid-cols-2 gap-2.5">
                    {eventTypes.map((event) => {
                      const Icon = event.icon;
                      const selected = eventType === event.id;

                      return (
                        <motion.button
                          key={event.id}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setEventType(event.id)}
                          className={`relative overflow-hidden text-left p-3 rounded-2xl border transition-all duration-300 ${
                            selected
                              ? `${event.bg} ${event.border} shadow-md`
                              : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
                          }`}
                        >
                          {selected && (
                            <motion.div
                              layoutId="eventSelected"
                              className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${event.gradient}`}
                            />
                          )}

                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                selected
                                  ? `bg-gradient-to-br ${event.gradient} text-white shadow-md`
                                  : "bg-white text-slate-500 border border-slate-200"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="min-w-0">
                              <div
                                className={`text-[11px] font-bold truncate ${
                                  selected
                                    ? event.text
                                    : "text-slate-700"
                                }`}
                              >
                                {event.label}
                              </div>

                              <div className="text-[9px] text-slate-500 mt-0.5 truncate">
                                {event.desc}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* =================================================
                    GUEST COUNT
                ================================================= */}

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                      <Users className="w-3.5 h-3.5 text-cyan-500" />
                      Expected Guests
                    </label>

                    <span className="px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-black">
                      {guestCount} Guests
                    </span>
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="25"
                    value={guestCount}
                    onChange={(e) =>
                      setGuestCount(Number(e.target.value))
                    }
                    className="w-full accent-cyan-600 h-2 rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                    <span>50</span>
                    <span>750</span>
                    <span>1,500</span>
                  </div>
                </div>

                {/* =================================================
                    BUDGET
                ================================================= */}

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                      <IndianRupee className="w-3.5 h-3.5 text-orange-500" />
                      Target Budget
                    </label>

                    <span className="px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-black">
                      ₹{budget.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="200000"
                    max="5000000"
                    step="50000"
                    value={budget}
                    onChange={(e) =>
                      setBudget(Number(e.target.value))
                    }
                    className="w-full accent-orange-500 h-2 rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                    <span>₹2L</span>
                    <span>₹25L</span>
                    <span>₹50L</span>
                  </div>
                </div>

                {/* =================================================
                    LOCATION
                ================================================= */}

                <div className="mb-6">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    Celebration Location
                  </label>

                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded-xl bg-rose-50/40 border border-rose-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-rose-500 transition-all"
                  >
                    <option>Chennai, Tamil Nadu</option>
                    <option>Coimbatore, Tamil Nadu</option>
                    <option>Madurai, Tamil Nadu</option>
                    <option>Trichy, Tamil Nadu</option>
                    <option>Thanjavur, Tamil Nadu</option>
                    <option>Salem, Tamil Nadu</option>
                    <option>Other Tamil Nadu Location</option>
                  </select>
                </div>

                {/* =================================================
                    THEME
                ================================================= */}

                <div className="mb-6">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    <Palette className="w-3.5 h-3.5 text-fuchsia-500" />
                    Aesthetic & Decor Theme
                  </label>

                  <div className="space-y-2">
                    {themes.map((theme) => {
                      const selected =
                        selectedTheme.id === theme.id;

                      return (
                        <motion.button
                          key={theme.id}
                          type="button"
                          whileHover={{ x: 3 }}
                          onClick={() => setSelectedTheme(theme)}
                          className={`relative w-full p-3 rounded-2xl border flex items-center justify-between transition-all ${
                            selected
                              ? "bg-slate-50 border-violet-400 shadow-sm"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${theme.gradient} shadow-sm shrink-0`}
                            />

                            <span className="text-xs font-bold text-slate-800 truncate">
                              {theme.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 ml-2">
                            {theme.colors.map((color, index) => (
                              <span
                                key={index}
                                className="w-4 h-4 rounded-full border border-white shadow-sm ring-1 ring-slate-200"
                                style={{
                                  backgroundColor: color,
                                }}
                              />
                            ))}
                          </div>

                          {selected && (
                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* =================================================
                    PRIORITIES
                ================================================= */}

                <div className="mb-7">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Key Production Priorities
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {priorityOptions.map((priority, index) => {
                      const selected =
                        priorities.includes(priority);

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => togglePriority(priority)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                            selected
                              ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-violet-600 shadow-sm"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"
                          }`}
                        >
                          <span className="inline-flex items-center gap-1">
                            {selected ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Plus className="w-3 h-3" />
                            )}

                            {priority}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* =================================================
                    GENERATE BUTTON
                ================================================= */}

                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.015,
                    boxShadow: "0 15px 35px rgba(124,58,237,0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePlan}
                  disabled={isGenerating}
                  className="relative overflow-hidden w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-60"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />

                  <span className="relative flex items-center gap-2">
                    <WandSparkles className="w-5 h-5" />

                    {isGenerating
                      ? "Synthesizing Blueprint..."
                      : "Synthesize AI Blueprint"}

                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>

                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Your planning configuration stays in your browser
                </div>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT OUTPUT PANEL
          ===================================================== */}

          <div className="lg:col-span-7">

            {/* ===================================================
                GENERATING
            =================================================== */}

            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="relative min-h-[650px] rounded-3xl overflow-hidden bg-slate-950 text-white border border-violet-500/20 shadow-2xl flex flex-col items-center justify-center p-8"
                >
                  {/* Background glows */}
                  <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl" />

                  <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-fuchsia-600/20 blur-3xl" />

                  <div className="relative text-center">
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="mx-auto w-28 h-28 rounded-full border-2 border-dashed border-fuchsia-400/60 flex items-center justify-center"
                    >
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 flex items-center justify-center shadow-2xl">
                        <WandSparkles className="w-9 h-9 text-white" />
                      </div>
                    </motion.div>

                    <div className="mt-10">
                      <Loader
                        text={
                          generationStep === 0
                            ? "Calibrating auspicious Muhurtham lagna and ceremony cues..."
                            : generationStep === 1
                            ? "Allocating Kalyana Mandapam & catering budgets in INR..."
                            : generationStep === 2
                            ? "Matching verified Tamil Nadu vendors in Chennai & Madurai..."
                            : generationStep === 3
                            ? "Drafting minute-by-minute ceremonial run-of-show..."
                            : "Synthesizing Eventara Master Ceremony Blueprint..."
                        }
                        subtext="Tamil Nadu Ceremony Operating System"
                        size="lg"
                      />
                    </div>

                    {/* Generation steps */}
                    <div className="mt-10 flex justify-center gap-2">
                      {[0, 1, 2, 3, 4].map((step) => (
                        <motion.div
                          key={step}
                          animate={{
                            scale:
                              generationStep >= step
                                ? [1, 1.25, 1]
                                : 1,
                            opacity:
                              generationStep >= step
                                ? 1
                                : 0.3,
                          }}
                          className={`w-2.5 h-2.5 rounded-full ${
                            generationStep >= step
                              ? "bg-fuchsia-400"
                              : "bg-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : 
              planResult ? (
                /* =================================================
                   PLAN RESULT
                ================================================= */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Blueprint Header */}
                  <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl">

                    {/* Gradient top line */}
                    <div className="h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500" />

                    <div className="p-6 sm:p-7">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                        <div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-wider mb-2">
                            <CheckCircle2 className="w-3 h-3" />
                            Synthesized Masterplan
                          </div>

                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                            {planResult.title}
                          </h2>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-2">
                            <span className="inline-flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-cyan-500" />
                              {planResult.guestCount} Guests
                            </span>

                            <span>•</span>

                            <span className="inline-flex items-center gap-1">
                              <IndianRupee className="w-3.5 h-3.5 text-orange-500" />
                              ₹{planResult.budget.toLocaleString("en-IN")}
                            </span>

                            <span>•</span>

                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-rose-500" />
                              {planResult.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleSavePlan}
                            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                              savedSuccess
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-700"
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5" />

                            {savedSuccess ? "Saved!" : "Save Plan"}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                window.location.href
                              );

                              alert(
                                "Blueprint link copied to clipboard!"
                              );
                            }}
                            className="p-2 rounded-xl bg-slate-50 hover:bg-violet-50 border border-slate-200 hover:border-violet-200 text-slate-600 hover:text-violet-700 transition-all"
                            title="Share Blueprint"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Quick stats */}
                      <div className="grid grid-cols-3 gap-3 mt-6">
                        <div className="rounded-2xl bg-violet-50 border border-violet-100 p-3">
                          <div className="text-[10px] text-violet-600 font-bold uppercase">
                            Guests
                          </div>
                          <div className="text-lg font-black text-violet-900 mt-1">
                            {planResult.guestCount}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-3">
                          <div className="text-[10px] text-orange-600 font-bold uppercase">
                            Budget
                          </div>
                          <div className="text-lg font-black text-orange-900 mt-1">
                            ₹{(planResult.budget / 100000).toFixed(1)}L
                          </div>
                        </div>

                        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3">
                          <div className="text-[10px] text-emerald-600 font-bold uppercase">
                            Feasibility
                          </div>
                          <div className="text-lg font-black text-emerald-900 mt-1">
                            {planResult.feasibilityScore}%
                          </div>
                        </div>
                      </div>

                      {/* Tabs */}
                      <div className="mt-6 flex items-center gap-1.5 border-b border-slate-200 overflow-x-auto pb-1">
                        {tabs.map((tab) => {
                          const Icon = tab.icon;
                          const active = activeTab === tab.id;

                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setActiveTab(tab.id)}
                              className={`relative flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                                active
                                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md"
                                  : "text-slate-600 hover:text-violet-700 hover:bg-violet-50"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {tab.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* =================================================
                          OVERVIEW
                      ================================================= */}

                      <AnimatePresence mode="wait">
                        {activeTab === "overview" && (
                          <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            className="space-y-4 pt-5"
                          >
                            <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-violet-50 via-fuchsia-50 to-orange-50 border border-violet-100">
                              <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-white/60" />

                              <div className="relative">
                                <div className="flex items-center gap-2 text-xs font-black text-violet-700 uppercase tracking-wider">
                                  <Sparkles className="w-4 h-4" />
                                  Ceremony Summary
                                </div>

                                <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                                  A curated celebration configured for{" "}
                                  <strong>
                                    {planResult.guestCount}
                                  </strong>{" "}
                                  guests in{" "}
                                  <strong>
                                    {planResult.location}
                                  </strong>
                                  . Seamlessly uniting{" "}
                                  <strong>
                                    {planResult.theme.label}
                                  </strong>{" "}
                                  aesthetics with traditional Chettinad
                                  hospitality, authentic Vedic rituals and
                                  4K photography within your ₹
                                  {planResult.budget.toLocaleString(
                                    "en-IN"
                                  )}{" "}
                                  financial target.
                                </p>
                              </div>
                            </div>

                            {/* Palette */}
                            <div className="p-5 rounded-2xl bg-white border border-slate-200">
                              <div className="flex items-center justify-between mb-4">
                                <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                  <Palette className="w-4 h-4 text-fuchsia-500" />
                                  Ceremony Palette
                                </div>

                                <span className="text-[10px] font-bold text-slate-400">
                                  {planResult.theme.label}
                                </span>
                              </div>

                              <div className="grid grid-cols-4 gap-3">
                                {planResult.theme.colors.map(
                                  (color, index) => (
                                    <motion.div
                                      key={index}
                                      whileHover={{ y: -3 }}
                                      className="text-center"
                                    >
                                      <div
                                        className="h-14 rounded-xl border border-slate-200 shadow-sm"
                                        style={{
                                          backgroundColor: color,
                                        }}
                                      />

                                      <div className="mt-2 text-[10px] font-mono text-slate-500 font-bold">
                                        {color}
                                      </div>
                                    </motion.div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Next step */}
                            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 text-sm font-black text-emerald-900">
                                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                  Ready to Book Matched Vendors?
                                </div>

                                <div className="text-xs text-emerald-700 mt-1">
                                  Review and lock your date with matched
                                  Tamil Nadu partners.
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setActiveTab("vendors")
                                }
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
                              >
                                View Vendors
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* =================================================
                            BUDGET
                        ================================================= */}

                        {activeTab === "budget" && (
                          <motion.div
                            key="budget"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            className="space-y-5 pt-5"
                          >
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100">
                                <div className="text-[10px] text-violet-600 font-bold uppercase">
                                  Total Budget
                                </div>

                                <div className="text-lg font-black text-violet-900 mt-1">
                                  ₹
                                  {planResult.budget.toLocaleString(
                                    "en-IN"
                                  )}
                                </div>
                              </div>

                              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                                <div className="text-[10px] text-emerald-600 font-bold uppercase">
                                  Allocated
                                </div>

                                <div className="text-lg font-black text-emerald-900 mt-1">
                                  ₹
                                  {planResult.budget.toLocaleString(
                                    "en-IN"
                                  )}
                                </div>
                              </div>

                              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 col-span-2 sm:col-span-1">
                                <div className="text-[10px] text-orange-600 font-bold uppercase">
                                  Per Guest
                                </div>

                                <div className="text-lg font-black text-orange-900 mt-1">
                                  ₹
                                  {Math.round(
                                    planResult.budget /
                                      planResult.guestCount
                                  ).toLocaleString("en-IN")}
                                </div>
                              </div>
                            </div>

                            {/* Distribution */}
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-xs font-black text-slate-700 uppercase">
                                  Category Allocation
                                </div>

                                <div className="text-[10px] text-slate-400 font-bold">
                                  100% Allocated
                                </div>
                              </div>

                              <div className="w-full h-5 rounded-full bg-slate-200 overflow-hidden flex">
                                {planResult.budgetBreakdown.map(
                                  (item, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ width: 0 }}
                                      animate={{
                                        width: `${item.percent}%`,
                                      }}
                                      transition={{
                                        duration: 0.8,
                                        delay: index * 0.1,
                                      }}
                                      className={`h-full ${item.color}`}
                                      title={`${item.category}: ₹${item.amount.toLocaleString(
                                        "en-IN"
                                      )}`}
                                    />
                                  )
                                )}
                              </div>
                            </div>

                            {/* Budget items */}
                            <div className="space-y-2">
                              {planResult.budgetBreakdown.map(
                                (item, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: index * 0.08,
                                    }}
                                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-violet-200 hover:shadow-sm transition-all"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <span
                                        className={`w-3.5 h-3.5 rounded-full ${item.color} shrink-0`}
                                      />

                                      <div className="min-w-0">
                                        <div className="text-xs font-bold text-slate-900 truncate">
                                          {item.category}
                                        </div>

                                        <div className="text-[10px] text-slate-400 mt-0.5">
                                          {item.percent}% allocation
                                        </div>
                                      </div>
                                    </div>

                                    <span className="text-xs font-black text-slate-800 ml-3 whitespace-nowrap">
                                      ₹
                                      {item.amount.toLocaleString(
                                        "en-IN"
                                      )}
                                    </span>
                                  </motion.div>
                                )
                              )}
                            </div>

                            <div className="text-center pt-2">
                              <Link
                                to="/budget-tracker"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-fuchsia-600 transition-colors"
                              >
                                Open Full Interactive Budget Tracker
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}

                        {/* =================================================
                            TIMELINE
                        ================================================= */}

                        {activeTab === "timeline" && (
                          <motion.div
                            key="timeline"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            className="pt-5"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                              <div className="text-xs text-slate-500">
                                Auspicious ceremony schedule synced with
                                family & vendors
                              </div>

                              <Link
                                to="/timeline"
                                className="text-xs text-cyan-700 font-bold hover:text-indigo-600"
                              >
                                Open Live Timeline →
                              </Link>
                            </div>

                            <div className="relative ml-2 border-l-2 border-gradient-to-b border-cyan-300 pl-6 space-y-4">
                              {planResult.timeline.map(
                                (item, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{
                                      opacity: 0,
                                      x: 15,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                    }}
                                    transition={{
                                      delay: index * 0.08,
                                    }}
                                    className="relative"
                                  >
                                    <motion.div
                                      animate={{
                                        scale: [1, 1.2, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        delay: index * 0.15,
                                        repeat: Infinity,
                                      }}
                                      className="absolute -left-[31px] top-4 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 border-2 border-white shadow-md"
                                    />

                                    <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-indigo-50 border border-cyan-100 hover:border-cyan-300 transition-all">
                                      <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="px-2.5 py-1 rounded-full bg-white border border-cyan-200 text-cyan-700 text-[10px] font-black font-mono">
                                          {item.time}
                                        </span>

                                        <span className="px-2.5 py-1 rounded-full bg-white/70 text-[9px] text-slate-600 font-bold">
                                          {item.role}
                                        </span>
                                      </div>

                                      <p className="text-xs sm:text-sm font-bold text-slate-900 mt-3 leading-relaxed">
                                        {item.cue}
                                      </p>
                                    </div>
                                  </motion.div>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* =================================================
                            VENDORS
                        ================================================= */}

                        {activeTab === "vendors" && (
                          <motion.div
                            key="vendors"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            className="space-y-4 pt-5"
                          >
                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                                <ShieldCheck className="w-4 h-4" />
                                Matched Local Artisans
                              </div>

                              <p className="text-[11px] text-emerald-700 mt-1">
                                Pre-screened partners aligned with your
                                budget, event type and guest count.
                              </p>
                            </div>

                            <div className="space-y-3">
                              {planResult.matchedVendors.map(
                                (vendor, index) => (
                                  <motion.div
                                    key={vendor.id}
                                    initial={{
                                      opacity: 0,
                                      y: 15,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      y: 0,
                                    }}
                                    transition={{
                                      delay: index * 0.1,
                                    }}
                                    whileHover={{ y: -2 }}
                                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all"
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                      <div className="flex items-center gap-3 min-w-0">
                                        <img
                                          src={vendor.avatar}
                                          alt={vendor.name}
                                          className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm"
                                        />

                                        <div className="min-w-0">
                                          <div className="flex flex-wrap items-center gap-2">
                                            <h4 className="text-sm font-black text-slate-900">
                                              {vendor.name}
                                            </h4>

                                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] font-black">
                                              {vendor.aiMatchScore}%
                                              Match
                                            </span>
                                          </div>

                                          <div className="text-[11px] text-slate-500 mt-1">
                                            {vendor.categoryName}
                                          </div>

                                          <div className="text-[11px] text-slate-600 font-bold mt-1">
                                            Starting ₹
                                            {Number(
                                              vendor.startingPrice ||
                                                25000
                                            ).toLocaleString("en-IN")}
                                          </div>
                                        </div>
                                      </div>

                                      <Link
                                        to={`/vendors/${vendor.id}`}
                                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs text-center shadow-sm hover:shadow-md transition-all"
                                      >
                                        View Profile
                                      </Link>
                                    </div>
                                  </motion.div>
                                )
                              )}
                            </div>

                            <div className="pt-2 text-center">
                              <Link
                                to="/compare-vendors"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-teal-600"
                              >
                                Compare Vendors Side-by-Side
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}

                        {/* =================================================
                            CHECKLIST
                        ================================================= */}

                        {activeTab === "checklist" && (
                          <motion.div
                            key="checklist"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            className="space-y-4 pt-5"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs font-black text-fuchsia-700 uppercase tracking-wider">
                                  Celebration Milestones
                                </div>

                                <p className="text-[11px] text-slate-500 mt-1">
                                  Recommended planning checkpoints
                                </p>
                              </div>

                              <div className="px-3 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 text-[10px] font-black">
                                {
                                  checklist.filter(
                                    (task) => task.done
                                  ).length
                                }{" "}
                                / {checklist.length} Done
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              {checklist.map((task, index) => (
                                <motion.div
                                  key={task.id}
                                  whileHover={{ x: 3 }}
                                  onClick={() =>
                                    toggleTask(task.id)
                                  }
                                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                                    task.done
                                      ? "bg-emerald-50 border-emerald-200"
                                      : "bg-white border-slate-200 hover:border-fuchsia-300 hover:shadow-sm"
                                  }`}
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <motion.div
                                      animate={
                                        task.done
                                          ? {
                                              scale: [1, 1.2, 1],
                                            }
                                          : {}
                                      }
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                        task.done
                                          ? "bg-emerald-500 text-white"
                                          : "bg-fuchsia-50 text-fuchsia-500 border border-fuchsia-200"
                                      }`}
                                    >
                                      {task.done ? (
                                        <Check className="w-4 h-4" />
                                      ) : (
                                        <span className="text-[10px] font-black">
                                          {String(index + 1).padStart(
                                            2,
                                            "0"
                                          )}
                                        </span>
                                      )}
                                    </motion.div>

                                    <span
                                      className={`text-xs font-bold leading-relaxed ${
                                        task.done
                                          ? "line-through text-emerald-700"
                                          : "text-slate-800"
                                      }`}
                                    >
                                      {task.text}
                                    </span>
                                  </div>

                                  <span
                                    className={`text-[9px] font-black uppercase whitespace-nowrap ${
                                      task.done
                                        ? "text-emerald-600"
                                        : "text-slate-400"
                                    }`}
                                  >
                                    {task.due}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* =================================================
                   EMPTY STATE
                ================================================= */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative min-h-[650px] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl flex flex-col items-center justify-center text-center p-8"
                >
                  {/* Decorative gradients */}
                  <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-violet-300/20 blur-3xl" />

                  <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl" />

                  <div className="relative">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                      className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 flex items-center justify-center text-white shadow-2xl"
                    >
                      <Compass className="w-11 h-11" />
                    </motion.div>

                    <div className="mt-8">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-[10px] font-black uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        Your AI Workspace
                      </div>

                      <h3 className="mt-4 text-xl sm:text-2xl font-black text-slate-900 font-display">
                        Your Ceremony Masterplan
                        <br />
                        <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                          Will Appear Here
                        </span>
                      </h3>

                      <p className="mt-4 text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                        Configure your guests, budget, location, theme and
                        priorities on the left. Our planning engine will
                        transform them into a structured celebration
                        blueprint.
                      </p>

                      <motion.button
                        whileHover={{
                          scale: 1.04,
                          boxShadow:
                            "0 15px 35px rgba(124,58,237,0.25)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={generatePlan}
                        className="mt-7 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 text-white font-black text-xs flex items-center gap-2 mx-auto shadow-lg"
                      >
                        <WandSparkles className="w-4 h-4" />
                        Generate Sample Blueprint
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Feature pills */}
                  <div className="relative mt-12 flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 text-[10px] font-bold">
                      AI Timeline
                    </span>

                    <span className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-[10px] font-bold">
                      INR Budget
                    </span>

                    <span className="px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-bold">
                      Ceremony Planning
                    </span>

                    <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Vendor Matching
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* =========================================================
            BOTTOM TRUST STRIP
        ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-6 sm:p-8 shadow-2xl"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="absolute -bottom-20 right-0 w-64 h-64 rounded-full bg-fuchsia-600/20 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-7">

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-lg font-black">
                  One intelligent workspace for your celebration
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                  Plan ceremony schedules, manage your INR budget, discover
                  local artisans and organize important milestones without
                  jumping between multiple tools.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-[10px] font-bold">
                Smart Planning
              </span>

              <span className="px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/20 text-fuchsia-300 text-[10px] font-bold">
                Beautiful Events
              </span>

              <span className="px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/20 text-orange-300 text-[10px] font-bold">
                Local Expertise
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default AIPlanner;

