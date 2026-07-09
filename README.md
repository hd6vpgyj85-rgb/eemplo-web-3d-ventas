# YUKI · Matcha & Boba — Sitio 3D de ventas

Sitio web de demostración para una barra de matcha y boba. La sección
**Bebidas** muestra un **carrusel 3D** en el que cada vaso entra por la
derecha y avanza en círculo hacia la izquierda, y el **fondo cambia de color
según la bebida activa**. Al hacer clic en un vaso se abre su **página
individual** con imagen, ingredientes y sabor.

## ✨ Características

- **Carrusel 3D real** con CSS `transform-style: preserve-3d` + `requestAnimationFrame`.
  - Giro automático (los vasos entran desde la derecha y avanzan hacia la izquierda).
  - Arrastrar con ratón/dedo para girar, flechas ‹ ›, puntos de navegación y teclado (← →).
  - Se pausa al pasar el ratón por encima o al ocultar la pestaña.
- **Fondo adaptativo**: detrás del carrusel hay dos capas de color (`wash-a` / `wash-b`)
  que alternan con un crossfade suave cada vez que cambia la bebida activa,
  usando la paleta propia de cada producto (`color` / `colorDark` / `accent` en `js/data.js`).
- **Páginas de producto individuales** (`producto.html?id=<bebida>`) con:
  - Fotografía real del vaso, sabor detallado, perfil, calorías e **ingredientes**.
  - Enlaces a las demás bebidas.
- Sitio completo: hero, beneficios, historia, newsletter y footer. Responsive y con menú móvil.

## 🗂️ Estructura

```
index.html          Portada con el carrusel 3D y todas las secciones
producto.html        Plantilla de la ficha de producto (lee ?id= de la URL)
css/styles.css       Estilos del sitio, el carrusel y el fondo adaptativo
js/data.js           Datos de los productos + helper de imagen
js/carousel.js       Lógica del carrusel 3D, fondo adaptativo e interacciones
js/producto.js       Renderiza la ficha de producto según el ?id=
img/productos/       Fotografía de cada bebida (versión completa + thumbnail)
```

## ▶️ Cómo verlo

Es un sitio estático. Basta con abrir `index.html`, aunque para evitar
restricciones del navegador conviene servirlo por HTTP:

```bash
# Python
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## 🍵 Bebidas incluidas

Matcha Marmoleado · Matcha Clásico · Matcha Suave · Matcha con Leche · Matcha Tricapa

Cada una tiene su propia paleta de color, fotografía, ingredientes y
descripción de sabor, todo definido en `js/data.js`. Para añadir una bebida
nueva basta con agregar un objeto a `PRODUCTS` y sus imágenes en
`img/productos/`.
