# 02 · Animación controlada con JavaScript

La animación está definida en CSS con `@keyframes`, y JavaScript solo la activa o desactiva.

## Cómo funciona

1. `@keyframes cambiarColor` define tres colores (azul → rojo → verde).
2. La regla `body.animado` aplica la animación (`5s`, `infinite`, `alternate` para que vaya y vuelva).
3. `classList.toggle('animado')` añade o quita la clase al pulsar el botón.

## Por qué es una buena práctica

Separar la animación (CSS) del control (JS) mantiene el código claro y aprovecha el rendimiento del navegador.

## Para personalizar

Cambia los colores de los `@keyframes` o la duración (`5s`) en `style.css`.

## Probar

Abre `index.html` en el navegador.
