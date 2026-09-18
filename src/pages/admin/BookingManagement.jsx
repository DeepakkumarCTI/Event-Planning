import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Edit3,
  Eye,
  Filter,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Trash2,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  formatDate,
  formatDateTime,
} from "../../utils/formatDate";
import { useBooking } from "../../context/BookingContext";

const BookingManagement = () => {
  const {
    bookings,
    updateBooking,
    confirmBooking,
    completeBooking,
    cancelBooking,
    updatePaymentStatus,
    deleteBooking,
  } = useBooking();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [paymentFilter, setPaymentFilter] =
    useState("all");

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [editBooking, setEditBooking] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  /* =========================================================
     FILTER BOOKINGS
  ========================================================= */

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return (bookings || []).filter((booking) => {
      const customerName =
        booking.customerName ||
        booking.name ||
        booking.userName ||
        booking.customer?.name ||
        booking.shippingAddress?.name ||
        "";

      const email =
        booking.email ||
        booking.customerEmail ||
        booking.customer?.email ||
        "";

      const phone =
        booking.phone ||
        booking.customerPhone ||
        booking.customer?.phone ||
        booking.shippingAddress?.phone ||
        "";

      const eventName =
        booking.eventName ||
        booking.eventTitle ||
        booking.title ||
        booking.event?.title ||
        "";

      const bookingId =
        booking.id ||
        booking.bookingId ||
        "";

      const matchesSearch =
        !query ||
        String(customerName)
          .toLowerCase()
          .includes(query) ||
        String(email)
          .toLowerCase()
          .includes(query) ||
        String(phone)
          .toLowerCase()
          .includes(query) ||
        String(eventName)
          .toLowerCase()
          .includes(query) ||
        String(bookingId)
          .toLowerCase()
          .includes(query);

      const bookingStatus =
        normalizeStatus(
          booking.status ||
            booking.bookingStatus ||
            booking.orderStatus ||
            "pending"
        );

      const paymentStatus =
        normalizeStatus(
          booking.paymentStatus ||
            booking.payment?.status ||
            "pending"
        );

      const matchesStatus =
        statusFilter === "all" ||
        bookingStatus === statusFilter;

      const matchesPayment =
        paymentFilter === "all" ||
        paymentStatus === paymentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [
    bookings,
    search,
    statusFilter,
    paymentFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const list = bookings || [];

    const total = list.length;

    const pending = list.filter(
      (booking) =>
        normalizeStatus(
          booking.status ||
            booking.bookingStatus ||
            booking.orderStatus
        ) === "pending"
    ).length;

    const confirmed = list.filter(
      (booking) =>
        normalizeStatus(
          booking.status ||
            booking.bookingStatus ||
            booking.orderStatus
        ) === "confirmed"
    ).length;

    const completed = list.filter(
      (booking) =>
        normalizeStatus(
          booking.status ||
            booking.bookingStatus ||
            booking.orderStatus
        ) === "completed"
    ).length;

    const cancelled = list.filter(
      (booking) =>
        normalizeStatus(
          booking.status ||
            booking.bookingStatus ||
            booking.orderStatus
        ) === "cancelled"
    ).length;

    const paid = list.filter(
      (booking) =>
        normalizeStatus(
          booking.paymentStatus ||
            booking.payment?.status
        ) === "paid"
    ).length;

    const revenue = list.reduce(
      (totalAmount, booking) =>
        totalAmount +
        getBookingAmount(booking),
      0
    );

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      paid,
      revenue,
    };
  }, [bookings]);

  /* =========================================================
     BOOKING ACTIONS
  ========================================================= */

  const handleConfirm = async (booking) => {
    if (confirmBooking) {
      await confirmBooking(
        getBookingId(booking)
      );
      return;
    }

    await updateBooking?.(
      getBookingId(booking),
      {
        status: "Confirmed",
        bookingStatus: "Confirmed",
      }
    );
  };

  const handleComplete = async (booking) => {
    if (completeBooking) {
      await completeBooking(
        getBookingId(booking)
      );
      return;
    }

    await updateBooking?.(
      getBookingId(booking),
      {
        status: "Completed",
        bookingStatus: "Completed",
      }
    );
  };

  const handleCancel = async (booking) => {
    if (cancelBooking) {
      await cancelBooking(
        getBookingId(booking)
      );
      return;
    }

    await updateBooking?.(
      getBookingId(booking),
      {
        status: "Cancelled",
        bookingStatus: "Cancelled",
      }
    );
  };

  const handlePaymentStatus = async (
    booking,
    status
  ) => {
    if (updatePaymentStatus) {
      await updatePaymentStatus(
        getBookingId(booking),
        status
      );
      return;
    }

    await updateBooking?.(
      getBookingId(booking),
      {
        paymentStatus: status,
      }
    );
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    if (deleteBooking) {
      await deleteBooking(
        getBookingId(deleteTarget)
      );
    }

    setDeleteTarget(null);
    setSelectedBooking(null);
  };

  const handleUpdate = async (updatedData) => {
    if (!editBooking) return;

    if (updateBooking) {
      await updateBooking(
        getBookingId(editBooking),
        updatedData
      );
    }

    setEditBooking(null);
    setSelectedBooking(null);
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
                <CalendarDays className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Booking Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Manage Bookings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Review customer bookings, update booking
                status, track payments and manage event
                reservations.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Booking Revenue
                </p>

                <p className="mt-0.5 text-sm font-bold text-stone-800">
                  {formatCurrency(
                    stats.revenue
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <BookingStat
            title="Total Bookings"
            value={stats.total}
            icon={CalendarDays}
          />

          <BookingStat
            title="Pending"
            value={stats.pending}
            icon={Clock3}
          />

          <BookingStat
            title="Confirmed"
            value={stats.confirmed}
            icon={CheckCircle2}
          />

          <BookingStat
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
          />

          <BookingStat
            title="Cancelled"
            value={stats.cancelled}
            icon={XCircle}
          />
        </div>

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="mt-6 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-3 xl:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search customer, event, email, phone or booking ID..."
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            <FilterSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                {
                  value: "all",
                  label: "All Booking Status",
                },
                {
                  value: "pending",
                  label: "Pending",
                },
                {
                  value: "confirmed",
                  label: "Confirmed",
                },
                {
                  value: "completed",
                  label: "Completed",
                },
                {
                  value: "cancelled",
                  label: "Cancelled",
                },
              ]}
            />

            <FilterSelect
              value={paymentFilter}
              onChange={setPaymentFilter}
              options={[
                {
                  value: "all",
                  label: "All Payment Status",
                },
                {
                  value: "pending",
                  label: "Payment Pending",
                },
                {
                  value: "paid",
                  label: "Paid",
                },
                {
                  value: "failed",
                  label: "Failed",
                },
                {
                  value: "refunded",
                  label: "Refunded",
                },
              ]}
            />

            {(search ||
              statusFilter !== "all" ||
              paymentFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setPaymentFilter("all");
                }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 text-xs font-bold text-stone-600 transition hover:bg-stone-50"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </motion.section>

        {/* ===================================================
            RESULT INFO
        =================================================== */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-bold text-stone-800">
              {filteredBookings.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-800">
              {(bookings || []).length}
            </span>{" "}
            bookings
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Filter className="h-3.5 w-3.5" />
            {stats.paid} paid bookings
          </div>
        </div>

        {/* ===================================================
            BOOKINGS
        =================================================== */}

        {filteredBookings.length > 0 ? (
          <motion.div
            layout
            className="mt-3 space-y-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredBookings.map(
                (booking, index) => (
                  <BookingCard
                    key={getBookingId(booking)}
                    booking={booking}
                    index={index}
                    onView={() =>
                      setSelectedBooking(
                        booking
                      )
                    }
                    onEdit={() =>
                      setEditBooking(booking)
                    }
                    onConfirm={() =>
                      handleConfirm(booking)
                    }
                    onComplete={() =>
                      handleComplete(booking)
                    }
                    onCancel={() =>
                      handleCancel(booking)
                    }
                    onDelete={() =>
                      setDeleteTarget(booking)
                    }
                    onPaymentChange={(status) =>
                      handlePaymentStatus(
                        booking,
                        status
                      )
                    }
                  />
                )
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-3 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <EmptyState
              icon="search"
              title="No bookings found"
              description="Try changing your search or booking filters."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearch("");
                  setStatusFilter("all");
                  setPaymentFilter("all");
                },
              }}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          VIEW BOOKING
      ===================================================== */}

      <Modal
        isOpen={Boolean(selectedBooking)}
        onClose={() =>
          setSelectedBooking(null)
        }
        title="Booking Details"
        description={
          selectedBooking
            ? `Booking ${getBookingDisplayId(
                selectedBooking
              )}`
            : ""
        }
        size="xl"
      >
        {selectedBooking && (
          <BookingDetails
            booking={selectedBooking}
            onClose={() =>
              setSelectedBooking(null)
            }
            onEdit={() => {
              setEditBooking(
                selectedBooking
              );
              setSelectedBooking(null);
            }}
            onConfirm={() =>
              handleConfirm(
                selectedBooking
              )
            }
            onComplete={() =>
              handleComplete(
                selectedBooking
              )
            }
            onCancel={() =>
              handleCancel(
                selectedBooking
              )
            }
            onPaymentChange={(status) =>
              handlePaymentStatus(
                selectedBooking,
                status
              )
            }
          />
        )}
      </Modal>

      {/* =====================================================
          EDIT BOOKING
      ===================================================== */}

      <Modal
        isOpen={Boolean(editBooking)}
        onClose={() =>
          setEditBooking(null)
        }
        title="Edit Booking"
        description="Update booking information and status."
        size="lg"
      >
        {editBooking && (
          <BookingForm
            booking={editBooking}
            onClose={() =>
              setEditBooking(null)
            }
            onSave={handleUpdate}
          />
        )}
      </Modal>

      {/* =====================================================
          DELETE BOOKING
      ===================================================== */}

      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() =>
          setDeleteTarget(null)
        }
        title="Delete Booking?"
        description="This action cannot be undone."
        size="sm"
      >
        {deleteTarget && (
          <div>
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-red-800">
                    {getBookingDisplayId(
                      deleteTarget
                    )}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    This booking will be permanently
                    removed from the booking list.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setDeleteTarget(null)
                }
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={handleDelete}
                icon={
                  <Trash2 className="h-4 w-4" />
                }
              >
                Delete Booking
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

/* ===========================================================
   BOOKING CARD
=========================================================== */

const BookingCard = ({
  booking,
  index,
  onView,
  onEdit,
  onConfirm,
  onComplete,
  onCancel,
  onDelete,
  onPaymentChange,
}) => {
  const status = normalizeStatus(
    booking.status ||
      booking.bookingStatus ||
      booking.orderStatus ||
      "pending"
  );

  const paymentStatus = normalizeStatus(
    booking.paymentStatus ||
      booking.payment?.status ||
      "pending"
  );

  const customerName = getCustomerName(
    booking
  );

  const eventName = getEventName(
    booking
  );

  const date =
    booking.eventDate ||
    booking.date ||
    booking.event?.date;

  const guests =
    booking.guestCount ||
    booking.guests ||
    booking.event?.guestCount ||
    0;

  const amount = getBookingAmount(
    booking
  );

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
      }}
      transition={{
        delay: index * 0.03,
      }}
      className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:border-amber-200 hover:shadow-md"
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
          {/* Booking identity */}

          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-stone-100 px-2 py-1 text-[10px] font-bold text-stone-500">
                  {getBookingDisplayId(
                    booking
                  )}
                </span>

                <StatusBadge
                  status={status}
                  size="sm"
                />

                <StatusBadge
                  status={paymentStatus}
                  label={`Payment: ${formatStatusLabel(
                    paymentStatus
                  )}`}
                  size="sm"
                />
              </div>

              <h3 className="mt-2 truncate text-base font-bold text-stone-900">
                {eventName}
              </h3>

              <p className="mt-1 text-xs text-stone-500">
                Customer:{" "}
                <span className="font-semibold text-stone-700">
                  {customerName}
                </span>
              </p>
            </div>
          </div>

          {/* Event info */}

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 xl:w-[510px]">
            <BookingInfo
              icon={CalendarDays}
              label="Event Date"
              value={
                date
                  ? formatDate(date)
                  : "Not set"
              }
            />

            <BookingInfo
              icon={Users}
              label="Guests"
              value={
                guests
                  ? `${guests}`
                  : "Not set"
              }
            />

            <BookingInfo
              icon={MapPin}
              label="Location"
              value={getBookingLocation(
                booking
              )}
            />

            <BookingInfo
              icon={CreditCard}
              label="Amount"
              value={formatCurrency(amount)}
            />
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-2 xl:w-[360px] xl:justify-end">
            <SmallAction
              icon={Eye}
              label="View"
              onClick={onView}
            />

            <SmallAction
              icon={Edit3}
              label="Edit"
              onClick={onEdit}
            />

            {status === "pending" && (
              <SmallAction
                icon={CheckCircle2}
                label="Confirm"
                onClick={onConfirm}
                primary
              />
            )}

            {status === "confirmed" && (
              <SmallAction
                icon={CheckCircle2}
                label="Complete"
                onClick={onComplete}
                primary
              />
            )}

            {status !== "completed" &&
              status !== "cancelled" && (
                <SmallAction
                  icon={XCircle}
                  label="Cancel"
                  onClick={onCancel}
                  danger
                />
              )}

            <SmallAction
              icon={Trash2}
              label="Delete"
              onClick={onDelete}
              danger
            />
          </div>
        </div>
      </div>

      {/* Bottom line */}

      <div className="flex flex-col gap-2 border-t border-stone-100 bg-stone-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-2 text-[11px] text-stone-400">
          <Clock3 className="h-3.5 w-3.5" />

          Created{" "}
          {booking.createdAt
            ? formatDateTime(
                booking.createdAt
              )
            : "recently"}
        </div>

        <PaymentSelector
          value={paymentStatus}
          onChange={onPaymentChange}
        />
      </div>
    </motion.article>
  );
};

