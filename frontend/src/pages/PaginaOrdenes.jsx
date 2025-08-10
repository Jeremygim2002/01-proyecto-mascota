import Header from "@common/layout/Header";
import StatCardsGroup from "@common/stats/StatCardsGroup";
import TablaOrden from "@components/ordenes/TablaOrden";

function PaginaOrdenes() {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Ordenes" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
      <StatCardsGroup />
      <TablaOrden/>
      </main>
    </div>
  )
}

export default PaginaOrdenes
