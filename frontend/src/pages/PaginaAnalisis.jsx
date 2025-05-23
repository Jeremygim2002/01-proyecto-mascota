import Header from "../components/common/Header";
import StatCardsGroup from "../components/common/StatCardsGroup";
import GraficoServicios from "../components/analisis/GraficoServicios";
import GraficoUsuarios from "../components/analisis/GraficoUsuarios";
import GraficoPersonal from "../components/analisis/GraficoPersonal";
import GraficoOrdenes from "../components/analisis/GraficoOrdenes";

const PaginaAnalisis = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Análisis" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-8">

        <StatCardsGroup />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GraficoOrdenes />
          <GraficoUsuarios />
          <GraficoPersonal />
          <GraficoServicios />
        </div>
      </main>
    </div>
  );
};

export default PaginaAnalisis;