/* ===========================================================
   BOOKING DETAILS
=========================================================== */

const BookingDetails = ({
  booking,
  onClose,
  onEdit,
  onConfirm,
  onComplete,
  onCancel,
  onPaymentChange,
}) => {
  const status = normalizeStatus(
    booking.status ||
      booking.bookingStatus ||
      booking.orderStatus ||
      "pending"
  );

  const paymentStatus = normalizeStatus(
    booking.paymentStatus ||
      booking.payment?.status ||
      "pending"
  );

  const date =
    booking.eventDate ||
    booking.date ||
    booking.event?.date;

  const guests =
    booking.guestCount ||
    booking.guests ||
    booking.event?.guestCount ||
    0;

  const amount = getBookingAmount(
    booking
  );

  return (
    <div>
      {/* Header card */}

      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-stone-500 shadow-sm">
                {getBookingDisplayId(
                  booking
                )}
              </span>

              <StatusBadge
                status={status}
                size="sm"
              />
            </div>

            <h2 className="mt-3 text-xl font-bold text-stone-900">
              {getEventName(booking)}
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Customer:{" "}
              <span className="font-semibold text-stone-700">
                {getCustomerName(booking)}
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-right shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Booking Amount
            </p>

            <p className="mt-1 text-xl font-bold text-stone-900">
              {formatCurrency(amount)}
            </p>
          </div>
        </div>
      </div>

      {/* Customer */}

      <section className="mt-5">
        <SectionLabel>
          Customer Information
        </SectionLabel>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem
            icon={User}
            label="Customer"
            value={getCustomerName(
              booking
            )}
          />

          <DetailItem
            icon={Mail}
            label="Email"
            value={getCustomerEmail(
              booking
            )}
          />

          <DetailItem
            icon={Phone}
            label="Phone"
            value={getCustomerPhone(
              booking
            )}
          />
        </div>
      </section>

      {/* Event */}

      <section className="mt-5">
        <SectionLabel>
          Event Information
        </SectionLabel>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            icon={CalendarDays}
            label="Event Date"
            value={
              date
                ? formatDate(date)
                : "Not provided"
            }
          />

          <DetailItem
            icon={Users}
            label="Guests"
            value={
              guests
                ? `${guests} guests`
                : "Not provided"
            }
          />

          <DetailItem
            icon={MapPin}
            label="Location"
            value={getBookingLocation(
              booking
            )}
          />

          <DetailItem
            icon={CreditCard}
            label="Payment"
            value={formatStatusLabel(
              paymentStatus
            )}
          />
        </div>
      </section>

      {/* Address */}

      {getAddressText(booking) && (
        <section className="mt-5">
          <SectionLabel>
            Event / Delivery Address
          </SectionLabel>

          <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-4">
            <p className="text-sm leading-6 text-stone-600">
              {getAddressText(booking)}
            </p>
          </div>
        </section>
      )}

      {/* Notes */}

      {getBookingNotes(booking) && (
        <section className="mt-5">
          <SectionLabel>
            Customer Notes
          </SectionLabel>

          <div className="mt-3 rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-sm leading-6 text-stone-600">
              {getBookingNotes(booking)}
            </p>
          </div>
        </section>
      )}

      {/* Payment */}

      <section className="mt-5">
        <SectionLabel>
          Payment Status
        </SectionLabel>

        <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
              <CreditCard className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-bold text-stone-800">
                Payment
              </p>

              <p className="mt-1 text-xs text-stone-400">
                Current status:{" "}
                {formatStatusLabel(
                  paymentStatus
                )}
              </p>
            </div>
          </div>

          <PaymentSelector
            value={paymentStatus}
            onChange={onPaymentChange}
          />
        </div>
      </section>

      {/* Timeline */}

      <section className="mt-5">
        <SectionLabel>
          Booking Timeline
        </SectionLabel>

        <div className="mt-3 space-y-3">
          <TimelineItem
            title="Booking Created"
            date={booking.createdAt}
            active
          />

          {booking.confirmedAt && (
            <TimelineItem
              title="Booking Confirmed"
              date={booking.confirmedAt}
              active
            />
          )}

          {booking.completedAt && (
            <TimelineItem
              title="Booking Completed"
              date={booking.completedAt}
              active
            />
          )}

          {booking.cancelledAt && (
            <TimelineItem
              title="Booking Cancelled"
              date={booking.cancelledAt}
              active
              danger
            />
          )}
        </div>
      </section>

      {/* Actions */}

      <div className="mt-6 flex flex-col gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:flex-wrap sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Close
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onEdit}
          icon={
            <Edit3 className="h-4 w-4" />
          }
        >
          Edit
        </Button>

        {status === "pending" && (
          <Button
            type="button"
            variant="primary"
            onClick={onConfirm}
            icon={
              <CheckCircle2 className="h-4 w-4" />
            }
          >
            Confirm Booking
          </Button>
        )}

        {status === "confirmed" && (
          <Button
            type="button"
            variant="primary"
            onClick={onComplete}
            icon={
              <CheckCircle2 className="h-4 w-4" />
            }
          >
            Mark Completed
          </Button>
        )}

        {status !== "completed" &&
          status !== "cancelled" && (
            <Button
              type="button"
              variant="danger"
              onClick={onCancel}
              icon={
                <XCircle className="h-4 w-4" />
              }
            >
              Cancel Booking
            </Button>
          )}
      </div>
    </div>
  );
};

