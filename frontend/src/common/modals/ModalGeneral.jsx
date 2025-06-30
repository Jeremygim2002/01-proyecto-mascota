// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const ModalGeneral = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
        >
          <div className="relative mt-10 w-full max-w-xl p-6 rounded-xl border border-superficie-borde bg-superficie text-white shadow-xl">
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-red-400"
            >
              ✕
            </button>

            {title && (
              <h2 className="mb-8 text-lg font-semibold font-tituloSecundario">
                {title}
              </h2>
            )}

            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalGeneral;
