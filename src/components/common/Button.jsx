import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  to,
  href,
  loading = false,
  disabled = false,
  icon = true,
  className = "",
  onClick,
}) => {
  const baseClasses =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/25",

    secondary:
      "border border-stone-300 bg-white text-stone-800 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700",

    dark:
      "bg-stone-900 text-white shadow-lg shadow-stone-900/15 hover:bg-stone-800",

    outline:
      "border border-stone-300 bg-transparent text-stone-700 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700",

    ghost:
      "bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900",

    danger:
      "bg-red-500 text-white shadow-lg shadow-red-500/15 hover:bg-red-600",

    light:
      "bg-stone-100 text-stone-800 hover:bg-stone-200",
  };

  const sizes = {
    sm: "min-h-9 px-4 text-xs",
    md: "min-h-11 px-5 text-sm",
    lg: "min-h-13 px-7 text-base",
    xl: "min-h-14 px-8 text-base",
  };

  const classes = `
    ${baseClasses}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `;

  const content = (
    <>
      {/* Hover shine effect */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <span className="relative flex items-center gap-2">
        {loading ? (
          <>
            <Loader2
              size={17}
              className="animate-spin"
            />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>{children}</span>

            {icon && (
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={17} />
              </motion.span>
            )}
          </>
        )}
      </span>
    </>
  );

  /* =========================================================
     INTERNAL ROUTE
  ========================================================== */
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled || loading}
      >
        {content}
      </Link>
    );
  }

  /* =========================================================
     EXTERNAL LINK
  ========================================================== */
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
        aria-disabled={disabled || loading}
      >
        {content}
      </a>
    );
  }

  /* =========================================================
     NORMAL BUTTON
  ========================================================== */
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;