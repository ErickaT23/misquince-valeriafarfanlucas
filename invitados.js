// invitados.js
export const invitados = {
    '1': { nombre: 'Ana Pérez', pases: 3 },
    '2': { nombre: 'Luis García', pases: 2 },
    '3': { nombre: 'María López', pases: 4 }
  };
  
  // Función para confirmar asistencia
  function confirmarAsistencia() {
    // Obtener el ID del invitado desde la URL
    const params = new URLSearchParams(window.location.search);
    const invitadoId = params.get("id");
  
    const invitado = invitados[invitadoId];
  
    if (!invitado) {
      alert("Invitado no encontrado.");
      return;
    }
  
    const baseURL = "https://docs.google.com/forms/d/e/1FAIpQLSedwNzh7uiU7zTThM3COblNHu86Kj0HVD1Jw44gd3vcH5kGHg/viewform?usp=pp_url";
  
    // Campos del formulario
    const nombreField = "entry.1297710131";
    const pasesField = "entry.1099367965";
  
    // Construir el URL con los datos prellenados
    const formURL = `${baseURL}&${nombreField}=${encodeURIComponent(invitado.nombre)}&${pasesField}=${invitado.pases}`;
  
    // Abrir el formulario en nueva pestaña
    window.open(formURL, "_blank");
  }
  