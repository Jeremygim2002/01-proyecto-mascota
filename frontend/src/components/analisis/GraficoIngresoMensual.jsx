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
import { useEffect, useState } from "react";
import Title from "@common/layout/Titulo";
import { obtenerIngresosPorMes } from "@services/ordenService";

const GraficoIngresoMensual = () => {
  const [datosIngresos, setDatosIngresos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await obtenerIngresosPorMes();
        const ordenados = datos.sort(
          (a, b) => new Date(`01 ${a.mes}`) - new Date(`01 ${b.mes}`)
        );
        setDatosIngresos(
          ordenados.map((d) => ({
            name: new Date(d.mes + "-01").toLocaleDateString("es-PE", {
              month: "long",
            }),
            cantidad: d.ingresos,
          }))
        );
      } catch (error) {
        console.error("Error al obtener ingresos mensuales:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    >
      <Title
        className="text-center tracking-wide mb-4"
        text="INGRESOS MENSUALES BRUTOS"
      />
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] flex justify-center">
        <ResponsiveContainer width="95%">
          <LineChart data={datosIngresos}>
            <CartesianGrid strokeDasharray="4 4" stroke="#64748b" />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #64748b",
                borderRadius: "10px",
              }}
              itemStyle={{ color: "#34D399", fontWeight: 600 }}
              labelStyle={{ color: "#e2e8f0", fontWeight: 500 }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                color: "#e2e8f0",
                fontSize: "0.75rem",
                paddingTop: 2,
                paddingBottom: 0,
                margin: 0,
                lineHeight: 1,
              }}
            />

            <Line
              type="monotone"
              dataKey="cantidad"
              stroke="#10B981"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#34D399",
                stroke: "#0F172A",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: "#34D399",
                stroke: "#F59E0B",
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

export default GraficoIngresoMensual;
