// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { Users, Server, Package, PawPrint } from "lucide-react";

import { obtenerTotalMascotasActivas } from "@services/mascotaService";
import { obtenerTotalUsuariosActivos } from "@services/usuarioService";
import { obtenerTotalServiciosActivos } from "@services/servicioService";
import { obtenerTotalOrdenesActivas } from "@services/ordenService";

const StatCardsGroup = () => {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalMascotas, setTotalMascotas] = useState(0);
  const [totalServicios, setTotalServicios] = useState(0);
  const [totalOrdenes, setTotalOrdenes] = useState(0);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const total = await obtenerTotalOrdenesActivas();
        setTotalOrdenes(total);
      } catch (error) {
        console.error("Error al obtener total de órdenes:", error);
      }
    };
    fetchOrdenes();
  }, []);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const total = await obtenerTotalServiciosActivos();
        setTotalServicios(total);
      } catch (error) {
        console.error("Error al obtener total de servicios:", error);
      }
    };
    fetchServicios();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const total = await obtenerTotalUsuariosActivos();
        setTotalUsuarios(total);
      } catch (error) {
        console.error("Error al obtener total de usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);
  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const total = await obtenerTotalMascotasActivas();
        setTotalMascotas(total);
      } catch (error) {
        console.error("Error al obtener total de mascotas:", error);
      }
    };

    fetchMascotas();
  }, []);

  const stats = [
    {
      name: "Total servicios",
      icon: Server,
      value: totalServicios,
      color: "#4F46E5",
    },

    {
      name: "Total Usuarios",
      icon: Users,
      value: totalUsuarios,
      color: "#F43F5E",
    },
    {
      name: "Total Mascotas",
      icon: PawPrint,
      value: totalMascotas,
      color: "#059669",
    },
    {
      name: "Total Ordenes",
      icon: Package,
      value: totalOrdenes,
      color: "#7C3AED",
    },
  ];

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
