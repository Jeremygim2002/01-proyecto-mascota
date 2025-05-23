import Header from "../components/common/Header";
import StatCardsGroup from "../components/common/StatCardsGroup";
import TablaUsuarios from "../components/usuarios/TablaUsuarios";

const PaginaAnalisis = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Usuarios" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
       
      <StatCardsGroup />
        <TablaUsuarios/>

        {/* Graficos*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 
        </div>
      </main>
    </div>
  );
};

export default PaginaAnalisis;
