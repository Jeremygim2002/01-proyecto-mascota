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
import Title from "../common/Titulo"

const channelData = [
  { name: "Consulta general y preventiva", value: 4200 },
  { name: "Vacunación y desparasitación", value: 3000 },
  { name: "Peluquería y estética", value: 2500 },
  { name: "Fisioterapia y rehabilitación", value: 2000 },
  { name: "Cirugías generales y especializadas", value: 1500 },
  { name: "Hospitalización y cuidados intensivos", value: 1200 },
];

const COLORS = [
  "#2563EB", 
  "#3B82F6",  
  "#60A5FA",  
  "#818CF8",  
  "#A78BFA",  
  "#C084FC",  
  "#E879F9",  
];

const GraficoServicios = () => {
  return (
    <motion.div
      className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    >
      <Title className="text-center tracking-wide mb-4" text="SERVICIOS DISPONIBLES POR TIPO" />
      <div className="w-full h-[320px] sm:h-[360px] md:h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={channelData}
              cx="45%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => (
                <text
                  style={{
                    fill: "#CBD5E1",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {`${name}: ${(percent * 100).toFixed(1)}%`}
                </text>
              )}
            >
              {channelData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#475569",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#F8FAFC", fontWeight: "bold" }}
              labelStyle={{ color: "#E2E8F0" }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              wrapperStyle={{
                color: "#E2E8F0",
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

export default GraficoServicios;
