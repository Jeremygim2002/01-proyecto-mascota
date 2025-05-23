import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";

function App() {
  const location = useLocation();
  const esLogin = location.pathname === "/Login";

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {!esLogin && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-fondo bg-opacity-70" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
      )}

      {!esLogin && <Sidebar />}

      <Outlet />
    </div>
  );
}

export default App;
