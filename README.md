# CSS Magic

Colección de experimentos, ejemplos y apuntes sobre HTML y CSS. El repositorio sirve como laboratorio personal para probar formas, animaciones, imágenes, layouts y componentes visuales que puedan reutilizarse en otros proyectos.

Los ejemplos son independientes y, en general, pueden ejecutarse abriendo directamente su archivo `.html` en un navegador moderno.

## Contenido

- [Elipses y formas](#elipses-y-formas)
- [Imágenes dentro de `div`](#imágenes-dentro-de-div)
- [Botón Whimsical](#botón-whimsical)
- [Pruebas y apuntes](#pruebas-y-apuntes)
- [Cómo probar los ejemplos](#cómo-probar-los-ejemplos)
- [Compatibilidad](#compatibilidad)
- [Cómo añadir contenido](#cómo-añadir-contenido)
- [Recursos](#recursos)

## Elipses y formas

La carpeta [`elipses/`](elipses/) contiene ejemplos de formas creadas con CSS:

- [`index.html`](elipses/index.html): elipses fijas, una elipse animada y un recorte con `clip-path`.
- [`index_responsive.html`](elipses/index_responsive.html): alternativas adaptables usando porcentajes, `vw`, `aspect-ratio` y una media query.

Conceptos principales: `border-radius`, `clip-path: ellipse()`, `@keyframes`, `transform` y diseño responsive.

## Imágenes dentro de `div`

La carpeta [`img-div/`](img-div/) reúne ejemplos para mostrar imágenes en contenedores y controlar su encuadre con `object-fit` o `background-size`:

- [`index.html`](img-div/index.html): imágenes usadas como fondos de distintos contenedores.
- [`Object-Fit.html`](img-div/Object-Fit.html): ejemplo general de `object-fit`.
- [`Object-Fit-Flexbox.html`](img-div/Object-Fit-Flexbox.html): galería con Flexbox.
- [`Object-Fit-CSSGrid.html`](img-div/Object-Fit-CSSGrid.html): galería con CSS Grid.
- [`Object-Fit-Absolute.html`](img-div/Object-Fit-Absolute.html): imagen posicionada con `position: absolute`.
- [`README.md`](img-div/README.md): explicación y fragmentos reutilizables de los tres enfoques.

Esta carpeta también contiene las imágenes locales usadas por las demos.

## Botón Whimsical

La carpeta [`whimsical-button/`](whimsical-button/) contiene un botón con partículas animadas alrededor de su borde:

- [`whimsical-button.html`](whimsical-button/whimsical-button.html): demo interactiva.
- [`INFO_Whimsical_Button.md`](whimsical-button/INFO_Whimsical_Button.md): características, estructura, personalización y compatibilidad.

El componente utiliza CSS moderno, incluyendo `offset-path`, `oklch()`, `light-dark()` y estados `:hover` y `:focus-visible`.

## Pruebas y apuntes

La carpeta [`PRUEBAS-PARA-BORRAR/`](PRUEBAS-PARA-BORRAR/) contiene material experimental o temporal:

- [`README.md`](PRUEBAS-PARA-BORRAR/README.md): referencia breve a React y su documentación oficial.
- [`Quick_Start.md`](PRUEBAS-PARA-BORRAR/Quick_Start.md): apuntes sobre componentes, JSX, estilos y renderizado en React.

Su contenido no forma parte de una aplicación ejecutable del repositorio y puede cambiar o eliminarse durante la limpieza de pruebas.

## Cómo probar los ejemplos

1. Clona o descarga el repositorio.
2. Abre la carpeta en VS Code o en tu navegador.
3. Abre cualquiera de los archivos `.html` indicados en las secciones anteriores.
4. Para una experiencia de desarrollo más cómoda, usa una extensión de servidor local, como **Live Server**, y abre el archivo desde ese servidor.

No hay dependencias ni comandos de compilación definidos actualmente.

## Compatibilidad

Los ejemplos básicos funcionan en navegadores modernos. El botón Whimsical y algunos experimentos de CSS dependen de características relativamente recientes, por lo que conviene usar una versión actualizada de Chrome, Edge, Firefox o Safari.

Cuando una característica no sea compatible, el navegador puede mostrar el HTML sin el efecto visual avanzado. La funcionalidad básica del documento debería mantenerse siempre que sea posible.

## Cómo añadir contenido

Para mantener el repositorio fácil de ampliar:

1. Crea una carpeta con un nombre descriptivo.
2. Añade una demo HTML autocontenida y, si hace falta, sus imágenes o estilos.
3. Incluye un README dentro de la carpeta cuando el ejemplo tenga varias variantes o decisiones importantes.
4. Añade aquí una nueva subsección con una descripción breve y enlaces a los archivos principales.
5. Indica las propiedades CSS destacadas y cualquier requisito de compatibilidad.

Plantilla para futuras entradas:

```markdown
## Nombre del experimento

Descripción breve del objetivo del ejemplo.

- [`demo.html`](ruta/demo.html): demo principal.
- [`README.md`](ruta/README.md): notas y decisiones de implementación.

Conceptos principales: `propiedad-css`, `otra-propiedad` y `técnica`.
```

## Recursos

- [MDN Web Docs: CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [MDN Web Docs: HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- [React](https://react.dev/)
- [React Learn](https://react.dev/learn)
- [WallpaperCave](https://wallpapercave.com/): fuente de referencia para algunos recursos visuales.

## Licencia

Consulta el archivo [`LICENSE`](LICENSE) para conocer las condiciones de uso de este repositorio.


