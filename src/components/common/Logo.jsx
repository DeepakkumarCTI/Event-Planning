import React from "react";
import { Link } from "react-router-dom";

/**
 * Eventara Architectural Monogram Icon
 * Clean geometric corporate emblem representing a ceremonial pavilion & the letter "E".
 */
export const LogoIcon = ({
  size = "md",
  className = "",
  inverted = false,
}) => {
  const sizeClasses = {
    xs: "w-7 h-7 rounded-lg",
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-12 h-12 rounded-xl",
    xl: "w-14 h-14 rounded-2xl",
  };

  const svgSizes = {
    xs: "w-4 h-4",
    sm: "w-4.5 h-4.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 shadow-xs select-none transition-transform group-hover:scale-102 ${
        sizeClasses[size] || sizeClasses.md
      } ${
        inverted
          ? "bg-white text-teal-800 border border-slate-200"
          : "bg-teal-700 text-white"
      } ${className}`}
      aria-label="Eventara Emblem"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={svgSizes[size] || svgSizes.md}
      >
        {/* Left Architectural Spine Pillar */}
        <rect
          x="9"
          y="9"
          width="4.5"
          height="22"
          rx="2.25"
          fill="currentColor"
        />

        {/* Top Canopy Beam */}
        <path
          d="M13.5 11.25C13.5 10.0074 14.5074 9 15.75 9H27.25C28.4926 9 29.5 10.0074 29.5 11.25C29.5 12.4926 28.4926 13.5 27.25 13.5H13.5V11.25Z"
          fill="currentColor"
        />

        {/* Middle Horizon Tier */}
        <rect
          x="13.5"
          y="17.75"
          width="10.5"
          height="4.5"
          rx="2.25"
          fill="currentColor"
        />

        {/* Bottom Foundation Tier */}
        <path
          d="M13.5 26.5H27.25C28.4926 26.5 29.5 27.5074 29.5 28.75C29.5 29.9926 28.4926 31 27.25 31H15.75C14.5074 31 13.5 29.9926 13.5 28.75V26.5Z"
          fill="currentColor"
        />

        {/* Pinnacle Jewel Accent */}
        <circle
          cx="27.5"
          cy="11.25"
          r="2.25"
          fill={inverted ? "#0F766E" : "#5EEAD4"}
        />
      </svg>
    </div>
  );
};

/**
 * Eventara Full Brand Logo Component
 * Combines the geometric architectural mark with corporate typography.
 */
const Logo = ({
  to = "/",
  variant = "dark", // "dark" = for light bg (dark text), "light" = for dark bg (white text)
  size = "md",
  showSubtitle = true,
  subtitle = "Tamil Nadu Event Platform",
  badge = "India",
  className = "",
}) => {
  const content = (
    <div className={`flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 whitespace-nowrap select-none ${className}`}>
      <LogoIcon size={size} inverted={variant === "light-inverted"} />
      
      <div className="flex flex-col shrink-0">
        <div className="flex items-center gap-1.5 leading-none whitespace-nowrap">
          <span
            className={`font-display font-bold tracking-tight whitespace-nowrap ${
              size === "sm"
                ? "text-lg"
                : size === "lg"
                ? "text-2xl"
                : "text-xl sm:text-2xl"
            } ${variant === "light" ? "text-white" : "text-slate-900"}`}
          >
            Eventara
          </span>
          {badge && (
            <span
              className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border tracking-wider whitespace-nowrap shrink-0 ${
                variant === "light"
                  ? "bg-slate-800 text-teal-300 border-slate-700"
                  : "bg-teal-50 text-teal-800 border-teal-200"
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        {showSubtitle && (
          <span
            className={`text-[10px] uppercase tracking-wider font-semibold mt-1 leading-none whitespace-nowrap hidden sm:block ${
              variant === "light" ? "text-teal-400" : "text-slate-500"
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex focus:outline-none shrink-0">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
