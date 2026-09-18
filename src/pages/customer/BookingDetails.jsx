import { useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Phone,
  Sparkles,
  User,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

import { useBooking } from "../../context/BookingContext";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  formatDate,
  formatDateTime,
} from "../../utils/formatDate";

const BookingDetails = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const {
    bookings,
    userBookings,
    getBookingById,
    cancelBooking,
  } = useBooking();

  const [showCancelModal, setShowCancelModal] =
    useState(false);

  const [isCancelling, setIsCancelling] =
    useState(false);

  /* =========================================================
     FIND BOOKING
  ========================================================= */

  const booking = useMemo(() => {
    if (!bookingId) return null;

    const fromContext =
      getBookingById(bookingId);

    if (fromContext) {
      return fromContext;
    }

    const allBookings = [
      ...(Array.isArray(userBookings)
        ? userBookings
        : []),
      ...(Array.isArray(bookings)
        ? bookings
        : []),
    ];

    return (
      allBookings.find(
        (item) =>
          String(item.id) ===
            String(bookingId) ||
          String(item._id) ===
            String(bookingId) ||
          String(item.bookingNumber) ===
            String(bookingId)
      ) || null
    );
  }, [
    bookingId,
    bookings,
    userBookings,
    getBookingById,
  ]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getTitle = () =>
    booking?.eventName ||
    booking?.eventTitle ||
    booking?.event?.title ||
    booking?.title ||
    booking?.name ||
    "Event Booking";

  const getBookingNumber = () =>
    booking?.bookingNumber ||
    booking?.id ||
    booking?._id ||
    "—";

  const getStatus = () =>
    booking?.status ||
    booking?.bookingStatus ||
    "pending";

  const getPaymentStatus = () =>
    booking?.paymentStatus ||
    booking?.payment?.status ||
    "pending";

  const getDate = () =>
    booking?.eventDate ||
    booking?.date ||
    booking?.event?.date ||
    null;

  const getGuestCount = () =>
    booking?.guestCount ||
    booking?.guests ||
    booking?.event?.guestCount ||
    0;

  const getAmount = () =>
    Number(
      booking?.totalAmount ??
        booking?.total ??
        booking?.amount ??
        booking?.finalAmount ??
        0
    ) || 0;

  const getLocation = () => {
    if (
      typeof booking?.location ===
      "string"
    ) {
      return booking.location;
    }

    if (booking?.location) {
      return [
        booking.location.address,
        booking.location.city,
        booking.location.state,
      ]
        .filter(Boolean)
        .join(", ");
    }

    return (
      booking?.event?.location ||
      "Location not specified"
    );
  };

  const getCustomerName = () =>
    booking?.customerName ||
    booking?.customer?.name ||
    booking?.user?.name ||
    booking?.user?.fullName ||
    booking?.name ||
    "Customer";

  const getCustomerEmail = () =>
    booking?.customerEmail ||
    booking?.customer?.email ||
    booking?.user?.email ||
    booking?.email ||
    "Not provided";

  const getCustomerPhone = () =>
    booking?.customerPhone ||
    booking?.customer?.phone ||
    booking?.user?.phone ||
    booking?.phone ||
    "Not provided";

  const getCreatedDate = () =>
    booking?.createdAt ||
    booking?.bookingDate ||
    booking?.createdDate ||
    null;

  /* =========================================================
     SERVICES
  ========================================================= */

  const bookingServices = useMemo(() => {
    if (!booking) return [];

    const source =
      booking.services ||
      booking.selectedServices ||
      booking.items ||
      [];

    if (!Array.isArray(source)) {
      return [];
    }

    return source;
  }, [booking]);

  /* =========================================================
     STATUS
  ========================================================= */

  const status = String(
    getStatus()
  ).toLowerCase();

  const isCancelled =
    status === "cancelled" ||
    status === "canceled";

  const isCompleted =
    status === "completed";

  const isConfirmed =
    status === "confirmed";

  const timeline = [
    {
      title: "Booking submitted",
      description:
        "Your booking request has been received.",
      completed: true,
      gradient:
        "from-violet-500 to-fuchsia-500",
      soft:
        "bg-violet-500/10",
      text:
        "text-violet-300",
    },
    {
      title: "Booking confirmed",
      description:
        "The planning team has confirmed your booking.",
      completed:
        isConfirmed ||
        isCompleted,
      gradient:
        "from-cyan-500 to-blue-500",
      soft:
        "bg-cyan-500/10",
      text:
        "text-cyan-300",
    },
    {
      title: "Event completed",
      description:
        "Your event has been completed.",
      completed: isCompleted,
      gradient:
        "from-amber-400 to-orange-500",
      soft:
        "bg-amber-500/10",
      text:
        "text-amber-300",
    },
  ];

  /* =========================================================
     CANCEL
  ========================================================= */

  const handleCancel = async () => {
    if (!booking) return;

    const id =
      booking.id ||
      booking._id;

    if (!id) return;

    setIsCancelling(true);

    try {
      await cancelBooking(id);

      setShowCancelModal(false);
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
     NOT FOUND
  ========================================================= */

  if (!booking) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
            <EmptyState
              icon="bookings"
              title="Booking not found"
              description="We couldn't find the booking you're looking for. It may have been removed or the booking ID may be incorrect."
              action={
                <Button
                  to="/my-bookings"
                  variant="primary"
                  icon={
                    <ArrowLeft className="h-4 w-4" />
                  }
                >
                  Back to My Bookings
                </Button>
              }
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pb-20 text-white">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-150px] top-[20%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-150px] left-[35%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-3xl"
        />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative border-b border-white/10 bg-slate-950/80 pt-28 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
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
            {/* Breadcrumb */}

            <Link
              to="/my-bookings"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-violet-300"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition group-hover:border-violet-400/40 group-hover:bg-violet-500/10">
                <ArrowLeft className="h-4 w-4" />
              </span>

              My Bookings
            </Link>

            <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/20">
                    <FileText className="relative z-10 h-5 w-5 text-white" />

                    <div className="absolute inset-0 bg-white/20 blur-md" />
                  </div>

                  <StatusBadge
                    status={getStatus()}
                  />
                </div>

                <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {getTitle()}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                  <span>Booking ID</span>

                  <span className="rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-1 font-bold text-violet-200">
                    {getBookingNumber()}
                  </span>
                </div>
              </div>

              {!isCancelled &&
                !isCompleted && (
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        setShowCancelModal(
                          true
                        )
                      }
                      icon={
                        <XCircle className="h-4 w-4" />
                      }
                    >
                      Cancel Booking
                    </Button>
                  </motion.div>
                )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="space-y-6 lg:col-span-2">
            {/* =================================================
                EVENT INFORMATION
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.05,
              }}
              className="group relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/60 via-blue-950/40 to-slate-950 p-5 shadow-xl shadow-cyan-950/20 backdrop-blur-sm sm:p-6"
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />

              <SectionHeader
                icon={
                  <CalendarDays className="h-5 w-5" />
                }
                title="Event information"
                description="Details associated with this booking."
                iconGradient="from-cyan-500 to-blue-600"
              />

              <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
                <DetailItem
                  icon={
                    <CalendarDays className="h-5 w-5" />
                  }
                  label="Event date"
                  value={
                    getDate()
                      ? formatDate(
                          getDate()
                        )
                      : "Not specified"
                  }
                  gradient="from-cyan-500 to-blue-500"
                  soft="bg-cyan-500/10"
                  border="border-cyan-400/10"
                />

                <DetailItem
                  icon={
                    <Users className="h-5 w-5" />
                  }
                  label="Expected guests"
                  value={`${getGuestCount()} guests`}
                  gradient="from-violet-500 to-indigo-500"
                  soft="bg-violet-500/10"
                  border="border-violet-400/10"
                />

                <DetailItem
                  icon={
                    <MapPin className="h-5 w-5" />
                  }
                  label="Location"
                  value={getLocation()}
                  gradient="from-emerald-500 to-teal-500"
                  soft="bg-emerald-500/10"
                  border="border-emerald-400/10"
                />

                <DetailItem
                  icon={
                    <Clock3 className="h-5 w-5" />
                  }
                  label="Booking created"
                  value={
                    getCreatedDate()
                      ? formatDateTime(
                          getCreatedDate()
                        )
                      : "Not available"
                  }
                  gradient="from-amber-400 to-orange-500"
                  soft="bg-amber-500/10"
                  border="border-amber-400/10"
                />
              </div>
            </motion.section>

            {/* =================================================
                BOOKED SERVICES
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className="group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-950/60 via-teal-950/40 to-slate-950 p-5 shadow-xl shadow-emerald-950/20 backdrop-blur-sm sm:p-6"
            >
              <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

              <SectionHeader
                icon={
                  <Sparkles className="h-5 w-5" />
                }
                title="Booked services"
                description="Services included in this booking."
                iconGradient="from-emerald-500 to-teal-500"
              />

              {bookingServices.length ===
              0 ? (
                <div className="relative mt-5 rounded-2xl border border-dashed border-emerald-400/20 bg-slate-950/40 p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                    <Sparkles className="h-7 w-7" />
                  </div>

                  <p className="mt-4 text-sm font-bold text-slate-200">
                    No individual services listed
                  </p>

                  <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400">
                    Service details may be added by
                    the planning team.
                  </p>
                </div>
              ) : (
                <div className="relative mt-5 space-y-3">
                  {bookingServices.map(
                    (service, index) => {
                      const name =
                        typeof service ===
                        "string"
                          ? service
                          : service?.name ||
                            service?.title ||
                            service?.serviceName ||
                            "Event service";

                      const price =
                        Number(
                          service?.price ??
                            service?.amount ??
                            service?.total ??
                            0
                        ) || 0;

                      const serviceColors = [
                        {
                          bg: "from-violet-500/10 to-fuchsia-500/5",
                          border:
                            "border-violet-400/15",
                          icon:
                            "from-violet-500 to-fuchsia-500",
                        },
                        {
                          bg: "from-cyan-500/10 to-blue-500/5",
                          border:
                            "border-cyan-400/15",
                          icon:
                            "from-cyan-500 to-blue-500",
                        },
                        {
                          bg: "from-amber-500/10 to-orange-500/5",
                          border:
                            "border-amber-400/15",
                          icon:
                            "from-amber-400 to-orange-500",
                        },
                        {
                          bg: "from-rose-500/10 to-pink-500/5",
                          border:
                            "border-rose-400/15",
                          icon:
                            "from-rose-500 to-pink-500",
                        },
                        {
                          bg: "from-indigo-500/10 to-purple-500/5",
                          border:
                            "border-indigo-400/15",
                          icon:
                            "from-indigo-500 to-purple-500",
                        },
                      ];

                      const color =
                        serviceColors[
                          index %
                            serviceColors.length
                        ];

                      return (
                        <motion.div
                          key={
                            service?.id ||
                            service?._id ||
                            index
                          }
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
                              0.15 +
                              index * 0.04,
                          }}
                          whileHover={{
                            x: 4,
                          }}
                          className={`flex items-center justify-between gap-4 rounded-2xl border ${color.border} bg-gradient-to-r ${color.bg} px-4 py-4`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color.icon} text-white shadow-lg`}
                            >
                              <Check className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-white">
                                {name}
                              </p>

                              {service?.unit && (
                                <p className="mt-1 text-xs text-slate-400">
                                  {service.unit}
                                </p>
                              )}
                            </div>
                          </div>

                          {price > 0 && (
                            <span className="shrink-0 rounded-lg bg-white/5 px-3 py-1.5 text-sm font-bold text-emerald-200">
                              {formatCurrency(
                                price
                              )}
                            </span>
                          )}
                        </motion.div>
                      );
                    }
                  )}
                </div>
              )}
            </motion.section>

            {/* =================================================
                CUSTOMER INFORMATION
            ================================================= */}

            <motion.section
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
              className="group relative overflow-hidden rounded-3xl border border-rose-400/20 bg-gradient-to-br from-rose-950/60 via-pink-950/40 to-slate-950 p-5 shadow-xl shadow-rose-950/20 backdrop-blur-sm sm:p-6"
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-rose-500/10 blur-3xl" />

              <SectionHeader
                icon={
                  <User className="h-5 w-5" />
                }
                title="Customer information"
                description="Contact information associated with the booking."
                iconGradient="from-rose-500 to-pink-500"
              />

              <div className="relative mt-6 grid gap-4 sm:grid-cols-3">
                <DetailItem
                  icon={
                    <User className="h-5 w-5" />
                  }
                  label="Name"
                  value={getCustomerName()}
                  gradient="from-rose-500 to-pink-500"
                  soft="bg-rose-500/10"
                  border="border-rose-400/10"
                />

                <DetailItem
                  icon={<MailIcon />}
                  label="Email"
                  value={getCustomerEmail()}
                  gradient="from-fuchsia-500 to-violet-500"
                  soft="bg-fuchsia-500/10"
                  border="border-fuchsia-400/10"
                />

                <DetailItem
                  icon={
                    <Phone className="h-5 w-5" />
                  }
                  label="Phone"
                  value={getCustomerPhone()}
                  gradient="from-orange-400 to-rose-500"
                  soft="bg-orange-500/10"
                  border="border-orange-400/10"
                />
              </div>
            </motion.section>

            {/* =================================================
                TIMELINE
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-950/60 via-orange-950/40 to-slate-950 p-5 shadow-xl shadow-amber-950/20 backdrop-blur-sm sm:p-6"
            >
              <div className="absolute bottom-[-100px] right-[-80px] h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20">
                    <Clock3 className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-bold text-white">
                      Booking timeline
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Track the progress of your booking.
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-0">
                  {timeline.map(
                    (item, index) => {
                      const isLast =
                        index ===
                        timeline.length - 1;

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
                              0.25 +
                              index * 0.1,
                          }}
                          className="flex gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={
                                item.completed
                                  ? {
                                      scale: [
                                        1,
                                        1.06,
                                        1,
                                      ],
                                    }
                                  : {}
                              }
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
                            >
                              {item.completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <div className="h-2.5 w-2.5 rounded-full bg-white/60" />
                              )}
                            </motion.div>

                            {!isLast && (
                              <div
                                className={`my-1 h-12 w-px ${
                                  item.completed
                                    ? "bg-gradient-to-b from-amber-400/70 to-orange-500/20"
                                    : "bg-white/10"
                                }`}
                              />
                            )}
                          </div>

                          <div className="pb-8">
                            <p
                              className={`text-sm font-bold ${
                                item.completed
                                  ? "text-white"
                                  : "text-slate-500"
                              }`}
                            >
                              {item.title}
                            </p>

                            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
                              {
                                item.description
                              }
                            </p>
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </div>
              </div>
            </motion.section>
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-6">
            {/* =================================================
                BOOKING TOTAL
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/80 via-purple-950/60 to-slate-950 p-5 shadow-xl shadow-indigo-950/30 backdrop-blur-sm"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300/70">
                    Booking total
                  </p>

                  <p className="mt-2 text-3xl font-black text-white">
                    {formatCurrency(
                      getAmount()
                    )}
                  </p>
                </div>

                <div className="flex h-13 w-13 h-[52px] w-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-purple-500/20">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>

              <div className="relative mt-5 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    Payment status
                  </span>

                  <StatusBadge
                    status={getPaymentStatus()}
                    size="sm"
                  />
                </div>
              </div>
            </motion.section>

            {/* =================================================
                CURRENT STATUS
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.05,
              }}
              className="rounded-3xl border border-white/10 bg-slate-900/75 p-5 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    isCancelled
                      ? "bg-gradient-to-br from-red-500 to-rose-600"
                      : isConfirmed
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                      : "bg-gradient-to-br from-amber-400 to-orange-500"
                  } text-white`}
                >
                  {isCancelled ? (
                    <XCircle className="h-5 w-5" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" />
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Current status
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Booking progress
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <StatusBadge
                  status={getStatus()}
                  size="md"
                />
              </div>

              {isConfirmed && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-4 rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4"
                >
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />

                    <p className="text-xs leading-5 text-emerald-200">
                      Your booking has been confirmed.
                    </p>
                  </div>
                </motion.div>
              )}

              {isCancelled && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-4 rounded-2xl border border-red-400/20 bg-gradient-to-r from-red-500/10 to-rose-500/10 p-4"
                >
                  <div className="flex gap-3">
                    <XCircle className="h-5 w-5 shrink-0 text-red-400" />

                    <p className="text-xs leading-5 text-red-200">
                      This booking has been cancelled.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.section>

            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className="rounded-3xl border border-white/10 bg-slate-900/75 p-5 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <p className="font-bold text-white">
                  Quick actions
                </p>

                <Sparkles className="h-4 w-4 text-fuchsia-400" />
              </div>

              <div className="mt-4 space-y-2.5">
                <QuickAction
                  icon={
                    <CalendarDays className="h-4 w-4" />
                  }
                  label="View my events"
                  onClick={() =>
                    navigate(
                      "/my-events"
                    )
                  }
                  gradient="from-violet-500 to-fuchsia-500"
                  soft="bg-violet-500/10"
                  text="text-violet-300"
                  border="border-violet-400/10"
                />

                <QuickAction
                  icon={
                    <Sparkles className="h-4 w-4" />
                  }
                  label="Explore services"
                  onClick={() =>
                    navigate(
                      "/services"
                    )
                  }
                  gradient="from-cyan-500 to-blue-500"
                  soft="bg-cyan-500/10"
                  text="text-cyan-300"
                  border="border-cyan-400/10"
                />

                <QuickAction
                  icon={
                    <MapPin className="h-4 w-4" />
                  }
                  label="Explore venues"
                  onClick={() =>
                    navigate(
                      "/venues"
                    )
                  }
                  gradient="from-amber-400 to-orange-500"
                  soft="bg-amber-500/10"
                  text="text-amber-300"
                  border="border-amber-400/10"
                />

                <QuickAction
                  icon={
                    <Phone className="h-4 w-4" />
                  }
                  label="Contact planning team"
                  onClick={() =>
                    navigate(
                      "/contact"
                    )
                  }
                  gradient="from-rose-500 to-pink-500"
                  soft="bg-rose-500/10"
                  text="text-rose-300"
                  border="border-rose-400/10"
                />
              </div>
            </motion.section>

            {/* =================================================
                HELP CARD
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              className="relative overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-gradient-to-br from-violet-950 via-fuchsia-950/80 to-slate-950 p-5 shadow-xl shadow-fuchsia-950/20"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-fuchsia-500/20">
                  <Sparkles className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-bold text-white">
                  Need help with this booking?
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-300">
                  Contact our planning team if you need
                  to change details or have questions
                  about your booking.
                </p>

                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-bold text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/20"
                >
                  Contact us
                  <ArrowRightIcon />
                </Link>
              </div>
            </motion.section>
          </aside>
        </div>
      </div>

      {/* =====================================================
          CANCEL MODAL
      ===================================================== */}

      <Modal
        isOpen={showCancelModal}
        onClose={() => {
          if (!isCancelling) {
            setShowCancelModal(false);
          }
        }}
        title="Cancel booking?"
        description="Are you sure you want to cancel this booking? The booking status will be changed to cancelled."
        size="sm"
      >
        <div className="rounded-2xl border border-red-400/20 bg-gradient-to-r from-red-500/10 to-rose-500/10 p-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
              <XCircle className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-red-700">
                {getTitle()}
              </p>

              <p className="mt-1 text-xs leading-5 text-red-600/80">
                Booking ID:{" "}
                {getBookingNumber()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            disabled={isCancelling}
            onClick={() =>
              setShowCancelModal(false)
            }
          >
            Keep Booking
          </Button>

          <Button
            type="button"
            variant="danger"
            loading={isCancelling}
            onClick={handleCancel}
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
   SECTION HEADER
=========================================================== */

const SectionHeader = ({
  icon,
  title,
  description,
  iconGradient,
}) => (
  <div className="relative flex items-center gap-3">
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${iconGradient} text-white shadow-lg`}
    >
      {icon}
    </div>

    <div>
      <h2 className="font-bold text-white">
        {title}
      </h2>

      <p className="mt-0.5 text-xs text-slate-400">
        {description}
      </p>
    </div>
  </div>
);

/* ===========================================================
   DETAIL ITEM
=========================================================== */

const DetailItem = ({
  icon,
  label,
  value,
  gradient,
  soft,
  border,
}) => (
  <motion.div
    whileHover={{
      y: -3,
    }}
    className={`flex min-w-0 items-start gap-3 rounded-2xl border ${border} ${soft} p-4 transition`}
  >
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
    >
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold leading-5 text-white">
        {value}
      </p>
    </div>
  </motion.div>
);

/* ===========================================================
   QUICK ACTION
=========================================================== */

const QuickAction = ({
  icon,
  label,
  onClick,
  gradient,
  soft,
  text,
  border,
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{
      x: 4,
    }}
    whileTap={{
      scale: 0.98,
    }}
    className={`group flex w-full items-center gap-3 rounded-2xl border ${border} ${soft} px-4 py-3 text-left text-sm font-semibold ${text} transition hover:bg-white/10`}
  >
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}
    >
      {icon}
    </span>

    <span className="text-slate-200 transition group-hover:text-white">
      {label}
    </span>

    <ArrowRightIcon />
  </motion.button>
);

/* ===========================================================
   ICONS
=========================================================== */

const ArrowRightIcon = () => (
  <svg
    className="ml-auto h-4 w-4 shrink-0"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M4 10h12M11 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4 6h16v12H4V6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="m4 7 8 6 8-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BookingDetails;