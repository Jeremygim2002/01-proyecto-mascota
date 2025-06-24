import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import useOrdenesCalendario from "@hooks/useOrdenesCalendario";
import Title from "@common/layout/Titulo";

const CalendarioOrdenes = () => {
  const { eventos, loading } = useOrdenesCalendario();

  if (loading) {
    return <div className="p-4 text-center text-slate-200">Cargando calendario…</div>;
  }

  if (!eventos.length) {
    return <div className="p-4 text-center text-slate-200">No hay órdenes agendadas</div>;
  }
console.log("🎯 Eventos recibidos en render:", eventos);

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-xl">
      <Title text="Calendario de Órdenes" className="text-center mb-4" />
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
        slotMinTime="06:00:00"
        slotMaxTime="20:00:00"
        events={eventos}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        height="auto"
        eventMouseEnter={(info) => {
          const { title, startStr, endStr } = info.event;
          info.el.setAttribute(
            "title",
            `${title}\n${startStr.slice(11, 16)} - ${endStr.slice(11, 16)}`
          );
        }}
        dayHeaderClassNames={() => "text-slate-100 bg-slate-700"}
        slotLabelClassNames={() => "text-slate-400"}
        eventClassNames={() => "bg-emerald-500 text-slate-50 px-2 rounded-md"}
      />
    </div>
  );
};

export default CalendarioOrdenes;
