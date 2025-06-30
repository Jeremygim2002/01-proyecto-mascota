const BoletaPDFContent = (orden) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 1.5rem 2rem; max-width: 600px; margin: auto; border: 1px dashed #333; background: #fefefe;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <h2 style="margin: 0; font-size: 22px;">🐾 Clínica Veterinaria</h2>
        <small style="font-size: 12px; color: #555;">Calle Salud 123, Lima · Tel: 999-888-777</small>
      </div>

      <hr style="border-top: 1px dashed #aaa; margin: 1rem 0;" />

      <div style="font-size: 14px; line-height: 1.8; color: #222;">
      <p><strong>Boleta Nº:</strong> ${orden.id_orden}</p>
      <p><strong>Fecha:</strong> ${orden.fecha}</p>
        <p><strong>Cliente:</strong> ${orden.usuario}</p>
        <p><strong>Mascota:</strong> ${orden.nombre_mascota}</p>
        <p><strong>Veterinario:</strong> ${orden.veterinario || "Sin asignar"}</p>
        <p><strong>Servicio:</strong> ${orden.servicio}</p>
      </div>

      <hr style="border-top: 1px dashed #aaa; margin: 1.5rem 0;" />

      <div style="text-align: right; font-size: 16px; font-weight: bold;">
        Total a pagar: <span style="color: #16a34a;">S/ ${orden.precio}</span>
      </div>

      <div style="text-align: center; margin-top: 2rem; font-size: 12px; color: #666;">
        Gracias por confiar en nosotros 🐶🐱
      </div>
    </div>
  `;
};

export default BoletaPDFContent;
