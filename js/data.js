/* ============================================================
   YUKI · Matcha & Boba
   Datos de productos (fotografía real) + helper de imagen.
   Cada producto trae su propia paleta de color, usada para
   temizar su página y para el fondo adaptativo del carrusel.
   ============================================================ */

const BRAND = {
  phone: "+52 656 859 6503",
  phoneHref: "tel:+526568596503",
  email: "iygd505@gmail.com",
  facebook: "https://www.facebook.com/share/1BLSXnrDD1/?mibextid=wwXIfr",
  instagram:
    "https://www.instagram.com/net._.ly?igsh=cXN5MW1randmbnY5&utm_source=qr",
  whatsappHref:
    "https://wa.me/526568596503?text=" +
    encodeURIComponent("Hola YUKI, me gustaría reservar una mesa 🍵"),
  city: "Ciudad Juárez, Chihuahua",
  address: "Av. Gómez Morín, Ciudad Juárez, Chihuahua, México",
  mapsLinkHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Av. Gómez Morín, Ciudad Juárez, Chihuahua, México"),
  mapsEmbedSrc:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Av. Gómez Morín, Ciudad Juárez, Chihuahua, México") +
    "&t=&z=14&ie=UTF8&iwloc=&output=embed",
  hours: [
    { days: "Lunes – Viernes", time: "8:00 am – 8:00 pm" },
    { days: "Sábado – Domingo", time: "9:00 am – 9:00 pm" },
  ],
};

/* Ícono de WhatsApp, reutilizado por el botón flotante y el de reservas. */
const WA_ICON_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.4 14.2c-.23.64-1.15 1.2-1.9 1.36-.5.1-1.16.18-3.4-.73-2.85-1.18-4.7-4.05-4.84-4.24-.14-.19-1.15-1.53-1.15-2.92 0-1.4.73-2.08 1-2.36.24-.27.54-.34.72-.34h.52c.17 0 .4-.03.6.47.24.6.8 2.06.87 2.2.07.15.12.32.02.5-.1.2-.15.3-.3.47-.15.16-.3.36-.43.48-.15.15-.3.3-.13.6.17.32.77 1.28 1.66 2.08 1.15 1.02 2.1 1.34 2.4 1.5.3.15.48.13.65-.08.18-.21.75-.87.95-1.17.2-.3.4-.25.66-.15.28.1 1.75.82 2.05.97.3.15.5.22.57.34.08.13.08.75-.15 1.4Z"/>
</svg>`;

/* Botón de reservas por WhatsApp, dentro de la sección de contacto. */
function reserveCardHTML() {
  return `
    <div class="reserve-text">
      <p class="eyebrow">Reservaciones</p>
      <h3>Aparta tu mesa por WhatsApp</h3>
      <p>Escríbenos y te confirmamos tu reservación al momento.</p>
    </div>
    <a class="btn btn-whatsapp" href="${BRAND.whatsappHref}" target="_blank" rel="noopener noreferrer">
      ${WA_ICON_SVG}<span>Reservar por WhatsApp</span>
    </a>`;
}

/* Botón flotante de WhatsApp, visible en todo el sitio. */
function whatsappFloatHTML() {
  return `<a class="wa-float" href="${BRAND.whatsappHref}" target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp">${WA_ICON_SVG}</a>`;
}

/* Horario de atención. */
function hoursListHTML() {
  return BRAND.hours
    .map((h) => `<li><span>${h.days}</span><b>${h.time}</b></li>`)
    .join("");
}

/* Ubicación: dirección, horario y mapa embebido (sin necesidad de API key). */
function locationCardHTML() {
  return `
    <div class="location-info">
      <p class="eyebrow">Visítanos</p>
      <h3>${BRAND.city}</h3>
      <p class="location-address">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/>
          <circle cx="12" cy="9" r="2.4"/>
        </svg>
        <span>${BRAND.address}</span>
      </p>
      <ul class="hours-list">${hoursListHTML()}</ul>
      <a class="btn btn-ghost" href="${BRAND.mapsLinkHref}" target="_blank" rel="noopener noreferrer">Ver en Google Maps →</a>
    </div>
    <div class="location-map">
      <iframe
        src="${BRAND.mapsEmbedSrc}"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Ubicación de YUKI en ${BRAND.city}"
      ></iframe>
    </div>`;
}

/* Íconos de teléfono / correo, para los enlaces de contacto reales. */
function contactLinksHTML() {
  return `
    <a class="contact-item" href="${BRAND.phoneHref}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 4h3l2 5-2.4 1.5a11.5 11.5 0 0 0 5.4 5.4L14.5 13.5l5 2v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 6a2 2 0 0 1 2-2Z"/>
      </svg>
      <span>${BRAND.phone}</span>
    </a>
    <a class="contact-item" href="mailto:${BRAND.email}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2.4"/>
        <path d="m3.5 7 8.5 6 8.5-6"/>
      </svg>
      <span>${BRAND.email}</span>
    </a>`;
}

/* Íconos de Facebook / Instagram, enlazando a los perfiles reales de YUKI. */
function socialLinksHTML() {
  return `
    <a class="social-btn" href="${BRAND.facebook}" target="_blank" rel="noopener noreferrer" aria-label="YUKI en Facebook">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.2" stroke="currentColor" stroke-width="1.6"/>
        <path fill="currentColor" d="M13.4 20v-6.6h2.2l.33-2.57h-2.53v-1.64c0-.74.2-1.25 1.27-1.25h1.36V5.62A18 18 0 0 0 14 5.5c-1.97 0-3.32 1.2-3.32 3.4v1.93H8.5v2.57h2.18V20Z"/>
      </svg>
    </a>
    <a class="social-btn" href="${BRAND.instagram}" target="_blank" rel="noopener noreferrer" aria-label="YUKI en Instagram">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none"/>
      </svg>
    </a>`;
}

