import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Title from "../common/Titulo"

const userRetentionData = [
  { name: "Enero", cantidad: 100 },
  { name: "Febrero", cantidad: 78 },
  { name: "Marzo", cantidad: 64 },
  { name: "Abril", cantidad: 53 },
  { name: "Mayo", cantidad: 45 },
  { name: "Junio", cantidad: 43 },
  { name: "Julio", cantidad: 46 },
  { name: "Agosto", cantidad: 51 },
];

const GraficoUsuarios = () => {
  return (
    <motion.div
      className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    >
      <Title className="text-center tracking-wide mb-4" text="USUARIOS POR MES "/>
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <ResponsiveContainer>
          <LineChart data={userRetentionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#CBD5E1" tick={{ fill: "#CBD5E1" }} />
            <YAxis
              stroke="#CBD5E1"
              tick={{ fill: "#CBD5E1" }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "10px",
              }}
              itemStyle={{ color: "#22D3EE", fontWeight: 600 }}
              labelStyle={{ color: "#E2E8F0", fontWeight: 500 }}
            />
            <Legend
              verticalAlign="top"
              height={40}
              iconType="circle"
              wrapperStyle={{ color: "#E2E8F0" }}
            />
            <Line
              type="monotone"
              dataKey="cantidad"
              stroke="#22D3EE"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#22D3EE",
                stroke: "#0F172A",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: "#22D3EE",
                stroke: "#FACC15",
                strokeWidth: 3,
              }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GraficoUsuarios;
