import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
      {/* Scroll to top whenever route changes */}
      <ScrollToTop />

      {/* Customer Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="min-h-[calc(100vh-80px)] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Customer Footer */}
      <Footer />
    </div>
  );
};

export default CustomerLayout;