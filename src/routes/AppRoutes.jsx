import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Events from "../pages/public/Events";
import EventDetails from "../pages/public/EventDetails";
import Services from "../pages/public/Services";
import ServiceDetails from "../pages/public/ServiceDetails";
import Venues from "../pages/public/Venues";
import Packages from "../pages/public/Packages";
import Gallery from "../pages/public/Gallery";
import Contact from "../pages/public/Contact";

// Eventara Features
import AIPlanner from "../pages/public/AIPlanner";
import MoodBoard from "../pages/public/MoodBoard";
import BudgetTracker from "../pages/public/BudgetTracker";
import Timeline from "../pages/public/Timeline";
import SeatingChart from "../pages/public/SeatingChart";
import Collaborate from "../pages/public/Collaborate";
import Vendors from "../pages/public/Vendors";
import VendorProfile from "../pages/public/VendorProfile";
import CompareVendors from "../pages/public/CompareVendors";
import GuestRSVP from "../pages/public/GuestRSVP";
import VendorPortal from "../pages/public/VendorPortal";
import Loader from "../components/common/Loader";

// Authentication
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Customer
import Dashboard from "../pages/customer/Dashboard";
import MyEvents from "../pages/customer/MyEvents";
import CreateEvent from "../pages/customer/CreateEvent";
import EventPlanner from "../pages/customer/EventPlanner";
import MyBookings from "../pages/customer/MyBookings";
import BookingDetails from "../pages/customer/BookingDetails";
import Payments from "../pages/customer/Payments";
import Invoices from "../pages/customer/Invoices";
import Favourites from "../pages/customer/Favourites";
import Notifications from "../pages/customer/Notifications";
import Profile from "../pages/customer/Profile";

// Admin
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import EventManagement from "../pages/admin/EventManagement";
import ServiceManagement from "../pages/admin/ServiceManagement";
import PackageManagement from "../pages/admin/PackageManagement";
import VenueManagement from "../pages/admin/VenueManagement";
import CustomerManagement from "../pages/admin/CustomerManagement";
import BookingManagement from "../pages/admin/BookingManagement";
import EnquiryManagement from "../pages/admin/EnquiryManagement";
import GalleryManagement from "../pages/admin/GalleryManagement";
import PaymentManagement from "../pages/admin/PaymentManagement";
import Reports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/AdminSettings";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC WEBSITE
      ====================================================== */}

      <Route element={<CustomerLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/events" element={<Events />} />

        <Route
          path="/events/:eventId"
          element={<EventDetails />}
        />

        <Route path="/services" element={<Services />} />

        <Route
          path="/services/:serviceId"
          element={<ServiceDetails />}
        />

        <Route path="/venues" element={<Venues />} />

        <Route path="/packages" element={<Packages />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/contact" element={<Contact />} />

        {/* Eventara AI & Smart Tools */}
        <Route path="/ai-planner" element={<AIPlanner />} />
        <Route path="/mood-board" element={<MoodBoard />} />
        <Route path="/budget-tracker" element={<BudgetTracker />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/seating-chart" element={<SeatingChart />} />
        <Route path="/collaborate" element={<Collaborate />} />

        {/* Vendors Marketplace & Comparison */}
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/:vendorId" element={<VendorProfile />} />
        <Route path="/compare-vendors" element={<CompareVendors />} />

        {/* Guest RSVP */}
        <Route path="/rsvp" element={<GuestRSVP />} />
        <Route path="/rsvp/:eventId" element={<GuestRSVP />} />

        {/* Vendor Portal */}
        <Route path="/vendor-dashboard" element={<VendorPortal />} />

        {/* Bespoke Loader Experience Preview */}
        <Route
          path="/loader"
          element={
            <Loader
              fullScreen
              text="Orchestrating Auspicious Ceremony Operations..."
              subtext="Tamil Nadu Event Intelligence Operating System"
              size="lg"
            />
          }
        />

      </Route>


      {/* =====================================================
          AUTHENTICATION
      ====================================================== */}

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      </Route>


      {/* =====================================================
          CUSTOMER PROTECTED AREA
      ====================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route element={<CustomerLayout />}>

          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Events */}

          <Route
            path="/my-events"
            element={<MyEvents />}
          />

          <Route
            path="/create-event"
            element={<CreateEvent />}
          />

          <Route
            path="/event-planner"
            element={<EventPlanner />}
          />

          {/* Bookings */}

          <Route
            path="/my-bookings"
            element={<MyBookings />}
          />

          <Route
            path="/my-bookings/:bookingId"
            element={<BookingDetails />}
          />

          {/* Payments */}

          <Route
            path="/payments"
            element={<Payments />}
          />

          <Route
            path="/invoices"
            element={<Invoices />}
          />

          {/* User */}

          <Route
            path="/favourites"
            element={<Favourites />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Route>


      {/* =====================================================
          ADMIN LOGIN
      ====================================================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =====================================================
          ADMIN PROTECTED AREA
      ====================================================== */}

      <Route element={<AdminRoute />}>

        <Route element={<AdminLayout />}>

          {/* Dashboard */}

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          {/* Event Management */}

          <Route
            path="/admin/events"
            element={<EventManagement />}
          />

          {/* Service Management */}

          <Route
            path="/admin/services"
            element={<ServiceManagement />}
          />

          {/* Package Management */}

          <Route
            path="/admin/packages"
            element={<PackageManagement />}
          />

          {/* Venue Management */}

          <Route
            path="/admin/venues"
            element={<VenueManagement />}
          />

          {/* Customer Management */}

          <Route
            path="/admin/customers"
            element={<CustomerManagement />}
          />

          {/* Booking Management */}

          <Route
            path="/admin/bookings"
            element={<BookingManagement />}
          />

          {/* Enquiries */}

          <Route
            path="/admin/enquiries"
            element={<EnquiryManagement />}
          />

          {/* Gallery */}

          <Route
            path="/admin/gallery"
            element={<GalleryManagement />}
          />

          {/* Payments */}

          <Route
            path="/admin/payments"
            element={<PaymentManagement />}
          />

          {/* Reports */}

          <Route
            path="/admin/reports"
            element={<Reports />}
          />

          {/* Settings */}

          <Route
            path="/admin/settings"
            element={<AdminSettings />}
          />

        </Route>

      </Route>


      {/* =====================================================
          FALLBACK
      ====================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

export default AppRoutes;