/* =========================================================
   FUNCTION PLANNER
   CURRENCY FORMATTER
========================================================= */

/**
 * Format a number as Indian Rupee currency.
 *
 * Example:
 * formatCurrency(350000)
 * → ₹3,50,000
 */

export const formatCurrency = (
  amount,
  options = {}
) => {
  const {
    showSymbol = true,
    maximumFractionDigits = 0,
    minimumFractionDigits = 0,
  } = options;

  const numericAmount =
    Number(amount) || 0;

  const formattedAmount =
    new Intl.NumberFormat(
      "en-IN",
      {
        minimumFractionDigits,
        maximumFractionDigits,
      }
    ).format(numericAmount);

  return showSymbol
    ? `₹${formattedAmount}`
    : formattedAmount;
};

/**
 * Format currency with two decimal places.
 *
 * Example:
 * formatCurrencyDecimal(1250.5)
 * → ₹1,250.50
 */

export const formatCurrencyDecimal = (
  amount
) => {
  return formatCurrency(amount, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Format currency without the ₹ symbol.
 *
 * Example:
 * formatCurrencyValue(350000)
 * → 3,50,000
 */

export const formatCurrencyValue = (
  amount
) => {
  return formatCurrency(amount, {
    showSymbol: false,
  });
};

/**
 * Convert a currency value into a compact
 * readable format.
 *
 * Examples:
 * ₹1,000
 * ₹25K
 * ₹1.5L
 * ₹12L
 */

export const formatCompactCurrency = (
  amount
) => {
  const numericAmount =
    Number(amount) || 0;

  if (numericAmount >= 10000000) {
    const value =
      numericAmount / 10000000;

    return `₹${Number(
      value.toFixed(1)
    )}Cr`;
  }

  if (numericAmount >= 100000) {
    const value =
      numericAmount / 100000;

    return `₹${Number(
      value.toFixed(1)
    )}L`;
  }

  if (numericAmount >= 1000) {
    const value =
      numericAmount / 1000;

    return `₹${Number(
      value.toFixed(1)
    )}K`;
  }

  return `₹${numericAmount}`;
};

/**
 * Parse a currency string into a number.
 *
 * Example:
 * parseCurrency("₹3,50,000")
 * → 350000
 */

export const parseCurrency = (
  value
) => {
  if (
    value === null ||
    value === undefined
  ) {
    return 0;
  }

  const cleanedValue =
    String(value)
      .replace(/[₹,\s]/g, "")
      .replace(/[^\d.-]/g, "");

  const number =
    Number(cleanedValue);

  return Number.isNaN(number)
    ? 0
    : number;
};

export default formatCurrency;