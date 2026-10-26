# 03 · Hover modificado con JavaScript

Define con JavaScript el color que tendrá el fondo cuando el ratón pase sobre la página.

## Cómo funciona

1. Con `document.createElement('style')` se crea una etiqueta `<style>` vacía en el `<head>`.
2. Al pulsar un botón, se reescribe su contenido con una regla `body:hover { ... }`.
3. El navegador aplica la regla enseguida; `transition` suaviza el cambio.

## ¿Por qué no `element.style`?

Los estilos en línea no admiten pseudo-clases como `:hover`. Por eso hay que inyectar CSS.

## Alternativa moderna

Usar una variable CSS: `body:hover { background-color: var(--hover-color); }` y cambiarla con
`document.body.style.setProperty('--hover-color', color)`.

## Probar

Abre `index.html`, pulsa un botón y mueve el ratón por la página.
