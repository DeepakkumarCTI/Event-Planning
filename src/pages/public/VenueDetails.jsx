import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Star,
  Users,
  X,
} from "lucide-react";

import {
  getVenueById,
  venues,
} from "../../data/venues";

import Button from "../../components/common/Button";
import formatCurrency from "../../utils/formatCurrency";

const VenueDetails = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const venue = getVenueById(venueId);

  /* =========================================================
     VENUE NOT FOUND
  ========================================================= */

  if (!venue) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Building2 className="h-7 w-7" />
          </div>

          <h1 className="mt-6 text-2xl font-semibold text-stone-900">
            Venue not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            The venue you are looking for may have been removed
            or the link may be incorrect.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              to="/venues"
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              Browse Venues
            </Button>

            <Button
              to="/"
              variant="outline"
            >
              Go Home
            </Button>
          </div>
        </motion.div>
      </main>
    );
  }

  /* =========================================================
     IMAGES
  ========================================================= */

  const galleryImages = getGalleryImages(venue);

  /* =========================================================
     RELATED VENUES
  ========================================================= */

  const relatedVenues = venues
    .filter(
      (item) =>
        item.id !== venue.id &&
        (
          item.type === venue.type ||
          item.location?.city === venue.location?.city
        )
    )
    .slice(0, 3);

  /* =========================================================
     GALLERY CONTROLS
  ========================================================= */

  const nextImage = () => {
    setActiveImage((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0
        ? galleryImages.length - 1
        : current - 1
    );
  };

  return (
    <main className="min-h-screen bg-stone-50">

      {/* =====================================================
          HERO / GALLERY
      ===================================================== */}

      <section className="bg-stone-900 px-5 pb-10 pt-28 sm:pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Breadcrumb */}

          <div className="mb-7 flex flex-wrap items-center gap-2 text-sm text-stone-400">
            <Link
              to="/"
              className="transition-colors hover:text-amber-300"
            >
              Home
            </Link>

            <ChevronRightIcon />

            <Link
              to="/venues"
              className="transition-colors hover:text-amber-300"
            >
              Venues
            </Link>

            <ChevronRightIcon />

            <span className="text-stone-200">
              {venue.name}
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.7fr_0.8fr]">

            {/* Main image */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
              }}
              className="relative overflow-hidden rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setShowGallery(true)}
                className="group block w-full text-left"
              >
                <img
                  src={galleryImages[activeImage]}
                  alt={venue.name}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                {/* Main image labels */}

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-800 backdrop-blur">
                    {venue.typeName}
                  </span>

                  {venue.featured && (
                    <span className="rounded-full bg-amber-400 px-3 py-1.5 text-xs font-semibold text-stone-950">
                      Featured
                    </span>
                  )}
                </div>

                {/* Image counter */}

                <div className="absolute bottom-5 right-5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  {activeImage + 1} /{" "}
                  {galleryImages.length}
                </div>

                {/* Venue name */}

                <div className="absolute bottom-5 left-5 right-20">
                  <h1 className="text-3xl font-semibold sm:text-4xl">
                    {venue.name}
                  </h1>

                  <div className="mt-2 flex items-center gap-2 text-sm text-stone-300">
                    <MapPin className="h-4 w-4 text-amber-300" />
                    {getVenueLocation(venue)}
                  </div>
                </div>
              </button>

              {/* Navigation */}

              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      previousImage();
                    }}
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Side thumbnails */}

            <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
              {galleryImages
                .slice(0, 3)
                .map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setActiveImage(index)
                    }
                    className={`group relative overflow-hidden rounded-2xl border-2 ${
                      activeImage === index
                        ? "border-amber-400"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${venue.name} ${index + 1}`}
                      className="h-full min-h-[110px] w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:min-h-0"
                    />

                    {index === 2 &&
                      galleryImages.length > 3 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-900">
                            +{galleryImages.length - 3}{" "}
                            more
                          </span>
                        </div>
                      )}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK INFO
      ===================================================== */}

      <section className="border-b border-stone-200 bg-white px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">

          <QuickInfo
            icon={<Users className="h-5 w-5" />}
            label="Capacity"
            value={formatCapacity(venue.capacity)}
          />

          <QuickInfo
            icon={<Star className="h-5 w-5" />}
            label="Rating"
            value={
              venue.rating
                ? `${venue.rating}${
                    venue.reviews
                      ? ` (${venue.reviews})`
                      : ""
                  }`
                : "Not rated"
            }
          />

          <QuickInfo
            icon={<MapPin className="h-5 w-5" />}
            label="Location"
            value={getVenueLocation(venue)}
          />

          <QuickInfo
            icon={<Building2 className="h-5 w-5" />}
            label="Venue type"
            value={venue.typeName || "Event venue"}
          />
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="space-y-8">

            {/* About */}

            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                eyebrow="About the venue"
                title="A space designed for your celebration"
                icon={<Building2 className="h-5 w-5" />}
              />

              <p className="mt-6 text-sm leading-7 text-stone-600 sm:text-base">
                {venue.description ||
                  "A versatile event venue designed to accommodate memorable celebrations and gatherings."}
              </p>

              {venue.highlights &&
                Array.isArray(venue.highlights) &&
                venue.highlights.length > 0 && (
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {venue.highlights.map(
                      (highlight, index) => (
                        <div
                          key={`${highlight}-${index}`}
                          className="flex items-start gap-3 rounded-2xl bg-stone-50 p-4"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                            <Check className="h-3.5 w-3.5" />
                          </span>

                          <span className="text-sm leading-6 text-stone-700">
                            {highlight}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
            </motion.section>

            {/* Amenities */}

            {Array.isArray(venue.amenities) &&
              venue.amenities.length > 0 && (
                <motion.section
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <SectionHeading
                    eyebrow="Venue facilities"
                    title="Amenities"
                    icon={
                      <CheckCircle2 className="h-5 w-5" />
                    }
                  />

                  <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {venue.amenities.map(
                      (amenity, index) => (
                        <motion.div
                          key={`${amenity}-${index}`}
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            delay: index * 0.03,
                          }}
                          className="flex items-center gap-3 rounded-xl border border-stone-100 bg-stone-50 p-3.5"
                        >
                          <Check className="h-4 w-4 shrink-0 text-amber-600" />

                          <span className="text-sm text-stone-600">
                            {amenity}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.section>
              )}

            {/* Suitable For */}

            {Array.isArray(venue.suitableFor) &&
              venue.suitableFor.length > 0 && (
                <motion.section
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <SectionHeading
                    eyebrow="Perfect for"
                    title="Suitable events"
                    icon={
                      <CalendarDays className="h-5 w-5" />
                    }
                  />

                  <div className="mt-6 flex flex-wrap gap-2">
                    {venue.suitableFor.map(
                      (item, index) => (
                        <span
                          key={`${item}-${index}`}
                          className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </motion.section>
              )}

            {/* Location */}

            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                eyebrow="Find the venue"
                title="Location"
                icon={<MapPin className="h-5 w-5" />}
              />

              <div className="mt-6 rounded-2xl bg-stone-50 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-stone-900">
                      {venue.name}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-stone-500">
                      {getFullVenueLocation(venue)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm"
            >

              {/* Header */}

              <div className="bg-stone-900 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
                  Plan your event
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  {venue.name}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-sm text-stone-400">
                  <MapPin className="h-4 w-4 text-amber-300" />
                  {getVenueLocation(venue)}
                </div>
              </div>

              <div className="space-y-5 p-6">

                {/* Price */}

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-400">
                    Starting from
                  </p>

                  <p className="mt-1 text-3xl font-semibold text-stone-900">
                    {getVenuePrice(venue)}
                  </p>
                </div>

                <div className="space-y-3 border-y border-stone-100 py-5">

                  {/* Capacity */}

                  <SidebarInfo
                    icon={<Users className="h-4 w-4" />}
                    label="Guest capacity"
                    value={formatCapacity(
                      venue.capacity
                    )}
                  />

                  {/* Availability */}

                  <SidebarInfo
                    icon={
                      <CheckCircle2 className="h-4 w-4" />
                    }
                    label="Availability"
                    value={
                      venue.availability === false
                        ? "Currently unavailable"
                        : "Available"
                    }
                    valueClass={
                      venue.availability === false
                        ? "text-red-600"
                        : "text-emerald-600"
                    }
                  />

                  {/* Rating */}

                  {venue.rating && (
                    <SidebarInfo
                      icon={
                        <Star className="h-4 w-4" />
                      }
                      label="Guest rating"
                      value={`${venue.rating}/5`}
                    />
                  )}
                </div>

                {/* Availability message */}

                <div
                  className={`rounded-2xl p-4 ${
                    venue.availability === false
                      ? "bg-red-50"
                      : "bg-emerald-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {venue.availability === false ? (
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    )}

                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          venue.availability === false
                            ? "text-red-700"
                            : "text-emerald-700"
                        }`}
                      >
                        {venue.availability === false
                          ? "Availability needs confirmation"
                          : "Venue currently available"}
                      </p>

                      <p
                        className={`mt-1 text-xs leading-5 ${
                          venue.availability === false
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        Final availability depends on your
                        selected event date.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}

                <Button
                  to={`/create-event?venue=${venue.id}`}
                  className="w-full"
                  icon={
                    <ArrowRight className="h-4 w-4" />
                  }
                >
                  Plan With This Venue
                </Button>

                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-50"
                >
                  <Phone className="h-4 w-4" />
                  Enquire About Venue
                </button>

                <p className="text-center text-xs leading-5 text-stone-400">
                  Venue pricing and availability can vary
                  depending on your event requirements and date.
                </p>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          RELATED VENUES
      ===================================================== */}

      {relatedVenues.length > 0 && (
        <section className="border-t border-stone-200 bg-white px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
                  More options
                </p>

                <h2 className="mt-2 text-3xl font-semibold text-stone-900">
                  You may also like
                </h2>
              </div>

              <Link
                to="/venues"
                className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition-colors hover:text-amber-600"
              >
                View all venues
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedVenues.map(
                (relatedVenue, index) => (
                  <motion.article
                    key={relatedVenue.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="group overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                  >
                    <Link
                      to={`/venues/${relatedVenue.id}`}
                    >
                      <div className="overflow-hidden">
                        <img
                          src={
                            relatedVenue.image ||
                            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
                          }
                          alt={relatedVenue.name}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-600">
                            {relatedVenue.typeName}
                          </p>

                          {relatedVenue.rating && (
                            <span className="flex items-center gap-1 text-xs font-medium text-stone-500">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              {relatedVenue.rating}
                            </span>
                          )}
                        </div>

                        <h3 className="mt-2 text-lg font-semibold text-stone-900 group-hover:text-amber-600">
                          {relatedVenue.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-500">
                          <MapPin className="h-3.5 w-3.5" />
                          {getVenueLocation(
                            relatedVenue
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
                          <span className="text-sm font-semibold text-stone-800">
                            {getVenuePrice(
                              relatedVenue
                            )}
                          </span>

                          <span className="flex items-center gap-1 text-sm font-semibold text-stone-600">
                            View
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-stone-50 px-5 py-16 sm:px-8 lg:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-stone-900 px-7 py-10 text-white sm:px-10 lg:px-14"
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">
                <Building2 className="h-3.5 w-3.5" />
                Your event starts here
              </div>

              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
                Ready to plan your celebration?
              </h2>

              <p className="mt-4 text-sm leading-7 text-stone-400 sm:text-base">
                Select your event date, guest count, venue and
                services and start building your event plan.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                to={`/create-event?venue=${venue.id}`}
                icon={
                  <ArrowRight className="h-4 w-4" />
                }
              >
                Start Planning
              </Button>

              <Button
                to="/venues"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white hover:text-stone-900"
              >
                Browse Venues
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          FULLSCREEN GALLERY
      ===================================================== */}

      {showGallery && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/95 p-5">
          <button
            type="button"
            onClick={() => setShowGallery(false)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={previousImage}
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-stone-900 sm:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <motion.div
            key={activeImage}
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="max-h-[85vh] max-w-6xl overflow-hidden rounded-2xl"
          >
            <img
              src={galleryImages[activeImage]}
              alt={venue.name}
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
          </motion.div>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-stone-900 sm:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs text-white backdrop-blur">
            {activeImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </main>
  );
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

const QuickInfo = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3 rounded-2xl bg-stone-50 p-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-xs text-stone-400">
        {label}
      </p>

      <p className="mt-1 line-clamp-2 text-sm font-semibold text-stone-800">
        {value}
      </p>
    </div>
  </div>
);

const SidebarInfo = ({
  icon,
  label,
  value,
  valueClass = "text-stone-800",
}) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-2 text-sm text-stone-500">
      <span className="text-amber-600">
        {icon}
      </span>

      {label}
    </div>

    <span
      className={`text-right text-sm font-semibold ${valueClass}`}
    >
      {value}
    </span>
  </div>
);

const SectionHeading = ({
  eyebrow,
  title,
  icon,
}) => (
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
      {icon}
    </div>

    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-2xl font-semibold text-stone-900">
        {title}
      </h2>
    </div>
  </div>
);

const ChevronRightIcon = () => (
  <ChevronRight className="h-4 w-4" />
);

/* =========================================================
   DATA HELPERS
========================================================= */

const getGalleryImages = (venue) => {
  const images = [];

  if (venue.image) {
    images.push(venue.image);
  }

  if (Array.isArray(venue.gallery)) {
    venue.gallery.forEach((image) => {
      if (
        image &&
        !images.includes(image)
      ) {
        images.push(image);
      }
    });
  }

  if (images.length === 0) {
    images.push(
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
    );
  }

  return images;
};

const getVenueLocation = (venue) => {
  if (!venue?.location) {
    return "Location available on request";
  }

  if (typeof venue.location === "string") {
    return venue.location;
  }

  const parts = [
    venue.location.area,
    venue.location.city,
  ].filter(Boolean);

  return (
    parts.join(", ") ||
    venue.location.address ||
    "Location available on request"
  );
};

const getFullVenueLocation = (venue) => {
  if (!venue?.location) {
    return "Location available on request";
  }

  if (typeof venue.location === "string") {
    return venue.location;
  }

  const parts = [
    venue.location.address,
    venue.location.area,
    venue.location.city,
    venue.location.state,
    venue.location.pincode,
  ].filter(Boolean);

  return (
    parts.join(", ") ||
    "Location available on request"
  );
};

const formatCapacity = (capacity) => {
  if (!capacity) {
    return "Flexible";
  }

  const numericCapacity = Number(capacity);

  if (Number.isNaN(numericCapacity)) {
    return capacity;
  }

  return `${numericCapacity.toLocaleString(
    "en-IN"
  )} guests`;
};

const getVenuePrice = (venue) => {
  if (!venue?.pricing) {
    return "Custom quote";
  }

  if (typeof venue.pricing === "number") {
    return formatCurrency(
      venue.pricing
    );
  }

  if (typeof venue.pricing === "string") {
    return venue.pricing;
  }

  if (venue.pricing.startingFrom) {
    return formatCurrency(
      venue.pricing.startingFrom
    );
  }

  if (venue.pricing.price) {
    return formatCurrency(
      venue.pricing.price
    );
  }

  if (venue.pricing.amount) {
    return formatCurrency(
      venue.pricing.amount
    );
  }

  if (venue.pricing.label) {
    return venue.pricing.label;
  }

  return "Custom quote";
};

export default VenueDetails;