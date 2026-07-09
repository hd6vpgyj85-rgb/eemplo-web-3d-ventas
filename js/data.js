/* ============================================================
   AURA · Bebidas Naturales
   Datos de productos + generador de botellas en SVG.
   Todo es autocontenido: no se usan imágenes externas.
   ============================================================ */

const PRODUCTS = [
  {
    id: "naranja",
    name: "Naranja",
    flavor: "Cítrico & Solar",
    emblem: "naranja",
    color: "#ff7a18",
    colorDark: "#d64f00",
    accent: "#ffb347",
    tagline: "El brillo del sol en cada sorbo.",
    kcal: 48,
    azucar: "0 g azúcar añadida",
    sabor:
      "Un estallido cítrico, jugoso y luminoso. La naranja madura aporta " +
      "un dulzor natural equilibrado con una acidez fresca que despierta el " +
      "paladar. Notas finales de flor de azahar que dejan una sensación " +
      "limpia y solar.",
    ingredientes: [
      "Agua de manantial",
      "Zumo de naranja prensada (32%)",
      "Pulpa natural de naranja",
      "Extracto de flor de azahar",
      "Vitamina C",
    ],
  },
  {
    id: "limon",
    name: "Limón",
    flavor: "Ácido & Fresco",
    emblem: "limon",
    color: "#a9d824",
    colorDark: "#6f9f0e",
    accent: "#d7f76a",
    tagline: "Frescura que chispea.",
    kcal: 41,
    azucar: "0 g azúcar añadida",
    sabor:
      "Chispeante y afilado. El limón recién exprimido corta con una acidez " +
      "vibrante, suavizada por un toque de menta que refresca al instante. " +
      "Ideal para reiniciar los sentidos en los días de calor.",
    ingredientes: [
      "Agua de manantial",
      "Zumo de limón (28%)",
      "Infusión de menta fresca",
      "Ralladura natural de limón",
      "Vitamina B6",
    ],
  },
  {
    id: "fresa",
    name: "Fresa",
    flavor: "Dulce & Vibrante",
    emblem: "fresa",
    color: "#ff416c",
    colorDark: "#c11349",
    accent: "#ff85a1",
    tagline: "Dulzura que enamora.",
    kcal: 52,
    azucar: "Endulzado solo con fruta",
    sabor:
      "Suave, aterciopelado y profundamente afrutado. La fresa madura llena " +
      "la boca de dulzor rojo y aromas de campo. Un final delicado con un " +
      "punto floral que invita al siguiente sorbo.",
    ingredientes: [
      "Agua de manantial",
      "Puré de fresa (30%)",
      "Zumo de manzana concentrado",
      "Extracto de hibisco",
      "Vitamina C",
    ],
  },
  {
    id: "mora",
    name: "Mora Azul",
    flavor: "Intenso & Profundo",
    emblem: "mora",
    color: "#6a5cff",
    colorDark: "#3a2bc7",
    accent: "#a99bff",
    tagline: "El misterio del bosque.",
    kcal: 50,
    azucar: "0 g azúcar añadida",
    sabor:
      "Denso, elegante y misterioso. Las moras azules aportan un dulzor " +
      "oscuro con matices de vino y bosque húmedo. Rico en antioxidantes, " +
      "con un final aterciopelado que envuelve el paladar.",
    ingredientes: [
      "Agua de manantial",
      "Zumo de arándano azul (26%)",
      "Puré de mora",
      "Extracto de saúco",
      "Antioxidantes naturales",
    ],
  },
  {
    id: "mango",
    name: "Mango",
    flavor: "Tropical & Cremoso",
    emblem: "mango",
    color: "#ffb020",
    colorDark: "#e07a00",
    accent: "#ffd27a",
    tagline: "El trópico en estado puro.",
    kcal: 55,
    azucar: "Endulzado solo con fruta",
    sabor:
      "Cremoso, cálido y exuberante. El mango maduro despliega un dulzor " +
      "tropical envolvente con notas de melocotón y flor. Una textura sedosa " +
      "que evoca playas y atardeceres.",
    ingredientes: [
      "Agua de manantial",
      "Pulpa de mango (34%)",
      "Zumo de maracuyá",
      "Un toque de lima",
      "Vitamina A",
    ],
  },
  {
    id: "uva",
    name: "Uva",
    flavor: "Jugoso & Envolvente",
    emblem: "uva",
    color: "#9b4dff",
    colorDark: "#661fbf",
    accent: "#c79bff",
    tagline: "Racimos de placer.",
    kcal: 53,
    azucar: "0 g azúcar añadida",
    sabor:
      "Jugoso, redondo y aromático. La uva morada llena la boca de un dulzor " +
      "profundo con recuerdos de mosto y frutos del bosque. Un final largo, " +
      "envolvente y sorprendentemente refrescante.",
    ingredientes: [
      "Agua de manantial",
      "Zumo de uva morada (30%)",
      "Extracto de piel de uva",
      "Zumo de arándano",
      "Resveratrol natural",
    ],
  },
];

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

