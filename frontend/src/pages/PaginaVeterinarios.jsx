import Header from "@common/layout/Header";
import StatCardsGroup from "@common/stats/StatCardsGroup";
import TablaVeterinario from "@components/veterinarios/TablaVeterinario";

const PaginaAnalisis = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Veterinarios" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <StatCardsGroup />
        <TablaVeterinario />
      </main>
    </div>
  );
};

export default PaginaAnalisis;
