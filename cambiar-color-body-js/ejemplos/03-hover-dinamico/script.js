// Los pseudo-selectores como :hover no se pueden cambiar con element.style,
// así que creamos una etiqueta <style> y reescribimos su contenido.
const estiloDinamico = document.createElement('style');
document.head.appendChild(estiloDinamico);

function cambiarHover(color) {
  estiloDinamico.textContent = `
    body:hover {
      background-color: ${color};
    }
  `;
}

document.querySelectorAll('button[data-color]').forEach((boton) => {
  boton.addEventListener('click', () => cambiarHover(boton.dataset.color));
});
