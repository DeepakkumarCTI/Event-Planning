import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

/* =========================================================
   STORAGE KEYS
========================================================= */

const USER_KEY = "functionPlannerUser";
const USER_TOKEN_KEY = "functionPlannerToken";

const ADMIN_KEY = "functionPlannerAdmin";
const ADMIN_TOKEN_KEY = "functionPlannerAdminToken";

/* =========================================================
   SAFE JSON PARSER
========================================================= */

const getStoredObject = (key) => {
  const value = localStorage.getItem(key);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(`Invalid data stored for ${key}:`, error);
    localStorage.removeItem(key);
    return null;
  }
};

/* =========================================================
   AUTH PROVIDER
========================================================= */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const [userToken, setUserToken] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =======================================================
     RESTORE AUTHENTICATION
  ======================================================== */

  useEffect(() => {
    const restoreAuthentication = () => {
      try {
        const storedUser = getStoredObject(USER_KEY);
        const storedAdmin = getStoredObject(ADMIN_KEY);

        const storedUserToken =
          localStorage.getItem(USER_TOKEN_KEY);

        const storedAdminToken =
          localStorage.getItem(ADMIN_TOKEN_KEY);

        if (storedUser && storedUserToken) {
          setUser(storedUser);
          setUserToken(storedUserToken);
        }

        if (storedAdmin && storedAdminToken) {
          setAdmin(storedAdmin);
          setAdminToken(storedAdminToken);
        }
      } catch (error) {
        console.error(
          "Failed to restore authentication:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    restoreAuthentication();
  }, []);

  /* =======================================================
     CUSTOMER LOGIN
  ======================================================== */

  const login = async (userData, token) => {
    if (!userData) {
      throw new Error("User information is required.");
    }

    if (!token) {
      throw new Error("Authentication token is required.");
    }

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(userData)
    );

    localStorage.setItem(
      USER_TOKEN_KEY,
      token
    );

    setUser(userData);
    setUserToken(token);

    return {
      success: true,
      user: userData,
      token,
    };
  };

  /* =======================================================
     CUSTOMER LOGOUT
  ======================================================== */

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_TOKEN_KEY);

    setUser(null);
    setUserToken(null);
  };

  /* =======================================================
     ADMIN LOGIN
  ======================================================== */

  const adminLogin = async (adminData, token) => {
    if (!adminData) {
      throw new Error("Admin information is required.");
    }

    if (!token) {
      throw new Error("Admin authentication token is required.");
    }

    const normalizedAdmin = {
      ...adminData,
      role: adminData.role || "admin",
    };

    localStorage.setItem(
      ADMIN_KEY,
      JSON.stringify(normalizedAdmin)
    );

    localStorage.setItem(
      ADMIN_TOKEN_KEY,
      token
    );

    setAdmin(normalizedAdmin);
    setAdminToken(token);

    return {
      success: true,
      admin: normalizedAdmin,
      token,
    };
  };

  /* =======================================================
     ADMIN LOGOUT
  ======================================================== */

  const adminLogout = () => {
    localStorage.removeItem(ADMIN_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);

    setAdmin(null);
    setAdminToken(null);
  };

  /* =======================================================
     AUTH STATUS
  ======================================================== */

  const isAuthenticated = Boolean(
    user && userToken
  );

  const isAdminAuthenticated = Boolean(
    admin &&
      adminToken &&
      (
        admin.role === "admin" ||
        admin.role === "ADMIN"
      )
  );

  /* =======================================================
     ROLE CHECK
  ======================================================== */

  const hasRole = (role) => {
    if (!user) return false;

    if (Array.isArray(user.roles)) {
      return user.roles.includes(role);
    }

    return user.role === role;
  };

  const isAdmin = () => {
    return (
      admin?.role === "admin" ||
      admin?.role === "ADMIN"
    );
  };

  /* =======================================================
     CLEAR ALL AUTH
  ======================================================== */

  const logoutAll = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_TOKEN_KEY);

    localStorage.removeItem(ADMIN_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);

    setUser(null);
    setUserToken(null);

    setAdmin(null);
    setAdminToken(null);
  };

  /* =======================================================
     CONTEXT VALUE
  ======================================================== */

  const value = useMemo(
    () => ({
      /* Customer */
      user,
      userToken,
      isAuthenticated,

      login,
      logout,

      /* Admin */
      admin,
      adminToken,
      isAdminAuthenticated,

      adminLogin,
      adminLogout,

      /* Helpers */
      hasRole,
      isAdmin,
      logoutAll,

      /* Loading */
      loading,
    }),
    [
      user,
      userToken,
      isAuthenticated,
      admin,
      adminToken,
      isAdminAuthenticated,
      loading,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* =========================================================
   USE AUTH HOOK
========================================================= */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
};

export default AuthContext;