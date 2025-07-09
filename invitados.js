  // Simulación de invitados.js si no lo estás importando como módulo externo
  const invitados = {
    '1': { nombre: 'Ana Pérez', pases: 3 },
    '2': { nombre: 'Luis García', pases: 2 },
    '3': { nombre: 'María López', pases: 4 }
  };

  window.confirmarAsistencia = function () {
    const params = new URLSearchParams(window.location.search);
    const invitadoId = params.get("id");

    const invitado = invitados[invitadoId];

    if (!invitado) {
      alert("Invitado no encontrado.");
      return;
    }

    const baseURL = "https://docs.google.com/forms/d/e/1FAIpQLSedwNzh7uiU7zTThM3COblNHu86Kj0HVD1Jw44gd3vcH5kGHg/viewform?usp=pp_url";
    const nombreField = "entry.1297710131";
    const pasesField = "entry.1099367965";

    const formURL = `${baseURL}&${nombreField}=${encodeURIComponent(invitado.nombre)}&${pasesField}=${invitado.pases}`;

    window.open(formURL, "_blank");
  };
