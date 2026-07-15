# Whimsical Button — Botón con partículas animadas en CSS

## Botón Whimsical ✨

Un botón con un efecto hover "mágico": al pasar el cursor, cinco partículas de colores (deco) se deslizan a lo largo del borde del botón siguiendo un `offset-path`, cambiando de posición, escala y opacidad, mientras el borde se ilumina con un resplandor difuso (`blur`) detrás del botón.

## Características

- **Partículas animadas por CSS puro**: cada `<span class="deco">` viaja por el contorno del botón (`offset-path: border-box`) hasta un punto final distinto, definido con variables CSS (`--deco-N-end-offset`, `--deco-N-end-translate`).
- **Paleta generada con OKLCH**: los colores de las partículas se derivan de un `--main-color` base usando `oklch(from var(--main-color) ...)`, variando tono (`h`) y luminosidad de forma programática.
- **Animación de "vida"**: cada partícula aparece, se mantiene visible y se desvanece (`@keyframes --decoration-life`) con una duración y velocidad ligeramente distintas por partícula (`--deco-N-speed-variation`), dando un efecto orgánico y no sincronizado.
- **Resplandor (glow) en hover/focus**: un pseudo-elemento `::after` desenfocado detrás del botón aparece con `opacity` animada al hacer hover o `focus-visible`.
- **Sistema de diseño base incluido**: variables de tipografía fluida y espaciado (escala tipo Utopia), colores con soporte `light-dark()` para modo claro/oscuro, y tipografía personalizada (Satoshi, Cascadia Code) vía `@font-face`.
- **Accesible**: el estado de hover también se activa con `:focus-visible`, y las partículas decorativas llevan `aria-hidden="true"`.

## Estructura del código

1. **Bloque `<style>` del botón** — Define `.btn[data-btn-type="whimsical"]` y sus partículas `.deco`, incluyendo las variables por partícula (1 a 5) y la animación `--decoration-life`.
2. **Bloque `<style>` general** — Fuentes (`@font-face`), variables de color/tipografía/espaciado (`:root`), soporte de tema (`[data-theme]`), y estilos base de elementos HTML (`body`, `h1`-`h4`, `a`, `.wrapper`, etc.).
3. **Marcado HTML** — Un único botón de ejemplo:

   ```html
   <button class="btn" data-btn-type="whimsical">
     Whimsy
     <span class="deco" aria-hidden="true"></span>
     <!-- x5 -->
   </button>
   ```

## Cómo usar

1. Guarda el código como un archivo `.html` (ver sugerencia de nombre abajo) y ábrelo en un navegador moderno.
2. Para reutilizar el botón en otro proyecto, copia el bloque `<style>` del botón (primer bloque) y el marcado del `<button>`. El segundo bloque `<style>` es opcional: aporta las variables de diseño global (colores, tipografía) que usa el botón (`--surface-1`, `--text-primary`, `--border-default`, `--fs-4`).
3. Personaliza el color principal cambiando `--main-color` en `[data-btn-type="whimsical"]`.
Este componente usa características CSS relativamente modernas:

- `offset-path`, `offset-distance`, `offset-rotate` — animación de las partículas por el borde.
- `oklch()` y la sintaxis `oklch(from ...)` — generación relativa de colores (con fallback vía `@supports` para el gradiente).
- `light-dark()` — colores adaptables a modo claro/oscuro sin duplicar reglas.
- `interpolate-size: allow-keywords` y unidades como `svb`, `lh`.

Se recomienda un navegador Chromium/Safari/Firefox actualizado (2024+) para ver el efecto completo. En navegadores más antiguos, el botón seguirá siendo funcional pero sin la animación de partículas ni los colores derivados.

## Créditos

Fuentes tipográficas: [Satoshi](https://assets.codepen.io/308367/Satoshi-Variable.ttf) y [Cascadia Code](https://assets.codepen.io/308367/CascadiaCode-Regular.woff2).

> [codepen](https://codepen.io/editor/kevinpowell/pen/019edbf1-79cb-739e-a285-9780858eb92e)
> [daily.dev](https://dly.to/Uwq1rLG4iul)
