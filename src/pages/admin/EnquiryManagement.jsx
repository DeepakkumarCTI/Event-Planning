import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Filter,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Trash2,
  User,
  X,
  XCircle,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { formatDate, formatDateTime } from "../../utils/formatDate";
import { useBooking } from "../../context/BookingContext";

const ENQUIRY_STORAGE_KEY = "functionPlannerEnquiries";

const DEMO_ENQUIRIES = [
  {
    id: "ENQ-1001",
    name: "Arun Kumar",
    email: "arun@example.com",
    phone: "+91 98765 10001",
    eventType: "Wedding",
    eventDate: "2026-11-15",
    guests: 250,
    message:
      "We are planning a traditional wedding and would like to discuss venue, decoration and catering options.",
    status: "New",
    createdAt: "2026-09-12T09:30:00",
  },
  {
    id: "ENQ-1002",
    name: "Priya Raj",
    email: "priya@example.com",
    phone: "+91 98765 10002",
    eventType: "Birthday",
    eventDate: "2026-10-22",
    guests: 80,
    message:
      "Looking for a complete birthday event package with decoration and entertainment.",
    status: "Contacted",
    createdAt: "2026-09-11T13:15:00",
  },
  {
    id: "ENQ-1003",
    name: "Vikram Enterprises",
    email: "events@vikram.com",
    phone: "+91 98765 10003",
    eventType: "Corporate Event",
    eventDate: "2026-12-05",
    guests: 150,
    message:
      "We need a venue and event management support for our annual corporate gathering.",
    status: "New",
    createdAt: "2026-09-10T11:20:00",
  },
];