/* ===========================================================
   BOOKING FORM
=========================================================== */

const BookingForm = ({
  booking,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    status:
      booking.status ||
      booking.bookingStatus ||
      booking.orderStatus ||
      "Pending",

    paymentStatus:
      booking.paymentStatus ||
      booking.payment?.status ||
      "Pending",

    eventDate:
      booking.eventDate ||
      booking.date ||
      booking.event?.date ||
      "",

    guestCount:
      booking.guestCount ||
      booking.guests ||
      booking.event?.guestCount ||
      "",

    amount:
      getBookingAmount(booking),

    notes:
      getBookingNotes(booking),
  });

  const [error, setError] =
    useState("");

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.eventDate) {
      setError(
        "Please provide an event date."
      );
      return;
    }

    if (
      Number(formData.guestCount) <
      1
    ) {
      setError(
        "Guest count must be at least 1."
      );
      return;
    }

    onSave({
      status: formData.status,
      bookingStatus: formData.status,
      paymentStatus:
        formData.paymentStatus,
      eventDate:
        formData.eventDate,
      guestCount:
        Number(formData.guestCount),
      guests:
        Number(formData.guestCount),
      amount:
        Number(formData.amount) || 0,
      totalAmount:
        Number(formData.amount) || 0,
      notes: formData.notes,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-xs font-semibold text-red-700">
            {error}
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Booking
        </p>

        <p className="mt-1 text-sm font-bold text-stone-800">
          {getBookingDisplayId(booking)}
        </p>

        <p className="mt-1 text-xs text-stone-500">
          {getEventName(booking)} ·{" "}
          {getCustomerName(booking)}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Booking Status">
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-input appearance-none pr-10"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          </div>
        </FormField>

        <FormField label="Payment Status">
          <div className="relative">
            <select
              name="paymentStatus"
              value={
                formData.paymentStatus
              }
              onChange={handleChange}
              className="form-input appearance-none pr-10"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Failed">
                Failed
              </option>

              <option value="Refunded">
                Refunded
              </option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          </div>
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Event Date">
          <input
            type="date"
            name="eventDate"
            value={formatDateInput(
              formData.eventDate
            )}
            onChange={handleChange}
            className="form-input"
          />
        </FormField>

        <FormField label="Guest Count">
          <input
            type="number"
            min="1"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            placeholder="100"
            className="form-input"
          />
        </FormField>
      </div>

      <FormField label="Booking Amount">
        <input
          type="number"
          min="0"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="50000"
          className="form-input"
        />
      </FormField>

      <FormField label="Notes">
        <textarea
          name="notes"
          rows="4"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add booking notes..."
          className="form-input min-h-[110px] py-3"
        />
      </FormField>

      <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          icon={
            <CheckCircle2 className="h-4 w-4" />
          }
        >
          Save Booking
        </Button>
      </div>
    </form>
  );
};

