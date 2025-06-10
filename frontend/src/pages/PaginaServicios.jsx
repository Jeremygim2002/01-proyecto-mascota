import Header from "@common/layout/Header";
import StatCardsGroup from "@common/stats/StatCardsGroup";
import TablaServicio from "@components/servicios/TablaServicio";

const PaginaAnalisis = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Servicios" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <StatCardsGroup />
        <TablaServicio />
      </main>
    </div>
  );
};

export default PaginaAnalisis;
