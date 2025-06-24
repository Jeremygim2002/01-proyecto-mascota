import { useState, useEffect } from "react";
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
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Title from "@common/layout/Titulo";
import useOrdenesPorTipoMascota from "@hooks/useOrdenesPorTipoMascota";

const GraficoOrdenesTipoMascota = () => {
  const raw = useOrdenesPorTipoMascota();

  // Pivot: { mes, Perro: x, Gato: y, ... }
  const [formatted, setFormatted] = useState([]);

  useEffect(() => {
    if (!raw.length) return;
    const meses = [...new Set(raw.map((r) => r.mes))].sort();
    const tipos = [...new Set(raw.map((r) => r.tipo_mascota))];
    const pivot = meses.map((mes) => {
      const obj = { mes };
      tipos.forEach((t) => {
        const row = raw.find((r) => r.mes === mes && r.tipo_mascota === t);
        obj[t] = row ? row.total_ordenes : 0;
      });
      return obj;
    });
    setFormatted(pivot);
  }, [raw]);

  const colors = ["#0EA5E9", "#F43F5E", "#8B5CF6", "#10B981", "#F59E0B"];

  return (
   <motion.div
      className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    >
      <Title
        className="text-center tracking-wide mb-4"
        text="ÓRDENES POR TIPO DE MASCOTA"
      />
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <AreaChart
            data={formatted}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {Object.keys(formatted[0] || {})
                .filter((k) => k !== "mes")
                .map((tipo, i) => (
                  <linearGradient
                    key={tipo}
                    id={`color-${tipo}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={colors[i % colors.length]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors[i % colors.length]}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
            </defs>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="mes" stroke="#CBD5E1" />
            <YAxis stroke="#CBD5E1" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                borderRadius: "10px",
              }}
              itemStyle={{ color: "#F8FAFC" }}
            />
            <Legend wrapperStyle={{ color: "#E2E8F0" }} />
            {Object.keys(formatted[0] || {})
              .filter((k) => k !== "mes")
              .map((tipo, i) => (
                <Area
                  key={tipo}
                  type="monotone"
                  dataKey={tipo}
                  stackId="1"
                  stroke={colors[i]}
                  fill={`url(#color-${tipo})`}
                />
              ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GraficoOrdenesTipoMascota;
