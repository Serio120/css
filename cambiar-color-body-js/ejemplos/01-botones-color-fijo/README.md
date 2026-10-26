# 01 · Color fijo con botones

Cambia el fondo de la página a un color sólido al pulsar un botón.

## Cómo funciona

1. Cada botón lleva su color en un atributo `data-color`.
2. JavaScript escucha el `click` de cada botón y lee `boton.dataset.color`.
3. `document.body.style.backgroundColor = color` aplica el color.
4. La propiedad CSS `transition` hace que el cambio sea suave (0.5 s).

## Para personalizar

Añade un botón nuevo en `index.html` con su `data-color`; no hace falta tocar el JS.

```html
<button data-color="#9b59b6">Morado</button>
```

## Probar

Abre `index.html` en el navegador.
