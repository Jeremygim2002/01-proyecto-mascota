import Header from "@common/layout/Header";
import StatCardsGroup from "@common/stats/StatCardsGroup";
import TablaUsuario from "@components/usuarios/TablaUsuario";

const PaginaAnalisis = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Usuarios" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <StatCardsGroup />
        <TablaUsuario />
      </main>
    </div>
  );
};

export default PaginaAnalisis;
