const CartillaMascotaPDFContent = ({ usuario, ordenes }) => {
  const fechaHoy = new Date().toLocaleDateString("es-PE");

  const ordenesHTML = ordenes.map((o) => `
    <tr>
      <td style="padding: 4px 8px;">${new Date(o.fecha).toLocaleDateString("es-PE")}</td>
      <td style="padding: 4px 8px;">${o.hora_inicio} - ${o.hora_fin}</td>
      <td style="padding: 4px 8px;">${o.servicio}</td>
      <td style="padding: 4px 8px;">${o.veterinario}</td>
    </tr>
  `).join("");

  return `
    <div style="font-family: Arial, sans-serif; padding: 2rem; max-width: 700px; margin: auto; border: 1px solid #ccc; background: #fff;">
      <h2 style="text-align: center; font-size: 22px; margin-bottom: 1.5rem">🦴 Cartilla de Mascota</h2>

      <div style="display: flex; flex-wrap: wrap; font-size: 14px; line-height: 1.8; margin-bottom: 1.5rem;">
        <div style="width: 50%; padding-right: 1rem;">
          <p><strong>Nombre:</strong> ${usuario.nombre_mascota}</p>
          <p><strong>Tipo:</strong> ${usuario.tipo_mascota}</p>
          <p><strong>Raza:</strong> ${usuario.raza}</p>
          <p><strong>Edad:</strong> ${usuario.edad} años</p>
        </div>
        <div style="width: 50%;">
          <p><strong>Sexo:</strong> ${usuario.sexo}</p>
          <p><strong>Estado:</strong> ${usuario.estado ? "Activo" : "Inactivo"}</p>
          <p><strong>Dueño:</strong> ${usuario.nombre_usuario}</p>
          <p><strong>DNI:</strong> ${usuario.dni}</p>
        </div>
      </div>

      <h3 style="margin-top: 2rem; font-size: 16px; border-bottom: 1px solid #ccc; padding-bottom: 6px;">📜 Historial de Órdenes</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 1rem">
        <thead>
          <tr style="background: #f1f1f1;">
            <th style="padding: 6px 8px;">Fecha</th>
            <th style="padding: 6px 8px;">Hora</th>
            <th style="padding: 6px 8px;">Servicio</th>
            <th style="padding: 6px 8px;">Veterinario</th>
          </tr>
        </thead>
        <tbody>
          ${ordenesHTML || `<tr><td colspan="4" style="padding: 1rem; text-align: center;">Sin registros</td></tr>`}
        </tbody>
      </table>

      <p style="text-align: center; margin-top: 3rem; font-size: 12px; color: #888;">Impreso el ${fechaHoy}</p>
    </div>
  `;
};

export default CartillaMascotaPDFContent;
