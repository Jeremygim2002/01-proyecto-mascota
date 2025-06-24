import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Title from "@common/layout/Titulo";
import { obtenerIngresosPorCategoria } from "@services/ordenService";

const COLORS = [
  "#14B8A6", 
  "#06B6D4", 
  "#4F46E5", 
  "#8B5CF6", 
  "#F43F5E", 
  "#F59E0B", 
  "#10B981", 
  "#EC4899",
];

const GraficoIngresoCategoria = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await obtenerIngresosPorCategoria();
        const formateado = response.map(({ categoria, ingresos }) => ({
          name: categoria,
          value: Number(ingresos),
        }));
        setDatos(formateado);
      } catch (error) {
        console.error("Error al cargar ingresos por categoría:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    >
      <Title
        className="text-center tracking-wide mb-4"
        text="INGRESOS POR CATEGORÍA DE SERVICIOS"
      />
      <div className="w-full h-[320px] sm:h-[360px] md:h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={datos}
              cx="45%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => (
                <text
                  style={{
                    fill: "#E2E8F0",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {`${name}: ${(percent * 100).toFixed(1)}%`}
                </text>
              )}
            >
              {datos.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#F0FDF4", fontWeight: 600 }}
              labelStyle={{ color: "#A5F3FC" }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              wrapperStyle={{
                color: "#E0F2FE",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GraficoIngresoCategoria;
