# 🐾 Dashboard de Gestión Veterinaria

Este proyecto es una aplicación web moderna desarrollada con **React + Vite** en el frontend y **Node.js + Express + MySQL** en el backend. Está diseñado para gestionar de forma eficiente todos los procesos internos de una veterinaria, desde el registro de usuarios y mascotas hasta la creación de órdenes de servicio y análisis de datos.

## 🚀 Características principales

- Registro y gestión de:
  - Usuarios (dueños de mascotas)
  - Mascotas
  - Servicios veterinarios
  - Veterinarios y asistentes
  - Órdenes de atención
- Calendario de citas con FullCalendar
- Estadísticas visuales con Recharts
- Generación de cartillas y DNI de mascota en PDF
- Autenticación básica con login seguro
- Sistema de notificaciones y modales reutilizables
- Registro de auditoría de acciones (tabla `registro`)

## ⚙️ Tecnologías utilizadas

### 🖥️ Frontend

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS (v3.4)](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [Recharts](https://recharts.org/)
- [FullCalendar](https://fullcalendar.io/)
- [Zod](https://zod.dev/)
- [Sonner](https://sonner.emilkowal.dev/) – sistema de notificaciones
- [html2pdf.js](https://www.npmjs.com/package/html2pdf.js) – generación de PDF

### 🗄️ Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- Arquitectura modular: `controllers`, `routes`, `models`, `middlewares`, `schemas`


## 🧪 Instalación y uso

### Requisitos previos

- Node.js ≥ 18
- MySQL ≥ 8
- Vite ≥ 6
- Tailwind CSS v3.4.x

### Clonar el repositorio

```bash
git clone https://github.com/Jeremygim2002/01-proyecto-mascota.git
cd 01-proyecto-mascota

### Instalar dependencias
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


### Ejecutar en desarrollo
# Iniciar backend (con conexión MySQL)
cd backend
npm run dev

# Iniciar frontend
cd ../frontend
npm run dev