/* ===========================================================
   BOOKING INFO
=========================================================== */

const BookingInfo = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="min-w-0">
    <div className="flex items-center gap-1.5 text-stone-400">
      <Icon className="h-3.5 w-3.5 shrink-0" />

      <span className="text-[9px] font-bold uppercase tracking-wider">
        {label}
      </span>
    </div>

    <p className="mt-1 truncate text-xs font-semibold text-stone-700">
      {value}
    </p>
  </div>
);

/* ===========================================================
   DETAIL ITEM
=========================================================== */

const DetailItem = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-amber-600" />

      <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
        {label}
      </p>
    </div>

    <p className="mt-2 break-words text-sm font-semibold text-stone-700">
      {value}
    </p>
  </div>
);

/* ===========================================================
   PAYMENT SELECTOR
=========================================================== */

const PaymentSelector = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <select
        value={capitalizeStatus(value)}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-8 appearance-none rounded-lg border border-stone-200 bg-white pl-3 pr-8 text-[10px] font-bold text-stone-600 outline-none transition hover:border-amber-300 focus:border-amber-400"
      >
        <option value="Pending">
          Payment Pending
        </option>

        <option value="Paid">
          Paid
        </option>

        <option value="Failed">
          Failed
        </option>

        <option value="Refunded">
          Refunded
        </option>
      </select>

      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-stone-400" />
    </div>
  );
};

