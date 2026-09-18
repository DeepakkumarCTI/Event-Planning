import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  ClipboardList,
  IndianRupee,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CheckCircle2,
  XCircle,
  CreditCard,
  MessageSquareText,
  Package,
  Sparkles,
  TrendingUp,
  Activity,
} from "lucide-react";

import { useBooking } from "../../context/BookingContext";
import { useEvent } from "../../context/EventContext";

import StatusBadge from "../../components/common/StatusBadge";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

/* =========================================================
   HELPERS
========================================================= */

const safeDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const getBookingDate = (booking) =>
  booking?.eventDate ||
  booking?.date ||
  booking?.bookingDate ||
  booking?.createdAt;

const getBookingAmount = (booking) =>
  Number(
    booking?.totalAmount ??
      booking?.amount ??
      booking?.total ??
      booking?.price ??
      0
  ) || 0;

const getBookingStatus = (booking) =>
  String(booking?.bookingStatus || booking?.status || "Pending").trim();

const getPaymentStatus = (booking) =>
  String(booking?.paymentStatus || "Pending").trim();

const getCustomerName = (booking) =>
  booking?.customerName ||
  booking?.userName ||
  booking?.customer?.name ||
  booking?.shippingAddress?.name ||
  booking?.name ||
  "Customer";

const getEventName = (booking) =>
  booking?.eventName ||
  booking?.eventTitle ||
  booking?.event?.name ||
  booking?.event?.title ||
  booking?.eventType ||
  "Event";

