import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Store,
} from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-4 py-20 sm:px-6 lg:px-8">
      {/* Background Decorative Blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-pink-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-8 text-center shadow-[0_25px_70px_rgba(79,70,229,0.12)] backdrop-blur-xl sm:p-12">
          {/* Inner Gradient Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-200/30 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative mx-auto max-w-2xl space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-pink-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-700 shadow-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </span>

              Streamlined Event Intelligence
            </div>

            {/* Heading */}
            <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Ready to Plan Your{" "}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                Tamil Nadu Celebration?
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Join families, corporations, and hosts who orchestrated memorable
              Muhurthams, receptions, and conclaves with verified artisans and
              precise INR budgeting.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Link
                to="/ai-planner"
                className="group/primary flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-200 sm:w-auto"
              >
                <span>Launch AI Planner</span>

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/primary:translate-x-1" />
              </Link>

              <Link
                to="/vendors"
                className="group/vendors flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 px-6 py-3.5 text-sm font-bold text-indigo-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-cyan-100 sm:w-auto"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-sm">
                  <Store className="h-3.5 w-3.5" />
                </span>

                <span>Browse Verified Vendors</span>

                <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover/vendors:translate-x-1 group-hover/vendors:opacity-100" />
              </Link>
            </div>

            {/* Micro Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-100 pt-5 text-xs font-medium text-slate-600">
              {/* Benefit 1 */}
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100">
                  <CheckCircle2 className="h-4 w-4 text-violet-600" />
                </span>

                <span>Instant 30-sec Ceremony Timeline</span>
              </span>

              {/* Benefit 2 */}
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </span>

                <span>100% Vetted Local Vendors</span>
              </span>

              {/* Benefit 3 */}
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100">
                  <CheckCircle2 className="h-4 w-4 text-orange-600" />
                </span>

                <span>Transparent INR Pricing</span>
              </span>
            </div>

            {/* Decorative Gradient Line */}
            <div className="mx-auto flex items-center justify-center gap-2 pt-1">
              <span className="h-1 w-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
              <span className="h-1 w-16 rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400" />
              <span className="h-1 w-10 rounded-full bg-gradient-to-r from-orange-400 to-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;