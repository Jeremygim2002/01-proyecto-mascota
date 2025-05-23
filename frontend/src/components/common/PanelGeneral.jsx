// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const PanelGeneral = ({ className = "", children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`font-cuerpo absolute right-2 top-16 bg-modal border border-modal-borde rounded-xl shadow-xl p-4 z-50 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PanelGeneral;
