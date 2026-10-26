// Etiqueta <style> que sobrescribe el fondo del body.
const estiloDinamico = document.createElement('style');
document.head.appendChild(estiloDinamico);

function cambiarGradiente(colores) {
  const gradiente = `linear-gradient(45deg, ${colores.join(', ')})`;
  estiloDinamico.textContent = `
    body {
      background: ${gradiente};
      background-size: 400% 400%;
    }
  `;
}

// Los colores de cada botón vienen separados por comas en data-colores.
document.querySelectorAll('button[data-colores]').forEach((boton) => {
  boton.addEventListener('click', () => {
    cambiarGradiente(boton.dataset.colores.split(','));
  });
});
