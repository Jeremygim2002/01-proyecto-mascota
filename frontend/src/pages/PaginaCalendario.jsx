import Header from "@common/layout/Header";
import CalendarioOrdenes from "@components/calendario/CalendarioOrdenes";

const PaginaCalendario = () => (
  <div className="flex-1 overflow-auto relative z-10">
    <Header title="Calendario" />
    <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-8">
      <CalendarioOrdenes />
    </main>
  </div>
);

export default PaginaCalendario;
