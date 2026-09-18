import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  IndianRupee,
  PieChart,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import { useBooking } from "../../context/BookingContext";
import { useEvent } from "../../context/EventContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const Reports = () => {
  const { bookings = [] } = useBooking();
  const { events = [] } = useEvent();

  const [period, setPeriod] = useState("all");

  /* =========================================================
     REPORT DATA
  ========================================================= */

  const reportData = useMemo(() => {
    const filteredBookings = filterByPeriod(
      bookings,
      period
    );

    const filteredEvents = filterByPeriod(
      events,
      period
    );

    const totalRevenue = filteredBookings.reduce(
      (sum, booking) =>
        sum +
        Number(
          booking.totalAmount ??
            booking.amount ??
            booking.finalAmount ??
            booking.budget ??
            0
        ),
      0
    );

    const paidRevenue = filteredBookings
      .filter(
        (booking) =>
          normalize(
            booking.paymentStatus
          ) === "paid"
      )
      .reduce(
        (sum, booking) =>
          sum +
          Number(
            booking.totalAmount ??
              booking.amount ??
              booking.finalAmount ??
              booking.budget ??
              0
          ),
        0
      );

    const pendingRevenue =
      filteredBookings
        .filter(
          (booking) =>
            normalize(
              booking.paymentStatus
            ) === "pending"
        )
        .reduce(
          (sum, booking) =>
            sum +
            Number(
              booking.totalAmount ??
                booking.amount ??
                booking.finalAmount ??
                booking.budget ??
                0
            ),
          0
        );

    const confirmedBookings =
      filteredBookings.filter(
        (booking) =>
          normalize(booking.status) ===
          "confirmed"
      ).length;

    const completedBookings =
      filteredBookings.filter(
        (booking) =>
          normalize(booking.status) ===
          "completed"
      ).length;

    const pendingBookings =
      filteredBookings.filter(
        (booking) =>
          normalize(booking.status) ===
          "pending"
      ).length;

    const cancelledBookings =
      filteredBookings.filter(
        (booking) =>
          normalize(booking.status) ===
          "cancelled" ||
          normalize(booking.status) ===
            "canceled"
      ).length;

    const paidPayments =
      filteredBookings.filter(
        (booking) =>
          normalize(
            booking.paymentStatus
          ) === "paid"
      ).length;

    const pendingPayments =
      filteredBookings.filter(
        (booking) =>
          normalize(
            booking.paymentStatus
          ) === "pending"
      ).length;

    const failedPayments =
      filteredBookings.filter(
        (booking) =>
          normalize(
            booking.paymentStatus
          ) === "failed"
      ).length;

    const refundedPayments =
      filteredBookings.filter(
        (booking) =>
          normalize(
            booking.paymentStatus
          ) === "refunded"
      ).length;

    return {
      bookings: filteredBookings,
      events: filteredEvents,
      totalRevenue,
      paidRevenue,
      pendingRevenue,
      confirmedBookings,
      completedBookings,
      pendingBookings,
      cancelledBookings,
      paidPayments,
      pendingPayments,
      failedPayments,
      refundedPayments,
    };
  }, [bookings, events, period]);

  /* =========================================================
     EVENT TYPE REPORT
  ========================================================= */

  const eventTypeData = useMemo(() => {
    const map = {};

    reportData.bookings.forEach(
      (booking) => {
        const type =
          booking.eventType ||
          booking.category ||
          booking.event?.type ||
          "Other";

        const key = String(type);

        if (!map[key]) {
          map[key] = {
            name: key,
            bookings: 0,
            revenue: 0,
          };
        }

        map[key].bookings += 1;

        map[key].revenue += Number(
          booking.totalAmount ??
            booking.amount ??
            booking.finalAmount ??
            booking.budget ??
            0
        );
      }
    );

    return Object.values(map)
      .sort(
        (a, b) =>
          b.bookings - a.bookings
      )
      .slice(0, 8);
  }, [reportData.bookings]);

  /* =========================================================
     PAYMENT METHOD REPORT
  ========================================================= */

  const paymentMethodData = useMemo(() => {
    const map = {};

    reportData.bookings.forEach(
      (booking) => {
        const method =
          booking.paymentMethod ||
          booking.payment?.method ||
          "Not specified";

        if (!map[method]) {
          map[method] = {
            name: method,
            count: 0,
            amount: 0,
          };
        }

        map[method].count += 1;

        map[method].amount += Number(
          booking.totalAmount ??
            booking.amount ??
            booking.finalAmount ??
            booking.budget ??
            0
        );
      }
    );

    return Object.values(map).sort(
      (a, b) =>
        b.amount - a.amount
    );
  }, [reportData.bookings]);

  /* =========================================================
     MONTHLY REPORT
  ========================================================= */

  const monthlyData = useMemo(() => {
    const map = {};

    reportData.bookings.forEach(
      (booking) => {
        const rawDate =
          booking.createdAt ||
          booking.date ||
          booking.eventDate;

        if (!rawDate) return;

        const date = new Date(rawDate);

        if (
          Number.isNaN(
            date.getTime()
          )
        ) {
          return;
        }

        const key = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!map[key]) {
          map[key] = {
            key,
            label: date.toLocaleDateString(
              "en-IN",
              {
                month: "short",
                year: "numeric",
              }
            ),
            bookings: 0,
            revenue: 0,
          };
        }

        map[key].bookings += 1;

        map[key].revenue += Number(
          booking.totalAmount ??
            booking.amount ??
            booking.finalAmount ??
            booking.budget ??
            0
        );
      }
    );

    return Object.values(map)
      .sort((a, b) =>
        a.key.localeCompare(b.key)
      )
      .slice(-6);
  }, [reportData.bookings]);

  /* =========================================================
     CUSTOMER DATA
  ========================================================= */

  const customerData = useMemo(() => {
    const map = {};

    reportData.bookings.forEach(
      (booking) => {
        const name =
          booking.customerName ||
          booking.customer?.name ||
          booking.userName ||
          booking.name ||
          "Unknown Customer";

        const email =
          booking.customerEmail ||
          booking.customer?.email ||
          booking.email ||
          "";

        const key =
          email || name;

        if (!map[key]) {
          map[key] = {
            name,
            email,
            bookings: 0,
            amount: 0,
          };
        }

        map[key].bookings += 1;

        map[key].amount += Number(
          booking.totalAmount ??
            booking.amount ??
            booking.finalAmount ??
            booking.budget ??
            0
        );
      }
    );

    return Object.values(map)
      .sort(
        (a, b) =>
          b.amount - a.amount
      )
      .slice(0, 5);
  }, [reportData.bookings]);

  /* =========================================================
     EXPORT CSV
  ========================================================= */

  const exportReport = () => {
    const rows = [
      [
        "Booking ID",
        "Customer",
        "Email",
        "Event",
        "Event Type",
        "Amount",
        "Booking Status",
        "Payment Status",
        "Payment Method",
        "Date",
      ],
      ...reportData.bookings.map(
        (booking) => [
          booking.id ||
            booking.bookingId ||
            "",
          booking.customerName ||
            booking.customer?.name ||
            booking.name ||
            "",
          booking.customerEmail ||
            booking.customer?.email ||
            booking.email ||
            "",
          booking.eventName ||
            booking.event?.name ||
            booking.title ||
            "",
          booking.eventType ||
            booking.category ||
            "",
          Number(
            booking.totalAmount ??
              booking.amount ??
              booking.finalAmount ??
              booking.budget ??
              0
          ),
          booking.status || "Pending",
          booking.paymentStatus ||
            "Pending",
          booking.paymentMethod ||
            booking.payment?.method ||
            "",
          booking.createdAt ||
            booking.date ||
            "",
        ]
      ),
    ];

    const csv = rows
      .map((row) =>
        row
          .map(csvEscape)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement(
        "a"
      );

    link.href = url;
    link.download = `function-planner-report-${period}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-full bg-stone-50">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-amber-700">
                <BarChart3 className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Analytics & Reports
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Reports
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Review bookings, revenue,
                payments and event activity
                from one place.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <select
                  value={period}
                  onChange={(event) =>
                    setPeriod(
                      event.target.value
                    )
                  }
                  className="h-11 min-w-[160px] appearance-none rounded-xl border border-stone-200 bg-white px-4 pr-10 text-sm font-semibold text-stone-700 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10"
                >
                  <option value="all">
                    All Time
                  </option>
                  <option value="today">
                    Today
                  </option>
                  <option value="week">
                    This Week
                  </option>
                  <option value="month">
                    This Month
                  </option>
                  <option value="year">
                    This Year
                  </option>
                </select>

                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>

              <Button
                type="button"
                variant="primary"
                onClick={exportReport}
                icon={
                  <Download className="h-4 w-4" />
                }
              >
                Export CSV
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            TOP STATS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ReportStat
            title="Total Revenue"
            value={formatCurrency(
              reportData.totalRevenue
            )}
            icon={IndianRupee}
            description={`${reportData.bookings.length} bookings`}
          />

          <ReportStat
            title="Collected Revenue"
            value={formatCurrency(
              reportData.paidRevenue
            )}
            icon={CheckCircle2}
            description={`${reportData.paidPayments} paid payments`}
          />

          <ReportStat
            title="Pending Revenue"
            value={formatCurrency(
              reportData.pendingRevenue
            )}
            icon={Clock3}
            description={`${reportData.pendingPayments} pending payments`}
          />

          <ReportStat
            title="Total Events"
            value={reportData.events.length}
            icon={CalendarDays}
            description="Events in selected period"
          />
        </div>

        {/* ===================================================
            BOOKING STATUS
        =================================================== */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatusOverview
            title="Pending Bookings"
            value={
              reportData.pendingBookings
            }
            icon={Clock3}
            status="pending"
          />

          <StatusOverview
            title="Confirmed Bookings"
            value={
              reportData.confirmedBookings
            }
            icon={CheckCircle2}
            status="confirmed"
          />

          <StatusOverview
            title="Completed Bookings"
            value={
              reportData.completedBookings
            }
            icon={CheckCircle2}
            status="completed"
          />

          <StatusOverview
            title="Cancelled Bookings"
            value={
              reportData.cancelledBookings
            }
            icon={XCircle}
            status="cancelled"
          />
        </section>

        {/* ===================================================
            REVENUE + MONTHLY
        =================================================== */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_1fr]">

          <ReportCard
            title="Revenue Overview"
            description="Revenue generated from bookings"
            icon={TrendingUp}
          >
            {monthlyData.length > 0 ? (
              <RevenueChart
                data={monthlyData}
              />
            ) : (
              <ReportEmpty />
            )}
          </ReportCard>

          <ReportCard
            title="Booking Activity"
            description="Bookings recorded over time"
            icon={Activity}
          >
            {monthlyData.length > 0 ? (
              <BookingChart
                data={monthlyData}
              />
            ) : (
              <ReportEmpty />
            )}
          </ReportCard>
        </div>

        {/* ===================================================
            EVENT TYPES + PAYMENT METHODS
        =================================================== */}

        <div className="mt-6 grid gap-6 xl:grid-cols-2">

          <ReportCard
            title="Events by Type"
            description="Booking distribution across event categories"
            icon={PieChart}
          >
            {eventTypeData.length > 0 ? (
              <div className="space-y-4">
                {eventTypeData.map(
                  (
                    item,
                    index
                  ) => {
                    const max =
                      eventTypeData[0]
                        ?.bookings ||
                      1;

                    const width =
                      (item.bookings /
                        max) *
                      100;

                    return (
                      <motion.div
                        key={
                          item.name
                        }
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            index *
                            0.04,
                        }}
                      >
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <span className="text-sm font-semibold text-stone-700">
                            {item.name}
                          </span>

                          <div className="text-right">
                            <span className="text-xs font-bold text-stone-900">
                              {item.bookings}
                            </span>

                            <span className="ml-2 text-[10px] text-stone-400">
                              bookings
                            </span>
                          </div>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${width}%`,
                            }}
                            transition={{
                              duration:
                                0.7,
                              delay:
                                index *
                                0.04,
                            }}
                            className="h-full rounded-full bg-amber-500"
                          />
                        </div>

                        <p className="mt-1 text-right text-[10px] text-stone-400">
                          {formatCurrency(
                            item.revenue
                          )}
                        </p>
                      </motion.div>
                    );
                  }
                )}
              </div>
            ) : (
              <ReportEmpty />
            )}
          </ReportCard>

          <ReportCard
            title="Payment Methods"
            description="Payment volume by method"
            icon={CreditCardIcon}
          >
            {paymentMethodData.length > 0 ? (
              <div className="space-y-3">
                {paymentMethodData.map(
                  (
                    item,
                    index
                  ) => (
                    <motion.div
                      key={
                        item.name
                      }
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          index *
                          0.05,
                      }}
                      className="flex items-center justify-between rounded-2xl border border-stone-100 bg-stone-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-stone-600 shadow-sm">
                          <CreditCardIcon className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-stone-800">
                            {item.name}
                          </p>

                          <p className="mt-1 text-[10px] text-stone-400">
                            {item.count}{" "}
                            transaction
                            {item.count !==
                            1
                              ? "s"
                              : ""}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-bold text-stone-900">
                        {formatCurrency(
                          item.amount
                        )}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            ) : (
              <ReportEmpty />
            )}
          </ReportCard>
        </div>

        {/* ===================================================
            PAYMENT STATUS
        =================================================== */}

        <ReportCard
          title="Payment Status"
          description="Current payment distribution"
          icon={CreditCardIcon}
          className="mt-6"
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <PaymentStatusCard
              label="Paid"
              value={
                reportData.paidPayments
              }
              icon={CheckCircle2}
              status="paid"
            />

            <PaymentStatusCard
              label="Pending"
              value={
                reportData.pendingPayments
              }
              icon={Clock3}
              status="pending"
            />

            <PaymentStatusCard
              label="Failed"
              value={
                reportData.failedPayments
              }
              icon={XCircle}
              status="failed"
            />

            <PaymentStatusCard
              label="Refunded"
              value={
                reportData.refundedPayments
              }
              icon={ArrowDownRight}
              status="refunded"
            />
          </div>
        </ReportCard>

        {/* ===================================================
            TOP CUSTOMERS
        =================================================== */}

        <ReportCard
          title="Customer Activity"
          description="Customers with the highest booking value"
          icon={Users}
          className="mt-6"
        >
          {customerData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="border-b border-stone-200">
                    <TableHead>
                      Customer
                    </TableHead>

                    <TableHead>
                      Bookings
                    </TableHead>

                    <TableHead>
                      Booking Value
                    </TableHead>

                    <TableHead align="right">
                      Share
                    </TableHead>
                  </tr>
                </thead>

                <tbody>
                  {customerData.map(
                    (
                      customer,
                      index
                    ) => {
                      const share =
                        reportData.totalRevenue >
                        0
                          ? Math.round(
                              (customer.amount /
                                reportData.totalRevenue) *
                                100
                            )
                          : 0;

                      return (
                        <motion.tr
                          key={
                            customer.email ||
                            customer.name
                          }
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          transition={{
                            delay:
                              index *
                              0.04,
                          }}
                          className="border-b border-stone-100 last:border-0"
                        >
                          <td className="px-4 py-4">
                            <p className="text-sm font-bold text-stone-800">
                              {customer.name}
                            </p>

                            <p className="mt-1 text-[10px] text-stone-400">
                              {customer.email ||
                                "No email"}
                            </p>
                          </td>

                          <td className="px-4 py-4 text-sm font-semibold text-stone-600">
                            {customer.bookings}
                          </td>

                          <td className="px-4 py-4 text-sm font-bold text-stone-900">
                            {formatCurrency(
                              customer.amount
                            )}
                          </td>

                          <td className="px-4 py-4 text-right">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700">
                              <ArrowUpRight className="h-3 w-3" />
                              {share}%
                            </span>
                          </td>
                        </motion.tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <ReportEmpty />
          )}
        </ReportCard>

        {/* ===================================================
            RECENT BOOKINGS
        =================================================== */}

        <ReportCard
          title="Recent Bookings"
          description="Latest bookings included in this report"
          icon={FileText}
          className="mt-6"
        >
          {reportData.bookings.length > 0 ? (
            <div className="space-y-3">
              {reportData.bookings
                .slice()
                .sort(
                  (a, b) =>
                    new Date(
                      b.createdAt ||
                        b.date ||
                        0
                    ) -
                    new Date(
                      a.createdAt ||
                        a.date ||
                        0
                    )
                )
                .slice(0, 6)
                .map(
                  (
                    booking,
                    index
                  ) => (
                    <motion.div
                      key={
                        booking.id ||
                        booking.bookingId ||
                        index
                      }
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          index *
                          0.04,
                      }}
                      className="flex flex-col gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-stone-500 shadow-sm">
                          <CalendarDays className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-stone-800">
                            {booking.eventName ||
                              booking.event?.name ||
                              booking.title ||
                              "Event Booking"}
                          </p>

                          <p className="mt-1 truncate text-[10px] text-stone-400">
                            {booking.customerName ||
                              booking.customer?.name ||
                              booking.name ||
                              "Customer"}
                            {" • "}
                            {booking.createdAt ||
                            booking.date
                              ? safeDate(
                                  booking.createdAt ||
                                    booking.date
                                )
                              : "No date"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <StatusBadge
                          status={
                            booking.status ||
                            "Pending"
                          }
                          size="sm"
                        />

                        <span className="text-sm font-bold text-stone-900">
                          {formatCurrency(
                            booking.totalAmount ??
                              booking.amount ??
                              booking.finalAmount ??
                              booking.budget ??
                              0
                          )}
                        </span>
                      </div>
                    </motion.div>
                  )
                )}
            </div>
          ) : (
            <ReportEmpty />
          )}
        </ReportCard>
      </div>
    </main>
  );
};

/* ===========================================================
   REPORT STAT
=========================================================== */

const ReportStat = ({
  title,
  value,
  icon: Icon,
  description,
}) => (
  <motion.div
    whileHover={{
      y: -3,
    }}
    className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
  >
    <div className="flex items-center justify-between">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
        <Icon className="h-5 w-5" />
      </div>

      <ArrowUpRight className="h-4 w-4 text-stone-300" />
    </div>

    <p className="mt-5 text-xs font-semibold text-stone-500">
      {title}
    </p>

    <p className="mt-1 truncate text-2xl font-bold tracking-tight text-stone-900">
      {value}
    </p>

    <p className="mt-2 text-[10px] text-stone-400">
      {description}
    </p>
  </motion.div>
);

/* ===========================================================
   STATUS OVERVIEW
=========================================================== */

const StatusOverview = ({
  title,
  value,
  icon: Icon,
  status,
}) => (
  <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-500">
        <Icon className="h-4 w-4" />
      </div>

      <StatusBadge
        status={status}
        size="sm"
      />
    </div>

    <p className="mt-4 text-xs font-semibold text-stone-500">
      {title}
    </p>

    <p className="mt-1 text-2xl font-bold text-stone-900">
      {value}
    </p>
  </div>
);

/* ===========================================================
   REPORT CARD
=========================================================== */

const ReportCard = ({
  title,
  description,
  icon: Icon,
  children,
  className = "",
}) => (
  <motion.section
    initial={{
      opacity: 0,
      y: 15,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    className={`rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
  >
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h2 className="text-base font-bold text-stone-900">
          {title}
        </h2>

        <p className="mt-1 text-xs text-stone-400">
          {description}
        </p>
      </div>
    </div>

    {children}
  </motion.section>
);

/* ===========================================================
   REVENUE CHART
=========================================================== */

const RevenueChart = ({
  data,
}) => {
  const max = Math.max(
    ...data.map(
      (item) => item.revenue
    ),
    1
  );

  return (
    <div className="flex h-[280px] items-end gap-2 sm:gap-4">
      {data.map(
        (item, index) => {
          const height =
            Math.max(
              (item.revenue /
                max) *
                100,
              4
            );

          return (
            <div
              key={item.key}
              className="flex min-w-0 flex-1 flex-col items-center justify-end"
            >
              <div className="mb-2 text-center">
                <p className="text-[9px] font-bold text-stone-700 sm:text-[10px]">
                  {formatCompactCurrency(
                    item.revenue
                  )}
                </p>
              </div>

              <div className="flex h-[190px] w-full items-end justify-center">
                <motion.div
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: `${height}%`,
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      index * 0.07,
                  }}
                  className="w-full max-w-[56px] rounded-t-xl bg-amber-500"
                />
              </div>

              <p className="mt-3 truncate text-[9px] font-semibold text-stone-400 sm:text-[10px]">
                {item.label}
              </p>
            </div>
          );
        }
      )}
    </div>
  );
};

/* ===========================================================
   BOOKING CHART
=========================================================== */

const BookingChart = ({
  data,
}) => {
  const max = Math.max(
    ...data.map(
      (item) => item.bookings
    ),
    1
  );

  return (
    <div className="flex h-[280px] items-end gap-2 sm:gap-4">
      {data.map(
        (item, index) => {
          const height =
            Math.max(
              (item.bookings /
                max) *
                100,
              4
            );

          return (
            <div
              key={item.key}
              className="flex min-w-0 flex-1 flex-col items-center justify-end"
            >
              <p className="mb-2 text-[10px] font-bold text-stone-700">
                {item.bookings}
              </p>

              <div className="flex h-[190px] w-full items-end justify-center">
                <motion.div
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: `${height}%`,
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      index * 0.07,
                  }}
                  className="w-full max-w-[56px] rounded-t-xl bg-stone-400"
                />
              </div>

              <p className="mt-3 truncate text-[9px] font-semibold text-stone-400 sm:text-[10px]">
                {item.label}
              </p>
            </div>
          );
        }
      )}
    </div>
  );
};

/* ===========================================================
   PAYMENT STATUS CARD
=========================================================== */

const PaymentStatusCard = ({
  label,
  value,
  icon: Icon,
  status,
}) => (
  <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
    <div className="flex items-center justify-between">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-stone-500 shadow-sm">
        <Icon className="h-4 w-4" />
      </div>

      <StatusBadge
        status={status}
        size="sm"
      />
    </div>

    <p className="mt-4 text-2xl font-bold text-stone-900">
      {value}
    </p>

    <p className="mt-1 text-xs text-stone-500">
      {label} payments
    </p>
  </div>
);

/* ===========================================================
   EMPTY
=========================================================== */

const ReportEmpty = () => (
  <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50 p-6 text-center">
    <div>
      <BarChart3 className="mx-auto h-7 w-7 text-stone-300" />

      <p className="mt-3 text-sm font-semibold text-stone-500">
        No report data available
      </p>

      <p className="mt-1 text-xs text-stone-400">
        Data will appear here when bookings
        are available.
      </p>
    </div>
  </div>
);

/* ===========================================================
   TABLE HEAD
=========================================================== */

const TableHead = ({
  children,
  align = "left",
}) => (
  <th
    className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-stone-400 ${
      align === "right"
        ? "text-right"
        : "text-left"
    }`}
  >
    {children}
  </th>
);

/* ===========================================================
   CREDIT CARD ICON
=========================================================== */

const CreditCardIcon = ({
  className = "",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
    />

    <path d="M3 10h18" />

    <path d="M7 15h3" />
  </svg>
);

/* ===========================================================
   HELPERS
=========================================================== */

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const filterByPeriod = (
  items,
  period
) => {
  if (period === "all") {
    return items;
  }

  const now = new Date();

  return items.filter((item) => {
    const rawDate =
      item.createdAt ||
      item.date ||
      item.eventDate;

    if (!rawDate) return false;

    const date = new Date(rawDate);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return false;
    }

    if (period === "today") {
      return (
        date.toDateString() ===
        now.toDateString()
      );
    }

    if (period === "week") {
      const start = new Date(now);

      const day =
        start.getDay();

      start.setDate(
        start.getDate() -
          day
      );

      start.setHours(
        0,
        0,
        0,
        0
      );

      return date >= start;
    }

    if (period === "month") {
      return (
        date.getMonth() ===
          now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    }

    if (period === "year") {
      return (
        date.getFullYear() ===
        now.getFullYear()
      );
    }

    return true;
  });
};

const safeDate = (value) => {
  try {
    return formatDate(value);
  } catch {
    const date = new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return String(value);
    }

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    ).format(date);
  }
};

const formatCompactCurrency = (
  value
) => {
  const amount = Number(value) || 0;

  if (amount >= 10000000) {
    return `₹${(
      amount / 10000000
    ).toFixed(1)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(
      amount / 100000
    ).toFixed(1)}L`;
  }

  if (amount >= 1000) {
    return `₹${(
      amount / 1000
    ).toFixed(1)}K`;
  }

  return formatCurrency(
    amount
  );
};

const csvEscape = (value) => {
  const text = String(
    value ?? ""
  );

  return `"${text.replace(
    /"/g,
    '""'
  )}"`;
};

export default Reports;