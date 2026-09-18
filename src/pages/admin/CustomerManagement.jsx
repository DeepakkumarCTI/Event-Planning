import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  ShieldCheck,
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
import { formatDate } from "../../utils/formatDate";

const CUSTOMER_STORAGE_KEY = "functionPlannerCustomers";

const demoCustomers = [
  {
    id: "customer-1",
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    phone: "+91 98765 12001",
    city: "Chennai",
    state: "Tamil Nadu",
    joinedAt: "2026-01-12T10:30:00",
    status: "active",
    verified: true,
    events: 3,
    bookings: 2,
  },
  {
    id: "customer-2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 12002",
    city: "Coimbatore",
    state: "Tamil Nadu",
    joinedAt: "2026-02-08T11:15:00",
    status: "active",
    verified: true,
    events: 5,
    bookings: 3,
  },
  {
    id: "customer-3",
    name: "Rahul Raj",
    email: "rahul.raj@example.com",
    phone: "+91 98765 12003",
    city: "Madurai",
    state: "Tamil Nadu",
    joinedAt: "2026-03-15T09:20:00",
    status: "active",
    verified: false,
    events: 1,
    bookings: 1,
  },
  {
    id: "customer-4",
    name: "Meena Krishnan",
    email: "meena.krishnan@example.com",
    phone: "+91 98765 12004",
    city: "Bengaluru",
    state: "Karnataka",
    joinedAt: "2026-04-03T14:45:00",
    status: "inactive",
    verified: true,
    events: 2,
    bookings: 1,
  },
  {
    id: "customer-5",
    name: "Vignesh Kumar",
    email: "vignesh.kumar@example.com",
    phone: "+91 98765 12005",
    city: "Salem",
    state: "Tamil Nadu",
    joinedAt: "2026-04-22T16:10:00",
    status: "active",
    verified: true,
    events: 4,
    bookings: 4,
  },
  {
    id: "customer-6",
    name: "Divya S",
    email: "divya.s@example.com",
    phone: "+91 98765 12006",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    joinedAt: "2026-05-09T12:00:00",
    status: "active",
    verified: false,
    events: 2,
    bookings: 0,
  },
];

