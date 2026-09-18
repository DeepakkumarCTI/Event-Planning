import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();

  // Temporary authentication check using localStorage.
  // This will later be connected to AuthContext/API authentication.
  const storedUser = localStorage.getItem("functionPlannerUser");
  const storedToken = localStorage.getItem("functionPlannerToken");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid stored user data:", error);
    user = null;
  }

  const isAuthenticated = Boolean(user && storedToken);

  // User is not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // User is authenticated
  return <Outlet />;
};

export default ProtectedRoute;