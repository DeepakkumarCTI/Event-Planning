import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/common/Loader";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const location = useLocation();
  const { loading } = useAuth();

  // Show loader while authentication state is being restored
  if (loading) {
    return (
      <Loader
        fullScreen
        text="Preparing your planning experience..."
      />
    );
  }

  return (
    <div
      key={location.pathname}
      className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased"
    >
      <AppRoutes />
    </div>
  );
};

export default App;