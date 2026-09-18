import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  const location = useLocation();

  // Temporary admin authentication check
  const storedAdmin = localStorage.getItem("functionPlannerAdmin");
  const storedAdminToken = localStorage.getItem("functionPlannerAdminToken");

  let admin = null;

  try {
    admin = storedAdmin ? JSON.parse(storedAdmin) : null;
  } catch (error) {
    console.error("Invalid stored admin data:", error);
    admin = null;
  }

  // Check whether admin is authenticated
  const isAdminAuthenticated =
    Boolean(admin && storedAdminToken) &&
    (
      admin.role === "admin" ||
      admin.role === "ADMIN"
    );

  // Not logged in as admin
  if (!isAdminAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // Authenticated admin
  return <Outlet />;
};

export default AdminRoute;