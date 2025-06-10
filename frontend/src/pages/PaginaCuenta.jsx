import Header from "@common/layout/Header";
import Perfil from "@components/cuenta/Perfil";
import Notificaciones from "@components/cuenta/Notificaciones";
import Seguridad from "@components/cuenta/Seguridad";

const PaginaCuenta = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Cuenta" />
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <Perfil />
        <Notificaciones />
        <Seguridad />
      </main>
    </div>
  );
};

export default PaginaCuenta;
