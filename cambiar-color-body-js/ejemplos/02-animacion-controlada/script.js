// Añade o quita la clase "animado" del <body>.
// El CSS se encarga de la animación; JS solo la enciende y apaga.
function toggleAnimacion() {
  document.body.classList.toggle('animado');
}

document.getElementById('toggle').addEventListener('click', toggleAnimacion);
