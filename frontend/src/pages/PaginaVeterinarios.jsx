import Header from "../components/common/Header";
import StatCardsGroup from "../components/common/StatCardsGroup";
import TablaVeterinario from "../components/veterinarios/TablaVeterinario";

const PaginaAnalisis = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Veterinarios" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
       
      <StatCardsGroup />
        <TablaVeterinario/>

        {/* Graficos*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 
        </div>
      </main>
    </div>
  );
};

export default PaginaAnalisis;
