import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  User,
  UserRound,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useEvent } from "../../context/EventContext";
import { useBooking } from "../../context/BookingContext";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { formatDate } from "../../utils/formatDate";

/* =========================================================
   STORAGE
========================================================= */

const PROFILE_KEY = "functionPlannerProfile";

/* =========================================================
   PROFILE
========================================================= */

const Profile = () => {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const {
    userEvents = [],
  } = useEvent();

  const {
    userBookings = [],
  } = useBooking();

  /* =======================================================
     PROFILE STATE
  ======================================================= */

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    bio: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    bio: "",
  });

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  /* =======================================================
     LOAD PROFILE
  ======================================================= */

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    let savedProfile = null;

    try {
      const stored = localStorage.getItem(
        PROFILE_KEY
      );

      if (stored) {
        savedProfile = JSON.parse(stored);
      }
    } catch (error) {
      console.error(
        "Unable to load profile:",
        error
      );
    }

    const initialProfile = {
      name:
        savedProfile?.name ||
        user?.name ||
        user?.fullName ||
        user?.username ||
        "",
      email:
        savedProfile?.email ||
        user?.email ||
        "",
      phone:
        savedProfile?.phone ||
        user?.phone ||
        "",
      city:
        savedProfile?.city ||
        user?.city ||
        "",
      state:
        savedProfile?.state ||
        user?.state ||
        "",
      bio:
        savedProfile?.bio ||
        "",
    };

    setProfile(initialProfile);
    setFormData(initialProfile);
  }, [
    isAuthenticated,
    navigate,
    user,
  ]);

  /* =======================================================
     PROFILE INITIALS
  ======================================================= */

  const initials = useMemo(() => {
    const name =
      profile.name ||
      user?.name ||
      user?.fullName ||
      "Function Planner";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0).toUpperCase()
      )
      .join("");
  }, [
    profile.name,
    user,
  ]);

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    const events =
      Array.isArray(userEvents)
        ? userEvents
        : [];

    const bookings =
      Array.isArray(userBookings)
        ? userBookings
        : [];

    return {
      events: events.length,

      upcomingEvents: events.filter(
        (event) =>
          event.status !==
            "Completed" &&
          event.status !==
            "completed"
      ).length,

      bookings: bookings.length,

      completedBookings:
        bookings.filter(
          (booking) => {
            const status =
              String(
                booking.status ||
                  booking.bookingStatus ||
                  ""
              ).toLowerCase();

            return (
              status ===
                "completed" ||
              status === "complete"
            );
          }
        ).length,
    };
  }, [
    userEvents,
    userBookings,
  ]);

  /* =======================================================
     INPUT HANDLER
  ======================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  const handleSave = async () => {
    if (!formData.name.trim()) {
      return;
    }

    setSaving(true);
    setSuccessMessage("");

    const cleanedProfile = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      bio: formData.bio.trim(),
    };

    try {
      localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(cleanedProfile)
      );

      setProfile(cleanedProfile);
      setFormData(cleanedProfile);
      setEditing(false);

      setSuccessMessage(
        "Profile updated successfully."
      );

      window.setTimeout(() => {
        setSuccessMessage("");
      }, 3500);
    } catch (error) {
      console.error(
        "Unable to save profile:",
        error
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     CANCEL EDIT
  ======================================================= */

  const handleCancelEdit = () => {
    setFormData(profile);
    setEditing(false);
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setShowLogoutModal(false);

      navigate("/", {
        replace: true,
      });
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pb-16 text-white">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[-160px] top-20 h-[430px] w-[430px] rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[-180px] left-[25%] h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-3xl"
          animate={{
            x: [-30, 30, -30],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_38%)]" />
      </div>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-violet-950/55 via-[#070a18] to-cyan-950/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

        <motion.div
          className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
              <UserRound className="h-4 w-4 text-fuchsia-300" />
              Account
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            </div>

            <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  My{" "}
                  <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                    Profile
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Manage your personal details and
                  planning account information from one
                  place.
                </p>
              </div>

              {!editing && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setEditing(true)
                  }
                  icon={
                    <Edit3 className="h-4 w-4" />
                  }
                  className="border-violet-400/25 bg-violet-500/10 text-violet-100 hover:bg-violet-500/20"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <motion.aside
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="relative h-fit overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            {/* Card glow */}

            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              {/* Avatar */}

              <div className="relative">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                  }}
                  className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-3xl font-black text-white shadow-xl shadow-violet-500/20"
                >
                  {initials}

                  <div className="absolute inset-0 rounded-3xl bg-white/10" />
                </motion.div>

                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#080b1c] bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
                  <Check className="h-4 w-4" />
                </div>
              </div>

              <h2 className="mt-5 text-xl font-bold text-white">
                {profile.name ||
                  "Your Name"}
              </h2>

              <p className="mt-1 break-all text-sm text-slate-400">
                {profile.email ||
                  "Add your email"}
              </p>

              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Customer Account
              </span>
            </div>

            {/* Stats */}

            <div className="relative mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-black/10">
              <ProfileStat
                value={stats.events}
                label="Events"
                gradient="from-violet-400 to-fuchsia-400"
              />

              <ProfileStat
                value={stats.bookings}
                label="Bookings"
                borderLeft
                gradient="from-cyan-400 to-blue-400"
              />

              <ProfileStat
                value={
                  stats.upcomingEvents
                }
                label="Upcoming"
                borderTop
                gradient="from-amber-400 to-orange-400"
              />

              <ProfileStat
                value={
                  stats.completedBookings
                }
                label="Completed"
                borderLeft
                borderTop
                gradient="from-emerald-400 to-teal-400"
              />
            </div>

            {/* Account links */}

            <div className="relative mt-6 space-y-1">
              <ProfileLink
                to="/notifications"
                icon={
                  <Bell className="h-4 w-4" />
                }
                label="Notifications"
                iconClass="text-fuchsia-300"
                hoverClass="hover:bg-fuchsia-500/10 hover:text-fuchsia-200"
              />

              <ProfileLink
                to="/my-bookings"
                icon={
                  <CalendarDays className="h-4 w-4" />
                }
                label="My Bookings"
                iconClass="text-cyan-300"
                hoverClass="hover:bg-cyan-500/10 hover:text-cyan-200"
              />

              <ProfileLink
                to="/event-planner"
                icon={
                  <Sparkles className="h-4 w-4" />
                }
                label="Event Planner"
                iconClass="text-violet-300"
                hoverClass="hover:bg-violet-500/10 hover:text-violet-200"
              />
            </div>

            {/* Logout */}

            <div className="relative mt-5 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={() =>
                  setShowLogoutModal(
                    true
                  )
                }
                className="group flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-3 text-sm font-semibold text-rose-300 transition hover:border-rose-400/15 hover:bg-rose-500/10"
              >
                <span className="flex items-center gap-3">
                  <Lock className="h-4 w-4" />
                  Logout
                </span>

                <ChevronRight className="h-4 w-4 text-rose-400/60 transition group-hover:translate-x-1 group-hover:text-rose-300" />
              </button>
            </div>
          </motion.aside>

          {/* =================================================
              PROFILE DETAILS
          ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
            }}
            className="min-w-0"
          >
            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            <AnimatePresence>
              {successMessage && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 shadow-lg shadow-emerald-500/5"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />

                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50" />

                    <h2 className="text-lg font-bold text-white">
                      Personal information
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Keep your contact information up to
                    date.
                  </p>
                </div>

                {!editing && (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Account protected
                  </span>
                )}
              </div>

              <div className="relative p-5 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <ProfileField
                    label="Full name"
                    name="name"
                    value={
                      editing
                        ? formData.name
                        : profile.name
                    }
                    onChange={
                      handleChange
                    }
                    icon={
                      <User className="h-4 w-4" />
                    }
                    editing={editing}
                    placeholder="Enter your full name"
                    focusColor="violet"
                  />

                  <ProfileField
                    label="Email address"
                    name="email"
                    type="email"
                    value={
                      editing
                        ? formData.email
                        : profile.email
                    }
                    onChange={
                      handleChange
                    }
                    icon={
                      <Mail className="h-4 w-4" />
                    }
                    editing={editing}
                    placeholder="Enter your email"
                    focusColor="cyan"
                  />

                  <ProfileField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={
                      editing
                        ? formData.phone
                        : profile.phone
                    }
                    onChange={
                      handleChange
                    }
                    icon={
                      <Phone className="h-4 w-4" />
                    }
                    editing={editing}
                    placeholder="Enter your phone number"
                    focusColor="fuchsia"
                  />

                  <ProfileField
                    label="City"
                    name="city"
                    value={
                      editing
                        ? formData.city
                        : profile.city
                    }
                    onChange={
                      handleChange
                    }
                    icon={
                      <MapPin className="h-4 w-4" />
                    }
                    editing={editing}
                    placeholder="Enter your city"
                    focusColor="amber"
                  />

                  <ProfileField
                    label="State"
                    name="state"
                    value={
                      editing
                        ? formData.state
                        : profile.state
                    }
                    onChange={
                      handleChange
                    }
                    icon={
                      <MapPin className="h-4 w-4" />
                    }
                    editing={editing}
                    placeholder="Enter your state"
                    focusColor="emerald"
                  />
                </div>

                {/* Bio */}

                <div className="mt-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                    About you
                  </label>

                  {editing ? (
                    <textarea
                      name="bio"
                      value={
                        formData.bio
                      }
                      onChange={
                        handleChange
                      }
                      rows={4}
                      maxLength={300}
                      placeholder="Tell us a little about yourself or the kinds of events you enjoy planning..."
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/50 focus:bg-violet-500/[0.04] focus:ring-4 focus:ring-violet-500/10"
                    />
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm leading-6 text-slate-300">
                      {profile.bio ||
                        "No profile description added yet."}
                    </div>
                  )}

                  {editing && (
                    <p className="mt-1 text-right text-[11px] text-slate-500">
                      {formData.bio.length}/300
                    </p>
                  )}
                </div>

                {/* Edit actions */}

                <AnimatePresence>
                  {editing && (
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
                      className="overflow-hidden"
                    >
                      <div className="mt-6 flex flex-col-reverse gap-2 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={
                            handleCancelEdit
                          }
                          icon={
                            <X className="h-4 w-4" />
                          }
                          className="border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10 hover:text-white"
                        >
                          Cancel
                        </Button>

                        <Button
                          type="button"
                          variant="primary"
                          loading={saving}
                          disabled={
                            !formData.name.trim()
                          }
                          onClick={
                            handleSave
                          }
                          icon={
                            <Save className="h-4 w-4" />
                          }
                          className="border border-violet-400/20 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20 hover:from-violet-400 hover:via-fuchsia-400 hover:to-cyan-400"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* =================================================
                ACCOUNT SECURITY
            ================================================= */}

            <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="absolute -left-20 -top-24 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative border-b border-white/10 p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />

                  <h2 className="text-lg font-bold text-white">
                    Account & security
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Manage your account access and preferences.
                </p>
              </div>

              <div className="relative divide-y divide-white/10">
                <SecurityRow
                  icon={
                    <Mail className="h-5 w-5" />
                  }
                  title="Email address"
                  description={
                    profile.email ||
                    "No email address added"
                  }
                  action="Verified"
                  verified
                  theme="cyan"
                />

                <SecurityRow
                  icon={
                    <Lock className="h-5 w-5" />
                  }
                  title="Password"
                  description="Your account password is securely stored."
                  action="Change"
                  onClick={() =>
                    navigate(
                      "/forgot-password"
                    )
                  }
                  theme="violet"
                />

                <SecurityRow
                  icon={
                    <Bell className="h-5 w-5" />
                  }
                  title="Notifications"
                  description="Review your booking and planning updates."
                  action="View"
                  onClick={() =>
                    navigate(
                      "/notifications"
                    )
                  }
                  theme="fuchsia"
                />
              </div>
            </div>

            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <QuickAction
                to="/my-events"
                icon={
                  <CalendarDays className="h-5 w-5" />
                }
                title="My Events"
                description="View and manage your planned events."
                gradient="from-violet-500 to-fuchsia-500"
                iconClass="bg-violet-500/15 text-violet-300 border-violet-400/20"
              />

              <QuickAction
                to="/my-bookings"
                icon={
                  <CheckCircle2 className="h-5 w-5" />
                }
                title="My Bookings"
                description="Track your service and venue bookings."
                gradient="from-cyan-500 to-blue-500"
                iconClass="bg-cyan-500/15 text-cyan-300 border-cyan-400/20"
              />

              <QuickAction
                to="/favourites"
                icon={
                  <Sparkles className="h-5 w-5" />
                }
                title="Favourites"
                description="Return to the ideas you saved."
                gradient="from-amber-400 to-orange-500"
                iconClass="bg-amber-500/15 text-amber-300 border-amber-400/20"
              />

              <QuickAction
                to="/contact"
                icon={
                  <Mail className="h-5 w-5" />
                }
                title="Need Help?"
                description="Send us an enquiry about your event."
                gradient="from-emerald-500 to-teal-400"
                iconClass="bg-emerald-500/15 text-emerald-300 border-emerald-400/20"
              />
            </div>
          </motion.section>
        </div>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/85 via-fuchsia-950/50 to-cyan-950/70 px-6 py-9 text-white shadow-2xl shadow-black/30 sm:px-10"
        >
          <motion.div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="absolute -bottom-28 left-20 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1.5 text-fuchsia-200">
                <Sparkles className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.16em]">
                  FunctionPlanner
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                Ready to plan your{" "}
                <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  next event?
                </span>
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Start with your event details and build
                your plan step by step.
              </p>
            </div>

            <Button
              to="/create-event"
              variant="light"
              size="lg"
              icon={
                <ArrowRight className="h-4 w-4" />
              }
              className="bg-white text-slate-950 shadow-xl shadow-black/20 hover:bg-cyan-50"
            >
              Create Event
            </Button>
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          LOGOUT MODAL
      ===================================================== */}

      <Modal
        isOpen={showLogoutModal}
        onClose={() =>
          setShowLogoutModal(false)
        }
        title="Logout from FunctionPlanner?"
        description="You can sign in again anytime to continue planning your events."
        size="sm"
      >
        <div className="rounded-2xl border border-rose-400/20 bg-gradient-to-br from-rose-950/50 via-pink-950/20 to-slate-950 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-500/15 text-rose-300">
              <Lock className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Sign out of your account
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Your saved planning information remains
                in this browser.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              setShowLogoutModal(false)
            }
            className="border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10 hover:text-white"
          >
            Stay Logged In
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={
              handleLogout
            }
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-400 hover:to-pink-400"
          >
            Logout
          </Button>
        </div>
      </Modal>
    </main>
  );
};

