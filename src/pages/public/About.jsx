import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  HeartHandshake,
  Target,
  Users,
  ShieldCheck,
  Sparkles,
  Building2,
  Award,
  Lightbulb,
  Compass,
  CalendarDays,
  WandSparkles,
  CheckCircle2,
  Star,
  PartyPopper,
} from "lucide-react";

const values = [
  {
    icon: HeartHandshake,
    title: "Cultural Authenticity",
    description:
      "Deeply rooted in Tamil Nadu ceremonial traditions—from auspicious Muhurtham lagna timings to authentic Chettinad banana leaf feasts.",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    soft: "from-violet-50 via-purple-50 to-fuchsia-50",
    iconBg: "bg-violet-600",
  },
  {
    icon: ShieldCheck,
    title: "100% Vetted Local Artisans",
    description:
      "We partner only with verified caterers, Thiruvarur Nadaswaram vidwans, Tanjore decor artists, and professional cinematographers.",
    gradient: "from-cyan-400 via-sky-500 to-indigo-500",
    soft: "from-cyan-50 via-sky-50 to-indigo-50",
    iconBg: "bg-sky-600",
  },
  {
    icon: Target,
    title: "Precision Financial Governance",
    description:
      "Real-time Indian Rupee (INR) budget tracking with category guardrails, mandapam advance tracking, and zero hidden costs.",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    soft: "from-amber-50 via-orange-50 to-rose-50",
    iconBg: "bg-orange-500",
  },
  {
    icon: Users,
    title: "Seamless Family Collaboration",
    description:
      "Built so family elders, Vadhyar priests, and hosts can view synchronized day-of schedules on their phones without friction.",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    soft: "from-emerald-50 via-teal-50 to-cyan-50",
    iconBg: "bg-teal-600",
  },
];

const planningSteps = [
  {
    number: "01",
    title: "Define Ceremony Vision",
    description:
      "Input guest count, auspicious Muhurtham date, target city (Chennai, CBE, Madurai), and budget in INR.",
    icon: Compass,
    gradient: "from-violet-500 to-fuchsia-500",
    iconBg: "bg-violet-600",
  },
  {
    number: "02",
    title: "Synthesize AI Blueprint",
    description:
      "Receive an instant minute-by-minute ceremonial run-of-show, itemized expense breakdown, and vetted vendor shortlists.",
    icon: WandSparkles,
    gradient: "from-orange-400 to-rose-500",
    iconBg: "bg-orange-500",
  },
  {
    number: "03",
    title: "Lock Dates & Execute",
    description:
      "Confirm verified artisan contracts, send digital invitations with feast preferences, and run a flawless celebration.",
    icon: CalendarDays,
    gradient: "from-cyan-400 to-indigo-500",
    iconBg: "bg-indigo-600",
  },
];

const floatingIcons = [
  {
    icon: Sparkles,
    position: "top-[18%] left-[4%]",
    color: "text-fuchsia-400",
    delay: 0,
  },
  {
    icon: Star,
    position: "top-[25%] right-[6%]",
    color: "text-amber-400",
    delay: 1,
  },
  {
    icon: PartyPopper,
    position: "bottom-[15%] left-[7%]",
    color: "text-violet-400",
    delay: 1.8,
  },
  {
    icon: Sparkles,
    position: "bottom-[10%] right-[8%]",
    color: "text-cyan-400",
    delay: 2.5,
  },
];