const CustomerManagement = () => {
  const [customerList, setCustomerList] = useState(() => {
    try {
      const stored = localStorage.getItem(
        CUSTOMER_STORAGE_KEY
      );

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error(
        "Failed to restore customers:",
        error
      );
    }

    return demoCustomers;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [verificationFilter, setVerificationFilter] =
    useState("all");

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [editCustomer, setEditCustomer] =
    useState(null);

  const [deleteCustomer, setDeleteCustomer] =
    useState(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  /* =========================================================
     SAVE CUSTOMERS
  ========================================================= */

  const saveCustomers = (customers) => {
    setCustomerList(customers);

    try {
      localStorage.setItem(
        CUSTOMER_STORAGE_KEY,
        JSON.stringify(customers)
      );
    } catch (error) {
      console.error(
        "Failed to save customers:",
        error
      );
    }
  };

  /* =========================================================
     FILTERED CUSTOMERS
  ========================================================= */

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customerList.filter((customer) => {
      const name = customer.name || "";
      const email = customer.email || "";
      const phone = customer.phone || "";
      const city = customer.city || "";
      const state = customer.state || "";

      const matchesSearch =
        !query ||
        name.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        phone.toLowerCase().includes(query) ||
        city.toLowerCase().includes(query) ||
        state.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        String(customer.status).toLowerCase() ===
          statusFilter.toLowerCase();

      const verified =
        customer.verified === true;

      const matchesVerification =
        verificationFilter === "all" ||
        (verificationFilter === "verified" &&
          verified) ||
        (verificationFilter === "unverified" &&
          !verified);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVerification
      );
    });
  }, [
    customerList,
    search,
    statusFilter,
    verificationFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const total = customerList.length;

    const active = customerList.filter(
      (customer) =>
        String(customer.status).toLowerCase() ===
        "active"
    ).length;

    const inactive = total - active;

    const verified = customerList.filter(
      (customer) => customer.verified
    ).length;

    return {
      total,
      active,
      inactive,
      verified,
    };
  }, [customerList]);

  /* =========================================================
     TOGGLE STATUS
  ========================================================= */

  const toggleCustomerStatus = (customerId) => {
    const updated = customerList.map(
      (customer) => {
        if (customer.id !== customerId) {
          return customer;
        }

        return {
          ...customer,
          status:
            String(customer.status).toLowerCase() ===
            "active"
              ? "inactive"
              : "active",
        };
      }
    );

    saveCustomers(updated);
  };

  /* =========================================================
     TOGGLE VERIFICATION
  ========================================================= */

  const toggleVerification = (customerId) => {
    const updated = customerList.map(
      (customer) =>
        customer.id === customerId
          ? {
              ...customer,
              verified: !customer.verified,
            }
          : customer
    );

    saveCustomers(updated);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = () => {
    if (!deleteCustomer) return;

    const updated = customerList.filter(
      (customer) =>
        customer.id !== deleteCustomer.id
    );

    saveCustomers(updated);
    setDeleteCustomer(null);
  };

  /* =========================================================
     UPDATE
  ========================================================= */

  const handleUpdate = (updatedCustomer) => {
    const updated = customerList.map(
      (customer) =>
        customer.id === updatedCustomer.id
          ? updatedCustomer
          : customer
    );

    saveCustomers(updated);
    setEditCustomer(null);
  };

  /* =========================================================
     CREATE
  ========================================================= */

  const handleCreate = (newCustomer) => {
    const customer = {
      ...newCustomer,
      id: `customer-${Date.now()}`,
      joinedAt: new Date().toISOString(),
      events: 0,
      bookings: 0,
    };

    saveCustomers([
      customer,
      ...customerList,
    ]);

    setShowCreateModal(false);
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
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-amber-700">
                <Users className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Customer Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Manage Customers
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                View customer accounts, contact details,
                verification status and planning activity.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() =>
                setShowCreateModal(true)
              }
              icon={
                <Plus className="h-4 w-4" />
              }
            >
              Add Customer
            </Button>
          </div>
        </motion.div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CustomerStat
            title="Total Customers"
            value={stats.total}
            icon={Users}
          />

          <CustomerStat
            title="Active Customers"
            value={stats.active}
            icon={CheckCircle2}
          />

          <CustomerStat
            title="Inactive Customers"
            value={stats.inactive}
            icon={XCircle}
          />

          <CustomerStat
            title="Verified Customers"
            value={stats.verified}
            icon={ShieldCheck}
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
            delay: 0.12,
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
                placeholder="Search name, email, phone or city..."
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            {/* Status */}

            <FilterSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                {
                  value: "all",
                  label: "All Statuses",
                },
                {
                  value: "active",
                  label: "Active",
                },
                {
                  value: "inactive",
                  label: "Inactive",
                },
              ]}
            />

            {/* Verification */}

            <FilterSelect
              value={verificationFilter}
              onChange={setVerificationFilter}
              options={[
                {
                  value: "all",
                  label: "All Verification",
                },
                {
                  value: "verified",
                  label: "Verified",
                },
                {
                  value: "unverified",
                  label: "Unverified",
                },
              ]}
            />

            {(search ||
              statusFilter !== "all" ||
              verificationFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setVerificationFilter("all");
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
              {filteredCustomers.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-800">
              {customerList.length}
            </span>{" "}
            customers
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Filter className="h-3.5 w-3.5" />
            Customer account directory
          </div>
        </div>

        {/* ===================================================
            CUSTOMER GRID
        =================================================== */}

        {filteredCustomers.length > 0 ? (
          <motion.div
            layout
            className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredCustomers.map(
                (customer, index) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    index={index}
                    onView={() =>
                      setSelectedCustomer(
                        customer
                      )
                    }
                    onEdit={() =>
                      setEditCustomer(customer)
                    }
                    onDelete={() =>
                      setDeleteCustomer(customer)
                    }
                    onToggleStatus={() =>
                      toggleCustomerStatus(
                        customer.id
                      )
                    }
                    onToggleVerification={() =>
                      toggleVerification(
                        customer.id
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
              title="No customers found"
              description="Try changing your search or filter settings."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearch("");
                  setStatusFilter("all");
                  setVerificationFilter(
                    "all"
                  );
                },
              }}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          VIEW CUSTOMER
      ===================================================== */}

      <Modal
        isOpen={Boolean(selectedCustomer)}
        onClose={() =>
          setSelectedCustomer(null)
        }
        title={
          selectedCustomer?.name ||
          "Customer Details"
        }
        description="Customer account information"
        size="lg"
      >
        {selectedCustomer && (
          <CustomerDetails
            customer={selectedCustomer}
            onClose={() =>
              setSelectedCustomer(null)
            }
            onEdit={() => {
              setEditCustomer(
                selectedCustomer
              );
              setSelectedCustomer(null);
            }}
          />
        )}
      </Modal>

      {/* =====================================================
          EDIT CUSTOMER
      ===================================================== */}

      <Modal
        isOpen={Boolean(editCustomer)}
        onClose={() => setEditCustomer(null)}
        title="Edit Customer"
        description="Update customer account information."
        size="lg"
      >
        {editCustomer && (
          <CustomerForm
            customer={editCustomer}
            onClose={() =>
              setEditCustomer(null)
            }
            onSave={handleUpdate}
          />
        )}
      </Modal>

      {/* =====================================================
          CREATE CUSTOMER
      ===================================================== */}

      <Modal
        isOpen={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        title="Add New Customer"
        description="Create a customer account manually."
        size="lg"
      >
        <CustomerForm
          onClose={() =>
            setShowCreateModal(false)
          }
          onSave={handleCreate}
        />
      </Modal>

      {/* =====================================================
          DELETE
      ===================================================== */}

      <Modal
        isOpen={Boolean(deleteCustomer)}
        onClose={() =>
          setDeleteCustomer(null)
        }
        title="Delete Customer?"
        description="This action cannot be undone."
        size="sm"
      >
        {deleteCustomer && (
          <div>
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-red-800">
                    {deleteCustomer.name}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    This customer will be removed from
                    the current admin customer list.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setDeleteCustomer(null)
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
                Delete Customer
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

/* ===========================================================
   CUSTOMER CARD
=========================================================== */

const CustomerCard = ({
  customer,
  index,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleVerification,
}) => {
  const active =
    String(customer.status).toLowerCase() ===
    "active";

  const initials = getInitials(customer.name);

  return (
    <motion.article
      layout
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
        scale: 0.96,
      }}
      transition={{
        delay: index * 0.04,
      }}
      className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
    >
      {/* Top */}

      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-amber-200/50" />
        <div className="absolute -bottom-14 left-1/3 h-32 w-32 rounded-full border border-stone-200/70" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <StatusBadge
            status={
              active ? "active" : "inactive"
            }
            size="sm"
          />

          {customer.verified ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified
            </span>
          ) : (
            <span className="rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] font-bold text-stone-500 shadow-sm">
              Unverified
            </span>
          )}
        </div>
      </div>

      {/* Profile */}

      <div className="relative px-5 pb-5">
        <div className="-mt-9 flex items-end justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-stone-800 text-lg font-bold text-white shadow-md">
            {initials}
          </div>

          <button
            type="button"
            onClick={onToggleVerification}
            className="mb-1 text-xs font-semibold text-stone-400 transition hover:text-amber-700"
          >
            {customer.verified
              ? "Remove verification"
              : "Verify customer"}
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-stone-900">
                {customer.name}
              </h3>

              <p className="mt-1 truncate text-xs text-stone-500">
                {customer.email}
              </p>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <User className="h-4 w-4" />
            </div>
          </div>

          {/* Contact */}

          <div className="mt-4 space-y-2">
            <ContactRow
              icon={Phone}
              value={
                customer.phone ||
                "Phone not provided"
              }
            />

            <ContactRow
              icon={MapPin}
              value={
                [
                  customer.city,
                  customer.state,
                ]
                  .filter(Boolean)
                  .join(", ") ||
                "Location not provided"
              }
            />
          </div>

          {/* Activity */}

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-stone-100 pt-4">
            <ActivityItem
              icon={CalendarDays}
              label="Events"
              value={customer.events || 0}
            />

            <ActivityItem
              icon={CheckCircle2}
              label="Bookings"
              value={customer.bookings || 0}
            />
          </div>

          {/* Status */}

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Account Status
            </span>

            <button
              type="button"
              onClick={onToggleStatus}
              className="flex items-center gap-2"
            >
              <span className="text-[10px] font-bold text-stone-400">
                {active ? "Active" : "Inactive"}
              </span>

              <span
                className={`relative h-6 w-11 rounded-full p-1 transition ${
                  active
                    ? "bg-amber-500"
                    : "bg-stone-300"
                }`}
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    active
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </span>
            </button>
          </div>

          {/* Actions */}

          <div className="mt-4 grid grid-cols-3 gap-2">
            <CardAction
              icon={Eye}
              label="View"
              onClick={onView}
            />

            <CardAction
              icon={Edit3}
              label="Edit"
              onClick={onEdit}
            />

            <CardAction
              icon={Trash2}
              label="Delete"
              danger
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ===========================================================
   CUSTOMER DETAILS
=========================================================== */

const CustomerDetails = ({
  customer,
  onClose,
  onEdit,
}) => {
  const active =
    String(customer.status).toLowerCase() ===
    "active";

  const initials = getInitials(customer.name);

  return (
    <div>
      {/* Profile header */}

      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-stone-800 text-2xl font-bold text-white shadow-sm">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-stone-900">
                {customer.name}
              </h2>

              {customer.verified && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-stone-500">
              {customer.email}
            </p>

            <div className="mt-3">
              <StatusBadge
                status={
                  active
                    ? "active"
                    : "inactive"
                }
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Account info */}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <DetailItem
          icon={Mail}
          label="Email"
          value={
            customer.email ||
            "Not provided"
          }
        />

        <DetailItem
          icon={Phone}
          label="Phone"
          value={
            customer.phone ||
            "Not provided"
          }
        />

        <DetailItem
          icon={MapPin}
          label="Location"
          value={
            [
              customer.city,
              customer.state,
            ]
              .filter(Boolean)
              .join(", ") ||
            "Not provided"
          }
        />

        <DetailItem
          icon={CalendarDays}
          label="Joined"
          value={
            customer.joinedAt
              ? formatDate(
                  customer.joinedAt
                )
              : "Not available"
          }
        />
      </div>

      {/* Activity */}

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Planning Activity
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <ActivitySummary
            icon={CalendarDays}
            label="Events Created"
            value={customer.events || 0}
          />

          <ActivitySummary
            icon={CheckCircle2}
            label="Bookings"
            value={customer.bookings || 0}
          />
        </div>
      </div>

      {/* Account security */}

      <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-bold text-stone-800">
              Account Verification
            </p>

            <p className="mt-1 text-xs leading-5 text-stone-500">
              {customer.verified
                ? "This customer account is marked as verified."
                : "This customer account has not been marked as verified."}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Close
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={onEdit}
          icon={
            <Edit3 className="h-4 w-4" />
          }
        >
          Edit Customer
        </Button>
      </div>
    </div>
  );
};

/* ===========================================================
   CUSTOMER FORM
=========================================================== */

const CustomerForm = ({
  customer,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(customer);

  const [formData, setFormData] = useState(() => ({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    city: customer?.city || "",
    state: customer?.state || "",
    status:
      customer?.status || "active",
    verified:
      customer?.verified || false,
  }));

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter the customer name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter the customer email.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter the customer phone number.");
      return;
    }

    if (
      !formData.email.includes("@")
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    onSave({
      ...(customer || {}),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      status: formData.status,
      verified: formData.verified,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-xs font-semibold text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Name */}

      <FormField
        label="Full Name"
        required
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Customer full name"
          className="form-input"
        />
      </FormField>

      {/* Email / Phone */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Email"
          required
        >
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="customer@example.com"
            className="form-input"
          />
        </FormField>

        <FormField
          label="Phone"
          required
        >
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="form-input"
          />
        </FormField>
      </div>

      {/* City / State */}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="City">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Chennai"
            className="form-input"
          />
        </FormField>

        <FormField label="State">
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Tamil Nadu"
            className="form-input"
          />
        </FormField>
      </div>

      {/* Status */}

      <FormField label="Account Status">
        <div className="relative">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-input appearance-none pr-10"
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        </div>
      </FormField>

      {/* Verification */}

      <button
        type="button"
        onClick={() =>
          setFormData((current) => ({
            ...current,
            verified: !current.verified,
          }))
        }
        className="flex w-full items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left transition hover:border-amber-200 hover:bg-white"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-bold text-stone-800">
              Verified Customer
            </p>

            <p className="mt-1 text-[11px] leading-5 text-stone-400">
              Mark this customer account as verified.
            </p>
          </div>
        </div>

        <span
          className={`relative h-6 w-11 shrink-0 rounded-full p-1 transition ${
            formData.verified
              ? "bg-amber-500"
              : "bg-stone-300"
          }`}
        >
          <span
            className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              formData.verified
                ? "translate-x-5"
                : "translate-x-0"
            }`}
          />
        </span>
      </button>

      {/* Actions */}

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
          {isEditing
            ? "Save Changes"
            : "Create Customer"}
        </Button>
      </div>
    </form>
  );
};

/* ===========================================================
   FORM FIELD
=========================================================== */

const FormField = ({
  label,
  required,
  children,
}) => (
  <div>
    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-600">
      {label}

      {required && (
        <span className="ml-1 text-amber-600">
          *
        </span>
      )}
    </label>

    {children}
  </div>
);

/* ===========================================================
   CONTACT ROW
=========================================================== */

const ContactRow = ({
  icon: Icon,
  value,
}) => (
  <div className="flex items-center gap-2 text-xs text-stone-500">
    <Icon className="h-3.5 w-3.5 shrink-0 text-stone-400" />

    <span className="truncate">
      {value}
    </span>
  </div>
);

/* ===========================================================
   ACTIVITY ITEM
=========================================================== */

const ActivityItem = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="rounded-xl bg-stone-50 p-3">
    <div className="flex items-center gap-1.5 text-stone-400">
      <Icon className="h-3.5 w-3.5" />

      <span className="text-[10px] font-bold uppercase tracking-wider">
        {label}
      </span>
    </div>

    <p className="mt-1 text-sm font-bold text-stone-800">
      {value}
    </p>
  </div>
);

/* ===========================================================
   ACTIVITY SUMMARY
=========================================================== */

const ActivitySummary = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="flex items-center gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
      <Icon className="h-4 w-4" />
    </div>

    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-stone-900">
        {value}
      </p>
    </div>
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
   CARD ACTION
=========================================================== */

const CardAction = ({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-9 items-center justify-center gap-1.5 rounded-lg text-[11px] font-bold transition ${
      danger
        ? "bg-red-50 text-red-600 hover:bg-red-100"
        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
    }`}
  >
    <Icon className="h-3.5 w-3.5" />

    {label}
  </button>
);

/* ===========================================================
   STAT
=========================================================== */

const CustomerStat = ({
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
   INITIALS
=========================================================== */

const getInitials = (name = "") => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "CU";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export default CustomerManagement;