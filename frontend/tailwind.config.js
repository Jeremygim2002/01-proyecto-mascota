/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //  Fondo general
        fondo: "#121826",                   // Fondo principal de cada página

        // Sidebar y Header
        panel: "#212936",                   // Fondo del Header y Sidebar
        borde: "#374151",                   // Bordes generales de la interfaz
        "sidebar-hover": "#2A3344",         // Hover de los ítems del Sidebar

        //  Textos
        texto: "#E2E8F0",                   // Texto principal 
        "texto-secundario": "#94A3B8",      // Texto secundario 
 

        //  Superficie (Divs dentro del fondo)
        superficie: "#1E293B",               // Fondo de divs 
        "superficie-borde": "#334155",       // Bordes de los divs/tablas
        "superficie-hover": "#334155",       // Hover de los divs/tablas

        //  Botones
        "boton-primario": "#0EA5E9",          // Botón principal (acciones generales)
        "boton-hover": "#0284C7",             // Hover del botón principal

        //  Inputs y select 
        input: "#374151",               // Fondo del input 
        "input-borde": "#4B5563",       // Borde del input
        "input-foco": "#64748B",        // Hover/foco del input
        "input-hover": "#4B5563",

        //  Modales y paneles
        modal: "#212936",                     // Color igual al de los paneles 
        "modal-borde": "#374151",             // Bordes del modal 
        sombra: "rgba(0, 0, 0, 0.6)",         // Sombra para profundidad en modales
        "panel-flotante-linea": "#475569",    // Sombra para los paneles flotantes


        //  Iconos en Sidebar
        "color-iconos": "#34D399",           // Color íconos del Sidebar
        "tabla-linea-inicial": "#E5E7EB",

      },
      fontFamily: {
        titulo: ['"Rubik Dirt"', 'sans-serif'],
        tituloSecundario: ['Montserrat', 'sans-serif'],
        cuerpo: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}