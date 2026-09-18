/* =========================================================
   FUNCTION PLANNER
   LOCAL STORAGE UTILITIES
========================================================= */

/* =========================================================
   SAFE STORAGE CHECK
========================================================= */

const isStorageAvailable = () => {
  try {
    const testKey =
      "__functionplanner_storage_test__";

    window.localStorage.setItem(
      testKey,
      "test"
    );

    window.localStorage.removeItem(
      testKey
    );

    return true;
  } catch {
    return false;
  }
};

/* =========================================================
   GET VALUE
========================================================= */

/**
 * Get a raw value from localStorage.
 *
 * Example:
 * getStorageItem("functionPlannerUser")
 */

export const getStorageItem = (
  key,
  defaultValue = null
) => {
  if (!isStorageAvailable()) {
    return defaultValue;
  }

  try {
    const value =
      window.localStorage.getItem(key);

    return value === null
      ? defaultValue
      : value;
  } catch (error) {
    console.error(
      `Failed to read localStorage key "${key}":`,
      error
    );

    return defaultValue;
  }
};

/* =========================================================
   GET JSON VALUE
========================================================= */

/**
 * Get and parse JSON from localStorage.
 *
 * Example:
 * getStorageJSON("functionPlannerUser", null)
 */

export const getStorageJSON = (
  key,
  defaultValue = null
) => {
  const value =
    getStorageItem(key);

  if (value === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(
      `Invalid JSON in localStorage key "${key}":`,
      error
    );

    return defaultValue;
  }
};

/* =========================================================
   SET VALUE
========================================================= */

/**
 * Save a raw value to localStorage.
 */

export const setStorageItem = (
  key,
  value
) => {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.setItem(
      key,
      String(value)
    );

    return true;
  } catch (error) {
    console.error(
      `Failed to save localStorage key "${key}":`,
      error
    );

    return false;
  }
};

/* =========================================================
   SET JSON VALUE
========================================================= */

/**
 * Convert a value to JSON and save it.
 *
 * Example:
 * setStorageJSON(
 *   "functionPlannerUser",
 *   user
 * );
 */

export const setStorageJSON = (
  key,
  value
) => {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.setItem(
      key,
      JSON.stringify(value)
    );

    return true;
  } catch (error) {
    console.error(
      `Failed to save JSON localStorage key "${key}":`,
      error
    );

    return false;
  }
};

/* =========================================================
   REMOVE VALUE
========================================================= */

/**
 * Remove one item from localStorage.
 */

export const removeStorageItem = (
  key
) => {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.removeItem(key);

    return true;
  } catch (error) {
    console.error(
      `Failed to remove localStorage key "${key}":`,
      error
    );

    return false;
  }
};

/* =========================================================
   CLEAR ALL STORAGE
========================================================= */

/**
 * Clear all localStorage data.
 *
 * Use carefully because this removes
 * storage belonging to the application.
 */

export const clearStorage = () => {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.clear();

    return true;
  } catch (error) {
    console.error(
      "Failed to clear localStorage:",
      error
    );

    return false;
  }
};

/* =========================================================
   CHECK KEY
========================================================= */

/**
 * Check whether a storage key exists.
 */

export const hasStorageItem = (
  key
) => {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    return (
      window.localStorage.getItem(key) !==
      null
    );
  } catch {
    return false;
  }
};

/* =========================================================
   STORAGE KEYS
========================================================= */

export const STORAGE_KEYS = {
  /* Customer authentication */
  USER:
    "functionPlannerUser",

  USER_TOKEN:
    "functionPlannerToken",

  /* Admin authentication */
  ADMIN:
    "functionPlannerAdmin",

  ADMIN_TOKEN:
    "functionPlannerAdminToken",

  /* Application data */
  EVENTS:
    "functionPlannerEvents",

  BOOKINGS:
    "functionPlannerBookings",

  NOTIFICATIONS:
    "functionPlannerNotifications",

  /* Optional future keys */
  FAVOURITES:
    "functionPlannerFavourites",

  RECENT_SEARCHES:
    "functionPlannerRecentSearches",

  PLANNER_DRAFT:
    "functionPlannerPlannerDraft",

  THEME:
    "functionPlannerTheme",
};

/* =========================================================
   CUSTOMER STORAGE HELPERS
========================================================= */

export const getStoredUser = () => {
  return getStorageJSON(
    STORAGE_KEYS.USER,
    null
  );
};

export const setStoredUser = (
  user
) => {
  return setStorageJSON(
    STORAGE_KEYS.USER,
    user
  );
};

export const removeStoredUser = () => {
  return removeStorageItem(
    STORAGE_KEYS.USER
  );
};

export const getStoredUserToken = () => {
  return getStorageItem(
    STORAGE_KEYS.USER_TOKEN,
    null
  );
};

export const setStoredUserToken = (
  token
) => {
  return setStorageItem(
    STORAGE_KEYS.USER_TOKEN,
    token
  );
};

export const removeStoredUserToken =
  () => {
    return removeStorageItem(
      STORAGE_KEYS.USER_TOKEN
    );
  };

/* =========================================================
   ADMIN STORAGE HELPERS
========================================================= */

export const getStoredAdmin = () => {
  return getStorageJSON(
    STORAGE_KEYS.ADMIN,
    null
  );
};

export const setStoredAdmin = (
  admin
) => {
  return setStorageJSON(
    STORAGE_KEYS.ADMIN,
    admin
  );
};

