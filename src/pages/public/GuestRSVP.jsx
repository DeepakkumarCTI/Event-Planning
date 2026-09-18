import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Heart,
  Sparkles,
  User,
  Users,
  Utensils,
  MailCheck,
  PartyPopper,
} from "lucide-react";

const GuestRSVP = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState("yes");
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [mealChoice, setMealChoice] = useState("banana-leaf-veg");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [wishes, setWishes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(
      localStorage.getItem("eventara_guest_rsvps_tn") || "[]"
    );

    const newRsvp = {
      id: Date.now(),
      fullName,
      email,
      phone,
      attending,
      hasPlusOne,
      plusOneName,
      mealChoice,
      dietaryNotes,
      wishes,
      submittedAt: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "eventara_guest_rsvps_tn",
      JSON.stringify([newRsvp, ...existing])
    );

    setIsSubmitted(true);
  };

  const mealOptions = [
    {
      id: "banana-leaf-veg",
      title: "Traditional 24-Item Banana Leaf Feast",
      desc: "Pure South Indian vegetarian banquet served on fresh plantain leaf with payasam & filter coffee",
      active: "border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50",
      icon: "bg-amber-100 text-amber-700",
    },
    {
      id: "chettinad-nonveg",
      title: "Chettinad Non-Veg Reception Banquet",
      desc: "Evening reception spread featuring Chettinad biryani, mutton chukka & seafood",
      active: "border-rose-400 bg-gradient-to-br from-rose-50 to-pink-50",
      icon: "bg-rose-100 text-rose-700",
    },
    {
      id: "jain-satvik",
      title: "Jain Satvik Meal",
      desc: "Pure vegetarian preparation without root vegetables, onion, or garlic",
      active: "border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50",
      icon: "bg-emerald-100 text-emerald-700",
    },
    {
      id: "diabetic-friendly",
      title: "Diabetic / Millet Friendly Meal",
      desc: "Nutrient-rich traditional millet rice with low-glycemic accompaniments",
      active: "border-cyan-400 bg-gradient-to-br from-cyan-50 to-sky-50",
      icon: "bg-cyan-100 text-cyan-700",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 px-4 pb-24 pt-28 font-sans sm:px-6 lg:px-8">
      {/* =========================================================
          BACKGROUND DECORATIONS
      ========================================================== */}

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed -left-32 top-20 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed -right-32 top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-4xl">
        {/* =========================================================
            INVITATION CARD
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-2xl"
        >
          {/* =====================================================
              HERO IMAGE
          ====================================================== */}

          <div className="relative h-60 w-full overflow-hidden sm:h-80">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              src="/images/chennai_reception_stage.jpg"
              alt="Tamil Nadu Wedding Reception Stage"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/50 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-950/30 via-transparent to-orange-950/30" />

            {/* Decorative sparkle */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-amber-300 backdrop-blur-md"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>

            <div className="absolute bottom-6 left-5 right-5 text-center sm:left-8 sm:right-8 sm:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-300/30 bg-pink-500/20 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-pink-100 backdrop-blur-md">
                <MailCheck className="h-3.5 w-3.5 text-pink-300" />
                Official Digital Invitation & RSVP
              </span>

              <h1 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-4xl">
                Arun & Priya's
                <span className="block bg-gradient-to-r from-amber-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
                  Muhurtham & Reception
                </span>
              </h1>

              <p className="mt-2 text-xs text-slate-200 sm:text-sm">
                We request the pleasure of your company with family and
                friends as we celebrate this beautiful occasion.
              </p>
            </div>
          </div>

          {/* =====================================================
              EVENT INFORMATION
          ====================================================== */}

          <div className="grid grid-cols-1 gap-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-purple-50/50 to-pink-50/50 p-5 sm:grid-cols-3 sm:p-6">
            <div className="flex items-center gap-3 rounded-xl border border-violet-100 bg-violet-50 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white shadow-md shadow-violet-200">
                <Calendar className="h-4 w-4" />
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                  Date
                </p>
                <p className="mt-0.5 text-xs font-bold text-slate-800">
                  Sunday, October 18, 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md shadow-orange-200">
                <Clock className="h-4 w-4" />
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                  Muhurtham
                </p>
                <p className="mt-0.5 text-xs font-bold text-slate-800">
                  08:45 AM - 09:45 AM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-cyan-100 bg-cyan-50 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-600 text-white shadow-md shadow-cyan-200">
                <MapPin className="h-4 w-4" />
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-600">
                  Venue
                </p>
                <p className="mt-0.5 text-xs font-bold text-slate-800">
                  Mayor Ramanathan Chettiar Hall, Chennai
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              RSVP CONTENT
          ====================================================== */}

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      delay: 0.1,
                    }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-xl shadow-emerald-200"
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </motion.div>

                  <h3 className="mt-6 text-2xl font-extrabold text-slate-900">
                    Thank You! Your RSVP Is Confirmed
                  </h3>

                  <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500" />

                  <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-600">
                    Thank you,{" "}
                    <span className="font-bold text-violet-700">
                      {fullName}
                    </span>
                    . Your attendance and dining preference have been
                    recorded. We look forward to celebrating this auspicious
                    occasion with you.
                  </p>

                  <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
                    <Heart className="h-4 w-4 fill-amber-500 text-amber-500" />
                    Your presence will make the celebration even more special.
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-7 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-xs font-extrabold text-white shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Edit My Response
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >
                  {/* =================================================
                      ATTENDANCE
                  ================================================== */}

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                        <PartyPopper className="h-4 w-4" />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800">
                          Your Celebration Response
                        </label>

                        <p className="mt-0.5 text-[11px] text-slate-500">
                          Let the family know if you can join the celebration.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setAttending("yes")}
                        className={`rounded-2xl border p-4 text-left transition-all ${
                          attending === "yes"
                            ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-cyan-50 shadow-lg shadow-emerald-100"
                            : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              attending === "yes"
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </span>

                          <div>
                            <p
                              className={`text-sm font-extrabold ${
                                attending === "yes"
                                  ? "text-emerald-800"
                                  : "text-slate-800"
                              }`}
                            >
                              Joyfully Attending
                            </p>

                            <p className="mt-1 text-[11px] text-slate-500">
                              I would love to be there.
                            </p>
                          </div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setAttending("no")}
                        className={`rounded-2xl border p-4 text-left transition-all ${
                          attending === "no"
                            ? "border-rose-400 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg shadow-rose-100"
                            : "border-slate-200 bg-white hover:border-rose-200 hover:bg-rose-50/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              attending === "no"
                                ? "bg-rose-500 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <Heart className="h-5 w-5" />
                          </span>

                          <div>
                            <p
                              className={`text-sm font-extrabold ${
                                attending === "no"
                                  ? "text-rose-800"
                                  : "text-slate-800"
                              }`}
                            >
                              Regretfully Unable
                            </p>

                            <p className="mt-1 text-[11px] text-slate-500">
                              Sending my warmest wishes.
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {attending === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.35 }}
                      className="space-y-7"
                    >
                      {/* =============================================
                          CONTACT DETAILS
                      ============================================== */}

                      <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/60 via-white to-fuchsia-50/60 p-5">
                        <div className="mb-5 flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200">
                            <User className="h-4 w-4" />
                          </span>

                          <div>
                            <h3 className="text-sm font-extrabold text-slate-900">
                              Your Contact Details
                            </h3>

                            <p className="text-[11px] text-slate-500">
                              Share your details so the family can coordinate
                              with you.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Full Name *
                            </label>

                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="E.g. S. Ramaswamy"
                              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Phone Number *
                            </label>

                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+91 98400 12345"
                              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 font-mono text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            Email Address
                          </label>

                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="yourname@gmail.com"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
                          />
                        </div>
                      </div>

                      {/* =============================================
                          FAMILY MEMBERS
                      ============================================== */}

                      <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50/70 via-white to-amber-50/70 p-5">
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            checked={hasPlusOne}
                            onChange={(e) => setHasPlusOne(e.target.checked)}
                            className="mt-0.5 h-4 w-4 accent-orange-500"
                          />

                          <span>
                            <span className="flex items-center gap-2 text-sm font-extrabold text-orange-900">
                              <Users className="h-4 w-4 text-orange-600" />
                              Attending with Family Members / Spouse
                            </span>

                            <span className="mt-1 block text-[11px] leading-5 text-slate-500">
                              Let the family know who will be accompanying
                              you.
                            </span>
                          </span>
                        </label>

                        <AnimatePresence>
                          {hasPlusOne && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                height: 0,
                                marginTop: 0,
                              }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                                marginTop: 14,
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                                marginTop: 0,
                              }}
                            >
                              <input
                                type="text"
                                value={plusOneName}
                                onChange={(e) =>
                                  setPlusOneName(e.target.value)
                                }
                                placeholder="Names of accompanying family members"
                                className="w-full rounded-xl border border-orange-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* =============================================
                          DINING PREFERENCE
                      ============================================== */}

                      <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/50 via-white to-cyan-50/40 p-5">
                        <div className="mb-5 flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200">
                            <Utensils className="h-4 w-4" />
                          </span>

                          <div>
                            <h3 className="text-sm font-extrabold text-slate-900">
                              Your Dining Preference
                            </h3>

                            <p className="text-[11px] text-slate-500">
                              Choose the ceremonial feast that suits you best.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {mealOptions.map((meal) => (
                            <motion.div
                              key={meal.id}
                              whileHover={{ y: -2 }}
                              onClick={() => setMealChoice(meal.id)}
                              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                                mealChoice === meal.id
                                  ? meal.active
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meal.icon}`}
                                >
                                  <Utensils className="h-3.5 w-3.5" />
                                </span>

                                <div className="flex-1">
                                  <div className="flex items-start gap-2">
                                    <input
                                      type="radio"
                                      name="meal"
                                      checked={mealChoice === meal.id}
                                      onChange={() =>
                                        setMealChoice(meal.id)
                                      }
                                      className="mt-1 accent-violet-600"
                                    />

                                    <span className="text-xs font-extrabold leading-5 text-slate-900">
                                      {meal.title}
                                    </span>
                                  </div>

                                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                                    {meal.desc}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* =============================================
                          DIETARY NOTES
                      ============================================== */}

                      <div className="rounded-2xl border border-cyan-100 bg-cyan-50/40 p-5">
                        <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-cyan-900">
                          Dietary Notes
                        </label>

                        <textarea
                          rows={2}
                          value={dietaryNotes}
                          onChange={(e) => setDietaryNotes(e.target.value)}
                          placeholder="Mention any allergies, dietary requirements, or special meal requests..."
                          className="w-full rounded-xl border border-cyan-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* =================================================
                      WISHES
                  ================================================== */}

                  <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50/70 via-white to-rose-50/70 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />

                      <label className="text-xs font-extrabold uppercase tracking-wider text-pink-900">
                        Ashirvatham & Warm Wishes
                      </label>
                    </div>

                    <textarea
                      rows={3}
                      value={wishes}
                      onChange={(e) => setWishes(e.target.value)}
                      placeholder="Share your blessings and heartfelt congratulations with the couple..."
                      className="w-full rounded-xl border border-pink-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                    />
                  </div>

                  {/* =================================================
                      SUBMIT
                  ================================================== */}

                  <motion.button
                    whileHover={{
                      scale: 1.01,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500 px-5 py-4 text-sm font-extrabold text-white shadow-xl shadow-fuchsia-200/50 transition-all hover:shadow-2xl"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-white/20 to-amber-300/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="relative flex items-center justify-center gap-2">
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      Submit My Celebration RSVP
                    </span>
                  </motion.button>

                  <p className="text-center text-[10px] leading-5 text-slate-400">
                    Your RSVP details are stored securely for event
                    coordination and celebration planning.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* =========================================================
            BOTTOM DECORATION
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-indigo-200"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Celebrating traditions, togetherness & beautiful moments</span>
          <Sparkles className="h-3.5 w-3.5 text-pink-300" />
        </motion.div>
      </div>
    </main>
  );
};

export default GuestRSVP;