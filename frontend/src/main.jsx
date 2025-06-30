import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import "./index.css";
import ToasterCustom from "@common/ui/ToasterCustom";

import PaginaLogin from "@pages/PaginaLogin";
import PaginaAnalisis from "@pages/PaginaAnalisis";
import PaginaServicios from "@pages/PaginaServicios";
import PaginaOrdenes from "@pages/PaginaOrdenes";
import PaginaVeterinarios from "@pages/PaginaVeterinarios";
import PaginaUsuarios from "@pages/PaginaUsuarios";
import PaginaCuenta from "@pages/PaginaCuenta";
import RutaPrivada from "@routes/RutaPrivada";
import PaginaNoEncontrada from "@pages/PaginaNoEncontrada";
import PaginaCalendario from "@pages/PaginaCalendario";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirección a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<PaginaLogin />} />

        {/* Rutas protegidas dentro del dashboard */}
        <Route
          path="/dashboard"
          element={
            <RutaPrivada>
              <App />
            </RutaPrivada>
          }
        >
          <Route index element={<PaginaAnalisis />} />
          <Route path="servicios" element={<PaginaServicios />} />
          <Route path="ordenes" element={<PaginaOrdenes />} />
          <Route path="veterinarios" element={<PaginaVeterinarios />} />
          <Route path="usuarios" element={<PaginaUsuarios />} />
          <Route path="cuenta" element={<PaginaCuenta />} />
          <Route path="calendario" element={<PaginaCalendario />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
        {/* Página 404 global */}
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>
      <ToasterCustom />
    </BrowserRouter>
  </StrictMode>
);
