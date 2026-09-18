import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Button from "../../components/common/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess(false);

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      /*
        Temporary frontend implementation.

        Later this will be replaced with:

        POST /api/auth/forgot-password

        The backend should send a secure password-reset
        email containing a temporary reset token.
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      setSuccess(true);
    } catch (submitError) {
      console.error(
        "Forgot password error:",
        submitError
      );

      setError(
        "Unable to process your request right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-stone-50">
      {/* =====================================================
          BACKGROUND ANIMATION
      ===================================================== */}

      <motion.div
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl"
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
        className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-orange-200/25 blur-3xl"
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
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-2xl lg:grid-cols-2">
          {/* =================================================
              LEFT BRAND PANEL
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
            {/* Decorative circles */}

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
                Account recovery
              </div>

              <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                Get back to planning your perfect event.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-stone-300">
                Enter the email connected to your
                FunctionPlanner account and we'll help
                you get back into your planning dashboard.
              </p>

              {/* Benefits */}

              <div className="mt-10 space-y-5">
                {[
                  "Secure account recovery",
                  "Keep your event plans organized",
                  "Continue from where you left off",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <span className="text-sm text-stone-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
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
              RIGHT FORM PANEL
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

            {/* Heading */}

            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Mail className="h-6 w-6" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Forgot Password?
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-stone-500">
                Enter your registered email address and
                we'll help you recover your account.
              </p>
            </div>

            {/* =================================================
                SUCCESS STATE
            ================================================= */}

            {success ? (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-stone-900">
                  Request submitted
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-600">
                  If an account exists for{" "}
                  <span className="font-semibold text-stone-800">
                    {email.trim()}
                  </span>
                  , password recovery instructions
                  will be sent to that address.
                </p>

                <p className="mt-3 text-xs leading-5 text-stone-500">
                  In the current frontend-only version,
                  email delivery is simulated. The actual
                  email reset flow will be connected when
                  the backend authentication API is added.
                </p>

                <div className="mt-6">
                  <Button
                    to="/login"
                    variant="primary"
                    size="lg"
                    icon={
                      <ArrowRight className="h-5 w-5" />
                    }
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
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
                    {error}
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
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-stone-700"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setError("");
                        }}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-stone-200 bg-white py-3.5 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                      />
                    </div>
                  </div>

                  {/* Security note */}

                  <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                      <div>
                        <p className="text-sm font-semibold text-stone-700">
                          Account security
                        </p>

                        <p className="mt-1 text-xs leading-5 text-stone-500">
                          Never share your password or
                          password-reset code with anyone.
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
                      ? "Processing..."
                      : "Send Recovery Instructions"}
                  </Button>
                </form>

                {/* Login */}

                <div className="mt-7 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-stone-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>

                {/* Register */}

                <div className="mt-6 border-t border-stone-200 pt-6 text-center">
                  <p className="text-sm text-stone-500">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-bold text-amber-600 transition hover:text-amber-700"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              </>
            )}

            {/* Home */}

            <div className="mt-8 text-center">
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

export default ForgotPassword;