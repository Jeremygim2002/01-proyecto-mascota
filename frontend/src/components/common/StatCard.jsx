// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const StatCard = ({
  name,
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  value,
  color = "white",
  duration = 1000,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    setDisplayValue(0);
    let start = 0;
    const end = parseFloat(value);
    const increment = end / (duration / 5);

    const step = () => {
      start += increment;
      setDisplayValue(Math.min(start, end));
      if (start < end) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <motion.div
      className="bg-superficie backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-superficie-borde"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-texto-secundario font-tituloSecundario">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <motion.p
          className="mt-1 text-3xl font-semibold text-texto font-cuerpo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {Math.round(displayValue)}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default StatCard;
