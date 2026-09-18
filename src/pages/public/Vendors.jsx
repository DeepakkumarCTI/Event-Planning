import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  Search,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
  Filter,
  Check,
  Briefcase,
  X,
} from "lucide-react";
import { vendors, vendorCategories } from "../../data/vendors";

const Vendors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("aiMatch");
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem("eventara_compare_vendors");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("eventara_compare_vendors", JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (vendor) => {
    if (compareList.some((v) => v.id === vendor.id)) {
      setCompareList(compareList.filter((v) => v.id !== vendor.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 vendors at a time.");
        return;
      }
      setCompareList([...compareList, vendor]);
    }
  };

  // Filter vendors
  const filteredVendors = vendors
    .filter((v) => {
      const matchCat =
        selectedCategory === "all" || v.category === selectedCategory;
      const matchQuery =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice =
        selectedPriceRange === "all" || v.priceRange === selectedPriceRange;
      return matchCat && matchQuery && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === "aiMatch") return b.aiMatchScore - a.aiMatchScore;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "priceLow") return a.startingPrice - b.startingPrice;
      if (sortBy === "priceHigh") return b.startingPrice - a.startingPrice;
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            100% Vetted Tamil Nadu Artisans
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Verified Vendor Marketplace
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover top-rated Chettinad caterers, traditional Nadaswaram vidwans, mandapam floral architects, and candid cinematographers across Chennai, Coimbatore, and Madurai.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vendor by name, specialty, or city (e.g. Chettinad, Chennai, Mandapam)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>

            {/* Price Tier Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-700 focus:outline-none focus:border-teal-600"
              >
                <option value="all">All Budget Tiers</option>
                <option value="₹">₹ — Value Tier</option>
                <option value="₹₹">₹₹ — Moderate Tier</option>
                <option value="₹₹₹">₹₹₹ — Premium Tier</option>
                <option value="₹₹₹₹">₹₹₹₹ — Luxury Royal</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-700 focus:outline-none focus:border-teal-600"
              >
                <option value="aiMatch">Sort by AI Match Score</option>
                <option value="rating">Sort by Rating</option>
                <option value="priceLow">Starting Price: Low to High</option>
                <option value="priceHigh">Starting Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-teal-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Specialties ({vendors.length})
            </button>
            {vendorCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-teal-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor, vIdx) => {
            const isCompared = compareList.some((v) => v.id === vendor.id);
            const isFeatured = vendor.aiMatchScore >= 99 || (selectedCategory === "all" && vIdx === 0);

            return (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                  isFeatured
                    ? "bg-teal-50/80 border-2 border-teal-300 text-slate-900 shadow-xs hover:border-teal-600 hover:shadow-md"
                    : "bg-teal-50/60 border border-teal-200/90 text-slate-900 shadow-xs hover:bg-teal-50/90 hover:border-teal-500 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={vendor.avatar}
                      alt={vendor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-bold shadow-xs whitespace-nowrap ${
                          isFeatured
                            ? "bg-teal-700 text-white"
                            : "bg-white/90 text-teal-800"
                        }`}
                      >
                        {vendor.categoryName}
                      </span>
                      {isFeatured && (
                        <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-md text-teal-900 text-[10px] font-bold uppercase tracking-wider shadow-xs border border-teal-200 whitespace-nowrap">
                          Premier Pick
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-teal-700 text-white text-[11px] font-bold shadow-xs whitespace-nowrap">
                        {vendor.aiMatchScore}% Match
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3
                          className={`text-base font-bold ${
                            isFeatured ? "text-teal-950" : "text-slate-900"
                          }`}
                        >
                          {vendor.name}
                        </h3>
                        <p
                          className={`text-xs mt-0.5 ${
                            isFeatured ? "text-slate-600" : "text-slate-500"
                          }`}
                        >
                          {vendor.tagline}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-bold bg-amber-50 border-amber-200 text-amber-800 shrink-0 whitespace-nowrap">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 text-xs pt-1 whitespace-nowrap ${
                        isFeatured ? "text-slate-600" : "text-slate-500"
                      }`}
                    >
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        {vendor.location}
                      </span>
                      <span>•</span>
                      <span className="whitespace-nowrap">{vendor.bookedCount || "85"}+ Bookings</span>
                    </div>

                    <p
                      className={`text-xs line-clamp-2 leading-relaxed ${
                        isFeatured ? "text-slate-700" : "text-slate-600"
                      }`}
                    >
                      {vendor.bio}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="pt-3 border-t border-teal-200/80 flex items-center justify-between whitespace-nowrap">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-teal-900/60 whitespace-nowrap">
                        Starting From
                      </div>
                      <div className="text-sm font-bold font-mono text-teal-900 whitespace-nowrap">
                        ₹{Number(vendor.startingPrice || 25000).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCompare(vendor)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 whitespace-nowrap ${
                        isCompared
                          ? "bg-teal-700 border-teal-700 text-white shadow-xs"
                          : "border-teal-200 bg-white/90 text-teal-800 hover:bg-teal-700 hover:text-white hover:border-teal-700 shadow-xs"
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">{isCompared ? "Compared" : "Compare"}</span>
                    </button>
                  </div>

                  <Link
                    to={`/vendors/${vendor.id}`}
                    className={`w-full py-2 rounded-lg text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 border whitespace-nowrap ${
                      isFeatured
                        ? "bg-teal-700 hover:bg-teal-800 border-teal-700 text-white shadow-xs"
                        : "bg-white/90 hover:bg-teal-700 border-teal-200 hover:border-teal-700 text-teal-800 hover:text-white shadow-xs"
                    }`}
                  >
                    <span className="whitespace-nowrap">View Artisan Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Compare Tray */}
        {compareList.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border border-slate-200 shadow-xl rounded-xl p-3 sm:p-4 max-w-xl w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                Compare ({compareList.length}/3):
              </span>
              <div className="flex items-center gap-1.5">
                {compareList.map((v) => (
                  <span
                    key={v.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-900"
                  >
                    <span className="truncate max-w-[100px]">{v.name}</span>
                    <button
                      onClick={() => toggleCompare(v)}
                      className="text-teal-700 hover:text-rose-600 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <Link
              to="/compare-vendors"
              className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <span>Launch Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;
