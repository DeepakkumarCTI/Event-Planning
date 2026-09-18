import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Logo from "../components/common/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT BRAND PANEL (Desktop) */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 xl:p-16 overflow-hidden bg-slate-900 text-white border-r border-slate-800">
          {/* Top: Logo & Back Link */}
          <div className="relative z-10 flex items-center justify-between">
            <Logo to="/" variant="light" subtitle="Tamil Nadu Event Platform" badge="India" />

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Middle: Brand Statement & Highlights */}
          <div className="relative z-10 space-y-7 my-auto max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-700 text-teal-300 text-xs font-semibold">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>Enterprise Event Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              Curate and Execute Unforgettable Celebrations
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you are an individual planning an auspicious Tamil Muhurtham or a verified vendor managing wedding banquets, Eventara keeps every milestone synchronized.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-800/80 text-teal-300 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>30-Second AI Ceremonial Masterplan Blueprints</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-800/80 text-teal-300 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Direct Access to Vetted Tamil Nadu Artisans</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-800/80 text-teal-300 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Real-Time Indian Rupee (₹) Financial Guardrails</span>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="relative z-10 pt-8 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Chennai • Coimbatore • Madurai</span>
            <span>© {new Date().getFullYear()} Eventara</span>
          </div>
        </div>

        {/* RIGHT CONTENT PANEL (Outlet) */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative bg-slate-50">
          {/* Mobile Back Link */}
          <div className="lg:hidden absolute top-6 left-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Eventara</span>
            </Link>
          </div>

          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;