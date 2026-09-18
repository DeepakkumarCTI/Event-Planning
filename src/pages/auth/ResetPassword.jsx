import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Button from "../../components/common/Button";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setGeneralError("");
  };

  /* =========================================================
     VALIDATE
  ========================================================= */

  const validate = () => {
    const nextErrors = {};

    if (!form.password) {
      nextErrors.password =
        "Please enter your new password.";
    } else if (form.password.length < 6) {
      nextErrors.password =
        "Password must contain at least 6 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword =
        "Please confirm your new password.";
    } else if (
      form.password !== form.confirmPassword
    ) {
      nextErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /* =========================================================
     RESET PASSWORD
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setGeneralError("");

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      /*
        Temporary frontend implementation.

        Later replace this section with:

        POST /api/auth/reset-password

        Example body:

        {
          token,
          password: form.password
        }

        The backend should validate the reset token,
        update the password securely and invalidate
        the token.
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      setSuccess(true);
    } catch (error) {
      console.error(
        "Password reset error:",
        error
      );

      setGeneralError(
        "Unable to reset your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INPUT CLASS
  ========================================================= */

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white py-3.5 pl-11 pr-12 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:ring-4 ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
        : "border-stone-200 focus:border-amber-400 focus:ring-amber-100"
    }`;

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-stone-50">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <motion.div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-200/25 blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.45, 0.25, 0.45],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-2xl lg:grid-cols-2">
          {/* =================================================
              LEFT PANEL
          ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative hidden min-h-[650px] overflow-hidden bg-stone-900 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14"
          >
            <motion.div
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />

            <motion.div
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl"
              animate={{
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
            />

            {/* Logo */}

            <div className="relative">
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-stone-900">
                  <CalendarDays className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xl font-bold">
                    FunctionPlanner
                  </p>

                  <p className="text-xs text-stone-400">
                    Plan. Organize. Celebrate.
                  </p>
                </div>
              </Link>
            </div>

            {/* Content */}

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
                <Sparkles className="h-4 w-4" />
                Secure account recovery
              </div>

              <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                Choose a new password and continue planning.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-stone-300">
                Create a new password for your
                FunctionPlanner account and get back to
                managing your events.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Secure recovery",
                    text: "Your reset request will be handled through a secure recovery process.",
                  },
                  {
                    icon: LockKeyhole,
                    title: "Strong password",
                    text: "Choose a password that is difficult for others to guess.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Continue planning",
                    text: "Return to your account after successfully changing your password.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          0.3 + index * 0.1,
                      }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-stone-400">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom */}

            <div className="relative border-t border-white/10 pt-6">
              <p className="text-sm text-stone-400">
                Remember your password?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-amber-400 transition hover:text-amber-300"
              >
                Back to login
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.section>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="flex min-h-[650px] flex-col justify-center p-6 sm:p-10 lg:p-12 xl:p-14"
          >
            {/* Mobile logo */}

            <div className="mb-10 lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-900 text-amber-400">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-bold text-stone-900">
                    FunctionPlanner
                  </p>

                  <p className="text-xs text-stone-400">
                    Plan. Organize. Celebrate.
                  </p>
                </div>
              </Link>
            </div>

            {/* =================================================
                INVALID / MISSING TOKEN
            ================================================= */}

            {!token ? (
              <>
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <LockKeyhole className="h-7 w-7" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                  Invalid Reset Link
                </h2>

                <p className="mt-4 text-sm leading-7 text-stone-500">
                  This password reset link is missing a
                  valid recovery token. Please request a
                  new password reset link.
                </p>

                <div className="mt-8">
                  <Button
                    to="/forgot-password"
                    variant="primary"
                    size="lg"
                    icon={
                      <ArrowRight className="h-5 w-5" />
                    }
                    className="w-full"
                  >
                    Request New Reset Link
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-stone-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </>
            ) : success ? (
              /* =================================================
                 SUCCESS STATE
              ================================================= */

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                  Password Updated
                </h2>

                <p className="mt-4 text-sm leading-7 text-stone-500">
                  Your password has been updated
                  successfully.
                </p>

                <p className="mt-2 text-sm leading-7 text-stone-500">
                  You can now sign in with your new
                  password and continue planning your
                  events.
                </p>

                <div className="mt-8">
                  <Button
                    to="/login"
                    variant="primary"
                    size="lg"
                    icon={
                      <ArrowRight className="h-5 w-5" />
                    }
                    className="w-full"
                  >
                    Continue to Login
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* =================================================
                    HEADING
                ================================================= */}

                <div className="mb-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <LockKeyhole className="h-6 w-6" />
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                    Reset Password
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-stone-500">
                    Create a new password for your
                    FunctionPlanner account.
                  </p>
                </div>

                {/* Error */}

                {generalError && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600"
                  >
                    {generalError}
                  </motion.div>
                )}

                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* New password */}

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-stone-700"
                    >
                      New password
                    </label>

                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

                      <input
                        id="password"
                        name="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="new-password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className={inputClass(
                          "password"
                        )}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (previous) => !previous
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

                    {errors.password && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.password}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-stone-400">
                      Use at least 6 characters.
                    </p>
                  </div>

                  {/* Confirm password */}

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-stone-700"
                    >
                      Confirm new password
                    </label>

                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="new-password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className={inputClass(
                          "confirmPassword"
                        )}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (previous) => !previous
                          )
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Security */}

                  <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                      <div>
                        <p className="text-sm font-semibold text-stone-700">
                          Keep your account secure
                        </p>

                        <p className="mt-1 text-xs leading-5 text-stone-500">
                          Don't reuse passwords from other
                          accounts and never share your
                          password with anyone.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    disabled={loading}
                    icon={
                      !loading && (
                        <ArrowRight className="h-5 w-5" />
                      )
                    }
                    className="w-full"
                  >
                    {loading
                      ? "Updating Password..."
                      : "Update Password"}
                  </Button>
                </form>

                {/* Back */}

                <div className="mt-7 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-stone-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </>
            )}

            {/* Home */}

            <div className="mt-8 border-t border-stone-200 pt-6 text-center">
              <Link
                to="/"
                className="text-sm font-semibold text-stone-400 transition hover:text-stone-700"
              >
                ← Back to FunctionPlanner
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;