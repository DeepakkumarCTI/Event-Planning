import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Building,
  MapPin,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "vendor" ? "vendor" : "host";

  const [role, setRole] = useState(initialRole);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    businessName: "",
    category: "Candid Cinema & 4K Muhurtham",
    city: "Chennai",
    startingPrice: "45000",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userObj = {
      name: form.fullName,
      email: form.email,
      role: role === "vendor" ? "vendor" : "user",
      businessName: form.businessName,
      category: form.category,
    };

    localStorage.setItem("functionPlannerUser", JSON.stringify(userObj));
    localStorage.setItem("functionPlannerToken", "eventara_token_xyz");

    setTimeout(() => {
      setIsLoading(false);
      if (role === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/dashboard");
      }
    }, 400);
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
          Create an Eventara Account
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Join Tamil Nadu's elite ceremonial planning & artisan network.
        </p>
      </div>

      {/* Role Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-slate-200 text-xs font-bold">
        <button
          type="button"
          onClick={() => setRole("host")}
          className={`py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
            role === "host"
              ? "bg-white text-teal-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>I'm a Host</span>
        </button>
        <button
          type="button"
          onClick={() => setRole("vendor")}
          className={`py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
            role === "vendor"
              ? "bg-white text-teal-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>I'm an Artisan Vendor</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={form.fullName}
            onChange={handleChange}
            placeholder="E.g. S. Ramanathan"
            className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-teal-600"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-teal-600"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Password *
          </label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Create password"
            className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-teal-600"
          />
        </div>

        {/* Vendor-Specific Fields */}
        {role === "vendor" && (
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Business / Studio Name *
              </label>
              <input
                type="text"
                name="businessName"
                required
                value={form.businessName}
                onChange={handleChange}
                placeholder="E.g. Sri Meenakshi Grand Caterers"
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Primary Specialization
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-teal-600"
                >
                  <option value="Banana Leaf Catering">Banana Leaf Catering</option>
                  <option value="Nadaswaram & Thavil">Nadaswaram & Thavil</option>
                  <option value="Mandapam Decor">Mandapam Floral Decor</option>
                  <option value="Photography & Cinema">Photography & Cinema</option>
                  <option value="Bridal Styling">Bridal Styling & Sarees</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Operating City
                </label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-teal-600"
                >
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Trichy">Trichy</option>
                  <option value="Salem">Salem</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Starting Package Rate (INR ₹)
              </label>
              <input
                type="number"
                name="startingPrice"
                value={form.startingPrice}
                onChange={handleChange}
                placeholder="45000"
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-teal-600 font-mono"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors disabled:opacity-50"
        >
          <span>{isLoading ? "Creating Account..." : "Complete Registration"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="text-teal-700 font-bold hover:underline">
          Sign in here
        </Link>
      </div>
    </div>
  );
};

export default Register;