import {
  CheckCircle2,
  Clock3,
  CreditCard,
  CircleX,
  Ban,
  AlertCircle,
  CircleDot,
} from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock3,
    className:
      "bg-amber-50 text-amber-700 border-amber-200",
  },

  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-blue-50 text-blue-700 border-blue-200",
  },

  cancelled: {
    label: "Cancelled",
    icon: CircleX,
    className:
      "bg-red-50 text-red-700 border-red-200",
  },

  canceled: {
    label: "Cancelled",
    icon: CircleX,
    className:
      "bg-red-50 text-red-700 border-red-200",
  },

  active: {
    label: "Active",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  inactive: {
    label: "Inactive",
    icon: Ban,
    className:
      "bg-stone-100 text-stone-600 border-stone-200",
  },

  paid: {
    label: "Paid",
    icon: CreditCard,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  unpaid: {
    label: "Unpaid",
    icon: AlertCircle,
    className:
      "bg-red-50 text-red-700 border-red-200",
  },

  processing: {
    label: "Processing",
    icon: Clock3,
    className:
      "bg-blue-50 text-blue-700 border-blue-200",
  },

  available: {
    label: "Available",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  rejected: {
    label: "Rejected",
    icon: CircleX,
    className:
      "bg-red-50 text-red-700 border-red-200",
  },

  draft: {
    label: "Draft",
    icon: CircleDot,
    className:
      "bg-stone-100 text-stone-600 border-stone-200",
  },
};

const StatusBadge = ({
  status,
  label,
  size = "md",
  showIcon = true,
  className = "",
}) => {
  const normalizedStatus = String(status || "pending")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  const config = statusConfig[normalizedStatus] || {
    label: label || status || "Unknown",
    icon: CircleDot,
    className:
      "bg-stone-100 text-stone-600 border-stone-200",
  };

  const Icon = config.icon;

  const sizes = {
    sm: "px-2 py-1 text-[10px]",
    md: "px-2.5 py-1.5 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${sizes[size] || sizes.md} ${config.className} ${className}`}
    >
      {showIcon && (
        <Icon
          size={size === "sm" ? 12 : size === "lg" ? 15 : 13}
          strokeWidth={2.2}
        />
      )}

      <span>{label || config.label}</span>
    </span>
  );
};

export default StatusBadge;