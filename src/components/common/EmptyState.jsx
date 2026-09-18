import { motion } from "framer-motion";
import {
  CalendarDays,
  ClipboardList,
  Heart,
  Inbox,
  Search,
  Sparkles,
} from "lucide-react";

const iconMap = {
  calendar: CalendarDays,
  bookings: ClipboardList,
  favourites: Heart,
  search: Search,
  inbox: Inbox,
  default: Sparkles,
};

const EmptyState = ({
  icon = "default",
  title = "Nothing here yet",
  description = "There is no information to display at the moment.",
  action,
  className = "",
}) => {
  const Icon = iconMap[icon] || iconMap.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className={`flex min-h-[280px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-10 text-center ${className}`}
    >
      {/* Icon */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"
      >
        <Icon size={28} strokeWidth={1.8} />
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-bold text-stone-800">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
        {description}
      </p>

      {/* Optional action */}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;