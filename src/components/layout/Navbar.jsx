import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Compass,
  ChevronDown,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  X,
  MailCheck,
  ShieldCheck,
  ArrowRight,
  Phone,
  Sparkles,
  Zap,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/* =========================================================
   EVENTARA BRAND LOGO
   Celebration + Event Planning Inspired Logo
========================================================= */

const EventaraLogo = () => {
  return (
    <Link
      to="/"
      className="group relative flex items-center gap-3"
      aria-label="Eventara Home"
    >
      {/* Logo Ambient Glow */}
      <motion.div
        className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-orange-400/20 via-pink-400/20 to-violet-500/20 blur-xl"
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          LOGO ICON
      ================================================== */}

      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: 2,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        className="relative z-10"
      >
        <div className="relative flex h-11 w-11 items-center justify-center">
          {/* Outer Gradient Ring */}

          <motion.div
            className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-orange-400 via-pink-500 to-violet-600 shadow-lg shadow-pink-200/50"
            animate={{
              rotate: [0, 4, 0, -4, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner White Surface */}

          <div className="absolute inset-[2px] rounded-[12px] bg-white" />

          {/* Celebration Arch */}

          <svg
            viewBox="0 0 48 48"
            className="relative z-10 h-8 w-8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Arch */}

            <path
              d="M10 35V21C10 13.82 15.82 8 23 8C30.18 8 36 13.82 36 21V35"
              stroke="url(#archGradient)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Event Table / Stage */}

            <path
              d="M7 35H39"
              stroke="#7C3AED"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M12 39H36"
              stroke="#EC4899"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Hanging Decoration */}

            <path
              d="M16 15V20"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <circle
              cx="16"
              cy="22"
              r="2.2"
              fill="#F97316"
            />

            {/* Right Decoration */}

            <path
              d="M31 15V20"
              stroke="#06B6D4"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <circle
              cx="31"
              cy="22"
              r="2.2"
              fill="#06B6D4"
            />

            {/* Center Sparkle */}

            <path
              d="M23 11L24 14L27 15L24 16L23 19L22 16L19 15L22 14L23 11Z"
              fill="#F59E0B"
            />

            {/* Gradient Definition */}

            <defs>
              <linearGradient
                id="archGradient"
                x1="8"
                y1="8"
                x2="38"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F97316" />
                <stop offset="0.45" stopColor="#EC4899" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>

          {/* Tiny Floating Spark */}

          <motion.span
            className="absolute -right-1 -top-1 z-20 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-sm"
            animate={{
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="h-2 w-2 text-white" />
          </motion.span>
        </div>
      </motion.div>

      {/* =================================================
          BRAND TEXT
      ================================================== */}

      <div className="relative z-10 flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-[21px] font-black tracking-[-0.04em] text-transparent">
            Eventara
          </span>

          <motion.span
            animate={{
              y: [0, -2, 0],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-orange-500"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </motion.span>
        </div>

        <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Celebrate • Plan • Experience
        </span>
      </div>
    </Link>
  );
};

/* =========================================================
   PLANNING TOOLS
========================================================= */

const planningTools = [
  {
    title: "AI Ceremony Planner",
    desc: "Auspicious lagna, budget allocation & checklists",
    path: "/ai-planner",
    icon: Compass,
    color: "orange",
    iconClass: "text-orange-600",
    bgClass: "bg-orange-50",
    borderClass: "border-orange-200",
    hoverClass: "hover:bg-orange-50",
  },
];

/* =========================================================
   NAVIGATION LINKS
========================================================= */

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Celebrations",
    path: "/events",
  },
  {
    name: "Artisans & Vendors",
    path: "/vendors",
  },
  {
    name: "Mandapams & Venues",
    path: "/venues",
  },
  {
    name: "Services",
    path: "/services",
  },
];

/* =========================================================
   NAVBAR
========================================================= */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);

  const { user, logout, isAuthenticated } = useAuth
    ? useAuth()
    : {
        user: null,
        logout: () => {},
        isAuthenticated: false,
      };

  /* =====================================================
     SCROLL EFFECT
  ====================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     CLOSE MENUS ON ROUTE CHANGE
  ====================================================== */

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsToolsOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  /* =====================================================
     CLICK OUTSIDE
  ====================================================== */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsToolsOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =====================================================
     USER INITIALS
  ====================================================== */

  const getInitials = () => {
    if (!user) return "EV";

    const name =
      user.name ||
      user.fullName ||
      user.username ||
      "Eventara User";

    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  /* =====================================================
     LOGOUT
  ====================================================== */

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("functionPlannerUser");
      localStorage.removeItem("functionPlannerToken");
    }

    navigate("/");
  };

  /* =====================================================
     ACTIVE TOOL
  ====================================================== */

  const isToolActive = planningTools.some((tool) =>
    location.pathname.startsWith(tool.path)
  );

  return (
    <header
      ref={dropdownRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 py-2.5 shadow-[0_10px_40px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
          : "bg-white/80 py-3.5 backdrop-blur-xl"
      }`}
    >
      {/* =================================================
          ANIMATED TOP GRADIENT
      ================================================== */}

      <div className="absolute left-0 right-0 top-0 h-[2px] overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-full w-full bg-gradient-to-r from-orange-400 via-pink-500 via-violet-500 via-sky-500 to-emerald-400"
        />
      </div>

      {/* =================================================
          AMBIENT BACKGROUND GLOW
      ================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl"
        />
      </div>

      {/* =================================================
          MAIN NAVIGATION
      ================================================== */}

      <div className="relative mx-auto flex w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* =================================================
            LOGO
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex shrink-0 items-center"
        >
          <EventaraLogo />
        </motion.div>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav className="hidden shrink-0 items-center gap-1 lg:flex xl:gap-1.5">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group relative rounded-xl px-2.5 py-2 text-xs font-bold transition-all duration-300 xl:px-3 xl:text-sm ${
                  isActive
                    ? "bg-gradient-to-r from-orange-50 to-pink-50 text-orange-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {isActive && (
                    <motion.span
                      layoutId="navbarActive"
                      className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* =================================================
              PLANNING TOOLS
          ================================================== */}

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsToolsOpen(!isToolsOpen);
                setIsUserMenuOpen(false);
              }}
              className={`group flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-bold transition-all duration-300 xl:px-3 xl:text-sm ${
                isToolsOpen || isToolActive
                  ? "bg-gradient-to-r from-violet-50 to-pink-50 text-violet-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <motion.span
                animate={
                  isToolsOpen
                    ? {
                        rotate: 360,
                      }
                    : {
                        rotate: 0,
                      }
                }
                transition={{
                  duration: 0.5,
                }}
              >
                <Compass className="h-4 w-4 text-violet-600" />
              </motion.span>

              <span>Planning Tools</span>

              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  isToolsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* =================================================
                TOOLS DROPDOWN
            ================================================== */}

            <AnimatePresence>
              {isToolsOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="absolute left-0 top-full z-50 mt-3 w-[390px] overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_25px_70px_rgba(15,23,42,0.15)] backdrop-blur-xl"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-200/30 blur-3xl" />

                  <div className="relative border-b border-slate-100 px-3 pb-2 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                      </span>

                      <div>
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                          Ceremony Intelligence Suite
                        </div>

                        <div className="text-[10px] text-slate-400">
                          Smart tools for seamless celebrations
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative grid gap-1 pt-1">
                    {planningTools.map((tool, index) => {
                      const Icon = tool.icon;

                      const isCurrent =
                        location.pathname === tool.path;

                      return (
                        <motion.div
                          key={tool.path}
                          initial={{
                            opacity: 0,
                            x: -8,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.035,
                          }}
                        >
                          <Link
                            to={tool.path}
                            className={`group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 ${
                              isCurrent
                                ? `${tool.bgClass} ${tool.borderClass} border`
                                : `${tool.hoverClass} hover:shadow-sm`
                            }`}
                          >
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${tool.bgClass} ${tool.borderClass}`}
                            >
                              <Icon
                                className={`h-4 w-4 ${tool.iconClass}`}
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="text-xs font-extrabold leading-snug text-slate-800 group-hover:text-slate-950">
                                {tool.title}
                              </div>

                              <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                                {tool.desc}
                              </p>
                            </div>

                            <ArrowRight className="ml-auto mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500 group-hover:opacity-100" />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Dropdown Footer */}

                  <div className="relative mt-1 flex items-center justify-between border-t border-slate-100 px-2 pt-2">
                    <Link
                      to="/rsvp"
                      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-600 transition-colors hover:bg-pink-50 hover:text-pink-700"
                    >
                      <MailCheck className="h-3.5 w-3.5 text-pink-500" />
                      Guest RSVP Portal
                    </Link>

                    <Link
                      to="/compare-vendors"
                      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-700"
                    >
                      <Layers className="h-3.5 w-3.5 text-sky-500" />
                      Compare Matrix
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* =================================================
            DESKTOP RIGHT ACTIONS
        ================================================== */}

        <div className="hidden shrink-0 items-center gap-2 whitespace-nowrap lg:flex xl:gap-3">

          {/* Contact */}

          <Link
            to="/contact"
            className="group flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-600 transition-all duration-300 hover:bg-orange-50 hover:text-orange-700"
          >
            <Phone className="h-3.5 w-3.5 text-orange-500 transition-transform duration-300 group-hover:rotate-12" />

            <span>Contact</span>
          </Link>

          {/* =================================================
              AUTHENTICATED USER
          ================================================== */}

          {isAuthenticated ? (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsToolsOpen(false);
                }}
                className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-md"
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 opacity-40 blur-sm" />

                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-violet-600 text-xs font-extrabold text-white">
                    {getInitials()}
                  </div>
                </div>

                <ChevronDown
                  className={`mr-1 h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-1.5 text-xs shadow-[0_25px_70px_rgba(15,23,42,0.15)] backdrop-blur-xl"
                  >
                    <div className="rounded-xl bg-gradient-to-r from-orange-50 via-pink-50 to-violet-50 px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-violet-600 text-[10px] font-extrabold text-white">
                          {getInitials()}
                        </div>

                        <div className="min-w-0">
                          <div className="truncate font-extrabold text-slate-900">
                            {user?.name || "Event Host"}
                          </div>

                          <div className="truncate text-[10px] text-slate-500">
                            {user?.email || "host@eventara.in"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to={
                          user?.role === "vendor"
                            ? "/vendor-dashboard"
                            : "/dashboard"
                        }
                        className="group flex items-center gap-2 rounded-xl px-3 py-2.5 font-bold text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5 text-violet-500" />

                        <span>Console Dashboard</span>
                      </Link>

                      <Link
                        to="/admin/login"
                        className="group flex items-center gap-2 rounded-xl px-3 py-2.5 font-bold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />

                        <span>Admin Console</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 font-bold text-rose-600 transition-colors hover:bg-rose-50"
                      >
                        <LogOut className="h-3.5 w-3.5" />

                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* =================================================
                GUEST ACTIONS
            ================================================== */

            <div className="flex items-center gap-1.5">
              <Link
                to="/login"
                className="rounded-xl px-3 py-2 text-xs font-bold text-slate-600 transition-all duration-300 hover:bg-slate-50 hover:text-slate-900"
              >
                Sign In
              </Link>

              <motion.div
                whileHover={{
                  y: -1,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  to="/ai-planner"
                  className="group relative flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-pink-100 transition-all duration-300 hover:shadow-xl hover:shadow-pink-200"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

                  <Zap className="relative h-3.5 w-3.5 fill-white" />

                  <span className="relative">
                    Plan Event
                  </span>

                  <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          )}
        </div>

        {/* =================================================
            MOBILE ACTIONS
        ================================================== */}

        <div className="flex shrink-0 items-center gap-2 lg:hidden">

          <Link
            to="/ai-planner"
            className="group relative flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 px-3 py-2 text-xs font-extrabold text-white shadow-md shadow-pink-100"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

            <Zap className="relative h-3.5 w-3.5 fill-white" />

            <span className="relative">
              Plan Event
            </span>
          </Link>

          <button
            type="button"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-all duration-300 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
            aria-label="Toggle Navigation Menu"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 90,
                    opacity: 0,
                  }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: -90,
                    opacity: 0,
                  }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU DRAWER
      ====================================================== */}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="relative overflow-hidden border-t border-slate-100 bg-white/95 px-4 pb-6 pt-3 shadow-[0_20px_50px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:hidden"
          >
            {/* Mobile Gradient Glows */}

            <div className="pointer-events-none absolute -right-20 top-10 h-40 w-40 rounded-full bg-pink-200/20 blur-3xl" />

            <div className="pointer-events-none absolute -left-20 bottom-10 h-40 w-40 rounded-full bg-sky-200/20 blur-3xl" />

            <div className="relative space-y-1">

              {/* Main Links */}

              {navLinks.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                >
                  <Link
                    to={item.path}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-extrabold text-slate-800 transition-colors hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 hover:text-orange-700"
                  >
                    <span>{item.name}</span>

                    <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
                  </Link>
                </motion.div>
              ))}

              {/* =================================================
                  MOBILE TOOLS
              ================================================== */}

              <div className="mt-3 border-t border-slate-100 pt-4">

                <div className="mb-3 flex items-center gap-2 px-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-pink-500">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </span>

                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                      Ceremony Tools
                    </div>

                    <div className="text-[9px] text-slate-400">
                      Smart planning suite
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {planningTools.map((tool, index) => {
                    const Icon = tool.icon;

                    return (
                      <motion.div
                        key={tool.path}
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.1 + index * 0.04,
                        }}
                      >
                        <Link
                          to={tool.path}
                          className={`flex h-full items-center gap-2 rounded-xl border p-2.5 text-xs font-bold text-slate-700 transition-all duration-200 ${tool.bgClass} ${tool.borderClass} hover:-translate-y-0.5 hover:shadow-sm`}
                        >
                          <Icon
                            className={`h-3.5 w-3.5 shrink-0 ${tool.iconClass}`}
                          />

                          <span className="truncate">
                            {tool.title}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* =================================================
                  MOBILE CONCIERGE
              ================================================== */}

              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">

                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-orange-50 via-pink-50 to-violet-50 px-3 py-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Phone className="h-3.5 w-3.5 text-orange-500" />

                    Concierge Desk
                  </span>

                  <a
                    href="tel:+914448902200"
                    className="text-xs font-extrabold text-orange-700"
                  >
                    +91 44 4890 2200
                  </a>
                </div>

                {/* Auth */}

                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-2">

                    <Link
                      to="/login"
                      className="rounded-xl border border-slate-200 bg-white py-2.5 text-center text-xs font-extrabold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/register"
                      className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 py-2.5 text-center text-xs font-extrabold text-white shadow-md shadow-orange-100"
                    >
                      Register
                    </Link>

                  </div>
                ) : (
                  <div className="space-y-2">

                    <Link
                      to={
                        user?.role === "vendor"
                          ? "/vendor-dashboard"
                          : "/dashboard"
                      }
                      className="flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-3 py-3 text-xs font-bold text-violet-700"
                    >
                      <LayoutDashboard className="h-4 w-4" />

                      Console Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-3 text-xs font-bold text-rose-600"
                    >
                      <LogOut className="h-4 w-4" />

                      Sign Out
                    </button>

                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;