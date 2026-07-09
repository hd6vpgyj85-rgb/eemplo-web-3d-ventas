# AURA · Bebidas Naturales — Sitio 3D de ventas

Sitio web de demostración para presentar una línea de bebidas naturales. La
sección **Bebidas** muestra un **carrusel 3D** en el que cada botella entra por
la derecha y avanza en círculo hacia la izquierda. Al hacer clic en una botella
se abre su **página individual** con imagen, ingredientes y sabor.

## ✨ Características

- **Carrusel 3D real** con CSS `transform-style: preserve-3d` + `requestAnimationFrame`.
  - Giro automático (las botellas entran desde la derecha y avanzan hacia la izquierda).
  - Arrastrar con ratón/dedo para girar, flechas ‹ ›, puntos de navegación y teclado (← →).
  - Se pausa al pasar el ratón por encima o al ocultar la pestaña.
- **Páginas de producto individuales** (`producto.html?id=<sabor>`) con:
  - Imagen de la botella, sabor detallado, perfil, calorías e **ingredientes**.
  - Enlaces a los demás sabores.
- **Botellas dibujadas en SVG** generadas por JavaScript: sin imágenes externas ni dependencias.
- Sitio completo: hero, beneficios, historia, newsletter y footer. Responsive y con menú móvil.

## 🗂️ Estructura

```
index.html          Portada con el carrusel 3D y todas las secciones
producto.html       Plantilla de la ficha de producto (lee ?id= de la URL)
css/styles.css      Estilos del sitio y del carrusel
js/data.js          Datos de los productos + generador de botellas SVG
js/carousel.js      Lógica del carrusel 3D e interacciones de la portada
js/producto.js      Renderiza la ficha de producto según el ?id=
```

## ▶️ Cómo verlo

Es un sitio estático. Basta con abrir `index.html`, aunque para evitar
restricciones del navegador conviene servirlo por HTTP:

```bash
# Python
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## 🍹 Sabores incluidos

Naranja · Limón · Fresa · Mora Azul · Mango · Uva

Cada uno tiene su color, icono de fruta, ingredientes y descripción de sabor,
todo definido en `js/data.js`. Para añadir un sabor nuevo basta con agregar un
objeto a `PRODUCTS`.
