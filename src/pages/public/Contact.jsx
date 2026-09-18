
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  ChevronDown,
  Sparkles,
  CalendarDays,
  Heart,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const faqs = [
  {
    question: "How far in advance should I book my Kalyana Mandapam in Chennai?",
    answer:
      "For peak auspicious Muhurtham dates (Subha Muhurtham days in Thai, Chithirai, or Vaikasi months), we recommend booking 8 to 12 months in advance to secure top venues like Mayor Ramanathan Chettiar Hall.",
  },
  {
    question: "Do you accommodate specialized Chettinad and Brahmin catering?",
    answer:
      "Yes. Our partner caterers specialize in traditional pure vegetarian banana leaf feasts (24-item spreads) as well as authentic Chettinad non-vegetarian banquet menus with live Kumbakonam filter coffee stalls.",
  },
  {
    question: "How does the AI Event Planner calculate ceremony budgets?",
    answer:
      "Our AI model is trained on real Tamil Nadu wedding expenditure data in INR, dynamically balancing mandapam advance, catering costs per leaf, nadaswaram troupe fees, floral decor, and photography.",
  },
  {
    question: "Can I manage guest invitations and RSVPs through the platform?",
    answer:
      "Yes. You can generate digital wedding invitations with custom RSVP forms where guests can confirm attendance and select their feast preferences (Pure Veg, Chettinad Non-Veg, or Jain Satvik).",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  eventType: "Muhurtham",
  city: "Chennai",
  guestCount: "",
  budget: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-amber-50/60 to-rose-50/70 font-sans text-slate-900">
      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[-120px] top-64 h-96 w-96 rounded-full bg-rose-300/25 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-40 left-1/3 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl"
          animate={{
            x: [0, -25, 20, 0],
            y: [0, 25, -20, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_35%)]" />
      </div>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative border-b border-slate-200/80 px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
              <Link
                to="/"
                className="font-medium transition-colors hover:text-violet-600"
              >
                Home
              </Link>

              <ArrowRight className="h-3 w-3 text-slate-400" />

              <span className="font-semibold text-violet-700">
                Contact Concierge
              </span>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-rose-700 shadow-sm backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Tamil Nadu Concierge Desk
            </motion.div>

            {/* Heading */}
            <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Let's Create Something
              <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
                Unforgettable Together.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Have questions about auspicious Muhurtham dates, mandapam
              selection, or custom catering? Reach out to our dedicated event
              concierge desks in Chennai, Coimbatore, and Madurai.
            </p>

            {/* Hero mini features */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-medium text-cyan-700 shadow-sm">
                <CalendarDays className="h-3.5 w-3.5 text-cyan-600" />
                Event Planning
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-medium text-rose-700 shadow-sm">
                <Heart className="h-3.5 w-3.5 text-rose-600" />
                Personalized Celebrations
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Verified Artisans
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          CONTACT + FORM
      ========================================================== */}

      <section className="relative px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-12">

          {/* =====================================================
              LEFT CONTACT COLUMN
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="space-y-5 lg:col-span-5"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-7">

              {/* Card heading */}
              <div className="mb-7">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900">
                  Regional Headquarters
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Connect with our celebration specialists across Tamil Nadu.
                </p>
              </div>

              <div className="space-y-6">

                {/* Chennai */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-700 transition-all group-hover:bg-violet-100">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Chennai Headquarters
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Guindy Olympic Tower, Inner Ring Road, Chennai, Tamil Nadu
                      600032
                    </p>
                  </div>
                </motion.div>

                {/* Coimbatore */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-200 bg-cyan-50 text-cyan-700 transition-all group-hover:bg-cyan-100">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Coimbatore Office
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Race Course Road, Gopalapuram, Coimbatore, Tamil Nadu
                      641018
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700 transition-all group-hover:bg-amber-100">
                    <Phone className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Concierge Phone Desk
                    </div>

                    <p className="mt-1 font-mono text-xs font-semibold text-amber-700">
                      +91 44 4890 2200 / +91 98400 12345
                    </p>

                    <p className="mt-1 text-[11px] text-slate-500">
                      Mon-Sun: 08:00 AM - 09:00 PM IST
                    </p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-700 transition-all group-hover:bg-rose-100">
                    <Mail className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Direct Inquiries
                    </div>

                    <p className="mt-1 text-xs font-semibold text-rose-700">
                      concierge@eventara.in
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Small gradient info card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 p-6 shadow-lg shadow-slate-200/50"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-300/30 blur-3xl" />

              <div className="relative">
                <Sparkles className="mb-3 h-5 w-5 text-amber-600" />

                <h4 className="font-display text-base font-bold text-slate-900">
                  Your celebration starts here.
                </h4>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Tell us what you're planning and our concierge team will help
                  turn your ideas into a memorable celebration.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* =====================================================
              RIGHT FORM COLUMN
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative lg:col-span-7"
          >
            <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-violet-300/30 via-fuchsia-300/30 to-cyan-300/30 blur-xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/60 sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.5 }}
                    className="flex min-h-[520px] flex-col items-center justify-center space-y-5 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 12,
                        delay: 0.15,
                      }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-xl shadow-emerald-200"
                    >
                      <CheckCircle2 className="h-10 w-10" />
                    </motion.div>

                    <div>
                      <h3 className="font-display text-2xl font-extrabold text-slate-900">
                        Inquiry Received!
                      </h3>

                      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                        Thank you, {form.name}. Our Tamil Nadu event concierge
                        will review your celebration requirements and contact
                        you within 2 business hours.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm(initialForm);
                      }}
                      className="rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-fuchsia-200 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5 text-xs"
                  >
                    {/* Form Header */}
                    <div className="border-b border-slate-100 pb-5">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700">
                        <Sparkles className="h-3 w-3" />
                        Let's Plan Your Event
                      </div>

                      <h3 className="font-display text-xl font-bold text-slate-900">
                        Send Ceremony & Event Inquiry
                      </h3>

                      <p className="mt-1 text-[11px] leading-5 text-slate-500">
                        Our team will match you with verified local artisans.
                      </p>
                    </div>

                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block font-semibold text-slate-700">
                          Your Full Name *
                        </label>

                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => updateForm("name", e.target.value)}
                          placeholder="E.g. S. Ramanathan"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block font-semibold text-slate-700">
                          Phone Number *
                        </label>

                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => updateForm("phone", e.target.value)}
                          placeholder="+91 98400 12345"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-mono text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                        />
                      </div>
                    </div>

                    {/* Email + City */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block font-semibold text-slate-700">
                          Email Address *
                        </label>

                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                          placeholder="email@example.com"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:ring-4 focus:ring-fuchsia-500/10"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block font-semibold text-slate-700">
                          Celebration City
                        </label>

                        <select
                          value={form.city}
                          onChange={(e) => updateForm("city", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                        >
                          <option value="Chennai">Chennai</option>
                          <option value="Coimbatore">Coimbatore</option>
                          <option value="Madurai">Madurai</option>
                          <option value="Trichy">Trichy</option>
                          <option value="Salem">Salem</option>
                        </select>
                      </div>
                    </div>

                    {/* Occasion + Budget */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block font-semibold text-slate-700">
                          Occasion Type
                        </label>

                        <select
                          value={form.eventType}
                          onChange={(e) =>
                            updateForm("eventType", e.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10"
                        >
                          <option value="Muhurtham">
                            Traditional Muhurtham
                          </option>

                          <option value="Reception">
                            Grand Reception
                          </option>

                          <option value="Nichayathartham">
                            Betrothal / Engagement
                          </option>

                          <option value="Seemantham">
                            Seemantham / Valaikaappu
                          </option>

                          <option value="Grahapravesam">
                            Grahapravesam (Housewarming)
                          </option>

                          <option value="Corporate">
                            Corporate Conclave
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1.5 block font-semibold text-slate-700">
                          Estimated Budget (INR)
                        </label>

                        <select
                          value={form.budget}
                          onChange={(e) =>
                            updateForm("budget", e.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                        >
                          <option value="">Select Range...</option>

                          <option value="Under 5 Lakhs">
                            Under ₹5 Lakhs
                          </option>

                          <option value="5-10 Lakhs">
                            ₹5 Lakhs - ₹10 Lakhs
                          </option>

                          <option value="10-25 Lakhs">
                            ₹10 Lakhs - ₹25 Lakhs
                          </option>

                          <option value="25-50 Lakhs">
                            ₹25 Lakhs - ₹50 Lakhs
                          </option>

                          <option value="50+ Lakhs">
                            ₹50+ Lakhs (Royal Luxury)
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1.5 block font-semibold text-slate-700">
                        Ceremony Specifics / Requirements
                      </label>

                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          updateForm("message", e.target.value)
                        }
                        placeholder="Tell us about desired mandapam location, banana leaf catering counts, or date preferences..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.01,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 py-3.5 font-bold text-white shadow-xl shadow-fuchsia-200"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      <span className="relative flex items-center justify-center gap-2">
                        <Send className="h-4 w-4" />

                        <span>Transmit Inquiry to Concierge</span>

                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}

      <section className="relative border-t border-slate-200 bg-gradient-to-br from-sky-50 via-violet-50 to-fuchsia-50 px-5 py-20 text-slate-900 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl"
            animate={{
              x: [0, -25, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-700 shadow-sm">
              <MessageCircle className="h-3 w-3" />
              Need to Know
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked
              <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {" "}
                Questions
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-slate-600 sm:text-sm">
              Clear answers to common questions about Tamil Nadu event
              planning.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.06,
                  }}
                  className={`overflow-hidden rounded-2xl border bg-white/85 shadow-sm backdrop-blur-md transition-all duration-300 ${
                    isOpen
                      ? "border-violet-300 shadow-lg shadow-violet-100"
                      : "border-slate-200 hover:border-fuchsia-200 hover:shadow-md"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : idx)
                    }
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                  >
                    <span
                      className={`text-xs font-bold leading-5 transition-colors sm:text-sm ${
                        isOpen ? "text-violet-700" : "text-slate-800"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                        isOpen
                          ? "border-violet-200 bg-violet-50 text-violet-700"
                          : "border-slate-200 bg-slate-50 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="border-t border-slate-200 px-5 pb-5 pt-4 text-xs leading-6 text-slate-600 sm:text-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500 px-5 py-14 text-white sm:px-8 lg:px-12">
        <motion.div
          className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-amber-300/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
              <Sparkles className="h-4 w-4 text-amber-200" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                Eventara Concierge
              </span>
            </div>

            <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
              Ready to plan your celebration?
            </h3>

            <p className="mt-2 text-xs text-white/75 sm:text-sm">
              Share your vision with our event planning specialists.
            </p>
          </div>

          <Link
            to="/vendors"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-violet-700 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            Explore Vendors

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Contact;
