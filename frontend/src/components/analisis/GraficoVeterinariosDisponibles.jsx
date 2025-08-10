import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Title from "@common/layout/Titulo";
import { obtenerVeterinariosPorEspecialidad } from "@services/veterinarioService";

const COLORS = [
  "#38BDF8", 
  "#818CF8", 
  "#A78BFA", 
  "#67E8F9", 
  "#6EE7B7", 
  "#FCD34D", 
  "#93C5FD", 
];  

const GraficoVeterinariosDisponibles = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const raw = await obtenerVeterinariosPorEspecialidad();
        const formateado = raw.map((v) => ({
          canal: v.especialidad,
          valor: v.total,
        }));
        setDatos(formateado);
      } catch (error) {
        console.error("Error al obtener datos de veterinarios:", error);
      }
    };
    fetchDatos();
  }, []);

  return (
    <motion.div
      className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
    >
      <Title className="text-center tracking-wide mb-4" text="VETERINARIOS DISPONIBLES POR ESPECIALIDAD" />
      
      
        <div className="w-full h-[360px] -translate-x-16 transform">
        <ResponsiveContainer width="110%">
          <BarChart
            data={datos}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 60, bottom: 10 }}
            barCategoryGap={18}
          >
            <XAxis type="number" stroke="#94A3B8" tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="canal"
              stroke="#94A3B8"
              tick={{ fontSize: 13 }}
              width={140}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#F1F5F9", fontWeight: "500" }}
              labelStyle={{ color: "#E2E8F0", fontWeight: "bold" }}
            />
            <Bar
              dataKey="valor"
              radius={[0, 12, 12, 0]}
              barSize={20}
              isAnimationActive={true}
            >
              {datos.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GraficoVeterinariosDisponibles;
