import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Camera,
  ChefHat,
  Music,
  Lightbulb,
  MapPin,
  Palette,
  CheckCircle2,
} from "lucide-react";
import { services } from "../../data/services";

const serviceIconMap = {
  "venue-management": MapPin,
  decoration: Palette,
  catering: ChefHat,
  photography: Camera,
  "dj-music": Music,
  lighting: Lightbulb,
};

const serviceThemes = [
  {
    card: "border-orange-100 bg-gradient-to-br from-orange-50 via-white to-yellow-50",
    hover: "hover:border-orange-300 hover:shadow-orange-100",
    icon: "bg-orange-100 text-orange-600 border-orange-200",
    iconHover: "group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500",
    price: "bg-orange-100 text-orange-700 border-orange-200",
    title: "text-slate-900 group-hover:text-orange-700",
    check: "text-orange-500",
    divider: "border-orange-100",
    link: "text-orange-600 group-hover:text-orange-800",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    card: "border-yellow-100 bg-gradient-to-br from-yellow-50 via-white to-amber-50",
    hover: "hover:border-yellow-300 hover:shadow-yellow-100",
    icon: "bg-yellow-100 text-yellow-600 border-yellow-200",
    iconHover: "group-hover:bg-yellow-500 group-hover:text-white group-hover:border-yellow-500",
    price: "bg-yellow-100 text-yellow-700 border-yellow-200",
    title: "text-slate-900 group-hover:text-yellow-700",
    check: "text-yellow-600",
    divider: "border-yellow-100",
    link: "text-yellow-700 group-hover:text-yellow-900",
    badge: "bg-yellow-100 text-yellow-700",
  },
  {
    card: "border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-green-50",
    hover: "hover:border-emerald-300 hover:shadow-emerald-100",
    icon: "bg-emerald-100 text-emerald-600 border-emerald-200",
    iconHover: "group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500",
    price: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "text-slate-900 group-hover:text-emerald-700",
    check: "text-emerald-600",
    divider: "border-emerald-100",
    link: "text-emerald-600 group-hover:text-emerald-800",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    card: "border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50",
    hover: "hover:border-sky-300 hover:shadow-sky-100",
    icon: "bg-sky-100 text-sky-600 border-sky-200",
    iconHover: "group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500",
    price: "bg-sky-100 text-sky-700 border-sky-200",
    title: "text-slate-900 group-hover:text-sky-700",
    check: "text-sky-600",
    divider: "border-sky-100",
    link: "text-sky-600 group-hover:text-sky-800",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    card: "border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50",
    hover: "hover:border-pink-300 hover:shadow-pink-100",
    icon: "bg-pink-100 text-pink-600 border-pink-200",
    iconHover: "group-hover:bg-pink-500 group-hover:text-white group-hover:border-pink-500",
    price: "bg-pink-100 text-pink-700 border-pink-200",
    title: "text-slate-900 group-hover:text-pink-700",
    check: "text-pink-600",
    divider: "border-pink-100",
    link: "text-pink-600 group-hover:text-pink-800",
    badge: "bg-pink-100 text-pink-700",
  },
  {
    card: "border-violet-100 bg-gradient-to-br from-violet-50 via-white to-purple-50",
    hover: "hover:border-violet-300 hover:shadow-violet-100",
    icon: "bg-violet-100 text-violet-600 border-violet-200",
    iconHover: "group-hover:bg-violet-500 group-hover:text-white group-hover:border-violet-500",
    price: "bg-violet-100 text-violet-700 border-violet-200",
    title: "text-slate-900 group-hover:text-violet-700",
    check: "text-violet-600",
    divider: "border-violet-100",
    link: "text-violet-600 group-hover:text-violet-800",
    badge: "bg-violet-100 text-violet-700",
  },
];

const ServicesPreview = () => {
  const popularServices = services.slice(0, 6);

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-slate-50 to-yellow-50/40 px-4 py-20 sm:px-6 lg:px-8">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[35%] top-[20%] h-64 w-64 rounded-full bg-pink-200/20 blur-3xl"
        />

        <div className="absolute bottom-[20%] right-[25%] h-52 w-52 rounded-full bg-emerald-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700 shadow-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>

            Comprehensive Production Services
          </div>

          {/* Heading */}
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            End-to-End{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
              Ceremony & Event Execution
            </span>
          </h2>

          {/* Decorative Line */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <span className="h-1 w-8 rounded-full bg-yellow-400" />
            <span className="h-1 w-12 rounded-full bg-orange-500" />
            <span className="h-1 w-8 rounded-full bg-pink-500" />
            <span className="h-1 w-10 rounded-full bg-sky-500" />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Every service is backed by verified Tamil Nadu suppliers, strict
            quality standards, and automated sync with your day-of schedule.
          </p>
        </motion.div>

        {/* ================= SERVICES GRID ================= */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service, idx) => {
            const Icon = serviceIconMap[service.id] || Sparkles;
            const priceValue =
              service.price || service.startingPrice || 25000;

            const theme = serviceThemes[idx % serviceThemes.length];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5 }}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 ${theme.card} ${theme.hover}`}
              >
                <div>
                  {/* ================= TOP ROW ================= */}
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-all duration-300 ${theme.icon} ${theme.iconHover}`}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>

                    <span
                      className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-extrabold shadow-sm ${theme.price}`}
                    >
                      Starting ₹
                      {Number(priceValue).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* ================= TITLE ================= */}
                  <h3
                    className={`font-display text-base font-extrabold transition-colors duration-300 ${theme.title}`}
                  >
                    {service.title || service.name}
                  </h3>

                  {/* ================= DESCRIPTION ================= */}
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {service.shortDescription || service.description}
                  </p>

                  {/* ================= HIGHLIGHTS ================= */}
                  {service.features && service.features.length > 0 && (
                    <ul className="mt-5 space-y-2 text-xs text-slate-600">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <li
                          key={i}
                          className="flex min-w-0 items-center gap-2"
                        >
                          <CheckCircle2
                            className={`h-3.5 w-3.5 shrink-0 ${theme.check}`}
                          />

                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* ================= FOOTER ================= */}
                <div
                  className={`mt-6 flex items-center justify-between gap-2 border-t pt-4 ${theme.divider}`}
                >
                  <Link
                    to={`/services/${service.id}`}
                    className={`flex shrink-0 items-center gap-1.5 text-xs font-extrabold transition-colors duration-300 ${theme.link}`}
                  >
                    <span className="whitespace-nowrap">
                      View Service Specs
                    </span>

                    <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${theme.badge}`}
                  >
                    Customized
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 text-center"
        >
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-100"
          >
            <Sparkles className="h-4 w-4" />

            <span>Explore All 12 Event Services</span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;