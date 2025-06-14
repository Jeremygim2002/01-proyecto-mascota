import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToasterCustom from "@common/ui/ToasterCustom";

import "./index.css";
import App from "./App";

import PaginaLogin from "@pages/PaginaLogin";
import PaginaAnalisis from "@pages/PaginaAnalisis";
import PaginaServicios from "@pages/PaginaServicios";
import PaginaOrdenes from "@pages/PaginaOrdenes";
import PaginaVeterinarios from "@pages/PaginaVeterinarios";
import PaginaUsuarios from "@pages/PaginaUsuarios";
import PaginaCuenta from "@pages/PaginaCuenta";
import RutaPrivada from "@routes/RutaPrivada";
import PaginaNoEncontrada from "@pages/PaginaNoEncontrada";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<PaginaLogin />} />
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
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>
      <ToasterCustom />
    </BrowserRouter>
  </StrictMode>
);
