/* =========================================================
   FUNCTION PLANNER
   DATE FORMATTER
========================================================= */

/**
 * Convert a date value into a Date object safely.
 */

const toDate = (date) => {
  if (!date) {
    return null;
  }

  const parsedDate =
    date instanceof Date
      ? date
      : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};

/**
 * Format date as:
 * 16 Sep 2026
 */

export const formatDate = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(parsedDate);
};

/**
 * Format date as:
 * 16 September 2026
 */

export const formatLongDate = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(parsedDate);
};

/**
 * Format date as:
 * 16/09/2026
 */

export const formatShortDate = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  ).format(parsedDate);
};

/**
 * Format date and time:
 * 16 Sep 2026, 06:30 PM
 */

export const formatDateTime = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  ).format(parsedDate);
};

/**
 * Format only the time:
 * 06:30 PM
 */

export const formatTime = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  ).format(parsedDate);
};

/**
 * Format weekday:
 * Saturday
 */

export const formatDay = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      weekday: "long",
    }
  ).format(parsedDate);
};

/**
 * Format short weekday:
 * Sat
 */

export const formatShortDay = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      weekday: "short",
    }
  ).format(parsedDate);
};

/**
 * Get relative date text.
 *
 * Examples:
 * Today
 * Tomorrow
 * Yesterday
 * 3 days ago
 * In 5 days
 */

export const getRelativeDate = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfTarget = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate()
  );

  const difference =
    Math.round(
      (startOfTarget -
        startOfToday) /
        (1000 * 60 * 60 * 24)
    );

  if (difference === 0) {
    return "Today";
  }

  if (difference === 1) {
    return "Tomorrow";
  }

  if (difference === -1) {
    return "Yesterday";
  }

  if (difference > 1 && difference <= 30) {
    return `In ${difference} days`;
  }

  if (difference < -1 && difference >= -30) {
    return `${Math.abs(
      difference
    )} days ago`;
  }

  return formatDate(parsedDate);
};

/**
 * Check whether a date is today.
 */

export const isToday = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return false;
  }

  const now = new Date();

  return (
    parsedDate.getDate() ===
      now.getDate() &&
    parsedDate.getMonth() ===
      now.getMonth() &&
    parsedDate.getFullYear() ===
      now.getFullYear()
  );
};

/**
 * Check whether a date is in the past.
 */

export const isPastDate = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return false;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(
    parsedDate
  );

  targetDate.setHours(0, 0, 0, 0);

  return targetDate < today;
};

/**
 * Check whether a date is in the future.
 */

export const isFutureDate = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return false;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(
    parsedDate
  );

  targetDate.setHours(0, 0, 0, 0);

  return targetDate > today;
};

/**
 * Get number of days between two dates.
 */

export const getDaysBetween = (
  startDate,
  endDate
) => {
  const start = toDate(startDate);
  const end = toDate(endDate);

  if (!start || !end) {
    return 0;
  }

  const startDay = new Date(start);
  const endDay = new Date(end);

  startDay.setHours(0, 0, 0, 0);
  endDay.setHours(0, 0, 0, 0);

  return Math.abs(
    Math.round(
      (endDay - startDay) /
        (1000 * 60 * 60 * 24)
    )
  );
};

/**
 * Convert a date to an input[type="date"] value.
 *
 * Example:
 * 2026-09-16
 */

export const formatDateForInput = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "";
  }

  const year =
    parsedDate.getFullYear();

  const month = String(
    parsedDate.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    parsedDate.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default formatDate;