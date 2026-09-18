import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  IndianRupee,
  Receipt,
  ShieldCheck,
  Sparkles,
  Wallet,
  XCircle,
} from "lucide-react";

import { useBooking } from "../../context/BookingContext";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  formatDate,
  formatDateTime,
} from "../../utils/formatDate";

const paymentThemes = {
  paid: {
    card:
      "from-emerald-950/80 via-teal-950/50 to-[#07151a]",
    border: "border-emerald-400/25",
    hover:
      "hover:border-emerald-300/50",
    icon:
      "border-emerald-400/20 bg-emerald-500/15 text-emerald-300",
    glow: "bg-emerald-500/20",
    accent: "text-emerald-300",
    line:
      "from-emerald-400 via-teal-400 to-cyan-400",
  },

  pending: {
    card:
      "from-amber-950/80 via-orange-950/50 to-[#17100a]",
    border: "border-amber-400/25",
    hover:
      "hover:border-amber-300/50",
    icon:
      "border-amber-400/20 bg-amber-500/15 text-amber-300",
    glow: "bg-orange-500/20",
    accent: "text-amber-300",
    line:
      "from-amber-400 via-orange-400 to-yellow-400",
  },

  failed: {
    card:
      "from-rose-950/80 via-pink-950/45 to-[#16090f]",
    border: "border-rose-400/25",
    hover:
      "hover:border-rose-300/50",
    icon:
      "border-rose-400/20 bg-rose-500/15 text-rose-300",
    glow: "bg-rose-500/20",
    accent: "text-rose-300",
    line:
      "from-rose-400 via-pink-500 to-fuchsia-500",
  },

  default: {
    card:
      "from-violet-950/80 via-indigo-950/50 to-[#090b1c]",
    border: "border-violet-400/25",
    hover:
      "hover:border-violet-300/50",
    icon:
      "border-violet-400/20 bg-violet-500/15 text-violet-300",
    glow: "bg-violet-500/20",
    accent: "text-violet-300",
    line:
      "from-violet-400 via-fuchsia-400 to-cyan-400",
  },
};

const getPaymentTheme = (status) => {
  const key = String(status || "").toLowerCase();

  if (key === "paid") {
    return paymentThemes.paid;
  }

  if (
    key === "failed" ||
    key === "refunded"
  ) {
    return paymentThemes.failed;
  }

  if (key === "pending") {
    return paymentThemes.pending;
  }

  return paymentThemes.default;
};

