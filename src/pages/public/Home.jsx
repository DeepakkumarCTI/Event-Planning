import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Compass,
  Palette,
  Calculator,
  Clock,
  Grid,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Star,
  PartyPopper,
  WandSparkles,
  Heart,
  CircleDot,
} from "lucide-react";

import Hero from "../../components/home/Hero";
import EventCategories from "../../components/home/EventCategories";
import FeaturedEvents from "../../components/home/FeaturedEvents";
import ServicesPreview from "../../components/home/ServicesPreview";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Testimonials from "../../components/home/Testimonials";
import CTASection from "../../components/home/CTASection";

const Home = () => {
  const tools = [
    {
      title: "AI Event Planner",
      desc: "Instant Muhurtham schedules, Tamil ceremony timelines, and intelligent INR budget models.",
      icon: Compass,
      link: "/ai-planner",
      tag: "Ceremony Architect",
      gradient:
        "from-violet-500 via-purple-500 to-fuchsia-500",
      soft:
        "from-violet-50 via-purple-50 to-fuchsia-50",
      iconBg:
        "bg-violet-600",
    },
    {
      title: "Smart Budget Tracker",
      desc: "Track Kalyana Mandapam, Chettinad catering, silk sarees, decoration and every event expense.",
      icon: Calculator,
      link: "/budget-tracker",
      tag: "Financial Control",
      gradient:
        "from-amber-400 via-orange-500 to-rose-500",
      soft:
        "from-amber-50 via-orange-50 to-rose-50",
      iconBg:
        "bg-orange-500",
    },
    {
      title: "Day-of Muhurtham Timeline",
      desc: "Minute-by-minute cues for Ganapathi Homam, Kasi Yatra, Thali Kattu and ceremony moments.",
      icon: Clock,
      link: "/timeline",
      tag: "Ceremony Cueing",
      gradient:
        "from-cyan-400 via-sky-500 to-indigo-500",
      soft:
        "from-cyan-50 via-sky-50 to-indigo-50",
      iconBg:
        "bg-sky-600",
    },
    {
      title: "Kalyana Mandapam Seating",
      desc: "Arrange VIP front rows, dining banana-leaf hall batches and guest capacity allocation.",
      icon: Grid,
      link: "/seating-chart",
      tag: "Spatial Layout",
      gradient:
        "from-emerald-400 via-teal-500 to-cyan-500",
      soft:
        "from-emerald-50 via-teal-50 to-cyan-50",
      iconBg:
        "bg-teal-600",
    },
    {
      title: "Decor & Palette Studio",
      desc: "Curate temple gopuram backdrops, brass kuthu vilakku, flowers and celebration palettes.",
      icon: Palette,
      link: "/mood-board",
      tag: "Aesthetics",
      gradient:
        "from-pink-400 via-rose-500 to-red-500",
      soft:
        "from-pink-50 via-rose-50 to-red-50",
      iconBg:
        "bg-rose-600",
    },
    {
      title: "Vendor Comparator",
      desc: "Compare caterers, nadaswaram troupes, photographers, decorators and other vendors.",
      icon: Layers,
      link: "/compare-vendors",
      tag: "Procurement",
      gradient:
        "from-indigo-400 via-blue-500 to-cyan-500",
      soft:
        "from-indigo-50 via-blue-50 to-cyan-50",
      iconBg:
        "bg-indigo-600",
    },
  ];

  const floatingItems = [
    {
      icon: Sparkles,
      position: "top-[12%] left-[5%]",
      color: "text-fuchsia-400",
      delay: 0,
    },
    {
      icon: Star,
      position: "top-[28%] right-[7%]",
      color: "text-amber-400",
      delay: 0.8,
    },
    {
      icon: PartyPopper,
      position: "bottom-[20%] left-[8%]",
      color: "text-violet-400",
      delay: 1.5,
    },
    {
      icon: Heart,
      position: "bottom-[12%] right-[8%]",
      color: "text-rose-400",
      delay: 2.2,
    },
  ];

  return (
    <main className="overflow-hidden bg-slate-50 text-slate-900 font-sans">
      {/* =========================================================
          HERO
      ========================================================= */}
      <Hero />

      {/* =========================================================
          PLANNING TOOLS
      ========================================================= */}
      <section className="relative overflow-hidden py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-300/20 blur-3xl pointer-events-none" />

        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-fuchsia-300/15 blur-3xl pointer-events-none" />

        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-amber-300/15 blur-3xl pointer-events-none" />

        {/* Floating icons */}
        {floatingItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              className={`absolute hidden lg:block ${item.position} ${item.color} pointer-events-none`}
              animate={{
                y: [0, -14, 0],
                rotate: [0, 8, -8, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-7 h-7" />
            </motion.div>
          );
        })}

        <div className="relative max-w-7xl mx-auto">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 via-fuchsia-100 to-rose-100 border border-violet-200 text-violet-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5"
            >
              <WandSparkles className="w-4 h-4" />

              <span>Next-Generation Event Planning</span>

              <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Plan Every Moment
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                With Precision & Magic
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Powerful planning tools designed to transform your celebration
              from an idea into a beautifully organized experience.
            </p>
          </motion.div>

          {/* Top information row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-violet-600 border-2 border-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>

                <div className="w-9 h-9 rounded-full bg-fuchsia-500 border-2 border-white flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>

                <div className="w-9 h-9 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Your complete planning toolkit
                </p>
                <p className="text-xs text-slate-500">
                  Everything you need in one place
                </p>
              </div>
            </div>

            <Link
              to="/ai-planner"
              className="group inline-flex items-center justify-center gap-2 text-sm font-bold text-violet-700 hover:text-fuchsia-600 transition-colors"
            >
              <span>Explore Full Planning Suite</span>

              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Tools grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              const isFeatured = idx === 0;

              return (
                <motion.div
                  key={tool.title}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    to={tool.link}
                    className="group relative block h-full"
                  >
                    {/* Animated gradient border */}
                    <div
                      className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 blur-[1px] transition-opacity duration-500`}
                    />

                    <div
                      className={`relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br ${tool.soft} p-6 sm:p-7 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500`}
                    >
                      {/* Decorative circle */}
                      <motion.div
                        className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-white/50"
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 18,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Small decorative dots */}
                      <div className="absolute top-5 right-5 flex gap-1 opacity-40">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      </div>

                      {/* Icon + tag */}
                      <div className="relative flex items-start justify-between gap-4 mb-7">
                        <motion.div
                          whileHover={{
                            rotate: [0, -8, 8, 0],
                            scale: 1.08,
                          }}
                          transition={{ duration: 0.4 }}
                          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${tool.iconBg} text-white flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.div>

                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide bg-white/80 backdrop-blur-sm text-slate-700 border border-white px-3 py-1.5 rounded-full shadow-sm">
                          {isFeatured
                            ? "Featured"
                            : tool.tag}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-violet-700 transition-colors">
                          {tool.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {tool.desc}
                        </p>
                      </div>

                      {/* Bottom action */}
                      <div className="relative mt-7 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 group-hover:text-violet-700 transition-colors">
                          Open Module
                        </span>

                        <motion.div
                          whileHover={{
                            x: 5,
                          }}
                          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>

                      {/* Featured shine */}
                      {isFeatured && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                          animate={{
                            x: ["-120%", "120%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 4,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom feature strip */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-violet-950 to-fuchsia-950 p-7 sm:p-9 text-white shadow-2xl"
          >
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

            <div className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-fuchsia-300" />
                </div>

                <div>
                  <p className="text-lg font-black">
                    Built for unforgettable celebrations
                  </p>

                  <p className="mt-1 text-sm text-slate-300 max-w-2xl leading-relaxed">
                    From traditional Tamil weddings to modern celebrations,
                    organize your timeline, budget, vendors and guests with
                    confidence.
                  </p>
                </div>
              </div>

              <Link
                to="/ai-planner"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-violet-700 font-bold text-sm hover:bg-fuchsia-50 transition-all shadow-lg shrink-0"
              >
                Start Planning

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          EVENT CATEGORIES
      ========================================================= */}
      <EventCategories />

      {/* =========================================================
          FEATURED EVENTS
      ========================================================= */}
      <FeaturedEvents />

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <ServicesPreview />

      {/* =========================================================
          WHY CHOOSE EVENTARA
      ========================================================= */}
      <WhyChooseUs />

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <Testimonials />

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <CTASection />
    </main>
  );
};

export default Home;