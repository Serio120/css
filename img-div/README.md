# Método 1: Distribución en columnas y filas (Flexbox)

```
<div class="galeria-flex">
  <div class="tarjeta-imagen"><img src="imagen1.jpg" alt="Uno"></div>
  <div class="tarjeta-imagen"><img src="imagen2.jpg" alt="Dos"></div>
  <div class="tarjeta-imagen"><img src="imagen3.jpg" alt="Tres"></div>
</div>

/* Contenedor principal */
.galeria-flex {
  display: flex;            /* Activa el diseño flexible */
  flex-wrap: wrap;          /* Envía las imágenes abajo si no caben en la pantalla */
  gap: 20px;                /* Controla la separación entre los divs */
  justify-content: center;  /* Centra horizontalmente los elementos */
}

/* Divs individuales */
.tarjeta-imagen {
  width: 250px;             /* Ancho fijo para cada bloque */
  height: 250px;            /* Alto fijo para cada bloque */
}

/* Estilo común de las imágenes */
.tarjeta-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;        /* Aplica el ajuste */
}



# Método 2: Diseño en cuadrícula exacta (CSS Grid)

<div class="galeria-grid">
  <div class="bloque-img"><img src="img1.jpg" alt="1"></div>
  <div class="bloque-img"><img src="img2.jpg" alt="2"></div>
  <div class="bloque-img"><img src="img3.jpg" alt="3"></div>
  <div class="bloque-img"><img src="img4.jpg" alt="4"></div>
</div>

/* Contenedor principal */
.galeria-grid {
  display: grid;
  /* Crea columnas automáticas de mínimo 200px que llenan el espacio disponible */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;                /* Espacio entre celdas */
}

/* Divs individuales */
.bloque-img {
  height: 200px;            /* El alto define la caja para el object-fit */
}

/* Ajuste de las imágenes */
.bloque-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}



# Método 3: Posición libre o superpuesta (Absolute)

<div class="contenedor-padre">
  <div class="imagen-libre"><img src="flotante.jpg" alt="Flotante"></div>
</div>



/* El contenedor de referencia debe tener posición relativa */
.contenedor-padre {
  position: relative;
  width: 100%;
  height: 500px;
  background-color: #f0f0f0;
}

/* El div que se moverá a tu gusto */
.imagen-libre {
  position: absolute;       /* Permite coordenadas exactas respecto al padre */
  top: 20px;                /* Distancia desde arriba */
  right: 20px;              /* Distancia desde la derecha */
  width: 120px;
  height: 120px;
}

.imagen-libre img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
