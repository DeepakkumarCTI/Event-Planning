import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) => {
  const alignment = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
      className={`mx-auto flex max-w-3xl flex-col ${
        alignment[align] || alignment.center
      } ${className}`}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.1,
          }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-amber-700"
        >
          <Sparkles size={13} />
          {eyebrow}
        </motion.div>
      )}

      {/* Title */}
      {title && (
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      )}

      {/* Description */}
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-500 sm:text-base">
          {description}
        </p>
      )}

      {/* Decorative line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 48, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.25,
        }}
        className="mt-5 h-1 rounded-full bg-amber-500"
      />
    </motion.div>
  );
};

export default SectionTitle;