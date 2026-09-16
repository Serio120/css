# Semantic Parallax 🌄

Un efectillo parallax hecho con jQuery puro, sin frameworks raros ni build tools. El header y el footer se quedan fijos mientras el contenido hace scroll por encima, tipo capas de cebolla.

## ¿Qué hace esto?

- El `header` ocupa toda la pantalla y tiene una imagen de fondo que se mueve un poquito al hacer scroll (parallax de verdad, no el fake).
- El `footer` está escondido debajo (literal, con `bottom: -300px`) y va subiendo hasta aparecer del todo cuando llegas al final.
- Todo el contenido de en medio (`.wrapper-parallax`) se desliza por encima de las dos capas fijas.

## Archivos

```
├── index.html   → la estructura, 3 bloques: header, content, footer
├── style.css    → los estilos y el rollo de capas fijas + z-index
└── script.js    → el jQuery que calcula alturas y mueve cosas al hacer scroll
```

## Cómo probarlo

No hace falta instalar nada. Solo abre `index.html` en el navegador y listo. Si quieres servirlo con un servidor local (por si el navegador se pone tiquismiquis con rutas), algo tipo:

```bash
npx serve .
```

o con Python:

```bash
python3 -m http.server
```

## Ojo con esto

- Necesita jQuery cargado **antes** de `script.js` (ya está puesto en el `index.html`, no lo borres 😅).
- Las alturas se calculan una vez al cargar la página. Si cambias el tamaño de la ventana después, el efecto se puede descuadrar un poco — no hay listener de `resize` todavía.
- La imagen de fondo del header viene de una URL externa de GitHub, así que si esa imagen desaparece algún día, tendrás un header blanco muy elegante.

## Créditos

Basado en el clásico truco de parallax con capas fijas + `margin-top` dinámico. Nada de librerías de animación, todo a pulso con jQuery y CSS transitions.

¡A jugar con los números de `style.css` si quieres cambiar alturas o velocidades! 🎨
