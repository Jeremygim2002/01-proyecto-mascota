import { Outlet } from "react-router-dom";
import Sidebar from "@common/layout/Sidebar";

const App = () => (
  <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-fondo bg-opacity-70" />
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>

    <Sidebar />
    <Outlet />
  </div>
);

export default App;
