import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogoIcon } from "./Logo";

/**
 * Eventara Premium Gradient Loader
 *
 * Features:
 * - Minimum 2-second loading display
 * - Violet / Fuchsia / Cyan gradient theme
 * - Rotating orbital rings
 * - Animated glowing logo
 * - Floating neon particles
 * - Expanding pulse rings
 * - Animated status text
 * - Gradient loading progress beam
 * - Full-screen backdrop animation
 */

const Loader = ({
  fullScreen = false,
  text = "Orchestrating Event Operations...",
  subtext = "Tamil Nadu Ceremony Operating System",
  size = "md",
  duration = 4000,
}) => {
  /*
   * Controls how long the loader remains visible.
   *
   * Default:
   * 2000ms = 2 seconds
   */
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, duration);

    return () => clearTimeout(timer);
  }, 3000);

  const sizes = {
    sm: {
      outer: "w-20 h-20",
      middle: "w-14 h-14",
      inner: "w-10 h-10",
      logo: "xs",
    },

    md: {
      outer: "w-28 h-28",
      middle: "w-20 h-20",
      inner: "w-14 h-14",
      logo: "sm",
    },

    lg: {
      outer: "w-36 h-36",
      middle: "w-28 h-28",
      inner: "w-20 h-20",
      logo: "md",
    },
  };

  const currentSize = sizes[size] || sizes.md;

  /*
   * Don't render anything after the loading duration.
   */
  if (!showLoader) {
    return null;
  }

  const content = (
    <div className="flex flex-col items-center justify-center px-6 py-8 text-center select-none">
      {/* =====================================================
          ANIMATION CORE
      ====================================================== */}
      <div
        className={`relative ${currentSize.outer} flex items-center justify-center`}
      >
        {/* Ambient Gradient Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-400/20 blur-2xl"
          animate={{
            scale: [0.8, 1.15, 0.8],
            opacity: [0.35, 0.8, 0.35],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            OUTER GRADIENT ORBIT
        ================================================== */}
        <motion.div
          className={`absolute inset-0 ${currentSize.outer} rounded-full p-[2px]`}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "conic-gradient(from 0deg, #7c3aed, #ec4899, #06b6d4, #6366f1, #7c3aed)",
          }}
        >
          <div className="h-full w-full rounded-full bg-white/95" />
        </motion.div>

        {/* =================================================
            DASHED COUNTER ORBIT
        ================================================== */}
        <motion.div
          className={`absolute ${currentSize.middle} rounded-full border-2 border-dashed border-fuchsia-400/60`}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* =================================================
            INNER GRADIENT RING
        ================================================== */}
        <motion.div
          className={`absolute ${currentSize.inner} rounded-full p-[2px]`}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            background:
              "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)",
          }}
        >
          <div className="h-full w-full rounded-full bg-white" />
        </motion.div>

        {/* =================================================
            CENTER LOGO CORE
        ================================================== */}
        <motion.div
          className="relative z-20 flex items-center justify-center"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Logo Glow */}
          <motion.div
            className="absolute h-16 w-16 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 blur-xl"
            animate={{
              opacity: [0.4, 0.9, 0.4],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo Container */}
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 shadow-xl shadow-fuchsia-500/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/95">
              <LogoIcon size={currentSize.logo} />
            </div>
          </div>
        </motion.div>

        {/* =================================================
            ORBITING PARTICLE 1
        ================================================== */}
        <motion.div
          className="absolute left-1/2 top-0 z-30"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: "4px",
            height: "4px",
            transformOrigin: "0 56px",
          }}
        >
          <span className="block h-2 w-2 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-500" />
        </motion.div>

        {/* =================================================
            ORBITING PARTICLE 2
        ================================================== */}
        <motion.div
          className="absolute right-1 top-1/2 z-30"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: "4px",
            height: "4px",
            transformOrigin: "-48px 0",
          }}
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" />
        </motion.div>

        {/* =================================================
            FLOATING VIOLET PARTICLE
        ================================================== */}
        <motion.span
          className="absolute bottom-2 left-5 z-30 h-1.5 w-1.5 rounded-full bg-violet-500 shadow-lg shadow-violet-500"
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            PULSE RING 1
        ================================================== */}
        <motion.div
          className="absolute inset-4 rounded-full border border-violet-400/30"
          animate={{
            scale: [0.8, 1.3],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* =================================================
            PULSE RING 2
        ================================================== */}
        <motion.div
          className="absolute inset-2 rounded-full border border-cyan-400/20"
          animate={{
            scale: [0.8, 1.5],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* =====================================================
          STATUS TEXT
      ====================================================== */}
      {text && (
        <div className="mt-7 space-y-2">
          {/* Main Loading Text */}
          <motion.p
            className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-600 bg-clip-text text-sm font-bold tracking-tight text-transparent"
            animate={{
              opacity: [0.65, 1, 0.65],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.p>

          {/* Subtext */}
          {subtext && (
            <motion.p
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500"
              animate={{
                letterSpacing: ["0.2em", "0.28em", "0.2em"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {subtext}
            </motion.p>
          )}
        </div>
      )}

      {/* =====================================================
          ANIMATED DOT INDICATOR
      ====================================================== */}
      <div className="mt-5 flex items-center gap-2">
        {[0, 1, 2, 3, 4].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
            animate={{
              scale: [0.7, 1.5, 0.7],
              opacity: [0.25, 1, 0.25],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: dot * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* =====================================================
          GRADIENT LOADING BAR
      ====================================================== */}
      <div className="relative mt-4 h-1 w-36 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );

  /* =========================================================
      FULL SCREEN LOADER
  ========================================================== */

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white/90 backdrop-blur-xl"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        {/* =================================================
            BACKGROUND GRADIENT BLOB 1
        ================================================== */}
        <motion.div
          className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            BACKGROUND GRADIENT BLOB 2
        ================================================== */}
        <motion.div
          className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            BACKGROUND GRADIENT BLOB 3
        ================================================== */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/5 blur-3xl"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Loader Content */}
        <div className="relative z-10">{content}</div>
      </motion.div>
    );
  }

  return content;
};

export default Loader;