import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  User,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (login) {
        await login(form.email, form.password);
      } else {
        localStorage.setItem(
          "functionPlannerUser",
          JSON.stringify({ name: "Demo Host", email: form.email, role: "user" })
        );
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password. Try one-click demo login below.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === "vendor") {
      const demoVendor = {
        name: "Sri Meenakshi Caterers Lead",
        email: "orders@meenakshicaterers.in",
        role: "vendor",
      };
      localStorage.setItem("functionPlannerUser", JSON.stringify(demoVendor));
      navigate("/vendor-dashboard");
    } else if (role === "admin") {
      navigate("/admin/login");
    } else {
      const demoHost = {
        name: "Arun & Priya",
        email: "arun.priya@eventara.in",
        role: "user",
      };
      localStorage.setItem("functionPlannerUser", JSON.stringify(demoHost));
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
          Welcome back
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Sign in to access your wedding plan, vendor contracts, or artisan portal.
        </p>
      </div>

      {/* 1-Click Demo Accounts Strip */}
      <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-teal-900">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            Quick Demo Access (Instant Login)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleDemoLogin("host")}
            className="p-2 rounded-lg bg-white border border-teal-200 hover:border-teal-400 text-teal-900 font-semibold text-left transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <User className="w-3.5 h-3.5 text-teal-700" />
            <span>Event Host</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("vendor")}
            className="p-2 rounded-lg bg-white border border-teal-200 hover:border-teal-400 text-teal-900 font-semibold text-left transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Briefcase className="w-3.5 h-3.5 text-teal-700" />
            <span>Vendor Partner</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-teal-600 bg-white"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-slate-700 font-semibold">
              Password
            </label>
            <a href="#forgot" className="text-teal-700 hover:underline font-semibold">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-teal-600 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors disabled:opacity-50"
        >
          <span>{isLoading ? "Signing in..." : "Sign In to Eventara"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500">
        Don't have an account yet?{" "}
        <Link to="/register" className="text-teal-700 font-bold hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;