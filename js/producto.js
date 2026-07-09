/* ============================================================
   YUKI · Renderizado de la página de producto
   Lee ?id= de la URL y muestra imagen, sabor e ingredientes.
   ============================================================ */
(function () {
  "use strict";

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const p = getProduct(id) || PRODUCTS[0];
  const main = document.getElementById("productMain");

  document.title = "YUKI · " + p.name;

  // Tema de color de la página según el producto
  const root = document.body;
  root.style.setProperty("--p-color", p.color);
  root.style.setProperty("--p-dark", p.colorDark);
  root.style.setProperty("--p-accent", p.accent);

  const ingredientsHTML = p.ingredientes
    .map((ing) => `<li>${ing}</li>`)
    .join("");

  // Otros sabores (todos menos el actual)
  const othersHTML = PRODUCTS.filter((o) => o.id !== p.id)
    .map(
      (o) =>
        `<a class="mini" href="producto.html?id=${o.id}">${productImage(o, "", true)}` +
        `<span>${o.name}</span></a>`
    )
    .join("");

  main.innerHTML = `
    <section class="product-hero">
      <div class="glow"></div>
      <div class="container ph-grid">
        <div class="product-info reveal in">
          <a class="back-link" href="index.html#bebidas">← Volver a las bebidas</a>
          <div><span class="flavor-tag">${p.flavor}</span></div>
          <h1><span class="grad">${p.name}</span></h1>
          <p class="lead">${p.tagline}</p>
          <div class="quick-facts">
            <div class="qf"><b>${p.kcal}</b><span>kcal aprox.</span></div>
            <div class="qf"><b>Matcha</b><span>Ceremonial</span></div>
            <div class="qf"><b>500 ml</b><span>Vaso</span></div>
          </div>
          <a href="index.html#bebidas" class="btn btn-primary">← Ver el carrusel</a>
        </div>
        <div class="product-visual reveal in">
          <span class="ripple"></span>
          <span class="ripple"></span>
          <span class="ripple"></span>
          ${productImage(p)}
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="detail-grid">
          <div class="panel reveal">
            <h2><span class="bar"></span> Sabor</h2>
            <p class="sabor-text">${p.sabor}</p>
            <p class="sabor-text" style="margin-bottom:0">
              <strong style="color:var(--text)">Perfil:</strong> ${p.flavor}.
              <br /><strong style="color:var(--text)">Azúcar:</strong> ${p.azucar}.
            </p>
          </div>
          <div class="panel reveal">
            <h2><span class="bar"></span> Ingredientes</h2>
            <ul class="ingredients">${ingredientsHTML}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Sigue explorando</p>
          <h2>Otros sabores</h2>
        </div>
        <div class="more-flavors">${othersHTML}</div>
      </div>
    </section>
  `;

  /* ---------- Menú móvil ---------- */
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );

  /* ---------- Reveal al hacer scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));

  // Subir arriba al cargar una nueva ficha
  window.scrollTo(0, 0);
})();
