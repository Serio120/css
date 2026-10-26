# 🎨 Cambiar el color del `body` con JavaScript + CSS

Colección de ejemplos listos para usar que muestran distintas formas de cambiar el fondo de una página con JavaScript y CSS. Sin dependencias ni instalación: solo HTML, CSS y JS puros.

## 📁 Estructura

```
cambiar-color-body-js/
├── index.html                      # Índice con enlaces a los ejemplos
├── README.md
├── LICENSE
├── .gitignore
└── ejemplos/
    ├── 01-botones-color-fijo/
    ├── 02-animacion-controlada/
    ├── 03-hover-dinamico/
    └── 04-gradiente-animado/
        ├── index.html
        ├── style.css
        ├── script.js
        └── README.md               # Explicación del ejemplo
```

## 🚀 Cómo probarlo en local

1. Descarga o clona el repositorio.
2. Abre `index.html` en tu navegador (doble clic).
3. Elige un ejemplo.

Opcional, con servidor local:

```bash
npx serve .
# o
python3 -m http.server 8000
```

## 📚 Ejemplos

| # | Ejemplo | Técnica | Dificultad |
|---|---------|---------|------------|
| 1 | [Color fijo con botones](ejemplos/01-botones-color-fijo) | `style.backgroundColor` + `data-*` | ⭐ |
| 2 | [Animación controlada](ejemplos/02-animacion-controlada) | `classList.toggle` + `@keyframes` | ⭐⭐ |
| 3 | [Hover dinámico](ejemplos/03-hover-dinamico) | `<style>` creado con JS | ⭐⭐ |
| 4 | [Gradiente animado](ejemplos/04-gradiente-animado) | Gradiente + `background-position` + JS | ⭐⭐⭐ |

## 🧰 Resumen de métodos JavaScript

| Método | Uso |
|--------|-----|
| `document.body.style.backgroundColor` | Cambiar color sólido |
| `document.body.classList.toggle()` | Activar/desactivar clases CSS |
| `document.createElement('style')` | Crear CSS dinámico (p. ej. `:hover`) |
| `element.style.background` | Cambiar gradientes |

## 🌐 Publicarlo con GitHub Pages (opcional)

En el repositorio: **Settings → Pages → Branch: `main` / root**. En unos minutos tendrás los ejemplos en línea en `https://TU-USUARIO.github.io/NOMBRE-REPO/`.

## 📄 Licencia

[MIT](LICENSE)