const About = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden px-5 pt-32 pb-24 sm:px-8 lg:px-12">

        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50" />

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-300/20 blur-3xl" />

        <div className="absolute top-20 right-[-180px] w-[500px] h-[500px] rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="absolute bottom-[-200px] left-1/3 w-[450px] h-[450px] rounded-full bg-orange-300/15 blur-3xl" />

        {/* Floating icons */}
        {floatingIcons.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              className={`absolute hidden lg:block ${item.position} ${item.color} pointer-events-none`}
              animate={{
                y: [0, -16, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
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

        <div className="relative mx-auto max-w-7xl">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2 text-xs text-slate-500"
          >
            <Link
              to="/"
              className="hover:text-violet-600 transition-colors"
            >
              Home
            </Link>

            <ArrowRight className="h-3 w-3" />

            <span className="font-semibold text-violet-700">
              About Eventara
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center">

            {/* Hero content */}
            <div className="max-w-3xl">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-700 shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-fuchsia-500" />
                India's Premier Event Platform
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display leading-[1.08]"
              >
                Curating

                <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                  Tamil Nadu's Finest
                </span>

                Celebrations
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl"
              >
                Eventara was founded to replace stressful manual coordination
                with an intelligent planning system. We bridge rich Indian
                ceremonial heritage with next-generation planning technology.
              </motion.p>

              {/* Hero highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {[
                  {
                    icon: CheckCircle2,
                    text: "Smart Planning",
                    color: "text-violet-700 bg-violet-50 border-violet-200",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Verified Vendors",
                    color: "text-cyan-700 bg-cyan-50 border-cyan-200",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Transparent Budgets",
                    color: "text-orange-700 bg-orange-50 border-orange-200",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <span
                      key={index}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-bold ${item.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.text}
                    </span>
                  );
                })}
              </motion.div>
            </div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto w-[360px] h-[360px]">

                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-violet-300"
                />

                {/* Outer gradient ring */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 p-[2px] shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white" />
                </div>

                {/* Center */}
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 flex items-center justify-center shadow-2xl">
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="w-32 h-32 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center"
                  >
                    <PartyPopper className="w-16 h-16 text-white" />
                  </motion.div>
                </div>

                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute top-5 right-0 px-4 py-3 rounded-2xl bg-white shadow-xl border border-violet-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">
                        Planning
                      </p>
                      <p className="text-xs font-black text-slate-900">
                        Intelligent
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                  className="absolute bottom-8 left-0 px-4 py-3 rounded-2xl bg-white shadow-xl border border-orange-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                      <HeartHandshake className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">
                        Experience
                      </p>
                      <p className="text-xs font-black text-slate-900">
                        Celebrations
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CORE VALUES
      ========================================================= */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12 bg-white">

        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent" />

        <div className="relative mx-auto max-w-7xl">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-wider mb-5">
              <Award className="w-4 h-4" />
              What We Stand For
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display">
              Principles Behind
              <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                Every Celebration
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              The values that guide how we plan, coordinate and deliver
              meaningful celebrations.
            </p>
          </motion.div>

          {/* Values */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
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
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group relative"
                >
                  {/* Gradient border */}
                  <div
                    className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]`}
                  />

                  <div
                    className={`relative h-full rounded-3xl border border-slate-200 bg-gradient-to-br ${value.soft} p-6 shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden`}
                  >
                    {/* Decorative circle */}
                    <div className="absolute -right-12 -top-12 w-28 h-28 rounded-full bg-white/50" />

                    <motion.div
                      whileHover={{
                        rotate: [0, -8, 8, 0],
                        scale: 1.08,
                      }}
                      className={`relative w-12 h-12 rounded-2xl ${value.iconBg} text-white flex items-center justify-center shadow-lg mb-6`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>

                    <h3 className="relative text-lg font-black text-slate-900 group-hover:text-violet-700 transition-colors">
                      {value.title}
                    </h3>

                    <p className="relative mt-3 text-sm text-slate-600 leading-relaxed">
                      {value.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-500">
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      Built into every experience
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12 bg-slate-950 text-white">

        {/* Background gradients */}
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-fuchsia-600/20 blur-3xl" />

        <div className="absolute -bottom-40 left-0 w-96 h-96 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-fuchsia-300 text-xs font-bold uppercase tracking-wider mb-5">
              <Lightbulb className="w-4 h-4" />
              Simple. Smart. Seamless.
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display">
              From First Idea
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
                To Perfect Celebration
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Three simple stages designed to take the stress out of event
              planning.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative grid gap-8 lg:grid-cols-3">

            {/* Connecting line */}
            <div className="hidden lg:block absolute top-20 left-[16%] right-[16%] h-px bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 opacity-40" />

            {planningSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
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
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  className="relative"
                >
                  {/* Number */}
                  <div className="flex justify-center mb-7">
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        rotate: 5,
                      }}
                      className={`relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl`}
                    >
                      <Icon className="w-8 h-8 text-white" />

                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-slate-900 text-[10px] font-black flex items-center justify-center shadow-lg">
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-sm p-7 text-center hover:bg-white/[0.08] transition-all duration-500">
                    <h3 className="text-xl font-black">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Step {index + 1} complete
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <Link
              to="/ai-planner"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 text-white font-bold text-sm shadow-xl hover:shadow-fuchsia-500/20 hover:scale-[1.03] transition-all"
            >
              <WandSparkles className="w-4 h-4" />

              <span>Launch AI Planner Now</span>

              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FINAL BRAND STATEMENT
      ========================================================= */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12 bg-gradient-to-br from-violet-50 via-white to-orange-50">

        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 text-white shadow-xl mb-6">
            <Building2 className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-display">
            Tradition Meets
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
              {" "}Technology
            </span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            Eventara brings together cultural knowledge, intelligent planning,
            trusted vendors and modern technology to help families create
            celebrations they will remember for years.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
              Cultural Heritage
            </span>

            <span className="px-4 py-2 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs font-bold">
              Smart Technology
            </span>

            <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
              Beautiful Experiences
            </span>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default About;