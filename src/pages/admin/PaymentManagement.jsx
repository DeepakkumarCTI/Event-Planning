import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Eye,
  Filter,
  RefreshCw,
  Search,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { useBooking } from "../../context/BookingContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const PAYMENT_STORAGE_KEY =
  "functionPlannerPayments";

const DEMO_PAYMENTS = [
  {
    id: "PAY-1001",
    bookingId: "BOOK-1001",
    customerName: "Arun Kumar",
    customerEmail: "arun@example.com",
    eventName: "Arun & Priya Wedding",
    eventType: "Wedding",
    amount: 125000,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    transactionId: "UPI20260814001",
    paymentDate: "2026-08-14",
    createdAt: "2026-08-14T10:30:00",
  },
  {
    id: "PAY-1002",
    bookingId: "BOOK-1002",
    customerName: "Meena Raj",
    customerEmail: "meena@example.com",
    eventName: "Birthday Celebration",
    eventType: "Birthday",
    amount: 35000,
    paymentMethod: "Card",
    paymentStatus: "Pending",
    transactionId: "",
    paymentDate: "",
    createdAt: "2026-08-22T12:00:00",
  },
  {
    id: "PAY-1003",
    bookingId: "BOOK-1003",
    customerName: "Karthik S",
    customerEmail: "karthik@example.com",
    eventName: "Corporate Conference",
    eventType: "Corporate",
    amount: 85000,
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    transactionId: "NEFT20260825018",
    paymentDate: "2026-08-25",
    createdAt: "2026-08-25T09:45:00",
  },
  {
    id: "PAY-1004",
    bookingId: "BOOK-1004",
    customerName: "Divya Prakash",
    customerEmail: "divya@example.com",
    eventName: "Engagement Ceremony",
    eventType: "Engagement",
    amount: 55000,
    paymentMethod: "Cash",
    paymentStatus: "Pending",
    transactionId: "",
    paymentDate: "",
    createdAt: "2026-09-01T15:20:00",
  },
  {
    id: "PAY-1005",
    bookingId: "BOOK-1005",
    customerName: "Rahul M",
    customerEmail: "rahul@example.com",
    eventName: "Private Celebration",
    eventType: "Private Party",
    amount: 42000,
    paymentMethod: "UPI",
    paymentStatus: "Failed",
    transactionId: "UPI20260903072",
    paymentDate: "",
    createdAt: "2026-09-03T18:10:00",
  },
];

const PAYMENT_METHODS = [
  "UPI",
  "Card",
  "Bank Transfer",
  "Cash",
  "Other",
];

const PAYMENT_STATUSES = [
  "Pending",
  "Paid",
  "Failed",
  "Refunded",
];

