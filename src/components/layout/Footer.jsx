
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Compass,
  Lock,
  X,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Logo from "../common/Logo";

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative overflow-hidden bg-gradient-to-br from-white via-yellow-50/40 to-sky-50/50 border-t border-slate-200 text-slate-700">

        {/* ================================
            BACKGROUND GLOW
        ================================= */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -15, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-28 -left-24 w-64 h-64 rounded-full bg-yellow-300/20 blur-3xl pointer-events-none"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 -right-20 w-72 h-72 rounded-full bg-emerald-300/15 blur-3xl pointer-events-none"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-violet-300/10 blur-3xl pointer-events-none"
        />

        {/* Animated Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-pink-500 via-orange-400 via-yellow-400 via-lime-400 via-emerald-500 via-sky-500 to-violet-500" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ================================
              TOP BRAND AREA
          ================================= */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-7">

            {/* Brand */}
            <div className="space-y-2 max-w-xl">
              <Logo
                to="/"
                subtitle="Tamil Nadu Event Platform"
                badge="India"
              />

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Enterprise event operating system orchestrating auspicious
                Muhurthams, grand receptions, and corporate celebrations
                across Tamil Nadu & South India.
              </p>
            </div>

            {/* Platform Badge */}
            <motion.div
              whileHover={{ y: -2 }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/90 border border-emerald-200 shadow-md shadow-emerald-100/50"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-2 h-2 rounded-full bg-emerald-500"
              />

              <div>
                <p className="text-[11px] font-bold text-slate-900">
                  Eventara Planning Network
                </p>

                <p className="text-[10px] text-emerald-700 font-medium">
                  Serving Tamil Nadu & South India
                </p>
              </div>

              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            </motion.div>
          </div>

          {/* ================================
              FOOTER COLUMNS
          ================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-7 mb-7">

            {/* Regional Concierge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="space-y-3"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-800 text-[9px] font-bold uppercase tracking-wider mb-2.5">
                  <MapPin className="w-3 h-3 text-orange-500" />
                  Regional Concierge
                </div>

                <h4 className="text-sm font-extrabold text-slate-900">
                  Plan with confidence.
                </h4>

                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Local expertise combined with modern planning technology.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">

                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                    <MapPin className="w-3 h-3 text-orange-600" />
                  </div>

                  <span className="text-slate-600 leading-relaxed pt-1">
                    Olympic Tower, Guindy,
                    <br />
                    Chennai 600032
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Phone className="w-3 h-3 text-emerald-600" />
                  </div>

                  <a
                    href="tel:+914448902200"
                    className="text-slate-600 hover:text-emerald-700 transition-colors font-medium"
                  >
                    +91 44 4890 2200
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                    <Mail className="w-3 h-3 text-sky-600" />
                  </div>

                  <a
                    href="mailto:concierge@eventara.in"
                    className="text-slate-600 hover:text-sky-700 transition-colors font-medium break-all"
                  >
                    concierge@eventara.in
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Celebrations */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                </div>

                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Celebrations
                </h4>
              </div>

              <ul className="space-y-2 text-[11px] sm:text-xs">

                <li>
                  <Link
                    to="/events"
                    className="group flex items-center gap-2 text-slate-600 hover:text-pink-700 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 group-hover:scale-125 transition-transform shrink-0" />
                    Tamil Muhurthams & Receptions
                  </Link>
                </li>

                <li>
                  <Link
                    to="/vendors"
                    className="group flex items-center gap-2 text-slate-600 hover:text-orange-700 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:scale-125 transition-transform shrink-0" />
                    Verified Tamil Nadu Artisans
                  </Link>
                </li>

                <li>
                  <Link
                    to="/venues"
                    className="group flex items-center gap-2 text-slate-600 hover:text-emerald-700 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform shrink-0" />
                    Kalyana Mandapams & Venues
                  </Link>
                </li>

                <li>
                  <Link
                    to="/packages"
                    className="group flex items-center gap-2 text-slate-600 hover:text-yellow-700 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 group-hover:scale-125 transition-transform shrink-0" />
                    Curated Wedding Packages
                  </Link>
                </li>

                <li>
                  <Link
                    to="/gallery"
                    className="group flex items-center gap-2 text-slate-600 hover:text-violet-700 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover:scale-125 transition-transform shrink-0" />
                    Real Ceremony Gallery
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Planning Suite */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center">
                  <Compass className="w-3.5 h-3.5 text-violet-600" />
                </div>

                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Planning Suite
                </h4>
              </div>

              <ul className="space-y-2 text-[11px] sm:text-xs">

                <li>
                  <Link
                    to="/ai-planner"
                    className="flex items-center gap-2 text-slate-600 hover:text-violet-700 transition-colors"
                  >
                    <Compass className="w-3 h-3 text-violet-500 shrink-0" />
                    AI Ceremony Planner
                  </Link>
                </li>

                <li>
                  <Link
                    to="/budget-tracker"
                    className="flex items-center gap-2 text-slate-600 hover:text-orange-700 transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-orange-400 shrink-0" />
                    Smart Budget Tracker (INR)
                  </Link>
                </li>

                <li>
                  <Link
                    to="/timeline"
                    className="flex items-center gap-2 text-slate-600 hover:text-sky-700 transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-sky-400 shrink-0" />
                    Muhurtham Day-of Timeline
                  </Link>
                </li>

                <li>
                  <Link
                    to="/seating-chart"
                    className="flex items-center gap-2 text-slate-600 hover:text-emerald-700 transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                    Mandapam Seating & Dining
                  </Link>
                </li>

                <li>
                  <Link
                    to="/rsvp"
                    className="flex items-center gap-2 text-slate-600 hover:text-pink-700 transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-pink-400 shrink-0" />
                    Guest RSVP & Feast Preferences
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Corporate & Support */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.18 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                </div>

                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Corporate & Support
                </h4>
              </div>

              <ul className="space-y-2 text-[11px] sm:text-xs">

                <li>
                  <Link
                    to="/about"
                    className="text-slate-600 hover:text-violet-700 transition-colors"
                  >
                    About Eventara
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-slate-600 hover:text-emerald-700 transition-colors"
                  >
                    Services & Hospitality
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-slate-600 hover:text-orange-700 transition-colors"
                  >
                    Concierge Desk & Inquiries
                  </Link>
                </li>

                <li>
                  <Link
                    to="/vendor-dashboard"
                    className="flex items-center gap-1.5 text-violet-700 hover:text-violet-900 font-semibold transition-colors"
                  >
                    <span>Vendor Partner Portal</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/admin/login"
                    className="flex items-center gap-1.5 text-slate-600 hover:text-sky-700 transition-colors"
                  >
                    <ShieldCheck className="w-3 h-3 text-sky-500" />
                    <span>Platform Operations</span>
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* ================================
              COMPACT CTA
          ================================= */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -1 }}
            className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-pink-50 via-yellow-50 to-emerald-50 px-4 sm:px-5 py-4 shadow-md shadow-violet-100/40"
          >
            {/* Moving Glow */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-xl pointer-events-none"
            />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Ready to plan your next celebration?
                  </h3>

                  <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5">
                    Build your event blueprint with Eventara's planning tools.
                  </p>
                </div>
              </div>

              <Link
                to="/ai-planner"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 text-white text-[11px] font-bold shadow-md shadow-violet-200 hover:shadow-lg transition-all"
              >
                <span>Start Planning</span>

                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* ================================
              BOTTOM BAR
          ================================= */}
          <div className="pt-5 mt-5 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px]">

            {/* Copyright */}
            <div className="text-slate-500 text-center lg:text-left">
              © {currentYear} Eventara Technologies India Pvt. Ltd.
              All rights reserved.
            </div>

            {/* Cities */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-slate-500">
              <span>Chennai</span>
              <span className="text-orange-400">•</span>

              <span>Coimbatore</span>
              <span className="text-emerald-400">•</span>

              <span>Madurai</span>
              <span className="text-violet-400">•</span>

              <span>Trichy</span>
            </div>

            {/* Privacy Button */}
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-violet-700 hover:border-violet-300 hover:bg-violet-50 transition-all shadow-sm"
            >
              <Lock className="w-3 h-3 text-violet-500 group-hover:rotate-6 transition-transform" />

              <span className="font-semibold">
                Privacy Policy
              </span>

              <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </footer>

      {/* ========================================
          PRIVACY POLICY MODAL
      ========================================= */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsPrivacyOpen(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl"
            >

              {/* Modal Header */}
              <div className="relative overflow-hidden px-5 sm:px-7 py-5 bg-gradient-to-r from-violet-50 via-pink-50 to-yellow-50 border-b border-slate-200">

                <motion.div
                  animate={{
                    x: [0, 25, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-emerald-300/30 blur-2xl"
                />

                <div className="relative flex items-start justify-between gap-4">

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 text-white flex items-center justify-center shadow-lg">
                      <Lock className="w-4 h-4" />
                    </div>

                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">
                        Privacy Policy
                      </h2>

                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Your privacy matters to Eventara
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPrivacyOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white/80 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all"
                    aria-label="Close Privacy Policy"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-5 sm:px-7 py-5 overflow-y-auto max-h-[60vh] space-y-5">

                <p className="text-sm text-slate-600 leading-relaxed">
                  At Eventara, we respect your privacy and are committed to
                  protecting the information you share with us while using
                  our event planning platform.
                </p>

                <div className="grid gap-3">

                  {/* Information */}
                  <div className="p-3.5 rounded-xl bg-violet-50 border border-violet-100">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-violet-600 shrink-0 mt-0.5" />

                      <div>
                        <h3 className="text-sm font-bold text-violet-900">
                          Information We Collect
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed mt-1">
                          We may collect information such as your name,
                          contact details, event requirements, preferences,
                          and account information when you use our services.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Usage */}
                  <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-sky-600 shrink-0 mt-0.5" />

                      <div>
                        <h3 className="text-sm font-bold text-sky-900">
                          How We Use Your Information
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed mt-1">
                          Information may be used to provide event planning
                          services, respond to enquiries, manage accounts,
                          improve our platform, and communicate important
                          service updates.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Protection */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />

                      <div>
                        <h3 className="text-sm font-bold text-emerald-900">
                          Data Protection
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed mt-1">
                          We take reasonable technical and organizational
                          measures to protect your information from
                          unauthorized access, alteration, disclosure, or
                          misuse.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Third Party */}
                  <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-100">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-orange-600 shrink-0 mt-0.5" />

                      <div>
                        <h3 className="text-sm font-bold text-orange-900">
                          Third-Party Services
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed mt-1">
                          Eventara may use trusted third-party providers for
                          services such as hosting, analytics, communication,
                          payments, or other platform functionality.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Choices */}
                  <div className="p-3.5 rounded-xl bg-pink-50 border border-pink-100">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-pink-600 shrink-0 mt-0.5" />

                      <div>
                        <h3 className="text-sm font-bold text-pink-900">
                          Your Choices
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed mt-1">
                          You can contact our concierge team regarding your
                          personal information, account details, or privacy
                          related questions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-yellow-50 to-lime-50 border border-yellow-200">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-900">
                      Important:
                    </span>{" "}
                    This popup provides a general privacy summary for the
                    website. Replace the wording with your organization's
                    legally reviewed privacy policy before production use.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 sm:px-7 py-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">

                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Eventara Privacy Center</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(false)}
                  className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;

