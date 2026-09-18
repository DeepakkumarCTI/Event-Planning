
import { useMemo, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  MapPin,
  Search,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";

import { useBooking } from "../../context/BookingContext";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const MyBookings = () => {
  const navigate = useNavigate();

  const {
    userBookings,
    cancelBooking,
  } = useBooking();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [showCancelModal, setShowCancelModal] =
    useState(false);

  const [isCancelling, setIsCancelling] =
    useState(false);

  /* =========================================================
     NORMALIZE BOOKINGS
  ========================================================= */

  const bookings = Array.isArray(userBookings)
    ? userBookings
    : [];

  /* =========================================================
     FILTER BOOKINGS
  ========================================================= */

  const filteredBookings = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const title =
        booking.eventName ||
        booking.eventTitle ||
        booking.event?.title ||
        booking.title ||
        booking.name ||
        "";

      const bookingId =
        booking.bookingNumber ||
        booking.id ||
        booking._id ||
        "";

      const matchesSearch =
        !searchValue ||
        String(title)
          .toLowerCase()
          .includes(searchValue) ||
        String(bookingId)
          .toLowerCase()
          .includes(searchValue);

      const bookingStatus = String(
        booking.status ||
          booking.bookingStatus ||
          "pending"
      ).toLowerCase();

      const matchesStatus =
        statusFilter === "all" ||
        bookingStatus ===
          statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    bookings,
    search,
    statusFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const pending = bookings.filter(
      (booking) =>
        String(
          booking.status ||
            booking.bookingStatus ||
            ""
        ).toLowerCase() === "pending"
    ).length;

    const confirmed = bookings.filter(
      (booking) =>
        String(
          booking.status ||
            booking.bookingStatus ||
            ""
        ).toLowerCase() === "confirmed"
    ).length;

    const completed = bookings.filter(
      (booking) =>
        String(
          booking.status ||
            booking.bookingStatus ||
            ""
        ).toLowerCase() === "completed"
    ).length;

    const cancelled = bookings.filter(
      (booking) => {
        const status = String(
          booking.status ||
            booking.bookingStatus ||
            ""
        ).toLowerCase();

        return (
          status === "cancelled" ||
          status === "canceled"
        );
      }
    ).length;

    return {
      total: bookings.length,
      pending,
      confirmed,
      completed,
      cancelled,
    };
  }, [bookings]);

  /* =========================================================
     BOOKING HELPERS
  ========================================================= */

  const getBookingTitle = (booking) =>
    booking.eventName ||
    booking.eventTitle ||
    booking.event?.title ||
    booking.title ||
    booking.name ||
    "Event Booking";

  const getBookingId = (booking) =>
    booking.bookingNumber ||
    booking.id ||
    booking._id ||
    "";

  const getBookingStatus = (booking) =>
    booking.status ||
    booking.bookingStatus ||
    "pending";

  const getPaymentStatus = (booking) =>
    booking.paymentStatus ||
    booking.payment?.status ||
    "pending";

  const getBookingDate = (booking) =>
    booking.eventDate ||
    booking.date ||
    booking.event?.date ||
    booking.bookingDate ||
    null;

  const getGuestCount = (booking) =>
    booking.guestCount ||
    booking.guests ||
    booking.event?.guestCount ||
    0;

  const getLocation = (booking) => {
    if (typeof booking.location === "string") {
      return booking.location;
    }

    if (booking.location) {
      return [
        booking.location.city,
        booking.location.state,
      ]
        .filter(Boolean)
        .join(", ");
    }

    if (booking.shippingAddress) {
      return [
        booking.shippingAddress.city,
        booking.shippingAddress.state,
      ]
        .filter(Boolean)
        .join(", ");
    }

    return (
      booking.event?.location ||
      "Location not specified"
    );
  };

  const getAmount = (booking) =>
    Number(
      booking.totalAmount ??
        booking.total ??
        booking.amount ??
        booking.finalAmount ??
        0
    ) || 0;

  /* =========================================================
     CANCEL BOOKING
  ========================================================= */

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    const bookingId =
      selectedBooking.id ||
      selectedBooking._id;

    if (!bookingId) return;

    setIsCancelling(true);

    try {
      await cancelBooking(bookingId);

      setShowCancelModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error(
        "Cancel booking error:",
        error
      );
    } finally {
      setIsCancelling(false);
    }
  };

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (bookings.length === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
        <BackgroundGlow />

        <section className="relative border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-violet-300"
            >
              <ArrowLeftIcon />
              Dashboard
            </Link>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
                <Sparkles className="h-4 w-4" />
                Your Bookings
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  My Bookings
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Keep track of your event enquiries,
                bookings and confirmations.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl sm:p-10">
            <EmptyState
              icon="bookings"
              title="No bookings yet"
              description="Once you enquire about or book an event service, your bookings will appear here."
              action={
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    to="/events"
                    variant="outline"
                  >
                    Explore Events
                  </Button>

                  <Button
                    to="/services"
                    variant="primary"
                    icon={
                      <Sparkles className="h-4 w-4" />
                    }
                  >
                    Explore Services
                  </Button>
                </div>
              }
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pb-20 text-white">
      <BackgroundGlow />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
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
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-300"
            >
              <ArrowLeftIcon />
              Dashboard
            </Link>

            <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20">
                    <FileText className="h-5 w-5" />
                  </span>

                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-fuchsia-300">
                    Booking Management
                  </p>
                </div>

                <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                  <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                    My Bookings
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  View the status of your event bookings,
                  payment information and scheduled events
                  in one place.
                </p>
              </div>

              <Button
                to="/services"
                variant="primary"
                icon={
                  <Sparkles className="h-4 w-4" />
                }
              >
                Book a Service
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="relative border-b border-white/10 bg-slate-950/30">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <StatCard
              label="Total"
              value={stats.total}
              icon={
                <FileText className="h-5 w-5" />
              }
              active={
                statusFilter === "all"
              }
              onClick={() =>
                setStatusFilter("all")
              }
              theme="violet"
            />

            <StatCard
              label="Pending"
              value={stats.pending}
              icon={
                <Clock3 className="h-5 w-5" />
              }
              active={
                statusFilter === "pending"
              }
              onClick={() =>
                setStatusFilter("pending")
              }
              theme="amber"
            />

            <StatCard
              label="Confirmed"
              value={stats.confirmed}
              icon={
                <CheckCircle2 className="h-5 w-5" />
              }
              active={
                statusFilter === "confirmed"
              }
              onClick={() =>
                setStatusFilter("confirmed")
              }
              theme="cyan"
            />

            <StatCard
              label="Completed"
              value={stats.completed}
              icon={
                <CheckCircle2 className="h-5 w-5" />
              }
              active={
                statusFilter === "completed"
              }
              onClick={() =>
                setStatusFilter("completed")
              }
              theme="emerald"
            />

            <StatCard
              label="Cancelled"
              value={stats.cancelled}
              icon={
                <XCircle className="h-5 w-5" />
              }
              active={
                statusFilter === "cancelled"
              }
              onClick={() =>
                setStatusFilter("cancelled")
              }
              theme="rose"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
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
            delay: 0.15,
          }}
          className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-violet-950/10 backdrop-blur-xl sm:p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-cyan-300" />

            <span className="text-sm font-bold text-white">
              Find a booking
            </span>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by event name or booking ID..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            <div className="relative md:w-56">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3.5 pr-10 text-sm font-semibold text-slate-200 outline-none transition focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-500/10"
              >
                <option value="all">
                  All bookings
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="confirmed">
                  Confirmed
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="cancelled">
                  Cancelled
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          BOOKINGS
      ===================================================== */}

      <section className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-12 text-center backdrop-blur-xl"
          >
            <Search className="mx-auto h-10 w-10 text-violet-300" />

            <h3 className="mt-5 font-black text-white">
              No matching bookings
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              Try another search term or change the
              booking status filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="mt-5 text-sm font-bold text-cyan-300 transition hover:text-fuchsia-300"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <div className="space-y-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-400">
                Showing{" "}
                <span className="font-bold text-white">
                  {filteredBookings.length}
                </span>{" "}
                booking
                {filteredBookings.length !==
                1
                  ? "s"
                  : ""}
              </p>
            </div>

            <AnimatePresence>
              {filteredBookings.map(
                (booking, index) => {
                  const title =
                    getBookingTitle(
                      booking
                    );

                  const bookingId =
                    getBookingId(
                      booking
                    );

                  const status =
                    getBookingStatus(
                      booking
                    );

                  const paymentStatus =
                    getPaymentStatus(
                      booking
                    );

                  const bookingDate =
                    getBookingDate(
                      booking
                    );

                  const guests =
                    getGuestCount(
                      booking
                    );

                  const location =
                    getLocation(
                      booking
                    );

                  const amount =
                    getAmount(
                      booking
                    );

                  const isCancelled =
                    String(
                      status
                    ).toLowerCase() ===
                      "cancelled" ||
                    String(
                      status
                    ).toLowerCase() ===
                      "canceled";

                  const isCompleted =
                    String(
                      status
                    ).toLowerCase() ===
                    "completed";

                  const themes = [
                    {
                      card:
                        "from-violet-950/70 via-fuchsia-950/30 to-slate-950/80",
                      border:
                        "border-violet-400/20 hover:border-violet-400/60",
                      icon:
                        "bg-violet-500/15 text-violet-300",
                      accent:
                        "text-violet-300",
                      line:
                        "from-violet-500 to-fuchsia-500",
                      glow:
                        "bg-violet-500/20",
                    },
                    {
                      card:
                        "from-cyan-950/70 via-blue-950/30 to-slate-950/80",
                      border:
                        "border-cyan-400/20 hover:border-cyan-400/60",
                      icon:
                        "bg-cyan-500/15 text-cyan-300",
                      accent:
                        "text-cyan-300",
                      line:
                        "from-cyan-400 to-blue-500",
                      glow:
                        "bg-cyan-500/20",
                    },
                    {
                      card:
                        "from-amber-950/70 via-orange-950/30 to-slate-950/80",
                      border:
                        "border-amber-400/20 hover:border-amber-400/60",
                      icon:
                        "bg-amber-500/15 text-amber-300",
                      accent:
                        "text-amber-300",
                      line:
                        "from-amber-400 to-orange-500",
                      glow:
                        "bg-amber-500/20",
                    },
                    {
                      card:
                        "from-rose-950/70 via-pink-950/30 to-slate-950/80",
                      border:
                        "border-rose-400/20 hover:border-rose-400/60",
                      icon:
                        "bg-rose-500/15 text-rose-300",
                      accent:
                        "text-rose-300",
                      line:
                        "from-rose-400 to-pink-500",
                      glow:
                        "bg-rose-500/20",
                    },
                    {
                      card:
                        "from-emerald-950/70 via-teal-950/30 to-slate-950/80",
                      border:
                        "border-emerald-400/20 hover:border-emerald-400/60",
                      icon:
                        "bg-emerald-500/15 text-emerald-300",
                      accent:
                        "text-emerald-300",
                      line:
                        "from-emerald-400 to-teal-500",
                      glow:
                        "bg-emerald-500/20",
                    },
                    {
                      card:
                        "from-indigo-950/70 via-purple-950/30 to-slate-950/80",
                      border:
                        "border-indigo-400/20 hover:border-indigo-400/60",
                      icon:
                        "bg-indigo-500/15 text-indigo-300",
                      accent:
                        "text-indigo-300",
                      line:
                        "from-indigo-400 to-purple-500",
                      glow:
                        "bg-indigo-500/20",
                    },
                  ];

                  const theme =
                    themes[
                      index %
                        themes.length
                    ];

                  return (
                    <motion.article
                      key={
                        bookingId ||
                        index
                      }
                      initial={{
                        opacity: 0,
                        y: 20,
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
                      }}
                      whileHover={{
                        y: -4,
                      }}
                      className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${theme.card} ${theme.border} p-5 shadow-xl shadow-black/10 transition sm:p-6`}
                    >
                      {/* Decorative line */}

                      <div
                        className={`absolute left-0 right-0 top-0 h-px bg-gradient-to-r ${theme.line} opacity-80`}
                      />

                      {/* Glow */}

                      <div
                        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full ${theme.glow} opacity-20 blur-3xl transition group-hover:opacity-50`}
                      />

                      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
                        {/* Icon */}

                        <motion.div
                          whileHover={{
                            rotate: 8,
                            scale: 1.05,
                          }}
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${theme.icon}`}
                        >
                          <CalendarDays className="h-7 w-7" />
                        </motion.div>

                        {/* Main */}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="truncate text-lg font-black text-white">
                              {title}
                            </h2>

                            <StatusBadge
                              status={
                                status
                              }
                              size="sm"
                            />
                          </div>

                          <div className="mt-4 grid gap-2 text-xs font-medium text-slate-400 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
                            {bookingId && (
                              <span>
                                Booking ID:{" "}
                                <span className="font-bold text-slate-200">
                                  {bookingId}
                                </span>
                              </span>
                            )}

                            {bookingDate && (
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays
                                  className={`h-3.5 w-3.5 ${theme.accent}`}
                                />
                                <span className="text-slate-300">
                                  {formatDate(
                                    bookingDate
                                  )}
                                </span>
                              </span>
                            )}

                            {guests > 0 && (
                              <span className="inline-flex items-center gap-1.5">
                                <Users
                                  className={`h-3.5 w-3.5 ${theme.accent}`}
                                />
                                <span className="text-slate-300">
                                  {guests} guests
                                </span>
                              </span>
                            )}

                            {location && (
                              <span className="inline-flex min-w-0 items-center gap-1.5">
                                <MapPin
                                  className={`h-3.5 w-3.5 shrink-0 ${theme.accent}`}
                                />
                                <span className="break-words text-slate-300">
                                  {location}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Amount */}

                        <div className="border-t border-white/10 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                          <p className="text-xs font-medium text-slate-500">
                            Total amount
                          </p>

                          <p className="mt-1 text-xl font-black text-white">
                            {formatCurrency(
                              amount
                            )}
                          </p>

                          <p
                            className={`mt-1 text-xs font-bold ${
                              String(
                                paymentStatus
                              ).toLowerCase() ===
                              "paid"
                                ? "text-emerald-300"
                                : "text-amber-300"
                            }`}
                          >
                            Payment:{" "}
                            {paymentStatus}
                          </p>
                        </div>

                        {/* Actions */}

                        <div className="flex shrink-0 flex-col gap-2 lg:w-48">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full border-white/15 bg-white/[0.04] text-slate-100 hover:bg-white/10"
                            onClick={() =>
                              navigate(
                                `/my-bookings/${bookingId}`
                              )
                            }
                            icon={
                              <ArrowRight className="h-4 w-4" />
                            }
                          >
                            View Details
                          </Button>

                          {!isCancelled &&
                            !isCompleted && (
                              <button
                                type="button"
                                onClick={() =>
                                  openCancelModal(
                                    booking
                                  )
                                }
                                className="w-full rounded-xl border border-transparent px-4 py-2.5 text-xs font-bold text-slate-400 transition hover:border-rose-400/20 hover:bg-rose-500/10 hover:text-rose-300"
                              >
                                Cancel Booking
                              </button>
                            )}
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

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="relative mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
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
          className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/80 via-fuchsia-950/60 to-cyan-950/70 px-6 py-10 shadow-2xl shadow-violet-950/20 sm:px-10"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1.5 text-xs font-bold text-fuchsia-200">
                <Sparkles className="h-3.5 w-3.5" />
                Keep Planning
              </span>

              <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                Need something else for your event?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Explore venues and services or continue
                working on your event plan.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                to="/services"
                variant="light"
              >
                Explore Services
              </Button>

              <Button
                to="/my-events"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-slate-950"
              >
                My Events
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          CANCEL MODAL
      ===================================================== */}

      <Modal
        isOpen={showCancelModal}
        onClose={() => {
          if (!isCancelling) {
            setShowCancelModal(false);
            setSelectedBooking(null);
          }
        }}
        title="Cancel this booking?"
        description="This will change the booking status to cancelled. You can contact the planning team if you need assistance."
        size="sm"
      >
        <div className="rounded-2xl border border-rose-400/20 bg-gradient-to-br from-rose-950/60 to-pink-950/30 p-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300">
              <XCircle className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                {selectedBooking
                  ? getBookingTitle(
                      selectedBooking
                    )
                  : "This booking"}
              </p>

              <p className="mt-1 text-xs leading-5 text-rose-200/70">
                Please make sure you want to cancel
                before continuing.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            disabled={isCancelling}
            onClick={() => {
              setShowCancelModal(false);
              setSelectedBooking(null);
            }}
          >
            Keep Booking
          </Button>

          <Button
            type="button"
            variant="danger"
            loading={isCancelling}
            onClick={handleCancelBooking}
            icon={
              !isCancelling && (
                <XCircle className="h-4 w-4" />
              )
            }
          >
            Cancel Booking
          </Button>
        </div>
      </Modal>
    </main>
  );
};

/* ===========================================================
   STAT CARD
=========================================================== */

const StatCard = ({
  label,
  value,
  icon,
  active,
  onClick,
  theme,
}) => {
  const themes = {
    violet: {
      border: "border-violet-400/20",
      active:
        "border-violet-400/50 bg-violet-500/15",
      icon:
        "bg-violet-500/15 text-violet-300",
      activeIcon:
        "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
      value: "text-violet-200",
    },

    amber: {
      border: "border-amber-400/20",
      active:
        "border-amber-400/50 bg-amber-500/15",
      icon:
        "bg-amber-500/15 text-amber-300",
      activeIcon:
        "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
      value: "text-amber-200",
    },

    cyan: {
      border: "border-cyan-400/20",
      active:
        "border-cyan-400/50 bg-cyan-500/15",
      icon:
        "bg-cyan-500/15 text-cyan-300",
      activeIcon:
        "bg-gradient-to-br from-cyan-400 to-blue-500 text-white",
      value: "text-cyan-200",
    },

    emerald: {
      border: "border-emerald-400/20",
      active:
        "border-emerald-400/50 bg-emerald-500/15",
      icon:
        "bg-emerald-500/15 text-emerald-300",
      activeIcon:
        "bg-gradient-to-br from-emerald-400 to-teal-500 text-white",
      value: "text-emerald-200",
    },

    rose: {
      border: "border-rose-400/20",
      active:
        "border-rose-400/50 bg-rose-500/15",
      icon:
        "bg-rose-500/15 text-rose-300",
      activeIcon:
        "bg-gradient-to-br from-rose-500 to-pink-500 text-white",
      value: "text-rose-200",
    },
  };

  const current =
    themes[theme] || themes.violet;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`relative overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-xl transition ${
        active
          ? current.active
          : `${current.border} bg-white/[0.04] hover:bg-white/[0.07]`
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          active
            ? current.activeIcon
            : current.icon
        }`}
      >
        {icon}
      </div>

      <p
        className={`mt-3 text-xl font-black ${
          active
            ? current.value
            : "text-white"
        }`}
      >
        {value}
      </p>

      <p className="mt-0.5 text-xs font-semibold text-slate-400">
        {label}
      </p>
    </motion.button>
  );
};

/* ===========================================================
   BACKGROUND GLOW
=========================================================== */

const BackgroundGlow = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    <motion.div
      animate={{
        x: [0, 60, -30, 0],
        y: [0, -40, 50, 0],
        scale: [1, 1.15, 0.95, 1],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
    />

    <motion.div
      animate={{
        x: [0, -70, 40, 0],
        y: [0, 50, -30, 0],
        scale: [1, 0.9, 1.12, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute right-[-120px] top-72 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-3xl"
    />

    <motion.div
      animate={{
        x: [0, 50, -40, 0],
        y: [0, -30, 50, 0],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl"
    />

    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.08, 0.16, 0.08],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
    />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_40%)]" />
  </div>
);

/* ===========================================================
   BACK ICON
=========================================================== */

const ArrowLeftIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M15 10H5m5-5-5 5 5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MyBookings;