/* ===========================================================
   SMALL ACTION
=========================================================== */

const SmallAction = ({
  icon: Icon,
  label,
  onClick,
  primary = false,
  danger = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-[10px] font-bold transition ${
      danger
        ? "bg-red-50 text-red-600 hover:bg-red-100"
        : primary
        ? "bg-amber-500 text-white shadow-sm hover:bg-amber-600"
        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
    }`}
  >
    <Icon className="h-3.5 w-3.5" />
    {label}
  </button>
);

/* ===========================================================
   BOOKING STAT
=========================================================== */

const BookingStat = ({
  title,
  value,
  icon: Icon,
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

    <p className="mt-1 text-3xl font-bold tracking-tight text-stone-900">
      {value}
    </p>
  </motion.div>
);

/* ===========================================================
   FILTER SELECT
=========================================================== */

const FilterSelect = ({
  value,
  onChange,
  options,
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="h-11 min-w-[180px] appearance-none rounded-xl border border-stone-200 bg-stone-50 pl-4 pr-10 text-sm font-semibold text-stone-600 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>

    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
  </div>
);

/* ===========================================================
   FORM FIELD
=========================================================== */

const FormField = ({
  label,
  children,
}) => (
  <div>
    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-600">
      {label}
    </label>

    {children}
  </div>
);

/* ===========================================================
   SECTION LABEL
=========================================================== */

const SectionLabel = ({
  children,
}) => (
  <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
    {children}
  </p>
);

/* ===========================================================
   TIMELINE
=========================================================== */

const TimelineItem = ({
  title,
  date,
  active,
  danger,
}) => (
  <div className="flex items-center gap-3">
    <div
      className={`h-2.5 w-2.5 rounded-full ${
        danger
          ? "bg-red-500"
          : active
          ? "bg-amber-500"
          : "bg-stone-300"
      }`}
    />

    <div className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl bg-stone-50 px-4 py-3">
      <p className="text-xs font-semibold text-stone-700">
        {title}
      </p>

      <p className="shrink-0 text-[10px] text-stone-400">
        {date
          ? formatDateTime(date)
          : "Not available"}
      </p>
    </div>
  </div>
);

/* ===========================================================
   HELPERS
=========================================================== */

const normalizeStatus = (status) => {
  const normalized = String(
    status || ""
  )
    .trim()
    .toLowerCase();

  if (
    normalized === "canceled" ||
    normalized === "cancel"
  ) {
    return "cancelled";
  }

  return normalized || "pending";
};

const capitalizeStatus = (status) => {
  const normalized =
    normalizeStatus(status);

  return normalized
    .split(" ")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1)
    )
    .join(" ");
};

const formatStatusLabel = (status) => {
  const normalized =
    normalizeStatus(status);

  return normalized.charAt(0).toUpperCase() +
    normalized.slice(1);
};

const getBookingId = (booking) =>
  booking?.id ||
  booking?.bookingId ||
  booking?._id ||
  `booking-${Date.now()}`;

const getBookingDisplayId = (
  booking
) => {
  const id = getBookingId(booking);

  if (
    String(id).startsWith("booking-")
  ) {
    return `#${String(id).slice(
      "booking-".length
    )}`;
  }

  return `#${String(id).slice(-10)}`;
};