/* =========================================================
   ANIMATION
========================================================= */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  href,
  iconClass = "bg-orange-100 text-orange-600",
}) => {
  const content = (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-stone-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
            {value}
          </h3>

          {description && (
            <p className="mt-1 text-xs text-stone-500">{description}</p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>

      {href && (
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-orange-600">
          View details
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      )}
    </motion.div>
  );

  return href ? <Link to={href}>{content}</Link> : content;
};

/* =========================================================
   SMALL STATUS CARD
========================================================= */

const MiniStat = ({ icon: Icon, label, value, iconClass }) => (
  <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3">
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
    >
      <Icon size={17} />
    </div>

    <div className="min-w-0">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="text-lg font-bold text-stone-900">{value}</p>
    </div>
  </div>
);

/* =========================================================
   DASHBOARD
========================================================= */

const AdminDashboard = () => {
  const { bookings = [] } = useBooking();
  const { events = [] } = useEvent();

  /* =======================================================
     BOOKING STATS
  ======================================================= */

  const bookingStats = useMemo(() => {
    const pending = bookings.filter(
      (booking) =>
        getBookingStatus(booking).toLowerCase() === "pending"
    ).length;

    const confirmed = bookings.filter(
      (booking) =>
        getBookingStatus(booking).toLowerCase() === "confirmed"
    ).length;

    const completed = bookings.filter(
      (booking) =>
        getBookingStatus(booking).toLowerCase() === "completed"
    ).length;

    const cancelled = bookings.filter((booking) => {
      const status = getBookingStatus(booking).toLowerCase();

      return status === "cancelled" || status === "canceled";
    }).length;

    return {
      total: bookings.length,
      pending,
      confirmed,
      completed,
      cancelled,
    };
  }, [bookings]);

  /* =======================================================
     PAYMENT STATS
  ======================================================= */

  const paymentStats = useMemo(() => {
    let totalRevenue = 0;
    let collectedRevenue = 0;
    let pendingRevenue = 0;

    bookings.forEach((booking) => {
      const amount = getBookingAmount(booking);

      totalRevenue += amount;

      const paymentStatus = getPaymentStatus(booking).toLowerCase();

      if (paymentStatus === "paid") {
        collectedRevenue += amount;
      }

      if (
        paymentStatus === "pending" ||
        paymentStatus === "unpaid"
      ) {
        pendingRevenue += amount;
      }
    });

    return {
      totalRevenue,
      collectedRevenue,
      pendingRevenue,
    };
  }, [bookings]);

  /* =======================================================
     EVENT STATS
  ======================================================= */

  const eventStats = useMemo(() => {
    const active = events.filter((event) => {
      const status = String(event?.status || "Active").toLowerCase();

      return status === "active" || status === "in progress";
    }).length;

    const completed = events.filter((event) => {
      const status = String(event?.status || "").toLowerCase();

      return status === "completed";
    }).length;

    return {
      total: events.length,
      active,
      completed,
    };
  }, [events]);

  /* =======================================================
     RECENT BOOKINGS
  ======================================================= */

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => {
        const dateA =
          safeDate(a?.createdAt)?.getTime() ||
          safeDate(getBookingDate(a))?.getTime() ||
          0;

        const dateB =
          safeDate(b?.createdAt)?.getTime() ||
          safeDate(getBookingDate(b))?.getTime() ||
          0;

        return dateB - dateA;
      })
      .slice(0, 6);
  }, [bookings]);

  /* =======================================================
     UPCOMING EVENTS
  ======================================================= */

  const upcomingEvents = useMemo(() => {
    const now = new Date();

    return [...events]
      .filter((event) => {
        const date = safeDate(
          event?.eventDate || event?.date || event?.startDate
        );

        return date && date >= now;
      })
      .sort((a, b) => {
        const dateA = safeDate(
          a?.eventDate || a?.date || a?.startDate
        );

        const dateB = safeDate(
          b?.eventDate || b?.date || b?.startDate
        );

        return dateA - dateB;
      })
      .slice(0, 5);
  }, [events]);

  /* =======================================================
     QUICK ACTIONS
  ======================================================= */

  const quickActions = [
    {
      title: "Manage Events",
      description: "View and update customer events",
      icon: CalendarDays,
      href: "/admin/events",
    },
    {
      title: "Manage Bookings",
      description: "Review incoming bookings",
      icon: ClipboardList,
      href: "/admin/bookings",
    },
    {
      title: "Manage Services",
      description: "Update your event services",
      icon: Sparkles,
      href: "/admin/services",
    },
    {
      title: "Payment Records",
      description: "Track payment transactions",
      icon: CreditCard,
      href: "/admin/payments",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <motion.div
        variants={itemVariants}
        className="flex flex-col justify-between gap-4 md:flex-row md:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-600">
            <Activity size={16} />
            Admin overview
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-stone-500">
            Monitor your events, bookings, customers and revenue.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/reports"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600"
          >
            <TrendingUp size={17} />
            Reports
          </Link>

          <Link
            to="/admin/events"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            <CalendarDays size={17} />
            View Events
          </Link>
        </div>
      </motion.div>

      {/* ===================================================
          MAIN STATS
      =================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value={bookingStats.total}
          description={`${bookingStats.pending} currently pending`}
          icon={ClipboardList}
          href="/admin/bookings"
          iconClass="bg-orange-100 text-orange-600"
        />

        <StatCard
          title="Total Events"
          value={eventStats.total}
          description={`${eventStats.active} active events`}
          icon={CalendarDays}
          href="/admin/events"
          iconClass="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Revenue Collected"
          value={formatCurrency(paymentStats.collectedRevenue)}
          description={`${formatCurrency(
            paymentStats.pendingRevenue
          )} pending`}
          icon={IndianRupee}
          href="/admin/payments"
          iconClass="bg-emerald-100 text-emerald-600"
        />

        <StatCard
          title="Customers"
          value={new Set(
            bookings
              .map(
                (booking) =>
                  booking?.customerId ||
                  booking?.userId ||
                  booking?.email ||
                  booking?.customer?.email ||
                  getCustomerName(booking)
              )
              .filter(Boolean)
          ).size}
          description="Customers with bookings"
          icon={Users}
          href="/admin/customers"
          iconClass="bg-violet-100 text-violet-600"
        />
      </div>

      {/* ===================================================
          BOOKING + PAYMENT OVERVIEW
      =================================================== */}

      <div className="grid gap-5 xl:grid-cols-2">
        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-stone-900">
                Booking overview
              </h2>

              <p className="mt-1 text-xs text-stone-500">
                Current booking status distribution
              </p>
            </div>

            <Link
              to="/admin/bookings"
              className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat
              icon={Clock3}
              label="Pending"
              value={bookingStats.pending}
              iconClass="bg-amber-100 text-amber-600"
            />

            <MiniStat
              icon={CheckCircle2}
              label="Confirmed"
              value={bookingStats.confirmed}
              iconClass="bg-blue-100 text-blue-600"
            />

            <MiniStat
              icon={CheckCircle2}
              label="Completed"
              value={bookingStats.completed}
              iconClass="bg-emerald-100 text-emerald-600"
            />

            <MiniStat
              icon={XCircle}
              label="Cancelled"
              value={bookingStats.cancelled}
              iconClass="bg-red-100 text-red-600"
            />
          </div>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-stone-900">
                Revenue overview
              </h2>

              <p className="mt-1 text-xs text-stone-500">
                Payment collection summary
              </p>
            </div>

            <Link
              to="/admin/payments"
              className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Payments
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <IndianRupee size={19} />
                </div>

                <div>
                  <p className="text-xs text-emerald-700">
                    Collected revenue
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-800">
                    {formatCurrency(paymentStats.collectedRevenue)}
                  </p>
                </div>
              </div>

              <CheckCircle2
                size={20}
                className="text-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <Clock3 size={19} />
                </div>

                <div>
                  <p className="text-xs text-amber-700">
                    Pending revenue
                  </p>

                  <p className="mt-1 text-lg font-bold text-amber-800">
                    {formatCurrency(paymentStats.pendingRevenue)}
                  </p>
                </div>
              </div>

              <Clock3 size={20} className="text-amber-500" />
            </div>
          </div>
        </motion.section>
      </div>

      {/* ===================================================
          RECENT BOOKINGS
      =================================================== */}

      <motion.section
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
      >
        <div className="flex flex-col justify-between gap-3 border-b border-stone-200 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-stone-900">
              Recent bookings
            </h2>

            <p className="mt-1 text-xs text-stone-500">
              Latest customer booking activity
            </p>
          </div>

          <Link
            to="/admin/bookings"
            className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <ClipboardList size={22} />
            </div>

            <h3 className="mt-3 font-semibold text-stone-800">
              No bookings yet
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              New customer bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Event
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Date
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {recentBookings.map((booking, index) => {
                  const bookingDate = safeDate(
                    getBookingDate(booking)
                  );

                  return (
                    <motion.tr
                      key={
                        booking?.id ||
                        booking?._id ||
                        `booking-${index}`
                      }
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      className="transition hover:bg-stone-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                            {getCustomerName(booking)
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-medium text-stone-800">
                              {getCustomerName(booking)}
                            </p>

                            <p className="text-xs text-stone-500">
                              {booking?.email ||
                                booking?.customer?.email ||
                                "Customer booking"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-stone-800">
                          {getEventName(booking)}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-stone-600">
                        {bookingDate
                          ? formatDate(bookingDate)
                          : "—"}
                      </td>

                      <td className="px-5 py-4 font-semibold text-stone-800">
                        {formatCurrency(
                          getBookingAmount(booking)
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={getBookingStatus(booking)}
                        />
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      {/* ===================================================
          LOWER GRID
      =================================================== */}

      <div className="grid gap-5 xl:grid-cols-3">
        {/* UPCOMING EVENTS */}

        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm xl:col-span-2"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-stone-900">
                Upcoming events
              </h2>

              <p className="mt-1 text-xs text-stone-500">
                Events scheduled for upcoming dates
              </p>
            </div>

            <Link
              to="/admin/events"
              className="flex items-center gap-1 text-sm font-medium text-orange-600"
            >
              Manage
              <ArrowRight size={15} />
            </Link>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="rounded-xl bg-stone-50 p-8 text-center">
              <CalendarDays
                size={25}
                className="mx-auto text-stone-400"
              />

              <p className="mt-2 text-sm font-medium text-stone-700">
                No upcoming events
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => {
                const date = safeDate(
                  event?.eventDate ||
                    event?.date ||
                    event?.startDate
                );

                return (
                  <motion.div
                    key={
                      event?.id ||
                      event?._id ||
                      `event-${index}`
                    }
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="flex items-center gap-4 rounded-xl border border-stone-200 p-3 transition hover:border-orange-200 hover:bg-orange-50/30"
                  >
                    <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                      {date ? (
                        <>
                          <span className="text-[10px] font-semibold uppercase">
                            {date.toLocaleDateString(
                              "en-IN",
                              { month: "short" }
                            )}
                          </span>

                          <span className="text-lg font-bold leading-none">
                            {date.getDate()}
                          </span>
                        </>
                      ) : (
                        <CalendarDays size={19} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-stone-800">
                        {event?.name ||
                          event?.title ||
                          event?.eventName ||
                          event?.eventType ||
                          "Untitled Event"}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-stone-500">
                        {event?.venue ||
                          event?.location ||
                          "Venue not specified"}
                      </p>
                    </div>

                    <StatusBadge
                      status={event?.status || "Active"}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* QUICK ACTIONS */}

        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5">
            <h2 className="font-semibold text-stone-900">
              Quick actions
            </h2>

            <p className="mt-1 text-xs text-stone-500">
              Frequently used admin tools
            </p>
          </div>

          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  to={action.href}
                  className="group flex items-center gap-3 rounded-xl border border-stone-200 p-3 transition hover:border-orange-300 hover:bg-orange-50/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600 transition group-hover:bg-orange-100 group-hover:text-orange-600">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-stone-800">
                      {action.title}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-stone-500">
                      {action.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-stone-400 transition group-hover:translate-x-1 group-hover:text-orange-500"
                  />
                </Link>
              );
            })}
          </div>
        </motion.section>
      </div>

      {/* ===================================================
          PLATFORM SUMMARY
      =================================================== */}

      <motion.section
        variants={itemVariants}
        className="rounded-2xl border border-stone-200 bg-gradient-to-r from-orange-50 via-white to-amber-50 p-5 shadow-sm"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Package size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-stone-900">
                Eventara overview
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-stone-600">
                You currently have{" "}
                <span className="font-semibold">
                  {eventStats.total}
                </span>{" "}
                events and{" "}
                <span className="font-semibold">
                  {bookingStats.total}
                </span>{" "}
                bookings recorded in the platform.
              </p>
            </div>
          </div>

          <Link
            to="/admin/reports"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
          >
            <TrendingUp size={17} />
            Open reports
          </Link>
        </div>
      </motion.section>

      {/* ===================================================
          FOOTER NOTE
      =================================================== */}

      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center justify-between gap-2 border-t border-stone-200 pt-4 text-xs text-stone-400 sm:flex-row"
      >
        <p>
          Eventara Admin Panel
        </p>

        <div className="flex items-center gap-4">
          <Link
            to="/admin/enquiries"
            className="transition hover:text-orange-600"
          >
            Enquiries
          </Link>

          <Link
            to="/admin/settings"
            className="transition hover:text-orange-600"
          >
            Settings
          </Link>

          <Link
            to="/"
            className="transition hover:text-orange-600"
          >
            View website
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;