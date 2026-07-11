/* ============================================================
   YUKI · Carrusel 3D + interacciones de la portada
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 0. Utilidades de color ---------- */
  function hexToRgba(hex, alpha) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function washGradient(p) {
    return [
      `radial-gradient(46% 50% at 24% 18%, ${hexToRgba(p.accent, 0.4)}, transparent 62%)`,
      `radial-gradient(50% 55% at 82% 30%, ${hexToRgba(p.color, 0.32)}, transparent 62%)`,
      `radial-gradient(60% 60% at 50% 100%, ${hexToRgba(p.colorDark, 0.4)}, transparent 68%)`,
    ].join(", ");
  }

  /* ---------- 1. Construir el carrusel ---------- */
  const ring = document.getElementById("ring");
  const dotsWrap = document.getElementById("dots");
  const stage = document.getElementById("stage");
  const n = PRODUCTS.length;
  const angle = 360 / n; // grados entre bebidas
  // ventana angular en la que una bebida es visible: más allá de esto
  // queda completamente oculta, y solo aparece mientras se desliza hacia el frente.
  const FADE_WINDOW = angle * 0.8;

  ring.style.setProperty("--angle", angle + "deg");

  PRODUCTS.forEach((p, i) => {
    const a = document.createElement("a");
    a.className = "cell";
    a.href = "producto.html?id=" + p.id;
    a.style.setProperty("--i", i);
    a.dataset.index = i;
    a.innerHTML =
      `<div class="cell-inner">${productImage(p, "cell-cup", true, true)}` +
      `<div class="cell-label"><div class="cell-name">${p.name}</div>` +
      `<div class="cell-cta">Ver bebida →</div></div></div>`;
    ring.appendChild(a);

    const dot = document.createElement("button");
    dot.className = "dot-btn";
    dot.setAttribute("aria-label", "Ir a " + p.name);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const cells = Array.from(ring.querySelectorAll(".cell"));
  const dots = Array.from(dotsWrap.querySelectorAll(".dot-btn"));

  /* ---------- 1b. Fondo adaptativo (crossfade por bebida activa) ---------- */
  const washA = document.getElementById("washA");
  const washB = document.getElementById("washB");
  let washFront = washA;
  let washBack = washB;

  if (washA && washB) {
    washA.style.background = washGradient(PRODUCTS[0]);
    washA.classList.add("show");
  }

  function updateBackground(index) {
    if (!washA || !washB) return;
    const p = PRODUCTS[index];
    washBack.style.background = washGradient(p);
    // forzar reflow para que la transición de opacidad se aprecie
    void washBack.offsetWidth;
    washBack.classList.add("show");
    washFront.classList.remove("show");
    const tmp = washFront;
    washFront = washBack;
    washBack = tmp;
  }

  /* ---------- 2. Estado y bucle de animación ---------- */
  let rotation = 0; // giro actual del anillo (grados)
  let velocity = -0.18; // giro automático: negativo => entra por la derecha
  const autoSpeed = -0.18;
  let dragging = false;
  let paused = false;
  let lastActive = -1;

  // Animación suave para saltos programáticos (flechas, puntos, o el
  // encaje al soltar el arrastre): interpola rotation cuadro a cuadro en
  // vez de teleportarlo, así la opacidad (recalculada cada frame a partir
  // de rotation) queda siempre en sync con la posición 3D.
  let isAnimating = false;
  let animFrom = 0;
  let animTo = 0;
  let animStart = 0;
  let animDuration = 420;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateTo(target) {
    const distance = Math.abs(target - rotation);
    animDuration = Math.max(150, Math.min(420, (distance / angle) * 420));
    animFrom = rotation;
    animTo = target;
    animStart = performance.now();
    isAnimating = true;
    velocity = autoSpeed;
  }

  function render() {
    ring.style.setProperty("--rot", rotation + "deg");

    // Índice de la bebida que mira al frente
    const active = ((Math.round(-rotation / angle) % n) + n) % n;
    if (active !== lastActive) {
      cells.forEach((c, i) => c.classList.toggle("is-active", i === active));
      dots.forEach((d, i) => d.classList.toggle("active", i === active));
      lastActive = active;
      updateBackground(active);
    }

    // Opacidad / profundidad por bebida según su ángulo real hacia el frente.
    // En reposo (front >= FADE_WINDOW) queda oculta; solo se revela mientras
    // se desliza hacia la posición frontal, con una caída suave (ease-out).
    cells.forEach((c, i) => {
      let a = (i * angle + rotation) % 360;
      if (a > 180) a -= 360;
      if (a < -180) a += 360;
      const front = Math.abs(a); // 0 = al frente, angle = en reposo
      const t = Math.min(front / FADE_WINDOW, 1);
      c.style.opacity = (1 - t * t).toFixed(3);
      c.style.zIndex = Math.round(1000 - front);
      // solo la bebida activa es clicable; el resto está oculta o en transición
      c.style.pointerEvents = i === active ? "auto" : "none";
    });
  }

  function tick(now) {
    if (isAnimating) {
      const t = Math.min((now - animStart) / animDuration, 1);
      rotation = animFrom + (animTo - animFrom) * easeOutCubic(t);
      if (t >= 1) isAnimating = false;
    } else if (!dragging && !paused) {
      rotation += velocity;
      // suavizar el retorno a la velocidad de crucero tras un impulso
      velocity += (autoSpeed - velocity) * 0.03;
    }
    render();
    requestAnimationFrame(tick);
  }

  /* ---------- 3. Navegación por índice / flechas ---------- */
  function goTo(i) {
    // llevar la bebida i al frente por el camino más corto
    const target = -i * angle;
    let diff = ((target - rotation) % 360 + 540) % 360 - 180;
    animateTo(rotation + diff);
    pulse();
  }

  function step(dir) {
    // dir = -1 (anterior) / +1 (siguiente)
    // se apoya en goTo() para encajar exacto, sin arrastrar el drift
    // acumulado del giro automático (evita que quede un resto visible).
    const current = ((Math.round(-rotation / angle) % n) + n) % n;
    goTo(((current + dir) % n + n) % n);
  }

  // pausa breve tras interacción para que se aprecie el sabor elegido
  let pulseTimer = null;
  function pulse() {
    paused = true;
    clearTimeout(pulseTimer);
    pulseTimer = setTimeout(() => (paused = false), 1600);
  }

  document.getElementById("next").addEventListener("click", () => step(1));
  document.getElementById("prev").addEventListener("click", () => step(-1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  /* ---------- 4. Arrastrar para girar ---------- */
  let startX = 0;
  let startRot = 0;
  let moved = 0;

  function onDown(e) {
    dragging = true;
    isAnimating = false; // el arrastre toma el control de inmediato
    startX = e.clientX;
    startRot = rotation;
    moved = 0;
    try {
      stage.setPointerCapture(e.pointerId);
    } catch (_) {}
  }
  function onMove(x) {
    if (!dragging) return;
    const dx = x - startX;
    moved = Math.abs(dx);
    rotation = startRot + dx * 0.3; // sensibilidad del arrastre
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    // fijar a la bebida más cercana con una animación corta
    const nearest = Math.round(-rotation / angle);
    const target = -nearest * angle;
    let diff = ((target - rotation) % 360 + 540) % 360 - 180;
    animateTo(rotation + diff);
    pulse();
  }

  stage.addEventListener("pointerdown", (e) => onDown(e));
  window.addEventListener("pointermove", (e) => onMove(e.clientX));
  window.addEventListener("pointerup", onUp);

  // Evitar que un arrastre se interprete como clic para navegar
  cells.forEach((c) => {
    c.addEventListener("click", (e) => {
      if (moved > 6) {
        e.preventDefault();
      }
    });
  });

  // Pausar el giro al pasar el ratón por encima
  stage.addEventListener("mouseenter", () => (paused = true));
  stage.addEventListener("mouseleave", () => {
    if (!dragging) paused = false;
  });

  // Pausar cuando la pestaña no está visible (ahorra batería)
  document.addEventListener("visibilitychange", () => {
    paused = document.hidden;
  });

  render();
  requestAnimationFrame(tick);

  /* ---------- 5. Vasos flotantes del hero ---------- */
  const floaties = document.getElementById("heroFloaties");
  if (floaties) {
    const pick = [PRODUCTS[0], PRODUCTS[3], PRODUCTS[4], PRODUCTS[2]];
    ["f1", "f2", "f3", "f4"].forEach((cls, i) => {
      const wrap = document.createElement("div");
      wrap.className = "floaty " + cls;
      wrap.innerHTML = productImage(pick[i % pick.length], "", true);
      floaties.appendChild(wrap);
    });
  }

  /* ---------- 6. Vaso de la sección historia ---------- */
  const showcase = document.getElementById("historiaShowcase");
  if (showcase) {
    showcase.innerHTML = productImage(PRODUCTS[4]);
  }

  /* ---------- 6b. Cards de producto (sección Beneficios) ----------
     Placeholder con las fotos ya recortadas de cada bebida; listas para
     reemplazarse por las imágenes definitivas que el cliente provea. */
  const productCards = document.getElementById("productCards");
  if (productCards) {
    PRODUCTS.forEach((p) => {
      const a = document.createElement("a");
      a.className = "product-card reveal";
      a.href = "producto.html?id=" + p.id;
      a.innerHTML =
        `<div class="pc-media">${productImage(p, "", true)}</div>` +
        `<div class="pc-body"><span class="pc-tag">${p.flavor}</span>` +
        `<h3>${p.name}</h3></div>`;
      productCards.appendChild(a);
    });
  }

  /* ---------- 6c. Contacto real: teléfono, correo y redes ---------- */
  const contactInfo = document.getElementById("contactInfo");
  if (contactInfo) {
    contactInfo.innerHTML = contactLinksHTML() + `<div class="social-row">${socialLinksHTML()}</div>`;
  }
  const footerContact = document.getElementById("footerContact");
  if (footerContact) footerContact.innerHTML = contactLinksHTML();
  const footerSocial = document.getElementById("footerSocial");
  if (footerSocial) footerSocial.innerHTML = socialLinksHTML();

  /* ---------- 6d. Reservas por WhatsApp y ubicación/horario ---------- */
  const reserveCard = document.getElementById("reserveCard");
  if (reserveCard) reserveCard.innerHTML = reserveCardHTML();
  const locationCard = document.getElementById("locationCard");
  if (locationCard) locationCard.innerHTML = locationCardHTML();

  /* ---------- 7. Navbar: scroll + menú móvil ---------- */
  const nav = document.getElementById("nav");
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  });
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );

  /* ---------- 8. Reveal al hacer scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- 9. Newsletter (demo) ---------- */
  const form = document.getElementById("newsletter");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("formMsg");
      const email = document.getElementById("email").value.trim();
      msg.textContent = "¡Gracias! Te avisaremos en " + email + " 🍵";
      form.reset();
    });
  }
})();