export const removeStoredAdmin = () => {
  return removeStorageItem(
    STORAGE_KEYS.ADMIN
  );
};

export const getStoredAdminToken = () => {
  return getStorageItem(
    STORAGE_KEYS.ADMIN_TOKEN,
    null
  );
};

export const setStoredAdminToken = (
  token
) => {
  return setStorageItem(
    STORAGE_KEYS.ADMIN_TOKEN,
    token
  );
};

export const removeStoredAdminToken =
  () => {
    return removeStorageItem(
      STORAGE_KEYS.ADMIN_TOKEN
    );
  };

/* =========================================================
   LOGOUT HELPERS
========================================================= */

export const clearCustomerStorage =
  () => {
    removeStorageItem(
      STORAGE_KEYS.USER
    );

    removeStorageItem(
      STORAGE_KEYS.USER_TOKEN
    );
  };

export const clearAdminStorage = () => {
  removeStorageItem(
    STORAGE_KEYS.ADMIN
  );

  removeStorageItem(
    STORAGE_KEYS.ADMIN_TOKEN
  );
};

export const clearAuthStorage = () => {
  clearCustomerStorage();
  clearAdminStorage();
};

/* =========================================================
   APPLICATION DATA HELPERS
========================================================= */

export const getStoredEvents = () => {
  return getStorageJSON(
    STORAGE_KEYS.EVENTS,
    []
  );
};

export const setStoredEvents = (
  events
) => {
  return setStorageJSON(
    STORAGE_KEYS.EVENTS,
    events
  );
};

export const getStoredBookings = () => {
  return getStorageJSON(
    STORAGE_KEYS.BOOKINGS,
    []
  );
};

export const setStoredBookings = (
  bookings
) => {
  return setStorageJSON(
    STORAGE_KEYS.BOOKINGS,
    bookings
  );
};

export const getStoredNotifications =
  () => {
    return getStorageJSON(
      STORAGE_KEYS.NOTIFICATIONS,
      []
    );
  };

export const setStoredNotifications =
  (notifications) => {
    return setStorageJSON(
      STORAGE_KEYS.NOTIFICATIONS,
      notifications
    );
  };

/* =========================================================
   FAVOURITES
========================================================= */

export const getStoredFavourites = () => {
  return getStorageJSON(
    STORAGE_KEYS.FAVOURITES,
    []
  );
};

export const setStoredFavourites = (
  favourites
) => {
  return setStorageJSON(
    STORAGE_KEYS.FAVOURITES,
    favourites
  );
};

/* =========================================================
   PLANNER DRAFT
========================================================= */

export const getPlannerDraft = () => {
  return getStorageJSON(
    STORAGE_KEYS.PLANNER_DRAFT,
    null
  );
};

export const setPlannerDraft = (
  draft
) => {
  return setStorageJSON(
    STORAGE_KEYS.PLANNER_DRAFT,
    draft
  );
};

export const removePlannerDraft = () => {
  return removeStorageItem(
    STORAGE_KEYS.PLANNER_DRAFT
  );
};

/* =========================================================
   RECENT SEARCHES
========================================================= */

export const getRecentSearches = () => {
  return getStorageJSON(
    STORAGE_KEYS.RECENT_SEARCHES,
    []
  );
};

export const addRecentSearch = (
  searchTerm,
  maxItems = 10
) => {
  if (!searchTerm?.trim()) {
    return getRecentSearches();
  }

  const term =
    searchTerm.trim();

  const existing =
    getRecentSearches();

  const updated = [
    term,
    ...existing.filter(
      (item) =>
        item.toLowerCase() !==
        term.toLowerCase()
    ),
  ].slice(0, maxItems);

  setStorageJSON(
    STORAGE_KEYS.RECENT_SEARCHES,
    updated
  );

  return updated;
};

export const clearRecentSearches =
  () => {
    return removeStorageItem(
      STORAGE_KEYS.RECENT_SEARCHES
    );
  };

/* =========================================================
   STORAGE SIZE / DEBUG HELPER
========================================================= */

export const getStorageInfo = () => {
  if (!isStorageAvailable()) {
    return {
      available: false,
      keys: [],
      count: 0,
    };
  }

  try {
    const keys = Object.keys(
      window.localStorage
    );

    return {
      available: true,
      keys,
      count: keys.length,
    };
  } catch {
    return {
      available: false,
      keys: [],
      count: 0,
    };
  }
};

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default {
  getStorageItem,
  getStorageJSON,
  setStorageItem,
  setStorageJSON,
  removeStorageItem,
  clearStorage,
  hasStorageItem,
  STORAGE_KEYS,

  getStoredUser,
  setStoredUser,
  removeStoredUser,

  getStoredUserToken,
  setStoredUserToken,
  removeStoredUserToken,

  getStoredAdmin,
  setStoredAdmin,
  removeStoredAdmin,

  getStoredAdminToken,
  setStoredAdminToken,
  removeStoredAdminToken,

  clearCustomerStorage,
  clearAdminStorage,
  clearAuthStorage,

  getStoredEvents,
  setStoredEvents,

  getStoredBookings,
  setStoredBookings,

  getStoredNotifications,
  setStoredNotifications,

  getStoredFavourites,
  setStoredFavourites,

  getPlannerDraft,
  setPlannerDraft,
  removePlannerDraft,

  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,

  getStorageInfo,
};