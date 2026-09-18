import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import Logo from "../../components/common/Logo";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    adminLogin,
    isAdminAuthenticated,
  } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================================================
     REDIRECT IF ALREADY LOGGED IN
  ========================================================= */

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate(
        location.state?.from?.pathname ||
          "/admin/dashboard",
        {
          replace: true,
        }
      );
    }
  }, [
    isAdminAuthenticated,
    navigate,
    location.state,
  ]);

  /* =========================================================
     INPUT HANDLER
  ========================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const email =
      formData.email.trim();

    const password =
      formData.password;

    if (!email) {
      setError(
        "Please enter your admin email address."
      );
      return;
    }

    if (!password) {
      setError(
        "Please enter your admin password."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      /*
       * AuthContext currently supports the
       * frontend/localStorage authentication flow.
       *
       * Later, adminLogin() can be connected
       * directly to your backend JWT API.
       */

      const result =
        await adminLogin(
          email,
          password
        );

      if (
        result === false ||
        result?.success === false
      ) {
        throw new Error(
          result?.message ||
            "Invalid admin email or password."
        );
      }

      const destination =
        location.state?.from?.pathname ||
        "/admin/dashboard";

      navigate(destination, {
        replace: true,
      });
    } catch (loginError) {
      console.error(
        "Admin login error:",
        loginError
      );

      setError(
        loginError?.message ||
          "Unable to sign in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-100">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* =================================================
            LEFT BRAND PANEL
        ================================================= */}

        <section className="relative hidden overflow-hidden bg-stone-900 lg:flex">
          {/* Background decoration */}

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

          <motion.div
            animate={{
              rotate: [0, 8, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-20 top-24 h-40 w-40 rounded-full border border-amber-400/10"
          />

          <motion.div
            animate={{
              rotate: [0, -10, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-24 left-20 h-56 w-56 rounded-full border border-white/5"
          />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Brand */}

            <Logo to="/" variant="light" subtitle="Admin Console" badge="Admin" />

            {/* Main content */}

            <div className="max-w-xl">
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
                  delay: 0.15,
                }}
              >
                <div className="mb-6 flex items-center gap-2 text-amber-400">
                  <ShieldCheck className="h-5 w-5" />

                  <span className="text-xs font-bold uppercase tracking-[0.18em]">
                    Secure Administration
                  </span>
                </div>

                <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-white xl:text-6xl">
                  Manage every event from one place.
                </h1>

                <p className="mt-6 max-w-lg text-base leading-7 text-stone-400">
                  Keep events, bookings, services, customers,
                  enquiries and payments organized through your
                  Eventara administration workspace.
                </p>
              </motion.div>

              {/* Feature cards */}

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <AdminFeature
                  icon={
                    <BarChart3 className="h-5 w-5" />
                  }
                  title="Analytics"
                  description="Track activity"
                />

                <AdminFeature
                  icon={
                    <CalendarDays className="h-5 w-5" />
                  }
                  title="Bookings"
                  description="Manage events"
                />

                <AdminFeature
                  icon={
                    <Users className="h-5 w-5" />
                  }
                  title="Customers"
                  description="Manage users"
                />
              </div>
            </div>

            {/* Bottom */}

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <LockKeyhole className="h-4 w-4" />

              <span>
                Authorized administrators only
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            RIGHT LOGIN PANEL
        ================================================= */}

        <section className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            {/* Mobile brand */}

            <div className="mb-8 lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-stone-950">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-bold text-stone-900">
                    Eventara
                  </p>

                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-stone-400">
                    Admin Console
                  </p>
                </div>
              </Link>
            </div>

            {/* Back link */}

            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-stone-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </Link>

            {/* Heading */}

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
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-stone-900">
                Admin Login
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Sign in to access the Eventara
                administration panel.
              </p>
            </motion.div>

            {/* =================================================
                ERROR
            ================================================= */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-red-700">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                FORM
            ================================================= */}

            <motion.form
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
              onSubmit={
                handleSubmit
              }
              className="mt-8"
            >
              {/* Email */}

              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-600"
                >
                  Admin Email
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="admin@example.com"
                    className="h-13 w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>
              </div>

              {/* Password */}

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="admin-password"
                    className="text-xs font-bold uppercase tracking-wider text-stone-600"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-amber-700 transition hover:text-amber-800"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

                  <input
                    id="admin-password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your password"
                    className="h-13 w-full rounded-xl border border-stone-200 bg-white pl-12 pr-12 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) =>
                          !value
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}

              <div className="mt-7">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={
                    !formData.email.trim() ||
                    !formData.password
                  }
                  className="w-full justify-center"
                  icon={
                    !loading ? (
                      <ArrowRight className="h-4 w-4" />
                    ) : null
                  }
                >
                  Sign In to Admin Panel
                </Button>
              </div>
            </motion.form>

            {/* =================================================
                SECURITY INFO
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.25,
              }}
              className="mt-7 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-bold text-stone-800">
                    Protected admin area
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-stone-400">
                    Only authorized administrators should use
                    this login. Never share your admin credentials.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="mt-8 text-center">
              <p className="text-xs text-stone-400">
                Eventara Admin Console
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

/* ===========================================================
   ADMIN FEATURE
=========================================================== */

const AdminFeature = ({
  icon,
  title,
  description,
}) => (
  <motion.div
    whileHover={{
      y: -3,
    }}
    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
      {icon}
    </div>

    <p className="mt-3 text-sm font-bold text-white">
      {title}
    </p>

    <p className="mt-1 text-[11px] text-stone-500">
      {description}
    </p>
  </motion.div>
);

export default AdminLogin;