const getCustomerName = (
  booking
) =>
  booking?.customerName ||
  booking?.name ||
  booking?.userName ||
  booking?.customer?.name ||
  booking?.shippingAddress?.name ||
  "Customer";

const getCustomerEmail = (
  booking
) =>
  booking?.email ||
  booking?.customerEmail ||
  booking?.customer?.email ||
  "Email not provided";

const getCustomerPhone = (
  booking
) =>
  booking?.phone ||
  booking?.customerPhone ||
  booking?.customer?.phone ||
  booking?.shippingAddress?.phone ||
  "Phone not provided";

const getEventName = (
  booking
) =>
  booking?.eventName ||
  booking?.eventTitle ||
  booking?.title ||
  booking?.event?.title ||
  "Event Booking";

const getBookingAmount = (
  booking
) => {
  const amount =
    booking?.totalAmount ??
    booking?.amount ??
    booking?.total ??
    booking?.price ??
    booking?.budgetAmount ??
    booking?.budget ??
    0;

  const numericAmount =
    Number(amount);

  return Number.isFinite(
    numericAmount
  )
    ? numericAmount
    : 0;
};

const getBookingLocation = (
  booking
) => {
  if (booking?.location) {
    if (
      typeof booking.location ===
      "string"
    ) {
      return booking.location;
    }

    return (
      booking.location.city ||
      booking.location.name ||
      "Location set"
    );
  }

  if (booking?.venue) {
    if (
      typeof booking.venue ===
      "string"
    ) {
      return booking.venue;
    }

    return (
      booking.venue.name ||
      booking.venue.city ||
      "Venue selected"
    );
  }

  if (booking?.shippingAddress) {
    return (
      booking.shippingAddress.city ||
      booking.shippingAddress.street ||
      "Address provided"
    );
  }

  return "Not set";
};

const getAddressText = (
  booking
) => {
  const address =
    booking?.shippingAddress ||
    booking?.address;

  if (!address) {
    return "";
  }

  if (typeof address === "string") {
    return address;
  }

  return [
    address.name,
    address.street ||
      address.address ||
      address.line1,
    address.city,
    address.state,
    address.pincode ||
      address.postalCode,
  ]
    .filter(Boolean)
    .join(", ");
};

const getBookingNotes = (
  booking
) =>
  booking?.notes ||
  booking?.message ||
  booking?.specialRequests ||
  "";

const formatDateInput = (
  value
) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 10);
  }

  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default BookingManagement;