const PRODUCTS = [
  {
    id: "marmoleado",
    name: "Matcha Marmoleado",
    flavor: "Cremoso & Intenso",
    img: "img/productos/matcha-marmoleado.png",
    imgThumb: "img/productos/matcha-marmoleado-thumb.png",
    color: "#4f7942",
    colorDark: "#24371c",
    accent: "#cfe1b5",
    tagline: "Arte en cada remolino.",
    kcal: 210,
    azucar: "Endulzado con panela, al gusto",
    sabor:
      "Doble infusión de matcha ceremonial trazada en remolinos sobre leche " +
      "entera bien fría. El primer sorbo es intenso y herbal, y se suaviza " +
      "en un fondo lácteo y dulce. Las perlas de tapioca en almíbar de " +
      "panela cierran cada trago con un toque masticable y caramelizado.",
    ingredientes: [
      "Té matcha ceremonial (doble infusión)",
      "Leche entera fría",
      "Perlas de tapioca en almíbar de panela",
      "Jarabe de agave",
      "Hielo picado",
    ],
  },
  {
    id: "clasico",
    name: "Matcha Clásico",
    flavor: "Puro & Herbal",
    img: "img/productos/matcha-clasico.png",
    imgThumb: "img/productos/matcha-clasico-thumb.png",
    color: "#5c8a3a",
    colorDark: "#2c4019",
    accent: "#a8d66b",
    tagline: "La esencia del matcha, sin distracciones.",
    kcal: 150,
    azucar: "Bajo en azúcar",
    sabor:
      "Matcha ceremonial disuelto de punta a punta, sin capas de leche que " +
      "lo interrumpan. Vegetal, ligeramente amargo al frente y con un " +
      "dulzor justo que deja hablar al té. Para quienes quieren el matcha " +
      "en su expresión más honesta.",
    ingredientes: [
      "Té matcha ceremonial",
      "Agua mineral fría",
      "Perlas de tapioca en almíbar de panela",
      "Jarabe de agave",
      "Hielo picado",
    ],
  },
  {
    id: "suave",
    name: "Matcha Suave",
    flavor: "Ligero & Sedoso",
    img: "img/productos/matcha-suave.png",
    imgThumb: "img/productos/matcha-suave-thumb.png",
    color: "#9fb87c",
    colorDark: "#5c7248",
    accent: "#e9f0da",
    tagline: "Matcha en su versión más delicada.",
    kcal: 170,
    azucar: "Endulzado con panela, al gusto",
    sabor:
      "Una infusión más ligera de matcha mezclada con leche, resultando en " +
      "un verde pálido y sedoso. Cremoso, suave y fácil de tomar, ideal " +
      "para quienes recién descubren el matcha o lo prefieren menos " +
      "intenso.",
    ingredientes: [
      "Té matcha (infusión ligera)",
      "Leche entera",
      "Perlas de tapioca en almíbar de panela",
      "Jarabe de agave",
      "Hielo picado",
    ],
  },
  {
    id: "con-leche",
    name: "Matcha con Leche",
    flavor: "Dulce & Lechoso",
    img: "img/productos/matcha-con-leche.png",
    imgThumb: "img/productos/matcha-con-leche-thumb.png",
    color: "#cdb37e",
    colorDark: "#8a6a3f",
    accent: "#f2e6c4",
    tagline: "Dos mundos en un mismo vaso.",
    kcal: 230,
    azucar: "Endulzado con panela, al gusto",
    sabor:
      "Leche entera y matcha servidos en capas, sin mezclar, para que cada " +
      "sorbo decida su propio equilibrio: primero dulce y cremoso, después " +
      "verde y herbal. Una experiencia que cambia de principio a fin.",
    ingredientes: [
      "Té matcha ceremonial",
      "Leche entera",
      "Perlas de tapioca en almíbar de panela",
      "Jarabe de agave",
      "Hielo picado",
    ],
  },
  {
    id: "tricapa",
    name: "Matcha Tricapa",
    flavor: "Signature & Equilibrado",
    img: "img/productos/matcha-tricapa.png",
    imgThumb: "img/productos/matcha-tricapa-thumb.png",
    color: "#4f7942",
    colorDark: "#22301a",
    accent: "#e3d6b0",
    tagline: "Nuestra firma: tres capas, un solo sorbo.",
    kcal: 240,
    azucar: "Endulzado con panela, al gusto",
    sabor:
      "Nuestra bebida insignia: matcha, leche y perlas de tapioca en tres " +
      "capas perfectamente definidas. Agítala o bébela por capas: verde " +
      "intenso arriba, cremoso al centro y un final dulce y masticable " +
      "de panela en el fondo.",
    ingredientes: [
      "Té matcha ceremonial",
      "Leche entera",
      "Perlas de tapioca en almíbar de panela",
      "Jarabe de agave",
      "Hielo picado",
    ],
  },
];

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

/* ----- Vaso de producto (fotografía real recortada) ----- */
function productImage(p, extraClass = "", thumb = false, eager = false) {
  const src = thumb && p.imgThumb ? p.imgThumb : p.img;
  // Las imágenes del carrusel (eager=true) cargan de inmediato: con
  // loading="lazy" algunos navegadores calculan mal la intersección con
  // el viewport en elementos posicionados con transformaciones 3D y la
  // imagen nunca llega a pedirse.
  const loadingAttr = eager ? "" : ' loading="lazy"';
  return `
    <span class="cup ${extraClass}">
      <img src="${src}" alt="Vaso de ${p.name}, ${p.flavor}"${loadingAttr} />
    </span>`;
}
