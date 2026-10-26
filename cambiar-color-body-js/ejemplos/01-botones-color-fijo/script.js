// Cambia el color de fondo del <body> con el valor recibido.
function cambiarColor(color) {
  document.body.style.backgroundColor = color;
}

// Cada botón guarda su color en el atributo data-color.
document.querySelectorAll('button[data-color]').forEach((boton) => {
  boton.addEventListener('click', () => cambiarColor(boton.dataset.color));
});
