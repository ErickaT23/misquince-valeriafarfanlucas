// Función para abrir la invitación (sobre) y reproducir la música
function abrirInvitacion() {
    const envelope = document.getElementById('envelope');
    const invitacion = document.getElementById('invitacion');
    const musica = document.getElementById('musica');

    if (!envelope.classList.contains('open')) {
        // Abrir el sobre solo si aún no está abierto
        envelope.classList.add('open');

        setTimeout(() => {
            envelope.style.display = 'none';
            invitacion.style.display = 'block';

            // Reproducir música al abrir la invitación
            if (musica.paused) {
                musica.play();
            }
        }, 1000);
    } else {
        // Si el sobre ya está abierto, solo controlar la música
        if (musica.paused) {
            musica.play();
        } else {
            musica.pause();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const sello = document.getElementById("seal");
    if (sello) {
        sello.addEventListener("click", abrirInvitacion);
    }

    // Iniciar contador y cargar datos del invitado al cargar la página
    iniciarContador();
    cargarDatosInvitado();
});

// Función para obtener datos de invitados (sin inputs)
import { invitados } from './invitados.js';  // Ajusta la ruta según tu estructura de archivos

function cargarDatosInvitado() {
    const params = new URLSearchParams(window.location.search);
    const invitadoId = params.get('id');

    if (!invitadoId) {
        alert('ID de invitado no encontrado en el enlace.');
        return;
    }

    const invitado = invitados[invitadoId];

    if (invitado) {
        const nombreEl = document.getElementById('nombreInvitado');
        const pasesEl = document.getElementById('cantidadPases');

        nombreEl.innerText = `¡${invitado.nombre}!`;
        pasesEl.innerText = `¡Invitación válida para ${invitado.pases}!`;

        // Agregar clase para estilos de fondo
        nombreEl.classList.add('fondo-nombre');
        pasesEl.classList.add('fondo-pases');
    } else {
        alert('Invitado no encontrado.');
    }
}



// Función para iniciar el contador de la fecha del evento
function iniciarContador() {
    const eventoFecha = new Date("November 29, 2025 00:00:00").getTime();

    setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias;
        document.getElementById("horas").innerText = horas;
        document.getElementById("minutos").innerText = minutos;
        document.getElementById("segundos").innerText = segundos;
    }, 1000);
}

// Función para abrir el lightbox solo al hacer clic en una imagen de la galería
function changePhoto(element) {
    const mainPhotoModal = document.getElementById('main-photo-modal');
    mainPhotoModal.src = element.src;
    openModal();
}

// Función para mostrar el modal
function openModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'flex';
}

// Función para cerrar el modal
function closeModal(event) {
    if (event.target.id === 'photo-modal' || event.target.className === 'close') {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'none';
    }
}

// Fade-in effect cuando los elementos se hacen visibles al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
    const elementsToFade = document.querySelectorAll('.fade-in-element');

    const observerOptions = {
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});

// Función para confirmar asistencia
// script.js
import { invitados } from './invitados.js';

function confirmarAsistencia() {
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
}

// Hacer disponible la función al HTML
window.confirmarAsistencia = confirmarAsistencia;



// Función para abrir Waze o Google Maps
function elegirAplicacion() {
    const enlaceGoogleMaps = 'https://maps.app.goo.gl/RyBzj2xNxDKWdJaE9';
    window.open(enlaceGoogleMaps, '_blank');
}
function elegirAplicacionOtraDireccion() {
    const enlaceGoogleMaps = 'https://maps.app.goo.gl/9F42xmijRvivmaGA7';
    window.open(enlaceGoogleMaps, '_blank');
}

document.addEventListener("DOMContentLoaded", function () {
    // Mostrar/ocultar formulario
    const mostrarFormularioBtn = document.getElementById("mostrarFormularioBtn");
    const formularioDeseo = document.getElementById("formularioDeseo");
  
    mostrarFormularioBtn.addEventListener("click", () => {
      formularioDeseo.style.display =
        formularioDeseo.style.display === "none" ? "block" : "none";
    });
  
    // Mostrar/ocultar deseos
    const verDeseosBtn = document.getElementById("verDeseosBtn");
    const wishesContainer = document.getElementById("wishesContainer");
    let deseosVisibles = false;
  
    verDeseosBtn.addEventListener("click", async () => {
      if (!deseosVisibles) {
        wishesContainer.innerHTML = "<p>Cargando deseos...</p>";
        wishesContainer.style.display = "block";
  
        const dbRef = firebase.database().ref("buenos_deseos");
        dbRef.once("value", (snapshot) => {
          wishesContainer.innerHTML = "";
  
          if (!snapshot.exists()) {
            wishesContainer.innerHTML =
              "<p>No hay deseos aún. Sé el primero 💌</p>";
          } else {
            snapshot.forEach((childSnapshot) => {
              const data = childSnapshot.val();
              wishesContainer.innerHTML += `
                <div class="wish-card">
                  <strong>${data.nombre}</strong><br/>
                  <em>${data.mensaje}</em>
                </div>
              `;
            });
          }
  
          verDeseosBtn.textContent = "Ocultar buenos deseos";
          deseosVisibles = true;
        });
      } else {
        wishesContainer.innerHTML = "";
        wishesContainer.style.display = "none";
        verDeseosBtn.textContent = "Ver buenos deseos";
        deseosVisibles = false;
      }
    });
  });

  //estrellas
  function crearEstrellitas(cantidad = 40) {
    const starfield = document.getElementById('starfield');
  
    for (let i = 0; i < cantidad; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
  
      const size = Math.random() * 2 + 1; // tamaño entre 1 y 3 px
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
  
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
  
      star.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4 a 7 segundos
      star.style.animationDelay = `${Math.random() * 5}s`;
  
      starfield.appendChild(star);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    crearEstrellitas();
  });
  
//exponer globalmente
window.changePhoto = changePhoto;
window.openModal = openModal;
window.closeModal = closeModal;
window.confirmarAsistencia = confirmarAsistencia;
window.elegirAplicacion = elegirAplicacion;
window.elegirAplicacionOtraDireccion = elegirAplicacionOtraDireccion;