/* ----- Iconos de fruta (dibujados en el centro de la etiqueta) ----- */
function fruitIcon(p) {
  const c = p.color;
  const d = p.colorDark;
  const a = p.accent;
  switch (p.emblem) {
    case "naranja":
      return `
        <circle cx="0" cy="0" r="27" fill="${c}"/>
        <circle cx="0" cy="0" r="27" fill="none" stroke="${d}" stroke-width="2"/>
        <g stroke="${d}" stroke-width="1.6" opacity="0.55">
          <line x1="0" y1="0" x2="0" y2="-22"/><line x1="0" y1="0" x2="19" y2="-11"/>
          <line x1="0" y1="0" x2="19" y2="11"/><line x1="0" y1="0" x2="0" y2="22"/>
          <line x1="0" y1="0" x2="-19" y2="11"/><line x1="0" y1="0" x2="-19" y2="-11"/>
        </g>
        <circle cx="0" cy="0" r="4" fill="${a}"/>
        <path d="M6 -26 q10 -8 18 -3 q-9 3 -14 8 z" fill="#3fae5a"/>`;
    case "limon":
      return `
        <ellipse cx="0" cy="0" rx="28" ry="20" fill="${c}"/>
        <ellipse cx="0" cy="0" rx="28" ry="20" fill="none" stroke="${d}" stroke-width="2"/>
        <ellipse cx="0" cy="0" rx="15" ry="9" fill="${a}" opacity="0.6"/>
        <path d="M-28 0 q-8 0 -12 -3 q6 -3 12 -2 z" fill="${d}"/>
        <path d="M28 0 q8 0 12 -3 q-6 -3 -12 -2 z" fill="${d}"/>`;
    case "fresa":
      return `
        <path d="M0 26 C-20 14 -24 -6 -14 -14 C-6 -20 6 -20 14 -14 C24 -6 20 14 0 26 Z" fill="${c}"/>
        <path d="M0 26 C-20 14 -24 -6 -14 -14 C-6 -20 6 -20 14 -14 C24 -6 20 14 0 26 Z" fill="none" stroke="${d}" stroke-width="1.5"/>
        <g fill="#fff2c2">
          <circle cx="-7" cy="-4" r="1.6"/><circle cx="6" cy="-4" r="1.6"/>
          <circle cx="0" cy="4" r="1.6"/><circle cx="-9" cy="7" r="1.6"/>
          <circle cx="9" cy="7" r="1.6"/><circle cx="-3" cy="13" r="1.6"/>
          <circle cx="4" cy="13" r="1.6"/>
        </g>
        <path d="M-13 -15 q6 -6 13 -6 q7 0 13 6 q-6 2 -13 2 q-7 0 -13 -2 z" fill="#3fae5a"/>`;
    case "mora":
      return `
        <g fill="${c}" stroke="${d}" stroke-width="1.4">
          <circle cx="-9" cy="-6" r="9"/><circle cx="9" cy="-6" r="9"/>
          <circle cx="0" cy="2" r="9"/><circle cx="-9" cy="10" r="9"/>
          <circle cx="9" cy="10" r="9"/>
        </g>
        <g fill="${a}" opacity="0.7">
          <circle cx="-11" cy="-8" r="2.4"/><circle cx="7" cy="-8" r="2.4"/>
          <circle cx="-2" cy="0" r="2.4"/>
        </g>
        <path d="M0 -14 q4 -8 12 -9 q-3 6 -9 10 z" fill="#3fae5a"/>`;
    case "mango":
      return `
        <path d="M-6 -24 C16 -24 28 -6 22 14 C16 30 -8 30 -20 16 C-30 4 -26 -24 -6 -24 Z" fill="${c}"/>
        <path d="M-6 -24 C16 -24 28 -6 22 14 C16 30 -8 30 -20 16 C-30 4 -26 -24 -6 -24 Z" fill="none" stroke="${d}" stroke-width="1.6"/>
        <ellipse cx="4" cy="-6" rx="10" ry="14" fill="${a}" opacity="0.55" transform="rotate(20 4 -6)"/>
        <path d="M-6 -24 q8 -8 18 -6 q-6 6 -14 8 z" fill="#3fae5a"/>`;
    case "uva":
      return `
        <path d="M0 -22 L0 -12" stroke="#7a4a1e" stroke-width="3" stroke-linecap="round"/>
        <path d="M0 -20 q9 -6 15 -2" stroke="#3fae5a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <g fill="${c}" stroke="${d}" stroke-width="1.2">
          <circle cx="0" cy="-8" r="7"/><circle cx="-9" cy="-2" r="7"/><circle cx="9" cy="-2" r="7"/>
          <circle cx="-5" cy="7" r="7"/><circle cx="5" cy="7" r="7"/><circle cx="0" cy="16" r="7"/>
        </g>
        <g fill="${a}" opacity="0.7">
          <circle cx="-2" cy="-10" r="2"/><circle cx="-11" cy="-4" r="2"/><circle cx="7" cy="-4" r="2"/>
        </g>`;
    default:
      return `<circle r="26" fill="${c}"/>`;
  }
}

