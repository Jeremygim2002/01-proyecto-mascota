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
          <div className="mt-10 bg-superficie opacity-100 text-white border border-superficie-borde shadow-xl rounded-xl p-6 w-full max-w-xl relative">
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="text-2xl font-bold absolute top-4 right-4 text-gray-400 hover:text-red-400"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-8 font-tituloSecundario">{title}</h2>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalGeneral;
