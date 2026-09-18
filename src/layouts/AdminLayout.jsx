import { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  X,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

import { LogoIcon } from "../components/common/Logo";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Venues",
    path: "/admin/venues",
    icon: MapPin,
  },
  {
    label: "Enquiries",
    path: "/admin/enquiries",
    icon: FileText,
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: BarChart3,
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  /* =========================================================
     ADMIN DATA
  ========================================================= */

  const storedAdmin = localStorage.getItem("functionPlannerAdmin");

  let admin = null;

  try {
    admin = storedAdmin ? JSON.parse(storedAdmin) : null;
  } catch (error) {
    console.error("Invalid admin data:", error);
  }

  const adminName = admin?.name || admin?.fullName || "Administrator";
  const adminEmail = admin?.email || "admin@eventara.com";

  const getInitials = (name) => {
    if (!name) return "AD";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("functionPlannerAdmin");
    localStorage.removeItem("functionPlannerAdminToken");

    setMobileSidebarOpen(false);

    navigate("/admin/login", {
      replace: true,
    });
  };

  /* =========================================================
     MOBILE SIDEBAR
  ========================================================= */

  const openMobileSidebar = () => {
    setMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-stone-950/40 backdrop-blur-sm lg:hidden"
            onClick={closeMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex flex-col
          border-r border-stone-200
          bg-white
          shadow-xl shadow-stone-900/5

          w-[270px]

          transform
          transition-transform
          duration-300
          ease-in-out

          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0

          ${collapsed ? "lg:w-[84px]" : "lg:w-[270px]"}
        `}
      >

        {/* =================================================
            LOGO
        ================================================== */}

        <div className="flex h-20 shrink-0 items-center border-b border-stone-200 px-5">

          <Link
            to="/admin/dashboard"
            onClick={closeMobileSidebar}
            className="flex min-w-0 items-center gap-3"
          >
            <LogoIcon size="md" />

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <p className="font-display text-base font-bold tracking-tight text-slate-900">
                      Eventara
                    </p>

                    <span className="rounded border border-teal-200 bg-teal-50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-teal-800">
                      Admin
                    </span>
                  </div>

                  <p className="-mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Tamil Nadu Operations
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* =================================================
              MOBILE CLOSE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={closeMobileSidebar}
            className="
              ml-auto
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-stone-500
              transition-all
              duration-200
              hover:bg-stone-100
              hover:text-stone-900
              active:scale-95
              lg:hidden
            "
            aria-label="Close sidebar"
          >
            <X size={22} strokeWidth={2} />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}

        <div className="flex-1 overflow-y-auto px-3 py-5">

          <p
            className={`
              mb-3
              px-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-stone-400
              ${collapsed ? "text-center" : ""}
            `}
          >
            {collapsed ? "•••" : "Management"}
          </p>

          <nav className="space-y-1">

            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-amber-50 text-amber-700"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}

                      {isActive && (
                        <motion.div
                          layoutId="admin-active-indicator"
                          className="
                            absolute
                            left-0
                            top-1/2
                            h-7
                            w-1
                            -translate-y-1/2
                            rounded-r-full
                            bg-amber-500
                          "
                        />
                      )}

                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.3 : 1.9}
                        className={`
                          shrink-0
                          ${
                            isActive
                              ? "text-amber-600"
                              : "text-stone-400 group-hover:text-stone-700"
                          }
                        `}
                      />

                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">
                            {item.label}
                          </span>

                          {isActive && (
                            <ChevronRight
                              size={15}
                              className="text-amber-500"
                            />
                          )}
                        </>
                      )}

                      {/* Collapsed tooltip */}

                      {collapsed && (
                        <span
                          className="
                            pointer-events-none
                            absolute
                            left-full
                            z-50
                            ml-3
                            hidden
                            whitespace-nowrap
                            rounded-lg
                            bg-stone-900
                            px-3
                            py-2
                            text-xs
                            font-medium
                            text-white
                            shadow-lg
                            group-hover:block
                          "
                        >
                          {item.label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}

          </nav>

          {/* =================================================
              SETTINGS
          ================================================== */}

          <div className="mt-6 border-t border-stone-200 pt-5">

            <NavLink
              to="/admin/settings"
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                `
                group
                relative
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                transition-all

                ${
                  isActive
                    ? "bg-amber-50 text-amber-700"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }
              `
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="admin-settings-indicator"
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-7
                        w-1
                        -translate-y-1/2
                        rounded-r-full
                        bg-amber-500
                      "
                    />
                  )}

                  <Settings
                    size={19}
                    className={`shrink-0 ${
                      isActive
                        ? "text-amber-600"
                        : "text-stone-400"
                    }`}
                  />

                  {!collapsed && <span>Settings</span>}

                  {collapsed && (
                    <span
                      className="
                        pointer-events-none
                        absolute
                        left-full
                        z-50
                        ml-3
                        hidden
                        whitespace-nowrap
                        rounded-lg
                        bg-stone-900
                        px-3
                        py-2
                        text-xs
                        text-white
                        shadow-lg
                        group-hover:block
                      "
                    >
                      Settings
                    </span>
                  )}
                </>
              )}
            </NavLink>

          </div>
        </div>

        {/* =================================================
            ADMIN PROFILE
        ================================================== */}

        <div className="shrink-0 border-t border-stone-200 p-3">

          <div
            className={`
              flex
              items-center
              gap-3
              rounded-xl
              bg-stone-50
              p-3
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-amber-100
                text-xs
                font-bold
                text-amber-700
              "
            >
              {getInitials(adminName)}
            </div>

            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-stone-800">
                  {adminName}
                </p>

                <p className="truncate text-xs text-stone-400">
                  {adminEmail}
                </p>
              </div>
            )}
          </div>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className={`
              mt-2
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              font-medium
              text-stone-500
              transition-colors
              hover:bg-red-50
              hover:text-red-600
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={18} />

            {!collapsed && <span>Logout</span>}
          </button>

        </div>
      </aside>

      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <div
        className={`
          min-h-screen
          ml-0
          transition-[margin-left]
          duration-300
          ease-in-out

          ${collapsed ? "lg:ml-[84px]" : "lg:ml-[270px]"}
        `}
      >

        {/* =================================================
            TOP BAR
        ================================================== */}

        <header
          className="
            sticky
            top-0
            z-30
            flex
            h-20
            items-center
            justify-between
            border-b
            border-stone-200
            bg-white/90
            px-4
            backdrop-blur-xl
            sm:px-6
            lg:px-8
          "
        >

          <div className="flex min-w-0 items-center gap-3">

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={openMobileSidebar}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-stone-600
                transition-all
                duration-200
                hover:bg-stone-100
                hover:text-stone-900
                active:scale-95
                lg:hidden
              "
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            {/* DESKTOP COLLAPSE */}

            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              className="
                hidden
                rounded-xl
                p-2.5
                text-stone-500
                transition-colors
                hover:bg-stone-100
                hover:text-stone-900
                lg:block
              "
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen size={21} />
              ) : (
                <PanelLeftClose size={21} />
              )}
            </button>

            <div className="min-w-0">
              <p className="text-xs font-medium text-stone-400">
                Eventara
              </p>

              <h1 className="truncate text-lg font-bold text-stone-800">
                Administration
              </h1>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">

            {/* Notifications */}

            <button
              type="button"
              className="
                relative
                rounded-xl
                p-2.5
                text-stone-500
                transition-colors
                hover:bg-stone-100
                hover:text-stone-900
              "
              title="Notifications"
            >
              <Bell size={20} />

              <span
                className="
                  absolute
                  right-2
                  top-2
                  h-2
                  w-2
                  rounded-full
                  bg-amber-500
                  ring-2
                  ring-white
                "
              />
            </button>

            {/* Admin profile */}

            <div
              className="
                hidden
                items-center
                gap-3
                border-l
                border-stone-200
                pl-4
                sm:flex
              "
            >
              <div className="text-right">
                <p className="max-w-[160px] truncate text-sm font-semibold text-stone-800">
                  {adminName}
                </p>

                <p className="text-xs text-stone-400">
                  Administrator
                </p>
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-amber-100
                  text-sm
                  font-bold
                  text-amber-700
                "
              >
                {getInitials(adminName)}
              </div>
            </div>

          </div>
        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================== */}

        <main
          className="
            min-h-[calc(100vh-80px)]
            p-4
            sm:p-6
            lg:p-8
          "
        >
          <AnimatePresence mode="wait">

            <motion.div
              key={location.pathname}
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
                y: -6,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              <Outlet />
            </motion.div>

          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;