/* ===========================================================
   PROFILE STAT
=========================================================== */

const ProfileStat = ({
  value,
  label,
  borderLeft = false,
  borderTop = false,
  gradient,
}) => (
  <div
    className={`group relative overflow-hidden p-4 text-center ${
      borderLeft
        ? "border-l border-white/10"
        : ""
    } ${
      borderTop
        ? "border-t border-white/10"
        : ""
    }`}
  >
    <div
      className={`absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-gradient-to-r ${gradient} opacity-50`}
    />

    <p
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-xl font-black text-transparent`}
    >
      {value}
    </p>

    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
      {label}
    </p>
  </div>
);

/* ===========================================================
   PROFILE LINK
=========================================================== */

const ProfileLink = ({
  to,
  icon,
  label,
  iconClass,
  hoverClass,
}) => (
  <Link
    to={to}
    className={`group flex items-center justify-between rounded-xl border border-transparent px-3 py-3 text-sm font-semibold text-slate-400 transition ${hoverClass}`}
  >
    <span className="flex items-center gap-3">
      <span className={iconClass}>
        {icon}
      </span>

      {label}
    </span>

    <ChevronRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-white" />
  </Link>
);

/* ===========================================================
   PROFILE FIELD
=========================================================== */

const ProfileField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon,
  editing,
  placeholder,
  focusColor = "violet",
}) => {
  const focusStyles = {
    violet:
      "focus:border-violet-400/50 focus:bg-violet-500/[0.04] focus:ring-violet-500/10",
    cyan:
      "focus:border-cyan-400/50 focus:bg-cyan-500/[0.04] focus:ring-cyan-500/10",
    fuchsia:
      "focus:border-fuchsia-400/50 focus:bg-fuchsia-500/[0.04] focus:ring-fuchsia-500/10",
    amber:
      "focus:border-amber-400/50 focus:bg-amber-500/[0.04] focus:ring-amber-500/10",
    emerald:
      "focus:border-emerald-400/50 focus:bg-emerald-500/[0.04] focus:ring-emerald-500/10",
  };

  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {editing ? (
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </span>

          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className={`h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-4 ${focusStyles[focusColor]}`}
          />
        </div>
      ) : (
        <div className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-slate-300">
          <span className="shrink-0 text-slate-500">
            {icon}
          </span>

          <span className="truncate">
            {value || "Not provided"}
          </span>
        </div>
      )}
    </div>
  );
};

/* ===========================================================
   SECURITY ROW
=========================================================== */

const SecurityRow = ({
  icon,
  title,
  description,
  action,
  verified = false,
  onClick,
  theme = "cyan",
}) => {
  const themeStyles = {
    cyan: {
      icon: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
      button:
        "text-cyan-200 hover:bg-cyan-500/10",
    },

    violet: {
      icon: "border-violet-400/20 bg-violet-500/10 text-violet-300",
      button:
        "text-violet-200 hover:bg-violet-500/10",
    },

    fuchsia: {
      icon: "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300",
      button:
        "text-fuchsia-200 hover:bg-fuchsia-500/10",
    },
  };

  const styles =
    themeStyles[theme] ||
    themeStyles.cyan;

  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${styles.icon}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-white">
            {title}
          </h3>

          <p className="mt-1 truncate text-xs text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className={`inline-flex w-fit items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${styles.button}`}
        >
          {action}

          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      ) : (
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${
            verified
              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
              : "border-white/10 bg-white/[0.04] text-slate-400"
          }`}
        >
          {verified && (
            <Check className="h-3.5 w-3.5" />
          )}

          {action}
        </span>
      )}
    </div>
  );
};

/* ===========================================================
   QUICK ACTION
=========================================================== */

const QuickAction = ({
  to,
  icon,
  title,
  description,
  gradient,
  iconClass,
}) => (
  <Link
    to={to}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.065]"
  >
    <div
      className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-25`}
    />

    <div className="relative flex items-center justify-between">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border ${iconClass}`}
      >
        {icon}
      </div>

      <ArrowRight className="h-4 w-4 text-slate-600 transition duration-300 group-hover:translate-x-1 group-hover:text-white" />
    </div>

    <h3 className="relative mt-4 text-sm font-bold text-white">
      {title}
    </h3>

    <p className="relative mt-1 text-xs leading-5 text-slate-500">
      {description}
    </p>

    <div
      className={`relative mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r ${gradient} opacity-60 transition-all duration-300 group-hover:w-20`}
    />
  </Link>
);

export default Profile;