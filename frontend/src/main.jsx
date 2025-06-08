import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import App from "./App";

import PaginaLogin from "./pages/PaginaLogin";
import PaginaAnalisis from "./pages/PaginaAnalisis";
import PaginaServicios from "./pages/PaginaServicios";
import PaginaOrdenes from "./pages/PaginaOrdenes";
import PaginaVeterinarios from "./pages/PaginaVeterinarios";
import PaginaUsuarios from "./pages/PaginaUsuarios";
import PaginaCuenta from "./pages/PaginaCuenta";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirige raíz hacia login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login sin layout */}
        <Route path="/login" element={<PaginaLogin />} />

        {/* Rutas con layout general */}
        <Route path="/dashboard" element={<App />}>
          <Route index element={<PaginaAnalisis />} />
          <Route path="servicios" element={<PaginaServicios />} />
          <Route path="ordenes" element={<PaginaOrdenes />} />
          <Route path="veterinarios" element={<PaginaVeterinarios />} />
          <Route path="usuarios" element={<PaginaUsuarios />} />
          <Route path="cuenta" element={<PaginaCuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
