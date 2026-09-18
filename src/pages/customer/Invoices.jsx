import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  FileText,
  IndianRupee,
  Mail,
  MapPin,
  Printer,
  Receipt,
  Search,
  Sparkles,
  User,
  Users,
  X,
} from "lucide-react";

import { useBooking } from "../../context/BookingContext";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  formatDate,
  formatDateTime,
} from "../../utils/formatDate";

const Invoices = () => {
  const navigate = useNavigate();
  const { userBookings } = useBooking();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getBookingId = (booking) =>
    booking?.id ||
    booking?._id ||
    booking?.bookingNumber;

  const getBookingNumber = (booking) =>
    booking?.bookingNumber ||
    booking?.id ||
    booking?._id ||
    "—";

  const getTitle = (booking) =>
    booking?.eventName ||
    booking?.eventTitle ||
    booking?.event?.title ||
    booking?.title ||
    booking?.name ||
    "Event Booking";

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

  const getGuestCount = (booking) =>
    booking?.guestCount ||
    booking?.guests ||
    booking?.event?.guestCount ||
    0;

  const getLocation = (booking) => {
    if (typeof booking?.location === "string") {
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

  const getCustomerName = (booking) =>
    booking?.customerName ||
    booking?.customer?.name ||
    booking?.user?.name ||
    booking?.user?.fullName ||
    booking?.name ||
    "Customer";

  const getCustomerEmail = (booking) =>
    booking?.customerEmail ||
    booking?.customer?.email ||
    booking?.user?.email ||
    booking?.email ||
    "Not provided";

  /* =========================================================
     INVOICE DATA
  ========================================================= */

  const invoices = useMemo(() => {
    if (!Array.isArray(userBookings)) {
      return [];
    }

    return userBookings.map((booking, index) => ({
      ...booking,
      invoiceId:
        booking?.invoiceNumber ||
        `INV-${String(index + 1).padStart(4, "0")}`,
    }));
  }, [userBookings]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const searchableText = [
        getTitle(invoice),
        getBookingNumber(invoice),
        invoice.invoiceId,
        getCustomerName(invoice),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const paymentStatus = String(
        getPaymentStatus(invoice)
      ).toLowerCase();

      const matchesStatus =
        statusFilter === "all" ||
        paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  /* =========================================================
     SUMMARY
  ========================================================= */

  const summary = useMemo(() => {
    const total = invoices.length;

    const paid = invoices.filter(
      (invoice) =>
        String(getPaymentStatus(invoice)).toLowerCase() ===
        "paid"
    ).length;

    const pending = invoices.filter(
      (invoice) =>
        String(getPaymentStatus(invoice)).toLowerCase() ===
        "pending"
    ).length;

    const amount = invoices.reduce(
      (sum, invoice) => sum + getAmount(invoice),
      0
    );

    return {
      total,
      paid,
      pending,
      amount,
    };
  }, [invoices]);

  /* =========================================================
     PRINT
  ========================================================= */

  const handlePrint = () => {
    window.print();
  };

  /* =========================================================
     DOWNLOAD
  ========================================================= */

  const handleDownload = (invoice) => {
    if (!invoice) return;

    const content = `
EVENTARA
Event Planning & Management

INVOICE
Invoice Number: ${invoice.invoiceId}
Booking ID: ${getBookingNumber(invoice)}

Customer: ${getCustomerName(invoice)}
Email: ${getCustomerEmail(invoice)}

Event: ${getTitle(invoice)}
Event Date: ${
      getEventDate(invoice)
        ? formatDate(getEventDate(invoice))
        : "Not specified"
    }
Guests: ${getGuestCount(invoice)}
Location: ${getLocation(invoice)}

Booking Amount: ${formatCurrency(getAmount(invoice))}
Payment Status: ${getPaymentStatus(invoice)}

Generated: ${
      getCreatedDate(invoice)
        ? formatDateTime(getCreatedDate(invoice))
        : formatDate(new Date())
    }

Thank you for choosing Eventara.
    `.trim();

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${invoice.invoiceId}.txt`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pb-20 text-white">
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

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
          className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
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
          className="absolute right-[-100px] top-80 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-3xl"
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

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_38%)]" />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
              <Receipt className="h-4 w-4" />
              Billing Center
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
            </div>

            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                    My Invoices
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Keep track of your event bookings,
                  invoices and payment records in one
                  beautiful place.
                </p>
              </div>

              <Button
                to="/payments"
                variant="outline"
                size="sm"
                icon={
                  <IndianRupee className="h-4 w-4" />
                }
                className="border-cyan-400/30 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20"
              >
                Payment History
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
            SUMMARY
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<Receipt className="h-5 w-5" />}
            label="Total invoices"
            value={summary.total}
            delay={0}
            theme="violet"
          />

          <SummaryCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Paid invoices"
            value={summary.paid}
            delay={0.05}
            theme="emerald"
          />

          <SummaryCard
            icon={<Clock3 className="h-5 w-5" />}
            label="Pending invoices"
            value={summary.pending}
            delay={0.1}
            theme="amber"
          />

          <SummaryCard
            icon={<IndianRupee className="h-5 w-5" />}
            label="Total booking value"
            value={formatCurrency(summary.amount)}
            delay={0.15}
            theme="cyan"
          />
        </div>

        {/* =================================================
            SEARCH + FILTER
        ================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-violet-950/10 backdrop-blur-xl sm:p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-cyan-300" />

            <span className="text-sm font-bold text-white">
              Find an invoice
            </span>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search invoice, booking, event or customer..."
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/80 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            <div className="relative lg:w-60">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/80 px-4 pr-10 text-sm font-medium text-slate-200 outline-none transition focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-500/10"
              >
                <option value="all">
                  All payment statuses
                </option>

                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" />
            </div>
          </div>
        </motion.section>

        {/* =================================================
            INVOICE LIST
        ================================================= */}

        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-fuchsia-300" />

                <h2 className="text-xl font-bold text-white">
                  Invoice Records
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-400">
                Showing{" "}
                <span className="font-semibold text-cyan-300">
                  {filteredInvoices.length}
                </span>{" "}
                of {invoices.length} records
              </p>
            </div>

            {search || statusFilter !== "all" ? (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="text-sm font-semibold text-violet-300 transition hover:text-fuchsia-300"
              >
                Clear filters
              </button>
            ) : null}
          </div>

          {filteredInvoices.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
              <EmptyState
                icon="search"
                title={
                  invoices.length === 0
                    ? "No invoices yet"
                    : "No invoices found"
                }
                description={
                  invoices.length === 0
                    ? "Your invoice records will appear here after you create a booking."
                    : "Try changing your search or payment status filter."
                }
                action={
                  invoices.length === 0 ? (
                    <Button
                      to="/create-event"
                      variant="primary"
                      icon={
                        <Sparkles className="h-4 w-4" />
                      }
                    >
                      Plan an Event
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSearch("");
                        setStatusFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )
                }
              />
            </div>
          ) : (
            <div className="space-y-5">
              <AnimatePresence>
                {filteredInvoices.map((invoice, index) => {
                  const paymentStatus =
                    getPaymentStatus(invoice);

                  const amount = getAmount(invoice);

                  const themes = [
                    {
                      card:
                        "from-violet-950/60 via-fuchsia-950/30 to-slate-950/80",
                      border:
                        "border-violet-400/20 hover:border-violet-400/50",
                      icon:
                        "bg-violet-500/15 text-violet-300",
                      line: "from-violet-500 to-fuchsia-500",
                      accent: "text-violet-300",
                    },
                    {
                      card:
                        "from-cyan-950/60 via-blue-950/30 to-slate-950/80",
                      border:
                        "border-cyan-400/20 hover:border-cyan-400/50",
                      icon:
                        "bg-cyan-500/15 text-cyan-300",
                      line: "from-cyan-400 to-blue-500",
                      accent: "text-cyan-300",
                    },
                    {
                      card:
                        "from-amber-950/60 via-orange-950/30 to-slate-950/80",
                      border:
                        "border-amber-400/20 hover:border-amber-400/50",
                      icon:
                        "bg-amber-500/15 text-amber-300",
                      line: "from-amber-400 to-orange-500",
                      accent: "text-amber-300",
                    },
                    {
                      card:
                        "from-rose-950/60 via-pink-950/30 to-slate-950/80",
                      border:
                        "border-rose-400/20 hover:border-rose-400/50",
                      icon:
                        "bg-rose-500/15 text-rose-300",
                      line: "from-rose-400 to-pink-500",
                      accent: "text-rose-300",
                    },
                    {
                      card:
                        "from-emerald-950/60 via-teal-950/30 to-slate-950/80",
                      border:
                        "border-emerald-400/20 hover:border-emerald-400/50",
                      icon:
                        "bg-emerald-500/15 text-emerald-300",
                      line:
                        "from-emerald-400 to-teal-500",
                      accent: "text-emerald-300",
                    },
                  ];

                  const theme =
                    themes[index % themes.length];

                  return (
                    <motion.article
                      key={
                        getBookingId(invoice) ||
                        invoice.invoiceId
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
                        delay: index * 0.05,
                      }}
                      whileHover={{ y: -3 }}
                      className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${theme.card} ${theme.border} p-5 shadow-xl shadow-black/10 transition sm:p-6`}
                    >
                      {/* top glow */}

                      <div
                        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${theme.line} opacity-70`}
                      />

                      <div
                        className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${theme.line} opacity-10 blur-3xl transition group-hover:opacity-20`}
                      />

                      <div className="relative">
                        {/* Header */}

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex min-w-0 items-start gap-4">
                            <motion.div
                              whileHover={{
                                rotate: 8,
                                scale: 1.05,
                              }}
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${theme.icon}`}
                            >
                              <FileText className="h-6 w-6" />
                            </motion.div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base font-black text-white sm:text-lg">
                                  {invoice.invoiceId}
                                </h3>

                                <StatusBadge
                                  status={paymentStatus}
                                  size="sm"
                                />
                              </div>

                              <p className="mt-1 truncate text-sm font-semibold text-slate-200">
                                {getTitle(invoice)}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Booking ID:{" "}
                                <span className="font-semibold text-slate-200">
                                  {getBookingNumber(invoice)}
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* Amount */}

                          <div className="lg:text-right">
                            <p className="text-xs font-medium text-slate-400">
                              Invoice amount
                            </p>

                            <p
                              className={`mt-1 text-2xl font-black ${theme.accent}`}
                            >
                              {formatCurrency(amount)}
                            </p>

                            {getEventDate(invoice) && (
                              <p className="mt-1 text-xs text-slate-400">
                                Event:{" "}
                                <span className="text-slate-200">
                                  {formatDate(
                                    getEventDate(invoice)
                                  )}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Details */}

                        <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                          <InvoiceDetail
                            icon={
                              <CalendarDays className="h-4 w-4" />
                            }
                            label="Event date"
                            value={
                              getEventDate(invoice)
                                ? formatDate(
                                    getEventDate(invoice)
                                  )
                                : "Not specified"
                            }
                            accent={theme.accent}
                          />

                          <InvoiceDetail
                            icon={
                              <Users className="h-4 w-4" />
                            }
                            label="Guests"
                            value={`${getGuestCount(invoice)}`}
                            accent={theme.accent}
                          />

                          <InvoiceDetail
                            icon={
                              <MapPin className="h-4 w-4" />
                            }
                            label="Location"
                            value={getLocation(invoice)}
                            accent={theme.accent}
                          />

                          <InvoiceDetail
                            icon={
                              <Clock3 className="h-4 w-4" />
                            }
                            label="Created"
                            value={
                              getCreatedDate(invoice)
                                ? formatDate(
                                    getCreatedDate(invoice)
                                  )
                                : "Not available"
                            }
                            accent={theme.accent}
                          />
                        </div>

                        {/* Actions */}

                        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setSelectedInvoice(invoice)
                            }
                            icon={
                              <Receipt className="h-4 w-4" />
                            }
                            className="text-slate-200 hover:bg-white/10 hover:text-white"
                          >
                            Preview
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleDownload(invoice)
                            }
                            icon={
                              <Download className="h-4 w-4" />
                            }
                            className="border-cyan-400/30 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20"
                          >
                            Download
                          </Button>

                          <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              navigate(
                                `/my-bookings/${getBookingId(
                                  invoice
                                )}`
                              )
                            }
                            icon={
                              <ArrowRight className="h-4 w-4" />
                            }
                          >
                            View Booking
                          </Button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* =================================================
            INFORMATION
        ================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          <InfoCard
            icon={<Receipt className="h-5 w-5" />}
            title="Invoice records"
            description="Every booking can have an associated invoice record for easy reference."
            theme="violet"
          />

          <InfoCard
            icon={<Download className="h-5 w-5" />}
            title="Download details"
            description="Download a simple copy of your invoice information for your records."
            theme="cyan"
          />

          <InfoCard
            icon={<Mail className="h-5 w-5" />}
            title="Need an official invoice?"
            description="Contact the planning team if you require a formal invoice or billing document."
            theme="rose"
          />
        </motion.section>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/80 via-fuchsia-950/60 to-cyan-950/70 p-7 shadow-2xl shadow-violet-950/20 sm:p-10"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-fuchsia-200">
                <Sparkles className="h-4 w-4" />
                Plan your next celebration
              </div>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Ready to create another memorable event?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Explore our services and start planning
                your next experience with Eventara.
              </p>
            </div>

            <Button
              to="/create-event"
              variant="primary"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Create Event
            </Button>
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          INVOICE PREVIEW MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedInvoice && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedInvoice(null)}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              transition={{ duration: 0.25 }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-violet-950/40"
            >
              {/* Modal header */}

              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-5 py-4 backdrop-blur-xl sm:px-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-fuchsia-300">
                    Invoice Preview
                  </p>

                  <h2 className="mt-1 text-lg font-black text-white">
                    {selectedInvoice.invoiceId}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedInvoice(null)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-rose-500/20 hover:text-rose-300"
                  aria-label="Close invoice preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Invoice */}

              <div
                id="invoice-preview"
                className="p-5 sm:p-8"
              >
                {/* Invoice top */}

                <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-fuchsia-500/20">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-black text-white">
                        Eventara
                      </p>

                      <p className="text-xs text-slate-400">
                        Event Planning & Management
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Invoice
                    </p>

                    <p className="mt-1 text-lg font-black text-cyan-300">
                      {selectedInvoice.invoiceId}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Booking{" "}
                      {getBookingNumber(
                        selectedInvoice
                      )}
                    </p>
                  </div>
                </div>

                {/* Customer */}

                <div className="grid gap-6 py-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Billed to
                    </p>

                    <div className="mt-3 flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                        <User className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-white">
                          {getCustomerName(
                            selectedInvoice
                          )}
                        </p>

                        <p className="mt-1 break-all text-xs text-slate-400">
                          {getCustomerEmail(
                            selectedInvoice
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Payment status
                    </p>

                    <div className="mt-3 sm:flex sm:justify-end">
                      <StatusBadge
                        status={getPaymentStatus(
                          selectedInvoice
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Event details */}

                <div className="relative overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-950/50 via-slate-900 to-cyan-950/40 p-5">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-2xl" />

                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-wider text-fuchsia-300">
                      Event details
                    </p>

                    <h3 className="mt-2 text-lg font-black text-white">
                      {getTitle(selectedInvoice)}
                    </h3>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <InvoiceDetail
                        icon={
                          <CalendarDays className="h-4 w-4" />
                        }
                        label="Event date"
                        value={
                          getEventDate(selectedInvoice)
                            ? formatDate(
                                getEventDate(
                                  selectedInvoice
                                )
                              )
                            : "Not specified"
                        }
                        accent="text-violet-300"
                      />

                      <InvoiceDetail
                        icon={
                          <Users className="h-4 w-4" />
                        }
                        label="Guests"
                        value={`${getGuestCount(
                          selectedInvoice
                        )}`}
                        accent="text-cyan-300"
                      />

                      <InvoiceDetail
                        icon={
                          <MapPin className="h-4 w-4" />
                        }
                        label="Location"
                        value={getLocation(
                          selectedInvoice
                        )}
                        accent="text-amber-300"
                      />

                      <InvoiceDetail
                        icon={
                          <Clock3 className="h-4 w-4" />
                        }
                        label="Created"
                        value={
                          getCreatedDate(
                            selectedInvoice
                          )
                            ? formatDateTime(
                                getCreatedDate(
                                  selectedInvoice
                                )
                              )
                            : "Not available"
                        }
                        accent="text-emerald-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Amount */}

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-slate-400">
                      Booking total
                    </span>

                    <span className="text-2xl font-black text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text">
                      {formatCurrency(
                        getAmount(selectedInvoice)
                      )}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4 text-xs text-slate-500">
                    <span>Invoice status</span>

                    <StatusBadge
                      status={getBookingStatus(
                        selectedInvoice
                      )}
                      size="sm"
                    />
                  </div>
                </div>

                {/* Notice */}

                <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-cyan-500/5 p-4 text-center">
                  <p className="text-xs leading-5 text-slate-400">
                    This is a customer-side invoice preview.
                    Connect your backend/PDF service later
                    if you need an official downloadable PDF
                    invoice.
                  </p>
                </div>
              </div>

              {/* Modal actions */}

              <div className="sticky bottom-0 flex flex-col gap-2 border-t border-white/10 bg-slate-950/95 p-4 backdrop-blur-xl sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  icon={
                    <Printer className="h-4 w-4" />
                  }
                  className="border-violet-400/30 bg-violet-500/10 text-violet-100 hover:bg-violet-500/20"
                >
                  Print
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    handleDownload(selectedInvoice)
                  }
                  icon={
                    <Download className="h-4 w-4" />
                  }
                >
                  Download
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

/* ===========================================================
   SUMMARY CARD
=========================================================== */

const SummaryCard = ({
  icon,
  label,
  value,
  delay,
  theme,
}) => {
  const themes = {
    violet: {
      border: "border-violet-400/20",
      bg: "from-violet-950/70 to-fuchsia-950/30",
      icon: "bg-violet-500/15 text-violet-300",
      glow: "bg-violet-500/20",
    },

    emerald: {
      border: "border-emerald-400/20",
      bg: "from-emerald-950/70 to-teal-950/30",
      icon: "bg-emerald-500/15 text-emerald-300",
      glow: "bg-emerald-500/20",
    },

    amber: {
      border: "border-amber-400/20",
      bg: "from-amber-950/70 to-orange-950/30",
      icon: "bg-amber-500/15 text-amber-300",
      glow: "bg-amber-500/20",
    },

    cyan: {
      border: "border-cyan-400/20",
      bg: "from-cyan-950/70 to-blue-950/30",
      icon: "bg-cyan-500/15 text-cyan-300",
      glow: "bg-cyan-500/20",
    },
  };

  const current =
    themes[theme] || themes.violet;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-3xl border ${current.border} bg-gradient-to-br ${current.bg} p-5 shadow-xl shadow-black/10`}
    >
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${current.glow} opacity-30 blur-3xl transition group-hover:opacity-60`}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${current.icon}`}
          >
            {icon}
          </div>

          <FileText className="h-4 w-4 text-white/10" />
        </div>

        <p className="mt-5 text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-xl font-black text-white">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

/* ===========================================================
   INVOICE DETAIL
=========================================================== */

const InvoiceDetail = ({
  icon,
  label,
  value,
  accent = "text-violet-300",
}) => (
  <div className="flex min-w-0 items-start gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3">
    <span className={`mt-0.5 shrink-0 ${accent}`}>
      {icon}
    </span>

    <div className="min-w-0">
      <p className="text-[11px] font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-semibold text-slate-200">
        {value}
      </p>
    </div>
  </div>
);

/* ===========================================================
   INFO CARD
=========================================================== */

const InfoCard = ({
  icon,
  title,
  description,
  theme,
}) => {
  const themes = {
    violet: {
      border: "border-violet-400/20",
      icon: "bg-violet-500/10 text-violet-300",
      glow: "bg-violet-500/15",
    },

    cyan: {
      border: "border-cyan-400/20",
      icon: "bg-cyan-500/10 text-cyan-300",
      glow: "bg-cyan-500/15",
    },

    rose: {
      border: "border-rose-400/20",
      icon: "bg-rose-500/10 text-rose-300",
      glow: "bg-rose-500/15",
    },
  };

  const current =
    themes[theme] || themes.violet;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-3xl border ${current.border} bg-white/[0.05] p-5 backdrop-blur-xl`}
    >
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${current.glow} opacity-30 blur-3xl group-hover:opacity-60`}
      />

      <div className="relative">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${current.icon}`}
        >
          {icon}
        </div>

        <h3 className="mt-4 text-sm font-black text-white">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default Invoices;