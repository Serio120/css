# Cortina Volátil

Efecto visual interactivo basado en una **cortina formada por caracteres**, que reacciona al movimiento del cursor.

La idea principal es que al pasar el ratón sobre la cortina se produzca una combinación de dos efectos:

* **Ojo de pez (fisheye):** la zona cercana al cursor se deforma y parece expandirse.
* **Viento:** el movimiento del cursor empuja la cortina en la dirección en la que se mueve, como si estuviéramos pasando la mano por una tela.

La combinación de ambos efectos hace que la cortina se mueva, se deforme y posteriormente vuelva progresivamente a su posición.

---

## 💡 Idea del efecto

La filosofía del efecto es bastante sencilla:

```text
                  CURSOR
                     │
          ┌──────────┴──────────┐
          │                     │
       FISHEYE                VIENTO
          │                     │
          │              dirección + velocidad
          │                     │
          └──────────┬──────────┘
                     │
                     ▼
                CORTINA
                     │
                     ▼
              movimiento de tela
                     │
                     ▼
                 relajación
```

El cursor no debería limitarse a "agarrar" la cortina.

La intención es que **el cursor provoque una perturbación sobre ella**.

Un movimiento lento produce una deformación suave, mientras que un movimiento rápido produce una especie de ráfaga.

---

## 🧩 Cómo está construida

La cortina está formada por una rejilla de partículas.

Cada partícula tiene:

* posición actual;
* posición anterior;
* posición original;
* carácter que representa;
* movimiento producido por el viento;
* desplazamiento producido por el fisheye.

Las partículas están unidas mediante restricciones horizontales y verticales para conseguir un comportamiento parecido al de una tela.

```text
●──●──●──●──●──●
│  │  │  │  │  │
●──●──●──●──●──●
│  │  │  │  │  │
●──●──●──●──●──●
│  │  │  │  │  │
●──●──●──●──●──●
```

Los caracteres se dibujan sobre esas partículas, por lo que no estamos moviendo simplemente un texto: **el texto forma parte de la propia superficie de la cortina**.

---

## 🖱️ Interacción con el ratón

La interacción tiene dos componentes.

### Fisheye

El cursor tiene un radio de influencia.

Cuanto más cerca está una partícula del cursor, mayor es la deformación.

```text
             cursor
                ●
           ╱    │    ╲
         ╱      │      ╲
       ╱        │        ╲
      ·····················
```

La deformación disminuye progresivamente al alejarnos del cursor.

### Viento

La velocidad del cursor se utiliza para calcular el viento.

Por tanto:

```text
cursor lento  → viento suave
cursor rápido → ráfaga más fuerte
```

Además, la dirección del movimiento del cursor determina la dirección principal de la ráfaga.

La intención es que al mover el ratón rápidamente de izquierda a derecha, la cortina se comporte como una tela que recibe una corriente de aire.

---

## 🧵 Estado actual

### Versión 1

La primera versión estaba basada en un código procedente que utilizaba una dependencia externa.

Se consiguió identificar que esa dependencia proporcionaba varias funciones auxiliares para trabajar con la rejilla y las transiciones.

De todas ellas, el efecto utilizaba principalmente:

* `getPointID()`
* `smoothstep()`

Posteriormente se eliminaron esas dependencias.

---

### Versión 2

Se creó una versión completamente autónoma.

Se eliminaron:

* dependencia externa;
* imports externos;
* dependencia de Google Fonts.

También se mejoró la estructura de la simulación y se incorporó explícitamente la combinación:

**fisheye + viento + tela física.**

La filosofía del efecto quedó recuperada.

---

### Versión 3

La versión 3 intenta solucionar un problema que apareció durante las pruebas:

**la sensación de ralentización al mover el cursor.**

Para ello se separó la respuesta inmediata del cursor de la simulación física.

El fisheye se aplica directamente a la posición visual de las partículas, mientras que el viento se utiliza como movimiento dentro de la tela.

También se redujo el coste de la simulación:

* menos partículas;
* menos constraints;
* eliminación de las conexiones diagonales;
* menos iteraciones físicas;
* menor suavizado de la posición del cursor.

La versión 3 funciona y mantiene la filosofía del efecto, pero **la ralentización todavía está presente**.

---

## ⚠️ Problema pendiente

El principal problema actual es la **sensación de lentitud al mover el cursor sobre la cortina**.

Todavía no está completamente determinado si esta sensación procede de:

1. rendimiento real de la simulación;
2. cantidad de operaciones realizadas por frame;
3. número de partículas;
4. resolución del canvas;
5. coste de dibujar todos los caracteres;
6. física de las constraints;
7. acumulación de viento;
8. o simplemente de la inercia visual de la tela.

Esto será el siguiente punto a investigar.

Es importante no eliminar simplemente la física para conseguir más velocidad, porque parte de la gracia del efecto está precisamente en que la perturbación **continúa propagándose por la cortina**.

---

## 🎯 Objetivo final

El objetivo no es conseguir simplemente una animación rápida.

Queremos conseguir esta sensación:

```text
            🖱️
             ↓
        movimiento
             ↓
     ┌───────────────┐
     │    FISHEYE    │
     │       +       │
     │     VIENTO    │
     └───────┬───────┘
             ↓
        ╭─────────╮
      ╱             ╲
     │  ~~~~~~~~~~~  │
     │ ~~~~~~~~~~~~~ │
     │~~~~~~~~~~~~~~~│
      ╲             ╱
        ╰─────────╯
             ↓
       la tela sigue
       moviéndose
             ↓
       vuelve poco a
       poco a su forma
```

La interacción debería sentirse **inmediata**, pero al mismo tiempo conservar cierta inercia y comportamiento de tela.

---

## 📁 Estructura actual

La versión autónoma está formada únicamente por:

```text
cortina-volatil-v3/
│
├── index.html
├── script.js
└── style.css
```

No necesita librerías externas para funcionar.

---

## 🚧 Estado del proyecto

**Estado: experimental / en desarrollo**

### Actualmente tenemos

* [x] Cortina basada en partículas
* [x] Caracteres formando la cortina
* [x] Física básica de tela
* [x] Interacción con el cursor
* [x] Efecto fisheye
* [x] Efecto viento
* [x] Viento dependiente de la velocidad del cursor
* [x] Relajación de la tela
* [x] Proyecto autónomo
* [x] Eliminadas las dependencias externas
* [x] Primera optimización de rendimiento

### Pendiente

* [ ] Eliminar la sensación de ralentización
* [ ] Medir el rendimiento real por frame
* [ ] Determinar si el problema es FPS o inercia visual
* [ ] Ajustar la respuesta del fisheye
* [ ] Ajustar la respuesta del viento
* [ ] Conseguir un equilibrio entre velocidad y sensación de tela
* [ ] Afinar el efecto visual final

---

## 🔬 Próximo paso

Antes de seguir modificando la física, conviene analizar el rendimiento de la versión 3.

La siguiente fase debería responder a una pregunta:

> **¿La cortina realmente está perdiendo frames o simplemente estamos percibiendo demasiada inercia en su movimiento?**

A partir de esa respuesta podremos optimizar la parte correcta sin perder la personalidad del efecto.

---

## 📌 Filosofía del proyecto

La idea no es hacer una simulación física perfecta.

La prioridad es conseguir una **sensación visual convincente**:

**cursor → fisheye → viento → tela → propagación → recuperación**

Si el efecto visual funciona, la implementación física puede simplificarse todo lo necesario para conseguir una interacción fluida.