const PaymentManagement = () => {
  const bookingContext = useBooking();

  const bookings = bookingContext?.bookings || [];

  const updateBooking =
    bookingContext?.updateBooking;

  const updatePaymentStatus =
    bookingContext?.updatePaymentStatus;

  const markPaymentAsPaid =
    bookingContext?.markPaymentAsPaid;

  const deleteBooking =
    bookingContext?.deleteBooking;

  const [payments, setPayments] = useState(
    () => {
      try {
        const saved =
          localStorage.getItem(
            PAYMENT_STORAGE_KEY
          );

        return saved
          ? JSON.parse(saved)
          : DEMO_PAYMENTS;
      } catch {
        return DEMO_PAYMENTS;
      }
    }
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [methodFilter, setMethodFilter] =
    useState("all");

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [statusPayment, setStatusPayment] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [newStatus, setNewStatus] =
    useState("Paid");

  const [newMethod, setNewMethod] =
    useState("UPI");

  const [transactionId, setTransactionId] =
    useState("");

  /* =========================================================
     SAVE PAYMENTS
  ========================================================= */

  const savePayments = (items) => {
    setPayments(items);

    try {
      localStorage.setItem(
        PAYMENT_STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch {
      // Ignore localStorage errors.
    }
  };

  /* =========================================================
     MERGE BOOKINGS INTO PAYMENT DATA
  ========================================================= */

  const combinedPayments = useMemo(() => {
    const existingBookingIds = new Set(
      payments.map(
        (payment) => payment.bookingId
      )
    );

    const bookingPayments = bookings
      .filter(
        (booking) =>
          !existingBookingIds.has(
            booking.id
          )
      )
      .map(
        (booking) =>
          createPaymentFromBooking(
            booking
          )
      );

    return [
      ...bookingPayments,
      ...payments,
    ];
  }, [payments, bookings]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredPayments = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return combinedPayments.filter(
      (payment) => {
        const matchesSearch =
          !query ||
          String(
            payment.id || ""
          )
            .toLowerCase()
            .includes(query) ||
          String(
            payment.bookingId || ""
          )
            .toLowerCase()
            .includes(query) ||
          String(
            payment.customerName || ""
          )
            .toLowerCase()
            .includes(query) ||
          String(
            payment.customerEmail || ""
          )
            .toLowerCase()
            .includes(query) ||
          String(
            payment.eventName || ""
          )
            .toLowerCase()
            .includes(query) ||
          String(
            payment.transactionId || ""
          )
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "all" ||
          normalizeStatus(
            payment.paymentStatus
          ) ===
            normalizeStatus(
              statusFilter
            );

        const matchesMethod =
          methodFilter === "all" ||
          normalizeMethod(
            payment.paymentMethod
          ) ===
            normalizeMethod(
              methodFilter
            );

        return (
          matchesSearch &&
          matchesStatus &&
          matchesMethod
        );
      }
    );
  }, [
    combinedPayments,
    search,
    statusFilter,
    methodFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const paid = combinedPayments.filter(
      (payment) =>
        normalizeStatus(
          payment.paymentStatus
        ) === "paid"
    );

    const pending = combinedPayments.filter(
      (payment) =>
        normalizeStatus(
          payment.paymentStatus
        ) === "pending"
    );

    const failed = combinedPayments.filter(
      (payment) =>
        normalizeStatus(
          payment.paymentStatus
        ) === "failed"
    );

    const refunded = combinedPayments.filter(
      (payment) =>
        normalizeStatus(
          payment.paymentStatus
        ) === "refunded"
    );

    return {
      totalTransactions:
        combinedPayments.length,

      totalAmount:
        combinedPayments.reduce(
          (sum, payment) =>
            sum +
            Number(
              payment.amount || 0
            ),
          0
        ),

      paidAmount: paid.reduce(
        (sum, payment) =>
          sum +
          Number(
            payment.amount || 0
          ),
        0
      ),

      pendingAmount: pending.reduce(
        (sum, payment) =>
          sum +
          Number(
            payment.amount || 0
          ),
        0
      ),

      paidCount: paid.length,
      pendingCount: pending.length,
      failedCount: failed.length,
      refundedCount: refunded.length,
    };
  }, [combinedPayments]);

  /* =========================================================
     UPDATE PAYMENT
  ========================================================= */

  const openStatusModal = (payment) => {
    setStatusPayment(payment);
    setNewStatus(
      payment.paymentStatus ||
        "Pending"
    );
    setNewMethod(
      payment.paymentMethod ||
        "UPI"
    );
    setTransactionId(
      payment.transactionId ||
        ""
    );
  };

  const handleUpdatePayment = async (
    event
  ) => {
    event.preventDefault();

    if (!statusPayment) return;

    const paymentDate =
      newStatus === "Paid"
        ? statusPayment.paymentDate ||
          new Date()
            .toISOString()
            .split("T")[0]
        : statusPayment.paymentDate ||
          "";

    const updatedPayment = {
      ...statusPayment,
      paymentStatus: newStatus,
      paymentMethod: newMethod,
      transactionId:
        transactionId.trim(),
      paymentDate,
    };

    const isLocalPayment =
      payments.some(
        (payment) =>
          payment.id ===
          statusPayment.id
      );

    if (isLocalPayment) {
      savePayments(
        payments.map((payment) =>
          payment.id ===
          statusPayment.id
            ? updatedPayment
            : payment
        )
      );
    } else {
      savePayments([
        updatedPayment,
        ...payments,
      ]);
    }

    /* -------------------------------------------------------
       Sync with BookingContext where possible.
    ------------------------------------------------------- */

    try {
      if (
        updatePaymentStatus &&
        statusPayment.bookingId
      ) {
        await updatePaymentStatus(
          statusPayment.bookingId,
          newStatus
        );
      } else if (
        markPaymentAsPaid &&
        newStatus === "Paid" &&
        statusPayment.bookingId
      ) {
        await markPaymentAsPaid(
          statusPayment.bookingId
        );
      } else if (
        updateBooking &&
        statusPayment.bookingId
      ) {
        await updateBooking(
          statusPayment.bookingId,
          {
            paymentStatus:
              newStatus,
            paymentMethod:
              newMethod,
            transactionId:
              transactionId.trim(),
            paymentDate,
          }
        );
      }
    } catch {
      // Local payment state remains available
      // even when the context update is unavailable.
    }

    setStatusPayment(null);

    setSelectedPayment(
      updatedPayment
    );
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const isLocalPayment =
      payments.some(
        (payment) =>
          payment.id ===
          deleteTarget.id
      );

    if (isLocalPayment) {
      savePayments(
        payments.filter(
          (payment) =>
            payment.id !==
            deleteTarget.id
        )
      );
    }

    try {
      if (
        deleteBooking &&
        deleteTarget.bookingId
      ) {
        await deleteBooking(
          deleteTarget.bookingId
        );
      }
    } catch {
      // Ignore context deletion errors.
    }

    setDeleteTarget(null);

    if (
      selectedPayment?.id ===
      deleteTarget.id
    ) {
      setSelectedPayment(null);
    }
  };

  /* =========================================================
     QUICK PAID
  ========================================================= */

  const markAsPaid = async (payment) => {
    const updated = {
      ...payment,
      paymentStatus: "Paid",
      paymentDate:
        payment.paymentDate ||
        new Date()
          .toISOString()
          .split("T")[0],
    };

    if (
      payments.some(
        (item) =>
          item.id === payment.id
      )
    ) {
      savePayments(
        payments.map((item) =>
          item.id === payment.id
            ? updated
            : item
        )
      );
    } else {
      savePayments([
        updated,
        ...payments,
      ]);
    }

    try {
      if (
        markPaymentAsPaid &&
        payment.bookingId
      ) {
        await markPaymentAsPaid(
          payment.bookingId
        );
      } else if (
        updatePaymentStatus &&
        payment.bookingId
      ) {
        await updatePaymentStatus(
          payment.bookingId,
          "Paid"
        );
      }
    } catch {
      // Local update is already applied.
    }

    setSelectedPayment(updated);
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
                <CreditCard className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Payment Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Payments
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Monitor customer payments,
                transaction details and payment
                status across bookings.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PaymentStat
            title="Total Transactions"
            value={stats.totalTransactions}
            icon={CreditCard}
          />

          <PaymentStat
            title="Total Amount"
            value={formatCurrency(
              stats.totalAmount
            )}
            icon={Banknote}
          />

          <PaymentStat
            title="Paid Amount"
            value={formatCurrency(
              stats.paidAmount
            )}
            icon={CheckCircle2}
          />

          <PaymentStat
            title="Pending Amount"
            value={formatCurrency(
              stats.pendingAmount
            )}
            icon={Clock3}
          />
        </div>

        {/* ===================================================
            SECONDARY STATS
        =================================================== */}

        <div className="mt-4 flex flex-wrap gap-3">
          <MiniStat
            label="Paid"
            value={stats.paidCount}
            status="paid"
          />

          <MiniStat
            label="Pending"
            value={stats.pendingCount}
            status="pending"
          />

          <MiniStat
            label="Failed"
            value={stats.failedCount}
            status="failed"
          />

          <MiniStat
            label="Refunded"
            value={stats.refundedCount}
            status="refunded"
          />
        </div>

        {/* ===================================================
            FILTERS
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
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search payment, customer, booking or transaction..."
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            <FilterSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                {
                  value: "all",
                  label: "All Payment Status",
                },
                ...PAYMENT_STATUSES.map(
                  (status) => ({
                    value: status,
                    label: status,
                  })
                ),
              ]}
            />

            <FilterSelect
              value={methodFilter}
              onChange={setMethodFilter}
              options={[
                {
                  value: "all",
                  label: "All Methods",
                },
                ...PAYMENT_METHODS.map(
                  (method) => ({
                    value: method,
                    label: method,
                  })
                ),
              ]}
            />

            {(search ||
              statusFilter !== "all" ||
              methodFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setMethodFilter("all");
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
            RESULT COUNT
        =================================================== */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-bold text-stone-800">
              {filteredPayments.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-800">
              {combinedPayments.length}
            </span>{" "}
            payments
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Filter className="h-3.5 w-3.5" />
            Payment records
          </div>
        </div>

        {/* ===================================================
            PAYMENT TABLE
        =================================================== */}

        {filteredPayments.length > 0 ? (
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
              delay: 0.15,
            }}
            className="mt-4 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50/80">
                    <TableHead>
                      Payment
                    </TableHead>

                    <TableHead>
                      Customer
                    </TableHead>

                    <TableHead>
                      Booking
                    </TableHead>

                    <TableHead>
                      Amount
                    </TableHead>

                    <TableHead>
                      Method
                    </TableHead>

                    <TableHead>
                      Status
                    </TableHead>

                    <TableHead>
                      Date
                    </TableHead>

                    <TableHead align="right">
                      Actions
                    </TableHead>
                  </tr>
                </thead>

                <tbody>
                  <AnimatePresence>
                    {filteredPayments.map(
                      (
                        payment,
                        index
                      ) => (
                        <PaymentRow
                          key={
                            payment.id
                          }
                          payment={
                            payment
                          }
                          index={
                            index
                          }
                          onView={() =>
                            setSelectedPayment(
                              payment
                            )
                          }
                          onEdit={() =>
                            openStatusModal(
                              payment
                            )
                          }
                          onMarkPaid={() =>
                            markAsPaid(
                              payment
                            )
                          }
                          onDelete={() =>
                            setDeleteTarget(
                              payment
                            )
                          }
                        />
                      )
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.section>
        ) : (
          <div className="mt-4 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <EmptyState
              icon="search"
              title="No payments found"
              description="Try changing your search or payment filters."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearch("");
                  setStatusFilter("all");
                  setMethodFilter("all");
                },
              }}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          PAYMENT DETAILS
      ===================================================== */}

      <Modal
        isOpen={Boolean(selectedPayment)}
        onClose={() =>
          setSelectedPayment(null)
        }
        title="Payment Details"
        description={
          selectedPayment?.id || ""
        }
        size="lg"
      >
        {selectedPayment && (
          <PaymentDetails
            payment={selectedPayment}
            onClose={() =>
              setSelectedPayment(null)
            }
            onEdit={() =>
              openStatusModal(
                selectedPayment
              )
            }
            onMarkPaid={() =>
              markAsPaid(
                selectedPayment
              )
            }
          />
        )}
      </Modal>

      {/* =====================================================
          UPDATE STATUS
      ===================================================== */}

      <Modal
        isOpen={Boolean(statusPayment)}
        onClose={() =>
          setStatusPayment(null)
        }
        title="Update Payment"
        description="Update payment status and transaction information."
        size="md"
      >
        {statusPayment && (
          <form
            onSubmit={
              handleUpdatePayment
            }
            className="space-y-5"
          >
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Payment
              </p>

              <p className="mt-1 text-sm font-bold text-stone-900">
                {statusPayment.id}
              </p>

              <p className="mt-1 text-xs text-stone-500">
                {statusPayment.customerName ||
                  "Customer"}{" "}
                •{" "}
                {formatCurrency(
                  statusPayment.amount
                )}
              </p>
            </div>

            <FormField label="Payment Status">
              <div className="relative">
                <select
                  value={newStatus}
                  onChange={(event) =>
                    setNewStatus(
                      event.target.value
                    )
                  }
                  className="form-input appearance-none pr-10"
                >
                  {PAYMENT_STATUSES.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>
            </FormField>

            <FormField label="Payment Method">
              <div className="relative">
                <select
                  value={newMethod}
                  onChange={(event) =>
                    setNewMethod(
                      event.target.value
                    )
                  }
                  className="form-input appearance-none pr-10"
                >
                  {PAYMENT_METHODS.map(
                    (method) => (
                      <option
                        key={method}
                        value={method}
                      >
                        {method}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>
            </FormField>

            <FormField label="Transaction ID">
              <input
                type="text"
                value={transactionId}
                onChange={(event) =>
                  setTransactionId(
                    event.target.value
                  )
                }
                placeholder="Enter transaction/reference ID"
                className="form-input"
              />
            </FormField>

            <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setStatusPayment(
                    null
                  )
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                icon={
                  <RefreshCw className="h-4 w-4" />
                }
              >
                Update Payment
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* =====================================================
          DELETE
      ===================================================== */}

      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() =>
          setDeleteTarget(null)
        }
        title="Delete Payment Record?"
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
                    {deleteTarget.id}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    The payment record will be
                    removed from the local payment
                    records.
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
                Delete Record
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

/* ===========================================================
   PAYMENT ROW
=========================================================== */

const PaymentRow = ({
  payment,
  index,
  onView,
  onEdit,
  onMarkPaid,
  onDelete,
}) => {
  const status =
    normalizeStatus(
      payment.paymentStatus
    );

  const canMarkPaid =
    status === "pending" ||
    status === "failed";

  return (
    <motion.tr
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: index * 0.025,
      }}
      className="border-b border-stone-100 last:border-b-0 hover:bg-stone-50/70"
    >
      <td className="px-5 py-4">
        <div>
          <p className="text-xs font-bold text-stone-900">
            {payment.id}
          </p>

          <p className="mt-1 text-[10px] text-stone-400">
            {payment.transactionId ||
              "No transaction ID"}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <p className="text-xs font-bold text-stone-800">
          {payment.customerName ||
            "Unknown Customer"}
        </p>

        <p className="mt-1 text-[10px] text-stone-400">
          {payment.customerEmail ||
            "No email"}
        </p>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-[180px] truncate text-xs font-semibold text-stone-700">
          {payment.eventName ||
            "Event Booking"}
        </p>

        <p className="mt-1 text-[10px] text-stone-400">
          {payment.bookingId ||
            "No booking ID"}
        </p>
      </td>

      <td className="px-5 py-4">
        <p className="text-sm font-bold text-stone-900">
          {formatCurrency(
            payment.amount
          )}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600">
          <CreditCard className="h-3.5 w-3.5 text-stone-400" />
          {payment.paymentMethod ||
            "Not specified"}
        </div>
      </td>

      <td className="px-5 py-4">
        <StatusBadge
          status={
            payment.paymentStatus ||
            "Pending"
          }
          size="sm"
        />
      </td>

      <td className="px-5 py-4">
        <p className="text-xs font-medium text-stone-600">
          {payment.paymentDate
            ? safeFormatDate(
                payment.paymentDate
              )
            : "—"}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-1.5">
          <IconButton
            label="View payment"
            onClick={onView}
          >
            <Eye className="h-3.5 w-3.5" />
          </IconButton>

          <IconButton
            label="Edit payment"
            onClick={onEdit}
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </IconButton>

          {canMarkPaid && (
            <IconButton
              label="Mark as paid"
              onClick={onMarkPaid}
              success
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
            </IconButton>
          )}

          <IconButton
            label="Delete payment"
            onClick={onDelete}
            danger
          >
            <Trash2 className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      </td>
    </motion.tr>
  );
};

/* ===========================================================
   PAYMENT DETAILS
=========================================================== */

const PaymentDetails = ({
  payment,
  onClose,
  onEdit,
  onMarkPaid,
}) => {
  const status =
    normalizeStatus(
      payment.paymentStatus
    );

  const isPaid = status === "paid";

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
              Payment ID
            </p>

            <h2 className="mt-1 text-xl font-bold text-stone-900">
              {payment.id}
            </h2>

            <p className="mt-1 text-xs text-stone-500">
              Booking:{" "}
              {payment.bookingId ||
                "Not linked"}
            </p>
          </div>

          <StatusBadge
            status={
              payment.paymentStatus ||
              "Pending"
            }
          />
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold text-stone-400">
            Payment Amount
          </p>

          <p className="mt-1 text-3xl font-bold tracking-tight text-stone-900">
            {formatCurrency(
              payment.amount
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <DetailItem
          label="Customer"
          value={
            payment.customerName ||
            "Not available"
          }
        />

        <DetailItem
          label="Email"
          value={
            payment.customerEmail ||
            "Not available"
          }
        />

        <DetailItem
          label="Event"
          value={
            payment.eventName ||
            "Event Booking"
          }
        />

        <DetailItem
          label="Event Type"
          value={
            payment.eventType ||
            "Not specified"
          }
        />

        <DetailItem
          label="Payment Method"
          value={
            payment.paymentMethod ||
            "Not specified"
          }
        />

        <DetailItem
          label="Transaction ID"
          value={
            payment.transactionId ||
            "Not available"
          }
        />

        <DetailItem
          label="Payment Date"
          value={
            payment.paymentDate
              ? safeFormatDate(
                  payment.paymentDate
                )
              : "Not paid"
          }
        />

        <DetailItem
          label="Created"
          value={
            payment.createdAt
              ? safeFormatDate(
                  payment.createdAt
                )
              : "Not available"
          }
        />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Close
        </Button>

        {!isPaid && (
          <Button
            type="button"
            variant="secondary"
            onClick={onMarkPaid}
            icon={
              <CheckCircle2 className="h-4 w-4" />
            }
          >
            Mark as Paid
          </Button>
        )}

        <Button
          type="button"
          variant="primary"
          onClick={onEdit}
          icon={
            <RefreshCw className="h-4 w-4" />
          }
        >
          Update Payment
        </Button>
      </div>
    </div>
  );
};

/* ===========================================================
   STAT
=========================================================== */

const PaymentStat = ({
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

    <p className="mt-1 truncate text-2xl font-bold tracking-tight text-stone-900">
      {value}
    </p>
  </motion.div>
);

/* ===========================================================
   MINI STAT
=========================================================== */

const MiniStat = ({
  label,
  value,
  status,
}) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 shadow-sm">
    <StatusBadge
      status={status}
      size="sm"
    />

    <span className="text-xs font-bold text-stone-700">
      {value}
    </span>

    <span className="text-xs text-stone-400">
      {label}
    </span>
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
    className={`px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-stone-400 ${
      align === "right"
        ? "text-right"
        : "text-left"
    }`}
  >
    {children}
  </th>
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
        onChange(
          event.target.value
        )
      }
      className="h-11 min-w-[175px] appearance-none rounded-xl border border-stone-200 bg-stone-50 pl-4 pr-10 text-sm font-semibold text-stone-600 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
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
   ICON BUTTON
=========================================================== */

const IconButton = ({
  children,
  label,
  onClick,
  danger = false,
  success = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={label}
    className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
      danger
        ? "bg-red-50 text-red-500 hover:bg-red-100"
        : success
        ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
        : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800"
    }`}
  >
    {children}
  </button>
);

/* ===========================================================
   DETAIL ITEM
=========================================================== */

const DetailItem = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
      {label}
    </p>

    <p className="mt-2 break-words text-sm font-semibold text-stone-700">
      {value}
    </p>
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
   CREATE PAYMENT FROM BOOKING
=========================================================== */

const createPaymentFromBooking = (
  booking
) => {
  const paymentStatus =
    booking.paymentStatus ||
    booking.payment?.status ||
    "Pending";

  const paymentMethod =
    booking.paymentMethod ||
    booking.payment?.method ||
    "Not specified";

  const amount =
    booking.totalAmount ??
    booking.amount ??
    booking.finalAmount ??
    booking.budget ??
    0;

  return {
    id:
      booking.paymentId ||
      booking.payment?.id ||
      `PAY-${String(
        booking.id || Date.now()
      ).replace(
        /[^a-zA-Z0-9]/g,
        ""
      )}`,

    bookingId:
      booking.id ||
      booking.bookingId ||
      "",

    customerName:
      booking.customerName ||
      booking.customer?.name ||
      booking.userName ||
      booking.name ||
      "Unknown Customer",

    customerEmail:
      booking.customerEmail ||
      booking.customer?.email ||
      booking.email ||
      "",

    eventName:
      booking.eventName ||
      booking.event?.name ||
      booking.title ||
      "Event Booking",

    eventType:
      booking.eventType ||
      booking.category ||
      booking.event?.type ||
      "Event",

    amount: Number(amount) || 0,

    paymentMethod,

    paymentStatus,

    transactionId:
      booking.transactionId ||
      booking.payment?.transactionId ||
      "",

    paymentDate:
      booking.paymentDate ||
      booking.payment?.date ||
      booking.paidAt ||
      "",

    createdAt:
      booking.createdAt ||
      new Date().toISOString(),
  };
};

/* ===========================================================
   HELPERS
=========================================================== */

const normalizeStatus = (
  value
) =>
  String(value || "")
    .trim()
    .toLowerCase();

const normalizeMethod = (
  value
) =>
  String(value || "")
    .trim()
    .toLowerCase();

const safeFormatDate = (
  value
) => {
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

export default PaymentManagement;