const EnquiryManagement = () => {
  const {
    enquiries = [],
    createEnquiry,
  } = useBooking();

  const [localEnquiries, setLocalEnquiries] =
    useState(() => {
      try {
        const saved = localStorage.getItem(
          ENQUIRY_STORAGE_KEY
        );

        return saved
          ? JSON.parse(saved)
          : DEMO_ENQUIRIES;
      } catch {
        return DEMO_ENQUIRIES;
      }
    });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [eventFilter, setEventFilter] =
    useState("all");

  const [selectedEnquiry, setSelectedEnquiry] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [showCreate, setShowCreate] =
    useState(false);

  const [newEnquiry, setNewEnquiry] =
    useState({
      name: "",
      email: "",
      phone: "",
      eventType: "Wedding",
      eventDate: "",
      guests: "",
      message: "",
    });

  /* =========================================================
     COMBINE ENQUIRIES
  ========================================================= */

  const allEnquiries = useMemo(() => {
    const contextItems = Array.isArray(enquiries)
      ? enquiries
      : [];

    const contextIds = new Set(
      contextItems.map((item) =>
        String(
          item.id ||
            item.enquiryId ||
            item._id ||
            ""
        )
      )
    );

    const localOnly = localEnquiries.filter(
      (item) =>
        !contextIds.has(
          String(
            item.id ||
              item.enquiryId ||
              item._id ||
              ""
          )
        )
    );

    return [
      ...contextItems,
      ...localOnly,
    ];
  }, [enquiries, localEnquiries]);

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const eventTypes = useMemo(() => {
    return [
      ...new Set(
        allEnquiries
          .map(
            (item) =>
              item.eventType ||
              item.event ||
              item.type
          )
          .filter(Boolean)
      ),
    ];
  }, [allEnquiries]);

  /* =========================================================
     FILTERED DATA
  ========================================================= */

  const filteredEnquiries = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return allEnquiries.filter(
      (enquiry) => {
        const name = getName(enquiry);
        const email = getEmail(enquiry);
        const phone = getPhone(enquiry);
        const eventType =
          getEventType(enquiry);
        const message =
          enquiry.message ||
          enquiry.description ||
          "";

        const matchesSearch =
          !query ||
          name.toLowerCase().includes(query) ||
          email.toLowerCase().includes(query) ||
          phone.toLowerCase().includes(query) ||
          eventType
            .toLowerCase()
            .includes(query) ||
          message
            .toLowerCase()
            .includes(query);

        const status =
          normalizeStatus(
            enquiry.status ||
              enquiry.enquiryStatus ||
              "new"
          );

        const matchesStatus =
          statusFilter === "all" ||
          status === statusFilter;

        const matchesEvent =
          eventFilter === "all" ||
          eventType === eventFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesEvent
        );
      }
    );
  }, [
    allEnquiries,
    search,
    statusFilter,
    eventFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const total = allEnquiries.length;

    const newCount =
      allEnquiries.filter(
        (item) =>
          normalizeStatus(
            item.status ||
              item.enquiryStatus
          ) === "new"
      ).length;

    const contacted =
      allEnquiries.filter(
        (item) =>
          normalizeStatus(
            item.status ||
              item.enquiryStatus
          ) === "contacted"
      ).length;

    const converted =
      allEnquiries.filter(
        (item) =>
          normalizeStatus(
            item.status ||
              item.enquiryStatus
          ) === "converted"
      ).length;

    const closed =
      allEnquiries.filter(
        (item) =>
          normalizeStatus(
            item.status ||
              item.enquiryStatus
          ) === "closed"
      ).length;

    return {
      total,
      newCount,
      contacted,
      converted,
      closed,
    };
  }, [allEnquiries]);

  /* =========================================================
     STATUS UPDATE
  ========================================================= */

  const updateEnquiryStatus = (
    enquiry,
    status
  ) => {
    const id = getId(enquiry);

    setLocalEnquiries((current) => {
      const exists = current.some(
        (item) =>
          getId(item) === id
      );

      const updated = exists
        ? current.map((item) =>
            getId(item) === id
              ? {
                  ...item,
                  status,
                  updatedAt:
                    new Date().toISOString(),
                }
              : item
          )
        : current;

      try {
        localStorage.setItem(
          ENQUIRY_STORAGE_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage errors.
      }

      return updated;
    });

    setSelectedEnquiry((current) =>
      current &&
      getId(current) === id
        ? {
            ...current,
            status,
          }
        : current
    );
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = () => {
    if (!deleteTarget) return;

    const id = getId(deleteTarget);

    setLocalEnquiries((current) => {
      const updated = current.filter(
        (item) =>
          getId(item) !== id
      );

      try {
        localStorage.setItem(
          ENQUIRY_STORAGE_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage errors.
      }

      return updated;
    });

    setDeleteTarget(null);

    if (
      selectedEnquiry &&
      getId(selectedEnquiry) === id
    ) {
      setSelectedEnquiry(null);
    }
  };

  /* =========================================================
     CREATE ENQUIRY
  ========================================================= */

  const handleCreate = async (event) => {
    event.preventDefault();

    if (
      !newEnquiry.name.trim() ||
      !newEnquiry.email.trim() ||
      !newEnquiry.message.trim()
    ) {
      return;
    }

    const enquiry = {
      id: `ENQ-${Date.now()}`,
      ...newEnquiry,
      guests: Number(
        newEnquiry.guests
      ) || 0,
      status: "New",
      createdAt:
        new Date().toISOString(),
    };

    if (createEnquiry) {
      try {
        await createEnquiry(
          enquiry
        );
      } catch {
        // Keep local admin enquiry as fallback.
      }
    }

    setLocalEnquiries((current) => {
      const updated = [
        enquiry,
        ...current,
      ];

      try {
        localStorage.setItem(
          ENQUIRY_STORAGE_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage errors.
      }

      return updated;
    });

    setNewEnquiry({
      name: "",
      email: "",
      phone: "",
      eventType: "Wedding",
      eventDate: "",
      guests: "",
      message: "",
    });

    setShowCreate(false);
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
                <MessageSquare className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Enquiry Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Customer Enquiries
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Manage customer enquiries, follow up
                with prospects and track enquiry progress.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() =>
                setShowCreate(true)
              }
              icon={
                <MessageSquare className="h-4 w-4" />
              }
            >
              Add Enquiry
            </Button>
          </div>
        </motion.div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <EnquiryStat
            title="Total Enquiries"
            value={stats.total}
            icon={MessageSquare}
          />

          <EnquiryStat
            title="New"
            value={stats.newCount}
            icon={SparkleIcon}
          />

          <EnquiryStat
            title="Contacted"
            value={stats.contacted}
            icon={Phone}
          />

          <EnquiryStat
            title="Converted"
            value={stats.converted}
            icon={CheckCircle2}
          />

          <EnquiryStat
            title="Closed"
            value={stats.closed}
            icon={XCircle}
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
                placeholder="Search name, email, phone, event or message..."
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            <FilterSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                {
                  value: "all",
                  label: "All Status",
                },
                {
                  value: "new",
                  label: "New",
                },
                {
                  value: "contacted",
                  label: "Contacted",
                },
                {
                  value: "converted",
                  label: "Converted",
                },
                {
                  value: "closed",
                  label: "Closed",
                },
              ]}
            />

            <FilterSelect
              value={eventFilter}
              onChange={setEventFilter}
              options={[
                {
                  value: "all",
                  label: "All Event Types",
                },
                ...eventTypes.map(
                  (type) => ({
                    value: type,
                    label: type,
                  })
                ),
              ]}
            />

            {(search ||
              statusFilter !== "all" ||
              eventFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setEventFilter("all");
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
            RESULTS
        =================================================== */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-bold text-stone-800">
              {filteredEnquiries.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-800">
              {allEnquiries.length}
            </span>{" "}
            enquiries
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Filter className="h-3.5 w-3.5" />
            {stats.newCount} new enquiries
          </div>
        </div>

        {filteredEnquiries.length > 0 ? (
          <div className="mt-3 space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredEnquiries.map(
                (enquiry, index) => (
                  <EnquiryCard
                    key={getId(enquiry)}
                    enquiry={enquiry}
                    index={index}
                    onView={() =>
                      setSelectedEnquiry(
                        enquiry
                      )
                    }
                    onStatusChange={(status) =>
                      updateEnquiryStatus(
                        enquiry,
                        status
                      )
                    }
                    onDelete={() =>
                      setDeleteTarget(
                        enquiry
                      )
                    }
                  />
                )
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mt-3 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <EmptyState
              icon="search"
              title="No enquiries found"
              description="Try changing your search or filters."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearch("");
                  setStatusFilter("all");
                  setEventFilter("all");
                },
              }}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          VIEW ENQUIRY
      ===================================================== */}

      <Modal
        isOpen={Boolean(selectedEnquiry)}
        onClose={() =>
          setSelectedEnquiry(null)
        }
        title="Enquiry Details"
        description={
          selectedEnquiry
            ? getId(selectedEnquiry)
            : ""
        }
        size="lg"
      >
        {selectedEnquiry && (
          <EnquiryDetails
            enquiry={selectedEnquiry}
            onClose={() =>
              setSelectedEnquiry(null)
            }
            onStatusChange={(status) =>
              updateEnquiryStatus(
                selectedEnquiry,
                status
              )
            }
          />
        )}
      </Modal>

      {/* =====================================================
          CREATE
      ===================================================== */}

      <Modal
        isOpen={showCreate}
        onClose={() =>
          setShowCreate(false)
        }
        title="Add New Enquiry"
        description="Create an enquiry manually from the admin panel."
        size="lg"
      >
        <form
          onSubmit={handleCreate}
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Customer Name">
              <input
                required
                value={newEnquiry.name}
                onChange={(event) =>
                  setNewEnquiry(
                    (current) => ({
                      ...current,
                      name: event.target.value,
                    })
                  )
                }
                placeholder="Customer name"
                className="form-input"
              />
            </FormField>

            <FormField label="Email">
              <input
                required
                type="email"
                value={newEnquiry.email}
                onChange={(event) =>
                  setNewEnquiry(
                    (current) => ({
                      ...current,
                      email:
                        event.target.value,
                    })
                  )
                }
                placeholder="customer@email.com"
                className="form-input"
              />
            </FormField>

            <FormField label="Phone">
              <input
                value={newEnquiry.phone}
                onChange={(event) =>
                  setNewEnquiry(
                    (current) => ({
                      ...current,
                      phone:
                        event.target.value,
                    })
                  )
                }
                placeholder="+91 98765 43210"
                className="form-input"
              />
            </FormField>

            <FormField label="Event Type">
              <div className="relative">
                <select
                  value={
                    newEnquiry.eventType
                  }
                  onChange={(event) =>
                    setNewEnquiry(
                      (current) => ({
                        ...current,
                        eventType:
                          event.target.value,
                      })
                    )
                  }
                  className="form-input appearance-none pr-10"
                >
                  <option>
                    Wedding
                  </option>
                  <option>
                    Birthday
                  </option>
                  <option>
                    Engagement
                  </option>
                  <option>
                    Corporate Event
                  </option>
                  <option>
                    Conference
                  </option>
                  <option>
                    Anniversary
                  </option>
                  <option>
                    Baby Shower
                  </option>
                  <option>
                    Private Party
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>
            </FormField>

            <FormField label="Event Date">
              <input
                type="date"
                value={
                  newEnquiry.eventDate
                }
                onChange={(event) =>
                  setNewEnquiry(
                    (current) => ({
                      ...current,
                      eventDate:
                        event.target.value,
                    })
                  )
                }
                className="form-input"
              />
            </FormField>

            <FormField label="Expected Guests">
              <input
                type="number"
                min="1"
                value={
                  newEnquiry.guests
                }
                onChange={(event) =>
                  setNewEnquiry(
                    (current) => ({
                      ...current,
                      guests:
                        event.target.value,
                    })
                  )
                }
                placeholder="100"
                className="form-input"
              />
            </FormField>
          </div>

          <FormField label="Enquiry Message">
            <textarea
              required
              rows="5"
              value={
                newEnquiry.message
              }
              onChange={(event) =>
                setNewEnquiry(
                  (current) => ({
                    ...current,
                    message:
                      event.target.value,
                  })
                )
              }
              placeholder="Enter customer requirements..."
              className="form-input min-h-[130px] py-3"
            />
          </FormField>

          <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setShowCreate(false)
              }
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
              Create Enquiry
            </Button>
          </div>
        </form>
      </Modal>

      {/* =====================================================
          DELETE
      ===================================================== */}

      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() =>
          setDeleteTarget(null)
        }
        title="Delete Enquiry?"
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
                    {getId(deleteTarget)}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    This enquiry will be permanently
                    removed from the local enquiry list.
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
                Delete Enquiry
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

/* ===========================================================
   ENQUIRY CARD
=========================================================== */

const EnquiryCard = ({
  enquiry,
  index,
  onView,
  onStatusChange,
  onDelete,
}) => {
  const status = normalizeStatus(
    enquiry.status ||
      enquiry.enquiryStatus ||
      "new"
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

          {/* Identity */}

          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <MessageSquare className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-stone-100 px-2 py-1 text-[10px] font-bold text-stone-500">
                  {getId(enquiry)}
                </span>

                <StatusBadge
                  status={status}
                  size="sm"
                />
              </div>

              <h3 className="mt-2 truncate text-base font-bold text-stone-900">
                {getName(enquiry)}
              </h3>

              <p className="mt-1 truncate text-xs text-stone-500">
                {getEventType(enquiry)}
              </p>
            </div>
          </div>

          {/* Contact */}

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 xl:w-[530px]">
            <EnquiryInfo
              icon={Mail}
              label="Email"
              value={getEmail(enquiry)}
            />

            <EnquiryInfo
              icon={Phone}
              label="Phone"
              value={getPhone(enquiry)}
            />

            <EnquiryInfo
              icon={CalendarDays}
              label="Event Date"
              value={
                getEventDate(enquiry)
                  ? formatDate(
                      getEventDate(enquiry)
                    )
                  : "Not set"
              }
            />

            <EnquiryInfo
              icon={User}
              label="Guests"
              value={
                getGuests(enquiry)
                  ? `${getGuests(
                      enquiry
                    )}`
                  : "Not set"
              }
            />
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-2 xl:w-[360px] xl:justify-end">
            <SmallAction
              icon={Eye}
              label="View"
              onClick={onView}
            />

            <StatusSelector
              value={status}
              onChange={onStatusChange}
            />

            <SmallAction
              icon={Trash2}
              label="Delete"
              onClick={onDelete}
              danger
            />
          </div>
        </div>
      </div>

      {/* Message */}

      <div className="border-t border-stone-100 bg-stone-50/60 px-4 py-3 sm:px-5">
        <div className="flex items-start gap-2">
          <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stone-400" />

          <p className="line-clamp-2 text-xs leading-5 text-stone-500">
            {getMessage(enquiry)}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

/* ===========================================================
   DETAILS
=========================================================== */

const EnquiryDetails = ({
  enquiry,
  onClose,
  onStatusChange,
}) => {
  const status = normalizeStatus(
    enquiry.status ||
      enquiry.enquiryStatus ||
      "new"
  );

  return (
    <div>
      {/* Header */}

      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-stone-500 shadow-sm">
                {getId(enquiry)}
              </span>

              <StatusBadge
                status={status}
                size="sm"
              />
            </div>

            <h2 className="mt-3 text-xl font-bold text-stone-900">
              {getName(enquiry)}
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              {getEventType(enquiry)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <StatusSelector
              value={status}
              onChange={onStatusChange}
            />
          </div>
        </div>
      </div>

      {/* Customer */}

      <section className="mt-5">
        <SectionLabel>
          Customer Information
        </SectionLabel>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <DetailItem
            icon={User}
            label="Customer"
            value={getName(enquiry)}
          />

          <DetailItem
            icon={Mail}
            label="Email"
            value={getEmail(enquiry)}
          />

          <DetailItem
            icon={Phone}
            label="Phone"
            value={getPhone(enquiry)}
          />

          <DetailItem
            icon={CalendarDays}
            label="Submitted"
            value={
              enquiry.createdAt
                ? formatDateTime(
                    enquiry.createdAt
                  )
                : "Recently"
            }
          />
        </div>
      </section>

      {/* Event */}

      <section className="mt-5">
        <SectionLabel>
          Event Requirements
        </SectionLabel>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <DetailItem
            icon={CalendarDays}
            label="Event Type"
            value={getEventType(enquiry)}
          />

          <DetailItem
            icon={CalendarDays}
            label="Event Date"
            value={
              getEventDate(enquiry)
                ? formatDate(
                    getEventDate(enquiry)
                  )
                : "Not provided"
            }
          />

          <DetailItem
            icon={User}
            label="Expected Guests"
            value={
              getGuests(enquiry)
                ? `${getGuests(
                    enquiry
                  )} guests`
                : "Not provided"
            }
          />
        </div>
      </section>

      {/* Message */}

      <section className="mt-5">
        <SectionLabel>
          Customer Message
        </SectionLabel>

        <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <MessageSquare className="h-4 w-4" />
            </div>

            <p className="text-sm leading-7 text-stone-600">
              {getMessage(enquiry)}
            </p>
          </div>
        </div>
      </section>

      {/* Actions */}

      <div className="mt-6 flex flex-col gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Close
        </Button>

        {status === "new" && (
          <Button
            type="button"
            variant="primary"
            onClick={() =>
              onStatusChange(
                "Contacted"
              )
            }
            icon={
              <Phone className="h-4 w-4" />
            }
          >
            Mark Contacted
          </Button>
        )}

        {status === "contacted" && (
          <Button
            type="button"
            variant="primary"
            onClick={() =>
              onStatusChange(
                "Converted"
              )
            }
            icon={
              <CheckCircle2 className="h-4 w-4" />
            }
          >
            Mark Converted
          </Button>
        )}

        {status !== "closed" && (
          <Button
            type="button"
            variant="danger"
            onClick={() =>
              onStatusChange(
                "Closed"
              )
            }
            icon={
              <XCircle className="h-4 w-4" />
            }
          >
            Close Enquiry
          </Button>
        )}
      </div>
    </div>
  );
};

/* ===========================================================
   STAT
=========================================================== */

const EnquiryStat = ({
  title,
  value,
  icon: Icon,
}) => (
  <motion.div
    whileHover={{
      y: -3,
    }}
    className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm"
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
   INFO
=========================================================== */

const EnquiryInfo = ({
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
   STATUS SELECTOR
=========================================================== */

const StatusSelector = ({
  value,
  onChange,
}) => (
  <div className="relative">
    <select
      value={capitalizeStatus(value)}
      onChange={(event) =>
        onChange(
          event.target.value
        )
      }
      className="h-9 appearance-none rounded-lg border border-stone-200 bg-white pl-3 pr-8 text-[10px] font-bold text-stone-600 outline-none transition hover:border-amber-300 focus:border-amber-400"
    >
      <option value="New">
        New
      </option>

      <option value="Contacted">
        Contacted
      </option>

      <option value="Converted">
        Converted
      </option>

      <option value="Closed">
        Closed
      </option>
    </select>

    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-stone-400" />
  </div>
);

/* ===========================================================
   SMALL ACTION
=========================================================== */

const SmallAction = ({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-[10px] font-bold transition ${
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
   SPARKLE ICON
=========================================================== */

const SparkleIcon = () => (
  <Star className="w-3.5 h-3.5 fill-current" />
);

/* ===========================================================
   HELPERS
=========================================================== */

const getId = (item) =>
  String(
    item?.id ||
      item?.enquiryId ||
      item?._id ||
      `ENQ-${Date.now()}`
  );

const getName = (item) =>
  item?.name ||
  item?.customerName ||
  item?.customer?.name ||
  "Customer";

const getEmail = (item) =>
  item?.email ||
  item?.customerEmail ||
  item?.customer?.email ||
  "Email not provided";

const getPhone = (item) =>
  item?.phone ||
  item?.customerPhone ||
  item?.customer?.phone ||
  "Phone not provided";

const getEventType = (item) =>
  item?.eventType ||
  item?.event ||
  item?.type ||
  "General Enquiry";

const getEventDate = (item) =>
  item?.eventDate ||
  item?.date ||
  item?.event?.date ||
  "";

const getGuests = (item) =>
  item?.guests ||
  item?.guestCount ||
  item?.event?.guests ||
  item?.event?.guestCount ||
  0;

const getMessage = (item) =>
  item?.message ||
  item?.description ||
  item?.notes ||
  "No message provided.";

const normalizeStatus = (
  status
) => {
  const normalized = String(
    status || "new"
  )
    .trim()
    .toLowerCase();

  if (
    normalized === "open" ||
    normalized === "pending"
  ) {
    return "new";
  }

  return normalized;
};

const capitalizeStatus = (
  status
) => {
  const normalized =
    normalizeStatus(status);

  return (
    normalized.charAt(0).toUpperCase() +
    normalized.slice(1)
  );
};

export default EnquiryManagement;