const Payments = () => {
  const navigate = useNavigate();

  const {
    userBookings,
    markPaymentAsPaid,
  } = useBooking();

  const [processingId, setProcessingId] =
    useState(null);

  /* =========================================================
     PAYMENT BOOKINGS
  ========================================================= */

  const paymentBookings = useMemo(() => {
    if (!Array.isArray(userBookings)) {
      return [];
    }

    return [...userBookings].sort(
      (a, b) => {
        const dateA = new Date(
          a?.createdAt ||
            a?.bookingDate ||
            a?.eventDate ||
            0
        ).getTime();

        const dateB = new Date(
          b?.createdAt ||
            b?.bookingDate ||
            b?.eventDate ||
            0
        ).getTime();

        return dateB - dateA;
      }
    );
  }, [userBookings]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getBookingId = (booking) =>
    booking?.id ||
    booking?._id ||
    booking?.bookingNumber;

  const getBookingTitle = (booking) =>
    booking?.eventName ||
    booking?.eventTitle ||
    booking?.event?.title ||
    booking?.title ||
    booking?.name ||
    "Event Booking";

  const getBookingNumber = (booking) =>
    booking?.bookingNumber ||
    booking?.id ||
    booking?._id ||
    "—";

  const getPaymentStatus = (booking) =>
    booking?.paymentStatus ||
    booking?.payment?.status ||
    "Pending";

  const getBookingStatus = (booking) =>
    booking?.status ||
    booking?.bookingStatus ||
    "Pending";

  const getAmount = (booking) =>
    Number(
      booking?.totalAmount ??
        booking?.total ??
        booking?.amount ??
        booking?.finalAmount ??
        0
    ) || 0;

  const getEventDate = (booking) =>
    booking?.eventDate ||
    booking?.date ||
    booking?.event?.date ||
    null;

  const getCreatedDate = (booking) =>
    booking?.createdAt ||
    booking?.bookingDate ||
    booking?.createdDate ||
    null;

  /* =========================================================
     PAYMENT STATS
  ========================================================= */

  const stats = useMemo(() => {
    const total = paymentBookings.reduce(
      (sum, booking) =>
        sum + getAmount(booking),
      0
    );

    const paid = paymentBookings
      .filter(
        (booking) =>
          String(
            getPaymentStatus(booking)
          ).toLowerCase() === "paid"
      )
      .reduce(
        (sum, booking) =>
          sum + getAmount(booking),
        0
      );

    const pending = paymentBookings
      .filter(
        (booking) =>
          String(
            getPaymentStatus(booking)
          ).toLowerCase() === "pending"
      )
      .reduce(
        (sum, booking) =>
          sum + getAmount(booking),
        0
      );

    const failed = paymentBookings.filter(
      (booking) => {
        const status = String(
          getPaymentStatus(booking)
        ).toLowerCase();

        return (
          status === "failed" ||
          status === "refunded"
        );
      }
    ).length;

    return {
      total,
      paid,
      pending,
      failed,
    };
  }, [paymentBookings]);

  /* =========================================================
     MARK PAYMENT AS PAID
  ========================================================= */

  const handleMarkAsPaid = async (
    booking
  ) => {
    const id = getBookingId(booking);

    if (!id) return;

    setProcessingId(id);

    try {
      await markPaymentAsPaid(id);
    } catch (error) {
      console.error(
        "Payment update error:",
        error
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pb-16 text-white">
      {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[-120px] top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[-180px] left-[30%] h-96 w-96 rounded-full bg-fuchsia-600/10 blur-3xl"
          animate={{
            x: [-20, 30, -20],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_35%)]" />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-violet-950/50 via-[#070a18] to-cyan-950/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

        <motion.div
          className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
              <Wallet className="h-4 w-4 text-fuchsia-300" />
              Payments
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            </div>

            <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Payments{" "}
                  <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                    & billing
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  View your booking amounts and keep
                  track of payment status from one
                  beautiful dashboard.
                </p>
              </div>

              <Button
                to="/my-bookings"
                variant="outline"
                size="sm"
                icon={
                  <FileText className="h-4 w-4" />
                }
                className="border-cyan-400/25 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20"
              >
                My Bookings
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================
            STATS
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PaymentStat
            icon={
              <IndianRupee className="h-5 w-5" />
            }
            label="Total booking value"
            value={formatCurrency(
              stats.total
            )}
            delay={0}
            gradient="from-violet-500 to-fuchsia-500"
            iconClass="bg-violet-500/15 text-violet-300 border-violet-400/20"
          />

          <PaymentStat
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            label="Paid amount"
            value={formatCurrency(
              stats.paid
            )}
            delay={0.05}
            gradient="from-emerald-500 to-teal-400"
            iconClass="bg-emerald-500/15 text-emerald-300 border-emerald-400/20"
          />

          <PaymentStat
            icon={
              <Clock3 className="h-5 w-5" />
            }
            label="Pending amount"
            value={formatCurrency(
              stats.pending
            )}
            delay={0.1}
            gradient="from-amber-400 to-orange-500"
            iconClass="bg-amber-500/15 text-amber-300 border-amber-400/20"
          />

          <PaymentStat
            icon={
              <Receipt className="h-5 w-5" />
            }
            label="Payment issues"
            value={String(
              stats.failed
            )}
            delay={0.15}
            gradient="from-rose-500 to-pink-500"
            iconClass="bg-rose-500/15 text-rose-300 border-rose-400/20"
          />
        </div>

        {/* =================================================
            SECURITY NOTE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="relative mt-6 overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-r from-cyan-950/50 via-blue-950/30 to-violet-950/40 p-5 shadow-2xl shadow-black/20"
        >
          <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Your payment information stays organized
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-300">
                Payment status is connected to each
                booking so you can quickly see which
                payments are pending or completed.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            PAYMENT LIST
        ================================================= */}

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-lg shadow-fuchsia-400/50" />

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Payment history
                </h2>
              </div>

              <p className="mt-1.5 text-sm text-slate-400">
                {paymentBookings.length}{" "}
                {paymentBookings.length === 1
                  ? "booking"
                  : "bookings"}{" "}
                found
              </p>
            </div>
          </div>

          {paymentBookings.length ===
          0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/20">
              <EmptyState
                icon="bookings"
                title="No payment records yet"
                description="Once you create a booking, its payment information will appear here."
                action={
                  <Button
                    to="/create-event"
                    variant="primary"
                    icon={
                      <Sparkles className="h-4 w-4" />
                    }
                  >
                    Plan an Event
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {paymentBookings.map(
                  (booking, index) => {
                    const id =
                      getBookingId(
                        booking
                      );

                    const paymentStatus =
                      getPaymentStatus(
                        booking
                      );

                    const bookingStatus =
                      getBookingStatus(
                        booking
                      );

                    const amount =
                      getAmount(
                        booking
                      );

                    const paymentKey =
                      String(
                        paymentStatus
                      ).toLowerCase();

                    const isPaid =
                      paymentKey ===
                      "paid";

                    const isFailed =
                      paymentKey ===
                        "failed" ||
                      paymentKey ===
                        "refunded";

                    const isPending =
                      paymentKey ===
                      "pending";

                    const isCancelled =
                      String(
                        bookingStatus
                      ).toLowerCase() ===
                        "cancelled" ||
                      String(
                        bookingStatus
                      ).toLowerCase() ===
                        "canceled";

                    const theme =
                      getPaymentTheme(
                        paymentStatus
                      );

                    return (
                      <motion.article
                        key={
                          id ||
                          `payment-${index}`
                        }
                        initial={{
                          opacity: 0,
                          y: 18,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                        }}
                        transition={{
                          delay:
                            index * 0.05,
                          duration: 0.35,
                        }}
                        whileHover={{
                          y: -3,
                        }}
                        className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${theme.card} ${theme.border} ${theme.hover} shadow-2xl shadow-black/20 transition-all duration-300`}
                      >
                        {/* Card glow */}

                        <motion.div
                          className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full ${theme.glow} blur-3xl`}
                          animate={{
                            scale: [
                              1,
                              1.15,
                              1,
                            ],
                            opacity: [
                              0.25,
                              0.5,
                              0.25,
                            ],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay:
                              index *
                              0.3,
                          }}
                        />

                        {/* Top gradient line */}

                        <div
                          className={`h-1 w-full bg-gradient-to-r ${theme.line}`}
                        />

                        <div className="relative p-5 sm:p-6">
                          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            {/* Booking info */}

                            <div className="flex min-w-0 items-start gap-4">
                              <motion.div
                                whileHover={{
                                  rotate: 5,
                                  scale: 1.05,
                                }}
                                className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border ${theme.icon}`}
                              >
                                {isPaid ? (
                                  <CheckCircle2 className="h-6 w-6" />
                                ) : isFailed ? (
                                  <XCircle className="h-6 w-6" />
                                ) : (
                                  <CreditCard className="h-6 w-6" />
                                )}
                              </motion.div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="truncate text-base font-bold text-white sm:text-lg">
                                    {getBookingTitle(
                                      booking
                                    )}
                                  </h3>

                                  <StatusBadge
                                    status={
                                      paymentStatus
                                    }
                                    size="sm"
                                  />
                                </div>

                                <p className="mt-1 text-xs text-slate-400">
                                  Booking ID:{" "}
                                  <span className="font-semibold text-slate-200">
                                    {getBookingNumber(
                                      booking
                                    )}
                                  </span>
                                </p>

                                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-300">
                                  {getEventDate(
                                    booking
                                  ) && (
                                    <span className="inline-flex items-center gap-1.5">
                                      <CalendarDays
                                        className={`h-3.5 w-3.5 ${theme.accent}`}
                                      />

                                      {formatDate(
                                        getEventDate(
                                          booking
                                        )
                                      )}
                                    </span>
                                  )}

                                  {getCreatedDate(
                                    booking
                                  ) && (
                                    <span className="inline-flex items-center gap-1.5">
                                      <Clock3 className="h-3.5 w-3.5 text-slate-400" />

                                      Created{" "}
                                      {formatDate(
                                        getCreatedDate(
                                          booking
                                        )
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Amount */}

                            <div className="lg:min-w-[190px] lg:text-right">
                              <p className="text-xs font-medium text-slate-400">
                                Booking amount
                              </p>

                              <p className="mt-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
                                {formatCurrency(
                                  amount
                                )}
                              </p>

                              <div className="mt-2 flex items-center gap-2 lg:justify-end">
                                <span className="text-xs text-slate-400">
                                  Payment:
                                </span>

                                <StatusBadge
                                  status={
                                    paymentStatus
                                  }
                                  size="sm"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Bottom actions */}

                          <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <div
                              className={`flex items-center gap-2 text-xs ${theme.accent}`}
                            >
                              {isPaid ? (
                                <>
                                  <CheckCircle2 className="h-4 w-4" />
                                  Payment completed
                                </>
                              ) : isFailed ? (
                                <>
                                  <XCircle className="h-4 w-4" />
                                  Payment requires
                                  attention
                                </>
                              ) : (
                                <>
                                  <Clock3 className="h-4 w-4" />
                                  Payment is pending
                                </>
                              )}
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row">
                              <Button
                                to={`/my-bookings/${id}`}
                                variant="ghost"
                                size="sm"
                                icon={
                                  <FileText className="h-4 w-4" />
                                }
                                className="border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/10 hover:text-white"
                              >
                                View Booking
                              </Button>

                              {isPending &&
                                !isCancelled && (
                                  <Button
                                    type="button"
                                    variant="primary"
                                    size="sm"
                                    loading={
                                      processingId ===
                                      id
                                    }
                                    onClick={() =>
                                      handleMarkAsPaid(
                                        booking
                                      )
                                    }
                                    icon={
                                      processingId !==
                                        id && (
                                        <CheckCircle2 className="h-4 w-4" />
                                      )
                                    }
                                    className="border border-amber-400/20 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:from-amber-400 hover:to-orange-400"
                                  >
                                    Mark as Paid
                                  </Button>
                                )}

                              {isPaid && (
                                <Button
                                  to={`/my-bookings/${id}`}
                                  variant="outline"
                                  size="sm"
                                  icon={
                                    <Receipt className="h-4 w-4" />
                                  }
                                  className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
                                >
                                  Receipt
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  }
                )}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* =================================================
            PAYMENT INFORMATION
        ================================================= */}

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
            amount: 0.2,
          }}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          <InfoCard
            icon={
              <CreditCard className="h-5 w-5" />
            }
            title="Payment status"
            description="Each booking keeps its own payment status so your records stay organized."
            gradient="from-cyan-500 to-blue-500"
            iconClass="bg-cyan-500/15 text-cyan-300 border-cyan-400/20"
          />

          <InfoCard
            icon={
              <Receipt className="h-5 w-5" />
            }
            title="Booking receipts"
            description="Open a booking to review the complete event and payment information."
            gradient="from-violet-500 to-fuchsia-500"
            iconClass="bg-violet-500/15 text-violet-300 border-violet-400/20"
          />

          <InfoCard
            icon={
              <ShieldCheck className="h-5 w-5" />
            }
            title="Need assistance?"
            description="Contact the planning team if you need help with a payment or booking."
            gradient="from-emerald-500 to-teal-400"
            iconClass="bg-emerald-500/15 text-emerald-300 border-emerald-400/20"
          />
        </motion.section>

        {/* =================================================
            CTA
        ================================================= */}

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
          className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/80 via-fuchsia-950/50 to-cyan-950/60 px-6 py-10 text-white shadow-2xl shadow-black/30 sm:px-10"
        >
          {/* Decorative glows */}

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

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1.5 text-fuchsia-200">
                <Sparkles className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.16em]">
                  Keep planning
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">
                Ready to plan another{" "}
                <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  celebration?
                </span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Start a new event and build your next
                memorable occasion step by step.
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
              Plan New Event
            </Button>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

/* ===========================================================
   PAYMENT STAT
=========================================================== */

const PaymentStat = ({
  icon,
  label,
  value,
  delay,
  gradient,
  iconClass,
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 18,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      delay,
      duration: 0.4,
    }}
    whileHover={{
      y: -4,
    }}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
  >
    <div
      className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-20`}
    />

    <div className="relative flex items-center justify-between">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border ${iconClass}`}
      >
        {icon}
      </div>

      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        Overview
      </span>
    </div>

    <p className="relative mt-5 text-xs font-medium text-slate-400">
      {label}
    </p>

    <p className="relative mt-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-xl font-black text-transparent">
      {value}
    </p>

    <div
      className={`mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r ${gradient} opacity-60`}
    />
  </motion.div>
);

/* ===========================================================
   INFO CARD
=========================================================== */

const InfoCard = ({
  icon,
  title,
  description,
  gradient,
  iconClass,
}) => (
  <motion.div
    whileHover={{
      y: -4,
    }}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
  >
    <div
      className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
    />

    <div
      className={`relative flex h-11 w-11 items-center justify-center rounded-xl border ${iconClass}`}
    >
      {icon}
    </div>

    <h3 className="relative mt-4 text-sm font-bold text-white">
      {title}
    </h3>

    <p className="relative mt-2 text-xs leading-5 text-slate-400">
      {description}
    </p>

    <div
      className={`relative mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r ${gradient} opacity-60`}
    />
  </motion.div>
);

export default Payments;