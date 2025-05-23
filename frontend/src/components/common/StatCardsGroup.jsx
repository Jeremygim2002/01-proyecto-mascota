// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import { Users, Server, Package, PawPrint } from "lucide-react";

const stats = [
  { name: "Total servicios", icon: Server, value: 50, color: "#4F46E5" },
  { name: "Total Usuarios", icon: Users, value: 150, color: "#F43F5E" },
  { name: "Total Mascotas", icon: PawPrint, value: 300, color: "#059669" },
  { name: "Total Ordenes", icon: Package, value: 180, color: "#7C3AED" },
];

const StatCardsGroup = () => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {stats.map((stat) => (
        <StatCard key={stat.name} {...stat} />
      ))}
    </motion.div>
  );
};

export default StatCardsGroup;