/* ----- Generador de botella SVG (reutilizado en carrusel y ficha) ----- */
function bottleSVG(p, extraClass = "") {
  const g = p.id;
  return `
  <svg class="bottle ${extraClass}" viewBox="0 0 220 560" role="img"
       aria-label="Botella de bebida sabor ${p.name}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="liq-${g}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${p.accent}"/>
        <stop offset="0.55" stop-color="${p.color}"/>
        <stop offset="1" stop-color="${p.colorDark}"/>
      </linearGradient>
      <linearGradient id="cap-${g}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p.accent}"/>
        <stop offset="1" stop-color="${p.colorDark}"/>
      </linearGradient>
      <linearGradient id="shine-${g}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/>
        <stop offset="0.5" stop-color="#fff" stop-opacity="0.5"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <ellipse class="bottle-shadow" cx="110" cy="546" rx="64" ry="11"/>
    <rect x="88" y="6" width="44" height="16" rx="4" fill="url(#cap-${g})"/>
    <rect x="84" y="20" width="52" height="28" rx="7" fill="url(#cap-${g})"/>
    <path d="M88 48 L132 48 L132 92 C132 110 180 120 180 202 L180 470
             C180 514 158 530 110 530 C62 530 40 514 40 470 L40 202
             C40 120 88 110 88 92 Z" fill="url(#liq-${g})"/>
    <path d="M62 122 C56 210 56 380 66 468 C70 496 78 508 92 514
             C82 500 76 476 74 448 C68 358 68 214 76 142
             C72 130 66 124 62 122 Z" fill="url(#shine-${g})" opacity="0.55"/>
    <rect x="46" y="300" width="128" height="168" rx="14" fill="#ffffff" opacity="0.97"/>
    <rect x="46" y="300" width="128" height="30" rx="14" fill="${p.color}"/>
    <rect x="46" y="318" width="128" height="12" fill="${p.color}"/>
    <text x="110" y="321" text-anchor="middle" fill="#fff" font-size="15"
          font-weight="800" letter-spacing="4" font-family="system-ui, sans-serif">AURA</text>
    <g transform="translate(110,382)">${fruitIcon(p)}</g>
    <text x="110" y="440" text-anchor="middle" fill="${p.colorDark}" font-size="20"
          font-weight="800" font-family="system-ui, sans-serif">${p.name}</text>
    <text x="110" y="458" text-anchor="middle" fill="#9aa0a8" font-size="9.5"
          letter-spacing="2" font-family="system-ui, sans-serif">BEBIDA NATURAL</text>
  </svg>`;
}
