# 04 · Gradiente animado con colores personalizados

Un gradiente que se mueve solo y cuyos colores se cambian con botones.

## Cómo funciona

1. `background-size: 400% 400%` hace el gradiente mucho más grande que la pantalla.
2. `@keyframes gradiente` mueve `background-position` de un lado a otro: eso crea el efecto de movimiento.
3. Al pulsar un botón, JS lee la lista de colores (`data-colores`), construye un `linear-gradient(...)` e inyecta una regla en una etiqueta `<style>`.
4. La animación sigue activa porque solo se sustituye el gradiente, no la animación.

## Para personalizar

Añade un botón con su paleta:

```html
<button data-colores="#ff9a9e,#fad0c4,#fbc2eb,#a6c1ee">Pastel</button>
```

## Nota

Los gradientes no se pueden animar con `transition` entre dos gradientes distintos, por eso el cambio de paleta es instantáneo.

## Probar

Abre `index.html` en el navegador.
