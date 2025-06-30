import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import useOrdenesCalendario from "@hooks/useOrdenesCalendario";
import Title from "@common/layout/Titulo";
import ModalDetalleOrden from "./ModalDetalleOrden";

const CalendarioOrdenes = () => {
  const { eventos, loading } = useOrdenesCalendario();
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = (info) => {
    setEventoSeleccionado(info.event.extendedProps);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-slate-200">Cargando calendario…</div>
    );
  }

  return (
    <motion.div
      className="bg-superficie backdrop-blur-md shadow-2xl rounded-2xl p-6 border border-superficie-borde mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title
        text="Calendario de Órdenes"
        className="text-center text-2xl font-bold mb-6 text-slate-100"
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={esLocale}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        nowIndicator={true}
        navLinks={true}
        events={eventos}
        eventClick={handleClick}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        height="auto"
        eventContent={renderEventContent}
        eventMouseEnter={(info) => {
          info.el.style.filter = "brightness(1.1)";
        }}
        eventMouseLeave={(info) => {
          info.el.style.filter = "brightness(1)";
        }}
        dayHeaderClassNames={() => "text-white bg-slate-700 text-sm py-1"}
        slotLabelClassNames={() => "text-white text-xs"}
      />

      <ModalDetalleOrden
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        evento={eventoSeleccionado}
      />
    </motion.div>
  );
};

const renderEventContent = (eventInfo) => {
  return (
    <div
      className="w-full h-full px-2 py-1 rounded-md font-semibold shadow-md text-sm"
      style={{
        backgroundColor: eventInfo.event.backgroundColor,
        color: eventInfo.event.textColor,
        borderColor: eventInfo.event.borderColor,
        borderWidth: "1px",
      }}
    >
      {eventInfo.timeText && (
        <div className="font-mono text-xs mb-0.5">{eventInfo.timeText}</div>
      )}
      <div className="truncate leading-tight">{eventInfo.event.title}</div>
    </div>
  );
};

export default CalendarioOrdenes;
