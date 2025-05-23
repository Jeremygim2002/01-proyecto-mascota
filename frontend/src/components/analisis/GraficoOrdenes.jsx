// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Title from "../common/Titulo"

const stackedData = [
  { semana: "Enero", baño: 1200, corte: 800, vacuna1: 600 },
  { semana: "Febrero", baño: 1400, corte: 1000, vacuna1: 700 },
  { semana: "Marzo", baño: 1600, corte: 1100, vacuna1: 900 },
  { semana: "Abril", baño: 1500, corte: 1200, vacuna1: 1100 },
  { semana: "Mayo", baño: 1700, corte: 1300, vacuna1: 1000 },
  { semana: "Junio", baño: 1800, corte: 1400, vacuna1: 1200 },
];

const GraficoOrdenes = () => {
  return (
    <motion.div
      className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
    >
      <Title className="text-center tracking-wide mb-4" text="ORDENES POR MES" />
      <div className="w-full h-[360px]">
        <ResponsiveContainer>
          <AreaChart data={stackedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOrganico" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#0EA5E9" stopOpacity={0.8} />
                <stop offset="90%" stopColor="#0EA5E9" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorPagado" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#F43F5E" stopOpacity={0.8} />
                <stop offset="90%" stopColor="#F43F5E" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorRedes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="90%" stopColor="#8B5CF6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
            <XAxis dataKey="semana" stroke="#CBD5E1" />
            <YAxis stroke="#CBD5E1" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                borderColor: "#475569",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#F8FAFC", fontWeight: "bold" }}
              labelStyle={{ color: "#E2E8F0", fontWeight: "600" }}
            />
            <Legend wrapperStyle={{ color: "#E2E8F0" }} />
            <Area type="monotone" dataKey="baño" stackId="1" stroke="#0EA5E9" fill="url(#colorOrganico)" />
            <Area type="monotone" dataKey="corte" stackId="1" stroke="#F43F5E" fill="url(#colorPagado)" />
            <Area type="monotone" dataKey="vacuna1" stackId="1" stroke="#8B5CF6" fill="url(#colorRedes)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GraficoOrdenes;
