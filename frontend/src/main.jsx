import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";

import PaginaLogin from "./pages/PaginaLogin";
import PaginaAnalisis from "./pages/PaginaAnalisis";
import PaginaServicios from "./pages/PaginaServicios";
import PaginaOrdenes from "./pages/PaginaOrdenes";
import PaginaPersonal from "./pages/PaginaPersonal";
import PaginaUsuarios from "./pages/PaginaUsuarios";
import PaginaCuenta from "./pages/PaginaCuenta";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Login sin layout */}
        <Route path="/Login" element={<PaginaLogin />} />

        {/* Rutas con layout general */}
        <Route path="/" element={<App />}>
          <Route index element={<PaginaAnalisis />} />
          <Route path="Servicios" element={<PaginaServicios />} />
          <Route path="Ordenes" element={<PaginaOrdenes />} />
          <Route path="Personal" element={<PaginaPersonal />} />
          <Route path="Usuarios" element={<PaginaUsuarios />} />
          <Route path="Cuenta" element={<PaginaCuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
