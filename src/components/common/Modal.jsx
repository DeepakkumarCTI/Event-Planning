import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlay = true,
}) => {
  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Close modal with Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  const modalSize = sizes[size] || sizes.md;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {/* =================================================
              BACKDROP
          ================================================== */}
          <motion.div
            className="absolute inset-0 bg-stone-950/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (closeOnOverlay) {
                onClose?.();
              }
            }}
          />

          {/* =================================================
              MODAL
          ================================================== */}
          <motion.div
            className={`relative z-10 w-full ${modalSize} overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl shadow-stone-950/20`}
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            {/* =================================================
                HEADER
            ================================================== */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-5 py-4 sm:px-6">
                <div className="min-w-0">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-lg font-bold text-stone-900"
                    >
                      {title}
                    </h2>
                  )}

                  {description && (
                    <p className="mt-1 text-sm leading-5 text-stone-500">
                      {description}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="shrink-0 rounded-xl p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-800"
                  >
                    <X size={19} />
                  </button>
                )}
              </div>
            )}

            {/* =================================================
                CONTENT
            ================================================== */}
            <div className="max-h-[75vh] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;